import React from 'react';
import PropTypes from 'prop-types';

import './FilterButton.scss';

const FilterButton = React.forwardRef(({
  checkedCount,
  id,
  onClick,
  open,
  dataCount,
  dropdownLabel }, ref) => {

  //Check if the check symbol on the filterButton should be shown
  const oneChecked = checkedCount === 1 && dataCount === 1;

  const filterNumberShown = checkedCount > 0 && !oneChecked;

  const className = () => {
    if (open) {
      return 'h5p-hub-open';
    }
    else if (oneChecked) {
      return 'h5p-hub-one-checked';
    }
    else if (filterNumberShown) {
      return 'h5p-hub-filter-checked';
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
    <div className='h5p-hub-filter-button'>
      <button
        tabIndex='-1'
        className={className()}
        onClick={handleClick}
        ref={ref}>

        {dropdownLabel}
        <div className={oneChecked ? 'h5p-hub-icon h5p-hub-check' : 'h5p-hub-icon'}>
          {filterNumberShown && `(${checkedCount})`}
        </div>

      </button>
    </div>
  );
});

FilterButton.propTypes = {
  checkedCount: PropTypes.number,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dataCount: PropTypes.number,
  dropdownLabel: PropTypes.string.isRequired,
};

FilterButton.defaultProps = {
  checkedCount: 0,
  dataCount: 0,
};

export default FilterButton;

