import initTabPanel from "../../../node_modules/h5p-sdk/src/scripts/components/tab-panel"

export default class ContentBrowserView {
  constructor(state) {
    this.state = state;

    this.rootElement = document.createElement('div');
    this.rootElement.appendChild(this.renderContentTypeFilters());
    this.rootElement.appendChild(this.renderInputGroup());
  }

  renderContentTypeFilters(state) {
    let tabs = ['My Content Types', 'Newest', 'Most Popular', 'Reccomended'];

    /**
     * @type {HTMLElement}
     */
    const tablist = document.createElement('ul');
    tablist.className += "tablist";
    tablist.setAttribute ('role', 'tablist');

    tabs
      .map(this.createTab)
      .forEach(tablist.appendChild.bind(tablist));


    /**
     * @type {HTMLElement}
     */
     this.tabListWrapper = document.createElement('nav');
     this.tabListWrapper.appendChild(tablist);

    /**
     * @type {HTMLElement}
     */
    this.tabContainerElement = document.createElement('div');
    this.tabContainerElement.className += 'tabcontainer';
    this.tabContainerElement.appendChild(this.tabListWrapper);

    initTabPanel(this.tabContainerElement);

    return this.tabContainerElement;
  }


  renderInputField() {
    const inputField = document.createElement('input');
    inputField.className = 'hub-search';
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
    inputGroup.className = 'input-group rounded';
    inputGroup.appendChild(this.renderInputField());
    inputGroup.appendChild(this.renderInputButton(buttonTitle));
    return inputGroup;
  }

  createTab(config, index) {
    const tab = document.createElement('li');
    tab.className = 'tab';
    tab.id ='tab' + index;
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('tabindex', '0');
    tab.innerHTML = config;

    return tab;
  };


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
