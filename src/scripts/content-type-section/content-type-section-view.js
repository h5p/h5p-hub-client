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
    const menu = this.createMenuElement();
    const inputGroup = this.createInputGroupElement();

    // menu group
    const menuGroup = document.createElement('div');
    menuGroup.className = 'menu-group';
    menuGroup.appendChild(menu);
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
    if(this.menuBarElement.childElementCount < 1) {
      element.setAttribute('aria-selected', 'true');
    }

    // add to menu bar
    this.menuBarElement.appendChild(element);

    return element;
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
    inputField.id = "search-bar";
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
   * Returns the root element of the content browser
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}
