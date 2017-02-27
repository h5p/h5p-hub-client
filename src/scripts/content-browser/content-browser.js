import ContentBrowserView from "./content-browser-view";
import SearchService from "../search/search";
import ContentTypeList from '../content-type-list/content-type-list';
import ContentTypeDetail from '../content-type-detail/content-type-detail';
import {Eventful} from '../mixins/eventful';

/**
 * @class ContentBrowser
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

    // propagate events
    this.propagate(['select'], this.contentTypeList);
    this.propagate(['select'], this.contentTypeDetail);

    // registers listeners
    this.contentTypeList.on('row-selected', ({id}) => {
      this.contentTypeList.hide();
      this.contentTypeDetail.loadById(id);
      this.contentTypeDetail.show();
    });

    this.contentTypeDetail.on('close', () => {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
    });

    this.view.onInputFieldKeyDown(function(text){
      this.searchService.search(text)
        .then(this.contentTypeList.update.bind(this.contentTypeList));
    }, this);

    // initialize by search
    this.searchService.search("")
      .then(contentTypes => {
        this.contentTypeList.update(contentTypes)
      });
  }

  getElement() {
    return this.view.getElement();
  }
}
