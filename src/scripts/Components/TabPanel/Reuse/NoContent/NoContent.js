import React from 'react';
import PropTypes from 'prop-types';
import './NoContent.scss';
import Dictionary from '../../../../utils/dictionary';
import noResults from '../../../../../images/no-results.svg';

const NoContent = ({ headerText, suggestionText, tutorialUrl }) => (
  <div className="h5p-hub-no-content">
    <img className="h5p-hub-no-results-img" src={noResults} />
    <section className="h5p-hub-right-text">
      <div className="h5p-hub-header">
        {headerText}
      </div>
      <div className="h5p-hub-suggestion-text">
        {suggestionText}
      </div>
      {
        tutorialUrl &&
        <div>
          <a className="h5p-hub-url" target="_blank" href={tutorialUrl}>{Dictionary.get('tutorials')}</a>
        </div>
      }
    </section>
  </div>
);

NoContent.propTypes = {
  headerText: PropTypes.string.isRequired,
  suggestionText: PropTypes.string.isRequired,
  tutorialUrl: PropTypes.string
};

export default NoContent;
