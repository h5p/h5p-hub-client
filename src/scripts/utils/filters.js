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
 * @param  {Object} children
 * @param  {string[]} appliedSearch
 * @returns number
 */
export const getCheckedNumber = (children, element, appliedSearch) => {
  const descendantsChecked = children ?
    children.filter(element => isChecked(element.id, appliedSearch)).length
    : 0;
  const elementApplied = appliedSearch.indexOf(element.id) === -1 ? 0 : 1;
  return descendantsChecked + elementApplied;
};

/**
 * Return spans with text not matching search value in bold
 * @param  {string} label
 */
export const boldTextNotMatching = (label, searchValue) => {
  const indexes = []; //Start indexes of each span with text not being bold
  const length = searchValue.length;

  //Check all occerences of the search value in label
  for (let i = 0; i < label.length; i++) {
    if (label.slice(i, i + length).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
      indexes.push(i);
      i += length;
    }
  }

  const spans = [(<span key={'checkbox-span-bold-start'} >{label.slice(0, indexes[0])}</span>)];
  indexes.forEach((index, i = 0) => {
    spans.push(<span key={'checkbox-span-' + i} className='h5p-hub-non-bold'>{label.slice(index, index + length)}</span>);
    if (indexes[i + 1]) {
      spans.push(<span key={'checkbox-span-bold-' + i} >{label.slice(index + length, indexes[i + 1])}</span>);
    } else {
      spans.push(<span key={'checkbox-span-bold-' + i} >{label.slice(index + length)}</span>);
    }
    i += 1;
  });
  return (spans.map(element => element));
};