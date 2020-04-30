import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../utils/dictionary';

import './Pagination.scss';
import Choose from '../Choose/Choose';
import { paginationList, pageNumToId } from '../../utils/paginationList';

class Pagination extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      screenWidth: document.documentElement.clientWidth
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      screenWidth: document.documentElement.clientWidth
    });
  }

  /**
   * Find the new selected page and control if focus need to be changed
   * @param  {string} id
   * @param  {Object} attributes
   */
  handlePageSelected = (id, attributes) => {
    let pageNumber = attributes.getNamedItem('data-page').value;
    let setFocus = this.props.setFocus;

    if (pageNumber == '-1') {
      pageNumber = this.props.selectedPage - 1;
    }
    else if (pageNumber == '+1') {
      pageNumber = this.props.selectedPage + 1;
    }
    //Toggle setFocus to force focus to change
    //Make sure focus won't get stuck in arrows, when arrows are disabled in each end of numbers
    if (pageNumber == 1 || pageNumber == this.props.pages) {
      setFocus = !this.props.setFocus;
    }
    this.props.onChange(setFocus, parseInt(pageNumber));
  };

  render() {
    return (
      <nav role="navigation">
        <ul className="list-of-numbers" aria-label={Dictionary.get('paginationNavigation')}>
          <Choose 
            selected={pageNumToId(this.props.selectedPage)}
            onChange={this.handlePageSelected}
            setFocus={this.props.setFocus}
          >
            {paginationList(this.props.selectedPage, this.props.pages, this.state.screenWidth)}
          </Choose>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  setFocus: PropTypes.bool
};

export default Pagination;
