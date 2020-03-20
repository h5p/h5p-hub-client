import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';
import { nonEmptyString } from '../../../../utils/helpers';
import noIcon from '../../../../../images/content-type-placeholder.svg';

import Message from '../../../Message/Message';
import Modal from '../../../Modal/Modal';
import ImageSlider from '../../../ImageSlider/ImageSlider';
import ReadMore from '../../../ReadMore/ReadMore';

import './Content.scss';

class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedScreenshot: 0,
      modalType: undefined,
      downloading: false,
      showImageSlider: true,
      message: undefined
    };
  }

  onTransitionEnd = () => {
    if (!this.state.visible) {
      this.props.onClose();
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
    // TODO - probably a smarter way to do this!
    setTimeout(() => {
      this.setState({
        visible: true
      });
      this.title.focus();
    }, 1);
  }

  /*openPreviewUrl = () => {
    window.open(this.props.library.example, '_blank');
  }*/

  render() {
    const classNames = 'content-detail' + (this.state.visible ? ' show' : '');
    const titleId = 'content-detail-view-title';
    const content = this.props.content;

    // Modal content - image slider or license ?
    const ModalContent = () => {
      if (this.state.modalType === 'screenshots') {
        return (
          <ImageSlider
            images={content.screenshots}
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
                {content.license.id}
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
    /*if (this.state.modalType === 'license' && this.state.licenseDetails) {
      modalAria.labelledby = 'license-details-id';
      modalAria.describedby = 'license-details-description';
    }*/

    return (
      <div className={classNames}
        id="content-detail"
        role="region"
        tabIndex="-1"
        aria-labelledby={titleId}
        onTransitionEnd={this.onTransitionEnd}
      >
        <a href="#"
          className="back-button icon-arrow-thick"
          aria-label={Dictionary.get('contentTypeBackButtonLabel')}
          onClick={this.handleClose}
          onKeyPress={this.handleBackKeyPress}
        />
        <div className="container">
          <div className="image-wrapper">
            <img
              className="img-responsive content-type-image"
              src={content.image.url || noIcon}
            />
          </div>
          <div className="text-details">
            <h2
              id={titleId}
              className={`title ${content.reviewed ? 'reviewed' : ''}`}
              tabIndex="-1"
              ref={element => this.title = element}
            >
              {content.title}
            </h2>
            <div className="owner">
              <span className="by">{Dictionary.get("by")}</span>
              {content.owner}
            </div>
            <ReadMore
              text={content.description}
              maxLength={285}
            />
            {
              content.preview_url &&
              <a
                className="button demo-button"
                target="_blank"
                href={content.preview_url}
              >
                {Dictionary.get("contentPreviewButtonLabel")}
              </a>
            }
          </div>
        </div>
        {
          this.state.showImageSlider &&
          content.screenshots &&
          <ImageSlider
            images={content.screenshots}
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
        <div className="button-bar">
          <button type="button"
            className="button button-orange button-inverse-primary button-download-content"
            onClick={this.props.onDownload}
          >
            {Dictionary.get(`contentDownloadButtonLabel`)}
          </button>
        </div>
        { 
          this.state.modalType !== undefined &&
          <Modal
            onClose={this.onModalClose}
            className={this.state.modalType || ''}
            aria={modalAria}
            parent=".reuse-content-result"
          >
            <ModalContent/>
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
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    reviewed: PropTypes.bool.isRequired,
    contentType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    screenshots: PropTypes.arrayOf(PropTypes.shape({
      url: nonEmptyString,
      alt: nonEmptyString
    })),
    image: PropTypes.string,
  })
};

export default Content;
