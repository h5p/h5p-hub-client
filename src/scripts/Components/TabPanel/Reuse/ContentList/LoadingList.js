import React from 'react';
import PropTypes from 'prop-types';
import List from '../../../List/List';
import Dictionary from '../../../../utils/dictionary';

import './LoadingList.scss';

const generateItems = (type, num) => {
  let items = [];
  for (let i = 0; i < num; i++) {
    items.push(type === 'tabular' ? (
      <li className={`h5p-hub-content-item h5p-hub-${type}`} key={i}>
        <div className='h5p-hub-left'>
          <div className='h5p-hub-loading-block h5p-hub-image'/>
        </div>

        <div className='h5p-hub-middle'>
          <div className='h5p-hub-loading-block h5p-hub-text-medium'></div>
          <div className='h5p-hub-loading-block h5p-hub-text-short'></div>
          <div className='h5p-hub-loading-block h5p-hub-text-long'></div>
        </div>
      </li>
    ) : (
      <li className={`h5p-hub-content-item h5p-hub-${type}`} key={i}>
        <div className='h5p-hub-grid-item'>
          <div className='h5p-hub-loading-block h5p-hub-image'></div>
          <div className='h5p-hub-loading-block h5p-hub-text-medium'></div>
          <div className='h5p-hub-loading-block h5p-hub-text-short'></div>
          <div className='h5p-hub-loading-block h5p-hub-button'></div>
        </div>
      </li>
    ));
  }

  return items;
};

const LoadingList = ({type}) => {
  return (
    <List 
      type={`${type}`}
      classNames="h5p-hub-loading"
      title={Dictionary.get('loading')}
      onSelect={() => {}}
    >
      { generateItems(type, 6) }
    </List>
  );
};

LoadingList.propTypes = {
  type: PropTypes.string.isRequired
};

export default LoadingList;