import React from 'react';
import filesize from 'filesize.js';
import { contentDefinition } from '../../../../utils/helpers';
import Dictionary from '../../../../utils/dictionary';

import './InfoList.scss';
import PropTypes from 'prop-types';

const InfoList = ({
  content,
  getH5PTitle,
  getLabel
}) => {

  return (
    <ul>
      <li>
        <span id='owner' className='label'>{Dictionary.get('by')}: </span>
        <span aria-labelledby='owner' className='content'>{(content.owner)}</span>
      </li>
      <li>
        <span id='h5p-type' className='label'>{Dictionary.get('h5pType') + ': '}</span>
        <span aria-labelledby='h5p-type' className='content'>{getH5PTitle(content.content_type)}</span>
      </li>
      <li>
        <span id='language' className='label'>{Dictionary.get('language')}: </span>
        <span aria-labelledby='language' className='content'>{getLabel(content.language, 'language')}</span>
      </li>
      <li>
        <span id='discipline' className='label capitalize'>{Dictionary.get('in')}: </span>
        <span aria-labelledby='discipline' className='content'>
          {content.disciplines.map((discipline, i, arr) => getLabel(discipline, 'flatDisciplines') + (arr.length - 1 !== i ? ', ' : ''))}
        </span>
      </li>
      <li>
        <span id='level' className='label'>{Dictionary.get('level')}: </span>
        <span className='content capitalize' aria-labelledby='level'>{getLabel(content.level, 'level')}</span>
      </li>
      <li>
        <span id='size' className='label'>{Dictionary.get('size')}: </span>
        <span aria-labelledby='size' className='content'>{filesize(content.size)}</span>
      </li>
    </ul>
  );
};

InfoList.propTypes = {
  content: contentDefinition,
  getLabel: PropTypes.func.isRequired,
  getH5PTitle: PropTypes.func.isRequired,
};

export default InfoList;
