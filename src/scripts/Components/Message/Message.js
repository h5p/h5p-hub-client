import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../utils/dictionary';

import './Message.scss';

class Message extends React.Component {

  createTroubleshootingURL(code) {
    return code ? `https://h5p.org/documentation/troubleshooting#${code}` : undefined;
  }

  render() {
    const className = `h5p-hub-message h5p-hub-${this.props.severity}` + (this.props.onClose ? ' h5p-hub-dismissible' : '');

    let messages = this.props.message;
    if (messages && !Array.isArray(messages)) {
      messages = [messages];
    }
    const messageDetails = messages
      ? messages.map((message, index) => {
        let text = message.message || message;
        let getHelpUrl = this.createTroubleshootingURL(message.code);

        return (
          <p key={index} className="h5p-hub-message-body">
            <span dangerouslySetInnerHTML={{__html: text}}/>
            {getHelpUrl &&
            <a className="h5p-hub-get-help" target="_blank" href={getHelpUrl}>
              {Dictionary.get('getHelp')}
            </a>
            }
          </p>

        );
      }) : null;

    return (
      <div className={className} role="alert">
        {
          this.props.onClose &&
          <button
            className="h5p-hub-message-close"
            tabIndex="0"
            aria-label={Dictionary.get('Close')}
            onClick={this.props.onClose}
          />
        }
        <div className="h5p-hub-message-content">
          <h2>{this.props.title}</h2>
          {messageDetails}
        </div>
        {this.props.children}
      </div>
    );
  }
}

Message.propTypes = {
  severity: PropTypes.oneOf(['info', 'warning', 'error']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default Message;
