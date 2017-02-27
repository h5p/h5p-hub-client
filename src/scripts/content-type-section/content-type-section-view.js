import {Eventful} from '../mixins/eventful';

export default class ContentBrowserView {
  constructor(state) {
    this.state = state;

    // add event system
    Object.assign(this, Eventful());

    this.rootElement = document.createElement('div');
    this.rootElement.appendChild(this.renderMenuGroup());
  }

  /**
   * Adds a listener to the input field, and registers a callback with it
   *
   * @param {function} callback
   * @param {object} [scope]
   */
  onInputFieldKeyDown(callback, scope) {
    this.inputFieldElement.addEventListener('keyup', event => {
      callback.call(scope || this, event.target.value, this.inputFieldElement);
    });
  }

  renderMenuItem(title, index) {
    const element = document.createElement('li');
    element.setAttribute('role', 'menuitem');
    element.innerHTML = title;

    //TODO remove after demo
    if (index === 0) {
      element.setAttribute('aria-selected', 'true');
    }

    return element;
  };

  /*
  *   <nav>
   <ul role="menubar" class="h5p-menu">
   <li role="menuitem" aria-selected="true">My Content Types</li>
   <li role="menuitem">Newest</li>
   <li role="menuitem">Most Popular</li>
   <li role="menuitem">Recomended</li>
   </ul>
   </nav>
  * */

  renderMenu(state) {
    /**
     * @type {HTMLElement}
     */
    const menubar = document.createElement('ul');
    menubar.setAttribute('role', 'menubar');
    menubar.className = 'h5p-menu';

    let menuItems = ['My Content Types', 'Newest', 'Most Popular', 'Reccomended'];
    menuItems
      .map(this.renderMenuItem)
      .forEach(menubar.appendChild.bind(menubar));

    /**
     * @type {HTMLElement}
     */
    const menuItemListWrapper = document.createElement('nav');
    menuItemListWrapper.appendChild(menubar);

    /**
     * @type {HTMLElement}
     */
    const menuTitle = document.createElement('div');
    menuTitle.className = "menu-title";
    menuTitle.innerHTML = "Browse content types";

    /**
     * @type {HTMLElement}
     */
    const menu = document.createElement('div');
    menu.className = "menu";
    menu.appendChild(menuTitle);
    menu.appendChild(menuItemListWrapper);

    return menu;
  }

  renderMenuGroup() {
    const menuGroup = document.createElement('div');
    menuGroup.className = 'menu-group';
    const menu = this.renderMenu();
    const inputGroup = this.renderInputGroup();
    menuGroup.appendChild(menu);
    menuGroup.appendChild(inputGroup);
    return menuGroup;
  }

  renderInputField() {
    const inputField = document.createElement('input');
    inputField.className = 'hub-search shadow';
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', "Search for Content Types");
    this.inputFieldElement = inputField;
    return inputField;
  }

  renderInputButton(title) {
    const inputButton = document.createElement('div');
    inputButton.className = 'input-button icon-search';
    return inputButton;
  }

  renderInputGroup(buttonTitle) {
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group rounded shadow';
    inputGroup.appendChild(this.renderInputField());
    inputGroup.appendChild(this.renderInputButton(buttonTitle));

    const inputGroupWrapper = document.createElement('div');
    inputGroupWrapper.className = 'input-group-wrapper rounded';
    inputGroupWrapper.appendChild(inputGroup);

    return inputGroupWrapper;
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