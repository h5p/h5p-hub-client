import React from 'react';
import PropTypes from 'prop-types';
import './TabPanel.scss';
import Choose from '../Choose/Choose';
import Dictionary from '../../utils/dictionary';

class TabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    };
  }

  handleSelect = (id) => {
    this.setState({selected: id});
    this.props.onSelect(id);
  }

  render() {
    const tabButtons = React.Children.map(this.props.children, child => (
      <li
        className='h5p-hub-tab-button'
        aria-selected={this.state.selected === child.props.id}
        aria-controls={`h5p-hub-tab-panel-${child.props.id}`}
        role='tab'
        key={child.props.id}>
        <a id={child.props.id} href="#">{child.props.title}</a>
      </li>
    ));

    const tabContent = React.Children.map(this.props.children, child => (
      <div className={`h5p-hub-tabpanel${this.state.selected === child.props.id ? '' : ' h5p-hub-hidden'}`}
        id={`h5p-hub-tab-panel-${child.props.id}`}
        aria-labelledby={child.props.id}
        role='tabpanel'>
        {child}
      </div>
    ));

    return (
      <div className='h5p-hub-tab-panel'>
        <nav>
          {
            !!window.localStorage &&
            <div className="h5peditor-copypaste-wrap">
              <button
                id="h5peditor-hub-paste-button"
                className={`h5peditor-paste-button ${!this.props.canPaste ? 'disabled' : ''}`}
                disabled={!this.props.canPaste}
                title={this.props.canPaste ? Dictionary.get('pasteFromClipboard') : this.props.canPasteTitle}
                onClick={this.props.onPaste}
              >
                {Dictionary.get('pasteButton')}
              </button>
            </div>
          }
          <ul role='tablist'>
            <Choose
              selected={this.props.children[0].props.id}
              onChange={this.handleSelect}>
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
