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
    this.renderUploadInstructions(uploadInstructions, Dictionary.get('uploadInstructions'));
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
  renderUploadInstructions(container, text) {
    const textElements = text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g); // match on sentences

    const header = document.createElement('p');
    header.className = 'upload-instruction-header';
    header.innerHTML = textElements.shift(); // grab the first sentence

    const description = document.createElement('p');
    description.className = 'upload-instruction-description';
    description.innerHTML = textElements.join(''); // join the rest

    container.appendChild(header);
    container.appendChild(description);
  }

  /**
   * Adds logic to bind the buttons to the form
   * and to bind the form to the plugin
   *
   * @param  {HTMLElement} uploadForm
   */
  initUploadForm(uploadForm) {
    const self = this;
    const uploadInput =  uploadForm.querySelector('.upload-wrapper input[type="file"]');
    const uploadButton = uploadForm.querySelector('.upload-button');
    const uploadPath = uploadForm.querySelector('.upload-path');
    const useButton =  uploadForm.querySelector('.use-button');

    // Handle errors and update styles when a file is selected
    uploadInput.onchange = function () {

      if (this.value === '') {
        return;
      }

      // Reset styles
      self.clearUserMessages();

      // Replace the placeholder text with the selected filepath
      uploadPath.value = this.value.replace('C:\\fakepath\\', '');

      // Update the upload button
      uploadButton.textContent = Dictionary.get('uploadFileButtonChangeLabel');

      // Check that it's a h5p file
      const fileExtension = self.getFileExtension(this.value);
      if (fileExtension !== 'h5p') {
        self.renderMessage({
          type: 'error',
          title: Dictionary.get('h5pFileWrongExtensionTitle'),
          content: Dictionary.get('h5pFileWrongExtensionContent')
        });

        // Hide the 'use' button for non-h5p files
        useButton.style.display = 'none';
      }
      else {
        // Only show the 'use' button once a h5p file has been selected
        useButton.style.display = 'inline-block';
      }
    };

    // Send the file to the plugin
    useButton.addEventListener('click', () => {

      // Add the H5P file to a form, ready for transportation
      const data = new FormData();
      data.append('h5p', uploadInput.files[0]);

      // Upload content to the plugin
      self.services.uploadContent(data)
        .then(json => {
          // Fire the received data to any listeners
          self.trigger('upload', json);
        });
    });

    // Allow users to upload a file by clicking on path field
    uploadPath.onclick = function () {
      uploadInput.click();
    };

    // Allow users to upload a file by pressing enter or spacebar
    uploadPath.onkeydown = function (e) {
      if (e.which === 13 || e.which === 32) {
        uploadInput.click();
      }
    };

    // Reuse the upload input logic to upload a file
    uploadButton.onclick = function () {
      uploadInput.click();
    };

    // Allow users to upload a file by pressing enter or spacebar
    uploadButton.onkeydown = function (e) {
      if (e.which === 13 || e.which === 32) {
        uploadInput.click();
      }
    };

    this.uploadInput = uploadInput;
    this.uploadPath = uploadPath;
    this.uploadButton = uploadButton;
    this.useButton = useButton;
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
   * Empties the message wrapper
   */
  clearUserMessages() {
    this.removeAllChildren(this.rootElement.querySelector('.message-wrapper'));
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

  getElement() {
    return this.rootElement;
  }
}
