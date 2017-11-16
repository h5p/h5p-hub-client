import React from 'react';
import PropTypes from 'prop-types';

import Choose from '../../../Choose/Choose';
import Dictionary from '../../../../utils/dictionary';

import './Order.scss';

const Order = ({hits, selected, onChange, hasRecentlyUsed, searching, visible}) => {
  return (
    <div className={'navbar' + (visible ? '' : ' hidden')}>
      <div className="result-header">
        {searching ? Dictionary.get('searchResults') : Dictionary.get('contentTypeSectionAll')}
        <span className="result-hits">
          ({Dictionary.get('numResults').replace(':num', hits)})
        </span>
      </div>
      {
        !searching &&
        <div id="sort-by" className="sort-by-header">
          {Dictionary.get('show')}:
        </div>
      }
      {
        !searching &&
        <ul className="sort-by-list" aria-labelledby="sort-by">
          <Choose selected={selected} onChange={onChange}>
            <li id="recently">
              {Dictionary.get(hasRecentlyUsed ? 'recentlyUsedFirst' : 'popularFirst')}
            </li>
            <li id="newest">{Dictionary.get('newestFirst')}</li>
            <li id="a-to-z">{Dictionary.get('aToZ')}</li>
          </Choose>
        </ul>
      }
    </div>
  );
};

Order.propTypes = {
  hits: PropTypes.number.isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hasRecentlyUsed: PropTypes.bool.isRequired,
  searching: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Order;
