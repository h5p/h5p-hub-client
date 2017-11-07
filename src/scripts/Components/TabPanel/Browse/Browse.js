import React from 'react';

import Search from './Search/Search';
import Order from './Order/Order';
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
    // Use highlighted item
    const selected = this.state.focused || this.state.contentTypes[0];
    if (selected) {
      this.props.onUse(selected);
    }
  }

  render() {
    // TODO: Translate new text strings

    return (
      <div className="content-type-section-view loaded">

        <Search value={this.state.filterOn}
          auto={!this.state.detailViewActive}
          setFocus={this.props.setFocus}
          onFilter={this.handleFilterOn}
          onNavigate={this.handleFocusMove}
          onSelect={this.handleSelect}/>

        <Order hits={this.state.contentTypes.length}
          selected={this.state.orderBy}
          onChange={this.handleOrderBy}
          hasRecentlyUsed={!!(this.props.contentTypes.recentlyUsed && this.props.contentTypes.recentlyUsed.length)}
          visible={!this.state.detailViewActive}/>

        <div className="content-type-section">
          <List onUse={this.props.onUse}
            onSelect={this.handleOnLibrarySelect}
            onFocus={this.handleFocus}
            contentTypes={this.state.contentTypes}
            focused={this.state.focused}
            visible={!this.state.detailViewActive}/>
          <Detail
            library={this.state.library}
            visible={this.state.detailViewActive}
            onUse={this.props.onUse}
            onClose={this.handleDetailClose}/>
        </div>
      </div>
    );
  }
}

export default Browse;
