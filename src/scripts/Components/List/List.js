import React from 'react';
import PropTypes from 'prop-types';
import Choose from '../Choose/Choose';

import './List.scss';

class List extends React.Component {
  render() {
    return (
      <div className={`h5p-hub-list ${this.props.type}`}>
        <ol ref={el => this.listElement = el}>
          <Choose onChange={this.props.onSelect} selected={this.props.selected} setFocus={this.props.setFocus}>
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
  selected: PropTypes.string
};

export default List;
