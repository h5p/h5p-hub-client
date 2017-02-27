import initPanel from "../../node_modules/h5p-sdk/src/scripts/components/panel"
import initTabPanel from "../../node_modules/h5p-sdk/src/scripts/components/tab-panel"

export default class HubView {
  /**
   * @param {HubState} state
   */
  constructor(state) {
    this.renderTabPanel(state);
    this.renderPanel(state);
  }

  /**
   * Closes the panel
   */
  closePanel() {
    this.titleElement.setAttribute('aria-expanded', 'false')
  }

  /**
   * Sets the title
   *
   * @param {string} title
   */
  setTitle(title) {
    this.titleElement.innerHTML = title;
  }

  /**
   * Creates the dom for the panel
   *
   * @param {string} title
   * @param {string} sectionId
   * @param {boolean} expanded
   */
  renderPanel({title, sectionId, expanded = false}) {
    /**
     * @type {HTMLElement}
     */
    this.titleElement = document.createElement('div');
    this.titleElement.className += "panel-header icon-hub-icon";
    this.titleElement.setAttribute('aria-expanded', expanded.toString());
    this.titleElement.setAttribute('aria-controls', `panel-body-${sectionId}`);
    this.titleElement.innerHTML = title || '';

    /**
     * @type {HTMLElement}
     */
    this.bodyElement = document.createElement('div');
    this.bodyElement.className += "panel-body";
    this.bodyElement.setAttribute('aria-hidden', (!expanded).toString());
    this.bodyElement.id = `panel-body-${sectionId}`;
    this.bodyElement.appendChild(this.tabContainerElement);
    if(!expanded){
      this.bodyElement.style.height = "0";
    }

    /**
     * @type {HTMLElement}
     */
    this.rootElement = document.createElement('div');
    this.rootElement.className += `h5p-hub h5p-section-${sectionId} panel`;
    this.rootElement.appendChild(this.titleElement);
    this.rootElement.appendChild(this.bodyElement);

    initPanel(this.rootElement);
  }

  /**
   * Creates the dom for the tab panel
   */
  renderTabPanel() {
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
  }

  /**
   * Adds a tab
   *
   * @param {string} title
   * @param {string} id
   * @param {HTMLElement} content
   * @param {boolean} selected
   */
  addTab({title, id, content, selected = false}) {
    const tabId = `tab-${id}`;
    const tabPanelId = `tab-panel-${id}`;

    const tab = document.createElement('li');
    tab.className += 'tab';
    tab.id = tabId;
    tab.setAttribute('aria-controls', tabPanelId);
    tab.setAttribute('aria-selected', selected.toString());
    tab.setAttribute('role', 'tab');
    tab.innerHTML = title;

    const tabPanel = document.createElement('div');
    tabPanel.id = tabPanelId;
    tabPanel.className += 'tabpanel';
    tabPanel.setAttribute('aria-lablledby', tabId);
    tabPanel.setAttribute('aria-hidden', (!selected).toString());
    tabPanel.setAttribute('role', 'tabpanel');
    tabPanel.appendChild(content);

    this.tablist.appendChild(tab);
    this.tabContainerElement.appendChild(tabPanel);
  }

  initTabPanel() {
    initTabPanel(this.tabContainerElement);
  }

  /**
   * Sets the section
   *
   * @param {string} sectionId
   */
  setSection(sectionId) {
    this.rootElement.className = `h5p-hub h5p-section-${sectionId} panel`;
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
