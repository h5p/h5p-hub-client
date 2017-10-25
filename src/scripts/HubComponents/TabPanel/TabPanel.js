import React from 'react';
import BrowseTab from './TabButton/TabButton';

class TabPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='tab-panel'>
        <nav>
          <ul role='tablist'>
            {
              this.props.tabConfigs.map(tab => {
                return (
                  <li
                    id={`tab-${tab.id}`}
                    aria-selected={tab.selected}
                    aria-controls={`tab-panel-${tab.id}`}
                    role='tab'
                    key={tab.id}
                    onClick={this.props.onSelectedTab.bind(this, tab.id)}
                  >
                    {tab.title}
                  </li>
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

export default TabPanel;
