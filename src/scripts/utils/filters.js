import React from 'react';

/**
 * Check if a checkbox is in list of the checked checkboxes
 * @param  {string} id
 * @param  {string[]} checked 
 */
export const isChecked = (id, checked) => {
  return checked.indexOf(id) != -1;
};

/**
 * Gives the number of descendants that are checked of
 * @param  {Object[]} children
 * @param  {string[]} checkedParents
 * @returns number
 */
export const descendantsChecked = (children, checked, checkedParents) => {
  return children ?
    children.filter(element => isChecked(element.id, checked) && checkedParents.indexOf(element.id) === -1).length
    : 0;
};

/**
 * Return spans with text not matching search value in bold
 * @param  {string} label
 */
export const boldNotMatchingText = (label, searchValue) => {
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
    spans.push(<span key={'checkbox-span-' + i} className='non-bold'>{label.slice(index, index + length)}</span>);
    if (indexes[i + 1]) {
      spans.push(<span key={'checkbox-span-bold-' + i} className='bold'>{label.slice(index + length, indexes[i + 1])}</span>);
    } else {
      spans.push(<span key={'checkbox-span-bold-' + i} className='bold'>{label.slice(index + length)}</span>);
    }
    i += 1;
  });
  return (spans.map(element => element));
};