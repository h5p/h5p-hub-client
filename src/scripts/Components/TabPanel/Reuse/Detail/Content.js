import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';
import {
  contentDefinition,
  licensesReducer,
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
    this.props.onDismissMessage();
    this.props.aboutToClose();
    this.setState({
      visible: false
    });
  }

  handleBackKeyPress = (event) => {
    if (event.which === 32) {
      this.handleClose(event);
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        visible: true
      });
    }, 1);
    window.addEventListener('resize', this.resize);

    ApiClient.licenses.then(licenses => {
      const flattenedLicenses = licenses.reduce(licensesReducer, {});
      const licenseDetails = this.props.content.license.version
        ? flattenedLicenses[`${this.props.content.license.id}-${this.props.content.license.version}`]
        : flattenedLicenses[this.props.content.license.id];
      this.setState({ licenseDetailsUrl: licenseDetails.url});
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


  render() {
    const classNames = 'h5p-hub-content-detail' + (this.state.visible ? ' h5p-hub-show' : '');
    const titleId = 'h5p-hub-content-detail-view-title';
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
          className="h5p-hub-back-button h5p-hub-icon-arrow-thin"
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
        {this.props.message}
        <div className="h5p-hub-button-bar">
          <button type="button"
            className="h5p-hub-button h5p-hub-button-orange h5p-hub-button-inverse-primary h5p-hub-button-download-content"
            onClick={() => this.props.onDownload(content)}
          >
            {Dictionary.get('contentDownloadButtonLabel')}
          </button>
        </div>

        <ContentAccordion
          content={content}
          licenseInfo={
            <LicenseInfo
              header={Dictionary.get('contentTypeLicensePanelTitle')}
              id={content.license.id}
              version={content.license.version}
              licenseDetailsUrl={this.state.licenseDetailsUrl}
              attributes={{
                useCommercially: content.license.allows_commercial_use,
                modifiable: content.license.can_be_modified,
              }}
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
  message: PropTypes.node,
  onDismissMessage: PropTypes.func.isRequired
};

export default Content;
