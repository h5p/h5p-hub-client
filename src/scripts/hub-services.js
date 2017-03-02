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
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} isRecommended
 * @property {string} popularity
 * @property {object[]} screenshots
 * @property {string} license
 * @property {string} example
 * @property {string} tutorial
 * @property {string[]} keywords
 * @property {string[]} categories
 * @property {string} owner
 * @property {boolean} installed
 * @property {boolean} restricted
 */

/**
 * @class
 */
export default class HubServices {
  /**
   * @param {string} apiRootUrl
   */
  constructor({ apiRootUrl }) {
    this.apiRootUrl = apiRootUrl;

    if(!window.cachedContentTypes){
      window.cachedContentTypes = fetch(`${this.apiRootUrl}content_type_cache`, {
        method: 'GET',
        credentials: 'include'
      }).then(result => result.json()).then(json => json.libraries);
    }

  }

  /**
   * Returns a list of content types
   *
   * @return {Promise.<ContentType[]>}
   */
  contentTypes() {
    return window.cachedContentTypes;
  }

  /**
   * Returns a Content Type
   *
   * @param {string} machineName
   *
   * @return {Promise.<ContentType>}
   */
  contentType(machineName) {
    return window.cachedContentTypes.then(contentTypes => {
      return contentTypes.filter(contentType => contentType.machineName === machineName)[0];
    });

    /*return fetch(`${this.apiRootUrl}content_type_cache/${id}`, {
      method: 'GET',
      credentials: 'include'
    }).then(result => result.json());*/
  }

  /**
   * Installs a content type on the server
   *
   * @param {string} id
   *
   * @return {Promise.<ContentType>}
   */
  installContentType(id) {
    return fetch(`${this.apiRootUrl}library_install?id=${id}`, {
      method: 'POST',
      credentials: 'include',
      body: ''
    }).then(result => result.json());
  }
}