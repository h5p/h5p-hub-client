import { setAttribute, getAttribute } from "utils/elements";
import { curry } from "utils/functional";
import { Eventful } from '../mixins/eventful';
import initPanel from "components/panel";
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
 * Toggles the visibility if an element
 *
 * @param {HTMLElement} element
 * @param {boolean} visible
 */
const toggleVisibility = (element, visible) => (visible ? show : hide)(element);

/**
 * Checks if a string is empty
 *
 * @param {string} text
 *
 * @return {boolean}
 */
const isEmpty = (text) => (typeof text === 'string') && (text.length === 0);

/**
 * @class
 * @mixes Eventful
 */
export default class ContentTypeDetailView {
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // back button
    const backButtonElement = document.createElement('div');
    backButtonElement.className = 'back-button icon-arrow-thick';
    relayClickEventAs('close', this, backButtonElement);

    // image
    this.image = document.createElement('img');
    this.image.className = 'img-responsive';

    const imageWrapperElement = document.createElement('div');
    imageWrapperElement.className = 'image-wrapper';
    imageWrapperElement.appendChild(this.image);

    // title
    this.title = document.createElement('h3');

    // author
    this.author = document.createElement('div');
    this.author.className = 'author';
    this.author.innerHTML = 'by Joubel'; // TODO Make dynamic

    // description
    this.description = document.createElement('p');
    this.description.className = 'small';

    // demo button
    this.demoButton = document.createElement('a');
    this.demoButton.className = 'button';
    this.demoButton.innerHTML = 'Content Demo';
    this.demoButton.setAttribute('target', '_blank');
    hide(this.demoButton);

    const textDetails = document.createElement('div');
    textDetails.className = 'text-details';
    textDetails.appendChild(this.title);
    textDetails.appendChild(this.author);
    textDetails.appendChild(this.description);
    textDetails.appendChild(this.demoButton);

    const detailsElement = document.createElement('div');
    detailsElement.className = 'container';
    detailsElement.appendChild(imageWrapperElement);
    detailsElement.appendChild(textDetails);

    // use button
    this.useButton = document.createElement('span');
    this.useButton.className = 'button button-primary';
    this.useButton.innerHTML = 'Use';
    hide(this.useButton);
    relayClickEventAs('select', this, this.useButton);

    // install button
    this.installButton = document.createElement('span');
    this.installButton.className = 'button button-inverse-primary';
    this.installButton.innerHTML = 'Install';
    hide(this.installButton);
    relayClickEventAs('install', this, this.installButton);

    const buttonBar = document.createElement('div');
    buttonBar.className = 'button-bar';
    buttonBar.appendChild(this.useButton);
    buttonBar.appendChild(this.installButton);

    // licence panel
    const licencePanel = this.createPanel('The Licence Info', 'ipsum lorum', 'licence-panel');
    const pluginsPanel = this.createPanel('Available plugins', 'ipsum lorum', 'plugins-panel');
    const publisherPanel = this.createPanel('Publisher Info', 'ipsum lorum', 'publisher-panel');

    // panel group
    const panelGroupElement = document.createElement('div');
    panelGroupElement.className = 'panel-group';
    panelGroupElement.appendChild(licencePanel);
    panelGroupElement.appendChild(pluginsPanel);
    panelGroupElement.appendChild(publisherPanel);

    // images
    this.carousel = document.createElement('ul');


    // add root element
    this.rootElement = document.createElement('div');
    this.rootElement.className = 'content-type-detail';
    this.rootElement.setAttribute('aria-hidden', 'true');
    this.rootElement.appendChild(backButtonElement);
    this.rootElement.appendChild(detailsElement);
    this.rootElement.appendChild(buttonBar);
    this.rootElement.appendChild(this.carousel);
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
   * Add image to the carousel
   *
   * @param {object} image
   */
  addImageToCarousel(image) {
    const item = document.createElement('li');
    item.innerHTML = `<img src="${image.url}" alt="${image.alt}" style="width: 100px;"/>`;

    this.carousel.appendChild(item);
  }

  /**
   * Sets the image
   *
   * @param {string} src
   */
  setImage(src) {
    this.image.setAttribute('src', src);
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
    this.title.innerHTML = title;
  }

  /**
   * Sets the long description
   *
   * @param {string} text
   */
  setDescription(text) {
    this.description.innerHTML = text;
  }

  /**
   * Sets the example url
   *
   * @param {string} url
   */
  setExample(url) {
    this.demoButton.setAttribute('href', url || '#');
    toggleVisibility(this.demoButton, !isEmpty(url));
  }

  /**
   * Sets if the content type is installed
   *
   * @param {boolean} installed
   */
  setIsInstalled(installed) {
    toggleVisibility(this.useButton, installed);
    toggleVisibility(this.installButton, !installed);
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