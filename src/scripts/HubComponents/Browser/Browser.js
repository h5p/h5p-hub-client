import React from 'react';
import Search from '../Search/Search';
import Choose from '../Choose/Choose';
import List from '../List/List';
import LibraryDetail from '../Library/Detail';

class Browser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleOrderBy(propertyId) {
    console.log('Order By: ' + propertyId);
  }

  render() {

    // TODO: Add state: loaded / loading
    // TODO: Import displayMessage(config) (when loading fails)
    // TODO: Focus search bar when loaded (or timeout 200 ?)

    // TODO: Search service
    // TODO: List
    // TODO: Detail


    return (
      <div className="content-type-section-view loaded">

        <div className="menu-group">

          <Search/>

          <div className="navbar">
            <div className="result-header">All Content Types <span className="result-hits">(35 results)</span></div>

            <div id="sort-by" className="sort-by-header">Show:</div>
            <ul className="sort-by-list" aria-labelledby="sort-by">
              <Choose selected="recently" onChange={this.handleOrderBy.bind(this)}>
                <li id="recently">Recently Used First</li>
                <li id="newest">Newest First</li>
                <li id="a-to-z">A to Z</li>
              </Choose>
            </ul>
          </div>

        </div>

        <div className="content-type-section">
          <List onUse={id => console.log('Using ' + id)}
            onSelect={library => this.setState({library: library})}
            filterBy={this.state.filterBy}
            orderBy={this.state.orderBy}
            contentTypes={this.props.contentTypes}/>

          <LibraryDetail
            library={this.state.library}
            visible={true}/>
        </div>
      </div>
    );
  }
}

export default Browser;
