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
    // TODO create variables for links to h5p.org so they can be changed easily
    const uploadForm = document.createElement('div');
    uploadForm.innerHTML = `
      <div class="upload-wrapper">
        <div class="upload-form">
          <input readonly class="upload-path" placeholder="${Dictionary.get("uploadPlaceholder")}"/>
          <button class="button use-button">Use</button>
          <div class="input-wrapper">
            <input type="file" />
            <button class="button upload-button" tabindex="0">${Dictionary.get('uploadFileButtonLabel')}</button>
          </div>
        </div>
        <div class="upload-instructions">${Dictionary.get('uploadInstructions')}</div>
      </div>
    `;

    return uploadForm;
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
    let firstInput = uploadPath;
    //const lastInput = uploadForm.querySelector('a');

    // Handle errors and update styles when a file is selected
    uploadInput.onchange = function () {

      if (this.value == '') {
        return;
      }

      // Reset styles
      self.clearUserMessages();
      uploadPath.value = '';

      // Replace the placeholder text with the selected filepath
      uploadPath.value = this.value.replace('C:\\fakepath\\', '');

      // Update the upload button
      uploadButton.innerHTML = 'Change file';

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
    }

    // Allow users to upload a file by pressing enter or spacebar
    uploadPath.onkeydown = function (e) {
      if (e.which === 13 || e.which === 32) {
        uploadInput.click();
      }
    }

    // Reuse the upload input logic to upload a file
    uploadButton.onclick = function () {
      uploadInput.click();
    }

    // Allow users to upload a file by pressing enter or spacebar
    uploadButton.onkeydown = function (e) {
      if (e.which === 13 || e.which === 32) {
        uploadInput.click();
      }
    }

    // Cycle tabbing back to the first input
    // TODO - why do we need this?
    /*lastInput.onkeydown = function (e) {
      if ((e.which === 9 && !e.shiftKey)) {
         e.preventDefault();
         firstInput.focus();
      }
    }*/
  }

  /*
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
    var messageView = new MessageView(config);
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
