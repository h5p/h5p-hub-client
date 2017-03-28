import { Eventful } from '../mixins/eventful';
import { relayClickEventAs } from '../utils/events';
import Dictionary from '../utils/dictionary';


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
   * @param {string} [state.content]
   * @param {string} [state.name]
   * @param {string} [state.action]
   * @param {string} [state.dismissable]
   */
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    state.name = state.name || '';

    // create elements
    this.rootElement = this.createElement(state);
  }

  createElement(message) {
    // Create wrapper:
    const messageWrapper = document.createElement('div');
    messageWrapper.className = `message ${message.name} ${message.type}` + (message.dismissible ? ' dismissible' : '');
    messageWrapper.setAttribute('role', 'alert');

    // Add close button if dismisable
    if (message.dismissible) {
      const closeButton = document.createElement('button');
      closeButton.className = 'message-close';
      closeButton.setAttribute('tabIndex', 0);
      closeButton.setAttribute('aria-label', Dictionary.get('closeButtonLabel'));
      messageWrapper.appendChild(closeButton);
      relayClickEventAs('close', this, closeButton);
    }

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = '<h2>' + message.title + '</h2>' + (message.content ? ('<p>' + message.content + '</p>') : '');
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
