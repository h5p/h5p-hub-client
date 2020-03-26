import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

const Checkbox = ({ id, label, checked, filter, onChecked, focused, tabIndex }) => {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key == ' ') {
      onChecked(filter, id, !checked);
      e.preventDefault();
    }
  };

  return (
    <li
      id={id}
      key={id}
      className={`checkbox ${checked ? 'checked ' : 'unChecked '}${focused && 'highlighted'}`}
      role='checkbox'
      aria-checked={checked}
      onClick={() => onChecked(filter, id, !checked)}
      tabIndex= {tabIndex ? tabIndex :'0'}
      onKeyDown={handleKeyDown}>
      <div className='content' key={'label' + id} >
        <div className='label-text'>
          {label}
        </div>
      </div>
    </li>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  focused: PropTypes.bool,
  tabIndex: PropTypes.string
};

export default Checkbox;