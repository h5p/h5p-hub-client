import HubView from './hub-view';
import ContentTypeSection from './content-type-section/content-type-section';
import UploadSection from './upload-section/upload-section';
import HubServices from './hub-services';
import Dictionary from './utils/dictionary';
import { Eventful } from './mixins/eventful';

/**
 * @typedef {object} HubState
 * @property {string} title
 * @property {string} sectionId
 * @property {boolean} expanded
 * @property {string} apiRootUrl
 * @property {ApiVersion} apiVersion
 */
/**
 * @typedef {object} ApiVersion
 * @property {number} major
 * @property {number} minor
 */
/**
 * @typedef {object} ErrorMessage
 * @property {string} message
 * @property {string} errorCode
 */
/**
 * @typedef {object} SelectedElement
 * @property {HTMLElement} element
 * @property {string} id
 */
/**
 * Select event
 * @event Hub#select
 * @type {SelectedElement}
 */
/**
 * Error event
 * @event Hub#error
 * @type {ErrorMessage}
 */
/**
 * Upload event
 * @event Hub#upload
 * @type {Object}
 */
/**
 * Attach modal event
 * @event Hub#attachModal
 * @type {object}
 * @property {Element} element
 */
/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires Hub#error
 * @fires Hub#upload
 */
export default class Hub {
  /**
   * @param {HubState} state
   * @param {object} dictionary
   */
  constructor(state, dictionary) {
    // add event system
    Object.assign(this, Eventful());

    // Setting up Dictionary
    Dictionary.init(dictionary);

    // services
    this.services = new HubServices({
      apiRootUrl: state.apiRootUrl
    });
    this.setupServices();

    // controllers
    this.contentTypeSection = new ContentTypeSection(state, this.services);
    this.uploadSection = new UploadSection(state, this.services);

    // views
    this.view = new HubView(state);

    // propagate controller events
    this.propagate(['select'], this.contentTypeSection);
    this.propagate(['upload'], this.uploadSection);

    // handle events
    this.on('select', this.setPanelTitle, this);
    this.on('select', this.view.closePanel, this.view);
    this.view.on('tab-change', this.view.setSectionType, this.view);
    this.view.on('panel-change', this.view.togglePanelOpen, this.view);
    this.contentTypeSection.on('reload', this.setupServices, this);
    this.contentTypeSection.on('modal', this.showModal, this);
    this.on('clear-upload-form', () => {
      this.uploadSection.clearUploadForm();
      this.postponedResize();
    });

    this.initTabPanel(state)
  }

  /**
   * Does a resize after 150ms
   */
  postponedResize () {
    setTimeout(() => self.trigger('resized'), 150);
  }

  /**
   * Appends a modal to the root element and shows it
   *
   * @param {Element} element
   */
  showModal({element}) {
    this.view.appendChild(element);
    element.classList.remove('hidden');
  }

  /**
   * Setup services and handle fetching data
   */
  setupServices() {
    const self = this;

    this.services.setup()
      .then(function () {
        self.contentTypeSection.loaded();
      })
      .catch(function (error) {
        self.contentTypeSection.handleError(error);
      });
  }

  /**
   * Returns the promise of a content type
   * @param {string} machineName
   * @return {Promise.<ContentType>}
   */
  getContentType(machineName) {
    return this.services.contentType(machineName);
  }

  /**
   * Sets the title of the panel
   *
   * @param {string} id
   */
  setPanelTitle({id}) {
    this.getContentType(id).then(({title}) => this.view.setTitle(title ? title : id));
  }

  /**
   * Initiates the tab panel
   *
   * @param {string} sectionId
   */
  initTabPanel({ sectionId = 'content-types' }) {
    const tabConfigs = [{
      title: Dictionary.get('createContentTabLabel'),
      id: 'content-types',
      content: this.contentTypeSection.getElement(),
    },
    {
      title: Dictionary.get('uploadTabLabel'),
      id: 'upload',
      content: this.uploadSection.getElement()
    }];

    // sets the correct one selected
    tabConfigs
      .filter(config => config.id === sectionId)
      .forEach(config => config.selected = true);

    tabConfigs.forEach(tabConfig => this.view.addTab(tabConfig));
    this.view.addBottomBorder(); // Adds an animated bottom border to each tab
    this.view.initTabPanel();
  }

  /**
   * Returns the root element in the view
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.view.getElement();
  }
}
