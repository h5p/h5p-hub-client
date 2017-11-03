import React from 'react';
import Dictionary from '../../../../utils/dictionary';

import Accordion from './Accordion/Accordion';
import License from './License';

import './ContentTypeAccordion.scss';

class ContentTypeAccordion extends React.Component {
  render() {
    return (
      <Accordion>
        <License
          header={Dictionary.get('contentTypeLicensePanelTitle')}
          id={this.props.id}
          attributes={this.props.attributes}
          /*onShowLicenseDetails={this.props.onShowLicenseDetails.bind(this)}*/
        />
      </Accordion>
    );
  }
}

export default ContentTypeAccordion;
