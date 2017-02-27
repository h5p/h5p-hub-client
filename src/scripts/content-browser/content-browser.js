import ContentBrowserView from "./content-browser-view";
import SearchService from "../search-service/search-service";
import ContentTypeList from '../content-type-list/content-type-list';
import ContentTypeDetail from '../content-type-detail/content-type-detail';
import {Eventful} from '../mixins/eventful';


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
 * @mixes Eventful
 */
export default class ContentBrowser {
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // add view
    this.view = new ContentBrowserView(state);

    // controller
    this.searchService = new SearchService();
    this.contentTypeList = new ContentTypeList();
    this.contentTypeDetail = new ContentTypeDetail();

    // set sub view (TODO find other way)
    this.view.getElement().appendChild(this.contentTypeList.getElement());
    this.view.getElement().appendChild(this.contentTypeDetail.getElement());

    // registers listeners
    this.contentTypeList.on('row-selected', ({id}) => {
      this.contentTypeList.hide();
      this.contentTypeDetail.loadById(id);
      this.contentTypeDetail.show();
    });

    this.contentTypeDetail.on('close', event => {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
    });

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
