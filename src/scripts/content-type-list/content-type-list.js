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
    this.view.hideFromKeyboard();
  }

  /**
   * Show this element
   */
  show() {
    this.view.showToKeyboard();
  }

  /**
   * Focuses on the previously selected element
   */
  focus() {
    this.view.focus();
  }

  /**
   * Resets the content type list
   */
  resetList() {
    this.view.scrollToTop();
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
      for (let i = 0; i < this.currentContentTypes.length; i++) {
        if (this.currentContentTypes[i].machineName === contentType.machineName) {
          return true;
        }
      }
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
