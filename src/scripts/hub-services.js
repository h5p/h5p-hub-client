/**
 * @typedef {object} ContentType
 * @property {string} id
 * @property {string} title
 * @property {string} shortDescription
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
   * @param {string} rootUrl
   */
  constructor({ rootUrl }) {
    this.rootUrl = rootUrl;
  }

  /**
   * Returns a list of content types
   *
   * @return {Promise.<ContentType[]>}
   */
  contentTypes() {
    return fetch(`${this.rootUrl}/contenttypes`)
      .then(result => result.json());
  }

  /**
   * Returns a Content Type
   *
   * @param {string} id
   *
   * @return {Promise.<ContentType>}
   */
  contentType(id) {
    return fetch(`${this.rootUrl}/contenttypes/${id}`)
      .then(result => result.json());
  }

  /**
   * Installs a content type on the server
   *
   * @param {string} id
   *
   * @return {Promise.<ContentType>}
   */
  installContentType(id) {
    return fetch(`${this.rootUrl}/contenttypes/${id}/install`)
      .then(result => result.json());
  }
}