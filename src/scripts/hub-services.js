/**
 * @typedef {object} ContentType
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} description
 * @property {string} icon
 * @property {string} created
 * @property {string} update
 * @property {boolean} recommended
 * @property {number} timesDownloaded
 * @property {string[]} screenshots
 * @property {string} example
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
      window.cachedContentTypes = fetch(`${this.apiRootUrl}errors/NO_ID.json`, {
        method: 'GET',
        credentials: 'include'
      })
      .then(result => result.json())
      .then(this.isValid)
      .then(json => json.libraries);
    }
  }

  /**
   *
   * @param  {Object} response
   * @return {Promise<ContentType[] | ErrorMessage>}
   */
  isValid(response) {
    if (response.messageCode) {
      return Promise.reject(response);
    }

    else {
      return Promise.resolve(response);
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
    return fetch(`${this.apiRootUrl}library_install?id=${id}`, {
      method: 'POST',
      credentials: 'include',
      body: ''
    }).then(result => result.json());
  }
}