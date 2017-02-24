import HubView from './hub-view';
import ContentBrowser from './content-browser/content-browser';
import UploadSection from './upload-section/upload-section';

/**
 * @typedef {object} HubState
 * @property {string} title
 * @property {string} sectionId
 * @property {boolean} expanded
 */
/**
 * @class
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
      sectionId: 'create-content'
    });

    // tab panel
    this.view.addTab({
      title: 'Create Content',
      id: 'create-content',
      content: this.contentBrowser.getElement(),
      selected: true
    });

    this.view.addTab({
      title: 'Upload',
      id: 'upload-section',
      content: this.uploadSection.getElement()
    });

    this.view.initTabPanel();
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
