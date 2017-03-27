import MessageView from "../message-view/message-view";
import { setAttribute, getAttribute, hasAttribute, removeAttribute, querySelectorAll } from "utils/elements";
import { forEach } from "utils/functional";
import { relayClickEventAs } from '../utils/events';
import initNavbar from 'components/navbar';
import { Eventful } from '../mixins/eventful';
import Dictionary from '../utils/dictionary';
import ContentTypeSection from './content-type-section';

/**
 * @param {HTMLElement[]} elements
 * @function
 */
const unselectAll = forEach(removeAttribute('aria-selected'));

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

    // create elements
    this.rootElement = this.createElement(state);

    // pick elements
    this.menu = this.rootElement.querySelector('nav');
    this.menubar = this.rootElement.querySelector('.navbar-nav');
    this.inputField = this.rootElement.querySelector('[role="search"] input');
    this.displaySelected = this.rootElement.querySelector('.navbar-toggler-selected');
    const inputButton = this.rootElement.querySelector('[role="search"] .input-group-addon');
    const searchBar = this.rootElement.querySelector('#hub-search-bar');

    this.inputField.addEventListener('input', event => {
      if (this.typeAheadEnabled || event.which === 13) {
        this.trigger('search', {
          element: searchBar,
          query: searchBar.value
        });
      }
    });

    // input button
    inputButton.addEventListener('click', event => {
       let searchbar = event.target.parentElement.querySelector('#hub-search-bar');

       this.trigger('search', {
         element: searchbar,
         query: searchbar.value
       });

       searchbar.focus();
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
    let menuId = 'content-type-filter';
    let searchText = Dictionary.get('contentTypeSearchFieldPlaceholder');

    // create element
    const element = document.createElement('div');
    element.className = 'content-type-section-view loading';
    element.innerHTML = `
      <div class="menu-group">
        <nav  role="menubar" class="navbar">
          <div class="navbar-header">
             <button class="navbar-toggler navbar-toggler-right" tabindex="0" aria-haspopup="true" aria-controls="${menuId}" aria-expanded="false">
               <span class="icon-accordion-arrow"></span>
             </button>
            <span class="navbar-toggler-selected"></span>
            <span class="navbar-brand">${Dictionary.get("contentTypeSectionTitle")}</span>
          </div>

          <ul id="${menuId}" class="navbar-nav"></ul>
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
      self.trigger('reload');
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

    element.addEventListener('keyup', event => {
      if (event.which === 13 || event.which === 32) {
        self.selectMenuItem({id, eventName});
        event.stopPropagation();
      }
    });

    this.on('menu-selected', event => {
      self.currentlySelected = Object.keys(ContentTypeSection.Tabs)
        .map(menuItemName => ContentTypeSection.Tabs[menuItemName])
        .find(menu => menu.eventName === event.choice);
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

    const menuItems = this.menubar.querySelectorAll('[role="menuitem"]');
    const selectedMenuItem = this.menubar.querySelector(`[role="menuitem"][data-id="${id}"]`);

    if(selectedMenuItem) {
      unselectAll(menuItems);
      selectedMenuItem.setAttribute('aria-selected', 'true');

      this.trigger('menu-selected', {
        element: selectedMenuItem,
        id: id,
        choice: eventName
      });
    }
  }

  initMenu() {
    // create the underline
    const underline = document.createElement('span');
    underline.className = 'menuitem-underline';
    this.menubar.appendChild(underline);

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
