import React from 'react';
import filesize from 'filesize.js';
import { contentDefinition } from '../../../../utils/helpers';
import Dictionary from '../../../../utils/dictionary';

import './InfoList.scss';

const InfoList = ({
  content,
}) => {

  return (
    <ul>
      <li>
        <span id='owner' className='label'>{Dictionary.get('by')}: </span>
        <span aria-labelledby='owner' className='content'>{(content.owner)}</span>
      </li>
      <li>
        <span id='h5p-type' className='label'>{Dictionary.get('h5pType') + ': '}</span>
        <span aria-labelledby='h5p-type' className='content'>{content.content_type} TODO</span>
      </li>
      <li>
        <span id='language' className='label'>{Dictionary.get('language')}: </span>
        <span aria-labelledby='language' className='content'>{content.language} TODO</span>
      </li>
      <li>
        <span id='discipline' className='label capitalize'>{Dictionary.get('in')}: </span>
        <span aria-labelledby='discipline' className='content'>
          {content.disciplines.map((discipline, i, arr) => discipline + (arr.length - 1 !== i ? ', ' : ''))} TODO
        </span>
      </li>
      <li>
        <span id='level' className='label'>{Dictionary.get('level')}: </span>
        <span className='content capitalize' aria-labelledby='level'>{content.level} TODO</span>
      </li>
      <li>
        <span id='size' className='label'>{Dictionary.get('size')}: </span>
        <span aria-labelledby='size' className='content'>{filesize(content.size)}</span>
      </li>
    </ul>
  );
};

InfoList.propTypes = {
  content: contentDefinition
};

export default InfoList;
