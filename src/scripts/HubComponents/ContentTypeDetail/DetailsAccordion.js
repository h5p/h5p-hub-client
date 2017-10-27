import React from 'react';
import Accordion from '../../GenericComponents/Accordion/Accordion';
import LicenseOverview from './LicenseOverview';
import Dictionary from '../../utils/dictionary';
import './DetailsAccordion.scss';

class DetailsAccordion extends React.Component {
  render() {
    return (
      <Accordion>
        <LicenseOverview
          header={Dictionary.get('contentTypeLicensePanelTitle')}
          id={this.props.id}
          attributes={this.props.attributes}
          onShowLicenseDetails={this.props.onShowLicenseDetails.bind(this)}
        />
      </Accordion>
    );
  }
}

export default DetailsAccordion;
