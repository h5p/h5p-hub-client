import React from 'react';
import PropTypes from 'prop-types';
import List from '../../../List/List';
import Dictionary from '../../../../utils/dictionary';

import './LoadingList.scss';

const generateItems = (type, num) => {
  let items = [];
  for (let i = 0; i < num; i++) {
    items.push(type === 'tabular' ? (
      <li className={`content-item ${type}`} key={i}>
        <div className='left'>
          <div className='loading-block image'/>
        </div>

        <div className='middle'>
          <div className='loading-block text-medium'></div>
          <div className='loading-block text-short'></div>
          <div className='loading-block text-long'></div>
        </div>
      </li>
    ) : (
      <li className={`content-item ${type}`} key={i}>
        <div className='grid-item'>
          <div className='loading-block image'></div>
          <div className='loading-block text-medium'></div>
          <div className='loading-block text-short'></div>
          <div className='loading-block button'></div>
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
      classNames="loading"
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