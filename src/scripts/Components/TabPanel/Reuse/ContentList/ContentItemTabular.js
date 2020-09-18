import './ContentItemTabular.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../../../../utils/dictionary';
import { minimizeLongText } from '../../../../utils/helpers';
import ContentIcon from '../ContentIcon';

const ContentItemTabular = ({content}) => {
  return (
    <>
      <div className='left'>
        <ContentIcon src={content.icon} />
      </div>

      <div className='middle'>
        <div className='headline'>
          <span className={`title ${content.reviewed ? 'reviewed' : ''}`}>
            {minimizeLongText(content.title)}
          </span>
          <span className='by'>{Dictionary.get('by')}</span>
          <span className='owner'>{minimizeLongText(content.owner, 50)}</span>
        </div>
        <div className='content-type'>{content.contentType}</div>
        <div className='summary'>{content.summary}</div>
      </div>
      
      <div className='right'></div>
    </>
  );
};

ContentItemTabular.propTypes = {
  content: PropTypes.object.isRequired
};

export default ContentItemTabular;