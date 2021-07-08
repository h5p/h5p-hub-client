import './ContentItemTabular.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../../../../utils/dictionary';
import { minimizeLongText } from '../../../../utils/helpers';
import ContentIcon from '../ContentIcon';

const ContentItemTabular = ({content}) => {
  return (
    <>
      <div className='h5p-hub-left'>
        <ContentIcon src={content.icon} />
      </div>

      <div className='h5p-hub-middle'>
        <div className='h5p-hub-headline'>
          <span className={`h5p-hub-title ${content.reviewed ? 'h5p-hub-reviewed' : ''}`}>
            {minimizeLongText(content.title)}
          </span>
          <span className='h5p-hub-by'>{Dictionary.get('by')}</span>
          <span className='h5p-hub-owner'>{minimizeLongText(content.owner, 50)}</span>
        </div>
        <div className='h5p-hub-content-type'>{content.contentType}</div>
        <div className='h5p-hub-summary'>{content.summary}</div>
      </div>
      
      <div className='h5p-hub-right'></div>
    </>
  );
};

ContentItemTabular.propTypes = {
  content: PropTypes.object.isRequired
};

export default ContentItemTabular;