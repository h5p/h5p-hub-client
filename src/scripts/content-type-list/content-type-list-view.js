import { curry } from "utils/functional";
import { setAttribute, getAttribute, removeChild, querySelector } from "utils/elements";
import { Eventful } from '../mixins/eventful';
import { relayClickEventAs } from '../utils/events';
import noIcon from '../../images/content-type-placeholder.svg';
import Keyboard from 'utils/keyboard';

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

    // setup keyboard
    this.keyboard = new Keyboard();
    this.keyboard.onSelect = element => {
      this.trigger('row-selected', {
        element: element,
        id: getRowId(element)
      })
    };

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
   * Focuses on the previously selected element
   */
  focus() {
    const selectedElement = querySelector('li[tabindex="0"]', this.rootElement);

    if(selectedElement) {
      selectedElement.focus();
    }
  }

  /**
   * Removes all rows from root element
   */
  removeAllRows() {
    while(this.rootElement.hasChildNodes()){
      let row = this.rootElement.lastChild;

      this.keyboard.removeElement(row);
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
    this.keyboard.addElement(row);
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
    const labels = {
      icon: 'Icon'
    };

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
      <img class="img-responsive" src="${image}" alt="${title} ${labels.icon}" />
      
      <div class="content-type-row-info">
        <h4 id="${contentTypeRowTitleId}">${title}</h4>
        <div id="${contentTypeRowDescriptionId}" class="description">${description}</div>
      </div>
      
      <div class="content-type-row-button">
        <button aria-describedby="${contentTypeRowTitleId}" class="button ${button.cls}" data-id="${contentType.machineName}" tabindex="0" ${disabled}>
          <span class="${button.icon}"></span>
          ${button.text}
        </button>
      </div>
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
