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
     // set spinner
     this.view.showButtonBySelector('.button-installing');

     return this.services.contentType(id)
       .then(contentType => this.services.installContentType(contentType.machineName))
       .then(contentType => {
         this.view.setIsInstalled(true);
         this.view.showButtonBySelector('.button-get');
         this.view.setInstallMessage({
           message: `${contentType.title} successfully installed!`,
         });
       })
       .catch(error => {
         this.view.showButtonBySelector('.button-install');

         // print error message
         let errorMessage = (error.errorCode) ? error : {
           success: false,
           errorCode: 'RESPONSE_FAILED',
           message: `${id} could not be installed! Contact your administrator.`,
         };
         this.view.setInstallMessage(errorMessage);

         // log whole error message to console
         console.error('Installation error', error);
       });
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
    this.view.setOwner(contentType.owner);
    this.view.setIsInstalled(contentType.installed);
    this.view.setLicence(contentType.license);

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
