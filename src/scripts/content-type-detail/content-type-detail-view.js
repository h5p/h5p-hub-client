import { addClass, removeClass, setAttribute, getAttribute, removeAttribute, attributeEquals, removeChild, hide, show, toggleVisibility, classListContains, querySelectorAll } from "utils/elements";
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
import ImageLightbox from '../image-lightbox/image-lightbox';

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
 * Focuses an HTMLElement
 *
 * @param {HTMLElement} element
 *
 * @function
 */
const focus = (element) => element.focus();

/**
 * Registers a click handler on an HTMLElement
 *
 * @param {HTMLElement} element
 * @param {Function} handler
 *
 * @function
 */
const onClick = (element, handler) => element.addEventListener('click', handler);


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
    this.buttons = querySelectorAll('.button', this.buttonBar);

    this.imageLightbox = new ImageLightbox();

    // Restore focus to image when lightbox is hidden
    this.imageLightbox.on('lightbox-hidden', () => {
      if (this.focusedImage) {
        this.focusedImage.focus();
        delete this.focusedImage;
      }
    });

    this.contentContainer = this.rootElement.querySelector('.container');
    this.image = this.rootElement.querySelector('.content-type-image');
    this.title = this.rootElement.querySelector('.text-details .title');
    this.ownerElement = this.rootElement.querySelector('.owner');
    this.description = this.rootElement.querySelector('.text-details .small');
    this.demoButton = this.rootElement.querySelector('.demo-button');
    this.carousel = this.rootElement.querySelector('.carousel');
    this.carouselList = this.carousel.querySelector('ul');

    this.panel = this.rootElement.querySelector('.panel');
    this.licensePanelHeading = this.rootElement.querySelector('.license-panel-heading');
    this.licensePanelBody = this.rootElement.querySelector('#license-panel');
    this.container = this.rootElement.querySelector('.container');

    /**
     * Finds the license button for us
     *
     * @return {HTMLElement}
     */
    this.licenseButton = () => this.licensePanelBody.querySelector('.short-license-read-more');

    /**
     * Generates an event handler for showing the license
     *
     * @function
     */
    this.showLicense = curry((licenseId, event) => this.trigger('show-license-dialog', { licenseId: licenseId }));

    // init interactive elements
    initPanel(this.panel);
    initImageScroller(this.carousel);

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
      <button type="button" class="back-button icon-arrow-thick" aria-label="${Dictionary.get("contentTypeBackButtonLabel")}" tabindex="0"></button>
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
      <div class="carousel" role="region" data-size="5" data-prevent-resize-loop="true" aria-label="${Dictionary.get('screenshots')}">
        <nav class="scroller">
          <ul></ul>
        </nav>
        <button type="button" class="carousel-button next hidden" disabled aria-label="${Dictionary.get('nextImage')}">
          <span class="icon-arrow-thick"></span>
        </button>
        <button type="button" class="carousel-button previous hidden" disabled aria-label="${Dictionary.get('previousImage')}">
          <span class="icon-arrow-thick"></span>
        </button>
      </div>
      <hr />
      <div class="button-bar">
        <button type="button" class="button button-inverse-primary button-install hidden" data-id="">
          <span class="icon-arrow-thick"></span>
          ${Dictionary.get('contentTypeInstallButtonLabel')}
        </button>
        <button type="button" class="button button-inverse-primary button-installing hidden">
          <span class="icon-loading-search icon-spin"></span>
          ${Dictionary.get("contentTypeInstallingButtonLabel")}
        </button>
        <button type="button" class="button button-inverse-primary button-update">
          ${Dictionary.get("contentTypeUpdateButtonLabel")}
        </button>
        <button type="button" class="button button-inverse-primary button-updating">
          <span class="icon-loading-search icon-spin"></span>
          ${Dictionary.get("contentTypeUpdatingButtonLabel")}
        </button>
        <button type="button" class="button button-primary button-use" data-id="">
          ${Dictionary.get("contentTypeUseButtonLabel")}
        </button>
      </div>
      <dl class="panel panel-default license-panel">
        <dt aria-level="2" role="heading" class="license-panel-heading">
          <div role="button" aria-expanded="false" aria-controls="license-panel">
            <span class="icon-accordion-arrow"></span>
            <span>${Dictionary.get('contentTypeLicensePanelTitle')}</span>
          </div>
        </dt>
        <dl id="license-panel" role="region" class="hidden">
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
    if (this.installMessage) {
      this.installMessage.remove();
    }

    this.installMessage = new MessageView({
      dismissible: true,
      type: success ? 'info' : 'error',
      name: 'install-message',
      title: message
    });

    this.rootElement.insertBefore(this.installMessage.getElement(), this.buttonBar);
  }

  /**
   * Set screenshots
   *
   * @param {{url: string, alt:string}[]} screenshots
   */
  setScreenshots(screenshots) {
    screenshots.forEach((image, index) => {
      // add lightbox
      this.imageLightbox.addImage(image);

      // add thumbnail
      const thumbnail = document.createElement('li');
      thumbnail.className = 'slide';
      thumbnail.innerHTML =
        `<img src="${image.url}"
              alt="${image.alt}"
              data-index="${index}"
              class="img-responsive"
              aria-controls="${IMAGELIGHTBOX}-detail"
        />`;

      const img = thumbnail.querySelector('img');
      img.addEventListener('click', () => {
        this.imageLightbox.show(index);
        this.trigger('modal', {element: this.imageLightbox.getElement()});
        this.focusedImage = img;
      });

      img.addEventListener('keydown', event => {
        if (event.which === 32 || event.which === 13) {
          this.imageLightbox.show(index);
          this.trigger('modal', {element: this.imageLightbox.getElement()});
          this.focusedImage = img;
          event.preventDefault();
        }
      });

      this.carouselList.appendChild(thumbnail);
    });
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

    // Remove messages
    this.removeMessages();
    this.resetLicenses();

    // Remove images:
    querySelectorAll('li', this.carouselList).forEach(removeChild(this.carouselList));
    this.imageLightbox.reset();
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
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text, true)}<button type="button" class="read-more link">${Dictionary.get('readMore')}</button>`;
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
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)}${this.ellipsisRest(MAX_TEXT_SIZE_DESCRIPTION, text)}
                                    <button type="button" class="read-less link">${Dictionary.get('readLess')}</button>`;

      this.description.querySelector('.part-two').focus();
    }
    else {
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text, true)}
                                    <button type="button" class="read-more link">${Dictionary.get('readMore')}</button>`;

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
   * @param {boolean} [addEllipses] whether ellipses should be added
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
   * @param {number} size
   * @param {string} text
   */
  ellipsisRest(size, text) {
    return `<span class="part-two" tabindex="-1">${text.substr(size)}</span>`;
  }

  /**
   * Removes the licenses that are listed
   */
  resetLicenses() {
    const container = this.licensePanelBody.querySelector('.panel-body');
    querySelectorAll('dt,dl', container).forEach(removeChild(container));
  }

  /**
   * Sets the lisence
   *
   * @param {object} license
   * @param {string} license.id
   * @param {object} license.attributes
   */
  setLicense(license) {
    this.license = license;

    const panelContainer = this.licensePanelBody.querySelector('.panel-body');

    if (license) {
      // Create short version for detail page
      const shortLicenseInfo = document.createElement('div');
      shortLicenseInfo.className = 'short-license-info';
      shortLicenseInfo.innerHTML = `
        <h3>${license.id}</h3>
        <button type="button" class="short-license-read-more icon-info-circle" aria-label="${Dictionary.get('readMore')}"></button>
        <p>${Dictionary.get("licenseDescription")}</p>
        <ul class="ul small">
          <li>${Dictionary.get(license.attributes.canHoldLiable ? "licenseCanHoldLiable" : "licenseCannotHoldLiable")}</li>
          ${license.attributes.useCommercially ? '<li>' + Dictionary.get("licenseCanUseCommercially") + '</li>' : ''}
          ${license.attributes.modifiable ? '<li>' + Dictionary.get("licenseCanModify") + '</li>' : ''}
          ${license.attributes.distributable ? '<li>' + Dictionary.get("licenseCanDistribute") + '</li>' : ''}
          ${license.attributes.sublicensable ? '<li>' + Dictionary.get("licenseCanSublicense") + '</li>' : ''}
          ${license.attributes.mustIncludeCopyright ? '<li>' + Dictionary.get("licenseMustIncludeCopyright") + '</li>' : ''}
          ${license.attributes.mustIncludeLicense ? '<li>' + Dictionary.get("licenseMustIncludeLicense") + '</li>' : ''}
        </ul>`;

      // add short version of lisence
      panelContainer.innerText = '';
      panelContainer.appendChild(shortLicenseInfo);

      // handle clicking read more
      onClick(this.licenseButton(), this.showLicense(license.id));
    }
    else {
      panelContainer.innerText = Dictionary.get('licenseUnspecified');
    }
  }

  /**
   * Creates a modal window for license details
   *
   * @param {Promise} licenseDetails
   *
   * @return {Element}
   */
  createLicenseDialog(licenseDetails) {
    const titleId = 'license-dialog-title';
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal fade show" role="dialog">
        <div class="modal-dialog license-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" tabindex="-1"  aria-labelledby="${titleId}">
              <button type="button" class="close icon-close" data-dismiss="modal" aria-label="${Dictionary.get('close')}"></button>
              <h5 class="modal-title" id="${titleId}">${Dictionary.get('licenseModalTitle')}</h5>
              <h5 class="modal-subtitle">${Dictionary.get('licenseModalSubtitle')}</h5>
            </div>
            <div class="modal-body loading">
              <dl class="panel panel-simple"></dl>
            </div>
          </div>
        </div>
      </div>`;

    let modalBody = modal.querySelector('.modal-body');
    let panel = modalBody.querySelector('.panel');
    let id = `content-type-detail-license`;

    let header = document.createElement('dt');
    header.setAttribute('role', 'heading');
    header.setAttribute('aria-level', '2');
    header.innerHTML = `<div role="button" aria-expanded="true" aria-controls="${id}">
        <span class="icon-accordion-arrow"></span>
        <span class="license-title">${this.license.id}</span>
      </div>`;

    let body = document.createElement('dd');
    body.id = id;
    body.className = 'hidden';
    body.setAttribute('role', 'region');
    body.innerHTML = `
      <div class="panel-body">
        <div class="license-description"></div>
      </div>`;
    hide(body);

    let title = header.querySelector('.license-title');
    let description = body.querySelector('.license-description');

    panel.appendChild(header);
    panel.appendChild(body);

    licenseDetails.then(details => {
      title.innerHTML = details.id;
      description.innerHTML = details.description
        .replace(':year', new Date().getFullYear())
        .replace(':owner', this.owner);
    }).catch(error => {
      modalBody.innerHTML = Dictionary.get('licenseFetchDetailsFailed');
    }).then(() => removeClass('loading', modalBody));

    initModal(modal, () => this.trigger('hide-license-dialog'));
    initPanel(panel);

    return modal;
  }

  /**
   *
   */
  focusLicenseDetailsButton() {
    focus(this.licenseButton());
  }

  /**
   * Sets the long description
   *
   * @param {string} owner
   */
  setOwner(owner) {
    this.owner = owner;

    if(owner) {
      this.ownerElement.innerHTML = Dictionary.get('contentTypeOwner', {':owner': owner});
    }
    else {
      this.ownerElement.innerHTML = '';
    }
  }

  /**
   * Sets the example url
   *
   * @param {string} url
   */
  setExample(url) {
    this.demoButton.setAttribute('href', url || '#');
    toggleVisibility(!!url, this.demoButton);
  }

  /**
   * Sets if the content type is installed
   *
   * @param {boolean} installed
   */
  setIsInstalled(installed) {
    this.useButton.classList[installed ? 'remove' : 'add']('hidden');
    this.installButton.classList[installed ? 'add' : 'remove']('hidden');
  }

  /**
   * Shows the update button if it is possible to update the content type
   *
   * @param {boolean} isUpdatePossible
   * @param {string} [title] Used to display update message. Only required if
   * update is possible
   */
  setIsUpdatePossible(isUpdatePossible, title) {
    this.updateButton.classList[isUpdatePossible ? 'remove' : 'add']('hidden');

    // Set warning message
    if (isUpdatePossible) {
      this.updateMessage = new MessageView({
        type: 'warning',
        title: Dictionary.get(
          'warningUpdateAvailableTitle',
          {':contentType': title || Dictionary.get('theContentType')}
        ),
        content: Dictionary.get('warningUpdateAvailableBody')
      });
      this.rootElement.insertBefore(this.updateMessage.getElement(), this.contentContainer);
    }
  }

  /**
   * Removes all install/update messages
   */
  removeMessages() {
    if (this.updateMessage) {
      this.updateMessage.remove();
    }
    if (this.installMessage) {
      this.installMessage.remove();
    }
  }

  /**
   * Makes it easy to set a message
   *
   * @param {string} title
   * @param {string} description
   */
  setMessage(title, description) {
    let messageView = new MessageView({
      type: 'warning',
      title: Dictionary.get(title),
      content: Dictionary.get(description)
    });

    this.messageViewElement = messageView.getElement();
    this.container.insertBefore(this.messageViewElement, this.container.childNodes[0]);
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
      this.installButton.classList[enable ? 'add' : 'remove']('hidden');
      this.installingButton.classList[enable ? 'remove' : 'add']('hidden');
    }
    else {
      this.updateButton.classList[enable ? 'add' : 'remove']('hidden');
      this.updatingButton.classList[enable ? 'remove' : 'add']('hidden');
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
    setTimeout(() => this.title.focus(), 200);
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
