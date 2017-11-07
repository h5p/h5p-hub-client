import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../../../../utils/dictionary';

import './Search.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // Allow search input to be reset from the parent
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value});
    }
  }

  handleFocus = () => {
    // Prevent search right after focus is recieved
    this.searchTimer = setTimeout(() => {
      this.searchTimer = null;
    }, 40);
  }

  handleInput = (event) => {
    const input = event.target;
    this.setState({value: input.value});

    // Automatically search/filter after input
    // Use timer to prevent filtering more than once per 40ms
    if (this.props.auto && !this.searchTimer) {
      this.searchTimer = setTimeout(() => {
        this.props.onFilter(input.value);
        this.searchTimer = null;
      }, 40);
    }
  }

  handleKeyDown = (event) => {
    // Allow quick selecting from the list while typing
    switch (event.which) {
      case 38: // Up
        this.props.onNavigate(-1);
        event.preventDefault();
        break;

      case 40: // Down
        this.props.onNavigate(1);
        event.preventDefault();
        break;

      case 13: // Enter
        if (!this.props.auto) {
          // Trigger filter/earch
          this.props.onFilter(event.target.value);
        }
        else {
          // Select highlighted
          this.props.onSelect();
        }
        event.preventDefault();
        break;
    }
  }

  handleBlur = () => {
    // No need to filter/search after focus is lost
    clearTimeout(this.searchTimer);
  }

  handleClick = (event) => {
    if (this.props.auto) {
      this.props.onFilter(event.target.value);
    }
  }

  render() {
    let searchLabel = Dictionary.get('contentTypeSearchFieldPlaceholder');

    return (
      <div className="search-wrapper" role="search">
        <div className="border-wrap">
          <input id="hub-search-bar"
            type="text"
            value={this.state.value || ''}
            aria-label={searchLabel}
            placeholder={searchLabel}
            onClick={event => this.handleClick(event)}
            onFocus={this.handleFocus}
            onInput={this.handleInput}
            onKeyDown={event => this.handleKeyDown(event)}
            onBlur={this.handleBlur}/>
          <div className="icon-search"></div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  auto: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Search;
