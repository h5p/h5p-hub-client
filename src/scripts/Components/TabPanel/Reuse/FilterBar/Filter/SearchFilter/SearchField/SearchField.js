import React from 'react';
import PropTypes from 'prop-types';

import './SearchField.scss';
import Dictionary from '../../../../../../../utils/dictionary';

const SearchField = React.forwardRef(({
  value,
  onSearch,
  onNavigateVertical,
  onSelect,
  placeholder,
  onClick,
  onNavigateSideway }, ref) => {

  const handleInput = (event) => {
    const input = event.target;

    onSearch(input.value);
  };

  const handleKeyDown = (event) => {
    // Allow quick selecting from the list while typing
    switch (event.key) {
      case 'ArrowUp': // Up
        onNavigateVertical(-1);
        event.preventDefault();
        break;

      case 'ArrowDown': // Down
        onNavigateVertical(1);
        event.preventDefault();
        break;

      case 'ArrowRight':
        onNavigateSideway(1);
        event.preventDefault();
        break;

      case 'ArrowLeft':
        onNavigateSideway(-1);
        event.preventDefault();
        break;

      case 'Enter': // Enter
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
  onNavigateVertical: PropTypes.func.isRequired,
  onNavigateSideway: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

SearchField.defaultProps = {
  onNavigateVertical: () => { },
  onNavigateSideway: () => { },
  onSelect: () => { }
};

export default SearchField;