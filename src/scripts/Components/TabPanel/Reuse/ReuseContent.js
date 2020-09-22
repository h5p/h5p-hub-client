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
import DownloadingModal from '../../DownloadingModal/DownloadingModal';
import Search from '../../Search/Search';
import Content from './Detail/Content';
import fetchJSON from '../../../utils/fetchJSON';
import { hubFiltersEqual } from '../../../utils/helpers';

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
      focused: '',
      setFocus: false,
      failedDataFetch: {},
      metaData: {},
      initialized: false,
      downloading: false
    };

    this.orderBySettings = [{
      id: "popular",
      text: Dictionary.get('popularFirst')
    }, {
      id: "newest",
      text: Dictionary.get('newestFirst')
    }];

    const filterTrans = Dictionary.get('filters');

    this.reviewedFilter = [{ id: 'reviewed', label: filterTrans.reviewed.optionLabel }];

    this.licenseFilter = [
      { id: 'modified', label: filterTrans.licenses.options.modified },
      { id: 'commercial', label: filterTrans.licenses.options.commercial }
    ];

    this.metaData = [
      { id: 'disciplines', promise: ApiClient.disciplines },
      { id: 'contentTypes', promise: ApiClient.contentTypes },
      { id: 'language', promise: ApiClient.languages },
      { id: 'level', promise: ApiClient.levels },
      { id: 'flatDisciplines', promise: ApiClient.flatDisciplines },
      { id: 'flatContentTypes', promise: ApiClient.flatContentTypes }
    ];

    this.metaData.forEach(metaData => {

      metaData.promise.then(data => {
        this.setState({
          metaData: { ...this.state.metaData, [metaData.id]: data }
        });
      }, () => {
        this.setState({
          failedDataFetch: { ...this.state.failedDataFetch, [metaData.id]: true }
        });
      });
    });

    this.filters = [
      { id: 'disciplines', dictionary: filterTrans.disciplines, type: 'categorySearch' },
      { id: 'contentTypes', dictionary: filterTrans.contentTypes, type: 'search' },
      { id: 'license', dictionary: filterTrans.licenses, type: 'checkboxList' },
      { id: 'language', dictionary: filterTrans.language, type: 'search' },
      { id: 'level', dictionary: filterTrans.level, type: 'checkboxList' },
      { id: 'reviewed', dictionary: filterTrans.reviewed, type: 'checkboxList' }
    ];

    this.reuseContentResultRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    // Run initial search first time ReuseContent is shown:
    if (!this.state.initialized && this.props.isVisible) {
      this.setState({
        newContent: ContentApiClient.search({ orderBy: 'newest', limit: 6 }),
        popularContent: ContentApiClient.search({ orderBy: 'popularity', limit: 6 }),
        search: ContentApiClient.search({}),
        initialized: true
      });
    }

    // Check if there are changes in any of the state variables 
    // used by the search. If so execute a new search
    const searchHasChanged =
      (prevState.orderBy !== this.state.orderBy) ||
      (prevState.query !== this.state.query) ||
      (prevState.page !== this.state.page) ||
      !hubFiltersEqual(prevState.filters, this.state.filters);

    if (searchHasChanged) {
      this.setState({
        detailViewVisible: false,
        contentListVisible: true,
        focused: '',
        setFocus: true,
        search: ContentApiClient.search({
          query: this.state.query,
          filters: this.state.filters,
          orderBy: this.state.orderBy,
          page: this.state.page,
        })
      });

      this.scrollToSearchResults();
    }
  }

  handlePageChange = (setFocus, page) => {
    if (page !== this.state.page) {
      this.setState({
        page: page,
        focusOnRender: setFocus
      });
    }
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
    }
  }

  handleSearch = (query) => {
    if (query !== this.state.query) {
      this.setState({ query: query });
    }
  }

  handleFilters = (filters) => {
    // TODO - check why this is invoked too much
    if (!hubFiltersEqual(filters, this.state.filters)) {
      this.setState({ filters: filters });
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
    this.setState({
      orderBy: orderBy,
      filters: {},
      query: '',
      page: 1
    });
  }

  /**
   * Handles download events from the Content component.
   */
  handleDownload = content => {
    this.setState({ downloading: true }, () => {
      setTimeout(() => {
        fetchJSON(this.props.getAjaxUrl('get-content/' + content.id), [])
          .then(response => {
            // Download success, inform parent
            this.props.onDownload(response.data, 'reuse');
          })
          .catch(reason => {
            // Download failed, inform the user? TODO
            throw new Error(reason);
          })
          .finally(() => this.setState({ downloading: false }));
      }, 2000);
    });
  }
  render() {
    const showPopularList = this.state.query || this.state.orderBy !== 'popular';
    const showNewOnTheHubList = this.state.query || this.state.orderBy !== 'newest';
    const downloadingLabel = Dictionary.get('contentDownloadButtonDownloadingLabel');
    return (
      <div id='h5p-hub-reuse-view'>
        {this.state.downloading  && <DownloadingModal label={downloadingLabel} />}
        <Search
          placeholder={Dictionary.get('contentSearchFieldPlaceholder')}
          onSearch={this.handleSearch}
          value={this.state.query}
          setFocus={this.props.isVisible} />

        <FilterBar
          label={Dictionary.get('filterBy')}
          filters={this.filters}
          onChange={this.handleFilters}
          metaData={{ ...this.state.metaData, 'license': this.licenseFilter, 'reviewed': this.reviewedFilter }}
          failedDataFetch={this.state.failedDataFetch}
        />

        <div className='h5p-hub-reuse-content-container' id='h5p-hub-reuse-content-container' >
          <div className={!this.state.contentListVisible ? 'h5p-hub-content-list-hidden' : ''}>
            <Order
              searchPromise={this.state.search}
              selected={this.state.orderBy}
              onChange={this.handleOrderBy}
              headerLabel={Dictionary.get('contentSectionAll')}
              visible={this.state.contentListVisible}
              orderVariables={this.orderBySettings} />

            <div className='h5p-hub-reuse-content-result' ref={this.reuseContentResultRef}>
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

              { showPopularList &&
                <SelectionsList
                  itemsPromise={this.state.popularContent}
                  title={Dictionary.get('popularContent')}
                  actionLabel={Dictionary.get('allPopular')}
                  onAction={() => this.showAllOrderedBy('popular')}
                  onSelect={this.showContentDetails}
                  focused={this.state.focused}
                  setFocus={this.state.setFocus} />
              }

              { showNewOnTheHubList &&
                <SelectionsList
                  itemsPromise={this.state.newContent}
                  title={Dictionary.get('newOnTheHub')}
                  actionLabel={Dictionary.get('allNew')}
                  onAction={() => this.showAllOrderedBy('newest')}
                  onSelect={this.showContentDetails}
                  focused={this.state.focused}
                  setFocus={this.state.setFocus} />
              }
            </div>
          </div>

          {
            this.state.detailViewVisible &&
            <Content
              content={this.state.content}
              downloading={this.state.downloading}
              onDownload={this.handleDownload}
              aboutToClose={() => this.closeContentDetails()}
              onClose={() => this.setState({ detailViewVisible: false })}
              metaData={this.state.metaData} />
          }
        </div>
      </div>
    );
  }
}

ReuseContent.propTypes = {
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool
};

export default ReuseContent;
