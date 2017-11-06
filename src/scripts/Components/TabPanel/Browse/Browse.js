import React from 'react';

import Choose from '../../Choose/Choose';

import Search from './Search/Search';
import List from './List/List';
import Detail from './Detail/Detail';

import search from '../../../utils/search.js';

class Browse extends React.Component {
  constructor(props) {
    super(props);

    const defaultOrderBy = 'recently';
    this.state = {
      orderBy: defaultOrderBy,
      contentTypes: search(props.contentTypes, null, defaultOrderBy),
      detailViewActive: false
    };
  }

  handleDetailClose = () => {
    this.setState({
      detailViewActive: false
    });
  }

  handleOnLibrarySelect = (library) => {
    this.setState({
      library: library,
      detailViewActive: true
    });
  }

  handleFilterOn = (keyword) => {
    this.setState({
      contentTypes: search(this.props.contentTypes, keyword, this.state.orderBy),
      filterOn: keyword,
      focused: null
    });
  }

  handleOrderBy = (property) => {
    this.setState({
      contentTypes: search(this.props.contentTypes, null, property),
      orderBy: property,
      filterOn: '',
      focused: null
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

  handleSelect = () => {
    this.props.onUse(this.state.focused || this.state.contentTypes[0]);
  }

  render() {
    // TODO: Focus search bar when loaded (or timeout 200 ?)
    // TODO: Translate new text strings

    return (
      <div className="content-type-section-view loaded">

        <Search onNavigate={this.handleFocusMove}
          onSelect={this.handleSelect}
          onFilter={this.handleFilterOn}
          value={this.state.filterOn}
          auto={!this.state.detailViewActive}/>

        <div className="navbar">
          <div className="result-header">All Content Types <span className="result-hits">({this.state.contentTypes.length} results)</span></div>

          <div id="sort-by" className="sort-by-header">Show:</div>
          <ul className="sort-by-list" aria-labelledby="sort-by">
            <Choose selected={this.state.orderBy} onChange={this.handleOrderBy}>
              <li id="recently">{this.props.contentTypes.recentlyUsed && this.props.contentTypes.recentlyUsed.length ? 'Recently Used First' : 'Popular First'}</li>
              <li id="newest">Newest First</li>
              <li id="a-to-z">A to Z</li>
            </Choose>
          </ul>
        </div>

        <div className="content-type-section">
          <List onUse={this.props.onUse}
            onSelect={this.handleOnLibrarySelect}
            onFocus={this.handleFocus}
            contentTypes={this.state.contentTypes}
            focused={this.state.focused}
          />
          <Detail
            library={this.state.library}
            visible={this.state.detailViewActive}
            onUse={this.props.onUse}
            onClose={this.handleDetailClose}
          />
        </div>
      </div>
    );
  }
}

export default Browse;
