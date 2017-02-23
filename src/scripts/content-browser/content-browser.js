import ContentBrowserView from "./content-browser-view";
import SearchService from "../search/search";

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

    // controller
    this.searchService = new SearchService();

    // initialize by search
    this.searchService.search("")
      .then(contentTypes => this.view.updateList(contentTypes));

    // Todo Use event system
    this.view.inputFieldElement.addEventListener('keyup', event => {
      let query = event.target.value;
      this.searchService.search(query)
        .then(this.view.updateList.bind(this.view));
    });
  }

  getElement() {
    return this.view.getElement();
  }
}
