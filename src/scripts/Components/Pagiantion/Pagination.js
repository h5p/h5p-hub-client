import React from 'react';
import PropTypes from 'prop-types';

//import Dictionary from '../../utils/dictionary';

import './Pagination.scss';
import Choose from '../Choose/Choose';
import { paginationList } from '../../utils/paginationList';

const Pagination = ({ selected, pages, onChange, setFocus, onFocus }) => {


  return (
    <nav>
      <ul className="list-of-numbers" aria-label={"Pagination Navigation"}>
        <Choose selected={selected} onChange={onChange} setFocus={setFocus} onFocus={onFocus}>
          {paginationList(selected, pages)}
        </Choose>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  selected: PropTypes.string.isRequired,
  pages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Pagination;
