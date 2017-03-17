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
    // TODO create variables for links to h5p.org so they can be changed easily
    // useButton.textContent = Dictionary.get('useButtonLabel');
    const uploadForm = document.createElement('div');
    uploadForm.innerHTML = `
      <div class="upload-wrapper">
        <div class="upload-form">
          <input class="upload-path" placeholder="No file chosen" disabled />
          <span class="button use-button">Use</span>
          <label class="upload">
            <input type="file" />
            <span class="button upload-button">Upload a file</span>
          </label>
        </div>
        <div class="upload-instructions">
          <h2>Select a file to upload and create H5P content from.</h2>
          <h3>You may start with examples from <a href="https://h5p.org/content-types-and-applications">H5P.org</a>.</h3>
        </div>
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

    uploadForm.onclick = function () {
      uploadInput.click();
    }

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
