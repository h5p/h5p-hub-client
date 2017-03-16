import { curry } from "utils/functional";
import { setAttribute, getAttribute, removeChild } from "utils/elements";
import { EventDispatcher } from '../mixins/event-dispatcher';
import { relayClickEventAs } from '../utils/events';
import noIcon from '../../images/content-type-placeholder.svg';

/**
 * @function
 */
const hide = setAttribute('aria-hidden', 'true');

/**
 * @function
 */
const show = setAttribute('aria-hidden', 'false');

/**
 * @class
 * @mixes EventDispatcher
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 */
export default class ContentTypeListView {
  constructor(state) {
    this.state = state;

    // add event system
    Object.assign(this, EventDispatcher());

    // create root element
    this.rootElement = document.createElement('ul');
    this.rootElement.className = 'content-type-list';
  }

  /**
   * Hides the root element
   */
  hide() {
    hide(this.rootElement);
  }

  /**
   * Shows the root element
   */
  show() {
    show(this.rootElement);
  }

  /**
   * Removes all rows from root element
   */
  removeAllRows() {
    while(this.rootElement.hasChildNodes() ){
      this.rootElement.removeChild(this.rootElement.lastChild);
    }
  }

  /**
   * Adds a row
   *
   * @param {ContentType} contentType
   */
  addRow(contentType) {
    const row = this.createContentTypeRow(contentType, this);
    relayClickEventAs('row-selected', this, row);
    this.rootElement.appendChild(row)
  }

  /**
   * Takes a Content Type configuration and creates a row dom
   *
   * @param {ContentType} contentType
   * @param {EventDispatcher} scope
   *
   * @return {HTMLElement}
   */
  createContentTypeRow(contentType, scope) {
    // row item
    const element = document.createElement('li');
    element.id = `content-type-${contentType.machineName}`;
    element.setAttribute('data-id', contentType.machineName);

    // create button config
    const useButtonConfig = { text: 'Use', cls: 'button-primary', icon: '' };
    const installButtonConfig = { text: 'Get', cls: 'button-inverse-primary button-install', icon: 'icon-arrow-thick'};
    const button = contentType.installed ?  useButtonConfig: installButtonConfig;

    const title = contentType.title || contentType.machineName;
    const description = contentType.summary || '';

    const image = contentType.icon || noIcon;

    // create html
    element.innerHTML = `
      <img class="img-responsive" src="${image}">
      <span class="button ${button.cls}" data-id="${contentType.machineName}" tabindex="0"><span class="${button.icon}"></span>${button.text}</span>
      <h4>${title}</h4>
      <div class="description">${description}</div>
   `;

    // handle use button
    const useButton = element.querySelector('.button-primary');
    if(useButton){
      relayClickEventAs('select', scope, useButton);
    }

    return element;
  }

  /**
   * Returns the root element
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}
