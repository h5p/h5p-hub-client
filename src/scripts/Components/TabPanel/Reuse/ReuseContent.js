import React from 'react';
import NoContent from './NoContent/NoContent';
//import PropTypes from 'prop-types';
import './ReuseContent.scss';
import Dictionary from '../../../utils/dictionary';
import ContentApiClient from '../../../utils/content-hub/api-client';
import SelectionsList from './Selections/AsyncList';
import FilterBar from './FilterBar/FilterBar';
import ApiClient from '../../../utils/content-hub/api-client';
import Search from '../../Search/Search';
import Loader from '../../Loader/Loader';

const defaultOrderBy = 'popular';

class ReuseContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: defaultOrderBy,
      hasSearchResults: false,
      detailViewActive: false,
      newContent: ContentApiClient.search({ orderBy: 'newest' }),
      popularContent: ContentApiClient.search({ orderBy: 'popularity' }),
    };
  }


  handleOrderBy = (property) => {
    this.setState({
      orderBy: property
    });
  }

  handleSearch = (query) => {
    console.log('Lets search for: ' + query);
  }

  render() {
    const orderBySettings = [{
      id: "popular",
      text: Dictionary.get('popularFirst')
    }, {
      id: "newest",
      text: Dictionary.get('newestFirst')
    }];

    const filters = [
      { id: 'level', promise: ApiClient.levels() },
      { id: 'reviewed', promise: ApiClient.reviewed() },
    ];

    return (
      <div className="reuse-view loaded">
        <Search
          placeholder={Dictionary.get('contentSearchFieldPlaceholder')}
          onSearch={this.handleSearch} />

        <FilterBar
          label={Dictionary.get('filterBy')}
          filters={filters}
        />
        <div className='reuse-content-result'>

          <Loader
            title={Dictionary.get('loadingContentTitle')}
            subtitle={Dictionary.get('loadingContentSubtitle')} />

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

          <SelectionsList
            itemsPromise={this.state.newContent}
            title={Dictionary.get('newOnTheHub')}
            actionLabel={Dictionary.get('allNew')} />
        </div>
      </div >
    );
  }
}

/*ReuseContent.propTypes = {
};*/

export default ReuseContent;
