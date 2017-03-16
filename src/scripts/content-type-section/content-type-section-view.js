import MessageView from "../message-view/message-view";
import { setAttribute, getAttribute, hasAttribute, removeAttribute, querySelectorAll } from "utils/elements";
import { forEach } from "utils/functional";
import { relayClickEventAs } from '../utils/events';
import initMenu from 'components/menu';
import { EventDispatcher } from '../mixins/event-dispatcher';

/**
 * @param {HTMLElement[]} elements
 * @function
 */
const unselectAll = forEach(removeAttribute('aria-selected'));

/**
 * @class ContentBrowserView
 * @mixes EventDispatcher
 */
export default class ContentBrowserView {
  /**
   * @constructor
   * @param {object} state
   */
  constructor(state) {
    // add event system
    Object.assign(this, EventDispatcher());

    // create elements
    this.rootElement = this.createElement(state);

    // pick elements
    this.menubar = this.rootElement.querySelector('.navbar-nav');
    this.inputField = this.rootElement.querySelector('[role="search"] input');
    this.displaySelected = this.rootElement.querySelector('.navbar-toggler-selected');
    const inputButton = this.rootElement.querySelector('[role="search"] .input-group-addon');

    // input field
    this.inputField.addEventListener('keyup', event => {
      this.trigger('search', {
        element: event.target,
        query: event.target.value,
        keyCode: event.which || event.keyCode
      });
    });

    // input button
    inputButton.addEventListener('click', event => {
       let searchbar = event.target.parentElement.querySelector('#hub-search-bar');

       this.trigger('search', {
         element: searchbar,
         query: searchbar.value,
         keyCode: 13 // Act like an 'enter' key press
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
    let menutitle = 'Browse content types';
    let menuId = 'content-type-filter';
    let searchText = 'Search for Content Types';

    // create element
    const element = document.createElement('div');
    element.className = 'content-type-section-view';
    element.innerHTML = `
      <div class="menu-group">
        <nav  role="menubar" class="navbar">
          <div class="navbar-header">
             <span class="navbar-toggler navbar-toggler-right" aria-controls="${menuId}" aria-expanded="false">
               <span class="navbar-toggler-selected"></span>
               <span class="icon-accordion-arrow"></span>
             </span>
            <span class="navbar-brand">${menutitle}</span>
          </div>

          <ul id="${menuId}" class="navbar-nav" aria-hidden="true"></ul>
        </nav>

        <div class="input-group" role="search">
          <input id="hub-search-bar" class="form-control form-control-rounded" type="text" placeholder="${searchText}" />
          <div class="input-group-addon icon-search"></div>
        </div>
      </div>`;

    return element;
  }

  displayMessage(config) {
    var self = this;
    // Set the action
    // TODO - should be translatable
    config.action = "Reload";

    var messageView = new MessageView(config);
    var element = messageView.getElement();

    messageView.on('action-clicked', function () {
      self.rootElement.classList.remove('error');
      element.parentNode.removeChild(element);
      self.trigger('reload');
    });

    this.rootElement.classList.add('error');
    this.rootElement.appendChild(messageView.getElement());
  }

  /**
   * Adds a menu item
   *
   * @param {string} title
   * @param {string} id
   * @param {boolean} selected Determines if tab is already selected
   * @param {string} eventName Name of event that tab will fire off
   *
   * @return {HTMLElement}
   */
  addMenuItem({ title, id, selected, eventName }) {
    const element = document.createElement('li');
    element.setAttribute('role', 'menuitem');
    element.setAttribute('data-id', id);
    element.innerText = title;

    // sets if this menuitem should be selected
    if(selected) {
      element.setAttribute('aria-selected', 'true');
      this.displaySelected.innerText = title;
    }

    element.addEventListener('click', event => {
      this.trigger('menu-selected', {
        element: event.target,
        choice: eventName
      });
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
   * Sets the name of the currently selected filter
   *
   * @param {string} selectedName
   */
  setDisplaySelected(selectedName) {
    this.displaySelected.innerText = selectedName;
  }

  /**
   * Selects a menu item by id
   *
   * @param {string} id
   */
  selectMenuItemById(id) {
    const menuItems = this.menubar.querySelectorAll('[role="menuitem"]');
    const selectedMenuItem = this.menubar.querySelector(`[role="menuitem"][data-id="${id}"]`);

    if(selectedMenuItem) {
      unselectAll(menuItems);
      selectedMenuItem.setAttribute('aria-selected', 'true');

      this.trigger('menu-selected', {
        element: selectedMenuItem,
        id: selectedMenuItem.getAttribute('data-id')
      });
    }
  }

  initMenu() {
    // create the underline
    const underline = document.createElement('span');
    underline.className = 'menuitem-underline';
    this.menubar.appendChild(underline);

    // call init menu from sdk
    initMenu(this.rootElement);
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
