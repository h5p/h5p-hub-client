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
        <span id='h5p-hub-info-list-h5p-type' className='h5p-hub-label'>{Dictionary.get('h5pType') + ': '}</span>
        <span aria-labelledby='h5p-hub-h5p-type' className='h5p-hub-content'>{content.h5pTitle}</span>
      </li>
      <li>
        <span id='h5p-hub-info-list-language' className='h5p-hub-label'>{Dictionary.get('language')}: </span>
        <span aria-labelledby='h5p-hub-info-list-language' className='h5p-hub-content'>{content.language}</span>
      </li>
      {
        (content.disciplines && content.disciplines.length) ?
        <li>
          <span id='h5p-hub-info-list-discipline'
                className='h5p-hub-label h5p-hub-capitalize'>{Dictionary.get('in')}: </span>
          <span aria-labelledby='h5p-hub-info-list-discipline' className='h5p-hub-content'>
            {content.disciplines}
          </span>
        </li>
        : null
      }
      {
        content.level &&
        <li>
          <span id='h5p-hub-info-list-level' className='h5p-hub-label'>{Dictionary.get('level')}: </span>
          <span className='h5p-hub-content h5p-hub-capitalize' aria-labelledby='h5p-hub-info-list-level'>{content.level}</span>
        </li>
      }
      <li>
        <span id='h5p-hub-info-list-size' className='h5p-hub-label'>{Dictionary.get('size')}: </span>
        <span aria-labelledby='h5p-hub-info-list-size' className='h5p-hub-content'>{content.filesize}</span>
      </li>
      {
        content.age &&
        <li>
          <span id='h5p-hub-info-list-age' className='h5p-hub-label'>{Dictionary.get('age')}: </span>
          <span className='h5p-hub-content' aria-labelledby='h5p-hub-info-list-age'>{content.age}</span>
        </li>
      }
    </ul>
  );
};

InfoList.propTypes = {
  content: contentDefinition,
};

export default InfoList;
