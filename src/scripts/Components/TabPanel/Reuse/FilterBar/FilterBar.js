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
      showClearFilters: false,
    };

    this.filterBarRef = React.createRef();
    this.filterButtons = {};

    this.props.filters.forEach(filter => {

      this.filterButtons[filter.id] = React.createRef();
    });
  }

  /**
   * Clear filters button should be shown if any there is any checked
   * except for the exception prop
   */
  showClearFilters = () => {
    let anyChecked = false;
    Object.keys(this.props.checked).forEach((filter) => {
      if ((this.props.checked[filter]).length > 0 && this.props.clearFilterException !== filter) {
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
    this.setState({ showClearFilters: false });
    this.props.setChecked({
      [this.props.clearFilterException]: this.props.checked[this.props.clearFilterException]
    });
    this.props.applyFilters({
      [this.props.clearFilterException]: this.props.checked[this.props.clearFilterException]
    });
  }

  /**
   * Handles opening and closing of the filter dropdown
   * @param  {string} id
   */
  handleFilterButtonClicked = (id) => {
    const close = this.state.openFilter === id;
    this.setState({ openFilter: close ? '' : id, showClearFilters: this.showClearFilters() });
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
      this.setState({ openFilter: '', showClearFilters: this.showClearFilters() });
    }
    this.props.applyFilters(this.props.checked);
  }

  /**
   * Updates state each time a checkbox is checked on or off
   * @param  {string} filter
   * @param  {array} checkbox
   * @param  {bool} checkedOf true if new state of checkbox is checked
   */
  handleChecked = (filter, checkbox, checkedOf) => {
    if (Array.isArray(checkbox)) {
      if (this.props.checked[filter] == undefined && checkbox != null) {
        this.props.setChecked({  ...this.props.checked, [filter]: checkbox });
      }
      else if (checkbox != null) {
        const newList = checkedOf ?
          this.props.checked[filter].filter(element => checkbox.indexOf(element) == -1).concat(checkbox)
          : this.props.checked[filter].filter(id => checkbox.indexOf(id) == -1);
        this.props.setChecked({...this.props.checked, [filter]: newList });
      }
    }
    else if (this.props.checked[filter] == undefined && checkbox != null) {
      this.props.setChecked({ ...this.props.checked, [filter]: [checkbox] });
    }
    else if (checkbox != null) {
      const newList = checkedOf ? [...this.props.checked[filter], checkbox] : this.props.checked[filter].filter(id => id != checkbox);
      this.props.setChecked({ ...this.props.checked, [filter]: newList });
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
          checked={this.props.checked[filter.id] ? this.props.checked[filter.id] : []}
          open={this.state.openFilter == filter.id}
          data={this.props.metaData[filter.id]}
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
              />
            }
          </Filter>
        }

        {
          this.state.showClearFilters &&
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
  clearFilterException: PropTypes.string.isRequired
};

export default FilterBar;
