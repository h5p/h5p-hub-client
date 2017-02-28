import { curry } from "../../../node_modules/h5p-sdk/src/scripts/utils/functional";
import { setAttribute, getAttribute } from "../../../node_modules/h5p-sdk/src/scripts/utils/elements";
import { Eventful } from '../mixins/eventful';

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
 * Propagates row selection trough the event system
 *
 * @param {Eventful} eventful
 * @param {HTMLElement} element
 *
 * @function
 * @return {HTMLElement}
 */
const relayClickEventAs = curry(function(type, eventful, element) {
  element.addEventListener('click', event => {
    eventful.fire(type, {
      element: element,
      id: getAttribute(ATTRIBUTE_CONTENT_TYPE_ID, element)
    }, false);

    event.preventDefault();
  });

  return element;
});

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
      .forEach(this.rootElement.appendChild.bind(this.rootElement));
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
      .map(this.renderContentTypeRow.bind(this))
      .map(relayClickEventAs('row-selected', this))
  }

  /**
   * Takes a Content Type configuration and creates a row dom
   *
   * @param {ContentType} contentType
   *
   * @return {HTMLElement}
   */
  renderContentTypeRow(contentType) {
    // image
    const image = document.createElement('img');
    image.setAttribute('src', contentType.icon);

    // button
    const button = document.createElement('span');
    button.className = "button button-primary";
    button.innerHTML = "Use";
    button.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, contentType.id);
    relayClickEventAs('select', this, button);

    // title
    const title = document.createElement('div');
    title.className = 'content-type-list-title';
    title.innerHTML = contentType.title;

    // description
    const description = document.createElement('div');
    description.className = 'content-type-list-description';
    description.innerHTML = contentType.summary;

    // list item
    const row = document.createElement('li');
    row.id = `content-type-${contentType.id}`;
    row.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, contentType.id);
    row.appendChild(image);
    row.appendChild(button);
    row.appendChild(title);
    row.appendChild(description);

    return row;
  }

  getElement() {
    return this.rootElement;
  }
}
