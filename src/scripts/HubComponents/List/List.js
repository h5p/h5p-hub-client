import React from 'react';
import Choose from '../Choose/Choose';
import noIcon from '../../../images/content-type-placeholder.svg';
import Dictionary from '../../utils/dictionary';

class Browser extends React.Component {
  constructor(props) {
    super(props);

    this.useButton = {
      text: Dictionary.get('contentTypeUseButtonLabel'),
      className: 'button-primary',
      icon: ''
    };
    this.installButton = {
      text: Dictionary.get('contentTypeGetButtonLabel'),
      className: 'button-inverse-primary button-install',
      icon: 'icon-arrow-thick'
    };
  }

  handleClick(event, contentType) {
    if (contentType.installed) {
      this.props.onUse(contentType.machineName);
    }
    else {
      console.log('Installing ' + contentType.machineName);
    }
    event.preventDefault();
  }

  getLibrary(id) {
    for (var i = 0; i < this.props.contentTypes.libraries.length; i++) {
      const library = this.props.contentTypes.libraries[i];
      if(library.machineName.toLocaleLowerCase().replace('.','-') == id) {
        return library;
      }
    }
  }

  render() {
    const apiVersion = this.props.contentTypes.apiVersion;

    let first;
    const listItems = this.props.contentTypes.libraries.map(contentType => {
      // Determine if the content type is using an API version that is not yet supported
      const apiNotSupported = !(apiVersion.major > contentType.h5pMajorVersion ||
                               (apiVersion.major === contentType.h5pMajorVersion &&
                                apiVersion.minor >= contentType.h5pMinorVersion));

      // If the content type is restricted or requires a newer API, skip showing it
      if (contentType.restricted || (!contentType.installed && apiNotSupported)) {
        return;
      }

      let id = contentType.machineName.toLocaleLowerCase().replace('.','-');
      if (!first) {
        first = id;
      }
      let title = (contentType.title || contentType.machineName);
      let button = (contentType.installed ? this.useButton : this.installButton);
      let updateAvailable = (!contentType.isUpToDate && contentType.installed && contentType.canInstall);

      return (
        <li key={id} id={id} className="media">

          <div className="media-left">
            <img className="media-object" src={contentType.icon || noIcon} alt={title + ' ' + Dictionary.get('contentTypeIconAltText')}/>
          </div>

          <div className="media-body">
            <div className="h4 media-heading">{title}</div>

            <button type="button" className={'button ' + button.className} tabIndex="-1" onClick={event => this.handleClick(event, contentType)}>
              <span className={button.icon}></span>
              {button.text}
            </button>

            <div className={'content-type-update-info' + (updateAvailable ? '' : ' hidden')}>
              {Dictionary.get('contentTypeUpdateAvailable')}
            </div>

            <div className="description">{contentType.summary || ''}</div>
          </div>

        </li>
      );
    });

    return (
      <ol className="content-type-list">
        <Choose selected={first} onChange={id => this.props.onSelect(this.getLibrary(id))}>
          {listItems}
        </Choose>
      </ol>
    );
  }
}

export default Browser;
