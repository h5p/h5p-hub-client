import React from 'react';

import TabContentContainer from './TabContentContainer';

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
              <div key={tab.id}>
                <TabContentContainer tab={tab} />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default BrowseTabs;
