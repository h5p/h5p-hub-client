import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../../../../utils/dictionary';
import List from '../../../List/List';


import './LoadingList.scss';

const Item = ({type}) => Array.from(Array(6)).map(() => {
  return type === 'tabular' ? (
    <li className={`content-item ${type}`}>
      <div className='left'>
        <div className='loading-block image'/>
      </div>

      <div className='middle'>
        <div className='loading-block text-medium'></div>
        <div className='loading-block text-short'></div>
        <div className='loading-block text-long'></div>
      </div>
    </li>
  ): (
    <li className={`content-item ${type}`}>
      <div className='grid-item'>
        <div className='loading-block image'></div>
        <div className='loading-block text-medium'></div>
        <div className='loading-block text-short'></div>
        <div className='loading-block button'></div>
      </div>
    </li>
  );
});

const LoadingList = ({type}) => {
  return (
    <List type={`${type} loading`}>
      <Item type={type}/>
    </List>
  );
};

LoadingList.propTypes = {
  type: PropTypes.string.isRequired
};

export default LoadingList;