import React from 'react';
import PropTypes from 'prop-types';

import Choose from '../../../Choose/Choose';

const Order = ({hits, selected, onChange, hasRecentlyUsed, visible}) => {

  return (
    <div className={'navbar' + (visible ? '' : ' hidden')}>
      <div className="result-header">All Content Types <span className="result-hits">({hits} results)</span></div>

      <div id="sort-by" className="sort-by-header">Show:</div>
      <ul className="sort-by-list" aria-labelledby="sort-by">
        <Choose selected={selected} onChange={onChange}>
          <li id="recently">{hasRecentlyUsed ? 'Recently Used First' : 'Popular First'}</li>
          <li id="newest">Newest First</li>
          <li id="a-to-z">A to Z</li>
        </Choose>
      </ul>
    </div>
  );
};

Order.propTypes = {
  hits: PropTypes.number.isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hasRecentlyUsed: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Order;
