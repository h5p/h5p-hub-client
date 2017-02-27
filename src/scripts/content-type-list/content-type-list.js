import ContetTypeListView from "./content-type-list-view";
import {Eventful} from '../mixins/eventful';

/**
 * @class
 * @mixes Eventful
 */
export default class ContentTypeList {
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // add the view
    this.view = new ContetTypeListView(state);
    this.propagate(['row-selected', 'select'], this.view);
  }

  hide() {
    this.view.hide();
  }

  show() {
    this.view.show();
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