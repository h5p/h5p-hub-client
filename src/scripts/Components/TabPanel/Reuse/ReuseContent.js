import React from 'react';
import Pagination from '../../Pagiantion/Pagination';
import NoContent from './NoContent/NoContent';
import ContentList from './ContentList/ContentList';
//import PropTypes from 'prop-types';
//import './ReuseContent.scss';
import Dictionary from '../../../utils/dictionary';
import Order from '../../Order/Order';
import ContentApiClient from '../../../utils/content-hub/api-client';
import SelectionsList from './Selections/AsyncList';
import Search from '../../Search/Search';

const defaultOrderBy = 'popular';

class ReuseContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      pages: 10, // TODO - Get from API call
      orderBy: defaultOrderBy,
      hasSearchResults: false,
      detailViewActive: false,
      focusOnRender: false,
      newContent: ContentApiClient.search({ orderBy: 'newest' }),
      popularContent: ContentApiClient.search({ orderBy: 'popularity' }),
      search: ContentApiClient.search({}),
    };
  }

  handlePageChange = (setFocus, page) => {
    //Do something with selected page
    this.setState({ page: page, focusOnRender: setFocus });
    this.runSearch();
  }

  runSearch = () => {
    this.setState({
      search: ContentApiClient.search({
        query: this.state.query,
        orderBy: this.state.orderBy,
        page: this.state.page,
      })
    });
  }

  handleOrderBy = (orderBy) => {
    if (orderBy !== this.state.orderBy) {
      this.setState({
        orderBy: orderBy
      });
      this.runSearch();
    }
  }

  handleSearch = (query) => {
    if (query !== this.state.query) {
      this.setState({
        query: query
      });
      this.runSearch();
    }
  }

  showContentDetails = (content) => {
    console.log("TODO - show details for: ", content);
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

        <Search
          placeholder={Dictionary.get('contentSearchFieldPlaceholder')}
          onSearch={this.handleSearch} />

        <Order
          hits={22930} //Get from api
          selected={this.state.orderBy}
          onChange={this.handleOrderBy}
          headerLabel={Dictionary.get('contentSectionAll')}
          visible={!this.state.detailViewActive}
          orderVariables={orderBySettings} />

        <ContentList 
          itemsPromise={this.state.search}
          onSelect={this.showContentDetails} />
       
        <Pagination
          selectedPage={this.state.page}
          pages={this.state.pages}
          onChange={this.handlePageChange}
          setFocus={this.state.focusOnRender} />

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
