import React from 'react';
import NoContent from './NoContent/NoContent';
//import PropTypes from 'prop-types';
//import './ReuseContent.scss';
//import Dictionary from '../../utils/dictionary';

class ReuseContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="reuse-view loaded">
        Reuse view
        <NoContent
          tutorialUrl = "https://h5p.org/documentation/for-authors/tutorials"
        />
      </div>
    );
  }
}

/*ReuseContent.propTypes = {
};*/

export default ReuseContent;
