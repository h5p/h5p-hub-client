import { setAttribute, getAttribute, removeAttribute, attributeEquals, removeChild, hide, show } from "utils/elements";
import { curry, forEach } from "utils/functional";
import { Eventful } from '../mixins/eventful';
import initPanel from "components/panel";
import initImageScroller from "components/image-scroller";
import { relayClickEventAs } from '../utils/events';
import noIcon from '../../images/content-type-placeholder.svg';
import Dictionary from '../utils/dictionary';
import MessageView from '../message-view/message-view';

/**
 * @constant {string}
 */
const ATTRIBUTE_CONTENT_TYPE_ID = 'data-id';

/**
 * @constant {number}
 */
const MAX_TEXT_SIZE_DESCRIPTION = 285;

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
 * Hides all elements in an array
 *
 * @param {HTMLElement[]} elements
 *
 * @function
 */
const hideAll = forEach(hide);

/**
 * Disables an HTMLElement
 *
 * @param {HTMLElement} element
 *
 * @function
 */
const disable = setAttribute('disabled', '');

/**
 * Disables an HTMLElement
 *
 * @param {HTMLElement} element
 *
 * @function
 */
const enable = removeAttribute('disabled');

/**
 * Returns true if attribute aria-hidden = 'true' on an element
 *
 * @param {HTMLElement} element
 *
 * @function
 */
const isHidden = attributeEquals('aria-hidden', 'true');

/**
 * @class
 * @mixes Eventful
 */
export default class ContentTypeDetailView {
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // create view
    this.rootElement = this.createView();

    // grab references
    this.buttonBar = this.rootElement.querySelector('.button-bar');
    this.useButton = this.buttonBar.querySelector('.button-use');
    this.installButton = this.buttonBar.querySelector('.button-install');
    this.buttons = this.buttonBar.querySelectorAll('.button');

    this.image = this.rootElement.querySelector('.content-type-image');
    this.title = this.rootElement.querySelector('.text-details .title');
    this.owner = this.rootElement.querySelector('.owner');
    this.description = this.rootElement.querySelector('.text-details .small');
    this.demoButton = this.rootElement.querySelector('.demo-button');
    this.carousel = this.rootElement.querySelector('.carousel');
    this.carouselList = this.carousel.querySelector('ul');
    this.panel = this.rootElement.querySelector('.panel');
    this.licencePanelHeading = this.rootElement.querySelector('.licence-panel-heading');
    this.licencePanelBody = this.rootElement.querySelector('#licence-panel');
    this.installMessage = this.rootElement.querySelector('.install-message');
    this.container = this.rootElement.querySelector('.container');

    // hide message on close button click
    let installMessageClose = this.installMessage.querySelector('.message-close');
    installMessageClose.addEventListener('click', () => this.resetInstallMessage());

    // init interactive elements
    initPanel(this.panel);
    initImageScroller(this.carousel);

