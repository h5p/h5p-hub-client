import initPanel from "../../node_modules/h5p-sdk/src/scripts/components/panel"
import initTabPanel from "../../node_modules/h5p-sdk/src/scripts/components/tab-panel"

export default class HubView {
  /**
   * @param {HubState} state
   */
  constructor(state){
    this.renderTabPanel(state);
    this.renderPanel(state);
  }

  /**
   * Creates the dom for the tab panel
   *
   * @param {HubState}
   */
  renderTabPanel(){

    /**
     * @type {HTMLElement}
     */
    this.tablist = document.createElement('ul');
    this.tablist.className += "tablist";
    this.tablist.setAttribute ('role', 'tablist');

    /**
     * @type {HTMLElement}
     */
     this.tabListWrapper = document.createElement('nav');
     this.tabListWrapper.appendChild(this.tablist);

    /**
     * @type {HTMLElement}
     */
    this.tabContainerElement = document.createElement('div');
    this.tabContainerElement.className += 'tabcontainer';
    this.tabContainerElement.appendChild(this.tabListWrapper);

    initTabPanel(this.tabContainerElement);
  }

  /**
   * Creates the dom for the panel
   *
   * @param {HubState} state
   */
  renderPanel(state) {
    /**
     * @type {HTMLElement}
     */
    this.titleElement = document.createElement('div');
    this.titleElement.className += "panel-header";
    this.titleElement.setAttribute('aria-expanded', 'true');
    this.titleElement.setAttribute('aria-controls', 'panel-body-1');
    this.titleElement.innerHTML = state.title;

    /**
     * @type {HTMLElement}
     */
    this.bodyElement = document.createElement('div');
    this.bodyElement.className += "panel-body";
    this.bodyElement.setAttribute('aria-hidden', 'false');
    this.bodyElement.id = 'panel-body-1';
    this.bodyElement.appendChild(this.tabContainerElement);

    /**
     * @type {HTMLElement}
     */
    this.rootElement = document.createElement('div');
    this.rootElement.className += 'h5p-hub panel';
    this.rootElement.appendChild(this.titleElement);
    this.rootElement.appendChild(this.bodyElement);

    initPanel(this.rootElement);
  }

  /**
   * Adds a tab
   *
   * @param {string} title
   * @param {HTMLElement} content
   */
  addTab(title, content) {
    let tab = document.createElement('li');
    tab.className += 'tab';
    tab.id ='tab1';
    tab.setAttribute('aria-controls', 'panel1');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('tabindex', '0');
    tab.innerHTML = title;

    let tabpanel = document.createElement('div');
    tabpanel.id ='panel1';
    tabpanel.className += 'tabpanel';
    tabpanel.setAttribute('aria-lablledby', 'tab1');
    tabpanel.setAttribute('role', 'tabpanel');
    tabpanel.setAttribute('tabindex', '0');
    tabpanel.appendChild(content);

    this.tablist.appendChild(tab);
    this.tabContainerElement.appendChild(tabpanel);
  }

  /**
   * Returns the root html element
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.rootElement;
  }
}
