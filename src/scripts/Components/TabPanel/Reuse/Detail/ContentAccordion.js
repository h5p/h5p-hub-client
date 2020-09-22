import React from 'react';
import PropTypes from 'prop-types';

import Accordion from '../../../Accordion/Accordion';
import Dictionary from '../../../../utils/dictionary';
import { contentDefinition } from '../../../../utils/helpers';

import './ContentAccordion.scss';

const ContentAccordion = ({content, licenseInfo}) => {
  return (
    <Accordion>
      {licenseInfo}
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
  licenseInfo: PropTypes.element,
  onShowLicenseDetails: PropTypes.func.isRequired
};

export default ContentAccordion;
