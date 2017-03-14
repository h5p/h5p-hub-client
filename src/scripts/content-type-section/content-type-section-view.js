import { setAttribute, getAttribute, hasAttribute, querySelectorAll } from "utils/elements";
import initMenu from 'components/menu';
import {Eventful} from '../mixins/eventful';

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

    // create elements
    this.rootElement = this.createElement(state);

    // pick elements
    this.menubar = this.rootElement.querySelector('.navbar-nav');
    this.inputField = this.rootElement.querySelector('[role="search"] input');
    const inputButton = this.rootElement.querySelector('[role="search"] .input-group-addon');

    // input field
    this.inputField.addEventListener('keyup', event => {
      this.fire('search', {
        element: event.target,
        query: event.target.value
      });
    });

    // input button
    inputButton.onclick = function() {
      this.parentElement.querySelector('#search-bar').focus()
    };
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
    element.innerHTML = `
      <div class="menu-group">
        <nav  role="menubar" class="navbar">
          <div class="navbar-header">
              <span class="navbar-toggler navbar-toggler-right" aria-controls="${menuId}" aria-expanded="false">
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

  /**
   * Adds a menu item
   *
   * @param {string} text
   *
   * @return {HTMLElement}
   */
  addMenuItem(text) {
    const element = document.createElement('li');
    element.setAttribute('role', 'menuitem');
    element.innerHTML = text;

    element.addEventListener('click', event => {
      this.fire('menu-selected', {
        element: event.target
      });
    });

    // sets first to be selected
    if(this.menubar.childElementCount == 1) {
      element.setAttribute('aria-selected', 'true');
    }

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
   * Checks if a menu item is the first child in the menu
   *
   * @param  {HTMLElement} menuItem
   * @return {boolean}
   */
  isFirstMenuItem(menuItem) {
    return menuItem === this.menubar.querySelectorAll('[role="menuitem"]')[0];
  }

  /**
   * Ensures the first menu item is selected
   */
  resetMenuSelection() {
    this.menubar.querySelectorAll('[role="menuitem"]')
      .forEach(menuItem =>
        menuItem.setAttribute('aria-selected', this.isFirstMenuItem(menuItem).toString())
      );
  }

  initMenu() {
    const underline = document.createElement('span');
    underline.className = 'menuitem-underline';
    this.menubar.appendChild(underline);
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
