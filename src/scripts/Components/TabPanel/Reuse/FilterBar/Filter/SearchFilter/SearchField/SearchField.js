import React from 'react';
import PropTypes from 'prop-types';

import './SearchField.scss';
import Dictionary from '../../../../../../../utils/dictionary';

class SearchField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  componentDidUpdate() {
    if (this.props.setFocus == true) {
      this.input.focus();
    }
  }

  handleInput = (event) => {
    const input = event.target;
    if (input.value === this.state.value) {
      return;
    }
    this.setState({ value: input.value });

    // Automatically search/filter after input
    // Use timer to prevent filtering more than once per 40ms
    if (this.props.auto && !this.searchTimer) {
      this.searchTimer = setTimeout(() => {
        this.props.onSearch(input.value);
        this.searchTimer = null;
      }, 40);
    }
  }

  clearSearch = () => {
    this.setState({ value: '' });
    this.input.value = '';
    this.props.clearSearch();
    this.input.focus();
  }

  render() {
    return (
      <div onClick={this.props.onClick} className="search-button" role="button" aria-label={Dictionary.get('dropdownButton')}>

        <div className="search-field" role="search">
          <input id="filter-search-bar"
            type="text"
            defaultValue={this.state.value}
            aria-label={this.props.placeholder}
            placeholder={this.props.placeholder}
            onInput={this.props.instantSearch ? this.handleInput : () => { }}
            ref={el => this.input = el}>

          </input>
          <div className="icon-arrow" />
          {this.state.value.length > 0
            && <button onClick={this.clearSearch} className="clear-button" />
          }


        </div>
      </div>
    );
  }
}

SearchField.propTypes = {
  value: PropTypes.string,
  auto: PropTypes.bool.isRequired,
  setFocus: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  instantSearch: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  clearInput: PropTypes.bool,
};

SearchField.defaultProps = {
  instantSearch: false,
  onNavigate: () => { },
  onSelect: () => { },
  auto: false,
  setFocus: false
};

export default SearchField;
