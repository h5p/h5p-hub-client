import initTabPanel from "../../../node_modules/h5p-sdk/src/scripts/components/tab-panel"

export default class ContentBrowserView {
  constructor(state) {
    this.state = state;

    this.rootElement = document.createElement('div');
    this.rootElement.appendChild(this.renderMenuGroup());
  }

  renderMenuItem(title) {
    const tab = document.createElement('li');
    tab.setAttribute('tabindex', '0');
    tab.innerHTML = title;
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
    inputField.setAttribute('placeholder', "Search for Content Types")
    return inputField;
  }

  renderInputButton(title) {
    const inputButton = document.createElement('div');
    inputButton.className = 'input-button';
    inputButton.innerHTML = "Search";
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
   *
   * @param {ContentType[]} contentTypes
   */
  updateList(contentTypes) {
    if(this.listElement){
      this.listElement.remove();
    }

    this.listElement = this.renderContentTypeList(contentTypes);
    this.rootElement.appendChild(this.listElement);
  }

  /**
   *
   * @param {ContentType[]} contentTypes
   */
  renderContentTypeList(contentTypes) {
    const listElement = document.createElement('ul');
    listElement.className = 'content-type-list';

    contentTypes
      .map(this.renderContentTypeRow)
      .forEach(listElement.appendChild.bind(listElement));

    return listElement;
  }

  /**
   * Takes a Content Type configuration and creates a row dom
   *
   * @param {ContentType} contentType
   *
   * @return {HTMLElement}
   */
  renderContentTypeRow(contentType) {
    // image
    const image = document.createElement('img');
    image.setAttribute('src', contentType.icon);

    // button
    const button = document.createElement('span');
    button.className = "button";
    button.innerHTML = "Use";

    // title
    const title = document.createElement('div');
    title.className = 'content-type-list-title';
    title.innerHTML = contentType.title;

    // description
    const description = document.createElement('div');
    description.className = 'content-type-list-description';
    description.innerHTML = contentType.shortDescription;

    // list item
    const row = document.createElement('li');
    row.id = `content-type-${contentType.id}`;
    row.setAttribute('data-id', contentType.id);
    row.appendChild(image);
    row.appendChild(button);
    row.appendChild(title);
    row.appendChild(description);

    return row;
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
