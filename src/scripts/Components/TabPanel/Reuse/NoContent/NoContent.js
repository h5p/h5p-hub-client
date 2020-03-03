import React from 'react';
import PropTypes from 'prop-types';
import './NoContent.scss';
import Dictionary from '../../../../utils/dictionary'
import noResults from '../../../../../images/no-results.svg'

class NoContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="no-content">
        <img className="no-results-img" src={noResults}/>
        <section className="right-text">
            <div className="header">
                {Dictionary.get('noContentHeader')} 
            </div>
            <div className="suggestion-text">
                {Dictionary.get('noContentSuggestion')}
            </div>
            <div>
              <a className="url" href={this.props.tutorialUrl}>{Dictionary.get('tutorials')}</a>
            </div>
        </section>
      </div>
    );
  }
}

NoContent.propTypes = {
    tutorialUrl: PropTypes.string
};

export default NoContent;
