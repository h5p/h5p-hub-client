import React from 'react';

import noIcon from '../../../../../images/content-type-placeholder.svg';
import Choose from '../../../Choose/Choose';
import Dictionary from '../../../../utils/dictionary';
import search from '../../../../utils/search.js';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getFilteredState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getFilteredState(nextProps));
  }

  /**
   * Create a state update filtering and ordering the content types.
   * Set focus to the first content type.
   */
  getFilteredState(props) {
    const newState = {
      contentTypes: search(props.contentTypes, props.filterOn, props.orderBy)
    };
    if (newState.contentTypes[0]) {
      newState.focused = newState.contentTypes[0].machineName.toLocaleLowerCase().replace('.','-');
    }
    return newState;
  }

  changeSelected(dir) {
    this.choose.changeFocused(dir);
  }

  useSelected() {
    this.props.onUse(this.getLibrary(this.choose.getFocused()));
  }

  handleUse(event, contentType) {
    this.props.onUse(contentType);
    event.preventDefault();
  }

  getLibrary(id) {
    for (var i = 0; i < this.props.contentTypes.libraries.length; i++) {
      const library = this.props.contentTypes.libraries[i];
      if (library.machineName.toLocaleLowerCase().replace('.','-') === id) {
        return library;
      }
    }
  }

  render() {
    const apiVersion = this.props.contentTypes.apiVersion;

    const listItems = this.state.contentTypes.map(contentType => {
      // Determine if the content type is using an API version that is not yet supported
      const apiNotSupported = !(apiVersion.major > contentType.h5pMajorVersion ||
                               (apiVersion.major === contentType.h5pMajorVersion &&
                                apiVersion.minor >= contentType.h5pMinorVersion));

      // If the content type is restricted or requires a newer API, skip showing it
      if (contentType.restricted || (!contentType.installed && apiNotSupported)) {
        return;
      }

      let id = contentType.machineName.toLocaleLowerCase().replace('.','-');
      let tabindex = (this.state.focused === id ? 0 : -1);
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
      <ol className="content-type-list">
        <Choose selected={this.state.focused}
          onChange={id => this.props.onSelect(this.getLibrary(id))}
          onFocus={id => this.setState({focused: id})}
          ref={choose => this.choose = choose}>
          {listItems}
        </Choose>
      </ol>
    );
  }
}

export default List;
