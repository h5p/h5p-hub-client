import ContentBrowserView from "./content-browser-view";
import HubServices from "../hub-services";

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

/**
 * @class
 */
export default class ContentBrowser {
  constructor(state){
    this.view = new ContentBrowserView(state);
    this.services = new HubServices({
      rootUrl: '/test/mock/api'
    });

    // get content types
    this.services.contentTypes()
      .then(contentTypes => this.view.updateList(contentTypes));
  }

  getElement() {
    return this.view.getElement();
  }
}
