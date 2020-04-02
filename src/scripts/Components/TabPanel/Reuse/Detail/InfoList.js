import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize.js';


import Dictionary from '../../../../utils/dictionary';

import './InfoList.scss';

const InfoList = ({
  content,
}) => {

  return (
    <ul>
      <li>
        <span className='label'>{Dictionary.get('by')}: </span>
        <span className='content'>{(content.owner)}</span>
      </li>
      <li>
        <span className='label'>{Dictionary.get('h5pType') + ': '}</span>
        <span className='content'>{content.contentType}</span>
      </li>
      <li>
        <span className='label'>{Dictionary.get('language')}: </span>
        <span className='content'>{content.language.label}</span>
      </li>
      <li>
        <span className='label'>{Dictionary.get('in')}: </span>
        <span className='content'>
          {content.discipline.map((discipline, i, arr) => discipline.label + (arr.length - 1 !== i ? ', ' : ''))}
        </span>
      </li>
      <li>
        <span className='label'>{Dictionary.get('level')}: </span>
        <span className='content'>{content.level.slice(0, 1).toUpperCase() + content.level.slice(1)}</span>
      </li>
      <li className='last-item'>
        <span className='label'>{Dictionary.get('size')}: </span>
        <span className='content'>{filesize(content.size)}</span>
      </li>
    </ul>
  );
};

InfoList.propTypes = {
  content: PropTypes.object.isRequired
};

export default InfoList;