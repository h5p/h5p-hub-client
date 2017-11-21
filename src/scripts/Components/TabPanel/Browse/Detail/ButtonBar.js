import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';

import './ButtonBar.scss';

class ButtonBar extends React.Component {

  constructor(props) {
    super(props);
    this.focusUseButton = this.focusUseButton.bind(this);
  }

  focusUseButton() {
    if (this.useButton) {
      this.useButton.focus();
    }
    else {
      this.installButton.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.focus) {
      this.focusUseButton();
    }
  }

  render() {
    let secondButtonType;
    let secondButtonDisabled = false;

    // Should we display the use button?
    const useButton = this.props.installed && !this.props.installing;

    // Should we display a secondary button?
    // (install, installing, update, updating)
    if (this.props.installed && this.props.updatable) {
      secondButtonType = this.props.installing ? 'Updating' : 'Update';
      secondButtonDisabled = this.props.installing;
    }
    else if (this.props.canInstall === false) {
      secondButtonType = 'Install';
      secondButtonDisabled = true;
    }
    else if (!this.props.installed) {
      secondButtonType = this.props.installing ? 'Installing': 'Install';
      secondButtonDisabled = this.props.installing;
    }

    return (
      <div className="h5p-hub-content-type-detail-button-bar">
        {
          secondButtonType &&
          <button type="button"
            className={`button button-inverse-primary button-${secondButtonType.toLowerCase()}`}
            disabled={secondButtonDisabled}
            onClick={this.props.installing ? undefined : this.props.onInstall}
            ref={(button) => {this.installButton = button; }}
          >
            {Dictionary.get(`contentType${secondButtonType}ButtonLabel`)}
          </button>
        }
        {
          useButton &&
          <button type="button"
            className={"button button-primary button-use"}
            onClick={this.props.onUse}
            ref={(button) => {this.useButton = button; }}
          >
            {Dictionary.get("contentTypeUseButtonLabel")}
          </button>
        }

      </div>
    );
  }
}

ButtonBar.propTypes = {
  canInstall: PropTypes.bool.isRequired,
  installed: PropTypes.bool.isRequired,
  installing: PropTypes.bool.isRequired,
  updatable: PropTypes.bool.isRequired,
  onInstall: PropTypes.func.isRequired,
  onUse: PropTypes.func.isRequired
};

export default ButtonBar;
