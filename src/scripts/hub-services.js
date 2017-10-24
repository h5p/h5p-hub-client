import './utils/fetch';
/**
 * @typedef {object} ContentType
 * @property {string} machineName
 * @property {string} majorVersion
 * @property {string} minorVersion
 * @property {string} patchVersion
 * @property {string} h5pMajorVersion
 * @property {string} h5pMinorVersion
 * @property {string} title
 * @property {string} summary
 * @property {string} description
 * @property {string} icon
 * @property {string} createdAt
 * @property {string} updated_At
 * @property {string} isRecommended
 * @property {string} popularity
 * @property {object[]} screenshots
 * @property {object} license
 * @property {string} example
 * @property {string} tutorial
 * @property {string[]} keywords
 * @property {string} owner
 * @property {boolean} installed
 * @property {boolean} isUpToDate
 * @property {boolean} restricted
 * @property {boolean} canInstall Whether the content type can be installed by current user
 */
export default class HubServices {
  /**
   * @param {string} apiRootUrl
   * @param {number} contentId
   */
  constructor({ apiRootUrl, contentId }) {
    this.contentId = contentId || 0;
    this.apiRootUrl = apiRootUrl;
    this.licenseCache = {};
  }

  /**
   * Fetch the content type metadata
   */
  setup() {
    this.cachedContentTypes = fetch(`${this.apiRootUrl}content-type-cache`, {
      method: 'GET',
      credentials: 'include'
    }).then(result => result.json())
      .catch(err => ({
        errorCode: 'SERVER_ERROR',
        err: err,
        success: false
      }))
      .then(this.isValid);

    return this.cachedContentTypes;
  }

  /**
   * Returns a list of content types
   *
   * @return {Promise.<ContentType[]>}
   */
  contentTypes() {
    return this.cachedContentTypes.then(json => json.libraries);
  }

  /**
   * Returns a list of H5P Machine names ordered by most recently used
   *
   * @return {string[]}  Machine names
   */
  recentlyUsed() {
    return this.cachedContentTypes.then(json => json.recentlyUsed);
  }

  /**
   * Returns a Content Type
   *
   * @param {string} machineName
   *
   * @return {Promise.<ContentType>}
   */
  contentType(machineName) {
    return this.contentTypes()
      .then(contentTypes => {
        return contentTypes.filter(contentType => contentType.machineName === machineName)[0];
      });
  }

  /**
   * Installs a content type on the server
   *
   * @param {string} id
   *
   * @return {Promise.<ContentType>}
   */
  installContentType(id) {
    return fetch(ns.getAjaxUrl('library-install', {id: id}), {
      method: 'POST',
      credentials: 'include',
      body: ''
    })
      .then(result => result.json())
      .then(this.rejectIfNotSuccess);
  }

  /**
   * Uploads a content type to the server for validation
   *
   * @param {FormData} formData Form containing the h5p that should be uploaded as 'h5p'
   *
   * @return {Promise} Returns the promise of a json containing the content json and the h5p json
   */
  uploadContent(formData) {
    formData.append('contentId', this.contentId);

    return fetch(`${this.apiRootUrl}library-upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    }).then(result => result.json());
  }

  /**
   * Get license info from h5p.org. Cache it, so that it is only fetched once.
   *
   * @param {string} licenseId
   * @return {Promise}
   */
  getLicenseDetails(licenseId) {
    // Check if already cached:
    const cachedLicense = this.licenseCache[licenseId];

    if (cachedLicense) {
      return Promise.resolve(cachedLicense);
    }

    return fetch(`https://api.h5p.org/v1/licenses/${licenseId}`)
      .then(result => result.json())
      .then(result => this.licenseCache[licenseId] = result);
  }

  /**
   *
   * @param  {ContentType[]|ErrorMessage} response
   *
   * @return {Promise<ContentType[]|ErrorMessage>}
   */
  isValid(response) {
    if (response.errorCode) {
      return Promise.reject(response);
    }
    else {
      return Promise.resolve(response);
    }
  }

  /**
   * Rejects the Promise if response.success != true
   *
   * @param {object} response
   *
   * @return {Promise<ContentType[]|ErrorMessage>}
   */
  rejectIfNotSuccess(response) {
    return Promise[response.success ? 'resolve' : 'reject'](response);
  }
}
