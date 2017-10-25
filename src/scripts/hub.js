import React from 'react';
import ReactDOM from 'react-dom';

import HubView from './hub-view';
import ContentTypeSection from './content-type-section/content-type-section';
import UploadSection from './upload-section/upload-section';
import HubViewContainer from './HubComponents/HubViewContainer';
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
   * @param {Object} services
   * @param {object} dictionary
   */
  constructor(state, services, dictionary) {
    const self = this;

    // add event system
    Object.assign(this, Eventful());
    this.rootElement = document.createElement('div');

    // Setting up Dictionary
    Dictionary.init(dictionary);

    // services
    this.services = services;
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
    this.on('select', this.togglePanel.bind(this, false));
    this.on('upload', this.togglePanel.bind(this, false));
    this.view.on('tab-change', event => {
      if (event.id === 'upload' && !event.element.getAttribute('aria-selected')) {
        // Clean up messages
        self.uploadSection.clearMessages();
      }

      this.view.setSectionType(event);
    });
    this.view.on('panel-change', ({element}) => {
      this.togglePanel();
      if (element.getAttribute('aria-expanded') === 'true') {
        this.contentTypeSection.focusSearchBar();
      }
    }, this);
    this.contentTypeSection.on('reload', this.setupServices, this);
    this.contentTypeSection.on('reload', this.contentTypeSection.selectDefaultMenuItem.bind(this.contentTypeSection, false));
    this.contentTypeSection.on('modal', this.showModal, this);
    this.on('clear-upload-form', () => {
      this.uploadSection.clearUploadForm();
    });

    this.initTabPanel(state);

    this.title = Dictionary.get('hubPanelLabel');
    this.isExpanded = false;
    this.renderView();
  }

  /**
   * Appends a modal to the root element and shows it
   *
   * @param {HTMLElement} element
   */
  showModal({element}) {
    // Prepend to catch and trap focus
    const parent = this.view.getElement();
    parent.insertBefore(element, parent.firstChild);
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
    this.getContentType(id).then(({title}) => {
      this.view.setTitle(title ? title : id);
      this.title = title ? title : id;
      this.renderView();
    });
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
    this.view.initTabPanel();
    this.tabConfigs = tabConfigs;
  }

  togglePanel(forceToggle) {
    const isBool = typeof forceToggle === 'boolean';
    this.isExpanded = isBool ? forceToggle : !this.isExpanded;
    this.renderView();
  }

  renderView() {
    // Render react into root element
    ReactDOM.render(
      <HubViewContainer
        title={this.title}
        isExpanded={this.isExpanded}
        tabConfigs={this.tabConfigs}
        togglePanel={this.togglePanel.bind(this)}
        resize={this.trigger.bind(this, 'resized')}
      />,
      this.rootElement
    );
  }

  /**
   * Returns the root element in the view
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}
