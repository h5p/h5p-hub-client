import { Eventful } from '../mixins/eventful';
import Dictionary from '../utils/dictionary';

/**
 * @class
 * @mixes Eventful
 *
 * @fires Hub#upload
 */
export default class UploadSection {

  constructor(services) {
    const self = this;
    Object.assign(this, Eventful());

    // Create the upload form
    const uploadForm = this.renderUploadForm();
    this.initUploadForm(uploadForm, services);

    // Create the container and attach children
    const element = document.createElement('div');
    element.appendChild(uploadForm);
    this.rootElement = element;
  }

  /**
   * Generates HTML for the upload form
   *
   * returns {HTMLElement}
   */
  renderUploadForm() {
    // Create the html
    // TODO get use button text from dictionary
    // useButton.textContent = Dictionary.get('useButtonLabel');
    const uploadForm = document.createElement('div');
    uploadForm.innerHTML = `
      <div class="upload-form">
        <input class="upload-path" disabled />
        <span class="button use-button">Use</span>
        <label class="upload">
          <input type="file" />
          <span class="button button-inverse-primary upload-button">Upload a file</span>
        </label>
      </div>
      <div class="upload-instructions">
        <h1>Select a file to upload and create H5P content from.</h1>
        <h3>You may start with examples from H5P.org</h3>
      </div>
    `;

    return uploadForm;
  }


  /**
   * Adds logic to bind the button to the form
   * and to bind the form to the plugin
   *
   * @param  {HTMLElement} uploadForm
   * @param  {HubServices} services   
   */
  initUploadForm(uploadForm, services) {
    const uploadInput =  uploadForm.querySelector('.upload input[type="file"]');
    const uploadButton = uploadForm.querySelector('.upload-button');
    const uploadPath = uploadForm.querySelector('.upload-path');
    const useButton =  uploadForm.querySelector('.use-button');

    uploadInput.onchange = function () {
      if (this.value !== '') {

        // Replace the placeholder text with the selected filepath
        uploadPath.value = this.value.replace('C:\\fakepath\\', '');

        // Update the upload button
        uploadButton.innerHTML = 'Change file';

        // Only show the 'use' button once a file has been selected
        useButton.style.display = 'inline-block';
      }
    };

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
  }

  getElement() {
    return this.rootElement;
  }
}
