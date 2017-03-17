import { curry } from "utils/functional";
import { setAttribute, getAttribute, removeChild } from "utils/elements";
import { Eventful } from '../mixins/eventful';
import { relayClickEventAs } from '../utils/events';
import Controls from 'h5p-sdk-ui/src/scripts/controls';
import Keyboard from 'h5p-sdk-ui/src/scripts/ui/keyboard';
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
 * @function
 */
const getRowId = getAttribute('data-id');

/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 */
export default class ContentTypeListView {
  constructor(state) {
    this.state = state;

    // add event system
    Object.assign(this, Eventful());

    // install controls
    this.controls = new Controls([new Keyboard()]);
    this.controls.on('select', event => {
      this.fire('row-selected', {
        element: event.element,
        id: getRowId(event.element)
      })
    });

    // create root element
    this.rootElement = document.createElement('ul');
    this.rootElement.setAttribute('role', 'list');
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
    while(this.rootElement.hasChildNodes()){
      let row = this.rootElement.lastChild;

      this.controls.removeElement(row);
      this.rootElement.removeChild(row);
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
    this.rootElement.appendChild(row);
    this.controls.addElement(row);
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
    // create ids
    const index = this.rootElement.querySelectorAll('li').length;
    const contentTypeRowTitleId = `content-type-row-title-${index}`;
    const contentTypeRowDescriptionId = `content-type-row-description-${index}`;

    // field configuration
    const useButtonConfig = { text: 'Use', cls: 'button-primary', icon: '' };
    const installButtonConfig = { text: 'Get', cls: 'button-inverse-primary button-install', icon: 'icon-arrow-thick'};
    const button = contentType.installed ?  useButtonConfig: installButtonConfig;
    const title = contentType.title || contentType.machineName;
    const description = contentType.summary || '';
    const image = contentType.icon || noIcon;
    const disabled = contentType.restricted ? 'disabled="disabled"' : '';

    // row item
    const element = document.createElement('li');
    element.id = `content-type-${contentType.machineName}`;
    element.setAttribute('data-id', contentType.machineName);
    element.setAttribute('aria-labelledby', contentTypeRowTitleId);
    element.setAttribute('aria-describedby', contentTypeRowDescriptionId);

    // create html
    element.innerHTML = `
      <img class="img-responsive" src="${image}">
      <button aria-describedby="${contentTypeRowTitleId}" class="button ${button.cls}" data-id="${contentType.machineName}" tabindex="0" ${disabled}>
        <span class="${button.icon}"></span>
        ${button.text}
      </button>
      <h4 id="${contentTypeRowTitleId}">${title}</h4>
      <div id="${contentTypeRowDescriptionId}" class="description">${description}</div>
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
