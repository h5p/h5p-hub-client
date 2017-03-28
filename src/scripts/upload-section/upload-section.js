import Dictionary from '../utils/dictionary';
import { Eventful } from '../mixins/eventful';
import MessageView from "../message-view/message-view";

/**
 * @class
 * @mixes Eventful
 *
 * @fires Hub#upload
 */
export default class UploadSection {

  constructor(state, services) {
    Object.assign(this, Eventful());
    this.services = services;

    // Create the upload form
    const uploadForm = this.renderUploadForm();
    this.initUploadForm(uploadForm);

    // Create a wrapper to hold user messages
    this.messageWrapper = document.createElement('div');
    this.messageWrapper.className = 'message-wrapper';

    // Create the container and attach children
    const element = document.createElement('div');
    element.appendChild(this.messageWrapper);
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
    const uploadForm = document.createElement('div');
    uploadForm.innerHTML = `
      <div class="upload-wrapper">
        <div class="upload-form">
          <input class="upload-path" placeholder="${Dictionary.get("uploadPlaceholder")}" disabled/>
          <button class="button use-button">Use</button>
          <div class="input-wrapper">
            <input type="file" />
            <button class="button upload-button" tabindex="0">${Dictionary.get('uploadFileButtonLabel')}</button>
          </div>
        </div>
      </div>
    `;

    // Create the html for the upload instructions separately as it needs to be styled
    const uploadInstructions = document.createElement('div');
    uploadInstructions.className = 'upload-instructions';
    this.renderUploadInstructions(uploadInstructions, Dictionary.get('uploadInstructionsTitle'), Dictionary.get('uploadInstructionsContent'));
    uploadForm.querySelector('.upload-wrapper').appendChild(uploadInstructions);

    return uploadForm;
  }

  /**
   * Creates html for the upload instructions and appends them to a wrapping div.
   * Splits the input text into sentences and styles the first sentence differently.
   *
   * @param  {HTMLElement} container
   * @param  {string} text
   */
  renderUploadInstructions(container, title, content) {

    const header = document.createElement('p');
    header.className = 'upload-instruction-header';
    header.innerHTML = title;

    const description = document.createElement('p');
    description.className = 'upload-instruction-description';
    description.innerHTML = content;

    container.appendChild(header);
    container.appendChild(description);
  }

  /**
   * Attach upload form elements to the DOM and initializes
   * logic that binds them together
   *
   * @param  {HTMLElement} uploadForm
   */
  initUploadForm(uploadForm) {
    this.uploadInput =  uploadForm.querySelector('.upload-wrapper input[type="file"]');
    this.uploadButton = uploadForm.querySelector('.upload-button');
    this.uploadPath = uploadForm.querySelector('.upload-path');
    this.useButton =  uploadForm.querySelector('.use-button');

    this.initUploadInput();
    this.initUseButton();
    this.initUploadButton();
  }

  /**
   * Handle the main logic for the upload form.
   */
  initUploadInput() {
    const self = this;
    // Handle errors and update styles when a file is selected
    this.uploadInput.onchange = function () {
      if (this.value === '') {
        return;
      }
      // Clear messages
      self.removeAllChildren(self.rootElement.querySelector('.message-wrapper'));

      // Replace the placeholder text with the selected filepath
      self.uploadPath.value = this.value.replace('C:\\fakepath\\', '');

      // Update the upload button
      self.uploadButton.textContent = Dictionary.get('uploadFileButtonChangeLabel');

      // Check that it's a h5p file
      if (self.getFileExtension(this.value) !== 'h5p') {

        self.renderWrongExtensionMessage();

        // Hide the 'use' button for non-h5p files
        self.useButton.classList.remove('visible');
      }
      else {
        // Only show the 'use' button once a h5p file has been selected
        self.useButton.classList.add('visible');
      }
    };
  }

  /**
   * Add logic to pass data from the upload input to the plugin
   */
  initUseButton() {
    const self = this;

    // Send the file to the plugin
    this.useButton.addEventListener('click', () => {

      // Add the H5P file to a form, ready for transportation
      const data = new FormData();
      data.append('h5p', self.uploadInput.files[0]);

      // Upload content to the plugin
      self.services.uploadContent(data)
        .then(json => {
          // Fire the received data to any listeners
          self.trigger('upload', json);
        });
    });
  }

  /**
   * Initialize the upload button logic
   * to be handled by the upload input element
   */
  initUploadButton() {
    const self = this;
    // Reuse the upload input logic to upload a file
    this.uploadButton.onclick = function () {
      self.uploadInput.click();
    };

    // Allow users to upload a file by pressing enter or spacebar
    this.uploadButton.onkeydown = function (e) {
      if (e.which === 13 || e.which === 32) {
        self.uploadInput.click();
      }
    };
  }

  /**
   * Clear input of file upload form
   */
  clearUploadForm() {
    this.uploadInput.value = '';
    this.uploadPath.value = Dictionary.get("uploadPlaceholder");
    this.uploadButton.textContent = Dictionary.get('uploadFileButtonLabel');
    this.useButton.style.display = 'none';
  }

  /**
   * Helper function to get a file extension from a filename
   *
   * @param  {string} fileName
   * @return {string}
   */
  getFileExtension(fileName) {
    return fileName.replace(/^.*\./, '');
  }

  /**
   * Renders a message notifying the user that an incorrect filetype was uploaded
   */
  renderWrongExtensionMessage() {
    this.renderMessage({
      type: 'error',
      title: Dictionary.get('h5pFileWrongExtensionTitle'),
      content: Dictionary.get('h5pFileWrongExtensionContent')
    });
  }

  /**
   * Creates a message based on a configuration and prepends it to the message wrapper
   *
   * @param  {Object} config
   */
  renderMessage(config) {
    const messageView = new MessageView(config);
    this.prepend(this.messageWrapper, messageView.getElement());
  }

  /**
   * Helper function. Prepends an element to another
   */
  prepend(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  }

  /**
   * Helper function to remove all children from a node
   */
  removeAllChildren(node) {
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
  }

  /**
   * Gets the upload section wrapper
   *
   * @return {HTMLElement} Wrapper for upload section
   */
  getElement() {
    return this.rootElement;
  }
}
