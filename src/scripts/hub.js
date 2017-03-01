import HubView from './hub-view';
import ContentTypeSection from './content-type-section/content-type-section';
import UploadSection from './upload-section/upload-section';
import HubServices from './hub-services';
import { Eventful } from './mixins/eventful';

/**
 * @typedef {object} HubState
 * @property {string} title
 * @property {string} sectionId
 * @property {boolean} expanded
 * @property {string} apiRootUrl
 */
/**
 * @class
 * @mixes Eventful
 */
export default class Hub {
  /**
   * @param {HubState} state
   */
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // controllers
    this.contentTypeSection = new ContentTypeSection(state);
    this.uploadSection = new UploadSection(state);

    // views
    this.view = new HubView(state);

    // services
    this.services = new HubServices({
      apiRootUrl: state.apiRootUrl
    });

    // propag ate controller events
    this.propagate(['select', 'resize'], this.contentTypeSection);

    // handle events
    this.on('select', this.setPanelTitle, this);
    this.on('select', this.view.closePanel, this.view);
    this.on('resize', this.view.resize, this.view);

    this.initTabPanel()
  }

  /**
   * Returns the promise of a content type
   * @param {string} id
   * @return {Promise.<ContentType>}
   */
  getContentType(id) {
    return this.services.contentType(id);
  }

  /**
   * Sets the title of the panel
   *
   * @param {string} id
   */
  setPanelTitle({id}) {
    this.getContentType(id).then(({title}) => this.view.setTitle(title));
  }

  /**
   * Initiates the tab panel
   */
  initTabPanel() {
    const tabConfigs = [{
      title: 'Create Content',
      id: 'create-content',
      content: this.contentTypeSection.getElement(),
      selected: true
    },
    {
      title: 'Upload',
      id: 'upload-section',
      content: this.uploadSection.getElement()
    }];

    tabConfigs.forEach(tabConfig => this.view.addTab(tabConfig));
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
