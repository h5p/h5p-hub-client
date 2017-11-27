import React from 'react';
import PropTypes from 'prop-types';

import {onSpaceOrEnterEvent} from '../../utils/helpers';

class Button extends React.Component {
  render() {

    const ButtonTag = this.props.type || 'div';

    return (
      <ButtonTag
        {...this.props.buttonProps}
        role="button"
        tabIndex="0"
        onClick={() => this.props.onButtonClick()}
        onKeyPress={(event) => onSpaceOrEnterEvent(event, this.props.onButtonClick)}
      >
        {this.props.children}
      </ButtonTag>
    );
  }
}

Button.propTypes = {
  onButtonClick: PropTypes.func,
  buttonProps: PropTypes.object,
  type: PropTypes.string
};

export default Button;
