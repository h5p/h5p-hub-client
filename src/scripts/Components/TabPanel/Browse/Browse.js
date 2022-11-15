import React from 'react';
import PropTypes from 'prop-types';

import Message from '../../Message/Message';
import Search from '../../Search/Search';
import Order from '../../Order/Order';
import List from './List/List';
import ContentType from './Detail/ContentType';
import NoContentTypesError from './NoContentTypesError/NoContentTypesError';
import search from '../../../utils/search.js';
import Dictionary from '../../../utils/dictionary';

class Browse extends React.Component {
  constructor(props) {
    super(props);

    const defaultOrderBy = 'recently';
    this.state = {
      orderBy: defaultOrderBy,
      contentTypes: search(props.contentTypes, null, defaultOrderBy),
      detailViewActive: false,
      warnOutdated: this.props.contentTypes.outdated
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => {

      // If there is a current selected library, we need to update it
      let library;
      if (state.library) {
        for (let i = 0; i < nextProps.contentTypes.libraries.length; i++) {
          const lib = nextProps.contentTypes.libraries[i];
          if (lib.machineName === state.library.machineName) {
            library = lib;
          }
        }
      }

      return {
        contentTypes: search(nextProps.contentTypes, state.filterOn, state.orderBy),
        retrying: undefined,
        library: library
      };
    });
  }

  handleDetailClose = () => {
    this.setState(state => ({
      detailViewActive: false,
      setFocus: !state.setFocus, // Toggle to trigger focus
    }));
  }

  handleDetailUse = (contentType) => {
    this.handleDetailClose();
    this.props.onUse(contentType);
  }

  handleListSelect = (library) => {
    this.setState({
      library: library,
      detailViewActive: true
    });
  }

  handleFilterOn = (keyword) => {
    // Search for keyword and close detail view if open
    this.setState({
      contentTypes: search(this.props.contentTypes, keyword, this.state.orderBy),
      filterOn: keyword,
      focused: null,
      detailViewActive: false
    });
  }

  handleOrderBy = (property) => {
    this.setState({
      contentTypes: search(this.props.contentTypes, null, property),
      orderBy: property,
      filterOn: '',
      focused: null,
    });
  }

  handleFocus = (focused) => {
    this.setState({
      focused: focused
    });
  }

  handleFocusMove = (direction) => {
    const focused = this.state.focused || this.state.contentTypes[0];

    for (let i = 0; i < this.state.contentTypes.length; i++) {
      if (focused === this.state.contentTypes[i]) {
        if (this.state.contentTypes[i + direction]) {
          this.setState({
            focused: this.state.contentTypes[i + direction]
          });
        }
        return;
      }
    }
  }

  handleSearchSelect = () => {
    // Use highlighted item
    const selected = this.state.focused || this.state.contentTypes[0];
    if (selected) {
      if (selected.installed) {
        this.props.onUse(selected);
      }
      else {
        this.handleListSelect(selected);
      }
    }
  }

  handleWarningClose = () => {
    this.setState({
      warnOutdated: false
    });
  }

  handleRetry = () => {
    this.setState({
      retrying: true
    });
    this.props.onReload();
  }

  render() {
    if (!this.props.contentTypes.libraries || !this.props.contentTypes.libraries.length) {
      // No content types available
      return (
        <NoContentTypesError
          throbbing={this.state.retrying}
          details={this.props.error}
          onRetry={this.handleRetry} />
      );
    }

    const hasRecentlyUsed = !!(this.props.contentTypes.recentlyUsed && this.props.contentTypes.recentlyUsed.length);

    const orderVariables = [{
      id: "recently",
      text: Dictionary.get(hasRecentlyUsed ? 'recentlyUsedFirst' : 'popularFirst')
    }, {
      id: "newest",
      text: Dictionary.get('newestFirst')
    }, {
      id: "a-to-z",
      text: Dictionary.get('aToZ')
    }];

    return (
      <div className="h5p-hub-content-type-section-view"> 

        <Search value={this.state.filterOn}
          auto={!this.state.detailViewActive}
          setFocus={this.props.setFocus}
          onSearch={this.handleFilterOn}
          onNavigate={this.handleFocusMove}
          onSelect={this.handleSearchSelect} 
          instantSearch={true}
          placeholder={Dictionary.get('contentTypeSearchCreatePlaceholder')}
        />
        {
          !!this.state.warnOutdated &&
          <Message
            severity='warning'
            title={Dictionary.get('contentTypeCacheOutdated')}
            message={Dictionary.get('contentTypeCacheOutdatedDesc')}
            onClose={this.handleWarningClose}
          />
        }

        <div className={'h5p-hub-content-type-section' + (this.state.warnOutdated ? ' h5p-hub-height-limit' : '') + (this.state.filterOn ? ' h5p-hub-filtering' : '')}>
          <Order hits={this.state.contentTypes.length}
            selected={this.state.orderBy}
            onChange={this.handleOrderBy}
            orderVariables={orderVariables}
            orderVisible={!this.state.filterOn}
            hasSearchResults={!!this.state.filterOn}
            visible={!this.state.detailViewActive}
            headerLabel={this.state.filterOn ? Dictionary.get('searchResults') : Dictionary.get('contentTypeSectionAll')} />
          <List contentTypes={this.state.contentTypes}
            apiVersion={this.props.contentTypes.apiVersion}
            focused={this.state.focused}
            setFocus={!this.state.setFocus}
            visible={!this.state.detailViewActive}
            onUse={this.props.onUse}
            onSelect={this.handleListSelect}
            onFocus={this.handleFocus} />
          <ContentType
            library={this.state.library}
            apiVersion={this.props.contentTypes.apiVersion}
            visible={this.state.detailViewActive}
            onUse={this.handleDetailUse}
            onClose={this.handleDetailClose}
            getAjaxUrl={this.props.getAjaxUrl}
            onInstall={this.props.onInstall} />
        </div>
      </div>
    );
  }
}

Browse.propTypes = {
  contentTypes: PropTypes.object.isRequired,
  setFocus: PropTypes.bool,
  getAjaxUrl: PropTypes.func.isRequired,
  onUse: PropTypes.func.isRequired,
  onInstall: PropTypes.func.isRequired
};

export default Browse;
