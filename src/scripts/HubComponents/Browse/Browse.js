import React from 'react';
import Search from '../Search/Search';
import Choose from '../Choose/Choose';
import List from '../List/List';
import LibraryDetail from '../Library/Detail';

class Browse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOn: '',
      orderBy: 'recently',
      library: null
    };
  }

  render() {
    // TODO: Focus search bar when loaded (or timeout 200 ?)
    // TODO: Translate new text strings

    return (
      <div className="content-type-section-view loaded">

        <div className="menu-group">

          <Search value={this.state.filterOn}
            auto={!this.state.library}
            onNavigate={dir => this.list.changeSelected(dir)}
            onSelect={() => this.list.useSelected()}
            onFilter={query => this.setState({filterOn: query})}/>

          <div className="navbar">
            <div className="result-header">All Content Types <span className="result-hits">(35 results)</span></div>

            <div id="sort-by" className="sort-by-header">Show:</div>
            <ul className="sort-by-list" aria-labelledby="sort-by">
              <Choose selected={this.state.orderBy} onChange={id => this.setState({orderBy: id, filterOn: ''})}>
                <li id="recently">Recently Used First</li>
                <li id="newest">Newest First</li>
                <li id="a-to-z">A to Z</li>
              </Choose>
            </ul>
          </div>

        </div>

        <div className="content-type-section">
          <List onUse={this.props.onUse}
            onSelect={library => this.setState({library: library})}
            filterOn={this.state.filterOn}
            orderBy={this.state.orderBy}
            contentTypes={this.props.contentTypes}
            ref={list => this.list = list}
          />
          {
            this.state.library &&
            <LibraryDetail
              library={this.state.library}
              onUse={this.props.onUse}
              onClose={() => this.setState({library: null})}
            />
          }
        </div>
      </div>
    );
  }
}

export default Browse;
