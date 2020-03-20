import React from 'react';
import PropTypes from 'prop-types';

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
    if (nextProps.setFocus !== this.props.setFocus) {
      this.setState({focusOnRender: nextProps.setFocus});
    }
  }

  handleInput = (event) => {
    const input = event.target;
    if (input.value === this.state.value) {
      return;
    }  
    this.setState({value: input.value});

    // Automatically search/filter after input
    // Use timer to prevent filtering more than once per 40ms
    if (this.props.auto && !this.searchTimer) {
      this.searchTimer = setTimeout(() => {
        this.props.onSearch(input.value);
        this.searchTimer = null;
      }, 40);
    }
  }

  componentDidUpdate() {
    if (this.state.focusOnRender) {
      delete this.state.focusOnRender;
      this.input.focus();
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
          this.props.onSearch(event.target.value);
        }
        else {
          // Select highlighted
          this.props.onSelect();
        }
        event.preventDefault();
        break;
    }
  }

  render() {
    return (
      <div className="search-wrapper" role="search">
        <div className="border-wrap">
          <input className="hub-search-bar"
            type="text"
            defaultValue={this.state.value}
            aria-label={this.props.placeholder}
            placeholder={this.props.placeholder}
            onInput={this.props.instantSearch ? this.handleInput : () => {}}
            onKeyDown={event => this.handleKeyDown(event)}
            ref={el => this.input = el}/>
          <div className="icon-search"/>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  auto: PropTypes.bool.isRequired,
  setFocus: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  instantSearch: PropTypes.bool,
  placeholder: PropTypes.string.isRequired
};

Search.defaultProps = {
  instantSearch: false,
  onNavigate: () => {},
  onSelect: () => {},
  auto: false,
  setFocus: false
};

export default Search;
