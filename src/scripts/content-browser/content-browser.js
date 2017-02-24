import ContentBrowserView from "./content-browser-view";
import SearchService from "../search/search";
import ContentTypeList from '../content-type-list/content-type-list';
import ContentTypeDetail from '../content-type-detail/content-type-detail';

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
    this.contentTypeList = new ContentTypeList();
    this.contentTypeDetail = new ContentTypeDetail();

    // set sub view (TODO find other way)
    this.view.getElement().appendChild(this.contentTypeList.getElement());

    // registers
    this.view.onInputFieldKeyDown(function(text){
      this.searchService.search(text)
        .then(this.contentTypeList.update.bind(this.contentTypeList));
    }, this);

    // initialize by search
    this.searchService.search("")
      .then(contentTypes => this.contentTypeList.update(contentTypes));
  }

  getElement() {
    return this.view.getElement();
  }
}
