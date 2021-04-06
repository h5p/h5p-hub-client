import './ContentItemGrid.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../../../../utils/dictionary';
import ContentIcon from '../ContentIcon';

const ContentItemGrid = ({content}) => {
  return (
    <div className="h5p-hub-grid-item">
      <ContentIcon src={content.icon} />

      <div className="h5p-hub-grid-item-title">
        { content.title }
      </div>

      <button 
        type="button"
        className="h5p-hub-button h5p-hub-button-orange h5p-hub-button-inverse-primary"
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