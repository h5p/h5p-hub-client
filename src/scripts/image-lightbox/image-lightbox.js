import { Eventful } from '../mixins/eventful';
import { createElement } from 'utils/elements';
import initImageLightbox from 'components/image-lightbox';
import Dictionary from '../utils/dictionary';

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

    this.rootElement.addEventListener('lightbox-hidden', () => {
      this.trigger('lightbox-hidden');
    });
  }

  /**
   * Create the DOM structure
   *
   * @function
   * @returns {HTMLElement}
   */
  createView() {
    const rootElement = createElement({
      tag: 'div',
      id: `${IMAGELIGHTBOX}-detail`,
      classes: [IMAGELIGHTBOX],
      attributes: {
        role: 'dialog',
        'aria-label': Dictionary.get('imageLightboxTitle')
      }
    });

    rootElement.innerHTML = `
      <div class="${IMAGELIGHTBOX}-inner">
        <div class="${IMAGELIGHTBOX}-button close" role="button" tabindex="0" aria-label="${Dictionary.get('close')}"></div>
        <ol class="${IMAGELIGHTBOX}-list"></ol>
        <div class="${IMAGELIGHTBOX}-progress">${Dictionary.get('imageLightBoxProgress')}</div>
        <div class="${IMAGELIGHTBOX}-button next" role="button" aria-disabled="true" aria-label="${Dictionary.get('nextImage')}"></div>
        <div class="${IMAGELIGHTBOX}-button previous" role="button" aria-disabled="true" aria-label="${Dictionary.get('previousImage')}"></div>
      </div>`;

    return rootElement;
  }

  /**
   * Add an image
   *
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
   * @param {number} index - the image to show first
   */
  show(index) {
    this.rootElement.setAttribute('data-show', index);
  }

  /**
   * Remove all images
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
