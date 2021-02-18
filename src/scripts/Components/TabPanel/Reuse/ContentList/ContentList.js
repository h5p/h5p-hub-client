import React, {useMemo} from 'react';
import Async from 'react-async';
import PropTypes from 'prop-types';

import List from '../../../List/List';
import Dictionary from '../../../../utils/dictionary';
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
  setFocus,
  title
}) => {

  const listId = useMemo(() => {
    return (ContentList.listId++);
  }, []);


  const contentLookup = {};
  const Item = (type === 'tabular') ? ContentItemTabular : ContentItemGrid;

  const createItems = (items) => items.map((item, i) => {
    contentLookup[`h5p-hub-${listId}-${item.id}`] = item;
    return (
      <li className={`h5p-hub-content-item h5p-hub-${type}`} id={`h5p-hub-${listId}-${item.id}`} key={i} tabIndex={i == 1}>
        <Item
          content={item}
          key={item.id}
          id={item.id}
        />
      </li>
    );
  });

  return (
    <div className="h5p-hub-content-list" aria-hidden={!visible}>
      <Async promiseFn={itemsPromise}>
        <Async.Pending>
          <LoadingList type={type} />
        </Async.Pending>

        <Async.Rejected>{() =>
          <span className="h5p-hub-fetching-failed">
            {Dictionary.get('failedFetchingData')}
          </span>
        }
        </Async.Rejected>

        <Async.Fulfilled>{result =>
          result.numResults ? (
            <>
              <List
                type={type}
                onSelect={id => onSelect(contentLookup[id], id,type)}
                focused={focused}
                setFocus={setFocus}
                title={title}
              >
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
  handlePageChange: PropTypes.func,
  showPagination: PropTypes.bool,
  focused: PropTypes.string,
  setFocus: PropTypes.bool,
  title: PropTypes.string.isRequired
};

ContentList.defaultProps = {
  type: 'tabular',
  showPagination: true,
};

ContentList.listId = 0;

export default ContentList;