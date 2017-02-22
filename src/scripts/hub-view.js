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
    this.tabContainerElement = undefined;
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
    this.bodyElement.innerHTML = 'Body';
    //this.bodyElement.appendChild(this.tabContainerElement);

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
   * @param {HTMLElement} element
   */
  addTab(title, element) {
    // <li id="tab1" class="tab" aria-controls="panel1" aria-selected="true" role="tab" tabindex="0">Create Content</li>
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