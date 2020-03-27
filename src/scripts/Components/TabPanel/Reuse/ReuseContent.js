import React from 'react';

import NoContent from './NoContent/NoContent';
import ContentList from './ContentList/ContentList';

import PropTypes from 'prop-types';

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

    this.orderBySettings = [{
      id: "popular",
      text: Dictionary.get('popularFirst')
    }, {
      id: "newest",
      text: Dictionary.get('newestFirst')
    }];

    const filterTrans = Dictionary.get('filters');

    const reviewedPromise = new Promise(function (resolve) {
      resolve([{ id: 'reviewed', label: filterTrans.reviewed.optionLabel }]);
    });

    const licensePromise = new Promise(function (resolve) {
      resolve([
        { id: 'modified', label: filterTrans.licenses.options.modified },
        { id: 'commercial', label: filterTrans.licenses.options.commercial }
      ]);
    });

    this.languages = ApiClient.languages;

    this.filters = [
      { id: 'license', promise: licensePromise, dictionary: filterTrans.licenses, type: 'checkboxList' },
      { id: 'level', promise: ApiClient.levels(), dictionary: filterTrans.level, type: 'checkboxList' },
      { id: 'reviewed', promise: reviewedPromise, dictionary: filterTrans.reviewed, type: 'checkboxList' },
      { id: 'language', promise: this.languages(), dictionary: filterTrans.language, type: 'search' },
      { id: 'contentTypes', promise: ApiClient.contentTypes(), dictionary: filterTrans.contentTypes, type: 'search'}
    ];

    this.reuseContentResultRef = React.createRef();
  }

  handlePageChange = (setFocus, page) => {
    if (page !== this.state.page) {
      //Do something with selected page
      this.setState({
        page: page,
        focusOnRender: setFocus
      });
      this.runSearch({ page: page });
    }
  }

  runSearch = ({ query, filters, orderBy, page }) => {
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
    this.scrollToSearchResults();
  }

  scrollToSearchResults = () => {
    this.reuseContentResultRef.current.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  }

  handleOrderBy = (orderBy) => {
    if (orderBy !== this.state.orderBy) {
      this.setState({ orderBy: orderBy });
      this.runSearch({ orderBy: orderBy });
    }
    this.scrollToSearchResults();
  }

  handleSearch = (query) => {
    if (query !== this.state.query) {
      this.setState({ query: query });
      this.runSearch({ query: query });
    }
    this.scrollToSearchResults();
  }

  handleFilters = (filters) => {
    // TODO - check if it has changed in a better way. Now order matters
    // Also check why this is invoked too much
    if (JSON.stringify(filters) !== JSON.stringify(this.state.filters)) {
      this.setState({ filters: filters });
      this.runSearch({ filters: filters });
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

    this.scrollToSearchResults();
  }

  render() {

    return (
      <div className="reuse-view loaded">
        <Search
          placeholder={Dictionary.get('contentSearchFieldPlaceholder')}
          onSearch={this.handleSearch}
          value={this.state.query} />

        <FilterBar
          label={Dictionary.get('filterBy')}
          filters={this.filters}
          onChange={this.handleFilters}
        />
        
        <div className='reuse-content-container'>
          <div className='reuse-content-result' ref={this.reuseContentResultRef}>
            <Order
              hits={22930} //Get from api
              selected={this.state.orderBy}
              onChange={this.handleOrderBy}
              headerLabel={Dictionary.get('contentSectionAll')}
              visible={this.state.contentListVisible}
              orderVariables={this.orderBySettings} />

            <ContentList
              itemsPromise={this.state.search}
              onSelect={this.showContentDetails}
              visible={this.state.contentListVisible}
              handlePageChange={this.handlePageChange} />
            
              
            <NoContent
              tutorialUrl="https://h5p.org/documentation/for-authors/tutorials"
              suggestionText={Dictionary.get('noContentSuggestion')}
              headerText={Dictionary.get('noContentHeader')} />
          

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

          {
            this.state.detailViewVisible &&
            <Content
              content={this.state.content}
              onDownload={(content) => { console.log('DOWNLOAD', content); }}
              aboutToClose={() => this.setState({ contentListVisible: true })}
              onClose={() => { this.setState({ detailViewVisible: false }); }} 
              languages={this.languages} />
          }
        </div>
      </div>
    );
  }
}

ReuseContent.propTypes = {
};

export default ReuseContent;
