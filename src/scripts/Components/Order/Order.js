import React from 'react';
import PropTypes from 'prop-types';

import Choose from '../Choose/Choose';
import Dictionary from '../../utils/dictionary';

import './Order.scss';

const Order = ({ hits, selected, onChange, orderVisible, visible, orderVariables, headerLabel }) => {

  const listElement = orderVariables.map((orderVariable) =>
    <li key={orderVariable.id}>
      <a href="#" id={orderVariable.id}>
        {orderVariable.text}
      </a>
    </li>
  );

  return (
    <div className={'navbar' + (visible ? '' : ' hidden')}>
      <div className="result-header">
        {headerLabel}
        <span className="result-hits">
          ({Dictionary.get('numResults').replace(':num', hits)})
        </span>
      </div>
      {
        orderVisible &&
        <div id="sort-by" className="sort-by-header">
          {Dictionary.get('show')}:
        </div>
      }
      {
        orderVisible &&
        <ul className="sort-by-list" aria-labelledby="sort-by">
          <Choose selected={selected} onChange={onChange}>
            {listElement}
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
  visible: PropTypes.bool.isRequired,
  orderVariables: PropTypes.array.isRequired,
  orderVisible: PropTypes.bool.isRequired,
  headerLabel: PropTypes.string.isRequired
};

export default Order;
