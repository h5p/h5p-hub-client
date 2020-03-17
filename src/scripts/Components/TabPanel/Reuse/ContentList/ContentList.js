import React from 'react';
import Async from 'react-async';
import PropTypes from 'prop-types';

import Message from '../../../Message/Message';
import List from '../../../List/List';
import Dictionary from '../../../../utils/dictionary';
import Loader from '../../../Loader/Loader';
import ContentItemTabular from './ContentItemTabular';

import './ContentList.scss';

const ContentList = ({itemsPromise, type = 'tabular', onSelect}) => {
  const createItems = (items) => items.map((item, i) => {
    return (type === 'tabular') ? (
      <li className="content-item tabular" id={item.id} key={i} tabIndex={i==1}>
        <ContentItemTabular 
          content={item}
          key={item.id}
          id={item.id}
        />
      </li>
    ) : (
      <div>GRID item here</div>
    );
  });

  return (
    <div className="content-list">
      <Async promiseFn={itemsPromise}>
        <Async.Pending>
          <Loader
            title={Dictionary.get('loadingContentTitle')}
            subtitle={Dictionary.get('loadingContentSubtitle')} 
          />
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
          <List type={type} onSelect={onSelect}>
            {createItems(result.content)}
          </List>
        }
        </Async.Fulfilled>
      </Async>
    </div>
  );
};

ContentList.propTypes = {
  itemsPromise: PropTypes.func.isRequired,
  type: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default ContentList;