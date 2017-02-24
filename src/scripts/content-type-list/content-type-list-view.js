export default class ContentTypeListView {
  constructor(state) {
    this.state = state;
    this.rootElement = document.createElement('div');
  }

  /**
   *
   * @param {ContentType[]} contentTypes
   */
  updateList(contentTypes) {
    if(this.listElement){
      this.listElement.remove();
    }

    this.listElement = this.renderContentTypeList(contentTypes);
    this.rootElement.appendChild(this.listElement);
  }

  /**
   *
   * @param {ContentType[]} contentTypes
   */
  renderContentTypeList(contentTypes) {
    const listElement = document.createElement('ul');
    listElement.className = 'content-type-list';

    contentTypes
      .map(this.renderContentTypeRow)
      .forEach(listElement.appendChild.bind(listElement));

    return listElement;
  }

  /**
   * Takes a Content Type configuration and creates a row dom
   *
   * @param {ContentType} contentType
   *
   * @return {HTMLElement}
   */
  renderContentTypeRow(contentType) {
    // image
    const image = document.createElement('img');
    image.setAttribute('src', contentType.icon);

    // button
    const button = document.createElement('span');
    button.className = "button";
    button.innerHTML = "Use";

    // title
    const title = document.createElement('div');
    title.className = 'content-type-list-title';
    title.innerHTML = contentType.title;

    // description
    const description = document.createElement('div');
    description.className = 'content-type-list-description';
    description.innerHTML = contentType.shortDescription;

    // list item
    const row = document.createElement('li');
    row.id = `content-type-${contentType.id}`;
    row.setAttribute('data-id', contentType.id);
    row.appendChild(image);
    row.appendChild(button);
    row.appendChild(title);
    row.appendChild(description);

    return row;
  }

  getElement() {
    return this.rootElement;
  }
}