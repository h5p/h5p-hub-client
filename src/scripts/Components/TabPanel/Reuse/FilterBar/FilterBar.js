import React from 'react';
import './FilterBar.scss';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter';
import Choose from '../../../../Components/Choose/Choose';
import FilterButton from './FilterButton/FilterButton';
import Dictionary from '../../../../utils/dictionary';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterData: {},
      openFilter: '',
      checked: {},
      showClearFilters: false,
      selected: this.props.filters[0].id,
    };

    this.filterButtons = {};

    this.props.filters.forEach(filter => {

      this.filterButtons[filter.id] = React.createRef();

      filter.promise.then(data => {
        this.setState({
          filterData: { ...this.state.filterData, [filter.id]: data }
        });
      });
    });

    
  }

  anyChecked = () => {
    let anyChecked = false;
    Object.keys(this.state.checked).forEach((filter) =>{
      if((this.state.checked[filter]).length>0){
        anyChecked = true;
        return;
      }
    });
    return anyChecked;
  }

  clearFilters = () => {
    this.setState({ checked: {}, showClearFilters: false });
    this.props.onChange({});
  }

  handleFilterButtonClicked = (id) => {
    const close = this.state.openFilter == id;
    this.handleApplyFilters(this.state.openFilter);
    this.setState({ openFilter: close ? '' : id});
  }

  handleApplyFilters = () => {
    this.setState({ openFilter: '', showClearFilters: this.anyChecked() });
    this.props.onChange(this.state.checked);
  }

  handleChecked = (filter, checkbox, checkedOf) => {
    if (this.state.checked[filter] == undefined) {
      this.setState({ checked: { ...this.state.checked, [filter]: [checkbox] } });
    }
    else {
      const newList = checkedOf ? [...this.state.checked[filter], checkbox] : this.state.checked[filter].filter(id => id != checkbox);
      this.setState({ checked: { ...this.state.checked, [filter]: newList } });
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
          data={this.state.filterData[filter.id]}
          ref={this.filterButtons[filter.id]}
        />
      </li>
    );

    const filterItems = this.props.filters.map(filter =>
      <Filter
        id={filter.id}
        key={filter.id}
        dictionary={filter.dictionary}
        data={this.state.filterData[filter.id]}
        handleApplyFilters={this.handleApplyFilters}
        open={this.state.openFilter == filter.id}
        openFilter={this.handleFilterButtonClicked}
        checked={this.state.checked[filter.id] ? this.state.checked[filter.id] : []}
        handleChecked={this.handleChecked}
        toggleButtonRef={this.filterButtons[filter.id]}
      />
    );

    return (
      <div className="filter-bar">

        <div className="filter-label">
          {this.props.label}
        </div>

        <ul className="filters">
          <Choose
            selected={this.open}
            onChange={this.handleFilterButtonClicked}>
            {filterButtons}
          </Choose>
        </ul>

        {this.state.openFilter != '' && filterItems}

        {this.state.showClearFilters &&
          <div className="clear-filters">
            <div className="button-content">
              <button onClick={this.clearFilters} aria-label={Dictionary.get('clearFilters')}>
                {Dictionary.get('clearFilters')}
              </button>
            </div>
          </div>}
      </div>
    );
  }
}

FilterBar.propTypes = {
  label: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterBar;
