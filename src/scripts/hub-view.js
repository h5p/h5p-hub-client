import initPanel from "../../node_modules/h5p-sdk/src/scripts/components/panel"
//import initTabPanel from "../../node_modules/h5p-sdk/src/scripts/components/tab-panel"

export default class HubView {
  constructor(state){
    this.renderTabPanel(state);
    this.renderPanel(state);
  }

  renderTabPanel(state){
    this.tabContainerElement = undefined;
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
   * @param {HTMLElement} element
   */
  addTab(title, element) {
    // <li id="tab1" class="tab" aria-controls="panel1" aria-selected="true" role="tab" tabindex="0">Create Content</li>
  }

  getElement() {
    return this.rootElement;
  }
}