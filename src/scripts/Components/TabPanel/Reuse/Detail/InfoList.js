import React from 'react';
import { contentDefinition } from '../../../../utils/helpers';
import Dictionary from '../../../../utils/dictionary';

import './InfoList.scss';

const InfoList = ({
  content
}) => {
  return (
    <ul>
      <li>
        <span id='h5p-hub-hubowner' className='h5p-hub-hublabel'>{Dictionary.get('by')}: </span>
        <span aria-labelledby='h5p-hub-hubowner' className='h5p-hub-hubcontent'>{content.owner}</span>
      </li>
      <li>
        <span id='h5p-hub-hubh5p-type' className='h5p-hub-hublabel'>{Dictionary.get('h5pType') + ': '}</span>
        <span aria-labelledby='h5p-hub-hubh5p-type' className='h5p-hub-hubcontent'>{content.h5pTitle}</span>
      </li>
      <li>
        <span id='h5p-hub-hublanguage' className='h5p-hub-hublabel'>{Dictionary.get('language')}: </span>
        <span aria-labelledby='h5p-hub-hublanguage' className='h5p-hub-hubcontent'>{content.language}</span>
      </li>
      <li>
        <span id='h5p-hub-hubdiscipline' className='h5p-hub-hublabel h5p-hub-capitalize'>{Dictionary.get('in')}: </span>
        <span aria-labelledby='h5p-hub-hubdiscipline' className='h5p-hub-hubcontent'>
          {content.disciplines}
        </span>
      </li>
      <li>
        <span id='h5p-hub-hublevel' className='h5p-hub-hublabel'>{Dictionary.get('level')}: </span>
        <span className='h5p-hub-hubcontent h5p-hub-capitalize' aria-labelledby='h5p-hub-hublevel'>{content.level}</span>
      </li>
      <li>
        <span id='h5p-hub-hubsize' className='h5p-hub-hublabel'>{Dictionary.get('size')}: </span>
        <span aria-labelledby='h5p-hub-hubsize' className='h5p-hub-hubcontent'>{content.filesize}</span>
      </li>
    </ul>
  );
};

InfoList.propTypes = {
  content: contentDefinition,
};

export default InfoList;
