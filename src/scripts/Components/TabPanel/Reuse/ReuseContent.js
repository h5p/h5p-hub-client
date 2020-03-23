import React from 'react';
import Pagination from '../../Pagiantion/Pagination';
import NoContent from './NoContent/NoContent';
import ContentList from './ContentList/ContentList';
import PropTypes from 'prop-types';
import './ReuseContent.scss';
import Dictionary from '../../../utils/dictionary';
import Order from '../../Order/Order';
import ContentApiClient from '../../../utils/content-hub/api-client';
import SelectionsList from './Selections/AsyncList';
import FilterBar from './FilterBar/FilterBar';
import ApiClient from '../../../utils/content-hub/api-client';
import Search from '../../Search/Search';


const defaultOrderBy = 'popular';

class ReuseContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      pages: 10, // TODO - Get from API call
      orderBy: defaultOrderBy,
      filters: {},
      hasSearchResults: false,
      detailViewActive: false,
      focusOnRender: false,
      newContent: ContentApiClient.search({ orderBy: 'newest' }),
      popularContent: ContentApiClient.search({ orderBy: 'popularity' }),
      search: ContentApiClient.search({}),
    };

    this.orderBySettings = [{
      id: "popular",
      text: Dictionary.get('popularFirst')
    }, {
      id: "newest",
      text: Dictionary.get('newestFirst')
    }];

    this.filterTrans = Dictionary.get('filters');

    this.filters = [
      { id: 'level', promise: ApiClient.levels(), dictionary: this.filterTrans.level, type: 'checkboxList' },
      { id: 'reviewed', promise: ApiClient.reviewed(), dictionary: this.filterTrans.reviewed, type: 'checkboxList' },
      { id: 'language', promise: ApiClient.languages(), dictionary: this.filterTrans.language, type: 'search' }
    ];

  }

  handlePageChange = (setFocus, page) => {
    if (page !== this.state.page) {
      //Do something with selected page
      this.setState({ 
        page: page,
        focusOnRender: setFocus
      });
      this.runSearch({page: page});
    }
  }

  runSearch = ({query, filters, orderBy, page}) => {
    this.setState({
      search: ContentApiClient.search({
        query: query || this.state.query,
        filters: filters || this.state.filters,
        orderBy: orderBy || this.state.orderBy,
        page: page || this.state.page,
      })
    });
  }

  handleOrderBy = (orderBy) => {
    if (orderBy !== this.state.orderBy) {
      this.setState({orderBy: orderBy});
      this.runSearch({orderBy: orderBy});
    }
  }

  handleSearch = (query) => {
    if (query !== this.state.query) {
      this.setState({query: query});
      this.runSearch({query: query});
    }
  }

  handleFilters = (filters) => {
    // TODO - check if it has changed in a better way. Now order matters
    // Also check why this is invoked too much
    if (JSON.stringify(filters) !== JSON.stringify(this.state.filters)) {
      this.setState({filters: filters});
      this.runSearch({filters: filters});
    }
  }

  showContentDetails = (content) => {
    console.log("TODO - show details for: ", content);
  }

  render() {
   
    return (
      <div className="reuse-view loaded">
        <Search
          placeholder={Dictionary.get('contentSearchFieldPlaceholder')}
          onSearch={this.handleSearch} />

        <FilterBar
          label={Dictionary.get('filterBy')}
          filters={this.filters}
          onChange={this.handleFilters}
          tabShown={this.props.tabShown}
        />
        <div className='reuse-content-result'>
          <Order
            hits={22930} //Get from api
            selected={this.state.orderBy}
            onChange={this.handleOrderBy}
            headerLabel={Dictionary.get('contentSectionAll')}
            visible={!this.state.detailViewActive}
            orderVariables={this.orderBySettings} />

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
      </div>
    );
  }
}

ReuseContent.propTypes = {
  tabShown: PropTypes.bool.isRequired
};

export default ReuseContent;
