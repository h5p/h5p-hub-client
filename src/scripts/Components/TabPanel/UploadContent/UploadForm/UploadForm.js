
import React from 'react';
import PropTypes from 'prop-types';
import '../UploadContent.scss';
import '../../../../utils/fetch';
import Dictionary from '../../../../utils/dictionary';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.clickFileField = this.clickFileField.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.fileSelected) {
      this.useButton.focus();
    }
  }

  clickFileField() {
    this.fileField.click();
  }

  render() {
    return (
      <div className="upload-form">
        <input className="upload-path"
          placeholder={((this.props.fileSelected || this.props.fileUploading) ? this.props.filePath : Dictionary.get('uploadPlaceholder'))}
          onClick={this.clickFileField}
          tabIndex="-1"
          disabled={this.props.fileUploading}
          readOnly
        />
        <button type="button"
          ref={(button) => {this.useButton = button; }}
          className={"button use-button " + (this.props.fileSelected ? 'visible' : ' ')}
          disabled={this.props.fileUploading}
          onClick={this.props.onUpload}>{Dictionary.get("contentTypeUseButtonLabel")}
        </button>
        <div className="input-wrapper">
          <input type="file" accept=".h5p" aria-hidden="true"
            ref={(input) => { this.fileField = input; }}
            onChange={this.props.onValidate}
          />
          <button type="button"
            className="button upload-button"
            onClick={this.clickFileField}
            disabled={this.props.fileUploading}
            tabIndex="0">{this.props.fileSelected ? Dictionary.get('uploadFileButtonChangeLabel') : Dictionary.get('uploadFileButtonLabel')}
          </button>
        </div>
      </div>
    )
  }
}

UploadForm.propTypes = {
  fileSelected: PropTypes.bool.isRequired,
  fileUploading: PropTypes.bool.isRequired,
  filePath: PropTypes.string.isRequired,
  onValidate: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
}

export default UploadForm;
