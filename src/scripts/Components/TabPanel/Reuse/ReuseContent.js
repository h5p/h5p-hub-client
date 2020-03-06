import React from 'react';
import NoContent from './NoContent/NoContent';
//import PropTypes from 'prop-types';
//import './ReuseContent.scss';
import Dictionary from '../../../utils/dictionary';
import Order from '../../Order/Order';
import ContentApiClient from '../../../utils/content-hub/api-client';
import SelectionsList from './Selections/AsyncList';

const defaultOrderBy = 'popular';

class ReuseContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: defaultOrderBy,
      hasSearchResults: false,
      detailViewActive: false,
      newContent: ContentApiClient.search({orderBy: 'newest'}),
      popularContent: ContentApiClient.search({orderBy: 'popularity'})
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
        
        <SelectionsList 
          itemsPromise={this.state.popularContent}
          title={Dictionary.get('popularContent')}
          actionLabel={Dictionary.get('allPopular')} />
        
        <SelectionsList
          itemsPromise={this.state.newContent}
          title={Dictionary.get('newOnTheHub')}
          actionLabel={Dictionary.get('allNew')} />
        
      </div>
    );
  }
}

/*ReuseContent.propTypes = {
};*/

export default ReuseContent;
