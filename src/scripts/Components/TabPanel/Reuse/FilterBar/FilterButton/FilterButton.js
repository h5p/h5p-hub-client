import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../../../../../utils/dictionary';

import './FilterButton.scss';

const FilterButton = ({ checked, id, onClick, open, data }) => {

  const oneChecked = checked.length == 1 && data.length == 1;

  const filterNumberShown = checked.length > 0 && !open && !oneChecked;

  const className = () => {
    if (open) {
      return 'button-filter-open';
    }
    else if (oneChecked) {
      return 'button-one-checked';
    }
    else if (filterNumberShown) {
      return 'button-filter-checked';
    }
    else {
      return '';
    }
  };

  return (
    <div id={id} className="filter-button" >
      <button
        tabIndex='-1'
        id={id}
        className={className()}
        onClick={() => onClick(id)}
        aria-label={Dictionary.get(`filter${id.charAt(0).toUpperCase() + id.slice(1)}`)}>

        {Dictionary.get(id)}
        
        <div className="icons">
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
  data: PropTypes.array
};

export default FilterButton;

