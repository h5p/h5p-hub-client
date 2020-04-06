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
        <span aria-labeledby='owner' className='content'>{(content.owner)}</span>
      </li>
      <li>
        <span id='h5pType' className='label'>{Dictionary.get('h5pType') + ': '}</span>
        <span aria-labeledby='h5pType' className='content'>{content.contentType}</span>
      </li>
      <li>
        <span id='language' className='label'>{Dictionary.get('language')}: </span>
        <span aria-labeledby='language' className='content'>{content.language.label}</span>
      </li>
      <li>
        <span id='discipline' className='label'>{Dictionary.get('in')}: </span>
        <span aria-labeledby='discipline' className='content'>
          {content.discipline.map((discipline, i, arr) => discipline.label + (arr.length - 1 !== i ? ', ' : ''))}
        </span>
      </li>
      <li>
        <span id='level' className='label'>{Dictionary.get('level')}: </span>
        <span className='content' aria-labelledby='level'>{content.level.slice(0, 1).toUpperCase() + content.level.slice(1)}</span>
      </li>
      <li className='last-item'>
        <span id='size' className='label'>{Dictionary.get('size')}: </span>
        <span aria-labeledby='size' className='content'>{filesize(content.size)}</span>
      </li>
    </ul>
  );
};

InfoList.propTypes = {
  content: contentDefinition
};

export default InfoList;