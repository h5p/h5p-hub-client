import { Eventful } from '../mixins/eventful';
import { createElement } from "utils/elements";
import initImageLightbox from "components/image-lightbox";

/**
 * @constant {string}
 */
const IMAGELIGHTBOX = 'imagelightbox';


/**
 * @class
 * @mixes Eventful
 */
export default class ImageLightBox {
  constructor() {
    // add event system
    Object.assign(this, Eventful());

    this.rootElement = this.createView();
    this.imageLightboxList = this.rootElement.querySelector(`.${IMAGELIGHTBOX}-list`);

    initImageLightbox(this.rootElement);
  }

  /**
   * Create the DOM structure
   *
   * @function
   * @returns {HTMLElement}
   */
  createView() {
    const l10n = {
      title: 'Images',
      progress: ':num of :total',
      next: 'Next image',
      prev: 'Previous image',
      close: 'Close dialog'
    };

    const rootElement = createElement({
      tag: 'div',
      id: `${IMAGELIGHTBOX}-detail`,
      classes: [IMAGELIGHTBOX],
      attributes: {
        role: 'dialog',
        'aria-label': l10n.title
      }
    });

    rootElement.innerHTML = `
      <div class="${IMAGELIGHTBOX}-inner">
        <div class="${IMAGELIGHTBOX}-button close" role="button" tabindex="0" aria-label="${l10n.close}"></div>
        <ol class="${IMAGELIGHTBOX}-list"></ol>
        <div class="${IMAGELIGHTBOX}-progress">${l10n.progress}</div>
        <div class="${IMAGELIGHTBOX}-button next" role="button" aria-disabled="true" aria-label="${l10n.next}"></div>
        <div class="${IMAGELIGHTBOX}-button previous" role="button" aria-disabled="true" aria-label="${l10n.prev}"></div>
      </div>`;

    return rootElement;
  }

  /**
   * Add an image
   *
   * @function
   * @param {string} url
   * @param {string} alt
   */
  addImage({url, alt}){
    const item = createElement({
      tag: 'li',
      classes: [`${IMAGELIGHTBOX}-image`]
    });
    item.innerHTML = `<img class="img-responsive" src="${url}" alt="${alt}">`;
    this.imageLightboxList.appendChild(item);
  }

  /**
   * Show the lightbox
   *
   * @function
   * @param {number} index - the image to show first
   */
  show(index) {
    this.rootElement.setAttribute('data-show', index);
  }

  /**
   * Remove all images
   * @function
   */
  reset() {
    this.imageLightboxList.innerHTML = '';
  }

  /**
   * Return the DOM element
   *
   * @returns {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}
