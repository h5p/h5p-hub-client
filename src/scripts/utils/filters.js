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
 * Get the state for the tri-state checkbox
 * @param {Object} element Current element
 * @param {Object[]} children Child nodes to check
 * @param {string[]} checked Nodes that are checked
 * @returns {number, boolean} false => unchecked, true => checked, 2 => mixed
 */
export const getCheckboxTriState = (element, children, checked) => {
  if (Array.isArray(children) && children.length > 0) {
    const checkedCount = getCheckedNumber(children, {}, checked);
    const selfCheckValue = isChecked(element.id, checked) ? 2 : false;
    return checkedCount > 0 ? (checkedCount === children.length && selfCheckValue === 2) ? true : 2 : selfCheckValue;
  }
  return isChecked(element.id, checked);
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

export const summarizeChildFilterCounts = (children, countsData, initialValue = 0) => {
  return children.reduce((sum, child) => {
    let childSum = 0;
    if (child.children) {
      childSum = summarizeChildFilterCounts(child.children, countsData, 0)
    }
    return sum + (countsData[child.id] ?? 0) + childSum;
  }, initialValue);
};
