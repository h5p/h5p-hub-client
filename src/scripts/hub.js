export default class Hub {
  constructor(){
    console.log('im a hub');
  }

  getElement() {
    const res = document.createElement('div');
    res.innerHTML = "Hello world";
    return res;
  }
}