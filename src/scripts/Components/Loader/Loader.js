import React from 'react';
import PropTypes from 'prop-types';

import './Loader.scss';

const Loader = ({title, subtitle}) => {

  return (
    <div className='loader'> 
      <span className='spinner'></span>
      { 
        title &&
        <div className='loader-title'>{title}</div>
      }
      { 
        subtitle &&
        <div className='loader-subtitle'>{subtitle}</div>
      }
    </div>
  );
};

Loader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Loader;
