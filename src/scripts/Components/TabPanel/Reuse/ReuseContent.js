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
import filesize from 'filesize.js';
import Message from '../../Message/Message';

import './ReuseContent.scss';

const defaultOrderBy = 'popular';

class ReuseContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      orderBy: defaultOrderBy,
      appliedFilters: {
        reviewed: ['reviewed'],
      },
      hasSearchResults: false,
      contentListVisible: true,
      detailViewVisible: false,
      focusOnRender: false,
      focused: '',
      setFocus: false,
      failedDataFetch: {},
      metaData: {},
      initialized: false,
      downloading: false,
      selectedFilters: {
        reviewed: ['reviewed'],
      }
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
        newContent: ContentApiClient.search({
          orderBy: 'newest',
          limit: 6,
          filters: this.state.appliedFilters,
        }),
        popularContent: ContentApiClient.search({
          orderBy: 'popularity',
          limit: 6,
          filters: this.state.appliedFilters,
        }),
        search: ContentApiClient.search({
          filters: this.state.appliedFilters,
        }),
        initialized: true
      });
    }

    // Check if there are changes in any of the state variables
    // used by the search. If so execute a new search
    const searchHasChanged =
      (prevState.orderBy !== this.state.orderBy) ||
      (prevState.query !== this.state.query) ||
      !hubFiltersEqual(prevState.appliedFilters, this.state.appliedFilters);

    if (searchHasChanged || prevState.page !== this.state.page) {
      this.setState({
        detailViewVisible: false,
        contentListVisible: true,
        focused: '',
        setFocus: true,
        search: ContentApiClient.search({
          query: this.state.query,
          filters: this.state.appliedFilters,
          orderBy: this.state.orderBy,
          page: searchHasChanged ? 1 : this.state.page,
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

  /**
   * Apply filters that have been cheked
   * @param  {Object} checked
   */
  applyFilters = (checked) => {
    if (!hubFiltersEqual(this.state.appliedFilters, checked)) {
      this.setState({ appliedFilters: checked });
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
    this.setState({
      orderBy: orderBy,
      appliedFilters: {},
      selectedFilters: {},
      query: '',
      page: 1
    });
  }

  showMessage = (title, message, severity) => {
    const messageProps = { title, message, severity };
    messageProps.onClose = () => this.clearMessage();
    this.setState({ message: <Message {...messageProps} />});
  };

  clearMessage = () => { this.setState({ message: null }); };

  /**
   * Set an appropriate title, message and severity to be displayed to the user
   * depending on the supplied error reason.
   *
   * @param {object} reason
   * @returns {{title: string, message: string, severity: string}} props
   *  compatible with the Message component.
   */
  getFriendlyMessage = (reason) => {
    let title = Dictionary.get('downloadFailed'),
      message = Dictionary.get('somethingWentWrongTryAgain'),
      severity = 'error';

    if (reason instanceof TypeError) {
      message = Dictionary.get('contentHubConnectionFailed');
    }
    else if (Array.isArray(reason.message)) {
      let responseIncludesMissingRequiredLibraryError = false;
      for (let message of reason.message) {
        if (message.code === 'missing-required-library') {
          responseIncludesMissingRequiredLibraryError = true;
          break;
        }
      }

      if (responseIncludesMissingRequiredLibraryError) {
        title = Dictionary.get('downloadFailedMissingLibrariesTitle');
        message = `
          <p>${Dictionary.get('downloadFailedMissingLibrariesMessage')}</p>
          <ul class="h5p-hub-message-item-list">
            ${reason.message.map(m => `<li>${m.message}</li>`).join('\n')}
          </ul>
        `;
      }
    }

    return { title, message, severity };
  }

  /**
   * Handles download events from the Content component.
   */
  handleDownload = content => {
    this.setState({ downloading: true }, () => {
      fetchJSON(this.props.getAjaxUrl('get-content', {hubId: content.id}), '')
        .then(response => {
          // Download success, inform parent
          this.props.onDownload(response.data, 'reuse');
        })
        .catch(reason => {
          const { title, message, severity } = this.getFriendlyMessage(reason);
          this.showMessage(title, message, severity);
        })
        .finally(() => this.setState({ downloading: false }));
    });
  }

  /**
   * Get title og H5P content type
   * @param  {string} name
   */
  getH5PTitle = (name) => {
    if (this.state.metaData.flatContentTypes) {
      const element = this.state.metaData.flatContentTypes
        //Ignore version in matching
        .filter(contentType => contentType.id.split(' ')[0] === name.split(' ')[0]);
      if (element.length > 0) {
        return element[0].label;
      }
    }
    return name;
  }

  /**
   * Get level label
   * @param  {string} name
   */
  getLabel = (name, type) => {
    if (this.state.metaData[type]) {
      const element = this.state.metaData[type].filter(element => element.id === name);
      if (element.length > 0 && element[0].translation !== null) {
        return element[0].translation;
      }
    }
    return name;
  }

  /**
   * Set the checked filters
   * @param  {Object} checked
   */
  setChecked = (checked) => {
    this.setState({selectedFilters: checked});
  }

  render() {
    const showPopularList = this.state.initialized && (this.state.query || this.state.orderBy !== 'popular');
    const showNewOnTheHubList = this.state.initialized && (this.state.query || this.state.orderBy !== 'newest');
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
          applyFilters={this.applyFilters}
          checked={this.state.selectedFilters}
          setChecked={this.setChecked}
          metaData={{ ...this.state.metaData, 'license': this.licenseFilter, 'reviewed': this.reviewedFilter }}
          failedDataFetch={this.state.failedDataFetch}
          clearFilterExceptions={['reviewed']}
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
              {this.state.initialized && <ContentList
                itemsPromise={this.state.search}
                onSelect={this.showContentDetails}
                visible={this.state.contentListVisible}
                handlePageChange={this.handlePageChange}
                focused={this.state.focused}
                setFocus={this.state.setFocus}
                title={Dictionary.get('contentSectionAll')} />}

              <Async promiseFn={this.state.search}>
                <Async.Fulfilled>{result =>
                  <NoContent
                    tutorialUrl={result.numResults ? "https://h5p.org/documentation/for-authors/tutorials" : null}
                    suggestionText={Dictionary.get(result.numResults ? 'noContentSuggestion' : 'noContentFoundDesc')}
                    headerText={Dictionary.get(result.numResults ? 'noContentHeader' : 'noResultsFound')} />
                }
                </Async.Fulfilled>
              </Async>

              {showPopularList &&
                <SelectionsList
                  itemsPromise={this.state.popularContent}
                  title={Dictionary.get('popularContent')}
                  actionLabel={Dictionary.get('allPopular')}
                  onAction={() => this.showAllOrderedBy('popular')}
                  onSelect={this.showContentDetails}
                  focused={this.state.focused}
                  setFocus={this.state.setFocus} />
              }

              {showNewOnTheHubList &&
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
              content={{
                ...this.state.content,
                h5pTitle: this.getH5PTitle(this.state.content.content_type),
                language: this.getLabel(this.state.content.language, 'language'),
                disciplines: this.state.content.disciplines.map((discipline, i, arr) =>
                  this.getLabel(discipline, 'flatDisciplines') + (arr.length - 1 !== i ? ', ' : '')),
                level: this.getLabel(this.state.content.level, 'level'),
                filesize: filesize(this.state.content.size)
              }}
              downloading={this.state.downloading}
              message={this.state.message}
              onDismissMessage={this.clearMessage}
              onDownload={this.handleDownload}
              aboutToClose={() => this.closeContentDetails()}
              onClose={() => this.setState({ detailViewVisible: false })}
            />
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
