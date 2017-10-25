import React from 'react';

class ErrorMessage extends React.Component {
  // TODO: HFP-1651

  render() {
    return (
      <div>{this.props.errorMessage}</div>
    )
  }
}

export default ErrorMessage;

export const severityLevels = {
  info: 0,
  warning: 1,
  error: 2,
};