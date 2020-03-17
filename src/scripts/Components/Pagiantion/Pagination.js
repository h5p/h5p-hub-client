import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../utils/dictionary';

import './Pagination.scss';
import Choose from '../Choose/Choose';
import { paginationList } from '../../utils/paginationList';


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

  resize = () => {
    this.setState({
      screenWidth: document.documentElement.clientWidth
    });
  }

  handlePageSelected = (id, attributes) => {
    let pageNumber = attributes.getNamedItem('data-page').value;
    let setFocus = this.props.setFocus;
    let newId = id;
    if (pageNumber == '-1') {
      pageNumber = this.props.selectedPage - 1;
      newId = `paginator-page-${pageNumber}`;
    }
    else if (pageNumber == '+1') {
      pageNumber = this.props.selectedPage + 1;
      newId = `paginator-page-${pageNumber}`;
    }
    //Toggle setFocus to force focus to change
    if (pageNumber == 1 || pageNumber == this.props.pages) {
      setFocus = !this.props.setFocus;
    }
    this.props.onChange(newId, setFocus, parseInt(pageNumber));
  };

  render() {
    return (
      <nav>
        <ul className="list-of-numbers" aria-label={Dictionary.get('paginationNavigation')}>
          <Choose selected={this.props.selectedId} onChange={this.handlePageSelected} setFocus={this.props.setFocus}>
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
  selectedId: PropTypes.string.isRequired,
  setFocus: PropTypes.bool
};

export default Pagination;
