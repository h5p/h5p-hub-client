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
        <span id='h5p-hub-hubowner' className='h5p-hub-hublabel'>{Dictionary.get('by')}: </span>
        <span aria-labelledby='h5p-hub-hubowner' className='h5p-hub-hubcontent'>{(content.owner)}</span>
      </li>
      <li>
        <span id='h5p-hub-hubh5p-type' className='h5p-hub-hublabel'>{Dictionary.get('h5pType') + ': '}</span>
        <span aria-labelledby='h5p-hub-hubh5p-type' className='h5p-hub-hubcontent'>{getH5PTitle(content.content_type)}</span>
      </li>
      <li>
        <span id='h5p-hub-hublanguage' className='h5p-hub-hublabel'>{Dictionary.get('language')}: </span>
        <span aria-labelledby='h5p-hub-hublanguage' className='h5p-hub-hubcontent'>{getLabel(content.language, 'language')}</span>
      </li>
      <li>
        <span id='h5p-hub-hubdiscipline' className='h5p-hub-hublabel h5p-hub-capitalize'>{Dictionary.get('in')}: </span>
        <span aria-labelledby='h5p-hub-hubdiscipline' className='h5p-hub-hubcontent'>
          {content.disciplines.map((discipline, i, arr) => getLabel(discipline, 'flatDisciplines') + (arr.length - 1 !== i ? ', ' : ''))}
        </span>
      </li>
      <li>
        <span id='h5p-hub-hublevel' className='h5p-hub-hublabel'>{Dictionary.get('level')}: </span>
        <span className='h5p-hub-hubcontent h5p-hub-capitalize' aria-labelledby='h5p-hub-hublevel'>{getLabel(content.level, 'level')}</span>
      </li>
      <li>
        <span id='h5p-hub-hubsize' className='h5p-hub-hublabel'>{Dictionary.get('size')}: </span>
        <span aria-labelledby='h5p-hub-hubsize' className='h5p-hub-hubcontent'>{filesize(content.size)}</span>
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
