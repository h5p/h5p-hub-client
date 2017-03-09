import { curry } from "utils/functional";
import { setAttribute, getAttribute } from "utils/elements";
import { Eventful } from '../mixins/eventful';
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
 * @mixes Eventful
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 */
export default class ContentTypeListView {
  constructor(state) {
    this.state = state;

    console.log('place', noIcon);

    // add event system
    Object.assign(this, Eventful());

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
    if(this.rootElement){
      while(this.rootElement.firstChild){
        this.rootElement.removeChild(this.rootElement.firstChild);
      }
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
   * @param {Eventful} scope
   *
   * @return {HTMLElement}
   */
  createContentTypeRow(contentType, scope) {
    // row item
    const element = document.createElement('li');
    element.id = `content-type-${contentType.machineName}`;
    element.setAttribute('data-id', contentType.machineName);

    // create button config
    const useButtonConfig = { text: 'Use', cls: 'button-primary' };
    const installButtonConfig = { text: 'install', cls: 'button-inverse-primary'};
    const button = contentType.installed ?  useButtonConfig: installButtonConfig;

    const title = contentType.title || contentType.machineName;
    const description = contentType.summary || '';

    const image = contentType.icon || noIcon;

    // create html
    element.innerHTML = `
      <img class="img-responsive" src="${image}">
      <span class="button ${button.cls}" data-id="${contentType.machineName}" tabindex="0">${button.text}</span>
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
