import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';
import { 
  contentDefinition, 
  getLicensesReducer, 
  mapContentScreenShotsForImageSlider
} from '../../../../utils/helpers';
import variables from '../../../../../styles/base/_variables.scss';

import Message from '../../../Message/Message';
import Modal from '../../../Modal/Modal';
import ImageSlider from '../../../ImageSlider/ImageSlider';
import ReadMore from '../../../ReadMore/ReadMore';
import ContentAccordion from './ContentAccordion';

import './Content.scss';
import LicenseDialog from './LicenseDialog';
import InfoList from './InfoList';
import ContentIcon from '../ContentIcon';
import ApiClient from '../../../../utils/content-hub/api-client';
import LicenseInfo from '../../../License/LicenseInfo';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedScreenshot: 0,
      modalType: undefined,
      showImageSlider: true,
      message: undefined,
      screenWidth: document.documentElement.clientWidth
    };

    this.focusSet = false;
    this.screenSmall = parseInt(variables.screenSmall);
  }

  onTransitionEnd = () => {
    if (!this.state.visible) {
      this.props.onClose();
    }
    else if (!this.focusSet) {
      this.focusSet = true;
      this.title.focus();
    }
  }

  onImageSelect = (index) => {
    this.setState({
      modalType: 'screenshots',
      selectedScreenshot: index
    });
  }

  onModalClose = () => {
    this.setState({
      modalType: undefined,
      licenseDetails: undefined
    });
  }

  handleClose = (event) => {
    event.preventDefault();
    this.props.aboutToClose();
    this.setState({
      visible: false
    });
  }

  handleErrorDismiss = () => {
    this.setState({
      errorMessage: null
    });
  }

  handleInfoDismiss = () => {
    this.setState({
      infoMessage: null
    });
  }

  handleBackKeyPress = (event) => {
    if (event.which === 32) {
      this.handleClose(event);
    }
  }

  componentDidMount = () => {
    // TODO - probably a smarter way to do this?
    setTimeout(() => {
      this.setState({
        visible: true
      });
    }, 1);
    window.addEventListener('resize', this.resize);

    ApiClient.licenses.then(licenses => {
      const flattenedLicenses = licenses.reduce(getLicensesReducer, []);
      
      for (let licenseDetails of flattenedLicenses) {
        if (licenseDetails.id === `${this.props.content.license.id}-${this.props.content.license.version}`) {
          this.setState({ licenseDetails });
          break;
        }
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      screenWidth: document.documentElement.clientWidth
    });
  }

  /**
   * Get title og H5P content type
   * @param  {string} name
   */
  getH5PTitle = (name) => {
    if (this.props.metaData.flatContentTypes) {
      const element = this.props.metaData.flatContentTypes
        //Ignore version in matching
        .filter(contentType => contentType.id.split(' ')[0] === name.split(' ')[0]);
      if (element.length > 0) {
        return element[0].label;
      }
    }
    return name;
  }

  /** 
   * Get level label
   * @param  {string} name
   */
  getLabel = (name, type) => {
    if (this.props.metaData[type]) {
      const element = this.props.metaData[type].filter(element => element.id === name);
      if (element.length > 0 && element[0].translation !== null) {
        return element[0].translation;
      }
    }
    return name;
  }

  /**
   * Show license details
   */
  handleShowLicenseDetails = () => {
    this.setState({ modalType: 'license' });
  }

  /*openPreviewUrl = () => {
    window.open(this.props.library.example, '_blank');
  }*/

  render() {
    const classNames = 'h5p-hub-content-detail' + (this.state.visible ? ' h5p-hub-show' : '');
    const titleId = 'content-detail-view-title';
    const content = this.props.content;

    let modalAria = {};
    // Modal content - image slider or license ?
    const ModalContent = () => {
      modalAria.label = Dictionary.get('imageLightboxTitle');

      if (this.state.modalType === 'screenshots') {
        return (
          <ImageSlider
            images={mapContentScreenShotsForImageSlider(content.screenshots)}
            imagesToShow={1}
            showProgress={true}
            selected={this.state.selectedScreenshot} />
        );
      }
      else if (this.state.modalType === 'license') {
        modalAria.labelledby = 'h5p-hub-license-details-id';
        modalAria.describedby = 'h5p-hub-license-details-description';

        return (
          <LicenseDialog id={content.license.id} />
        );
      }
    };

    return (
      <div className={classNames}
        role="region"
        tabIndex="-1"
        aria-labelledby={titleId}
        onTransitionEnd={this.onTransitionEnd}
      >
        <a href="#"
          className="h5p-hub-back-button h5p-hub-icon-arrow-thick"
          aria-label={Dictionary.get('contentTypeBackButtonLabel')}
          onClick={this.handleClose}
          onKeyPress={this.handleBackKeyPress}
        />
        <div className="h5p-hub-container">
          <div className="h5p-hub-image-wrapper">
            <ContentIcon src={content.icon} className="h5p-hub-img-responsive"/> 
          </div>
          <div className="h5p-hub-text-details">
            <h2
              id={titleId}
              className={`h5p-hub-title ${content.reviewed ? 'h5p-hub-reviewed' : ''}`}
              tabIndex="-1"
              ref={element => this.title = element}
            >
              {content.title}
            </h2>

            <div className="h5p-hub-info-list">
              <InfoList
                content={this.props.content}
                getH5PTitle={this.getH5PTitle}
                getLabel={this.getLabel}
              />
            </div>

            <ReadMore text={content.description} maxLength={285} />

            {
              content.preview_url &&
              <a
                className="h5p-hub-button h5p-hub-demo-button"
                target="_blank"
                href={content.preview_url}
              >
                {Dictionary.get("contentPreviewButtonLabel")}
              </a>
            }
          </div>
          <div className="h5p-hub-info-list">
            <InfoList
              content={this.props.content}
              getH5PTitle={this.getH5PTitle}
              getLabel={this.getLabel}
            />
          </div>
        </div>
        {
          this.state.showImageSlider &&
          content.screenshots &&
          <ImageSlider
            images={mapContentScreenShotsForImageSlider(content.screenshots)}
            onImageSelect={this.onImageSelect}
            showProgress={false}
            selected={this.state.selectedScreenshot} />
        }
        <hr />
        {
          !!this.state.errorMessage &&
          <Message
            {...this.state.errorMessage}
            severity='error'
            onClose={this.handleErrorDismiss} />
        }
        {
          !!this.state.infoMessage &&
          <Message
            {...this.state.infoMessage}
            severity='info'
            onClose={this.handleInfoDismiss} />
        }
        <div className="h5p-hub-button-bar">
          <button type="button"
            className={`h5p-hub-button h5p-hub-button-orange h5p-hub-button-inverse-primary h5p-hub-button-download-content${this.props.downloading ? ' h5p-hub-downloading' : ''}`}
            onClick={() => this.props.onDownload(content)}
          >
            {this.props.downloading
              ? Dictionary.get('contentDownloadButtonDownloadingLabel') || 'Downloading...'
              : Dictionary.get('contentDownloadButtonLabel')}
          </button>
        </div>

        <ContentAccordion
          content={content}
          licenseInfo={
            <LicenseInfo
              header={Dictionary.get('contentTypeLicensePanelTitle')}
              id={content.license.id}
              version={content.license.version}
              attributes={{}}
              onShowLicenseDetails={this.handleShowLicenseDetails}
              licenseDetails={this.state.licenseDetails}
            />
          }
        />
        {
          this.state.modalType !== undefined &&
          <Modal
            onClose={this.onModalClose}
            className={this.state.modalType ? 'h5p-hub-' + this.state.modalType : ''}
            aria={modalAria}
            parentId='h5p-hub'
            appElementId='h5p-hub-panel'
          >
            <ModalContent />
          </Modal>
        }
      </div>
    );
  }
}

Content.propTypes = {
  onDownload: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  aboutToClose: PropTypes.func.isRequired,
  content: contentDefinition,
  metaData: PropTypes.object.isRequired
};

export default Content;
