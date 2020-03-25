import React from 'react';
import Async from 'react-async';
import PropTypes from 'prop-types';

import Layout from '../../../Layouts/Grid/Layout';
import Item from '../../../Layouts/Grid/Item';
import Message from '../../../Message/Message';

import './AsyncList.scss';

const AsyncList = ({title, itemsPromise, actionLabel, onAction}) => {

  const createItems = (items) => items.map(item => {
    return (
      <Item 
        key={item.id}
        title={item.title}
        image={item.icon}
        actionLabel="Details"
      />
    );
  });

  return (
    <div className="content-selection-list">
      <div className="header">
        <div className="title">{title}</div>
        <a className="action" href="#" onClick={onAction}>{actionLabel}</a>
      </div>
      <Async promiseFn={itemsPromise}>
        <Async.Pending>
          Loading...
        </Async.Pending>
        
        <Async.Rejected>{(a, data) =>
          <Message 
            title='Failed fetching data'
            severity='error'
            message={data.error.message}
          />
        }
        </Async.Rejected>

        <Async.Fulfilled>{result =>
          <Layout>
            {createItems(result.content)}
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