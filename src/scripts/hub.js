import React from 'react';
import ReactDOM from 'react-dom';
import Hub from './Components/Hub';
import Dictionary from './utils/dictionary';
import { Eventful } from './mixins/eventful';
import ApiClient from './utils/content-hub/api-client';

/**
 * @class
 * @mixes Eventful
 */
export default class HubClient {
  /**
   * @param {Object} state
   * @param {Object} dictionary
   */
  constructor(state, dictionary, language = 'en') {
    // add event system
    Object.assign(this, Eventful());

    const self = this;
    const container = this.createContainerElement('div');

    // Setting up Dictionary
    Dictionary.init(dictionary);
    ApiClient.init(language, state.getAjaxUrl('content-hub-metadata-cache'), state.contentTypes);

    /**
     * @private
     */
    const render = function () {
      // Render react into root element
      ReactDOM.render(
        <Hub
          title={state.title}
          expanded={state.expanded}
          canPaste={state.canPaste}
          canPasteTitle={state.canPasteTitle}
          contentId={state.contentId}
          contentTypes={state.contentTypes}
          selected={state.selected}
          getAjaxUrl={state.getAjaxUrl}
          onResize={self.trigger.bind(self, 'resize')}
          onUse={self.trigger.bind(self, 'select')}
          onUpload={self.trigger.bind(self, 'upload')}
          onUpdate={self.trigger.bind(self, 'update')}
          onPaste={self.trigger.bind(self, 'paste')}
          onRender={(title, expanded) => {state.title = title; state.expanded = expanded;}}
          enableContentHub={state.enableContentHub}
          disabled={state.disabled}
        />,
        container
      );
    };

    /**
     * @return {HTMLElement} Container with the Hub
     */
    this.setPanelTitle = function (title, expanded) {
      state.title = title;
      state.expanded = expanded;
      render(); // Re-render
    };

    /**
     * Enable/disable the paste button in the Hub
     */
    this.setCanPaste = function (canPaste, title) {
      state.canPaste = canPaste;
      state.canPasteTitle = title;
      render();
    };

    /**
     * @return {HTMLElement} Container with the Hub
     */
    this.getElement = function () {
      return container;
    };

    // Trigger initial rendering
    render();
  }

  /**
   * Creates a DOM element and attaches listeners to the window object to
   * detect if the user is navigating using their mouse or keyboard, assigning
   * a CSS class to the container to allow distinctive styling.
   *
   * @param {string} tagName
   * @returns {HTMLElement}
   */
  createContainerElement(tagName) {
    const NAV_KEY_CODES = ['Enter', 'Space', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];
    const USING_MOUSE_SELECTOR = 'h5p-hub-client-container-using-mouse';

    const container = document.createElement(tagName);
    container.classList.add(USING_MOUSE_SELECTOR);

    window.addEventListener('keydown', (event) => {
      if (NAV_KEY_CODES.indexOf(event.code) !== -1) {
        container.classList.remove(USING_MOUSE_SELECTOR);
      }
    });

    window.addEventListener('mousedown', () => {
      container.classList.add(USING_MOUSE_SELECTOR);
    });

    return container;
  }
}
