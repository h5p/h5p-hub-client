import React from 'react';
import Dictionary from '../../utils/dictionary';
import '../../utils/fetch'

class UploadContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSelected: false, filePath: '', isUploading: false}
    this.showUploadInput = this.showUploadInput.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  showUploadInput() {
    this.refs.fileField.click();
  }

  upload(event) {
    const filePath = event.target.files[0].name

    //update upload button
    if (this.getFileExtension(filePath) !== 'h5p') {

      // TODO: renderWrongExtensionMessage();

      // Hide the 'use' button for non-h5p files
      this.setState({isSelected: false, filePath: ''});
    }
    else {
      this.uploadInput = event.target
      this.setState({isSelected: true, filePath, isUploading: false});

      event.stopPropagation();
      // Focus use button
      setTimeout(function() { this.refs.useButton.focus()}.bind(this), 10);
    }
  }

  uploadFile() {
    // Add the H5P file to a form, ready for transportation
    let apiRootUrl = '/drupal/h5peditor/c7eb04653791f/0/'; // TODO: Do not use hardcoded path
    let contentId = 0; // TODO: Do not use hardcoded contentId
    let data = new FormData();
    data.append('h5p', this.uploadInput.files[0]);
    data.append('contentId', this.contentId);

    this.setState({isSelected: true, filePath: '', isUploading: true})

    return fetch(`${apiRootUrl}library-upload`, {
      method: 'POST',
      credentials: 'include',
      body: data
    })
    .then(result => {
      // Validation failed
      if (!result.ok) {
        // TODO: Render fail message
        console.log('did not succeed');
        return;
      }

      this.setState({isSelected: false, isUploading: false})

      // TODO: Trigger upload
      console.log('Uploaded');

    })
    .catch(() => {
      // TODO: renderServerErrorMessage
      this.setState({isSelected: false, isUploading: false});
    });
  }

  getFileExtension(fileName) {
    return fileName.replace(/^.*\./, '');
  }

  // TODO: Add 'Use' to the dictionary
  render() {
    return (
      <div className="upload-wrapper">
        <div className="message-wrapper"></div>
        <div className={"upload-throbber " + (this.state.isUploading ? '  ' : 'hidden')}
          aria-label="{Dictionary.get('uploadingThrobber')}"
          tabIndex="-1">
        </div>
        <h1 className="upload-instruction-header">{Dictionary.get('uploadInstructionsTitle')}</h1>
        <div className="upload-form">
          <input className="upload-path"
            placeholder={(this.state.isSelected ? this.state.filePath : Dictionary.get('uploadPlaceholder'))}
            onClick={this.showUploadInput}
            tabIndex="-1"
            disabled={this.state.isUploading}
            readOnly
          />
          <button ref="useButton" type="button"
            className={"button use-button " + (this.state.isSelected ? 'visible' : ' ')}
            disabled={this.state.isUploading}
            onClick={this.uploadFile}>Use
          </button>
          <div className="input-wrapper">
            <input ref="fileField" type="file" accept=".h5p" aria-hidden="true"
              onChange={this.upload}
            />
            <button type="button"
              className="button upload-button"
              onClick={this.showUploadInput}
              disabled={this.state.isUploading}
              tabIndex="0">{Dictionary.get('uploadFileButtonLabel')}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadContent;
