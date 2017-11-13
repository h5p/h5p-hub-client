import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../utils/dictionary';

import './Message.scss';

class Message extends React.Component {

  render() {
    const className = `h5p-hub-message ${this.props.severity}` + (this.props.onClose ? ' dismissible' : '');

    return (
      <div className={className} role="alert">
        {
          this.props.onClose &&
          <button
            className="message-close"
            tabIndex="0"
            aria-label={Dictionary.get('closeButtonLabel')}
            onClick={this.props.onClose}
          />
        }
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

Message.propTypes = {
  severity: PropTypes.oneOf(['info', 'warning', 'error']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.array
};

export default Message;
