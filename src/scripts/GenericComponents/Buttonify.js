import React from 'react';

class Buttonify extends React.Component {

  // Handle enter & space
  handleKeyDown(child, event) {
    if ([32,13].indexOf(event.which) !== -1) {
      event.preventDefault();
      child.props.onButtonClick();
    }
  }

  render() {
    return React.Children.map(this.props.children, child => {
      return (
        <child.type
          {...child.props}
          role="button"
          tabIndex="0"
          onClick={() => child.props.onButtonClick()}
          onKeyDown={(event) => this.handleKeyDown(child, event)}
        />
      );
    });
  }
}

export default Buttonify;
