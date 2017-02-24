import ContetTypeListView from "./content-type-list-view";

export default class ContentTypeList{
  constructor(state) {
    this.view = new ContetTypeListView(state);
  }

  /**
   *
   * @param {ContentType[]} contentTypes
   */
  update(contentTypes) {
    this.view.updateList(contentTypes);
  }

  getElement() {
    return this.view.getElement();
  }
}