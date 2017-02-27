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
}