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
    let navbar = this.createNavbar();
    this.menubar = navbar.querySelector('.navbar-nav');
    const inputGroup = this.createInputGroupElement();

    // menu group
    const menuGroup = document.createElement('div');
    menuGroup.className = 'menu-group';
    menuGroup.appendChild(navbar);
    menuGroup.appendChild(inputGroup);

    // root element
    this.rootElement  = document.createElement('div');
    this.rootElement.appendChild(menuGroup);
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
   * Creates the menu bar element
   *
   * @return {Element}
   */
  createNavbar() {
    let menutitle = 'Browse content types';
    let menuId = 'content-type-filter';
    const navbar = document.createElement('nav');
    navbar.setAttribute('role', 'menubar');
    navbar.className = 'navbar';

    navbar.innerHTML = `
      <span class="navbar-toggler navbar-toggler-right" aria-controls="${menuId}" aria-expanded="false">
         <span>&#9776;</span>
       </span>
      <span class="navbar-brand">${menutitle}</span>
      <ul id="${menuId}" class="navbar-nav" aria-hidden="true"></ul>`;

    return navbar;
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
        query: event.target.value
      });
    });

    // input button
    const inputButton = document.createElement('div');
    inputButton.className = 'input-group-addon icon-search';
    inputButton.onclick = function() {
      this.parentElement.querySelector('#search-bar').focus()
    };

    // input group
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.appendChild(inputField);
    inputGroup.appendChild(inputButton);

    return inputGroup;
  }


  /**
   * Ensures the first menu item is selected 
   */
  resetMenuSelection(){
    this.menubar.querySelectorAll('[role="menuitem"]')
      .forEach((menuItem, index) => {
        menuItem.setAttribute('aria-selected', (index == 0).toString());
      });
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
