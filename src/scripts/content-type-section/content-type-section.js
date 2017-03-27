import ContentTypeSectionView from "./content-type-section-view";
import SearchService from "../search-service/search-service";
import ContentTypeList from '../content-type-list/content-type-list';
import ContentTypeDetail from '../content-type-detail/content-type-detail';
import {Eventful} from '../mixins/eventful';
import Dictionary from '../utils/dictionary';

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

    /*
     * Tab section constants
     */
    ContentTypeSection.Tabs = {
      ALL: {
        id: 'filter-all',
        title: Dictionary.get('contentTypeSectionAll'),
        eventName: 'all'
      },
      MY_CONTENT_TYPES: {
        id: 'filter-my-content-types',
        title: Dictionary.get('contentTypeSectionMine'),
        eventName: 'my-content-types',
        selected: true
      },
      MOST_POPULAR: {
        id: 'filter-most-popular',
        title: Dictionary.get('contentTypeSectionPopular'),
        eventName: 'most-popular'
      }
    };

    // add view
    this.view = new ContentTypeSectionView(state);

    // controller
    this.searchService = new SearchService(services);
    this.contentTypeList = new ContentTypeList();
    this.contentTypeDetail = new ContentTypeDetail(state, services);

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
    this.view.on('search', this.view.selectMenuItemById.bind(this.view, ContentTypeSection.Tabs.ALL.id));
    // this.view.on('search', this.resetMenuOnEnter, this);
    this.view.on('menu-selected', this.closeDetailView, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.view.on('menu-selected', this.clearInputField, this);
    this.view.on('menu-selected', this.updateDisplaySelected, this);
    this.contentTypeList.on('row-selected', this.showDetailView, this);
    this.contentTypeDetail.on('close', this.closeDetailView, this);
    this.contentTypeDetail.on('select', this.closeDetailView, this);

    // add menu items
    Object.keys(ContentTypeSection.Tabs)
      .forEach(tab => this.view.addMenuItem(ContentTypeSection.Tabs[tab]));
    this.view.initMenu();
  }

  /**
   * Data has been loaded
   */
  loaded() {
    this.view.loaded();
  }

  /**
   * Handle errors communicating with HUB
   */
  handleError(error) {
    this.view.displayMessage({
      type: 'error',
      title: Dictionary.get('errorCommunicatingHubTitle'),
      content: Dictionary.get('errorCommunicatingHubContent')
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
      case ContentTypeSection.Tabs.ALL.eventName:
        this.searchService.sortOn('restricted')
          .then(sortedContentTypes => this.contentTypeList.update(sortedContentTypes));
        break;

      case ContentTypeSection.Tabs.MY_CONTENT_TYPES.eventName:
        this.searchService.filterOutRestricted()
          .then(filteredContentTypes => this.searchService.sortOnRecent(filteredContentTypes))
          .then(sortedContentTypes => this.contentTypeList.update(sortedContentTypes));
        break;

      case ContentTypeSection.Tabs.MOST_POPULAR.eventName:
        const sortOrder = ['restricted', 'popularity'];
        this.searchService
          .sortOn(sortOrder)
          .then(sortedContentTypes => this.contentTypeList.update(sortedContentTypes));
        break;
    }
  }

  /**
   * Clears the input field
   *
   * @param {string} id
   */
  clearInputField({id}) {
    if (id !== ContentTypeSection.Tabs.ALL.id) {
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
    this.contentTypeDetail.focus();
  }

  /**
   * Close detail view
   */
  closeDetailView() {
    if(!this.contentTypeDetail.isHidden()) {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
      this.view.typeAheadEnabled = true;
      this.view.addDeactivatedStyleToMenu();
      this.contentTypeList.focus();
    }
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
