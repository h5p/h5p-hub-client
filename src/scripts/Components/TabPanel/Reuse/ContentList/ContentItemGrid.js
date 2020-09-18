import './ContentItemGrid.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../../../../utils/dictionary';
import ContentIcon from '../ContentIcon';

const ContentItemGrid = ({content}) => {
  return (
    <div className="grid-item">
      <ContentIcon src={content.icon} />

      <div className="grid-item-title">
        { content.title }
      </div>

      <button 
        type="button"
        className="button button-orange button-inverse-primary"        
        tabIndex="-1"
      >
        {Dictionary.get('contentTypeDetailButtonLabel')}
      </button>
    </div>
  );
};

ContentItemGrid.propTypes = {
  content: PropTypes.object.isRequired
};

export default ContentItemGrid;