import React from 'react';

import Accordion from '../../../Accordion/Accordion';

import './ContentAccordion.scss';

const ContentAccordion = () => {
  return (
    <Accordion>
      <div 
        header='License info'
        id='lic-info'
      >
        License info comes here
      </div>

      <div 
        header='Language'
        id='language'
      >
        Language info comes here
      </div>
      <div 
        header='Description'
        id='description'
      >
        Description comes here
      </div>

      <div 
        header='Publisher info'
        id='publisher-info'
      >
        Publisher info comes here
      </div>
    </Accordion>
  );
};

/*ContentAccordion.propTypes = {
};*/

export default ContentAccordion;
