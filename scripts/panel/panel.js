import PanelView from 'panel-view';

export default class Panel {
  constructor(config) {
    this.view = new PanelView(config);



  }

  get() {
    return this.view.panelEl;
  }
}