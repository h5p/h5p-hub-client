import React from 'react';
import Async from 'react-async';
import PropTypes from 'prop-types';

import Choose from '../Choose/Choose';
import Dictionary from '../../utils/dictionary';

import './Order.scss';

const Order = ({ searchPromise, selected, onChange, orderVisible = true, visible, orderVariables, headerLabel }) => {

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
        { 
          searchPromise &&
          <span className="result-hits">
            <Async promiseFn={searchPromise}>
              <Async.Fulfilled>{result =>
                `(${Dictionary.get('numResults').replace(':num', result.numResults)})`
              }
              </Async.Fulfilled>
            </Async>
          </span>
        }
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
  searchPromise: PropTypes.func,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  orderVariables: PropTypes.array.isRequired,
  orderVisible: PropTypes.bool,
  headerLabel: PropTypes.string.isRequired
};

export default Order;
