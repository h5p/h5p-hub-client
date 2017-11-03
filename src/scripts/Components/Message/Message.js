import React from 'react';

import Dictionary from '../../utils/dictionary';

class Message extends React.Component {

  render() {
    var className = `message ${this.props.severity}` + (this.props.dismissible ? ' dismissible' : '');

    return (
      <div className={className} role="alert">
        <button
          className="message-close"
          tabIndex="0"
          aria-label={Dictionary.get('closeButtonLabel')}
          onClick={this.props.onClose}
        />
        <div className="message-content">
          <h2>{this.props.title}</h2>
          {
            this.props.message &&
            <p className="message-body">
              {this.props.message}
            </p>
          }
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Message;

export const severityLevels = {
  info: 0,
  warning: 1,
  error: 2,
};
