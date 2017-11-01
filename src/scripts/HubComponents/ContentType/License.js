import React from 'react';

import Dictionary from '../../utils/dictionary';

class License extends React.Component {
  render() {
    return (
      <div className='short-license-info'>
        <h3>{this.props.id}</h3>

        <button
          type="button"
          className="short-license-read-more icon-info-circle"
          aria-label={Dictionary.get('readMore')}
          onClick={this.props.onShowLicenseDetails}>
        </button>

        <p>{Dictionary.get("licenseDescription")}</p>

        <ul className="ul small">
          <li>
            {Dictionary.get(this.props.attributes.canHoldLiable ? "licenseCanHoldLiable" : "licenseCannotHoldLiable")}
          </li>
          {this.props.attributes.useCommercially &&
            <li>{Dictionary.get("licenseCanUseCommercially")}</li>
          }
          {this.props.attributes.modifiable &&
            <li>{Dictionary.get("licenseCanModify")}</li>
          }
          {this.props.attributes.distributable &&
            <li>{Dictionary.get("licenseCanDistribute")}</li>
          }
          {this.props.attributes.sublicensable &&
            <li>{Dictionary.get("licenseCanSublicense")}</li>
          }
          {this.props.attributes.mustIncludeCopyright &&
            <li>{Dictionary.get("licenseMustIncludeCopyright")}</li>
          }
          {this.props.attributes.mustIncludeLicense &&
            <li>{Dictionary.get("licenseMustIncludeLicense")}</li>
          }
        </ul>
      </div>
    );
  }
}

export default License;
