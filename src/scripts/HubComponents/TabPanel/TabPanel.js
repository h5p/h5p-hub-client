import React from 'react';
import './TabPanel.scss';

class TabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    };
  }

  handleSelect(id) {
    this.setState({selected: id});
  }

  render() {
    const tabButtons = React.Children.map(this.props.children, child => {
      return (
        <li id={`tab-${child.props.id}`}
          className='tab-button'
          aria-selected={this.state.selected === child.props.id}
          aria-controls={`tab-panel-${child.props.id}`}
          role='tab'
          key={child.props.id}
          onClick={this.handleSelect.bind(this, child.props.id)}>
          {child.props.title}
        </li>
      );
    });

    const tabContent = React.Children.map(this.props.children, child => {
      return (
        <div className={`tabpanel${this.state.selected === child.props.id ? '' : ' hidden'}`}
          id={`tab-panel-${child.props.id}`}
          aria-labelledby={`tab-${child.props.id}`}
          role='tabpanel'>
          {child}
        </div>
      );
    });

    return (
      <div className='tab-panel'>
        <nav>
          <ul role='tablist'>
            {tabButtons}
          </ul>
        </nav>
        {tabContent}
      </div>
    );
  }
}

export default TabPanel;
