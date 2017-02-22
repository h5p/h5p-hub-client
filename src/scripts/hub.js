import HubView from './hub-view';
import ContentBrowser from './content-browser/content-browser';
import initTabPanel from "../../node_modules/h5p-sdk/src/scripts/components/tab-panel"

/**
 * @typedef {object} HubState
 * @property {string} title
 */

export default class Hub {
  /**
   * @param {HubState} state
   */
  constructor(state){
    this.state = state;

    // controllers
    this.contentBrowser = new ContentBrowser();

    // views
    this.view = new HubView({
      title: 'Title'
    });

    const browserContainer = document.createElement('div');
    browserContainer.innerHTML = 'content';
    this.view.addTab('Create Content', browserContainer);

    this.createContentFilters();
  }

  creatInputField() {
    const inputField = document.createElement('input');
    inputField.className += 'hub-search';
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', "Search for Content Types")
    return inputField;
  }

  createInputButton(title) {
    const inputButton = document.createElement('div');
    inputButton.className += 'input-button';
    inputButton.innerHTML = title;
    return inputButton;
  }

  createInputGroup(buttonTitle) {
    const inputGroup = document.createElement('div');
    inputGroup.className += 'input-group rounded';
    inputGroup.appendChild(this.createInputField());
    inputGroup.appendChild(this.createInputButton(buttonTitle));
    return inputGroup;
  }

  createTab(config, index) {
    const tab = document.createElement('li');
    tab.className += 'tab';
    tab.id ='tab' + index;
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('tabindex', '0');
    tab.innerHTML = config;

    return tab;
  };

  createContentFilters() {

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

  }

  getElement() {
    return this.view.getElement();
  }
}
