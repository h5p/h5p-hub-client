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
      checked: {},
      showClearFilters: false,
    };

    this.filterBarRef = React.createRef();
    this.filterButtons = {};
    
    this.props.filters.forEach(filter => {

      this.filterButtons[filter.id] = React.createRef();
    });
  }

  /**
   * Test if there is any checked checkboxes
   */
  anyChecked = () => {
    let anyChecked = false;
    Object.keys(this.state.checked).forEach((filter) => {
      if ((this.state.checked[filter]).length > 0) {
        anyChecked = true;
        return;
      }
    });
    return anyChecked;
  }

  /**
   * Unchecks all checkboxes.
   */
  clearFilters = () => {
    this.setState({ checked: {}, showClearFilters: false });
    this.props.onChange({});
  }

  /**
   * Handles opening and closing of the filter dropdown
   * @param  {string} id
   */
  handleFilterButtonClicked = (id) => {
    const close = this.state.openFilter === id;
    this.setState({ openFilter: close ? '' : id, showClearFilters: this.anyChecked() });
    if (close) {
      this.props.onChange(this.state.checked);
    }
  }

  /**
   * Called when filter dropdown is closed 
   * Updates states and calls the onChange with the new state of checked checkboxes
   */
  handleFilterClosed = (id) => {
    if (this.state.openFilter === id) {
      this.setState({ openFilter: '', showClearFilters: this.anyChecked() });
    }
    this.props.onChange(this.state.checked);
  }

  /**
   * Updates state each time a checkbox is checked on or off
   * @param  {string} filter
   * @param  {array} checkbox
   * @param  {bool} checkedOf true if new state of checkbox is checked
   */
  handleChecked = (filter, checkbox, checkedOf) => {
    if (Array.isArray(checkbox)) {
      if (this.state.checked[filter] == undefined && checkbox != null) {
        this.setState(prevState => ({ checked: { ...prevState.checked, [filter]: checkbox } }));
      }
      else if (checkbox != null) {
        const newList = checkedOf ?
          this.state.checked[filter].filter(element => checkbox.indexOf(element) == -1).concat(checkbox)
          : this.state.checked[filter].filter(id => checkbox.indexOf(id) == -1);
        this.setState({ checked: { ...this.state.checked, [filter]: newList } });
      }
    }
    else if (this.state.checked[filter] == undefined && checkbox != null) {
      this.setState(prevState => ({ checked: { ...prevState.checked, [filter]: [checkbox] } }));
    }
    else if (checkbox != null) {
      const newList = checkedOf ? [...this.state.checked[filter], checkbox] : this.state.checked[filter].filter(id => id != checkbox);
      this.setState({ checked: { ...this.state.checked, [filter]: newList } });
    }
  }

  /**
   * Lookup filter by id
   * 
   * @param {string} id
   * @returns {Object} The filter
   */
  findFilterById = (id) => {
    for (let i = 0; i < this.props.filters.length; i++) {
      if (this.props.filters[i].id === id) {
        return this.props.filters[i];
      }
    }
  }

  render() {
    const filterButtons = this.props.filters.map(filter =>
      <li key={filter.id} id={filter.id}>
        <FilterButton
          id={filter.id}
          dropdownLabel={filter.dictionary.dropdownLabel}
          onClick={this.handleFilterButtonClicked}
          checked={this.state.checked[filter.id] ? this.state.checked[filter.id] : []}
          open={this.state.openFilter == filter.id}
          data={this.props.metaData[filter.id]}
          ref={this.filterButtons[filter.id]}
        />
      </li>
    );

    const filter = this.findFilterById(this.state.openFilter);

    return (
      <div className="filter-bar" ref={this.filterBarRef}>

        <div className="filter-label" id="content-hub-filter-label">
          {this.props.label}
        </div>

        <ul className="filter-buttons" aria-labelledby="content-hub-filter-label">
          <Choose
            selected={this.open}
            onChange={this.handleFilterButtonClicked}>
            {filterButtons}
          </Choose>
        </ul>

        {
          filter &&
          <Filter
            id={filter.id}
            key={filter.id}
            dictionary={filter.dictionary}
            data={this.props.metaData[filter.id]}
            onFilterClosed={this.handleFilterClosed}
            checked={this.state.checked[filter.id] ? this.state.checked[filter.id] : []}
            handleChecked={this.handleChecked}
            toggleButtonRef={this.filterButtons[filter.id]}
            filterBarRef={this.filterBarRef}
            failedDataFetch={this.props.failedDataFetch[filter.id]}>
            {filter.type === 'checkboxList' && this.props.metaData[filter.id] &&
              <CheckboxList
                onChecked={this.handleChecked}
                items={this.props.metaData[filter.id]}
                checked={this.state.checked[filter.id] ? this.state.checked[filter.id] : []}
                filter={filter.id}
              />
            }
            {filter.type === 'search' && this.props.metaData[filter.id] &&
              <SearchFilter
                handleChecked={this.handleChecked}
                items={this.props.metaData[filter.id]}
                checked={this.state.checked[filter.id] ? this.state.checked[filter.id] : []}
                filter={filter.id}
                dictionary={filter.dictionary} 
                dropdownAlwaysOpen={true}
              />
            }
            {filter.type === 'categorySearch' && this.props.metaData[filter.id] &&
              <SearchFilter
                handleChecked={this.handleChecked}
                items={this.props.metaData[filter.id]}
                checked={this.state.checked[filter.id] ? this.state.checked[filter.id] : []}
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
          <div className="clear-filters">
            <div className="button-content">
              <button onClick={this.clearFilters} aria-label={Dictionary.get('clearFilters')}>
                {Dictionary.get('clearFilters')}
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}

FilterBar.propTypes = {
  label: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  metaData: PropTypes.object.isRequired,
  failedDataFetch: PropTypes.isRequired
};

export default FilterBar;
