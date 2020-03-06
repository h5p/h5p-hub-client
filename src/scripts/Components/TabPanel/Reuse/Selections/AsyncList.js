import React from 'react';
import Async from 'react-async';
import PropTypes from 'prop-types';

import Layout from '../../../Layouts/Grid/Layout';
import Item from '../../../Layouts/Grid/Item';
import AsyncLoading from './AsyncLoading';

const AsyncList = ({title, itemsPromise, actionLabel, onAction}) => {

  const createItems = (items) => items.map(item => {
    return (
      <Item 
        key={item.id}
        title={item.title}
        actionLabel="Details"
      />
    );
  });

  return (
    <div className="">
      <div>
        <div>{title}</div>
        <a href="#" onClick={onAction}>{actionLabel}</a>
      </div>
      <Async promiseFn={itemsPromise}>
        <AsyncLoading/>
        
        <Async.Rejected>
          Rejected
        </Async.Rejected>

        <Async.Fulfilled>{items =>
          <Layout>
            {createItems(items)}
          </Layout>
        }
        </Async.Fulfilled>
      </Async>
    </div>
  );
};

AsyncList.propTypes = {
  title: PropTypes.string.isRequired,
  itemsPromise: PropTypes.func.isRequired,
  actionLabel: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired
};

export default AsyncList;