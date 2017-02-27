import HubView from './hub-view';
import ContentTypeSection from './content-type-section/content-type-section';
import UploadSection from './upload-section/upload-section';
import HubServices from './hub-services';
import { Eventful } from './mixins/eventful';

/**
 * @typedef {object} HubState
 * @property {string} title
 * @property {string} sectionId
 * @property {boolean} expanded
 */
/**
 * @class
 * @mixes Eventful
 */
export default class Hub {
  /**
   * @param {HubState} state
   */
  constructor(state){
    this.state = state;

    // add event system
    Object.assign(this, Eventful());

    // controllers
    this.contentTypeSection = new ContentTypeSection();
    this.uploadSection = new UploadSection();

    // services
    this.services = new HubServices({
      rootUrl: '/test/mock/api'
    });

    // propagate controller events
    this.propagate(['select'], this.contentTypeSection);

    // handle events
    this.contentTypeSection.on('select', ({id}) => {
      this.view.closePanel();
      this.services.contentType(id)
        .then(({title}) => this.view.setTitle(title));
    });

    // views
    this.view = new HubView({
      sectionId: 'create-content'
    });

    // tab panel
    this.view.addTab({
      title: 'Create Content',
      id: 'create-content',
      content: this.contentTypeSection.getElement(),
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
