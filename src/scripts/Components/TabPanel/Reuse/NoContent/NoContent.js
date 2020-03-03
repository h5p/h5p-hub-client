import React from 'react';
import PropTypes from 'prop-types';
import './NoContent.scss';
import Dictionary from '../../../../utils/dictionary';
import noResults from '../../../../../images/no-results.svg';

const NoContent = ({ headerText, suggestionText, tutorialUrl }) =>
  (
    <div className="no-content">
      <img className="no-results-img" src={noResults} />
      <section className="right-text">
        <div className="header">
          {headerText}
        </div>
        <div className="suggestion-text">
          {suggestionText}
        </div>
        <div>
          <a className="url" target="_blank" href={tutorialUrl}>{Dictionary.get('tutorials')}</a>
        </div>
      </section>
    </div>
  );


NoContent.propTypes = {
  tutorialUrl: PropTypes.string
};


export default NoContent;
