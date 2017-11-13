import React from 'react';

import Dictionary from '../../../../utils/dictionary';

import './ButtonBar.scss';

const ButtonBar = ({canInstall, installed, installing, updatable, onInstall, onUse}) => {
  let secondButtonType;
  let secondButtonDisabled = false;

  // Should we display the use button?
  let useButton = installed && !installing;

  // Should we display a secondary button?
  // (install, installing, update, updating)
  if (installed && updatable) {
    secondButtonType = installing ? 'Updating' : 'Update';
    secondButtonDisabled = installing;
  }
  else if (!canInstall) {
    secondButtonType = 'Install';
    secondButtonDisabled = true;
  }
  else if (!installed) {
    secondButtonType = installing ? 'Installing': 'Install';
    secondButtonDisabled = installing;
  }

  return (
    <div className="h5p-hub-content-type-detail-button-bar">
      {
        secondButtonType &&
        <button type="button"
          className={`button button-inverse-primary button-${secondButtonType.toLowerCase()}`}
          disabled={secondButtonDisabled}
          onClick={installing ? undefined : onInstall}
        >
          {Dictionary.get(`contentType${secondButtonType}ButtonLabel`)}
        </button>
      }
      {
        useButton &&
        <button type="button" className={"button button-primary button-use"} onClick={onUse}>
          {Dictionary.get("contentTypeUseButtonLabel")}
        </button>
      }

    </div>
  );
};

export default ButtonBar;