import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';

const NoContentTypesError = ({throbbing, hint, onRetry}) => (
  <Message
    severity='error'
    title={Dictionary.get('noContentTypesAvailable')}
    message={[Dictionary.get('noContentTypesAvailableDesc'), hint.title].concat(hint.details)}>
    <button type="button" className="button button-primary retry-button"
      tabIndex="0" onClick={onRetry} disabled={throbbing}>
      {Dictionary.get('tryAgain')}
    </button>
  </Message>
);

NoContentTypesError.propTypes = {
  throbbing: PropTypes.string,
  hint: PropTypes.object.isRequired,
  onRetry: PropTypes.func.isRequired
};

NoContentTypesError.defaultProps = {
  throbbing: false,
};

export default NoContentTypesError;
