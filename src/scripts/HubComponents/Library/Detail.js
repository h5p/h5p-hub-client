import React from 'react';

import Dictionary from '../../utils/dictionary';
import LibraryAccordion from './LibraryAccordion';
import ImageSlider from '../../GenericComponents/ImageSlider/ImageSlider';

import noIcon from '../../../images/content-type-placeholder.svg';

class Detail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log('RENDERING DETAILVIEW');
    console.log(this.props);

    if (!this.props.library) {
      return null;
    }

    const titleId = 'content-type-detail-view-title';

    const title = this.props.library.title || this.props.library.machineName;
    const demoUrl = this.props.library.example || '#';
    const classNames = 'content-type-detail' + (this.props.visible ? ' show' : '');
    const logoUrl = this.props.library.icon || noIcon;

    return (
      <div className={classNames} id="content-type-detail" role="region" tabIndex="-1" aria-labelledby={titleId}>
        <button type="button" className="back-button icon-arrow-thick" aria-label={Dictionary.get('contentTypeBackButtonLabel')} tabIndex="0"></button>
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
        <div className="button-bar">
          <button type="button" className="button button-inverse-primary button-install hidden" data-id={this.props.library.machineName}>
            <span className="icon-arrow-thick"></span>
            {Dictionary.get('contentTypeInstallButtonLabel')}
          </button>
          <button type="button" className="button button-inverse-primary button-installing hidden">
            <span className="icon-loading-search icon-spin"></span>
            {Dictionary.get("contentTypeInstallingButtonLabel")}
          </button>
          <button type="button" className="button button-inverse-primary button-update" data-id={this.props.library.machineName}>
            {Dictionary.get("contentTypeUpdateButtonLabel")}
          </button>
          <button type="button" className="button button-inverse-primary button-updating">
            <span className="icon-loading-search icon-spin"></span>
            {Dictionary.get("contentTypeUpdatingButtonLabel")}
          </button>
          <button type="button" className="button button-primary button-use" data-id={this.props.library.machineName}>
            {Dictionary.get("contentTypeUseButtonLabel")}
          </button>
        </div>
        <LibraryAccordion
          id={this.props.library.license.id}
          attributes={this.props.library.license.attributes}
        />
      </div>
    );
  }
}

export default Detail;
