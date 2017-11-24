import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';

import './License.scss';

// const License = ({id, onShowLicenseDetails, attributes}) => {

class License extends React.Component {

  renderSection(flag) {
    if(flag) {
      return (
        <div className='short-license-info'>
          <h3>{this.props.id}</h3>

          <button
            type="button"
            className="short-license-read-more"
            aria-label={Dictionary.get('readMore')}
            onClick={this.props.onShowLicenseDetails}>
          </button>

          <p>{Dictionary.get("licenseDescription")}</p>

          <ul className="ul small">
            <li>
              {Dictionary.get(this.props.attributes.canHoldLiable ? "licenseCanHoldLiable" : "licenseCannotHoldLiable")}
            </li>
            {
              this.props.attributes.useCommercially &&
              <li>{Dictionary.get("licenseCanUseCommercially")}</li>
            }
            {
              this.props.attributes.modifiable &&
              <li>{Dictionary.get("licenseCanModify")}</li>
            }
            {
              this.props.attributes.distributable &&
              <li>{Dictionary.get("licenseCanDistribute")}</li>
            }
            {
              this.props.attributes.sublicensable &&
              <li>{Dictionary.get("licenseCanSublicense")}</li>
            }
            {
              this.props.attributes.mustIncludeCopyright &&
              <li>{Dictionary.get("licenseMustIncludeCopyright")}</li>
            }
            {
              this.props.attributes.mustIncludeLicense &&
              <li>{Dictionary.get("licenseMustIncludeLicense")}</li>
            }
          </ul>
        </div>
      );
    }
    else {
      return (
        <div className='short-license-info'>
          <p>{Dictionary.get("licenseUnspecified")}</p>
        </div>
      );
    }
  }

  render () {
    return this.renderSection(this.props.id !== 'Unspecified');
  }
}

License.propTypes = {
  id: PropTypes.string,
  onShowLicenseDetails: PropTypes.func,
  attributes: PropTypes.shape({
    canHoldLiable: PropTypes.bool,
    useCommercially: PropTypes.bool,
    modifiable: PropTypes.bool,
    distributable: PropTypes.bool,
    sublicensable: PropTypes.bool,
    mustIncludeCopyright: PropTypes.bool,
    mustIncludeLicense: PropTypes.bool
  })
};

export default License;
