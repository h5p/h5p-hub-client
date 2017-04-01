import MessageView from "../message-view/message-view";
import { setAttribute, getAttribute, hasAttribute, removeAttribute, querySelectorAll } from "utils/elements";
import { relayClickEventAs } from '../utils/events';
import initNavbar from 'components/navbar';
import { Eventful } from '../mixins/eventful';
import Dictionary from '../utils/dictionary';
import ContentTypeSection from './content-type-section';

/**
 * @constant {number}
 */
const KEY_CODE_TAB = 9;

/**
 * @class ContentBrowserView
 * @mixes Eventful
 */
export default class ContentBrowserView {
  /**
   * @constructor
   * @param {object} state
   */
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // general configuration
    this.typeAheadEnabled = true;
    this.currentlySelected = {};
    this.menuId = 'content-type-filter';
    this.currentMenuId = this.menuId + '-a11y-desc-current';

    // create elements
    this.rootElement = this.createElement(state);

    // pick elements
    this.menu = this.rootElement.querySelector('nav');
    this.menubar = this.rootElement.querySelector('.navbar-nav');
    this.inputField = this.rootElement.querySelector('[role="search"] input');
    this.displaySelected = this.rootElement.querySelector('.navbar-toggler-selected');
    const inputButton = this.rootElement.querySelector('[role="search"] .input-group-addon');
    const searchBar = this.rootElement.querySelector('#hub-search-bar');

    // Listen to input changes
    this.inputField.addEventListener('input', event => {
      if (this.typeAheadEnabled) {
        this.trigger('search', {
          element: searchBar,
          query: searchBar.value
        });
        searchBar.focus();
      }
    });

    // Allow searching with 'enter' key
    this.inputField.addEventListener('keydown', event => {
      if (event.which === 13) {
        this.trigger('search', {
          element: searchBar,
          query: searchBar.value
        });
        searchBar.focus();
      }
    });

    // Search button
    inputButton.addEventListener('click', event => {
       this.trigger('search', {
         element: searchbar,
         query: searchbar.value
       });
       searchBar.focus();
    })
  }

  /**
   * Creates the menu group element
   *
   * @param {object} state
   *
   * @return {HTMLElement}
   */
  createElement(state) {
    let searchText = Dictionary.get('contentTypeSearchFieldPlaceholder');

    // create element
    const element = document.createElement('div');
    element.className = 'content-type-section-view loading';
    element.innerHTML = `
      <div class="menu-group">
        <nav  role="menubar" class="navbar">
          <div class="navbar-header">
            <span class="navbar-toggler-selected" tabindex="0" aria-haspopup="true" role="button" aria-controls="${this.menuId}" aria-expanded="false"></span>
            <span class="navbar-brand">${Dictionary.get("contentTypeSectionTitle")}</span>
          </div>

          <ul id="${this.menuId}" class="navbar-nav">
            <span id="${this.currentMenuId}" style="display: none">${Dictionary.get("currentMenuSelected")}</span>
          </ul>
        </nav>

        <div class="input-group" role="search">
          <input id="hub-search-bar" class="form-control form-control-rounded" type="text" aria-label="${searchText}" placeholder="${searchText}" />
          <div class="input-group-addon icon-search"></div>
        </div>
      </div>`;

    return element;
  }

  /**
   * Display a message
   *
   * @param {object} config - parameters sent to MessageView constructor
   */
  displayMessage(config) {
    const self = this;
    // Set the action
    config.action = Dictionary.get('reloadButtonLabel');

    const messageView = new MessageView(config);
    const element = messageView.getElement();

    messageView.on('action-clicked', function () {
      self.rootElement.classList.remove('error');
      self.rootElement.classList.add('loading');
      element.parentNode.removeChild(element);
      // Give the user a chance to see that it's reloading
      setTimeout(() => self.trigger('reload'), 1000);
    });

    this.rootElement.classList.remove('loading');
    this.rootElement.classList.add('error');
    this.rootElement.appendChild(messageView.getElement());
  }

  /**
   * Inform view data is loaded
   */
  loaded() {
    this.rootElement.classList.remove('loading');
    this.rootElement.classList.add('loaded');
  }

  /**
   * Adds a menu item
   *
   * @param {string} title
   * @param {string} id
   * @param {string} eventName Name of event that tab will fire off
   *
   * @return {HTMLElement}
   */
  addMenuItem({ title, id, eventName }) {
    const self = this;
    const element = document.createElement('li');
    element.setAttribute('role', 'menuitem');
    element.setAttribute('data-id', id);
    element.innerText = title;

    element.addEventListener('click', () => {
      self.selectMenuItem({id, eventName});
    });

    element.addEventListener('keydown', event => {
      if (event.which === 13 || event.which === 32) {
        self.selectMenuItem({id, eventName});
        event.preventDefault();
      }
    });

    this.on('menu-selected', event => {
      const myArray =  Object.keys(ContentTypeSection.Tabs)
        .map(menuItemName => ContentTypeSection.Tabs[menuItemName]);

      // Get the currently selected menu item
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].eventName === event.choice) {
          self.currentlySelected = myArray[i];
          return;
        }
      }
    });

    // add to menu bar
    this.menubar.appendChild(element);
    return element;
  }

  /**
   * Clears the input field
   */
  clearInputField() {
    this.inputField.value = '';
  }

  /**
   * Clears menu item selection
   */
  clearSelection() {
    this.currentlySelected = {};
  }

  /**
   * Sets the name of the currently selected filter
   *
   * @param {string} selectedName
   */
  setDisplaySelected(selectedName) {
    this.displaySelected.innerText = selectedName;
  }

  /**
   * Selects a menu item
   *
   * @param {string} id Id of menu
   * @param {string} eventName Event name of menu
   */
  selectMenuItem({id, eventName}) {
    // Skip if already selected
    if (this.currentlySelected.eventName === eventName) {
      return;
    }

    const menuItems = querySelectorAll('[role="menuitem"]', this.menubar);
    const selectedMenuItem = this.menubar.querySelector(`[role="menuitem"][data-id="${id}"]`);

    if(selectedMenuItem) {
      // Manually set the classes and aria attributes upon initialisation - toggling logic is handled in the h5p-sdk
      selectedMenuItem.classList.add('selected');

      // Set readspeaker information for the current menu item
      menuItems.forEach(menuitem => {
        menuitem.removeAttribute('aria-describedby');
      })
      selectedMenuItem.setAttribute('aria-describedby', this.currentMenuId);

      this.trigger('menu-selected', {
        element: selectedMenuItem,
        id: id,
        choice: eventName
      });
    }
  }

  /*
   * Initialize the menu from the controller
   */
  initMenu() {
    // call init menu from sdk
    initNavbar(this.menu);
  }

  /**
   * Hides text styles and the menu underline
   */
  addDeactivatedStyleToMenu() {
    this.menu.classList.remove('deactivated');
  }
  /**
   * Restores text styles and the menu underline
   */
  removeDeactivatedStyleFromMenu() {
    this.menu.classList.add("deactivated");
  }

  /**
   * Returns the root element of the content browser
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}
