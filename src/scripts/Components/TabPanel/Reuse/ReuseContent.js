import React from 'react';
import PropTypes from 'prop-types';
import { Async } from 'react-async';

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
import fetchJSON from '../../../utils/fetchJSON';

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
      focused: '',
      setFocus: false
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

    this.filters = [
      { id: 'disciplines', promise: ApiClient.disciplines, dictionary: filterTrans.disciplines, type: 'categorySearch'},
      { id: 'contentTypes', promise: ApiClient.contentTypes, dictionary: filterTrans.contentTypes, type: 'search'},
      { id: 'license', promise: licensePromise, dictionary: filterTrans.licenses, type: 'checkboxList' },
      { id: 'language', promise: ApiClient.languages, dictionary: filterTrans.language, type: 'search' },
      { id: 'level', promise: ApiClient.levels, dictionary: filterTrans.level, type: 'checkboxList' },
      { id: 'reviewed', promise: reviewedPromise, dictionary: filterTrans.reviewed, type: 'checkboxList' }
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
      focused: '',
      setFocus: true,
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
    if (this.reuseContentResultRef.current.scrollTo) {
      this.reuseContentResultRef.current.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      });
    }
    else {
      this.reuseContentResultRef.current.focus();
    }
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

  showContentDetails = (content, id) => {
    this.setState({
      detailViewVisible: true,
      contentListVisible: false,
      content: content,
      focused: id,
    });
  }

  closeContentDetails = () => {
    this.setState(prevState => ({
      contentListVisible: true,
      setFocus: !prevState.setFocus,
    }));
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

  /**
   * Handles download events from the Content component.
   */
  handleDownload = content => {
    console.log('Displaying nice throbber so the user doesn\'t download 10 content at the same times... just kidding not implemented :-)'); // TODO: Display throbber? Disable button?

    fetchJSON(this.props.getAjaxUrl('get-content/' + content.id), [])
      .then(response => {
        // Download success, inform parent
        this.props.onDownload(response.data);
      })
      .catch(reason => {
        // Download failed, inform the user? TODO
        throw new Error(reason);
      });
  }

  render() {
    return (
      <div className="reuse-view loaded" id='reuse-view'>
        <Search
          placeholder={Dictionary.get('contentSearchFieldPlaceholder')}
          onSearch={this.handleSearch}
          value={this.state.query}
          setFocus={this.props.setFocus}/>

        <FilterBar
          label={Dictionary.get('filterBy')}
          filters={this.filters}
          onChange={this.handleFilters}
        />

        <div className='reuse-content-container' id='reuse-content-container'>
          <div className={!this.state.contentListVisible ? 'content-list-hidden' : ''}>
            <Order
              searchPromise={this.state.search}
              selected={this.state.orderBy}
              onChange={this.handleOrderBy}
              headerLabel={Dictionary.get('contentSectionAll')}
              visible={this.state.contentListVisible}
              orderVariables={this.orderBySettings} />

            <div className='reuse-content-result' ref={this.reuseContentResultRef}>
              <ContentList
                itemsPromise={this.state.search}
                onSelect={this.showContentDetails}
                visible={this.state.contentListVisible}
                handlePageChange={this.handlePageChange}
                focused={this.state.focused}
                setFocus={this.state.setFocus}
                title={Dictionary.get('contentSectionAll')} />

              <Async promiseFn={this.state.search}>
                <Async.Fulfilled>{result =>
                  <NoContent
                    tutorialUrl={result.numResults ? "https://h5p.org/documentation/for-authors/tutorials" : null}
                    suggestionText={Dictionary.get(result.numResults ? 'noContentSuggestion' : 'noContentFoundDesc')}
                    headerText={Dictionary.get(result.numResults ? 'noContentHeader' : 'noResultsFound')} />
                }
                </Async.Fulfilled>
              </Async>

              <SelectionsList
                itemsPromise={this.state.popularContent}
                title={Dictionary.get('popularContent')}
                actionLabel={Dictionary.get('allPopular')}
                onAction={() => this.showAllOrderedBy('popular')}
                onSelect={this.showContentDetails}
                focused={this.state.focused}
                setFocus={this.state.setFocus} />

              <SelectionsList
                itemsPromise={this.state.newContent}
                title={Dictionary.get('newOnTheHub')}
                actionLabel={Dictionary.get('allNew')}
                onAction={() => this.showAllOrderedBy('newest')}
                onSelect={this.showContentDetails}
                focused={this.state.focused}
                setFocus={this.state.setFocus} />
            </div>
          </div>

          {
            this.state.detailViewVisible &&
            <Content
              content={this.state.content}
              onDownload={this.handleDownload}
              aboutToClose={() => this.closeContentDetails()}
              onClose={() => this.setState({ detailViewVisible: false })}/>
          }
        </div>
      </div>
    );
  }
}

ReuseContent.propTypes = {
  title: PropTypes.string.isRequired,
  setFocus: PropTypes.bool
};

export default ReuseContent;
