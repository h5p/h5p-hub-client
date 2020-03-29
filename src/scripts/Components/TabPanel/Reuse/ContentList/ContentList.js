import React from 'react';
import Async from 'react-async';
import PropTypes from 'prop-types';

import Message from '../../../Message/Message';
import List from '../../../List/List';
import Dictionary from '../../../../utils/dictionary';
import Loader from '../../../Loader/Loader';
import Pagination from '../../../Pagination/Pagination';
import ContentItemTabular from './ContentItemTabular';
import ContentItemGrid from './ContentItemGrid';

import './ContentList.scss';

const ContentList = ({
  itemsPromise,
  type,
  onSelect,
  visible,
  handlePageChange,
  showPagination
}) => {

  const contentLookup = {};
  const Item = (type === 'tabular') ? ContentItemTabular : ContentItemGrid;

  const createItems = (items) => items.map(item => {
    contentLookup[item.id] = {
      item: item
    };

    return (
      <li 
        className={`content-item ${type}`}
        key={item.id}
        id={item.id}
        ref={ref => contentLookup[item.id].listNode = ref}
      >
        <Item content={item}/>
      </li>
    );
  });

  /**
   * Handle selection of content
   * 
   * @param {string} id 
   */
  const handleSelect = id => {
    const content = contentLookup[id];
    onSelect({
      item: content.item,
      listNode: content.listNode
    });
  };

  return (
    <div className="content-list" aria-hidden={!visible}>
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
          <>
            <List type={type} onSelect={handleSelect}>
              {createItems(result.content)}
            </List>
            { 
              showPagination &&
              <Pagination
                selectedPage={result.page}
                pages={result.pages}
                onChange={handlePageChange}
                setFocus={false} />
            }
          </>
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
  visible: PropTypes.bool.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  showPagination: PropTypes.bool,
};

ContentList.defaultProps = {
  type: 'tabular',
  showPagination: true,
};

export default ContentList;