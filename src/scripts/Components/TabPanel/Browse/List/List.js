import React from 'react';

import noIcon from '../../../../../images/content-type-placeholder.svg';
import Choose from '../../../Choose/Choose';
import Dictionary from '../../../../utils/dictionary';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  getLibrary = (id) => {
    for (var i = 0; i < this.props.contentTypes.length; i++) {
      const library = this.props.contentTypes[i];
      if (library.machineName.toLocaleLowerCase().replace('.','-') === id) {
        return library;
      }
    }
  }

  handleUse = (event, contentType) => {
    this.props.onUse(contentType);
    event.preventDefault();
  }

  handleFocus = (id) => {
    this.props.onFocus(this.getLibrary(id));
  }

  handleSelect = (id) => {
    this.props.onSelect(this.getLibrary(id));
  }

  render() {
    const listItems = this.props.contentTypes.map((contentType, i) => {
      let id = contentType.machineName.toLocaleLowerCase().replace('.','-');
      let tabindex = -1;
      if (this.props.focused) {
        if (this.props.focused === contentType) {
          tabindex = 0; // Enable tabbing to selected item's button
        }
      }
      else if (i === 0) {
        tabindex = 0; // First item is selected but default, enabling tabbing
      }
      let title = (contentType.title || contentType.machineName);
      let updateAvailable = (!contentType.isUpToDate && contentType.installed && contentType.canInstall);

      return (
        <li key={id} id={id} className="media">

          <div className="media-left">
            <img className="media-object" src={contentType.icon || noIcon} alt={title + ' ' + Dictionary.get('contentTypeIconAltText')}/>
          </div>

          <div className="media-body">
            <div className="h4 media-heading">{title}</div>

            {contentType.installed ? (
              <button type="button" className="button button-primary" tabIndex={tabindex} onClick={event => this.handleUse(event, contentType)}>
                <span></span>
                {Dictionary.get('contentTypeUseButtonLabel')}
              </button>
            ) : (
              <button type="button" className="button button-inverse-primary button-install'" tabIndex={tabindex}>
                <span className="icon-arrow-thick"></span>
                {Dictionary.get('contentTypeGetButtonLabel')}
              </button>
            )}

            <div className={'content-type-update-info' + (updateAvailable ? '' : ' hidden')}>
              {Dictionary.get('contentTypeUpdateAvailable')}
            </div>

            <div className="description">{contentType.summary || ''}</div>
          </div>

        </li>
      );
    });

    return (
      <ol className="content-type-list" aria-hidden={!this.props.visible}>
        <Choose selected={this.props.focused ? this.props.focused.machineName.toLocaleLowerCase().replace('.','-') : null}
          onChange={this.handleSelect}
          onFocus={this.handleFocus}>
          {listItems}
        </Choose>
      </ol>
    );
  }
}

export default List;
