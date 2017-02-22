import HubView from './hub-view';
import ContentBrowser from './content-browser/content-browser';

export default class Hub {
  constructor(state){
    this.state = state;

    // controllers
    this.contentBrowser = new ContentBrowser();

    // views
    this.view = new HubView({
      title: 'Title'
    });
  }

  getElement() {
    return this.view.getElement();
  }
}
