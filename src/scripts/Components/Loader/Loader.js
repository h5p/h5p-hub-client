import React from 'react';
import PropTypes from 'prop-types';

import './Loader.scss';

const Loader = ({title, subtitle}) => {

  return (
    <div className='h5p-hub-loader'> 
      <span className='h5p-hub-spinner'></span>
      { 
        title &&
        <div className='h5p-hub-loader-title'>{title}</div>
      }
      { 
        subtitle &&
        <div className='h5p-hub-loader-subtitle'>{subtitle}</div>
      }
    </div>
  );
};

Loader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Loader;
