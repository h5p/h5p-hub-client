import React from 'react';
import PropTypes from 'prop-types';
import CheckboxList from '../../../../../CheckboxList/CheckboxList';
import CategoryList from './CategoryList/CategoryList';
import SearchField from './SearchField/SearchField';
import './SearchFilter.scss';
import Dictionary from '../../../../../../utils/dictionary';

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxElements: this.props.items.sort(this.compare),
      searchValue: '',
      dropdownOpen: false,
      setFocus: false,
      focused: null,
      checkedParents: [],
      parent: [],
      inSearch: false,
      categoryList: [],
      navigateDirection: ''
    };

    this.searchRef = React.createRef();
    this.leafs = []; //List of elements that can be checked on or off and that are not a category
    this.allParents = [];
    this.parents = [];
    this.checkboxRefs = {};

    this.listRefId = 'list';
    this.categoryRefId = 'category';
    this.checkboxRefs[this.listRefId] = React.createRef();


    this.setParentsAndLeafs(this.props.items);
    this.parents.forEach(parent => {
      this.checkboxRefs[parent.id] = React.createRef();
      this.checkboxRefs[this.categoryRefId + parent.id] = React.createRef();
    });
    this.leafs.forEach(checkbox => this.checkboxRefs[checkbox.id] = React.createRef());
  }

  /**
   * Set the right parents to checked and keep dropdown open if any checked
   */
  componentDidMount() {
    this.setParentsChecked();
    if (this.props.dropdownAlwaysOpen) {
      this.setState({
        dropdownOpen: true
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      parent: [],
      focused: null,
      inSearch: false,
      dropdownOpen: this.props.dropdownAlwaysOpen
    });
  }
  /**
   * Checks of the parents that has descendants that are checked
   * @param  {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.setParentsChecked([], false);
    }
  }

  /**
   * Clears search value
   */
  handleClearSearch = () => {
    this.setState({
      checkboxElements: this.props.items.sort(this.compare),
      searchValue: '',
      inSearch: false,
      categoryList: [],
      dropdownOpen: true
    });
    this.searchRef.current.focus();
  }

  /**
   * Filter the checkboxlist according to search value
   * Set new values to the state
   * @param  {string} searchValue
   */
  handleOnSearch = (searchValue) => {
    if (searchValue === '') {
      this.handleClearSearch();
    }
    else if (searchValue.length === 1) {
      this.setState({
        searchValue: searchValue,
        checkboxElements: this.props.items,
        dropdownOpen: true,
        parent: [],
        inSearch: true,
        focused: null,
        categoryList: []
      });
    }
    else {
      let list = [];
      let categoryList = [];
      //This filter don't have categories to be shown
      if (!this.props.category) {
        list = this.leafs && this.leafs
          .filter(element => RegExp(searchValue.toUpperCase()).test(element.label.toUpperCase())).sort(this.compare);

      } 
      else {
        categoryList = this.makeCategorySearchList(searchValue);
        categoryList.forEach(category => {
          category.catNoParent && list.push(category.catNoParent);
          list.push.apply(list, category.children);
        });
      }

      this.setState({
        checkboxElements: list,
        searchValue: searchValue,
        dropdownOpen: true,
        parent: [],
        inSearch: true,
        focused: null,
        categoryList: categoryList
      });
    }
  };

  /**
   * Make a filtered list indexed by the categories
   * @param  {string} value
   */
  makeCategorySearchList = (value) => {
    const searchList = [];
    //Add categories for each parent that has children that match the search
    for (let i = 0; i < this.props.items.length; i++) {
      const element = this.props.items[i];
      //Check if the parent doesn't have a parent and match value 
      const parentMatch = RegExp(value.toUpperCase()).test(element.label.toUpperCase())
        && this.getCheckboxFromId(element.id, this.props.items);
      let children = [];
      if(element.children) {
        children = element.children.filter((element => RegExp(value.toUpperCase()).test(element.label.toUpperCase())));
      }

      if (children.length > 0) {
        searchList.push({
          id: element.id,
          label: element.label,
          children: children,
          catNoParent: parentMatch ? element : null
        });
      }
      else if (parentMatch) {
        searchList.push({
          id: element.id,
          label: element.label,
          catNoParent: element
        });
      }
    }
    //Add a property to the elements that should not have a line under, used in CategoryList.
    for (let i = 0; i < searchList.length; i++) {
      const element = searchList[i];
      if (searchList[i + 1] && element.children && element.children.map(child => child.id).indexOf(searchList[i + 1].id) !== -1) {
        searchList[i] = { ...element, noLine: true };
      }
    }
    searchList[searchList.length - 1] = { ...searchList[searchList.length - 1], noLine: true };

    return searchList;
  }

  /**
   * Open list with checkbox if search field is foused on. 
   */
  handleSearchFocus = () => {
    if (!this.click && !this.state.dropdownOpen) {
      this.click = setTimeout(() => {
        this.setState(({
          dropdownOpen: true
        }));
        this.click = null;
      }, 100);
    }
  }

  /**
    Open and close checkboxlist
  */
  handleSearchClick = () => {
    if (!this.click) {
      this.click = setTimeout(() => {
        this.setState((prevState) => ({
          dropdownOpen: this.props.dropdownAlwaysOpen || !prevState.dropdownOpen
        }));
        this.click = null;
      }, 100);
    }
  }

  /**
   * Updates state and use callbacks with a checkbox being switched on or off
   * @param  {string} filterType
   * @param  {string} checkboxId id
   * @param  {boolean} isChecked
   */
  handleChecked = (filterType, checkboxId, isChecked) => {
    if (this.state.dropdownOpen && checkboxId && this.state.checkboxElements[this.indexOfId(checkboxId)]) {
      this.setState({setFocus: true, focused: checkboxId});
      const children = this.state.checkboxElements[this.indexOfId(checkboxId)].children;

      //The checkbox is a category and all it's descendants should either be checked on or off.
      if (children) {
        const checkbox = this.getCheckboxFromId(checkboxId, this.parents);
        const descendants = this.getDescendants(checkbox)
          .map(element => element.id);
        this.props.handleChecked(filterType, [
          checkboxId,
          ...descendants
        ], isChecked);
      }
      else {
        this.props.handleChecked(filterType, checkboxId, isChecked);
      }
      this.searchRef.current.focus();
    }
  }

  /**
   * Goes through all parents and set thoose that has checked descendants as checked
   * @param  {string || Object[]} checkbox
   * @param  {boolean} checkedOf
   */
  setParentsChecked = () => {
    const checkedParents = [];
    this.parents.forEach(parent => this.checkedOf(this.getDescendants(parent), this.props.checked) ? checkedParents.push(parent.id) : {});
    this.setState({ checkedParents: checkedParents });
  }

  /**
   * Finds next element to be focused and scroll it into view if necessary
   * @param  {number} direction
   */
  handleNavigateVertical = (direction) => {
    const index = this.indexOfId(this.state.focused) + direction;
    const sibling = this.state.checkboxElements[index];

    //Can't find sibling and set focused to first element
    if (this.state.dropdownOpen && index !== this.state.checkboxElements.length && sibling === undefined) {
      this.setState({ focused: this.state.checkboxElements.map(element => element.id)[0] });
      this.checkboxRefs[this.listRefId].current.scrollTop = 0;
    }
    else if (this.state.dropdownOpen && index !== this.state.checkboxElements.length) {
      this.setState({ focused: sibling.id });

      //Calculate scrolltop
      const checkboxHeight = this.checkboxRefs[this.state.checkboxElements[0].id].current.offsetHeight;
      const listHeight = this.checkboxRefs[this.listRefId].current.offsetHeight;
      const parentHeaderHeight = this.state.parent ? checkboxHeight : 0;
      let categoryHeight = 0;
      let categoriesCount = 0;

      //Number of category headers that are shown and need to be calculated
      if (this.state.categoryList.length > 0) {
        //Height of the category text element
        categoryHeight = this.checkboxRefs[this.categoryRefId + this.state.categoryList[0].id].current.offsetHeight;
        let childrenCount = 0;
        for (let cat of this.state.categoryList) {
          if (cat.catNoParent) {
            childrenCount += 1;
          }
          if (childrenCount > index) {
            break;
          }
          childrenCount += cat.children.length;
          categoriesCount += 1;
        }
      }
      const scrolltop = parentHeaderHeight + ((index + 1) * checkboxHeight) + ((categoriesCount ) * categoryHeight) - listHeight;
      this.checkboxRefs[this.listRefId].current.scrollTop = scrolltop;
    }
  }

  /**
   * Navigate to children or to the first level according to direction
   * @param  {number} direction 1 or -1
   */
  handleNavigateSideway = (direction) => {
    if (this.state.dropdownOpen && direction == -1 && this.state.parent) {
      this.navigateToParent();
    }
    else if (this.state.dropdownOpen && direction == 1 && this.state.focused && this.getCheckboxFromId(this.state.focused, this.parents)) {
      this.navigateToChildren(this.state.focused, this.getCheckboxFromId(this.state.focused, this.parents).children);
    }
  }

  /**
   * Navigate to the leafes of the id
   * @param  {string} id
   * @param  {array} children
   */
  navigateToChildren = (id, children) => {
    this.setState({
      checkboxElements: children,
      parent: [...this.state.parent, id],
      navigateDirection: 'right'
    });
    this.searchRef.current.focus();
  }

  /**
   * Navigate one level up and set the current parent if it exists. 
   */
  navigateToParent = () => {
    const parent = this.state.parent[this.state.parent.length - 2];
    const checkboxElements = this.getCheckboxFromId(parent, this.parents) && this.getCheckboxFromId(parent, this.parents).children;
    const newParent = this.state.parent;
    const focused = newParent.pop();
    this.setState({
      parent: newParent,
      checkboxElements: checkboxElements ? checkboxElements : this.props.items.sort(this.compare),
      focused: focused,
      navigateDirection: 'left'
    });
    this.searchRef.current.focus();
  }

  /**
   * Compares to inputs alphabetically according to label
   * @param  {object} a
   * @param  {object} b
   */
  compare = (a, b) => {
    let nameA = a.label.toUpperCase();
    let nameB = b.label.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  }

  /**
   * Return all descendants of an element
   * @param  {Object} parent an Object with id,label and children
   * @return {array}
   */
  getDescendants = (parent) => {
    if (parent === null) {
      return [];
    }
    const children = [];
    const list = [parent];
    while (list.length > 0) {
      const element = list.pop();
      if (element && element.children) {
        children.concat(element.children);
        element.children.forEach(
          element => {
            children.push(element);
            list.push(element);
          }
        );
      }
    }
    return children;
  }

  /**
   * Recurssive function that fill this.parents and this.leafs with all parents and leafs
   * @param  {Object[]} childrenList
   */
  setParentsAndLeafs = (childrenList) => {
    for (let i = 0; i < childrenList.length; i++) {
      const element = childrenList[i];
      if (element.children) {
        this.parents.push(element);
        this.setParentsAndLeafs(element.children);
      } else if (this.getCheckboxFromId(element.id, this.leafs) === null) {
        this.leafs.push(element);
      }
    }
  }

  /**
   * Lookup checkbox by id
   * 
   * @param {string} id
   * @param {array} list - list to search in
   * @returns {Object} The filter
   */
  getCheckboxFromId = (id, list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return (list[i]);
      }
    }
    return null;
  };

  /**
   * Checks if a list has any checked of or if an element is checked of
   * @param  {array || string} element 
   * @returns {boolean}
   */
  checkedOf(element, checked) {
    if (Array.isArray(element) && checked) {
      return checked ? element.filter(element => checked.indexOf(element.id) !== -1).length > 0 : false;
    } else {
      return this.props.checked.indexOf(element) != -1 || this.state.checkedParents.indexOf(element) !== -1;
    }
  }

  /**
   * Index of an id in the currently checkboxelements
   * @param  {string} id
   * @returns {string}
   */
  indexOfId = (id) => {
    return this.state.checkboxElements.map(element => element.id).indexOf(id);
  }

  render() {
    return (
      <div className="h5p-hub-search-filter">
        <SearchField
          ref={this.searchRef}
          value={this.state.searchValue}
          onSearch={this.handleOnSearch}
          placeholder={this.props.dictionary.searchPlaceholder}
          onClick={this.handleSearchClick}
          onNavigateVertical={this.handleNavigateVertical}
          onSelect={() => this.handleChecked(this.props.filter, this.state.focused, !(this.checkedOf(this.state.focused)), this.state.parent[this.state.parent.length - 1])}
          onNavigateSideway={this.handleNavigateSideway}
          onFocus={this.handleSearchFocus}
          inSearch={this.state.inSearch}
        />
        {this.state.parent.length > 0 && this.state.dropdownOpen &&
          <div className='h5p-hub-navigate-parent'>
            <button onClick={this.navigateToParent} aria-label={Dictionary.get('navigateToParent')}/>
            {this.getCheckboxFromId(this.state.parent[this.state.parent.length - 1], this.parents).label}
          </div>
        }
        {this.state.searchValue.length > 0 &&
          <button onClick={this.handleClearSearch} className="h5p-hub-clear-button" />
        }
        {this.state.dropdownOpen && this.props.items && (!this.props.category || this.state.searchValue.length < 2) &&
          <CheckboxList
            onChecked={this.handleChecked}
            items={this.state.checkboxElements}
            checked={this.props.checked.concat(this.state.checkedParents)}
            checkedParents={this.state.checkedParents}
            filter={this.props.filter}
            focused={this.state.focused}
            navigateToChildren={this.navigateToChildren}
            parent={this.state.parent[this.state.parent.length - 1]}
            ref={this.checkboxRefs}
            listRefId={this.listRefId}
            getDescendants={this.getDescendants}
            tabIndex='-1'
            appliedSearch={this.props.checked}
            navigateDirection={this.state.navigateDirection}
            setNavigateDirection={(value) => this.setState({ navigateDirection: value })}
          />
        }{
          this.state.dropdownOpen && this.props.items && this.props.category && (this.state.categoryList.length > 0 || this.state.categoryList.topCategories) && this.state.inSearch &&
          <CategoryList
            onChecked={this.handleChecked}
            checked={this.props.checked.concat(this.state.checkedParents)}
            checkedParents={this.state.checkedParents}
            filter={this.props.filter}
            focused={this.state.focused}
            ref={this.checkboxRefs}
            listRefId={this.listRefId}
            getDescendants={this.getDescendants}
            tabIndex='-1'
            categoryList={this.state.categoryList}
            searchValue={this.state.searchValue}
            categoryRefId={this.categoryRefId}
            appliedSearch={this.props.checked}
          />
        }
      </div>
    );
  }
}

SearchFilter.propTypes = {
  items: PropTypes.array,
  handleChecked: PropTypes.func.isRequired,
  checked: PropTypes.array,
  filter: PropTypes.string.isRequired,
  dictionary: PropTypes.object.isRequired,
  category: PropTypes.bool,
  dropdownAlwaysOpen: PropTypes.bool
};

export default SearchFilter;