import React from 'react';

import Dictionary from '../../../../utils/dictionary';
import noIcon from '../../../../../images/content-type-placeholder.svg';
import HubServices from '../../../../hub-services';

import Message from '../../../Message/Message';
import ContentTypeAccordion from './ContentTypeAccordion';
import ImageSlider from './ImageSlider/ImageSlider';
import ButtonBar from './ButtonBar';
import ReadMore from './ReadMore';

class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.close = this.close.bind(this);
    this.handleInstall = this.handleInstall.bind(this);
    this.handleUse = this.handleUse.bind(this);
  }

  componentWillReceiveProps(props) {
    if (!props.library) {
      return;
    }

    this.setState({
      installed: props.library.installed,
      canInstall: props.library.canInstall,
      updatable: !props.library.isUpToDate,
      installing: false,
      visible: props.visible
    });

    if (!props.library.canInstall) {
      this.setState({
        message: {
          severity: 'warning',
          title: Dictionary.get('contentTypeUnsupportedApiVersionTitle'),
          message: Dictionary.get('contentTypeUnsupportedApiVersionContent')
        }
      });
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
          message: 'TODO - Reasons will be printed here'
        }
      });
    });
  }

  close() {
    this.props.onClose();
  }

  handleUse() {
    this.close();
    this.props.onUse(this.props.library);
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

    const title = this.props.library.title || this.props.library.machineName;
    const demoUrl = this.props.library.example || '#';
    const logoUrl = this.props.library.icon || noIcon;

    return (
      <div className={classNames} id="content-type-detail" role="region" tabIndex="-1" aria-labelledby={titleId}>
        <button type="button" className="back-button icon-arrow-thick" aria-label={Dictionary.get('contentTypeBackButtonLabel')} tabIndex="0" onClick={this.close}></button>
        {
          this.state.message &&
          <Message {...this.state.message}/>
        }
        <div className="container">
          <div className="image-wrapper">
            <img className="img-responsive content-type-image" src={logoUrl}/>
          </div>
          <div className="text-details">
            <h2 id="{titleId}" className="title" tabIndex="-1">{title}</h2>
            <div className="owner">{this.props.library.owner}</div>
            <ReadMore
              text={this.props.library.description}
              maxLength={285}
            />
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
          onInstall={this.handleInstall}
          onUse={this.handleUse}
        />
        {
          this.props.library.license &&
          <ContentTypeAccordion
            id={this.props.library.license.id}
            attributes={this.props.library.license.attributes}
          />
        }
      </div>
    );
  }
}

export default Detail;
