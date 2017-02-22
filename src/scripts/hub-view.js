import initPanel from "../../node_modules/h5p-sdk/src/scripts/components/panel"

export default class HubView {
  constructor(){
    console.log('im a hub');
    
  }

  getElement() {
    const res = document.createElement('div');
    res.innerHTML = "Hello world";
    return res;
  }
}
