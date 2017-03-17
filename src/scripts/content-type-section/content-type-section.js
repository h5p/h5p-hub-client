import ContentTypeSectionView from "./content-type-section-view";
import SearchService from "../search-service/search-service";
import ContentTypeList from '../content-type-list/content-type-list';
import ContentTypeDetail from '../content-type-detail/content-type-detail';
import {Eventful} from '../mixins/eventful';

/**
 * Tab section constants
 */
const ContentTypeSectionTabs = {
  ALL: {
    id: 'filter-all',
    title: 'All',
    eventName: 'all'
  },
  MY_CONTENT_TYPES: {
    id: 'filter-my-content-types',
    title: 'My Content Types',
    eventName: 'my-content-types',
    selected: true
  },
  MOST_POPULAR: {
    id: 'filter-most-popular',
    title: 'Most Popular',
    eventName: 'most-popular'
  }
};

/**
 * @class ContentTypeSection
 * @mixes Eventful
 *
 * @fires Hub#select
 */
export default class ContentTypeSection {
  /**
   * @param {object} state
   * @param {HubServices} services
   */
  constructor(state, services) {
    // add event system
    Object.assign(this, Eventful());

    // add view
    this.view = new ContentTypeSectionView(state);

    // controller
    this.searchService = new SearchService(services);
    this.contentTypeList = new ContentTypeList();
    this.contentTypeDetail = new ContentTypeDetail({}, services);

    // Element for holding list and details views
    const section = document.createElement('div');
    section.classList.add('content-type-section');

    this.rootElement = section;
    this.rootElement.appendChild(this.contentTypeList.getElement());
    this.rootElement.appendChild(this.contentTypeDetail.getElement());

    this.view.getElement().appendChild(this.rootElement);

    // propagate events
    this.propagate(['select', 'update-content-type-list'], this.contentTypeList);
    this.propagate(['select'], this.contentTypeDetail);
    this.propagate(['reload'], this.view);

    // register listeners
    this.view.on('search', this.search, this);
    this.view.on('search', this.view.selectMenuItemById.bind(this.view, ContentTypeSectionTabs.ALL.id));
    // this.view.on('search', this.resetMenuOnEnter, this);
    this.view.on('menu-selected', this.closeDetailView, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.view.on('menu-selected', this.clearInputField, this);
    this.view.on('menu-selected', this.updateDisplaySelected, this);
    this.contentTypeList.on('row-selected', this.showDetailView, this);
    this.contentTypeDetail.on('close', this.closeDetailView, this);
    this.contentTypeDetail.on('select', this.closeDetailView, this);

    this.initContentTypeList();

    // add menu items
    for (let tab in ContentTypeSectionTabs) {
      if (ContentTypeSectionTabs.hasOwnProperty(tab)) {
        this.view.addMenuItem(ContentTypeSectionTabs[tab]);
      }
    }

    this.view.initMenu();
  }

  /**
   * Initiates the content type list with a search
   */
  initContentTypeList() {
    // initialize by search
    this.searchService.search("")
      .then(contentTypes => this.contentTypeList.update(contentTypes))
      .catch(error => this.handleError(error));
  }

  /**
   * Handle errors communicating with HUB
   */
  handleError(error) {
    // TODO - use translation system:
    this.view.displayMessage({
      type: 'error',
      title: 'Not able to communicate with hub.',
      content: 'Error occured. Please try again.'
    });
  }

  /**
   * Executes a search and updates the content type list
   *
   * @param {string} query
   */
  search({query, keyCode}) {
    this.searchService.search(query)
      .then(contentTypes => this.contentTypeList.update(contentTypes));
  }

  /**
   * Updates the displayed name of the selected filter for mobile
   *
   * @param {SelectedElement} event
   */
  updateDisplaySelected(event) {
    this.view.setDisplaySelected(event.element.innerText);
  }

  /**
   * Applies search filter depending on what event it receives
   *
   * @param {Object} e Event
   * @param {string} e.choice Event name of chosen tab
   */
  applySearchFilter(e) {
    switch(e.choice) {
      case ContentTypeSectionTabs.ALL.eventName:
        this.searchService.sortOn('restricted')
          .then(cts => this.contentTypeList.update(cts));
        break;

      case ContentTypeSectionTabs.MY_CONTENT_TYPES.eventName:
        this.searchService.filterOutRestricted()
          .then(cts => this.contentTypeList.update(cts));
        break;

      case ContentTypeSectionTabs.MOST_POPULAR.eventName:
        const sortOrder = ['restricted', 'popularity'];
        this.searchService
          .sortOn(sortOrder)
          .then(cts => this.contentTypeList.update(cts));
        break;
    }

  }

  /**
   * Clears the input field
   *
   * @param {string} id
   */
  clearInputField({id}) {
    if (id !== ContentTypeSectionTabs.ALL.id) {
      this.view.clearInputField();
    }
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
    this.view.typeAheadEnabled = false;
    this.view.removeDeactivatedStyleFromMenu();
  }

  /**
   * Close detail view
   */
  closeDetailView() {
    this.contentTypeDetail.hide();
    this.contentTypeList.show()
    this.view.typeAheadEnabled = true;
    this.view.addDeactivatedStyleToMenu();
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
