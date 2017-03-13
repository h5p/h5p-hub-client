import { setAttribute, getAttribute, removeChild } from "utils/elements";
import { curry } from "utils/functional";
import { Eventful } from '../mixins/eventful';
import initPanel from "components/panel";
import initImageScroller from "components/image-scroller";
import { relayClickEventAs } from '../utils/events';
import noIcon from '../../images/content-type-placeholder.svg';

/**
 * @constant {string}
 */
const ATTRIBUTE_CONTENT_TYPE_ID = 'data-id';

/**
 * @constant {number}
 */
const MAX_TEXT_SIZE_DESCRIPTION = 300;

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

    this.rootElement = this.createView();
    this.useButton = this.rootElement.querySelector('.button-use');
    this.installButton = this.rootElement.querySelector('.button-install');
    this.image = this.rootElement.querySelector('.content-type-image');
    this.title = this.rootElement.querySelector('.text-details h3');
    this.owner = this.rootElement.querySelector('.owner');
    this.description = this.rootElement.querySelector('.text-details .small');
    this.demoButton = this.rootElement.querySelector('.demo-button');
    this.carousel = this.rootElement.querySelector('.carousel');
    this.carouselList = this.carousel.querySelector('ul');
    this.licencePanel = this.rootElement.querySelector('.licence-panel');

    initPanel(this.licencePanel);

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
    const element = document.createElement('div');
    element.className = 'content-type-detail';
    element.setAttribute('aria-hidden', 'true');
    element.innerHTML = `
      <div class="back-button icon-arrow-thick"></div>
      <div class="container">
        <div class="image-wrapper"><img class="img-responsive content-type-image" src="${noIcon}"></div>
        <div class="text-details">
          <h3></h3>
          <div class="owner"></div>
          <p class="small"></p>
          <a class="button demo-button" target="_blank" aria-hidden="false" href="https://h5p.org/chart">Content Demo</a>
        </div>
      </div>
      <div class="carousel" role="region" data-size="5">
        <span class="carousel-button previous icon-arrow-thick" aria-hidden="true" disabled></span>
        <span class="carousel-button next icon-arrow-thick" aria-hidden="true" disabled></span>
        <nav class="scroller">
          <ul></ul>
        </nav>
      </div>
      <hr />
      <div class="button-bar">
        <span class="button button-primary button-use" aria-hidden="false" data-id="H5P.Chart">Use</span>
        <span class="button button-inverse-primary button-install" aria-hidden="true" data-id="H5P.Chart">Install</span>
      </div>
      <div class="panel-group">
        <div class="panel licence-panel" aria-hidden="true">
          <div class="panel-header" aria-expanded="false" aria-controls="licence-panel">The Licence Info</div>
          <div class="panel-body" id="licence-panel" aria-hidden="true">
            <div class="panel-body-inner"></div>
          </div>
        </div>
      </div>`;

    return element;
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
  setDescription(text) {
    if(text.length > MAX_TEXT_SIZE_DESCRIPTION) {
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)} <span class="read-more link">Read more</span>`;
      this.description
        .querySelector('.read-more, .read-less')
        .addEventListener('click', () => this.toggleDescriptionExpanded(text));
      this.descriptionExpanded = false;
    }
    else {
      this.description.innerText = text;
    }
  }

  toggleDescriptionExpanded(text) {
    // flip boolean
    this.descriptionExpanded = !this.descriptionExpanded;

    if(this.descriptionExpanded) {
      this.description.innerHTML = `${text} <span class="read-less link">Read less</span>`;
    }
    else {
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)} <span class="read-more link">Read more</span>`;
    }

    this.description
      .querySelector('.read-more, .read-less')
      .addEventListener('click', () => this.toggleDescriptionExpanded(text));
  }

  /**
   * Sets the long description
   *
   * @param {string} text
   */
  setDescriptionReadMore(text) {
      this.description.innerHTML = `${this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text)} <span class="read-more link">Read more</span>`;
      this.description
        .querySelector('.read-more')
        .addEventListener('click', () => this.description.innerText = text);
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
   */
  setLicence(type) {
    if(type){
      this.licencePanel.querySelector('.panel-body-inner').innerText = type;
      show(this.licencePanel);
    }
    else {
      hide(this.licencePanel);
    }
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