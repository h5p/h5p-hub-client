import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../utils/dictionary';
import Accordion from '../../../Accordion/Accordion';
import License from './License';

import './ContentTypeAccordion.scss';

const ContentTypeAccordion = ({id, attributes, onShowLicenseDetails}) => {
  return (
    <Accordion>
      <License
        header={Dictionary.get('contentTypeLicensePanelTitle')}
        id={id}
        attributes={attributes}
        onShowLicenseDetails={onShowLicenseDetails}
      />
    </Accordion>
  );
};

ContentTypeAccordion.propTypes = {
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

export default ContentTypeAccordion;
