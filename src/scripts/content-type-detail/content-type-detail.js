import ContetTypeDetailView from "./content-type-detail-view";
import {Eventful} from '../mixins/eventful';
import Dictionary from '../utils/dictionary';

/**
 * @class
 * @mixes Eventful
 */
export default class ContentTypeDetail {
  constructor(state, services) {
    const self = this;

    // add event system
    Object.assign(this, Eventful());

    // services
    this.services = services;

    this.apiVersion = state.apiVersion;

    // views
    this.view = new ContetTypeDetailView(state);
    this.view.on('install', event => {
      // Determine content type
      this.services.contentTypes()
        .then(contentTypes => {
          const install = contentTypes.find(contentType => {
            return contentType.machineName === event.id;
          });

          return self.install({
            id: install.machineName,
            installed: install.installed
          });
        });
    });

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
   * Focuses on the title
   */
  focus() {
    this.view.focus();
  }

  /**
   * Returns whether the detailview is hidden
   *
   * @return {boolean}
   */
  isHidden() {
    return this.view.isHidden();
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
   * @param {boolean} installed Whether the content type is already installed
   *
   * @return {Promise.<ContentType>}
   */
  install({id, installed}) {
    // set spinner
    this.view.toggleSpinner(true);

    return this.services.installContentType(id).then(response => {
      this.trigger('installed-content-type');
      this.view.toggleSpinner(false);
      this.view.setIsInstalled(true);
      this.view.setIsUpdatePossible(false);

      const installMessageKey = installed ? 'contentTypeUpdateSuccess'
        : 'contentTypeInstallSuccess';

      this.view.setInstallMessage({
        message: Dictionary.get(installMessageKey, {':contentType': id}),
      });
    })
      .catch(error => {
        this.view.toggleSpinner(false);

        // print error message
        let errorMessage = (error.errorCode) ? error : {
          success: false,
          errorCode: 'RESPONSE_FAILED',
          message: Dictionary.get('contentTypeInstallError', {':contentType': id})
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
    this.view.reset();
    this.view.setId(contentType.machineName);
    this.view.setTitle(contentType.title || contentType.machineName);
    this.view.setDescription(contentType.description);
    this.view.setImage(contentType.icon);
    this.view.setExample(contentType.example);
    this.view.setOwner(contentType.owner);
    this.view.setIsInstalled(contentType.installed);
    this.view.setLicence(contentType.license, contentType.owner);
    this.view.setIsRestricted(contentType.restricted);
    this.view.setIsUpdatePossible(contentType.installed
      && !contentType.isUpToDate
      && !contentType.restricted
    );

    // Check if api version is supported
    const apiVersionSupported = this.apiVersion.major > contentType.h5pMajorVersion ||
      (this.apiVersion.major == contentType.h5pMajorVersion &&
      this.apiVersion.minor >= contentType.h5pMinorVersion);

    // If not installed and unsupported version - let view know
    if (!contentType.installed && !apiVersionSupported) {
      this.view.apiVersionUnsupported();
    }

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
