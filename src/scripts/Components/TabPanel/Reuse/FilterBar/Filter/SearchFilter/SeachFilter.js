import React from 'react';
import PropTypes from 'prop-types';
import CheckboxList from '../../../../../CheckboxList/CheckboxList';
import SearchField from './SearchField/SearchField';

import './SearchFilter.scss';

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxElements: this.props.items.sort(this.compare),
      searchValue: '',
      dropdownOpen: false,
      setFocus: false,
      focused: null,
    };
    this.searchRef = React.createRef();
    this.click = null;
  }

  compare = (a, b) => {
    let nameA = a.label.toUpperCase();
    let nameB = b.label.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  }

  search = (list, value) => {
    return list
      .sort(this.compare)
      .filter(element => RegExp(value.toUpperCase()).test(element.label.toUpperCase()));
  }

  handleOnSearch = (value) => {
    this.setState({
      checkboxElements: this.search(this.props.items, value),
      searchValue: value,
      dropdownOpen: true
    });
  }

  clearSearch = () => {
    this.setState({
      checkboxElements: this.props.items.sort(this.compare),
      searchValue: ''
    });
    this.searchRef.current.focus();
  }


  /**
    Open list with checkbox if search field is fouced on. 
  */
  handleSearchFocus = () => {
    if (!this.click && !this.state.dropdownOpen) {
      this.click = setTimeout(() => {
        this.setState((prevState) => ({ dropdownOpen: prevState.dropdownOpen ? prevState.dropdownOpen : true }));
        this.click = null;
      }, 100);
    }
  }
  /**
    Open and close checkboxlist
  */
  handleSearchClick = () => {
    if (!this.click) {
      this.click = setTimeout(() => {
        this.setState((prevState) => ({ dropdownOpen: !prevState.dropdownOpen }));
        this.click = null;
      }, 100);
    }

  }

  handleChecked = (filter, checkbox, checkedOf) => {
    if (!this.state.dropdownOpen) {
      this.setState({ dropdownOpen: true });
    }
    else {
      this.setState({ setFocus: true, focused: checkbox });
      this.props.handleChecked(filter, checkbox, checkedOf);
      this.searchRef.current.focus();
    }
  }

  handleKeyEvent = (direction) => {
    const index = (this.state.checkboxElements.map(element => element.id).indexOf(this.state.focused) + direction);
    const sibling = this.state.checkboxElements[index];
    if (sibling == undefined) {
      this.setState({ focused: this.state.checkboxElements.map(element => element.id)[0] });
    } else {
      this.setState({ focused: sibling.id });
    }
  }

  checkedOf(id) {
    return this.props.checked.indexOf(id) != -1;
  }

  render() {
    return (
      <div className="search-filter">
        <SearchField
          ref={this.searchRef}
          value={this.state.searchValue}
          onSearch={this.handleOnSearch}
          instantSearch={true}
          auto={true}
          placeholder={this.props.dictionary.searchPlaceholder}
          clearSearch={this.clearSearch}
          onClick={this.handleSearchClick}
          setFocus={this.state.setFocus}
          onNavigate={this.handleKeyEvent}
          onSelect={() => this.handleChecked(this.props.filter, this.state.focused, !this.checkedOf(this.state.focused))}
          onFocus={this.handleSearchFocus}
          onMouseDown={this.onMouseDown}
        />
        {
          this.state.searchValue.length > 0 &&
          <button onClick={this.clearSearch} className="clear-button" />
        }
        {
          this.state.dropdownOpen &&
          <CheckboxList
            onChecked={this.handleChecked}
            items={this.state.checkboxElements}
            checked={this.props.checked}
            filter={this.props.filter}
            focused={this.state.focused}
            tabIndex='-1'
          />
        }
      </div>
    );
  }
}

SearchFilter.propTypes = {
  items: PropTypes.array,
  handleChecked: PropTypes.func.isRequired,
  checked: PropTypes.array,
  filter: PropTypes.string.isRequired,
  dictionary: PropTypes.object.isRequired
};

export default SearchFilter;