import React from 'react';
import Pagination from '../../Pagiantion/Pagination';
//import PropTypes from 'prop-types';
//import './ReuseContent.scss';
//import Dictionary from '../../utils/dictionary';

class ReuseContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSelected: '1',
      pages: 10 //Get from API call
    };
  }

  handlePageChange = (selected) => {
    if (selected == '-1') {
      this.setState({
        pageSelected: (parseInt(this.state.pageSelected) - 1).toString()
      });
    }
    else if (selected == '+1') {
      this.setState({
        pageSelected: (parseInt(this.state.pageSelected) + 1).toString()
      });
    }
    else {
      this.setState({
        pageSelected: selected
      });
    }
  }

  render() {
    return (
      <div className="reuse-view loaded">
        Reuse view
        <Pagination
          selected={this.state.pageSelected}
          pages={this.state.pages}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

/*ReuseContent.propTypes = {
};*/

export default ReuseContent;
