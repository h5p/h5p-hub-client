import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';
import updatable from '../../../../utils/updatable';
import {nonEmptyString, onSpaceOrEnterEvent} from '../../../../utils/helpers';
import '../../../../utils/fetch';
import fetchJSON from '../../../../utils/fetchJSON';
import noIcon from '../../../../../images/content-type-placeholder.svg';

import Message from '../../../Message/Message';
import Modal from '../../../Modal/Modal';
import ContentTypeAccordion from './ContentTypeAccordion';
import ImageSlider from '../../../ImageSlider/ImageSlider';
import ButtonBar from './ButtonBar';
import ReadMore from '../../../ReadMore/ReadMore';

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

  openExampleUrl = () => {
    window.open(this.props.library.example, '_blank');
  }

  render() {
    const classNames = 'h5p-hub-content-type-detail' + (this.state.visible ? ' h5p-hub-show' : '');
    const titleId = 'h5p-hub-content-type-detail-view-title';

    // On the first render, no library is selected. We add an empty DIV,
    // just to get the sliding effect when viewing the first library
    if (!this.props.library) {
      return (
        <div className={classNames} />
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
            <div className="h5p-hub-modal-header">
              {Dictionary.get('licenseModalTitle')}
            </div>
            <div className="h5p-hub-modal-content">
              <h5 id="h5p-hub-license-details-id" className="h5p-hub-modal-title">
                {this.props.library.license.id}
              </h5>
              <div
                id="h5p-hub-license-details-description"
                className={this.state.licenseDetails ? undefined : 'h5p-hub-loading'}
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
      modalAria.labelledby = 'h5p-hub-license-details-id';
      modalAria.describedby = 'h5p-hub-license-details-description';
    }

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
          onKeyPress={this.handleBackKeyPress}/>
        <div className="h5p-hub-container">
          <div className="h5p-hub-image-wrapper">
            <img
              className="h5p-hub-img-responsive"
              src={this.props.library.icon || noIcon}
            />
          </div>
          <div className="h5p-hub-text-details">
            <h2
              id={titleId}
              className="h5p-hub-title"
              tabIndex="-1"
            >
              {this.props.library.title || this.props.library.machineName}
            </h2>
            <div className="h5p-hub-owner">{this.props.library.owner}</div>
            <ReadMore
              text={this.props.library.description}
              maxLength={285}
            />
            {
              this.props.library.example &&
              <a
                className="h5p-hub-button h5p-hub-demo-button"
                target="_blank"
                href={this.props.library.example || '#'}
                onKeyPress={event => onSpaceOrEnterEvent(event, this.openExampleUrl)}
              >
                {Dictionary.get("contentTypeDemoButtonLabel")}
              </a>
            }
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
        <ContentTypeAccordion
          id={(this.props.library.license ? this.props.library.license.id : 'Unspecified' )}
          attributes={(this.props.library.license ? this.props.library.license.attributes : undefined )}
          onShowLicenseDetails={this.handleShowLicenseDetails}
        />
        { this.state.modalType !== undefined &&
          <Modal
            onClose={this.onModalClose}
            className={'h5p-hub-' + this.state.modalType || ''}
            aria={modalAria}
            parentId='h5p-hub'
            appElementId='h5p-hub-panel'
          >
            <ModalContent/>
          </Modal>
        }
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
