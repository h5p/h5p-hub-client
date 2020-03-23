import React from 'react';

import NoContent from './NoContent/NoContent';
import ContentList from './ContentList/ContentList';

import Dictionary from '../../../utils/dictionary';
import Order from '../../Order/Order';
import ContentApiClient from '../../../utils/content-hub/api-client';
import SelectionsList from './Selections/SelectionsList';
import FilterBar from './FilterBar/FilterBar';
import ApiClient from '../../../utils/content-hub/api-client';
import Search from '../../Search/Search';
import Content from './Detail/Content';

import './ReuseContent.scss';

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
      contentListVisible: true,
      detailViewVisible: false,
      focusOnRender: false,
      newContent: ContentApiClient.search({ orderBy: 'newest', limit: 6 }),
      popularContent: ContentApiClient.search({ orderBy: 'popularity', limit: 6 }),
      search: ContentApiClient.search({}),
    };
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
      detailViewVisible: false,
      contentListVisible: true,
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
    this.setState({
      detailViewVisible: true,
      contentListVisible: false,
      content: content
    });
  }

  showAllOrderedBy = (orderBy) => {
    // TODO - clear filters in Filterbar

    const newState = {
      orderBy: orderBy,
      filters: {},
      query: '',
      page: 1
    };

    this.setState(newState);
    this.runSearch(newState);
  }

  render() {
    const orderBySettings = [{
      id: "popular",
      text: Dictionary.get('popularFirst')
    }, {
      id: "newest",
      text: Dictionary.get('newestFirst')
    }];

    const filterTrans = Dictionary.get('filters');

    const filters = [
      { id: 'level', promise: ApiClient.levels(), dictionary: filterTrans.level },
      { id: 'reviewed', promise: ApiClient.reviewed(), dictionary: filterTrans.reviewed },
    ];

    return (
      <div className="reuse-view loaded">
        <Search
          placeholder={Dictionary.get('contentSearchFieldPlaceholder')}
          onSearch={this.handleSearch} 
          value={this.state.query}/>

        <FilterBar
          label={Dictionary.get('filterBy')}
          filters={filters}
          onChange={this.handleFilters}
        />
        <div className='reuse-content-result'>
          <Order
            hits={22930} //Get from api
            selected={this.state.orderBy}
            onChange={this.handleOrderBy}
            headerLabel={Dictionary.get('contentSectionAll')}
            visible={this.state.contentListVisible}
            orderVariables={orderBySettings} />

          <ContentList 
            itemsPromise={this.state.search}
            onSelect={this.showContentDetails}
            visible={this.state.contentListVisible}
            handlePageChange={this.handlePageChange} />

          { 
            this.state.detailViewVisible &&
            <Content 
              content={this.state.content}
              onDownload={(content) => {console.log('DOWNLOAD', content);}}
              aboutToClose={() => this.setState({contentListVisible: true})}
              onClose={() => {this.setState({detailViewVisible: false});}} />
          }
        </div>
        { 
          this.state.contentListVisible &&
          <NoContent
            tutorialUrl="https://h5p.org/documentation/for-authors/tutorials"
            suggestionText={Dictionary.get('noContentSuggestion')}
            headerText={Dictionary.get('noContentHeader')} />
        }

        <SelectionsList
          itemsPromise={this.state.popularContent}
          title={Dictionary.get('popularContent')}
          actionLabel={Dictionary.get('allPopular')}
          onAction={() => this.showAllOrderedBy('popular')} 
          onSelect={this.showContentDetails} />

        <SelectionsList
          itemsPromise={this.state.newContent}
          title={Dictionary.get('newOnTheHub')}
          actionLabel={Dictionary.get('allNew')}
          onAction={() => this.showAllOrderedBy('newest')}
          onSelect={this.showContentDetails} />

      </div>
    );
  }
}

/*ReuseContent.propTypes = {
};*/

export default ReuseContent;
