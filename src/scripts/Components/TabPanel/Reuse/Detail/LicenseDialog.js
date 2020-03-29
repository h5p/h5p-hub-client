import React from 'react';
import PropTypes from 'prop-types';
import Async from 'react-async';

import Dictionary from '../../../../utils/dictionary';
import ApiClient from '../../../../utils/content-hub/api-client';

const LicenseDialog = ({id}) => {

  const license = ApiClient.getLicense(id);

  return (
    <div>
      <div className="modal-header">
        {Dictionary.get('licenseModalTitle')}
      </div>
      <div className="modal-content">
        <h5 id="license-details-id" className="modal-title">
          {id}
        </h5>
        <Async promise={license()}>
          <Async.Pending>
            <div
              id="license-details-description"
              className="loading"
            />
          </Async.Pending>

          <Async.Fulfilled>{licenseText =>
            <div
              id="license-details-description"
              dangerouslySetInnerHTML={{__html: licenseText}}
            />
          }
          </Async.Fulfilled>      
        </Async>
      </div>
    </div>
  );
};

LicenseDialog.propTypes = {
  id: PropTypes.string.isRequired
};

export default LicenseDialog;
