export default class ContentBrowserView {
  constructor(state) {
    this.state = state;

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
    const tab = document.createElement('li');
    tab.setAttribute('tabindex', '0');
    tab.innerHTML = title;

    //TODO remove after demo
    if (index === 0) {
      tab.setAttribute('aria-selected', 'true');
    }
    return tab;
  };

  renderMenu(state) {
    /**
     * @type {HTMLElement}
     */
    const menuItemList = document.createElement('ul');
    let menuItems = ['My Content Types', 'Newest', 'Most Popular', 'Reccomended'];
    menuItems
      .map(this.renderMenuItem)
      .forEach(menuItemList.appendChild.bind(menuItemList));

    /**
     * @type {HTMLElement}
     */
    const menuItemListWrapper = document.createElement('nav');
    menuItemListWrapper.appendChild(menuItemList);

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