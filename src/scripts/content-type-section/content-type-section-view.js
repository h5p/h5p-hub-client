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
    this.menubar = this.rootElement.querySelector('.navbar-nav');
    this.inputField = this.rootElement.querySelector('[role="search"] input');
    const inputButton = this.rootElement.querySelector('[role="search"] .input-group-addon');

    // input field
    this.inputField.addEventListener('keyup', event => {
      this.fire('search', {
        element: event.target,
        query: event.target.value,
        keyCode: event.which || event.keyCode
      });
    });

    // input button
    inputButton.addEventListener('click', event => {
       let searchbar = event.target.parentElement.querySelector('#hub-search-bar');

       this.fire('search', {
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
    element.innerHTML = `
      <div class="menu-group">
        <nav  role="menubar" class="navbar">
          <span class="navbar-toggler navbar-toggler-right" aria-controls="${menuId}" aria-expanded="false">
             <span>&#9776;</span>
           </span>
          <span class="navbar-brand">${menutitle}</span>
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
<<<<<<< HEAD
=======
   * Adds an animated border to the bottom of the tab
   */
  addBottomBorder() {
    this.menuBarElement.appendChild(document.createElement('span'));
  }

  /**
   * Creates the menu bar element
   *
   * @return {Element}
   */
  createMenuElement() {
    this.menuBarElement = document.createElement('ul');
    this.menuBarElement.setAttribute('role', 'menubar');
    this.menuBarElement.className = 'h5p-menu';

    const navElement = document.createElement('nav');
    navElement.appendChild(this.menuBarElement);

    const title = document.createElement('div');
    title.className = "menu-title";
    title.innerHTML = "Browse content types";

    const menu = document.createElement('div');
    menu.className = "menu";
    menu.appendChild(title);
    menu.appendChild(navElement);

    return menu;
  }

  /**
   * Creates the input group used for search
   *
   * @return {HTMLElement}
   */
  createInputGroupElement() {
    // input field
    const inputField = document.createElement('input');
    inputField.id = "hub-search-bar";
    inputField.className = 'form-control form-control-rounded';
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', "Search for Content Types");
    inputField.addEventListener('keyup', event => {
      this.fire('search', {
        element: event.target,
        query: event.target.value,
        keyCode: event.which || event.keyCode
      });
    });

    // input button
    const inputButton = document.createElement('div');
    inputButton.className = 'input-group-addon icon-search';
    inputButton.addEventListener('click', event => {
      let searchbar = event.target.parentElement.querySelector('#hub-search-bar');

      this.fire('search', {
        element: searchbar,
        query: searchbar.value,
        keyCode: 13 // Act like an 'enter' key press
      });

      searchbar.focus();
    })

    // input group
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.appendChild(inputField);
    inputGroup.appendChild(inputButton);

    return inputGroup;
  }

  /**
>>>>>>> c5e64d57cd040b4f2125905107ce69fda86e112b
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
    this.menubar.appendChild(document.createElement('span'));
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
