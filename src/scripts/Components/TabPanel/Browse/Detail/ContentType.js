import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';
import updatable from '../../../../utils/updatable';
import {nonEmptyString} from '../../../../utils/helpers';
import '../../../../utils/fetch';
import fetchJSON from '../../../../utils/fetchJSON';
import noIcon from '../../../../../images/content-type-placeholder.svg';

import Message from '../../../Message/Message';
import Modal from './Modal/Modal';
import ContentTypeAccordion from './ContentTypeAccordion';
import ImageSlider from './ImageSlider/ImageSlider';
import ButtonBar from './ButtonBar';
import ReadMore from './ReadMore';

import './ContentType.scss';

const licenseCache = {};

class ContentType extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedScreenshot: 0,
      modalType: undefined,
      installed: false,
      canInstall: false,
      updatable: false,
      installing: false,
      showImageSlider: true,
      message: undefined,
      opened: false
    };
  }

  componentWillReceiveProps(props) {
    if (!props.library) {
      return;
    }

    if (this.props.library !== props.library) {
      // Reset messages when library change
      this.setState({
        errorMessage: null,
        infoMessage: null
      });
    }

    if (!this.props.visible && props.visible) {
      this.setState({opened: true});
    }
    else {
      this.setState({opened: false});
    }

    this.setState({
      installed: props.library.installed,
      canInstall: props.library.canInstall,
      updatable: updatable(props.library, props.apiVersion),
      installing: false,
      visible: props.visible,
      showImageSlider: true,
    });
  }

  onTransitionEnd = () => {
    if (!this.state.visible && this.state.showImageSlider) {
      this.setState({showImageSlider: false});
    }
    else if (this.state.visible) {
      this.setState({focusUseButton: this.state.visible});
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

  handleInstall = () => {
    this.setState({
      installing: true,
      errorMessage: null,
      infoMessage: null
    });

    fetchJSON(this.props.getAjaxUrl('library-install', {id: this.props.library.machineName}), '')
      .then(response => {
        // Install success, update parent
        this.props.onInstall(response.data);

        const installMessageKey = this.props.installed ? 'contentTypeUpdateSuccess' : 'contentTypeInstallSuccess';
        const title = this.props.library.title || this.props.library.machineName;
        this.setState({
          installed: true,
          installing: false,
          infoMessage: {
            title: Dictionary.get(installMessageKey, {':contentType': title}),
            message: response.data.details
          }
        });
      })
      .catch(reason => {
        // Install failed
        this.setState({
          updating: false,
          installing: false,
          errorMessage: reason
        });
      });
  }

  handleClose = (event) => {
    event.preventDefault();
    this.props.onClose();
  }

  handleUse = () => {
    this.props.onUse(this.props.library);
  }

  handleShowLicenseDetails = () => {

    const licenseId = this.props.library.license.id;
    let details = licenseCache[licenseId];

    if (details) {
      // We already got it
      this.setState({licenseDetails: details});
    }
    else {
      // Fetch the license:
      fetch(`https://api.h5p.org/v1/licenses/${this.props.library.license.id}`)
        .then(result => result.json())
        .then(response => {
          if (response.success === false) {
            details = Dictionary.get('licenseFetchDetailsFailed');
          }
          else {
            details = licenseCache[licenseId] = response.description
              .replace(':owner', this.props.library.owner)
              .replace(':year', new Date().getFullYear());
          }
          this.setState({licenseDetails: details});
        })
        .catch(() => {
          this.setState({
            licenseDetails: Dictionary.get('licenseFetchDetailsFailed')
          });
        });
    }

    this.setState({modalType: 'license'});
  };

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

  render() {
    const classNames = 'content-type-detail' + (this.state.visible ? ' show' : '');
    const titleId = 'content-type-detail-view-title';

    // On the first render, no library is selected. We add an empty DIV,
    // just to get the sliding effect when viewing the first library
    if (!this.props.library) {
      return (
        <div className={classNames} id="content-type-detail"/>
      );
    }

    // Modal content - image slider or license ?
    const ModalContent = () => {
      if (this.state.modalType === 'screenshots') {
        return (
          <ImageSlider
            images={this.props.library.screenshots}
            imagesToShow={1}
            showProgress={true}
            selected={this.state.selectedScreenshot}/>
        );
      }
      else if (this.state.modalType === 'license') {
        return (
          <div>
            <div className="modal-header">
              {Dictionary.get('licenseModalTitle')}
            </div>
            <div className="modal-content">
              <h5 id="license-details-id" className="modal-title">
                {this.props.library.license.id}
              </h5>
              <div
                id="license-details-description"
                className={this.state.licenseDetails ? undefined : 'loading'}
                dangerouslySetInnerHTML={{__html: this.state.licenseDetails}}
              />
            </div>
          </div>
        );
      }

      return null;
    };

    let modalAria = {};

    if (this.state.modalType === 'screenshots') {
      modalAria.label = Dictionary.get('imageLightboxTitle');
    }
    if (this.state.modalType === 'license' && this.state.licenseDetails) {
      modalAria.labelledby = 'license-details-id';
      modalAria.describedby = 'license-details-description';
    }

    return (
      <div className={classNames}
        id="content-type-detail"
        role="region"
        tabIndex="-1"
        aria-labelledby={titleId}
        onTransitionEnd={this.onTransitionEnd}
      >
        <a href="#"
          className="back-button icon-arrow-thick"
          aria-label={Dictionary.get('contentTypeBackButtonLabel')}
          onClick={this.handleClose}
          onKeyPress={this.handleBackKeyPress}/>
        <div className="container">
          <div className="image-wrapper">
            <img
              className="img-responsive content-type-image"
              src={this.props.library.icon || noIcon}
            />
          </div>
          <div className="text-details">
            <h2
              id="{titleId}"
              className="title"
              tabIndex="-1"
            >
              {this.props.library.title || this.props.library.machineName}
            </h2>
            <div className="owner">{this.props.library.owner}</div>
            <ReadMore
              text={this.props.library.description}
              maxLength={285}
            />
            <a
              className="button demo-button"
              target="_blank"
              href={this.props.library.example || '#'}
            >
              {Dictionary.get("contentTypeDemoButtonLabel")}
            </a>
          </div>
        </div>
        {
          this.state.showImageSlider &&
          this.props.library.screenshots && 
          <ImageSlider
            images={this.props.library.screenshots}
            onImageSelect={this.onImageSelect}
            showProgress={false}
            selected={this.state.selectedScreenshot}/>
        }
        <hr />
        {
          !!this.state.errorMessage &&
          <Message
            {...this.state.errorMessage}
            severity='error'
            onClose={this.handleErrorDismiss}/>
        }
        {
          !!this.state.infoMessage &&
          <Message
            {...this.state.infoMessage}
            severity='info'
            onClose={this.handleInfoDismiss}/>
        }
        <ButtonBar
          installed={this.state.installed}
          canInstall={this.state.canInstall}
          updatable={this.state.updatable}
          installing={this.state.installing}
          onInstall={this.handleInstall}
          onUse={this.handleUse}
          opened={this.state.opened}
        />
        {
          this.props.library.license &&
          <ContentTypeAccordion
            id={this.props.library.license.id}
            attributes={this.props.library.license.attributes}
            onShowLicenseDetails={this.handleShowLicenseDetails}
          />
        }
        <Modal
          visible={this.state.modalType !== undefined}
          onClose={this.onModalClose}
          className={this.state.modalType || ''}
          aria={modalAria}
        >
          <ModalContent/>
        </Modal>
      </div>
    );
  }
}

ContentType.propTypes = {
  visible: PropTypes.bool.isRequired,
  onInstall: PropTypes.func.isRequired,
  onUse: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  getAjaxUrl: PropTypes.func.isRequired,
  library: PropTypes.shape({
    installed: PropTypes.bool.isRequired,
    canInstall: PropTypes.bool.isRequired,
    isUpToDate: PropTypes.bool.isRequired,
    example: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    machineName: PropTypes.string.isRequired,
    screenshots: PropTypes.arrayOf(PropTypes.shape({
      url: nonEmptyString,
      alt: nonEmptyString
    })),
    owner: PropTypes.string.isRequired,
    icon: PropTypes.string,
    license: PropTypes.shape({
      id: PropTypes.string.isRequired,
      attributes: PropTypes.shape({
        canHoldLiable: PropTypes.bool.isRequired,
        useCommercially: PropTypes.bool,
        modifiable: PropTypes.bool,
        distributable: PropTypes.bool,
        sublicensable: PropTypes.bool,
        mustIncludeCopyright: PropTypes.bool,
        mustIncludeLicense: PropTypes.bool
      })
    })
  })
};

export default ContentType;
