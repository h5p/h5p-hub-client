import ContetTypeDetailView from "./content-type-detail-view";
import {Eventful} from '../mixins/eventful';
import Dictionary from '../utils/dictionary';

const LICENCE_DATA = {
  "MIT": owner => ({
    title: 'MIT License',
    short: `
    <ul class="ul">
      <li>Can use commercially</li>
      <li>Can modify</li>
      <li>Can distribute</li>
      <li>Can sublicense</li>
      <li>Cannot hold liable</li>
      <li>Must include copyright</li>
      <li>Must include license</li>
    </ul>`,
    full: `<p>Copyright ${(new Date()).getFullYear()} ${owner}</p>
    
      <p>Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:</p>
    
      <p>The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.</p>
    
      <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE.</p>`
  })
};

/**
 * @class
 * @mixes Eventful
 */
export default class ContentTypeDetail {
  constructor(state, services) {
    // add event system
    Object.assign(this, Eventful());

    // set member variables
    this.apiVersion = state.apiVersion;

    // services
    this.services = services;

    // views
    this.view = new ContetTypeDetailView(state);
    this.view.on('install', this.install, this);
    this.view.on('show-licence-dialog', this.showLicenceDialog, this);

    // propagate events
    this.propagate(['close', 'select', 'modal'], this.view);
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
   * Displays the license dialog
   *
   * @param {object} license
   */
  showLicenceDialog({ license }) {
    const licenseDialog = this.view.createLicenseDialog({
      title: 'Content License info',
      subtitle: 'Click on a specific license to get info about proper usage',
      licences: [{
        title: license.title,
        body: license.full
      }]
    });

    // triggers the modal event
    this.trigger('modal', {
      element: licenseDialog
    });

    // set focus on the modal dialog
    setTimeout(() => licenseDialog.querySelector('.modal-dialog').focus(), 10);
  }

  /**
   * Handle the install
   *
   * @param {string} id
   */
  install({ id }){
    return this.services.contentTypes()
      .then(contentTypes => {
        const install = contentTypes.find(contentType => {
          return contentType.machineName === id;
        });

        return this.doInstall({
          id: install.machineName,
          installed: install.installed
        });
      });
  }

  /**
   * Loads a Content Type description
   *
   * @param {string} id
   * @param {boolean} installed Whether the content type is already installed
   *
   * @return {Promise.<ContentType>}
   */
  doInstall({id, installed}) {
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
    this.view.setLicence(LICENCE_DATA[contentType.license](contentType.owner));
    this.view.setIsRestricted(contentType.restricted);
    const isUpdatePossible = contentType.installed
      && !contentType.isUpToDate
      && !contentType.restricted;
    this.view.setIsUpdatePossible(isUpdatePossible, contentType.title || contentType.machineName);

    // Check if api version is supported
    const apiVersionSupported = this.apiVersion.major > contentType.h5pMajorVersion ||
      (this.apiVersion.major === contentType.h5pMajorVersion &&
      this.apiVersion.minor >= contentType.h5pMinorVersion);

    // If not installed and unsupported version - let view know
    if (!contentType.installed && !apiVersionSupported) {
      this.view.apiVersionUnsupported();
    }

    // update carousel
    this.view.removeAllImagesInCarousel();
    if(contentType.screenshots) {
      contentType.screenshots.forEach(this.view.addImageToCarousel, this.view);
    }
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
