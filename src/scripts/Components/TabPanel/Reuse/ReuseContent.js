import React from 'react';
import NoContent from './NoContent/NoContent';
//import PropTypes from 'prop-types';
//import './ReuseContent.scss';
import Dictionary from '../../../utils/dictionary';
import Order from '../../Order/Order';

class ReuseContent extends React.Component {
  constructor(props) {
    super(props);

    const defaultOrderBy = 'recently';

    this.state = {
      orderBy: defaultOrderBy,
      orderVisible: true,
      hasSearchResults: false,
      detailViewActive: true
    };
  }

  handleOrderBy = (property) => {
    this.setState({
      orderBy: property
    });
  }

  render() {
    return (
      <div className="reuse-view loaded">
        Reuse view
        <Order
          hits={22930} //Get from api
          selected={this.state.orderBy}
          onChange={this.handleOrderBy}
          headerLabel={Dictionary.get('contentSectionAll')}
          visible={this.state.detailViewActive}
          orderVisible={this.state.orderVisible}
          orderVariables={[{ id: "popular", text: Dictionary.get('popularFirst') }, { id: "newest", text: Dictionary.get('newestFirst') }]} />
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
