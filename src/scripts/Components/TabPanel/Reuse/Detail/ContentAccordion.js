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
        className='h5p-hub-publisher-info'
      >
        <h3
          className="h5p-hub-publisher-name"
          dangerouslySetInnerHTML={{ __html: content.publisher.name }}>
        </h3>
        <img className='h5p-hub-publisher-image' src={content.publisher.logo} />
        <div
          className="h5p-hub-publisher-description"
          dangerouslySetInnerHTML={{ __html: content.publisher.description }}>
        </div>
      </div>
    </Accordion>
  );
};

ContentAccordion.propTypes = {
  content: contentDefinition,
  licenseInfo: PropTypes.element
};

export default ContentAccordion;
