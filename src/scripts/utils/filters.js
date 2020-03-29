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