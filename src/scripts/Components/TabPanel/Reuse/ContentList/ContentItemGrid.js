import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../../../../utils/dictionary';

import './ContentItemGrid.scss';

const ContentItemGrid = ({content, onOpenDetails}) => {
  return (
    <div className="grid-item">
      <img src={content.icon} />

      <div className="grid-item-title">
        { content.title }
      </div>

      <button 
        type="button"
        className="button button-orange button-inverse-primary"        
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