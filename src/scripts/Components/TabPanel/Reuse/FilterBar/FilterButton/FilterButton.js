import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../../../../../utils/dictionary';

import './FilterButton.scss';

const FilterButton = ({ checked, id, onClick, open, data,dropdownLabel }) => {

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

  return (
    <div id={id} className='filter-button'>
      <button
        tabIndex='-1'
        id={id}
        className={className()}
        onClick={() => onClick(id)}>

        {dropdownLabel}
        
        <div className={oneChecked ? 'icon check' : 'icon' }>
          {filterNumberShown && `(${checked.length})`}
        </div>

      </button>
    </div>
  );
};
FilterButton.propTypes = {
  checked: PropTypes.array,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.array,
  dropdownLabel: PropTypes.string.isRequired
};

export default FilterButton;

