import React from 'react';
import PropTypes from 'prop-types';
import './UploadContent.scss';
import '../../../utils/fetch';
import Dictionary from '../../../utils/dictionary';
import Message from '../../Message/Message';

class UploadContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      filePath: '',
      isUploading: false,
      validationError: false,
      serverError: false,
    };
    this.showUploadInput = this.showUploadInput.bind(this);
    this.select = this.select.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  showUploadInput() {
    this.fileField.click();
  }

  select(event) {
    this.setState({error: false});

    if (event.target.files.length === 0) {
      return; // Do nothing if the file has not been changed
    }

    const filePath = event.target.files[0].name;

    if (this.getFileExtension(filePath) !== 'h5p') {
      this.setState({
        isSelected: false,
        filePath: '',
        validationError: true,
      });
    }
    else {
      this.uploadInput = event.target;
      this.setState({isSelected: true, filePath, isUploading: false});

      event.stopPropagation();

      // Focus use button
      setTimeout(() => this.useButton.focus(), 10);
    }
  }

  uploadFile() {
    // Add the H5P file to a form, ready for transportation
    let data = new FormData();
    data.append('h5p', this.uploadInput.files[0]);
    data.append('contentId', this.props.contentId);

    this.setState({isSelected: true, isUploading: true});

    return fetch(this.props.getAjaxUrl('library-upload'), {
      method: 'POST',
      credentials: 'include',
      body: data
    }).then(result => result.json())
      .then(json => {
        // Validation failed
        if (json.success !== true) {
          this.setState({
            validationError: true,
          });
          return;
        }

        this.setState({isSelected: false, isUploading: false});
        this.props.onUpload(json.data);
      })
      .catch(() => {
        this.setState({
          isSelected: false,
          isUploading: false,
          serverError: true,
        });
      });
  }

  getFileExtension(fileName) {
    return fileName.replace(/^.*\./, '');
  }

  // TODO: Add 'Use' to the dictionary
  render() {
    return (
      <div className="upload-wrapper">
        {this.state.validationError &&
          <Message
            type={'error'}
            dismissable={false}
            title={Dictionary.get('h5pFileWrongExtensionTitle')}
            message={Dictionary.get('h5pFileWrongExtensionContent')}
          />
        }
        {this.state.serverError &&
          <Message
            type={'error'}
            dismissable={false}
            title={Dictionary.get('h5pFileUploadServerErrorTitle')}
            message={Dictionary.get('h5pFileUploadServerErrorContent')}
          />
        }
        <div className={"upload-throbber " + (this.state.isUploading ? ' ' : 'hidden')}
          aria-label="{Dictionary.get('uploadingThrobber')}"/>
        <h1 className="upload-instruction-header">{Dictionary.get('uploadInstructionsTitle')}</h1>
        <div className="upload-form">
          <input className="upload-path"
            placeholder={((this.state.isSelected || this.state.isUploading) ? this.state.filePath : Dictionary.get('uploadPlaceholder'))}
            onClick={this.showUploadInput}
            tabIndex="-1"
            disabled={this.state.isUploading}
            readOnly
          />
          <button type="button"
            ref={(button) => {this.useButton = button; }}
            className={"button use-button " + (this.state.isSelected ? 'visible' : ' ')}
            disabled={this.state.isUploading}
            onClick={this.uploadFile}>Use
          </button>
          <div className="input-wrapper">
            <input type="file" accept=".h5p" aria-hidden="true"
              ref={(input) => {this.fileField = input; }}
              onChange={this.select}
            />
            <button type="button"
              className="button upload-button"
              onClick={this.showUploadInput}
              disabled={this.state.isUploading}
              tabIndex="0">{this.isSelected ? Dictionary.get('uploadFileButtonLabel') : Dictionary.get('uploadFileButtonChangeLabel')}
            </button>
          </div>
        </div>
        <p className="upload-instruction-description" dangerouslySetInnerHTML={{__html: Dictionary.get('uploadInstructionsContent')}}/>
      </div>
    );
  }
}

UploadContent.propTypes = {
  contentId: PropTypes.number.isRequired,
  onUpload: PropTypes.func.isRequired,
  getAjaxUrl: PropTypes.func.isRequired,
};

export default UploadContent;
