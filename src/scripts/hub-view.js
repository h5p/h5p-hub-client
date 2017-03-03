import initPanel from "components/panel"
import initTabPanel from "components/tab-panel"
import { curry } from "utils/functional";
import { attributeEquals, getAttribute, hasAttribute } from "utils/elements";
import { Eventful } from './mixins/eventful';

/**
 * Tab change event
 * @event HubView#tab-change
 * @type {SelectedElement}
 */
/**
 * Panel open or close event
 * @event HubView#panel-change
 * @type {SelectedElement}
 */
/**
 * @constant {string}
 */
const ATTRIBUTE_DATA_ID = 'data-id';
/**
 * Propagates row selection trough the event system
 *
 * @param {Eventful} eventful
 * @param {HTMLElement} element
 *
 * @function
 * @return {HTMLElement}
 */
const relayClickEventAs = curry(function(type, eventful, element) {
  element.addEventListener('click', event => {
    eventful.fire(type, {
      element: element,
      id: getAttribute(ATTRIBUTE_DATA_ID, element)
    }, false);

    event.preventDefault();
  });

  return element;
});

const isOpen = hasAttribute('open');

/**
 * @class
 * @mixes Eventful
 * @fires HubView#tab-change
 */
export default class HubView {
  /**
   * @param {HubState} state
   */
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    this.renderTabPanel(state);
    this.renderPanel(state);
  }

  /**
   * Closes the panel
   */
  closePanel() {
    this.title.setAttribute('aria-expanded', 'false')
  }

  /**
   * Sets the title
   *
   * @param {string} title
   */
  setTitle(title) {
    this.title.innerHTML = title;
  }

  /**
   * Creates the dom for the panel
   *
   * @param {string} title
   * @param {string} sectionId
   * @param {boolean} expanded
   */
  renderPanel({title = '', sectionId = 'create-content', expanded = false}) {
    /**
     * @type {HTMLElement}
     */
    this.title = document.createElement('div');
    this.title.className += "panel-header icon-hub-icon";
    this.title.setAttribute('aria-expanded', (!!expanded).toString());
    this.title.setAttribute('aria-controls', `panel-body-${sectionId}`);
    this.title.innerHTML = title;
    relayClickEventAs('panel-change', this, this.title);

    /**
     * @type {HTMLElement}
     */
    this.body = document.createElement('div');
    this.body.className += "panel-body";
    this.body.setAttribute('aria-hidden', (!expanded).toString());
    this.body.id = `panel-body-${sectionId}`;
    this.body.appendChild(this.tabContainerElement);

    /**
     * @type {HTMLElement}
     */
    this.panel = document.createElement('div');
    this.panel.className += `panel h5p-section-${sectionId}`;
    if(expanded){
      this.panel.setAttribute('open', '');
    }
    this.panel.appendChild(this.title);
    this.panel.appendChild(this.body);
    /**
     * @type {HTMLElement}
     */
    this.rootElement = document.createElement('div');
    this.rootElement.className += `h5p h5p-hub`;
    this.rootElement.appendChild(this.panel);
  }

  /**
   * Give the panel attribiutes from h5p-sdk, e.g. opening and closing
   * This is only called once no errors have occured in loading the hub 
   */
  initializePanel(){
    initPanel(this.rootElement);
  }

  /**
   * Set if panel is open, this is used for outer border color
   */
  togglePanelOpen() {
    if(isOpen(this.panel)) {
      this.panel.removeAttribute('open');
    }
    else {
      this.panel.setAttribute('open', '');
    }
  }

  /**
   * Creates the dom for the tab panel
   */
  renderTabPanel(state) {
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
    this.tabContainerElement.className += 'tab-panel';
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
    tab.setAttribute(ATTRIBUTE_DATA_ID, id);
    tab.setAttribute('role', 'tab');
    tab.innerHTML = title;
    relayClickEventAs('tab-change', this, tab);

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
   * @param {string} id
   */
  setSectionType({id}) {
    this.panel.className = `h5p-section-${id} panel`;
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
