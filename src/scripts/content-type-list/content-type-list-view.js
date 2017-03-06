import { curry } from "utils/functional";
import { setAttribute, getAttribute } from "utils/elements";
import { Eventful } from '../mixins/eventful';
import { relayClickEventAs } from '../utils/events';

/**
 * @constant {string}
 */
const ATTRIBUTE_CONTENT_TYPE_ID = 'data-id';

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
 */
export default class ContentTypeListView {
  constructor(state) {
    this.state = state;

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
   *
   * @param {ContentType[]} contentTypes
   */
  updateList(contentTypes) {
    if(this.rootElement){
      while(this.rootElement.firstChild ){
        this.rootElement.removeChild(this.rootElement.firstChild);
      }
    }

    this.renderContentTypeList(contentTypes)
      .forEach(contentType => this.rootElement.appendChild(contentType));
  }

  /**
   * Applies create rows, and add to the list
   *
   * @param {ContentType[]} contentTypes
   *
   * @return {HTMLElement[]}
   */
  renderContentTypeList(contentTypes) {
    return contentTypes
      .map(contentType => this.createContentTypeRow(contentType))
      .map(relayClickEventAs('row-selected', this))
  }

  /**
   * Takes a Content Type configuration and creates a row dom
   *
   * @param {ContentType} contentType
   *
   * @return {HTMLElement}
   */
  createContentTypeRow(contentType) {
    // image
    const image = document.createElement('img');
    image.className = 'img-responsive';
    image.setAttribute('src', contentType.icon);

    // title
    const title = document.createElement('h4');
    title.innerHTML = contentType.title;

    // description
    const description = document.createElement('div');
    description.className = 'description';
    description.innerHTML = contentType.summary;

    // list item
    const row = document.createElement('li');
    row.id = `content-type-${contentType.machineName}`;
    row.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, contentType.machineName);
    row.appendChild(image);
    row.appendChild(this.createButtonElement(contentType));
    row.appendChild(title);
    row.appendChild(description);

    return row;
  }

  /**
   *
   * @param {ContentType} contentType
   */
  createButtonElement(contentType) {
    const button = document.createElement('span');

    if(contentType.installed) {
      button.className = "button button-primary";
      button.innerHTML = "Use";
      button.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, contentType.machineName);
      relayClickEventAs('select', this, button);
    }
    else {
      button.className = "button button-inverse-primary";
      button.innerHTML = "Get";
      // no functionality, uses click event on row
    }

    return button;
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
