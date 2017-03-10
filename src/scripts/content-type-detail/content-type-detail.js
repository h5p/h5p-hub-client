import ContetTypeDetailView from "./content-type-detail-view";
import HubServices from "../hub-services";
import { Eventful } from '../mixins/eventful';

/**
 * @class
 * @mixes Eventful
 */
export default class ContentTypeDetail {
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // services
    this.services = new HubServices({
      apiRootUrl: state.apiRootUrl
    });

    // views
    this.view = new ContetTypeDetailView(state);
    this.view.on('install', this.install, this);

    // propagate events
    this.propagate(['close', 'select'], this.view);
  }

  /**
   * Hides the detail view
   */
  hide() {
    this.view.hide();
  }

  /**
   * Shows the detail view
   */
  show() {
    this.view.show();
  }

  /**
   * Loads a Content Type description
   *
   * @param {string} id
   *
   * @return {Promise.<ContentType>}
   */
  loadById(id) {
    this.services.contentType(id)
      .then(this.update.bind(this))
  }

  /**
   * Loads a Content Type description
   *
   * @param {string} id
   *
   * @return {Promise.<ContentType>}
   */
   install({id}) {
     return this.services.contentType(id)
       .then(contentType => contentType.machineName)
       .then(machineName => this.services.installContentType(machineName))
       .then(contentType => console.debug('TODO, gui updates'))
   }

  /**
   * Updates the view with the content type data
   *
   * @param {ContentType} contentType
   */
  update(contentType) {
    this.view.setId(contentType.machineName);
    this.view.setTitle(contentType.title);
    this.view.setDescription(contentType.description);
    this.view.setImage(contentType.icon);
    this.view.setExample(contentType.example);
    this.view.setIsInstalled(!!contentType.installed);

    // update carousel
    this.view.removeAllImagesInCarousel();
    contentType.screenshots.forEach(this.view.addImageToCarousel, this.view);
  }

  /**
   * Returns the root html element
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.view.getElement();
  }
}
