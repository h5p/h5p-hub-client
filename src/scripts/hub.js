import React from 'react';
import ReactDOM from 'react-dom';
import Hub from './HubComponents/Hub/Hub';
import HubServices from './hub-services';
import Dictionary from './utils/dictionary';
import { Eventful } from './mixins/eventful';

/**
 * @class
 * @mixes Eventful
 */
export default class HubClient {
  /**
   * @param {Object} state
   * @param {Object} dictionary
   */
  constructor(state, dictionary) {
    // add event system
    Object.assign(this, Eventful());

    var container = document.createElement('div');

    // Setting up Dictionary
    Dictionary.init(dictionary);

    // Setting up service
    HubServices.init(0, '');

    // Render react into root element
    ReactDOM.render(
      <Hub
        contentId={state.contentId}
        contentTypes={state.contentTypes}
        selected={state.selected}
        apiVersion={state.apiVersion}
        onResize={this.trigger.bind(this, 'resize')}
      />,
      container
    );

    /**
     * @return {HTMLElement} Container with the Hub
     */
    this.getElement = function () {
      return container;
    };
  }
}
