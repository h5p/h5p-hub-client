import initPanel from "../../node_modules/h5p-sdk/src/scripts/components/panel"
//import initTabPanel from "../../node_modules/h5p-sdk/src/scripts/components/tab-panel"

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
   * @param {HubState} state
   */
  renderTabPanel(state){

    /**
     * @type {HTMLElement}
     */
    this.tablist = document.createElement('ul');
    this.tablist.className += "tablist";
    this.tablist.setAttribute ('role', 'tablist');

    /**
     * @type {HTMLElement}
     */
    this.tabContainerElement = document.createElement('div');
    this.tabContainerElement.appendChild(this.tablist);
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
    tab.innerHTML = title;

    let tabpanel = document.createElement('div');
    tabpanel.id ='tab1';
    tabpanel.className += 'tab';
    tabpanel.setAttribute('aria-controls', 'panel1');
    tabpanel.setAttribute('aria-selected', 'true');
    tabpanel.setAttribute('role', 'tab');
    tabpanel.setAttribute('tabindex', '0');
    tabpanel.innerHTML = content;

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
