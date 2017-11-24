import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {

  // Handle enter & space
  handleKeyDown = (event) => {
    if ([32,13].indexOf(event.which) !== -1) {
      event.preventDefault();

      // If anchor tag, simulate a click
      if (this.props.type === 'a') {
        this.element.click();
      }
      else {
        this.props.onButtonClick();
      }
    }
  }

  render() {

    const ButtonTag = this.props.type || 'div';

    // For anchors, the browser already handles the mouse click
    const ignoreMouseClick = (this.props.type === 'a');

    return (
      <ButtonTag
        {...this.props.buttonProps}
        role="button"
        tabIndex="0"
        onClick={() => ignoreMouseClick || this.props.onButtonClick()}
        onKeyDown={this.handleKeyDown}
        ref={button => this.element = button}
      >
        {this.props.children}
      </ButtonTag>
    );
  }
}

Button.propTypes = {
  onButtonClick: PropTypes.func,
  buttonProps: PropTypes.object,
  type: PropTypes.string,
  ignoreMouseClick: PropTypes.bool
};

export default Button;
