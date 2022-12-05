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
  checkedNumber,
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

  const getStateCssClasses = () => {
    return [
      checked === true ? 'h5p-hub-checked' : '',
      checked === 2 ? 'h5p-hub-mixed-state' : '',
      focused ? 'h5p-hub-highlighted' : '',
      checkboxChildren ? 'h5p-hub-parent' : '',
      checkedNumber === 0 ? 'h5p-hub-checkbox-disabled' : '',
    ].join(' ');
  };

  return (
    <li
      ref={ref}
      id={'h5p-hub-' + id}
      key={filter + id}
      className={`h5p-hub-checkbox ${getStateCssClasses()}`}
      role='checkbox'
      aria-checked={checked === 2 ? 'mixed' : checked}
      aria-disabled={checkedNumber === 0}
      onClick={checkedNumber > 0 ?
        () => checkboxChildren ? navigateToChildren(id, checkboxChildren) : onChecked(filter, id, !checked) :
        null
      }
      tabIndex={tabIndex ? tabIndex : '0'}
      onKeyDown={handleKeyDown}
    >
      <div className='h5p-hub-content' key={'label' + id}>
        <div className='h5p-hub-icon' 
          onClick={checkedNumber > 0 ?
            (e) => checkboxChildren ? onCheckedClick(filter, id, !checked, e) : {} :
            null
        }
        />
        <div className='h5p-hub-label-text'>
          {children ? children : label} {` (${checkedNumber})`}
        </div>
      </div>
    </li>
  );
});

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  filter: PropTypes.string.isRequired,
  focused: PropTypes.bool,
  children: PropTypes.any,
  checkboxChildren: PropTypes.array,
  navigateToChildren: PropTypes.func,
  parent: PropTypes.string,
  tabIndex: PropTypes.string,
  checkedNumber: PropTypes.any
};

export default Checkbox;
