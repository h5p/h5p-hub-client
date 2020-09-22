import React from 'react';
import PropTypes from 'prop-types';

import Message from '../../../Message/Message';
import Dictionary from '../../../../utils/dictionary';

const NoContentTypesError = ({throbbing, details, onRetry}) => {

  // Start by adding human understandable title
  let messages = [Dictionary.get('noContentTypesAvailableDesc')];

  // Add all details messages
  if (details && details.title) {
    messages.push(details.title);
    if (details.details) {
      messages = messages.concat(details.details);
    }
  }

  return (
    <Message
      severity='error'
      title={Dictionary.get('noContentTypesAvailable')}
      message={messages}>
      <button type="h5p-hub-button" className="h5p-hub-button h5p-hub-button-primary h5p-hub-retry-button"
        tabIndex="0" onClick={onRetry} disabled={throbbing}>
        {Dictionary.get('tryAgain')}
      </button>
    </Message>
  );
};

NoContentTypesError.propTypes = {
  throbbing: PropTypes.bool,
  details: PropTypes.object,
  onRetry: PropTypes.func.isRequired
};

NoContentTypesError.defaultProps = {
  throbbing: false,
};

export default NoContentTypesError;
