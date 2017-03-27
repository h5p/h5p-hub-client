import ContetTypeListView from "./content-type-list-view";
import {Eventful} from '../mixins/eventful';

/**
 * Row selected event
 * @event ContentTypeList#row-selected
 * @type {SelectedElement}
 */
/**
 * Update content type list event
 * @event ContentTypeList#update-content-type-list
 * @type {SelectedElement}
 */
/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 * @fires ContentTypeList#update-content-type-list
 */
export default class ContentTypeList {
  constructor(state) {
    // add event system
    Object.assign(this, Eventful());

    // add the view
    this.view = new ContetTypeListView(state);
    this.propagate(['row-selected', 'select'], this.view);
    this.currentContentTypes = [];
  }

  /**
   * Hide this element
   */
  hide() {
    this.view.hide();
  }

  /**
   * Show this element
   */
  show() {
    this.view.show();
  }

  focus() {
    this.view.focus();
  }

  /**
   * Update the list with new content types
   *
   * @param {ContentType[]} contentTypes
   */
  update(contentTypes) {
    this.view.removeAllRows();
    contentTypes.forEach(this.view.addRow, this.view);
    this.trigger('update-content-type-list', {});
    this.currentContentTypes = contentTypes;
  }

  /**
   * Refreshes the currently displayed content types with updated data
   *
   * @param {ContentType[]} contentTypes New content type data
   */
  refreshContentTypes(contentTypes) {
    const displayedContentTypes = contentTypes.filter(contentType => {
      return this.currentContentTypes.find(currentContentType => {
        return currentContentType.machineName === contentType.machineName
      });
    });
    this.update(displayedContentTypes);
  }

  /**
   * Returns the views root element
   *
   * @return {HTMLElement}
   */
  getElement() {
    return this.view.getElement();
  }
}
