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
          <span
            className={`h5p-hub-title ${content.reviewed ? 'h5p-hub-reviewed' : ''}`}
            dangerouslySetInnerHTML={{ __html: minimizeLongText(content.title) }}
          />
          <span
            className='h5p-hub-by'
            dangerouslySetInnerHTML={{ __html: Dictionary.get('by') }} />
          <span
            className='h5p-hub-owner'
            dangerouslySetInnerHTML={{ __html: minimizeLongText(content.owner, 50) }} />
        </div>
        <div
          className='h5p-hub-content-type'
          dangerouslySetInnerHTML={{ __html: content.contentType }} />
        <div
          className='h5p-hub-summary'
          dangerouslySetInnerHTML={{ __html: content.summary }} />
      </div>

      <div className='h5p-hub-right'></div>
    </>
  );
};

ContentItemTabular.propTypes = {
  content: PropTypes.object.isRequired
};

export default ContentItemTabular;