import HubView from './hub-view';
import ContentBrowser from './content-browser/content-browser';

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

    this.view.addTab('Create Content', '<h1>Create content!<h1>')
  }

  getElement() {
    return this.view.getElement();
  }
}
