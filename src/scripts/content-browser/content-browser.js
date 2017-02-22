export default class ContentBrowser {
  constructor(state){

  }

  getElement() {
    const res = document.createElement('div');
    res.innerHTML = "Hello world";
    return res;
  }
}
