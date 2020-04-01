import React from 'react';
import PropTypes from 'prop-types';
import Choose from '../Choose/Choose';

import './List.scss';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      setFocus: false,
      focused: ''
    };
  }

  /**
   * Set focus to the tabular list after a rerender, if setFocus are true
   */
  componentDidMount() {
    if (this.props.type === 'tabular' && this.props.setFocus) {
      this.setState(prevState => ({
        setFocus: !prevState.setFocus
      }));
    }
  }

  /**
   * Set focus to the list and updates focused if it exists in this list
   * @param  {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.setFocus !== this.props.setFocus && this.focusedExits()) {
      this.setState(prevState => ({
        setFocus: !prevState.setFocus,
        focused: this.props.focused
      }));
    }
  }

  /**
   * Check if the focused element is one of the lists children
   */
  focusedExits = () => {
    for (let i = 0; i < this.props.children.length; i++) {
      if (this.props.children[i].props.id === this.props.focused) {
        return true;
      }
    }
    return false;
  }

  render() {

    return (
      <div className={`h5p-hub-list ${this.props.type}`}>
        <ol ref={el => this.listElement = el}>
          <Choose onChange={this.props.onSelect} selected={this.state.focused} setFocus={this.state.setFocus}>
            {this.props.children}
          </Choose>
        </ol>
      </div>
    );
  }
}

List.propTypes = {
  type: PropTypes.oneOf(['tabular', 'grid']).isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  onSelect: PropTypes.func.isRequired,
  focused: PropTypes.string,
  setFocus: PropTypes.bool
};

export default List;
