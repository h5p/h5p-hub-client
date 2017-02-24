import ContetTypeDetailView from "./content-type-detail-view";

export default class ContentTypeDetail {
  constructor(state) {
    this.view = new ContetTypeDetailView(state);
  }

  getElement() {
    return this.view.getElement();
  }

}