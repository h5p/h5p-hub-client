import React from 'react';

class Button extends React.Component {

  // Handle enter & space
  handleKeyDown(event) {
    if ([32,13].indexOf(event.which) !== -1) {
      event.preventDefault();
      this.props.onButtonClick();
    }
  }

  render() {
    return (
      <div
        {...this.props.buttonProps}
        role="button"
        tabIndex="0"
        onClick={() => this.props.onButtonClick()}
        onKeyDown={(event) => this.handleKeyDown(event)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
