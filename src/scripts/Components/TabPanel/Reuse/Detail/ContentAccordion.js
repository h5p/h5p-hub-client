import React from 'react';
import PropTypes from 'prop-types';

import Accordion from '../../../Accordion/Accordion';
import LicenseInfo from '../../../License/LicenseInfo';
import Dictionary from '../../../../utils/dictionary';
import { contentDefinition } from '../../../../utils/helpers';

import './ContentAccordion.scss';

const ContentAccordion = ({content, onShowLicenseDetails}) => {
  return (
    <Accordion>

      <LicenseInfo
        header={Dictionary.get('contentTypeLicensePanelTitle')}
        id={content.license.id}
        version={content.license.version}
        attributes={{}}
        onShowLicenseDetails={onShowLicenseDetails}
      />

      <div
        header={Dictionary.get('contentPublisherPanelHeader')}
        id='publisher-info'
      >
        <h3 className="publisher-name">
          {content.publisher.name}
        </h3>
        <img className='publisher-image' src={content.publisher.logo}/>
        <div className="publisher-description">
          {content.publisher.description}
        </div>
      </div>
    </Accordion>
  );
};

ContentAccordion.propTypes = {
  content: contentDefinition,
  onShowLicenseDetails: PropTypes.func.isRequired
};

export default ContentAccordion;
