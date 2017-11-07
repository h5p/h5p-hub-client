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
      isSelected: false,
      filePath: '',
      isUploading: false,
      validationError: false,
      serverError: false,
    };
    this.handleValidation = this.handleValidation.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleValidation(event) {
    this.setState({validationError: false, serverError: false});

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
    }
  }

  handleUpload() {
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
            isSelected: false,
            isUploading: false,
            serverError: true,
            filePath: '',
          });
          return;
        }

        this.props.onUpload(json.data);
        this.setState({
          isSelected: false,
          isUploading: false,
          filePath: '',
        });
      })
      .catch(() => {
        this.setState({
          isSelected: false,
          isUploading: false,
          serverError: true,
          filePath: '',
        });
      });
  }

  getFileExtension(fileName) {
    return fileName.replace(/^.*\./, '');
  }

  render() {
    return (
      <div className="upload-wrapper">
        {this.state.validationError &&
          <Message
            type={'error'}
            dismissable={false}
            title={Dictionary.get('h5pFileWrongExtensionTitle')}
            message={Dictionary.get('h5pFileWrongExtensionContent')}
            severity='error'
          />
        }
        {this.state.serverError &&
          <Message
            type={'error'}
            dismissable={false}
            title={Dictionary.get('h5pFileUploadServerErrorTitle')}
            message={Dictionary.get('h5pFileUploadServerErrorContent')}
            severity='error'
          />
        }
        <div className={"upload-throbber" + (this.state.isUploading ? '' : ' hidden')}
          aria-label={Dictionary.get('uploadingThrobber')}/>
        <h1 className="upload-instruction-header">{Dictionary.get('uploadInstructionsTitle')}</h1>
        <UploadForm
          isSelected={this.state.isSelected}
          isUploading={this.state.isUploading}
          filePath={this.state.filePath}
          onValidate={this.handleValidation}
          onUpload={this.handleUpload}
        />
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
