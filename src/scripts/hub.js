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

    this.view.addTab('Create Content', this.contentBrowser.getElement());
    this.view.addTab('Upload', this.contentBrowser.getElement());

    const browserContainer = document.createElement('div');
  }

  getElement() {
    return this.view.getElement();
  }
}
