export default class ContentTypeDetailView {
  constructor(state) {
    this.state = state;
    this.render();
  }

  render() {
    this.rootElement = document.createElement('div');
    this.rootElement.innerHTML = "detailview";
  }

  getElement() {
    return this.rootElement;
  }
}