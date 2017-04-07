import Dictionary from '../utils/dictionary';
import { Eventful } from '../mixins/eventful';
import MessageView from "../message-view/message-view";
import { hide, show } from "utils/elements";

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
    const uploadForm = document.createElement('div');
    uploadForm.innerHTML = `
      <div class="upload-wrapper">
        <div class="message-wrapper"></div>
        <div class="upload-throbber hidden" aria-label="${Dictionary.get('uploadingThrobber')}" tabindex="-1"></div>
        <h1 class="upload-instruction-header">${Dictionary.get('uploadInstructionsTitle')}</h1>
        <div class="upload-form">
          <input class="upload-path" placeholder="${Dictionary.get("uploadPlaceholder")}" tabindex="-1" readonly/>
          <button type="button" class="button use-button">Use</button>
          <div class="input-wrapper">
            <input type="file" accept=".h5p" aria-hidden="true"/>
            <button type="button" class="button upload-button" tabindex="0">${Dictionary.get('uploadFileButtonLabel')}</button>
          </div>
        </div>
        <p class="upload-instruction-description">${Dictionary.get('uploadInstructionsContent')}</p>
      </div>
    `;
    return uploadForm;
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
    this.uploadThrobber = uploadForm.querySelector('.upload-throbber');
    this.messageWrapper = uploadForm.querySelector('.message-wrapper');

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
    this.uploadInput.onchange = function (event) {
      if (this.value.length === 0) {
        self.clearUploadForm();
        return;
      }
      // Clear messages
      self.clearMessages();

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
        self.uploadPath.removeAttribute('placeholder');

        // Focus use button
        event.stopPropagation();
        self.useButton.focus();
      }
    };

    this.uploadPath.addEventListener('click', () => {
      self.uploadInput.click();
    });
  }

  /**
   * Add logic to pass data from the upload input to the plugin
   */
  initUseButton() {
    const self = this;

    // Send the file to the plugin
    this.useButton.addEventListener('click', () => {
      self.uploadFile();
    });

    // Allow users to upload a file by pressing enter or spacebar
    this.useButton.onkeydown = function (e) {
      if (e.which === 13 || e.which === 32) {
        self.uploadFile();
      }
    };
  }

  /**
   * Uploads chosen file input
   */
  uploadFile() {
    this.setIsUploading(true);
    const self = this;

    // Add the H5P file to a form, ready for transportation
    const data = new FormData();
    data.append('h5p', self.uploadInput.files[0]);

    // Upload content to the plugin
    self.services.uploadContent(data)
      .then(json => {
        this.setIsUploading(false);

        // Validation failed
        if (!json.success) {
          // Render fail message
          self.renderUploadValidationFailedMessage();
          self.clearUploadForm();
          return;
        }

        // Fire the received data to any listeners
        self.trigger('upload', json);
      })
      .catch(() => {
        // Server side error message
        self.renderServerErrorMessage();
        self.clearUploadForm();
        self.setIsUploading(false);
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
    this.useButton.classList.remove('visible');
  }

  /**
   * Clears all messages
   */
  clearMessages() {
    this.removeAllChildren(this.rootElement.querySelector('.message-wrapper'));
  }

  /**
   * Adds throbber to upload view
   *
   * @param {boolean} enable If true the throbber will be shown
   */
  setIsUploading(enable) {
    if (enable) {
      this.uploadThrobber.classList.remove('hidden');

      // disable buttons
      this.useButton.setAttribute('disabled', 'true');
      this.uploadButton.setAttribute('disabled', 'true');
      this.uploadPath.setAttribute('disabled', 'true');
      this.uploadThrobber.focus();
    }
    else {
      this.uploadThrobber.classList.add('hidden');

      // Enable buttons
      this.useButton.removeAttribute('disabled');
      this.uploadButton.removeAttribute('disabled');
      this.uploadPath.removeAttribute('disabled');
    }
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
   * Renders a message notifying the user that the uploaded file failed to validate
   */
  renderUploadValidationFailedMessage() {
    this.renderMessage({
      type: 'error',
      title: Dictionary.get('h5pFileValidationFailedTitle'),
      content: Dictionary.get('h5pFileValidationFailedContent')
    });
  }

  /**
   * Renders a message notifying the user that the server responded with an error when attempting
   * to upload the H5P file.
   */
  renderServerErrorMessage() {
    this.renderMessage({
      type: 'error',
      title: Dictionary.get('h5pFileUploadServerErrorTitle'),
      content: Dictionary.get('h5pFileUploadServerErrorContent')
    })
  }

  /**
   * Creates a message based on a configuration and prepends it to the message wrapper
   *
   * @param  {Object} config
   */
  renderMessage(config) {
    // Clean any previous message
    if (this.messageView && this.messageView.getElement().parentNode) {
      this.messageView.getElement().parentNode.removeChild(this.messageView.getElement());
    }
    this.messageView = new MessageView(config);
    this.prepend(this.messageWrapper, this.messageView.getElement());
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
