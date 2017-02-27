import { setAttribute, getAttribute } from "../../../node_modules/h5p-sdk/src/scripts/utils/elements";
import { curry } from "../../../node_modules/h5p-sdk/src/scripts/utils/functional";
import { Eventful } from '../mixins/eventful';
import initPanel from "../../../node_modules/h5p-sdk/src/scripts/components/panel"

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
    })
  });

  return element;
});

export default class ContentTypeDetailView {
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // image
    this.imageElement = document.createElement('img');
    this.imageElement.className = 'img-responsive';

    // title
    this.titleElement = document.createElement('h2');
    this.titleElement.className = 'content-type-detail';
    this.titleElement.innerHTML = 'title';

    // back button
    const backButtonElement = document.createElement('div');
    backButtonElement.className = 'back-button';
    backButtonElement.innerHTML = '<-';
    relayClickEventAs('close', this, backButtonElement);

    // detail
    this.longDescriptioneElement = document.createElement('div');
    this.longDescriptioneElement.className = 'content-type-detail';
    this.longDescriptioneElement.innerHTML = 'description';

    // demo button
    const demoButton = document.createElement('span');
    demoButton.className = 'button';
    demoButton.innerHTML = 'Content Demo';
    relayClickEventAs('select', this, demoButton);

    // use button
    this.useButton = document.createElement('span');
    this.useButton.className = 'button';
    this.useButton.innerHTML = 'Use';
    relayClickEventAs('select', this, this.useButton);

    // install button
    this.installButton = document.createElement('span');
    this.installButton.className = 'button button-inverse';
    this.installButton.innerHTML = 'Install';
    relayClickEventAs('install', this, this.installButton);

    // licence panel
    const licencePanel = this.createPanel('The Licence Info', 'ipsum lorum', 'licence-panel');

    // panel group
    const panelGroupElement = document.createElement('div');
    panelGroupElement.className = 'panel-group';
    panelGroupElement.appendChild(licencePanel);

    // add root element
    this.rootElement = document.createElement('div');
    this.rootElement.className = 'content-type-detail';
    this.rootElement.setAttribute('aria-hidden', 'true');
    this.rootElement.appendChild(backButtonElement);
    this.rootElement.appendChild(this.imageElement);
    this.rootElement.appendChild(this.titleElement);
    this.rootElement.appendChild(this.longDescriptioneElement);
    this.rootElement.appendChild(demoButton);
    this.rootElement.appendChild(this.useButton);
    this.rootElement.appendChild(this.installButton);
    this.rootElement.appendChild(panelGroupElement);
  }

  /**
   * Creates a panel
   *
   * @param {string} title
   * @param {string} body
   * @param {string} bodyId
   *
   * @return {HTMLElement}
   */
  createPanel(title, body, bodyId) {
    const headerEl = document.createElement('div');
    headerEl.className = 'panel-header';
    headerEl.setAttribute('aria-expanded', 'false');
    headerEl.setAttribute('aria-controls', bodyId);
    headerEl.innerHTML = title;

    const bodyInnerEl = document.createElement('div');
    bodyInnerEl.className = 'panel-body-inner';
    bodyInnerEl.innerHTML = body;

    const bodyEl = document.createElement('div');
    bodyEl.className = 'panel-body';
    bodyEl.id = bodyId;
    bodyEl.setAttribute('aria-hidden', 'true');
    bodyEl.appendChild(bodyInnerEl);

    const panelEl = document.createElement('div');
    panelEl.className = 'panel';
    panelEl.appendChild(headerEl);
    panelEl.appendChild(bodyEl);

    initPanel(panelEl);

    return panelEl;
  }

  /**
   * Sets the image
   *
   * @param {string} src
   */
  setImage(src) {
    this.imageElement.setAttribute('src', src);
  }

  /**
   * Sets the title
   *
   * @param {string} id
   */
  setId(id) {
    this.installButton.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, id);
    this.useButton.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, id);
  }

  /**
   * Sets the title
   *
   * @param {string} title
   */
  setTitle(title) {
    this.titleElement.innerHTML = title;
  }

  /**
   * Sets the long description
   *
   * @param {string} text
   */
  setLongDescription(text) {
    this.longDescriptioneElement.innerHTML = text;
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
   * Returns the root html element
   * @return {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}