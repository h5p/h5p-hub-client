import React from 'react';
import Search from '../Search/Search';
import Choose from '../Choose/Choose';
import List from '../List/List';
import ContentTypeDetail from '../ContentType/Detail';

class Browse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailViewActive: false
    };

    this.handleDetailClose = this.handleDetailClose.bind(this);
    this.handleOnLibrarySelect = this.handleOnLibrarySelect.bind(this);
  }

  handleDetailClose() {
    this.setState({detailViewActive: false});
  }

  handleOnLibrarySelect(library) {
    this.setState({library: library, detailViewActive: true});
  }

  render() {
    // TODO: Focus search bar when loaded (or timeout 200 ?)

    return (
      <div className="content-type-section-view loaded">

        <div className="menu-group">

          <Search onSelectedChange={dir => this.list.changeSelected(dir)}
            onUseSelected={() => this.list.useSelected()}
            onFilterBy={query => this.setState({filterBy: query})}
            auto={!this.state.library}
            ref={search => this.search = search}/>

          <div className="navbar">
            <div className="result-header">All Content Types <span className="result-hits">(35 results)</span></div>

            <div id="sort-by" className="sort-by-header">Show:</div>
            <ul className="sort-by-list" aria-labelledby="sort-by">
              <Choose selected="recently" onChange={id => {this.setState({orderBy: id, filterBy: ''}); this.search.reset();}}>
                <li id="recently">Recently Used First</li>
                <li id="newest">Newest First</li>
                <li id="a-to-z">A to Z</li>
              </Choose>
            </ul>
          </div>

        </div>

        <div className="content-type-section">
          <List onUse={this.props.onUse}
            onSelect={this.handleOnLibrarySelect}
            filterBy={this.state.filterBy || ''}
            orderBy={this.state.orderBy || 'recently'}
            contentTypes={this.props.contentTypes}
            ref={list => this.list = list}
          />
          <ContentTypeDetail
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
