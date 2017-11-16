import React from 'react';
import PropTypes from 'prop-types';
import './UploadContent.scss';
import '../../../utils/fetch';
import Dictionary from '../../../utils/dictionary';
import Message from '../../Message/Message';
import UploadForm from './UploadForm/UploadForm';

class UploadContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      filePath: '',
      fileUploading: false,
      error: undefined,
      uploadData: {},
    };
    this.handleValidation = this.handleValidation.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleValidation(event) {
    this.setState({error: undefined});

    if (event.target.files.length === 0) {
      return; // Do nothing if the file has not been changed
    }

    const filePath = event.target.files[0].name;

    if (this.getFileExtension(filePath) !== 'h5p') {
      this.setState({
        fileSelected: false,
        filePath: '',
        error: {
          title: Dictionary.get('h5pFileWrongExtensionTitle'),
          message: Dictionary.get('h5pFileWrongExtensionContent')
        }
      });
    }
    else {
      this.setState({
        fileSelected: true,
        filePath,
        fileUploading: false,
        uploadData: event.target.files[0],
      });
      event.stopPropagation();
    }
  }

  handleUpload() {
    // Add the H5P file to a form, ready for transportation
    let data = new FormData();
    data.append('h5p', this.state.uploadData);
    data.append('contentId', this.props.contentId);

    this.setState({fileSelected: true, fileUploading: true});

    return fetch(this.props.getAjaxUrl('library-upload'), {
      method: 'POST',
      credentials: 'include',
      body: data
    }).then(result => result.json())
      .then(json => {
        // Validation failed
        if (json.success !== true) {
          this.setState({
            fileSelected: false,
            fileUploading: false,
            error: {
              title: json.message,
              message: json.details
            },
            filePath: '',
            uploadData: {}
          });
          return;
        }

        this.props.onUpload(json.data);
        this.setState({
          fileSelected: false,
          fileUploading: false,
          filePath: '',
          uploadData: {},
        });
      })
      .catch(() => {
        this.setState({
          fileSelected: false,
          fileUploading: false,
          error: {
            title: Dictionary.get('h5pFileUploadServerErrorTitle'),
            message: Dictionary.get('h5pFileUploadServerErrorContent')
          },
          filePath: '',
          uploadData: {},
        });
      });
  }

  getFileExtension(fileName) {
    return fileName.replace(/^.*\./, '');
  }

  render() {
    return (
      <div className="upload-wrapper">
        {
          this.state.error &&
          <Message
            type='error'
            dismissable={false}
            title={this.state.error.title}
            message={this.state.error.message}
            severity='error'
          />
        }
        <div className={"upload-throbber" + (this.state.fileUploading ? '' : ' hidden')}
          aria-label={Dictionary.get('uploadingThrobber')}/>
        <h1 className="upload-instruction-header">{Dictionary.get('uploadInstructionsTitle')}</h1>
        <UploadForm
          fileSelected={this.state.fileSelected}
          fileUploading={this.state.fileUploading}
          filePath={this.state.filePath}
          onValidate={this.handleValidation}
          onUpload={this.handleUpload}
        />
        <p className="upload-instruction-description"
          dangerouslySetInnerHTML={{__html: Dictionary.get('uploadInstructionsContent')}}
        />
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
