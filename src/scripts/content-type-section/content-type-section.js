import ContentTypeSectionView from "./content-type-section-view";
import SearchService from "../search-service/search-service";
import ContentTypeList from '../content-type-list/content-type-list';
import ContentTypeDetail from '../content-type-detail/content-type-detail';
import {Eventful} from '../mixins/eventful';
import {renderErrorMessage} from '../utils/errors';

/**
 * @class ContentTypeSection
 * @mixes Eventful
 */
export default class ContentTypeSection {
  /**
   * @param {HubState} state
   */
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // add view
    this.view = new ContentTypeSectionView(state);

    // controller
    this.searchService = new SearchService({ apiRootUrl: state.apiRootUrl });
    this.contentTypeList = new ContentTypeList();
    this.contentTypeDetail = new ContentTypeDetail({ apiRootUrl: state.apiRootUrl });

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
    this.view.on('search', this.search, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.contentTypeList.on('row-selected', this.showDetailView, this);
    this.contentTypeDetail.on('close', this.closeDetailView, this);

    this.initContentTypeList();
  }

  /**
   * Initiates the content type list with a search
   */
  initContentTypeList() {
    // initialize by search
    // this.searchService.search("")
    //   .then(contentTypes => this.contentTypeList.update(contentTypes))
    //   .catch(error => this.prependErrorMessage(error));
  }

  prependErrorMessage(config) {
    const errorMessage = renderErrorMessage(config);
  }

  /**
   * Executes a search and updates the content type list
   *
   * @param {string} query
   */
  search({query}) {
    this.searchService.search(query)
      .then(contentTypes => this.contentTypeList.update(contentTypes));
  }

  /**
   * Should apply a search filter
   */
  applySearchFilter() {
    console.debug('ContentTypeSection: menu was clicked!', event);
  }

  /**
   * Shows detail view
   *
   * @param {string} id
   */
  showDetailView({id}) {
    this.contentTypeList.hide();
    this.contentTypeDetail.loadById(id);
    this.contentTypeDetail.show();
  }


  /**
   * Close detail view
   */
  closeDetailView() {
    this.contentTypeDetail.hide();
    this.contentTypeList.show();
  }

  /**
   * Returns the element
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.view.getElement();
  }
}
