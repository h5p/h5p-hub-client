import React from 'react';

import Choose from '../../Choose/Choose';

import Search from './Search/Search';
import List from './List/List';
import Detail from './Detail/Detail';

class Browse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOn: '',
      orderBy: 'recently',
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
      filterOn: keyword
    });
  }

  handleOrderBy = (property) => {
    this.setState({
      orderBy: property,
      filterOn: ''
    });
  }

  render() {
    // TODO: Focus search bar when loaded (or timeout 200 ?)
    // TODO: Translate new text strings

    return (
      <div className="content-type-section-view loaded">

        <Search value={this.state.filterOn}
          auto={!this.state.detailViewActive}
          onNavigate={dir => this.list.changeSelected(dir)}
          onSelect={() => this.list.useSelected()}
          onFilter={this.handleFilterOn}/>

        <div className="navbar">
          <div className="result-header">All Content Types <span className="result-hits">(35 results)</span></div>

          <div id="sort-by" className="sort-by-header">Show:</div>
          <ul className="sort-by-list" aria-labelledby="sort-by">
            <Choose selected={this.state.orderBy} onChange={this.handleOrderBy}>
              <li id="recently">Recently Used First</li>
              <li id="newest">Newest First</li>
              <li id="a-to-z">A to Z</li>
            </Choose>
          </ul>
        </div>

        <div className="content-type-section">
          <List onUse={this.props.onUse}
            onSelect={this.handleOnLibrarySelect}
            filterOn={this.state.filterOn}
            orderBy={this.state.orderBy}
            contentTypes={this.props.contentTypes}
            ref={list => this.list = list}
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
