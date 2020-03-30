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
import LoadingList from './LoadingList';

import './ContentList.scss';

const ContentList = ({
  itemsPromise,
  type,
  onSelect,
  visible,
  handlePageChange,
  showPagination,
  focused,
  setFocus
}) => {

  const contentLookup = {};
  const Item = (type === 'tabular') ? ContentItemTabular : ContentItemGrid;

  const createItems = (items) => items.map((item, i) => {
    contentLookup[item.id] = item;
    return (
      <li className={`content-item ${type}`} id={item.id} key={i} tabIndex={i == 1}>
        <Item
          content={item}
          key={item.id}
          id={item.id}
        />
      </li>
    );
  });

  return (
    <div className="content-list" aria-hidden={!visible}>
      <Async promiseFn={itemsPromise}>
        <Async.Pending>
          <LoadingList type={type} />
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
          result.numResults ? (
            <>
              <List type={type} onSelect={id => onSelect(contentLookup[id], id)} selected={focused} setFocus={setFocus}>
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
          ) : null
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