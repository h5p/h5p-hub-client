import React from 'react';
import ReactDOM from 'react-dom';

import ContentTypeSection from './content-type-section/content-type-section';
import UploadSection from './upload-section/upload-section';
import HubViewContainer from './HubComponents/HubViewContainer/HubViewContainer';
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

    this.initializeListeners();

    this.title = Dictionary.get('hubPanelLabel');
    this.isExpanded = false;
    this.renderView(state);
  }

  initializeListeners() {
    // propagate controller events
    this.propagate(['select'], this.contentTypeSection);
    this.propagate(['upload'], this.uploadSection);

    // handle events
    this.on('select', this.setPanelTitle, this);
    this.on('select', this.togglePanel.bind(this, false));
    this.on('upload', this.togglePanel.bind(this, false));
    this.contentTypeSection.on('reload', this.setupServices, this);
    this.contentTypeSection.on('reload', this.contentTypeSection.selectDefaultMenuItem.bind(this.contentTypeSection, false));
    this.contentTypeSection.on('modal', this.showModal, this);
    this.on('clear-upload-form', () => {
      this.uploadSection.clearUploadForm();
    });
  }

  /**
   * Appends a modal to the root element and shows it
   *
   * @param {HTMLElement} element
   */
  showModal({element}) {
    // Prepend to catch and trap focus
    const parent = this.rootElement;
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
        self.error = error;
        self.renderView();
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
  setPanelTitle({id}) {
    this.getContentType(id).then(({title}) => {
      this.title = title ? title : id;
      this.renderView();
    });
  }

  togglePanel(forceToggle) {
    const isBool = typeof forceToggle === 'boolean';
    this.isExpanded = isBool ? forceToggle : !this.isExpanded;
    this.renderView();
  }

  renderView(state) {
    // Render react into root element
    // TODO: Error should really be inserted into content type list: HFP-1644
    ReactDOM.render(
      <HubViewContainer
        title={this.title}
        error={this.error}
        isExpanded={this.isExpanded}
        togglePanel={this.togglePanel.bind(this)}
        resize={this.trigger.bind(this, 'resized')}
        state={state||{}}
        oldCreateContent={this.contentTypeSection.getElement()}
        oldUploadContent={this.uploadSection.getElement()}
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
