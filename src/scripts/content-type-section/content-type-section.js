import ContentTypeSectionView from "./content-type-section-view";
import SearchService from "../search-service/search-service";
import ContentTypeList from '../content-type-list/content-type-list';
import ContentTypeDetail from '../content-type-detail/content-type-detail';
import {Eventful} from '../mixins/eventful';

/**
 * @class ContentTypeSection
 * @mixes Eventful
 */
export default class ContentTypeSection {
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // add view
    this.view = new ContentTypeSectionView(state);

    // controller
    this.searchService = new SearchService();
    this.contentTypeList = new ContentTypeList();
    this.contentTypeDetail = new ContentTypeDetail();

    // add menu items
    ['My Content Types', 'Newest', 'Most Popular', 'Recommended']
      .forEach(menuText => this.view.addMenuItem(menuText));

    // set sub view (TODO find other way)
    this.view.getElement().appendChild(this.contentTypeList.getElement());
    this.view.getElement().appendChild(this.contentTypeDetail.getElement());

    // propagate events
    this.propagate(['select'], this.contentTypeList);
    this.propagate(['select'], this.contentTypeDetail);

    // register listeners
    this.view.on('search', ({query}) => {
      this.searchService.search(query)
        .then(this.contentTypeList.update.bind(this.contentTypeList));
    });

    this.view.on('menu-selected', event => {
      console.debug('ContentTypeSection: menu was clicked!', event);
    });

    this.contentTypeList.on('row-selected', ({id}) => {
      this.contentTypeList.hide();
      this.contentTypeDetail.loadById(id);
      this.contentTypeDetail.show();
      this.fire('resize');
    });

    this.contentTypeDetail.on('close', () => {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
      this.fire('resize');
    });

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
