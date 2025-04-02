import React from 'react';
import PropTypes from 'prop-types';
import './DropDownSelector.scss';

const DropDownSelector = ({togglePanel, isExpanded, sectionId, title, disabled}) => {

  const onPanelKeyUp = (e) => {
    if (e.which === 13 || e.which === 32) {
      togglePanel();
    }
  };

  return (
    <div className={'h5p-hub-client-drop-down' + (disabled ? ' h5p-hub-disabled' : '')} aria-level="1" role="heading">
      <div
        className="h5p-hub-icon-hub-icon"
        role="button"
        onClick={disabled ? null : togglePanel}
        onKeyUp={disabled ? null : onPanelKeyUp}
        aria-expanded={isExpanded.toString()}
        aria-controls={`h5p-hub-panel-body-${sectionId}`}
        tabIndex={disabled ? '-1' : '0'}
        aria-disabled={disabled ? 'true' : 'false'}
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