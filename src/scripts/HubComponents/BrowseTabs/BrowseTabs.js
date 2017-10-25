import React from 'react';
import BrowseTab from './BrowseTab/BrowseTab';

class BrowseTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tab-panel">
        <nav>
          <ul>
            {
              this.props.tabConfigs.map(tab => {
                return (
                  <li key={tab.id}>{tab.title}</li>
                );
              })
            }
          </ul>
        </nav>
        {
          this.props.tabConfigs.map(tab => {
            return (
              <BrowseTab key={tab.id} tab={tab} />
            )
          })
        }
      </div>
    );
  }
}

export default BrowseTabs;
