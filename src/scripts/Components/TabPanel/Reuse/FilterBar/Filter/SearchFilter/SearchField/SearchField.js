import React from 'react';
import PropTypes from 'prop-types';

import './SearchField.scss';
import Dictionary from '../../../../../../../utils/dictionary';

const SearchField = React.forwardRef(({
  value,
  onSearch,
  onNavigate,
  onSelect,
  instantSearch,
  placeholder,
  onClick }, ref) => {

  const handleInput = (event) => {
    const input = event.target;

    onSearch(input.value);
  };

  const handleKeyDown = (event) => {
    // Allow quick selecting from the list while typing
    switch (event.which) {
      case 38: // Up
        onNavigate(-1);
        event.preventDefault();
        break;

      case 40: // Down
        onNavigate(1);
        event.preventDefault();
        break;

      case 13: // Enter
        // Select highlighted
        onSelect();
        event.preventDefault();
        break;
    }
  };

  return (
    <div onClick={onClick} className="search-button" role="button" aria-label={Dictionary.get('dropdownButton')}>

      <div className="search-field" role="search">
        <input id="filter-search-bar"
          type="text"
          value={value}
          aria-label={placeholder}
          placeholder={placeholder}
          onInput={instantSearch ? handleInput : () => { }}
          ref={ref}
          onKeyDown={event => handleKeyDown(event)}
          onChange={handleInput}>
        </input>
        <div className="icon-arrow" />
      </div>
    </div>
  );
});

SearchField.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  instantSearch: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

SearchField.defaultProps = {
  instantSearch: false,
  onNavigate: () => { },
  onSelect: () => { },
};

export default SearchField;
