import React from 'react';
import PropTypes from 'prop-types';
import Async from 'react-async';

import Dictionary from '../../../../utils/dictionary';
import { contentDefinition } from '../../../../utils/helpers';
import noIcon from '../../../../../images/content-type-placeholder.svg';

import Message from '../../../Message/Message';
import Modal from '../../../Modal/Modal';
import ImageSlider from '../../../ImageSlider/ImageSlider';
import ReadMore from '../../../ReadMore/ReadMore';
import ContentAccordion from './ContentAccordion';

import './Content.scss';
import LicenseDialog from './LicenseDialog';

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

    this.focusSet = false;
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
  }

  /**
   * Show license details
   */
  handleShowLicenseDetails = () => {
    this.setState({modalType: 'license'});
  }

  /*openPreviewUrl = () => {
    window.open(this.props.library.example, '_blank');
  }*/

  /**
   * Get a language's label
   * 
   * @param {array} languages
   * @return {string}
   */
  getLanguageLabel(languages) {
    for (let i = 0; i < languages.length; i++) {
      if (languages[i].id === this.props.content.language) {
        return languages[i].label;
      }
    }

    // Unknown language
    return this.props.content.language;
  }

  render() {
    const classNames = 'content-detail' + (this.state.visible ? ' show' : '');
    const titleId = 'content-detail-view-title';
    const content = this.props.content;

    let modalAria = {};
    // Modal content - image slider or license ?
    const ModalContent = () => {
      modalAria.label = Dictionary.get('imageLightboxTitle');

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
        modalAria.labelledby = 'license-details-id';
        modalAria.describedby = 'license-details-description';

        return (
          <LicenseDialog id={content.license.id} />
        );
      }
    };

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
              src={content.icon || noIcon}
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
            
            <div className="language">
              <Async promiseFn={this.props.languages}>
                <Async.Pending>
                  {content.language}
                </Async.Pending>

                <Async.Fulfilled>{languages =>
                  this.getLanguageLabel(languages)
                }
                </Async.Fulfilled>
              </Async>
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
            onClick={() => this.props.onDownload(content)}
          >
            {Dictionary.get(`contentDownloadButtonLabel`)}
          </button>
        </div>

        <ContentAccordion 
          content={content}
          onShowLicenseDetails={this.handleShowLicenseDetails}
        />
        { 
          this.state.modalType !== undefined &&
          <Modal
            onClose={this.onModalClose}
            className={this.state.modalType || ''}
            aria={modalAria}
            parent=".content-detail"
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
  content: contentDefinition,
  languages: PropTypes.func.isRequired
};

export default Content;
