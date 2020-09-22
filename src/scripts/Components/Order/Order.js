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
    <div className={'h5p-hub-navbar' + (visible ? '' : ' h5p-hub-hidden')}>
      <div className="h5p-hub-result-header">
        {headerLabel}
        { 
          searchPromise &&
          <span className="h5p-hub-result-hits">
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
        <div id="h5p-hub-sort-by" className="h5p-hub-sort-by-header">
          {Dictionary.get('show')}:
        </div>
      }
      {
        orderVisible &&
        <ul className="h5p-hub-sort-by-list" aria-labelledby="h5p-hub-sort-by">
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
