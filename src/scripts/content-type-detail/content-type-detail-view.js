import { setAttribute, getAttribute, removeAttribute, attributeEquals, removeChild, hide, show, toggleVisibility, classListContains } from "utils/elements";
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
 * @event {ContentTypeDetailView#show-license-dialog}
 * @type {object}
 * @property {string[]} types
 */

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
    this.updateButton = this.buttonBar.querySelector('.button-update');
    this.updatingButton = this.buttonBar.querySelector('.button-updating');
    this.installButton = this.buttonBar.querySelector('.button-install');
    this.installingButton = this.buttonBar.querySelector('.button-installing');
    this.buttons = this.buttonBar.querySelectorAll('.button');

    this.contentContainer = this.rootElement.querySelector('.container');
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
    this.licensePanelHeading = this.rootElement.querySelector('.license-panel-heading');
    this.licensePanelBody = this.rootElement.querySelector('#license-panel');
    this.container = this.rootElement.querySelector('.container');

    // init interactive elements
    initPanel(this.panel);
    initImageScroller(this.carousel);
    initImageLightbox(imageLightbox);

    // fire events on button click
    relayClickEventAs('close', this, this.rootElement.querySelector('.back-button'));
    relayClickEventAs('select', this, this.useButton);
    relayClickEventAs('install', this, this.updateButton);
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
        <div class="image-wrapper">
          <img class="img-responsive content-type-image" src="${noIcon}">
        </div>
        <div class="text-details">
          <h2 id="${titleId}" class="title" tabindex="-1"></h2>
          <div class="owner"></div>
          <p class="small"></p>
          <a class="button demo-button" target="_blank" href="#">
            ${Dictionary.get("contentTypeDemoButtonLabel")}
          </a>
        </div>
      </div>
      <div class="carousel" role="region" data-size="5">
        <button class="carousel-button previous hidden" disabled>
          <span class="icon-arrow-thick"></span>
        </button>
        <button class="carousel-button next hidden" disabled>
          <span class="icon-arrow-thick"></span>
        </button>
        <nav class="scroller">
          <ul></ul>
        </nav>
      </div>
      <hr />
      <div class="button-bar">
        <button class="button button-inverse-primary button-install" class="hidden" data-id="">
          <span class="icon-arrow-thick"></span>
          ${Dictionary.get('contentTypeInstallButtonLabel')}
        </button>
        <button class="button button-inverse-primary button-installing" class="hidden">
          <span class="icon-loading-search icon-spin"></span>
          ${Dictionary.get("contentTypeInstallingButtonLabel")}
        </button>
        <button class="button button-inverse-primary button-update">
          ${Dictionary.get("contentTypeUpdateButtonLabel")}
        </button>
        <button class="button button-inverse-primary button-updating">
          <span class="icon-loading-search icon-spin"></span>
          ${Dictionary.get("contentTypeUpdatingButtonLabel")}
        </button>
        <button class="button button-primary button-use" data-id="">
          ${Dictionary.get("contentTypeUseButtonLabel")}
        </button>
        <button class="button button-inverse-primary button-install" class="hidden" data-id="">
          <span class="icon-arrow-thick"></span>
          ${Dictionary.get('contentTypeInstallButtonLabel')}
        </button>
        <button class="button button-inverse-primary button-installing" class="hidden">
          <span class="icon-loading-search icon-spin"></span>
          ${Dictionary.get("contentTypeInstallingButtonLabel")}
        </button>
      </div>
      <dl class="panel panel-default license-panel">
        <dt aria-level="2" role="heading" class="license-panel-heading">
          <a href="#" role="button" aria-expanded="false" aria-controls="license-panel">
            <span class="icon-accordion-arrow"></span>
            <span>${Dictionary.get('contentTypeLicensePanelTitle')}</span>
          </a>
        </dt>
        <dl id="license-panel" role="region" class="hidden">
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
   * Removes the install message
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
    const item = document.createElement('li');
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

    // Hide all buttons
    this.buttons.forEach(button => {
      button.classList.add('hidden');
    });

    this.removeInstallMessage();
    this.resetLicenses();
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
    this.updateButton.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, id);
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
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text, true)}<button class="read-more link">${Dictionary.get('contentTypeReadMore')}</button>`;
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
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)}${this.ellipsisRest(text)}
                                    <button class="read-less link">${Dictionary.get('contentTypeReadLess')}</button>`;

      this.description.querySelector('.part-two').focus();
    }
    else {
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text, true)}
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
   * @param {boolean} addEllipses whether ellipses should be added
   */
  ellipsis(size, text, addEllipses) {
    if (addEllipses) {
      return `<span class="part-one" tabindex="-1">${text.substr(0, size)}...</span>`;
    }
    return `<span class="part-one" tabindex="-1">${text.substr(0, size)}</span>`;
  }

  /**
   * Gets the text cut off by ellipsis
   *
   * @param {string} text
   */
  ellipsisRest(text) {
    return `<span class="part-two" tabindex="-1">${text}</span>`;
  }

  /**
   * Removes the licenses that are listed
   */
  resetLicenses() {
    const container = this.licensePanelBody.querySelector('.panel-body');
    container.querySelectorAll('dt,dl').forEach(removeChild(container));
  }

  /**
   * Sets the lisence
   *
   * @param {object} license
   */
  setLicense(license) {
    const panelContainer = this.licensePanelBody.querySelector('.panel-body');
    const l10n = {
      readMore: 'Read more'
    };

    if(license){
      // Create short version for detail page
      const shortLicenseInfo = document.createElement('div');
      shortLicenseInfo.className = 'short-license-info';
      shortLicenseInfo.innerHTML = `
        <h3>${license.title}</h3>
        <button class="short-license-read-more icon-info-circle" aria-label="${l10n.readMore}"></button>
        ${license.short}`;

      // add short version of lisence
      panelContainer.innerText = '';
      panelContainer.appendChild(shortLicenseInfo);

      // handle clicking read more
      const readMoreButton = this.licensePanelBody.querySelector('.short-license-read-more');
      readMoreButton.addEventListener('click', () => this.trigger('show-license-dialog', { license }));
    }
    else {
      panelContainer.innerText = 'Unspecified';
    }
  }

  /**
   * Creates a modal window for license details
   *
   * @param licenses
   *
   * @return {Element}
   */
  createLicenseDialog(licenses) {
    const titleId = 'license-dialog-title';
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal fade show" role="dialog">
        <div class="modal-dialog" tabindex="-1" role="document" aria-labelledby="${titleId}">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close icon-close" data-dismiss="modal" aria-label="Close"></button>
              <h5 class="modal-title" id="${titleId}">${Dictionary.get('contentTypeLicenseModalTitle')}</h5>
              <h5 class="modal-subtitle">${Dictionary.get('contentTypeLicenseModalDescription')}</h5>
            </div>
            <div class="modal-body">
              <dl class="panel panel-simple panel"></dl>
            </div>
          </div>
        </div>
      </div>`;

    let panels = modal.querySelector('.panel');

    licenses.forEach((license, index) => {
      let id = `content-type-detail-license-${index}`;

      let title = document.createElement('dt');
      title.setAttribute('role', 'heading');
      title.setAttribute('aria-level', '2');
      title.innerHTML = `<a href="#" role="button" aria-expanded="true" aria-controls="${id}">
          <span class="icon-accordion-arrow"></span>
          <span class="h3">${license.title}</span>
        </a>`;

      let body = document.createElement('dd');
      body.id = id;
      body.className = 'hidden';
      body.setAttribute('role', 'region');
      body.innerHTML = `
        <div class="panel-body">
          <div class="small">${license.full}</div>
        </div>`;
      hide(body);

      panels.appendChild(title);
      panels.appendChild(body);
    });

    initModal(modal);
    initPanel(panels);

    return modal;
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
    this.useButton.classList.toggle('hidden', !installed);
    this.installButton.classList.toggle('hidden', installed);
  }

  /**
   * Shows the update button if it is possible to update the content type
   *
   * @param {boolean} isUpdatePossible
   * @param {string} [title] Used to display update message. Only required if
   * update is possible
   */
  setIsUpdatePossible(isUpdatePossible, title) {
    this.updateButton.classList.toggle('hidden', !isUpdatePossible);

    // Remove old warning message if in DOM
    if (this.updateMessage && this.updateMessage.getElement().parentNode) {
      this.updateMessage.getElement().parentNode
        .removeChild(this.updateMessage.getElement());
    }

    // Set warning message
    if (isUpdatePossible) {
      this.updateMessage = new MessageView({
        type: 'warning',
        title: Dictionary.get(
          'warningUpdateAvailableTitle',
          {':contentType': title || 'the content type'}
        ),
        content: Dictionary.get('warningUpdateAvailableBody')
      });
      this.rootElement.insertBefore(this.updateMessage.getElement(), this.contentContainer);
    }
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
   * Toggle spinner visibility for the currently showing install or update button
   *
   * @param {boolean} enable Set spinner state
   */
  toggleSpinner(enable) {
    const buttonToCheck = enable ? 'updateButton' : 'updatingButton';
    const isShowingInstallButton = this[buttonToCheck].classList.contains('hidden');
    if (isShowingInstallButton) {
      this.installButton.classList.toggle('hidden', enable);
      this.installingButton.classList.toggle('hidden', !enable);
    }
    else {
      this.updateButton.classList.toggle('hidden', enable);
      this.updatingButton.classList.toggle('hidden', !enable);
    }
  }

  /**
   * Hides the root element
   */
  hide() {
    this.rootElement.classList.remove('show');
  }

  /**
   * Shows the root element
   */
  show() {
    this.rootElement.classList.add('show');
  }

  /**
   * Focuses on the title
   */
  focus() {
    setTimeout(() => this.title.focus(), 10);
  }

  /**
   * Returns whether the detailview is hidden
   *
   * @return {boolean}
   */
  isHidden() {
    return this.rootElement.classList.contains('hidden');
  }

  /**
   * Returns the root html element
   * @return {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}
