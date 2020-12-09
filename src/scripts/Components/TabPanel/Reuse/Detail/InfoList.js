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
        <span id='h5p-hub-info-list-owner' className='h5p-hub-label'>{Dictionary.get('by')}: </span>
        <span aria-labelledby='h5p-hub-info-list-owner' className='h5p-hub-content'>{content.owner}</span>
      </li>
      <li>
        <span id='h5p-hub-h5p-info-list-type' className='h5p-hub-hublabel'>{Dictionary.get('h5pType') + ': '}</span>
        <span aria-labelledby='h5p-hub-hubh5p-type' className='h5p-hub-content'>{content.h5pTitle}</span>
      </li>
      <li>
        <span id='h5p-hub-info-list-language' className='h5p-hub-hublabel'>{Dictionary.get('language')}: </span>
        <span aria-labelledby='h5p-hub-info-list-language' className='h5p-hub-content'>{content.language}</span>
      </li>
      <li>
        <span id='h5p-hub-info-list-discipline' className='h5p-hub-hublabel h5p-hub-capitalize'>{Dictionary.get('in')}: </span>
        <span aria-labelledby='h5p-hub-info-list-discipline' className='h5p-hub-content'>
          {content.disciplines}
        </span>
      </li>
      <li>
        <span id='h5p-hub-info-list-level' className='h5p-hub-label'>{Dictionary.get('level')}: </span>
        <span className='h5p-hub-content h5p-hub-capitalize' aria-labelledby='h5p-hub-info-list-level'>{content.level}</span>
      </li>
      <li>
        <span id='h5p-hub-info-list-size' className='h5p-hub-label'>{Dictionary.get('size')}: </span>
        <span aria-labelledby='h5p-hub-info-list-size' className='h5p-hub-content'>{content.filesize}</span>
      </li>
    </ul>
  );
};

InfoList.propTypes = {
  content: contentDefinition,
};

export default InfoList;
