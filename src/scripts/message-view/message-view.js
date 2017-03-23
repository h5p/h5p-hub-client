import {Eventful} from '../mixins/eventful';
import {relayClickEventAs} from '../utils/events';

/**
 * @class MessageView
 * @mixes Eventful
 */
export default class MessageView {
  /**
   * @constructor
   * @param {Object} state
   * @param {string} state.type 'info', 'warning' or 'error'
   * @param {string} state.title
   * @param {string} state.content
   * @param {string} [state.action]
   * @param {string} [state.dismissable]
   */
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // create elements
    this.rootElement = this.createElement(state);
  }

  createElement(message) {
    // Create wrapper:
    const messageWrapper = document.createElement('div');
    messageWrapper.className = `message ${message.type}` + (message.dismissible ? ' dismissible' : '');
    messageWrapper.setAttribute('role', 'alert');

    // Add close button if dismisable
    if (message.dismissible) {
      const closeButton = document.createElement('div');
      closeButton.className = 'close';
      //closeButton.innerHTML = '&#x2715';
      // TODO
      // - Add close label from translations
      // - Add visuals in CSS (font icon)
      messageWrapper.appendChild(closeButton);
      relayClickEventAs('close', this, closeButton);
    }

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = '<h2>' + message.title + '</h2>' + '<p>' + message.content + '</p>';
    messageWrapper.appendChild(messageContent);

    if (message.action !== undefined) {
      const messageButton = document.createElement('button');
      messageButton.className = 'button';
      messageButton.innerHTML = message.action;
      messageWrapper.appendChild(messageButton);

      relayClickEventAs('action-clicked', this, messageButton);
    }

    return messageWrapper;
  }

  /**
   * Returns the root element of the content browser
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}
