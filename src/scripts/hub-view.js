import initPanel from "components/panel"
import initTabPanel from "components/tab-panel"
import { curry } from "utils/functional";
import { attributeEquals, getAttribute, hasAttribute, show, toggleClass } from "utils/elements";
import { Eventful } from './mixins/eventful';
import { relayClickEventAs } from './utils/events';
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

    /**
     * @type {HTMLElement}
     */
    this.rootElement = this.createPanel(state);

    // select dynamic elements
    this.panel = this.rootElement.querySelector('.panel');
    this.toggler = this.rootElement.querySelector('[aria-expanded][aria-controls]');
    this.selectedName = this.rootElement.querySelector('.h5p-hub-selected');
    this.tablist = this.rootElement.querySelector('[role="tablist"]');
    this.tabContainerElement = this.rootElement.querySelector('.tab-panel');

    // initiates panel
    initPanel(this.panel);

    // relay events
    relayClickEventAs('panel-change', this, this.toggler);
  }

  /**
   * Closes the panel
   */
  closePanel() {
    this.panel.classList.remove('open');
  }

  /**
   * Sets the title
   *
   * @param {string} title
   */
  setTitle(title) {
    this.selectedName.innerText = title;
  }

  /**
   * Creates the dom for the panel
   *
   * @param {string} title
   * @param {string} sectionId
   * @param {boolean} expanded
   */
  createPanel({title = '', sectionId = 'content-types', expanded = false}) {
    const labels = {
      h5pHub: 'H5P Hub.'
    };
    const element = document.createElement('section');
    element.className += `h5p-hub h5p-sdk`;
    const panelClasses = `panel${expanded ? ' open' : ''}`;

    element.innerHTML = `
      <div class="${panelClasses}">
        <div class="h5p-hub-client-drop-down" aria-level="1" role="heading">
          <span role="button" class="icon-hub-icon" aria-expanded="${expanded}" aria-controls="panel-body-${sectionId}">
          <span class="h5p-hub-description">${labels.h5pHub}</span>
          <span class="h5p-hub-selected"></span>
        </span>
        </div>
        <div id="panel-body-${sectionId}" role="region" class="${expanded ? '' : 'hidden'}">
          <div class="tab-panel">
            <nav>
              <ul role="tablist"></ul>
            </nav>
          </div>
        </div>
      </div>`;

    return element;
  }

  /**
   * Set if panel is open, this is used for outer border color
   *
   * @return {boolean} if the panel has the open class now
   */
  togglePanelOpen() {
    const panel = this.panel;
    const isOpen = panel.classList.contains('open');

    if(isOpen) {
      panel.classList.remove('open');
    }
    else {
      panel.classList.add('open');
    }

    return !isOpen;
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
    tab.innerText = title;
    relayClickEventAs('tab-change', this, tab);

    const tabPanel = document.createElement('div');
    tabPanel.id = tabPanelId;
    tabPanel.className += 'tabpanel';
    tabPanel.setAttribute('aria-labelledby', tabId);
    tabPanel.setAttribute('role', 'tabpanel');
    tabPanel.appendChild(content);
    toggleClass('hidden', !selected, tabPanel);

    this.tablist.appendChild(tab);
    this.tabContainerElement.appendChild(tabPanel);

    // fires the tab-change event when selected is created
    if(selected) {
      this.trigger('tab-change', {
        element: tab,
        id: id
      });
    }
  }

  /**
   * Appends a child element to the root node
   * @param {Element} element
   *
   * @return {Node}
   */
  appendChild(element) {
    return this.rootElement.appendChild(element);
  }

  /*
   * Initialize the tab panel from the controller
   */
  initTabPanel() {
    initTabPanel(this.tabContainerElement);
  }

  /**
   * Sets the section
   *
   * @param {string} id
   */
  setSectionType({id}) {
    this.panel.className = 'panel'; // TODO reset the panel classes in a less brittle way
    this.panel.classList.add('h5p-section-' + id, 'panel');
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
