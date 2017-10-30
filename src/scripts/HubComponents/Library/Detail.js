import React from 'react';

import Dictionary from '../../utils/dictionary';
import LibraryAccordion from './LibraryAccordion';
import ImageSlider from '../../GenericComponents/ImageSlider/ImageSlider';
import ButtonBar from './ButtonBar';
import HubServices from '../../hub-services';
import Message from '../../GenericComponents/Message/Message';

import noIcon from '../../../images/content-type-placeholder.svg';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      installed: props.library.installed,
      canInstall: props.library.canInstall,
      updatable: !props.library.isUpToDate,
      installing: false,
      updating: false,
      visible: true
    };

    if (!props.library.canInstall) {
      this.state.message = {
        severity: 'warning',
        title: Dictionary.get('contentTypeUnsupportedApiVersionTitle'),
        content: Dictionary.get('contentTypeUnsupportedApiVersionContent')
      }
    }
  }

  handleInstall() {

    this.setState({
      installing: true,
      message: undefined
    });

    const title = this.props.library.title || this.props.library.machineName;

    HubServices.installContentType(this.props.library.machineName).then(() => {
      // TODO - How to make grandparents know it needs to
      // update content type list? Could the HubServices be used for that?
      const installMessageKey = this.props.installed ? 'contentTypeUpdateSuccess' : 'contentTypeInstallSuccess';

      this.setState({
        installed: true,
        installing: false,
        message: {
          title: Dictionary.get(installMessageKey, {':contentType': title}),
          severity: 'info'
        }
      });
    }).catch(error => {
      this.setState({
        installed: false,
        installing: false,
        message: {
          success: false,
          title: Dictionary.get('contentTypeInstallError', {':contentType': title}),
          severity: 'error',
          error: error,
          errorCode: 'RESPONSE_FAILED',
          content: 'TODO - Reasons will be printed here'
        }
      });
    });
  }

  hide(callback) {
    this.setState({visible: false});
    // TODO - could we avoid this timeout?
    if (callback) {
      setTimeout(() => callback(), 500);
    }
  }

  handleUse() {
    this.hide(() => this.props.onUse(this.props.machineName));
  }

  handleClose() {
    this.hide(() => this.props.onClose());
  }

  render() {
    // TODO - should not happen!
    if (!this.props.library) {
      return null;
    }

    const titleId = 'content-type-detail-view-title';

    const title = this.props.library.title || this.props.library.machineName;
    const demoUrl = this.props.library.example || '#';
    const classNames = 'content-type-detail' + (this.state.visible ? ' show' : '');
    const logoUrl = this.props.library.icon || noIcon;

    return (
      <div className={classNames} id="content-type-detail" role="region" tabIndex="-1" aria-labelledby={titleId}>
        <button type="button" className="back-button icon-arrow-thick" aria-label={Dictionary.get('contentTypeBackButtonLabel')} tabIndex="0" onClick={() => this.handleClose()}></button>
        {
          this.state.message &&
          <Message
            title={this.state.message.title}
            message={this.state.message.content}
            severity={this.state.message.severity}
          />
        }
        <div className="container">
          <div className="image-wrapper">
            <img className="img-responsive content-type-image" src={logoUrl}/>
          </div>
          <div className="text-details">
            <h2 id="{titleId}" className="title" tabIndex="-1">{title}</h2>
            <div className="owner">{this.props.library.owner}</div>
            <p className="small">{this.props.library.description}</p>
            <a className="button demo-button" target="_blank" href={demoUrl}>
              {Dictionary.get("contentTypeDemoButtonLabel")}
            </a>
          </div>
        </div>
        <ImageSlider/>
        <hr />
        <ButtonBar
          installed={this.state.installed}
          canInstall={this.state.canInstall}
          updatable={this.state.updatable}
          installing={this.state.installing}
          updating={this.state.updating}
          onInstall={() => this.handleInstall()}
          onUse={() => this.handleUse()}
        />
        <LibraryAccordion
          id={this.props.library.license.id}
          attributes={this.props.library.license.attributes}
        />
      </div>
    );
  }
}

export default Detail;
