import { EventDispatcher } from '../mixins/event-dispatcher';

/**
 * @class
 * @mixes EventDispatcher
 *
 * @fires Hub#upload
 */
export default class UploadSection {

  constructor(state, services) {
    const self = this;
    Object.assign(this, EventDispatcher());

    // services
    this.services = services;

    // Input element for the H5P file
    const h5pUpload = document.createElement('input');
    h5pUpload.setAttribute('type', 'file');

    // Sends the H5P file to the plugin
    const useButton = document.createElement('button');
    useButton.textContent = 'Use';
    useButton.addEventListener('click', () => {

      // Add the H5P file to a form, ready for transportation
      const data = new FormData();
      data.append('h5p', h5pUpload.files[0]);

      // Upload content to the plugin
      this.services.uploadContent(data)
        .then(json => {
          // Fire the received data to any listeners
          self.trigger('upload', json);
        });
    });

    const element = document.createElement('div');
    element.appendChild(h5pUpload);
    element.appendChild(useButton);

    this.rootElement = element;
  }

  getElement() {
    return this.rootElement;
  }
}
