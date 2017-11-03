import React from 'react';

import Dictionary from '../../../../utils/dictionary';

class ButtonBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let install, use, installing, update, updating, installDisabled;

    if (this.props.installed) {
      updating = this.props.updating;
      use = !updating;
      update = this.props.updatable && !updating;
    }
    else if (!this.props.canInstall) {
      install = true;
      installDisabled = true;
    }
    else {
      installing = this.props.installing;
      install = !installing;
    }

    return (
      <div className="button-bar">
        <button type="button" className={"button button-inverse-primary button-install" + (install ? '' : ' hidden')} disabled={installDisabled} onClick={this.props.onInstall}>
          <span className="icon-arrow-thick"></span>
          {Dictionary.get('contentTypeInstallButtonLabel')}
        </button>
        <button type="button" className={"button button-inverse-primary button-installing" + (installing ? '' : ' hidden')}>
          <span className="icon-loading-search icon-spin"></span>
          {Dictionary.get("contentTypeInstallingButtonLabel")}
        </button>
        <button type="button" className={"button button-inverse-primary button-update" + (update ? '' : ' hidden')} onClick={this.props.onInstall}>
          {Dictionary.get("contentTypeUpdateButtonLabel")}
        </button>
        <button type="button" className={"button button-inverse-primary button-updating" + (updating ? '' : ' hidden')}>
          <span className="icon-loading-search icon-spin"></span>
          {Dictionary.get("contentTypeUpdatingButtonLabel")}
        </button>
        <button type="button" className={"button button-primary button-use" + (use ? '' : ' hidden')} onClick={this.props.onUse}>
          {Dictionary.get("contentTypeUseButtonLabel")}
        </button>
      </div>
    );
  }
}

export default ButtonBar;
