import React from 'react';
import PropTypes from 'prop-types';

import './FilterButton.scss';

const FilterButton = React.forwardRef(({
  checked,
  id,
  onClick,
  open,
  data,
  dropdownLabel }, ref) => {

  //Check if the check symbol on the filterButton should be shown
  const oneChecked = checked.length == 1 && data.length == 1;

  const filterNumberShown = checked.length > 0 && !oneChecked;

  const className = () => {
    if (open) {
      return 'open';
    }
    else if (oneChecked) {
      return 'one-checked';
    }
    else if (filterNumberShown) {
      return 'filter-checked';
    }
    else {
      return '';
    }
  };

  /**
   * Handle filter button clicks
   * 
   * @param {Event} event 
   */
  const handleClick = (event) => {
    // We don't want the event to propagate, since we are listening
    // for clicks on window in Filter.js (to close the filter dialog)
    event.stopPropagation();
    onClick(id);
  };

  return (
    <div id={id} className='filter-button'>
      <button
        tabIndex='-1'
        id={id}
        className={className()}
        onClick={handleClick}
        ref={ref}>

        {dropdownLabel}
        <div className={oneChecked ? 'icon check' : 'icon'}>
          {filterNumberShown && `(${checked.length})`}
        </div>

      </button>
    </div>
  );
});

FilterButton.propTypes = {
  checked: PropTypes.array,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.array,
  dropdownLabel: PropTypes.string.isRequired,
};

export default FilterButton;

