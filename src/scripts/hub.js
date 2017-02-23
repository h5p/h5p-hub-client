import HubView from './hub-view';
import ContentBrowser from './content-browser/content-browser';
import UploadSection from './upload-section/upload-section';

/**
 * @typedef {object} HubState
 * @property {string} title
 * @property {string} sectionId
 * @property {boolean} expanded
 */

export default class Hub {
  /**
   * @param {HubState} state
   */
  constructor(state){
    this.state = state;

    // controllers
    this.contentBrowser = new ContentBrowser();
    this.uploadSection = new UploadSection();

    // views
    this.view = new HubView({
      title: 'Title',
      sectionId: 'create-content'
    });

    this.view.addTab('Create Content', this.contentBrowser.getElement());
    this.view.addTab('Upload', this.uploadSection.getElement());
  }

  /**
   * Returns the root element in the view
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.view.getElement();
  }
}
