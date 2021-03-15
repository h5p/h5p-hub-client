import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './CheckboxList.scss';
import Checkbox from '../Checkbox/Checkbox';
import { isChecked, getCheckedNumber } from '../../utils/filters';

const CheckboxList = React.forwardRef(({
  items,
  onChecked,
  checked,
  filter,
  focused,
  navigateToChildren,
  parent,
  listRefId,
  getDescendants,
  tabIndex,
  appliedSearch,
  navigateDirection,
  setNavigateDirection }, ref) => {

  useEffect(() => {
    setTimeout(() => {
      setNavigateDirection('');
    }, 350);
  }, [items]);

  return (
    <ul
      className={`h5p-hub-checkbox-list ${navigateDirection ? `h5p-hub-animate-in-${navigateDirection}` : ''}`}
      role='group'
      aria-labelledby={filter.label}
      ref={ref && ref[listRefId]}>

      {items.map(element =>
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
          checkedNumber={element.children && getCheckedNumber(getDescendants(element), element, appliedSearch)}
          ref={ref && ref[element.id]}
          tabIndex={tabIndex}
        />
      )}
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
  tabIndex: PropTypes.string,
  getDescendants: PropTypes.func,
  appliedSearch: PropTypes.array,
  navigateDirection: PropTypes.string,
  setNavigateDirection: PropTypes.func
};

export default CheckboxList;