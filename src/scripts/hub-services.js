/**
 * @typedef {object} ContentType
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} longDescription
 * @property {string} icon
 * @property {string} created
 * @property {string} update
 * @property {boolean} recommended
 * @property {number} timesDownloaded
 * @property {string[]} screenshots
 * @property {string} exampleContent
 * @property {string[]} keywords
 * @property {string[]} categories
 * @property {string} license
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
   * @param {string} id
   *
   * @return {Promise.<ContentType>}
   */
  contentType(id) {
    return window.cachedContentTypes.then(contentTypes => {
      return contentTypes.filter(contentType => contentType.id === id)[0];
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
    return fetch(`${this.apiRootUrl}content_type_cache/${id}/install`, {
      method: 'GET',
      credentials: 'include'
    }).then(result => result.json());
  }
}