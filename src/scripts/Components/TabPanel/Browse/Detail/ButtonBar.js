import React from 'react';

import Dictionary from '../../../../utils/dictionary';

const ButtonBar = ({canInstall, installed, installing, updating, updatable, onInstall, onUse}) => {
  //let installButton, useButton, updateButton, installDisabled;

  return null;

  /*let secondButtonType;
  let secondButtonDisabled = false;
  let secondButtonAction = function () {};

  if (installed && updatable) {
    secondButtonType += updating ? 'Updating' : 'Update';
    secondButtonAction = updating ? secondButtonAction : onInstall;
  }
  else if (!canInstall) {
    secondButtonType += 'Install';
    secondButtonDisabled = true;
  }
  else {
    secondButtonType += installing ? 'Installing': 'Install';
    secondButtonAction = installing ? secondButtonAction : onInstall;
  }

  // TODO - make max two buttons

  const secondButtonLabelKey = `contentType${secondButtonType}ButtonLabel`;
  const secondButtonClass = `button button-inverse-primary button-${secondButtonType.toLowerCase()}`;

  return (
    <div className="button-bar">
      <button type="button" className={secondButtonClass} disabled={secondButtonDisabled} onClick={secondButtonAction}>
        <span className="icon-arrow-thick"></span>
        {Dictionary.get(secondButtonLabelKey)}
      </button>
      <button type="button" className={"button button-primary button-use" + (useButton ? '' : ' hidden')} onClick={onUse}>
        {Dictionary.get("contentTypeUseButtonLabel")}
      </button>
    </div>
  );*/
};

export default ButtonBar;
