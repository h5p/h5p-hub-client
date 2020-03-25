import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

const Checkbox = React.forwardRef(
  ({ id,
    label,
    checked,
    filter,
    onChecked,
    focused,
    children,
    navigateToChildren,
    parent,
    childrenChecked,
    tabIndex }, ref) => {

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key == ' ') {
        onChecked(filter, id, !checked);
        e.preventDefault();
      }
    };

    const onlyChecked = (filter, id, checked, e) => {
      if (e) {
        e.stopPropagation();
        onChecked(filter, id, checked, parent);
      }
    };

    return (
      <li
        ref={ref}
        id={id}
        key={parent + id}
        className={`checkbox ${checked ? 'checked ' : 'unChecked '} ${focused ? 'highlighted' : ''} ${children ? 'parent' : ''}`}
        role='checkbox'
        aria-checked={checked}
        onClick={() => children ? navigateToChildren(id, children) : onChecked(filter, id, !checked, parent)}
        tabIndex={tabIndex ? tabIndex : '0'}
        onKeyDown={handleKeyDown}>
        <div className='content' key={'label' + id}>
          <div className='icon' onClick={(e) => children ? onlyChecked(filter, id, !checked, e) : {}} />
          <div className='label-text'>
            {label}
            {childrenChecked &&
              ` (${childrenChecked})`
            }
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
  children: PropTypes.array,
  navigateToChildren: PropTypes.func,
  parent: PropTypes.string,
  tabIndex: PropTypes.string
};

export default Checkbox;