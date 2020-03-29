import React from 'react';
import PropTypes from 'prop-types';
import './CheckboxList.scss';
import Checkbox from '../Checkbox/Checkbox';
import {isChecked, descendantsChecked} from '../../utils/filters';

const CheckboxList = React.forwardRef(({
  items,
  onChecked,
  checkedParents,
  checked,
  filter,
  focused,
  navigateToChildren,
  parent,
  listRefId,
  getDescendants,
  tabIndex}, ref) => {


  return (
    <ul
      className="checkbox-list"
      id='checkbox-list'
      role='group'
      aria-labelledby={filter.label}
      ref={ref && ref[listRefId]}>

      {items.map(element => {
        return (
          <Checkbox
            key={parent + element.id}
            id={element.id}
            label={element.label}
            checked={isChecked(element.id, checked)}
            filter={filter}
            onChecked={onChecked}
            focused={focused == element.id}
            checkboxChildren={element.children}
            navigateToChildren={navigateToChildren}
            parent={parent}
            descendantsChecked={element.children && descendantsChecked(getDescendants(element),checked,checkedParents)}
            ref={ref && ref[element.id]}
            tabIndex={tabIndex}
          />
        );
      })}
    </ul>
  );
});
CheckboxList.propTypes = {
  items: PropTypes.array,
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.array,
  filter: PropTypes.string.isRequired,
  focused: PropTypes.string,
  navigateToChildren: PropTypes.func,
  parent: PropTypes.string,
  listRefId: PropTypes.string,
  tabIndex: PropTypes.string
};

export default CheckboxList;