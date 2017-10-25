import React from 'react';
import TabContent from './TabContent/TabContent';
import './TabPanel.scss';

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
                    className='tab-button'
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
              <TabContent key={tab.id} tab={tab} />
            )
          })
        }
      </div>
    );
  }
}

export default TabPanel;
