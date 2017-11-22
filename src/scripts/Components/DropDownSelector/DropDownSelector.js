import React from 'react';
import PropTypes from 'prop-types';
import './DropDownSelector.scss';

const DropDownSelector = ({togglePanel, isExpanded, sectionId, title}) => {

  const onPanelKeyUp = (e) => {
    if (e.which === 13 || e.which === 32) {
      togglePanel();
    }
  };

  return (
    <div className="h5p-hub-client-drop-down" aria-level="1" role="heading">
      <div
        className="icon-hub-icon"
        role="button"
        onClick={togglePanel}
        onKeyUp={onPanelKeyUp}
        aria-expanded={isExpanded.toString()}
        aria-controls={`panel-body-${sectionId}`}
        tabIndex="0"
      >
        <span className="h5p-hub-description">H5P Hub.</span>
        <span className="h5p-hub-selected">{title}</span>
      </div>
    </div>
  );
};

DropDownSelector.propTypes = {
  togglePanel: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DropDownSelector;