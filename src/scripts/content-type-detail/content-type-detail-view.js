import { setAttribute, getAttribute } from "../../../node_modules/h5p-sdk/src/scripts/utils/elements";
import { curry } from "../../../node_modules/h5p-sdk/src/scripts/utils/functional";
import { Eventful } from '../mixins/eventful';
import initPanel from "../../../node_modules/h5p-sdk/src/scripts/components/panel"

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
    const useButton = document.createElement('span');
    useButton.className = 'button';
    useButton.innerHTML = 'Use';
    relayClickEventAs('select', this, useButton);

    // install button
    const installButton = document.createElement('span');
    installButton.className = 'button button-inverse';
    installButton.innerHTML = 'Install';
    relayClickEventAs('install', this, installButton);

    // use button
    this.useButton = document.createElement('span');
    this.useButton.className = 'button';
    this.useButton.innerHTML = 'Use';

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
    this.rootElement.appendChild(useButton);
    this.rootElement.appendChild(installButton);
    this.rootElement.appendChild(panelGroupElement);
  }

  /*
  *   <div class="panel-group">
   <div class="panel">
   <div class="panel-header" aria-expanded="true" aria-controls="panel-body-1">Title</div>
   <div id="panel-body-1" class="panel-body" aria-hidden="false">
   <div class="panel-body-inner">
   <p>Lorem ipsum dolor sit amet, case solum pri ex, sed te feugiat legimus. Sea doming alterum necessitatibus id, ipsum putent disputando ei pri. Docendi electram ei cum, usu ea meis tractatos dignissim. An eos putent tamquam postulant, falli periculis nam et. Ne mel hinc scaevola probatus.</p>
   <p>Lorem ipsum dolor sit amet, case solum pri ex, sed te feugiat legimus. Sea doming alterum necessitatibus id, ipsum putent disputando ei pri. Docendi electram ei cum, usu ea meis tractatos dignissim. An eos putent tamquam postulant, falli periculis nam et. Ne mel hinc scaevola probatus.</p>
   <p>Lorem ipsum dolor sit amet, case solum pri ex, sed te feugiat legimus. Sea doming alterum necessitatibus id, ipsum putent disputando ei pri. Docendi electram ei cum, usu ea meis tractatos dignissim. An eos putent tamquam postulant, falli periculis nam et. Ne mel hinc scaevola probatus.</p>
   </div>
   </div>
   </div>
  * */

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
   * @return {ContentTypeDetailView}
   */
  image(src) {
    this.imageElement.setAttribute('src', src);
    return this;
  }

  /**
   * Sets the title
   *
   * @param {string} title
   * @return {ContentTypeDetailView}
   */
  title(title) {
    this.titleElement.innerHTML = title;
    return this;
  }

  /**
   * Sets the long description
   *
   * @param {string} text
   * @return {ContentTypeDetailView}
   */
  longDescription(text) {
    this.longDescriptioneElement.innerHTML = text;
    return this;
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

  getElement() {
    return this.rootElement;
  }
}