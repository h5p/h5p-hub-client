import React from 'react';
import PropTypes from 'prop-types';
import './CategoryList.scss';
import { isChecked, descendantsChecked } from '../../../../../../../utils/filters';
import Checkbox from '../../../../../../Checkbox/Checkbox';

const CategoryList = React.forwardRef(({
  onChecked,
  checkedParents,
  checked,
  filter,
  focused,
  parent,
  listRefId,
  getDescendants,
  tabIndex,
  categoryList,
  searchValue,
  categoryRefId }, ref) => {

  /**
   * Return spans with text not matching search value in bold
   * @param  {string} label
   */
  const getSpans = (label) => {
    const indexes = []; //Start indexes of each span with text not being bold
    const length = searchValue.length;

    //Check all occerences of the search value in label
    for (let i = 0; i < label.length; i++) {
      if (label.slice(i, i + length).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
        indexes.push(i);
        i += length;
      }
    }

    const spans = [(<span key={'checkbox-span-bold-start'} className='bold'>{label.slice(0, indexes[0])}</span>)];
    indexes.forEach((index, i = 0) => {
      spans.push(<span key={'checkbox-span-' + i}>{label.slice(index, index + length)}</span>);
      if (indexes[i + 1]) {
        spans.push(<span key={'checkbox-span-bold-' + i} className='bold'>{label.slice(index + length, indexes[i + 1])}</span>);
      } else {
        spans.push(<span key={'checkbox-span-bold-' + i} className='bold'>{label.slice(index + length)}</span>);
      }
      i += 1;
    });
    return (spans.map(element => element));
  };

  /**
   * Return a list of checboxElements with span as children
   * @param  {Object[]} checkboxList
   */
  const getCheckboxes = (checkboxList) => {
    return (
      checkboxList.map(element => {
        return (
          <div key={parent + element.id}>
            <Checkbox
              key={parent + element.id}
              id={element.id}
              label={element.label}
              checked={isChecked(element.id, checked)}
              filter={filter}
              onChecked={onChecked}
              focused={focused === element.id}
              parent={parent}
              descendantsChecked={descendantsChecked(getDescendants(element), checked, checkedParents)}
              ref={ref && ref[element.id]}
              tabIndex={tabIndex}
            >
              {getSpans(element.label)}
            </Checkbox>
          </div>
        );
      }));
  };


  return (
    <ul
      className="checkbox-list"
      id='checkbox-list'
      role='group'
      aria-labelledby={filter.label}
      ref={ref && ref[listRefId]}>

      {getCheckboxes(categoryList.topCategories)}
      {
        categoryList.map(category => {
          return (
            <div key={'div-' + category.id}>
              <div key={category} ref={ref && ref[categoryRefId]} className='category-header'>in {category.label}</div>
              {getCheckboxes(category.children)}
            </div>
          );
        })
      }

    </ul>
  );
});
CategoryList.propTypes = {
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.array,
  filter: PropTypes.string.isRequired,
  focused: PropTypes.string,
  parent: PropTypes.string,
  listRefId: PropTypes.string.isRequired,
  tabIndex: PropTypes.string,
  categoryRefId: PropTypes.string.isRequired,
  checkedParents: PropTypes.array,
  getDescendants: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  searchValue: PropTypes.string.isRequired
};

export default CategoryList;