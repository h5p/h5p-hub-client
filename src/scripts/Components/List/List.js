import React from 'react';
import PropTypes from 'prop-types';
import Choose from '../Choose/Choose';

import './List.scss';

class List extends React.Component {
  render() {
    return (
      <div className={`h5p-hub-list ${this.props.type}`}>
        <ol ref={el => this.listElement = el}>
          <Choose onChange={this.props.onSelect}>
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
};

export default List;
