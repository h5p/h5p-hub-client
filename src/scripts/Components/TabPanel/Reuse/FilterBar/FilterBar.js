import React from 'react';
import './FilterBar.scss';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter';
import Choose from '../../../../Components/Choose/Choose';
import FilterButton from './FilterButton/FilterButton';
import Dictionary from '../../../../utils/dictionary';
import CheckboxList from '../../../CheckboxList/CheckboxList';
import SearchFilter from './Filter/SearchFilter/SearchFilter';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openFilter: '',
      filterCounts: {},
    };

    this.filterBarRef = React.createRef();
    this.filterButtons = {};

    this.props.filters.forEach(filter => {

      this.filterButtons[filter.id] = React.createRef();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.searchPromise !== prevProps.searchPromise) {
      this.props.searchPromise().then(data => {
        if (data.filterCounts) {
          this.setState({
            filterCounts: {
              disciplines: data.filterCounts.disciplines ?? {},
              contentTypes: data.filterCounts.content_type ?? {},
              language: data.filterCounts.language ?? {},
              level: data.filterCounts.level ?? {},
              reviewed: {
                reviewed: data.filterCounts.reviewed['1'] ?? 0,
              },
              license: {
                commercial: data.filterCounts.allows_commercial_use['1'] ?? 0,
                modified: data.filterCounts.can_be_modified['1'] ?? 0,
              },
            },
          });
        }
      });
    }
  }

  /**
   * Clear filters button should be shown if any there is any checked
   * except for the exception prop
   */
  showClearFilters = () => {
    let anyChecked = false;
    Object.keys(this.props.checked).forEach((filter) => {
      if ((this.props.checked[filter]).length > 0
        && this.props.clearFilterExceptions
        && this.props.clearFilterExceptions.indexOf(filter) === -1) {
        anyChecked = true;
        return;
      }
    });
    return anyChecked;
  }

  /**
   * Unchecks all checkboxes excpet for clear filters exception
   */
  clearFilters = () => {
    const checkedFilters = {};
    for (let i = 0; i < this.props.clearFilterExceptions.length; i++) {
      const filter = this.props.clearFilterExceptions[i];
      checkedFilters[filter] = this.props.checked[filter];
    }
    this.props.setChecked(
      checkedFilters
    );
    this.props.applyFilters(
      checkedFilters
    );
  }

  /**
   * Handles opening and closing of the filter dropdown
   * @param  {string} id
   */
  handleFilterButtonClicked = (id) => {
    const close = this.state.openFilter === id;
    this.setState({ openFilter: close ? '' : id});
    if (close) {
      this.props.applyFilters(this.props.checked);
    }
  }

  /**
   * Called when filter dropdown is closed 
   * Updates states and calls the apply filters
   */
  handleFilterClosed = (id) => {
    const filteredId = id.split('-').pop();
    if (this.state.openFilter.split('-').pop() === filteredId) {
      this.setState({ openFilter: '' });
    }
    this.props.applyFilters(this.props.checked);
  }

  /**
   * Check if applying a filter results in content or not
   * @param {string} filterGroup Key in filterCounts where the filter can be found, e.g. 'language'
   * @param {string} filterItem The filter to check, e.g. 'nb'
   * @return {boolean} true if applying filter option will result in content, false if it results in zero content
   */
  filterHasContent = (filterGroup, filterItem) => {
    console.log(filterGroup, filterItem);
    const counts = this.state.filterCounts[filterGroup] ?? [];
    return counts[filterItem] > 0 ?? false;
  };

  /**
   * Updates state each time a checkbox is checked on or off
   * @param  {string} filter
   * @param  {array} checkbox
   * @param  {bool} checkedOf true if new state of checkbox is checked
   */
  handleChecked = (filter, checkbox, checkedOf) => {
    let filterList = null;

    if (Array.isArray(checkbox)) {
      if (this.props.checked[filter] === undefined) {
        filterList = checkbox;
      } else {
        filterList = checkedOf ?
          this.props.checked[filter].filter(element => checkbox.indexOf(element) === -1).concat(checkbox)
          : this.props.checked[filter].filter(id => checkbox.indexOf(id) === -1);
      }
    } else if (checkbox !== null) {
      if (this.props.checked[filter] === undefined) {
        filterList = [checkbox];
      } else {
        filterList = checkedOf ?
          [...this.props.checked[filter], checkbox] :
          this.props.checked[filter].filter(id => id !== checkbox);
      }
    }
    if (filterList !== null) {
      // Don't toggle the state of filter items that have zero content
      this.props.setChecked({
        ...this.props.checked,
        [filter]: filterList.filter(filterItem => this.filterHasContent(filter, filterItem)),
      });
    }
  }

  /**
   * Lookup filter by id
   * 
   * @param {string} id
   * @returns {Object} The filter
   */
  findFilterById = (id) => {
    const cleanId = id.replace('h5p-hub-filter-button-', '');
    for (let i = 0; i < this.props.filters.length; i++) {
      if (this.props.filters[i].id === cleanId) {
        return this.props.filters[i];
      }
    }
  }

  render() {
    const filterButtons = this.props.filters.map(filter =>
      <li key={filter.id} id={'h5p-hub-filter-button-' + filter.id}>
        <FilterButton
          id={'h5p-hub-filter-button-' + filter.id}
          dropdownLabel={filter.dictionary.dropdownLabel}
          onClick={this.handleFilterButtonClicked}
          checkedCount={this.props.checked[filter.id] && this.props.checked[filter.id].length > 0 ? 1 : 0}
          open={this.state.openFilter === filter.id}
          dataCount={1}
          ref={this.filterButtons[filter.id]}
        />
      </li>
    );

    const filter = this.findFilterById(this.state.openFilter);

    return (
      <div className="h5p-hub-filter-bar" ref={this.filterBarRef}>

        <div className="h5p-hub-filter-label" id="h5p-hub-content-hub-filter-label">
          {this.props.label}
        </div>

        <ul className="h5p-hub-filter-buttons" aria-labelledby="h5p-hub-content-hub-filter-label">
          <Choose
            selected={this.open}
            onChange={this.handleFilterButtonClicked}>
            {filterButtons}
          </Choose>
        </ul>

        {
          filter &&
          <Filter
            id={'h5p-hub-' + filter.id}
            key={filter.id}
            dictionary={filter.dictionary}
            data={this.props.metaData[filter.id]}
            onFilterClosed={this.handleFilterClosed}
            checked={this.props.checked[filter.id] ? this.props.checked[filter.id] : []}
            handleChecked={this.handleChecked}
            toggleButtonRef={this.filterButtons[filter.id]}
            filterBarRef={this.filterBarRef}
            failedDataFetch={this.props.failedDataFetch[filter.id]}>
            {filter.type === 'checkboxList' && this.props.metaData[filter.id] &&
              <CheckboxList
                onChecked={this.handleChecked}
                items={this.props.metaData[filter.id]}
                checked={this.props.checked[filter.id] ? this.props.checked[filter.id] : []}
                filter={filter.id}
                filterCounts={this.state.filterCounts[filter.id] ?? {}}
              />
            }
            {filter.type === 'search' && this.props.metaData[filter.id] &&
              <SearchFilter
                handleChecked={this.handleChecked}
                items={this.props.metaData[filter.id]}
                checked={this.props.checked[filter.id] ? this.props.checked[filter.id] : []}
                filter={filter.id}
                dictionary={filter.dictionary}
                dropdownAlwaysOpen={true}
                filterCounts={this.state.filterCounts[filter.id] ?? {}}
              />
            }
            {filter.type === 'categorySearch' && this.props.metaData[filter.id] &&
              <SearchFilter
                handleChecked={this.handleChecked}
                items={this.props.metaData[filter.id]}
                checked={this.props.checked[filter.id] ? this.props.checked[filter.id] : []}
                filter={filter.id}
                dictionary={filter.dictionary}
                category={true}
                dropdownAlwaysOpen={true}
                filterCounts={this.state.filterCounts[filter.id] ?? {}}
              />
            }
          </Filter>
        }

        {
          this.showClearFilters() &&
          <div className="h5p-hub-clear-filters">
            <button onClick={this.clearFilters} aria-label={Dictionary.get('clearFilters')}>
              {Dictionary.get('clearFilters')}
            </button>
          </div>
        }
      </div>
    );
  }
}

FilterBar.propTypes = {
  label: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  applyFilters: PropTypes.func.isRequired,
  metaData: PropTypes.object.isRequired,
  failedDataFetch: PropTypes.object.isRequired,
  checked: PropTypes.object.isRequired,
  setChecked: PropTypes.func.isRequired,
  clearFilterExceptions: PropTypes.array,
  searchPromise: PropTypes.func,
};

export default FilterBar;
