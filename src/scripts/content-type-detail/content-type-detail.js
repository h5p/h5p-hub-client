import ContetTypeDetailView from "./content-type-detail-view";
import HubServices from "../hub-services";
import { Eventful } from '../mixins/eventful';

export default class ContentTypeDetail {
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    this.view = new ContetTypeDetailView(state);
    this.services = new HubServices({
      rootUrl: '/test/mock/api'
    });

    this.propagate(['close'], this.view);
  }

  hide() {
    this.view.hide();
  }

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
   * Updates the view with the content type data
   *
   * @param {ContentType} contentType
   */
  update(contentType) {
    this.view
      .title(contentType.title)
      .longDescription(contentType.longDescription)
      .image(contentType.icon);
  }

  getElement() {
    return this.view.getElement();
  }
}