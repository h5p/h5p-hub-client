import initPanel from "../../node_modules/h5p-sdk/src/scripts/components/panel"
//import initTabPanel from "../../node_modules/h5p-sdk/src/scripts/components/tab-panel"

export default class HubView {
  constructor(state){
    this.renderTabPanel(state);
    this.renderPanel(state);
  }

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

  renderPanel(state) {
    /**
     * @type {HTMLElement}
     */
    this.titleElement = document.createElement('div');
    this.titleElement.className += "panel-title";
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
    this.rootElement.className += 'panel';
    this.rootElement.setAttribute('aria-expanded', 'true');
    this.rootElement.setAttribute('aria-controls', 'panel-body-1');
    this.rootElement.appendChild(this.titleElement);
    this.rootElement.appendChild(this.bodyElement);

    //initPanel(this.rootElement);
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
    this.tabcontainer.appendChild(tabpanel);
  }

  getElement() {
    return this.rootElement;
  }
}
