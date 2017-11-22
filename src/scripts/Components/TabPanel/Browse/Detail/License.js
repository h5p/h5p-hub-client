import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';

import './License.scss';

const License = ({ id, onShowLicenseDetails, attributes }) => {
  return (
    <div className="short-license-info">
      <h3>{id}</h3>

      <button
        type="button"
        className="short-license-read-more"
        aria-label={Dictionary.get('readMore')}
        onClick={onShowLicenseDetails}
      />

      <p>{Dictionary.get('licenseDescription')}</p>

      <ul className="ul small">
        <li>
          {Dictionary.get(
            attributes.canHoldLiable
              ? 'licenseCanHoldLiable'
              : 'licenseCannotHoldLiable'
          )}
        </li>
        {attributes.useCommercially && (
          <li>{Dictionary.get('licenseCanUseCommercially')}</li>
        )}
        {attributes.modifiable && <li>{Dictionary.get('licenseCanModify')}</li>}
        {attributes.distributable && (
          <li>{Dictionary.get('licenseCanDistribute')}</li>
        )}
        {attributes.sublicensable && (
          <li>{Dictionary.get('licenseCanSublicense')}</li>
        )}
        {attributes.mustIncludeCopyright && (
          <li>{Dictionary.get('licenseMustIncludeCopyright')}</li>
        )}
        {attributes.mustIncludeLicense && (
          <li>{Dictionary.get('licenseMustIncludeLicense')}</li>
        )}
      </ul>
    </div>
  );
};

License.propTypes = {
  id: PropTypes.string.isRequired,
  onShowLicenseDetails: PropTypes.func.isRequired,
  attributes: PropTypes.shape({
    canHoldLiable: PropTypes.bool.isRequired,
    useCommercially: PropTypes.bool,
    modifiable: PropTypes.bool,
    distributable: PropTypes.bool,
    sublicensable: PropTypes.bool,
    mustIncludeCopyright: PropTypes.bool,
    mustIncludeLicense: PropTypes.bool,
  }),
};

export default License;
