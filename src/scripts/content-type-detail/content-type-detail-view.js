import { setAttribute, getAttribute, removeAttribute, attributeEquals, removeChild, hide, show, toggleVisibility } from "utils/elements";
import { curry, forEach } from "utils/functional";
import { Eventful } from '../mixins/eventful';
import initPanel from "components/panel";
import initModal from "components/modal";
import initImageScroller from "components/image-scroller";
import initImageLightbox from "components/image-lightbox";
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
 * @constant {string}
 */
const IMAGELIGHTBOX = 'imagelightbox';

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
 * Returns true if element isn't visible
 *
 * @function
 * @param {HTMLElement} element
 */
const isHidden = (element) => !element.classList.contains('active');

const LICENCE_DATA = {
  "MIT": {
    title: 'MIT License',
    short: `
    <ul class="ul">
      <li>Can use comercially</li>
      <li>Can modify</li>
      <li>Can distribute</li>
      <li>Can sublicense</li>
      <li>Cannot hold liable</li>
      <li>Must include copyright</li>
      <li>Must include license</li>
    </ul>`,
    full: owner => `<p>Copyright ${(new Date()).getFullYear()} ${owner}</p>

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
      THE SOFTWARE.</p>`
  }
};

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
    const imageLightbox = this.rootElement.querySelector(`#${IMAGELIGHTBOX}-detail`);
    this.imageLightboxList = imageLightbox.querySelector(`.${IMAGELIGHTBOX}-list`);
    this.panel = this.rootElement.querySelector('.panel');
    this.licencePanelHeading = this.rootElement.querySelector('.licence-panel-heading');
    this.licencePanelBody = this.rootElement.querySelector('#licence-panel');
    this.container = this.rootElement.querySelector('.container');

    // init interactive elements
    initPanel(this.panel);
    initImageScroller(this.carousel);
    initImageLightbox(imageLightbox);

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

    // Localized text strings
    const l10n = { // TODO: Translate
      title: 'Images',
      progress: ':num of :total',
      next: 'Next image',
      prev: 'Previous image',
      close: 'Close dialog'
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

    element.innerHTML = `
      <button class="back-button icon-arrow-thick" aria-label="${Dictionary.get("contentTypeBackButtonLabel")}" tabindex="0"></button>
      <div class="container">
        <div class="image-wrapper"><img class="img-responsive content-type-image" src="${noIcon}"></div>
        <div class="text-details">
          <h2 id="${titleId}" class="title"></h2>
          <div class="owner"></div>
          <p class="small"></p>
          <a class="button demo-button" target="_blank" href="#">${Dictionary.get("contentTypeDemoButtonLabel")}</a>
        </div>
      </div>
      <div class="carousel" role="region" data-size="5">
        <button class="carousel-button previous" disabled><span class="icon-arrow-thick"></span></button>
        <button class="carousel-button next" disabled><span class="icon-arrow-thick"></span></button>
        <nav class="scroller">
          <ul></ul>
        </nav>
      </div>
      <hr />
      <div class="button-bar">
        <button class="button button-primary button-use active">${Dictionary.get("contentTypeUseButtonLabel")}</button>
        <button class="button button-inverse-primary button-install"><span class="icon-arrow-thick"></span>${Dictionary.get('contentTypeInstallButtonLabel')}</button>
        <button class="button button-inverse-primary button-installing"><span class="icon-loading-search icon-spin"></span>${Dictionary.get("contentTypeInstallingButtonLabel")}</button>
      </div>
      <dl class="panel">
        <dt aria-level="2" role="heading" class="licence-panel-heading">
          <a href="#" role="button" aria-expanded="false" aria-controls="licence-panel">
            <span class="icon-accordion-arrow"></span> ${Dictionary.get('contentTypeLicensePanelTitle')}
          </a>
        </dt>
        <dl id="licence-panel" role="region">
          <div class="panel-body"></div>
        </dl>
      </dl>
      <div id="${IMAGELIGHTBOX}-detail" class="${IMAGELIGHTBOX}" role="dialog" aria-label="${l10n.title}">
        <ol class="${IMAGELIGHTBOX}-list"></ol>
        <div class="${IMAGELIGHTBOX}-progress">${l10n.progress}</div>
        <div class="${IMAGELIGHTBOX}-button next" role="button" aria-disabled="true" aria-label="${l10n.next}"></div>
        <div class="${IMAGELIGHTBOX}-button previous" role="button" aria-disabled="true" aria-label="${l10n.prev}"></div>
        <div class="${IMAGELIGHTBOX}-button close" role="button" tabindex="0" aria-label="${l10n.close}"></div>
      </div>`;

    return element;
  }

  /**
   * Sets a message on install
   *
   * @param {boolean} success
   * @param {string} message
   */
  setInstallMessage({ success = true, message }){
    this.installMessage = new MessageView({
      dismissible: true,
      type: success ? 'info' : 'error',
      name: 'install-message',
      title: message
    }).on('close', this.removeInstallMessage, this);

    this.rootElement.insertBefore(this.installMessage.getElement(), this.buttonBar);
  }

  /**
   * Sets a message on install
   *
   * @param {boolean} success
   * @param {string} message
   */
  removeInstallMessage(){
    if (this.installMessage) {
      this.rootElement.removeChild(this.installMessage.getElement());
      delete this.installMessage;
    }
  }

  /**
   * Removes all images from the carousel
   */
  removeAllImagesInCarousel() {
    this.carouselList.querySelectorAll('li').forEach(removeChild(this.carouselList));
    this.imageLightboxList.innerHTML = '';
  }

  /**
   * Add image to the carousel
   *
   * @param {object} image
   */
  addImageToCarousel(image) {
    // add lightbox
    var item = document.createElement('li');
    item.classList.add(`${IMAGELIGHTBOX}-image`);
    item.innerHTML = `<img class="img-responsive" src="${image.url}" alt="${image.alt}">`;
    this.imageLightboxList.appendChild(item);

    // add thumbnail
    const thumbnail = document.createElement('li');
    thumbnail.className = 'slide';
    thumbnail.innerHTML = `<img src="${image.url}" alt="${image.alt}" class="img-responsive" aria-controls="${IMAGELIGHTBOX}-detail" />`;
    this.carouselList.appendChild(thumbnail);
  }

  /**
   * Resets the detail view
   */
  reset() {
    this.installButton.removeAttribute('disabled');
    if (this.messageViewElement) {
      this.container.removeChild(this.messageViewElement);
      delete this.messageViewElement;
    }
    this.removeInstallMessage();
  }

  /**
   * Informs view if api version required by content type is un supported. The view
   * will disable the install-button and display a warning message.
   */
  apiVersionUnsupported() {
    // Disable install button
    this.installButton.setAttribute('disabled', 'disabled');

    let messageView = new MessageView({
      type: 'warning',
      title: Dictionary.get('contentTypeUnsupportedApiVersionTitle'),
      content: Dictionary.get('contentTypeUnsupportedApiVersionContent')
    });

    this.messageViewElement = messageView.getElement();
    this.container.insertBefore(this.messageViewElement, this.container.childNodes[0]);
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
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)}<button class="read-more link">${Dictionary.get('contentTypeReadMore')}</button>`;
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
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)}
                                    ${this.ellipsisRest(MAX_TEXT_SIZE_DESCRIPTION, text)}
                                    <button class="read-less link">${Dictionary.get('contentTypeReadLess')}</button>`;

      this.description.querySelector('.part-two').focus();
    }
    else {
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)}
                                    <button class="read-more link">${Dictionary.get('contentTypeReadMore')}</button>`;

      this.description.querySelector('.part-one').focus();
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
    return `<span class="part-one" tabindex="-1">${text.substr(0, size)}...</span>`;
  }

  /**
   * Gets the text cut off by ellipsis
   *
   * @param {number} size
   * @param {string} text
   */
  ellipsisRest(size, text) {
    return `<span class="part-two" tabindex="-1">${text.substr(size)}...</span>`;
  }

  /**
   * Sets the licence
   *
   * @param {string} type
   * @param {string} owner
   */
  setLicence(type, owner) {
    const details = LICENCE_DATA[type];

    if(type && details){

      if(type === 'MIT') {
        this.licencePanelBody.querySelector('.panel-body').innerHTML = `
          <button class="read-more">Read more</button>
        `;

        const shortLicence = document.createElement('div');
        shortLicence.innerHTML = details.short;

        this.licencePanelBody.appendChild(shortLicence);

        const modal = this.createModal({
          title: 'Content License info',
          subtitle: 'Click on a specific license to get info about proper usage',
          licences: [{
            title: details.title,
            body: details.full(owner)
          }]
        });

        this.licencePanelBody.querySelector('.read-more').addEventListener('click', () => show(modal))
      }
      else {
        this.licencePanelBody.querySelector('.panel-body').innerText = type;
      }

      show(this.licencePanelHeading);
    }

    // Close licence panel body by default
    hide(this.licencePanelBody);
  }

  createModal({title, subtitle, licences}) {
    this.modal = document.createElement('div');
    this.modal.innerHTML = `
      <div class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="dialog-title">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span>&#10006;</span>
              </button>
              <h5 class="modal-title" id="dialog-title">${title}</h5>
              <h5 class="modal-subtitle">${subtitle}</h5>
            </div>
            <div class="modal-body">
              <dl class="panel"></dl>
            </div>
          </div>
        </div>
      </div>`;

    let panels = this.modal.querySelector('.panel');

    licences.forEach((licence, index) => {
      let id = `content-type-detail-licence-${index}`;

      let title = document.createElement('dt');
      title.setAttribute('role', 'heading');
      title.setAttribute('aria-level', '2');
      title.innerHTML = `<a href="#" role="button" aria-expanded="false" aria-controls="${id}">${licence.title}</a>`

      let body = document.createElement('dd');
      body.id = id;
      body.setAttribute('role', 'region');
      body.innerHTML = `<div class="panel-body">${licence.body}</div>`;

      panels.appendChild(title);
      panels.appendChild(body);
    });

    initModal(this.modal);
    initPanel(panels);

    this.rootElement.appendChild(this.modal);

    return this.modal;
  }

  /**
   * Sets the long description
   *
   * @param {string} owner
   */
  setOwner(owner) {
    if(owner) {
      this.owner.innerHTML = Dictionary.get('contentTypeOwner', {':owner': owner});
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
    toggleVisibility(!isEmpty(url), this.demoButton);
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
