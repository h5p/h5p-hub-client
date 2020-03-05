import React from 'react';
import NoContent from './NoContent/NoContent';
//import PropTypes from 'prop-types';
//import './ReuseContent.scss';
import Dictionary from '../../../utils/dictionary';
import Order from '../../Order/Order';

const defaultOrderBy = 'popular';

class ReuseContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: defaultOrderBy,
      hasSearchResults: false,
      detailViewActive: false
    };
  }

  handleOrderBy = (property) => {
    this.setState({
      orderBy: property
    });
  }

  render() {
    const orderBySettings = [{
      id: "popular",
      text: Dictionary.get('popularFirst')
    }, {
      id: "newest",
      text: Dictionary.get('newestFirst')
    }];

    return (
      <div className="reuse-view loaded">
        <Order
          hits={22930} //Get from api
          selected={this.state.orderBy}
          onChange={this.handleOrderBy}
          headerLabel={Dictionary.get('contentSectionAll')}
          visible={!this.state.detailViewActive}
          orderVariables={orderBySettings} />
        <NoContent
          tutorialUrl="https://h5p.org/documentation/for-authors/tutorials"
          suggestionText={Dictionary.get('noContentSuggestion')}
          headerText={Dictionary.get('noContentHeader')} />
      </div>
    );

  }
}

/*ReuseContent.propTypes = {
};*/

export default ReuseContent;
