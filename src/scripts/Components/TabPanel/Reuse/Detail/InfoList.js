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
        <span id='hubowner' className='hublabel'>{Dictionary.get('by')}: </span>
        <span aria-labelledby='hubowner' className='hubcontent'>{(content.owner)}</span>
      </li>
      <li>
        <span id='hubh5p-type' className='hublabel'>{Dictionary.get('h5pType') + ': '}</span>
        <span aria-labelledby='hubh5p-type' className='hubcontent'>{getH5PTitle(content.content_type)}</span>
      </li>
      <li>
        <span id='hublanguage' className='hublabel'>{Dictionary.get('language')}: </span>
        <span aria-labelledby='hublanguage' className='hubcontent'>{getLabel(content.language, 'language')}</span>
      </li>
      <li>
        <span id='hubdiscipline' className='hublabel capitalize'>{Dictionary.get('in')}: </span>
        <span aria-labelledby='hubdiscipline' className='hubcontent'>
          {content.disciplines.map((discipline, i, arr) => getLabel(discipline, 'flatDisciplines') + (arr.length - 1 !== i ? ', ' : ''))}
        </span>
      </li>
      <li>
        <span id='hublevel' className='hublabel'>{Dictionary.get('level')}: </span>
        <span className='hubcontent capitalize' aria-labelledby='hublevel'>{getLabel(content.level, 'level')}</span>
      </li>
      <li>
        <span id='hubsize' className='hublabel'>{Dictionary.get('size')}: </span>
        <span aria-labelledby='hubsize' className='hubcontent'>{filesize(content.size)}</span>
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
