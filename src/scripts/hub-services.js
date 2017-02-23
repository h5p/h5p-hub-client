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
}