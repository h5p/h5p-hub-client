import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

const Checkbox = React.forwardRef(({
  id,
  label,
  checked,
  filter,
  onChecked,
  focused,
  checkboxChildren,
  navigateToChildren,
  parent,
  descendantsChecked,
  tabIndex,
  children }, ref) => {

  /**
   * Checkes of current checkbox if you use enter or space
   * @param  {event} e
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key == ' ') {
      onChecked(filter, id, !checked);
      e.preventDefault();
    }
  };

  /**
   * Stop propagation so click only check of checkbox and don't navigate
   * @param  {string} filter
   * @param  {string} id
   * @param  {bool} checked
   * @param  {event} e
   */
  const onCheckedClick = (filter, id, checked, e) => {
    e.stopPropagation();
    onChecked(filter, id, checked, parent);
  };

  return (
    <li
      ref={ref}
      id={id}
      key={filter + id}
      className={`checkbox ${checked ? 'checked ' : ''} ${focused ? 'highlighted' : ''} ${checkboxChildren ? 'parent' : ''}`}
      role='checkbox'
      aria-checked={checked}
      onClick={() => 
        checkboxChildren ? navigateToChildren(id, checkboxChildren) : onChecked(filter, id, !checked)
      }
      tabIndex={tabIndex ? tabIndex : '0'}
      onKeyDown={handleKeyDown}>
      <div className='content' key={'label' + id}>
        <div className='icon' 
          onClick={(e) =>
            checkboxChildren ? onCheckedClick(filter, id, !checked, e) : {}
          }
        />
        <div className='label-text'>
          {children ? children : label}
          {descendantsChecked > 0 && ` (${descendantsChecked})`}
        </div>
      </div>
    </li>
  );
});

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  focused: PropTypes.bool,
  children: PropTypes.any,
  checkboxChildren: PropTypes.array,
  navigateToChildren: PropTypes.func,
  parent: PropTypes.string,
  tabIndex: PropTypes.string,
  descendantsChecked: PropTypes.any
};

export default Checkbox;