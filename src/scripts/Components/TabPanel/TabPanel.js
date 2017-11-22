import React from 'react';
import PropTypes from 'prop-types';
import './TabPanel.scss';
import Choose from '../Choose/Choose';

class TabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
    };
  }

  handleSelect = id => {
    this.setState({ selected: id });
    this.props.onSelect(id);
  };

  render() {
    const tabButtons = React.Children.map(this.props.children, child => (
      <li
        className="tab-button"
        aria-selected={this.state.selected === child.props.id}
        aria-controls={`tab-panel-${child.props.id}`}
        role="tab"
        key={child.props.id}
      >
        <a id={child.props.id} href="#">
          {child.props.title}
        </a>
      </li>
    ));

    const tabContent = React.Children.map(this.props.children, child => (
      <div
        className={`tabpanel${this.state.selected === child.props.id
          ? ''
          : ' hidden'}`}
        id={`tab-panel-${child.props.id}`}
        aria-labelledby={child.props.id}
        role="tabpanel"
      >
        {child}
      </div>
    ));

    return (
      <div className="tab-panel">
        <nav>
          <ul role="tablist">
            <Choose
              selected={this.props.children[0].props.id}
              onChange={this.handleSelect}
            >
              {tabButtons}
            </Choose>
          </ul>
        </nav>
        {tabContent}
      </div>
    );
  }
}

TabPanel.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TabPanel;