    // fire events on button click
    relayClickEventAs('close', this, this.rootElement.querySelector('.back-button'));
    relayClickEventAs('select', this, this.useButton);
    relayClickEventAs('install', this, this.installButton);
  }

  /**
   * Creates the view as a HTMLElement
   *
   * @return {HTMLElement}
   */
  createView () {
    const labels = { // todo translate me
      back: 'Back',
      close: 'Close',
      use: 'Use',
      install: 'Install',
      installing: 'Installing'
    };

    // ids
    const titleId = 'content-type-detail-view-title';

    // create element
    const element = document.createElement('div');
    element.className = 'content-type-detail';
    element.id = 'content-type-detail';
    element.setAttribute('role', 'region');
    element.setAttribute('tabindex', '-1');
    element.setAttribute('aria-labelledby', titleId);
    element.setAttribute('aria-hidden', 'true');

    element.innerHTML = `
      <button class="back-button icon-arrow-thick" aria-label="${labels.back}" tabindex="0"></button>
      <div class="container">
        <div class="image-wrapper"><img class="img-responsive content-type-image" src="${noIcon}"></div>
        <div class="text-details">
          <h2 id="${titleId}" class="title"></h2>
          <div class="owner"></div>
          <p class="small"></p>
          <a class="button demo-button" target="_blank" aria-hidden="false" href="#">Content Demo</a>
        </div>
      </div>
      <div class="carousel" role="region" data-size="5">
        <button class="carousel-button previous" aria-hidden="true" disabled><span class="icon-arrow-thick"></span></button>
        <button class="carousel-button next" aria-hidden="true" disabled><span class="icon-arrow-thick"></span></button>
        <nav class="scroller">
          <ul></ul>
        </nav>
      </div>
      <hr />
      <div role="alert" class="install-message message dismissible simple info" aria-hidden="true">
        <button aria-label="${labels.close}" class="message-close icon-close"></button>
        <h3 class="title"></h3>
      </div>
      <div class="button-bar">
        <button class="button button-primary button-use" aria-hidden="false" data-id="">${labels.use}</button>
        <button class="button button-inverse-primary button-install" aria-hidden="true" data-id=""><span class="icon-arrow-thick"></span>${Dictionary.get('installButtonLabel')}</button>
        <button class="button button-inverse-primary button-installing" aria-hidden="true"><span class="icon-loading-search icon-spin"></span>${labels.installing}</button>
      </div>
      <dl class="panel">
        <dt aria-level="2" role="heading" class="licence-panel-heading">
          <a href="#" role="button" aria-expanded="false" aria-controls="licence-panel">
            <span class="icon-accordion-arrow"></span> The Licence Info
          </a>
        </dt>
        <dl id="licence-panel" role="region" aria-hidden="true">
          <div class="panel-body"></div>
        </dl>
      </dl>`;

    return element;
  }

  /**
   * Sets a message on install
   *
   * @param {boolean} success
   * @param {string} message
   */
  setInstallMessage({ success = true, message }){
    show(this.installMessage);
    this.installMessage.querySelector('.title').innerText = message;
    this.installMessage.querySelector('.title').innerText = message;
    this.installMessage.className = `install-message dismissible message simple ${success ? 'info' : 'error'}`;
  }

  /**
   * Sets a message on install
   *
   * @param {boolean} success
   * @param {string} message
   */
  resetInstallMessage(){
    hide(this.installMessage);
    this.installMessage.querySelector('.title').innerText = '';
  }

  /**
   * Removes all images from the carousel
   */
  removeAllImagesInCarousel() {
    this.carouselList.querySelectorAll('li').forEach(removeChild(this.carouselList));
    this.carousel.querySelectorAll('.carousel-lightbox').forEach(removeChild(this.carousel));
  }

  /**
   * Add image to the carousel
   *
   * @param {object} image
   */
  addImageToCarousel(image) {
    // add lightbox
    const lightbox = document.createElement('div');
    lightbox.id = `lightbox-${this.carouselList.childElementCount}`;
    lightbox.className = 'carousel-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = `<img class="img-responsive" src="${image.url}" alt="${image.alt}">`;
    this.carousel.appendChild(lightbox);

    // add thumbnail
    const thumbnail = document.createElement('li');
    thumbnail.className = 'slide';
    thumbnail.innerHTML = `<img src="${image.url}" alt="${image.alt}" class="img-responsive" aria-controls="${lightbox.id}" />`;
    this.carouselList.appendChild(thumbnail);
  }

  /**
   * Resets the detail view
   */
  reset() {
    hide(this.installMessage);
  }

  /**
   * Informs view if api version required by content type is supported. The view
   * will disable the install-button and display a warning message.
   *
   * @param {boolean} supported - true if supported, otherwise false
   */
  setApiVersionSupported(supported) {
    this.installButton.removeAttribute('disabled');
    if (this.messageViewElement) {
      this.container.removeChild(this.messageViewElement);
      delete this.messageViewElement;
    }

    if (!supported) {
      // Disable install button
      this.installButton.setAttribute('disabled', 'disabled');

      let messageView = new MessageView({
        type: 'success',
        title: Dictionary.get('contentTypeUnsupportedApiVersionTitle'),
        content: Dictionary.get('contentTypeUnsupportedApiVersionContent')
      });

      this.messageViewElement = messageView.getElement();
      this.container.insertBefore(this.messageViewElement, this.container.childNodes[0]);
    }
  }

  /**
   * Sets the image
   *
   * @param {string} src
   */
  setImage(src) {
    this.image.setAttribute('src', src || noIcon);
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
    this.title.innerHTML = `${title}`;
  }

  /**
   * Sets the long description
   *
   * @param {string} text
   */
  setDescription(text = '') {
    if(text && text.length > MAX_TEXT_SIZE_DESCRIPTION) {
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)}<button class="read-more link">Read more</button>`;
      this.description
        .querySelector('.read-more, .read-less')
        .addEventListener('click', () => this.toggleDescriptionExpanded(text));
      this.descriptionExpanded = false;
    }
    else {
      this.description.innerText = text;
    }
  }

  /**
   * Toggles Read less and Read more text
   *
   * @param {string} text
   */
  toggleDescriptionExpanded(text) {
    // flip boolean
    this.descriptionExpanded = !this.descriptionExpanded;

    if(this.descriptionExpanded) {
      this.description.innerHTML = `${text}<button class="read-less link">Read less</button>`;
    }
    else {
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)}<button class="read-more link">Read more</button>`;
    }

    this.description
      .querySelector('.read-more, .read-less')
      .addEventListener('click', () => this.toggleDescriptionExpanded(text));
  }

  /**
   * Shortens a string, and puts an elipsis at the end
   *
   * @param {number} size
   * @param {string} text
   */
  ellipsis(size, text) {
    return `${text.substr(0, size)}...`;
  }

  /**
   * Sets the licence
   *
   * @param {string} type
   * @param {string} owner
   */
  setLicence(type, owner) {
    if(type){
      if(type === 'MIT') {
        this.licencePanelBody.querySelector('.panel-body').innerHTML = `
        <p>Copyright ${(new Date()).getFullYear()} ${owner}</p>

        <p>Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:</p>
        
        <p>The above copyright notice and this permission notice shall be included in
        all copies or substantial portions of the Software.</p>
        
        <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
        THE SOFTWARE.</p>
        `
      }
      else {
        this.licencePanelBody.querySelector('.panel-body').innerText = type;
      }

      show(this.licencePanelHeading);
    }

    // Close licence panel body by default
    hide(this.licencePanelBody);
  }

  /**
   * Sets the long description
   *
   * @param {string} owner
   */
  setOwner(owner) {
    if(owner) {
      this.owner.innerHTML = `By ${owner}`;
    }
    else {
      this.owner.innerHTML = '';
    }
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
    this.showButtonBySelector(installed ? '.button-use' : '.button-install');
  }

  /**
   * Marks content type as restricted, disabling installing and using the content type.
   *
   * @param {boolean} restricted True if content type is restricted
   */
  setIsRestricted(restricted) {
    if(restricted) {
      disable(this.useButton);
      disable(this.installButton);
    }
    else {
      enable(this.useButton);
      enable(this.installButton);
    }
  }

  /**
   * Hides all buttons and shows the button on the selector again
   *
   * @param {string}selector
   */
  showButtonBySelector(selector) {
    const button = this.buttonBar.querySelector(selector);

    if(button) {
      hideAll(this.buttons);
      show(button);
    }
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
   * Focuses on the title
   */
  focus() {
    setTimeout(() => this.rootElement.focus(), 10);
  }

  /**
   * Returns whether the detailview is hidden
   *
   * @return {boolean}
   */
  isHidden() {
    return isHidden(this.rootElement);
  }

  /**
   * Returns the root html element
   * @return {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}
