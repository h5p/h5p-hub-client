import React from 'react';
import Dictionary from '../../utils/dictionary';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFocus() {
    // Prevent search right after focus is recieved
    this.searchTimer = setTimeout(() => {
      this.searchTimer = null;
    }, 40);
  }

  handleInput() {
    const input = this.input;
    // Automatically search/filter after input
    // Use timer to prevent filtering more than once per 40ms
    if (this.props.auto && !this.searchTimer) {
      this.searchTimer = setTimeout(() => {
        this.props.onFilterBy(input.value);
        this.searchTimer = null;
      }, 40);
    }
  }

  handleKeyDown(event) {
    // Allow quick selecting from the list while typing
    switch (event.which) {
      case 38: // Up
        this.props.onSelectedChange(-1);
        event.preventDefault();
        break;

      case 40: // Down
        this.props.onSelectedChange(1);
        event.preventDefault();
        break;

      case 13: // Enter
        this.props.onUseSelected();
        event.preventDefault();
        break;
    }
  }

  handleBlur() {
    // No need to filter/search after focus is lost
    clearTimeout(this.searchTimer);
  }

  reset() {
    this.input.value = '';
  }

  render() {
    let searchLabel = Dictionary.get('contentTypeSearchFieldPlaceholder');

    return (
      <div className="input-group" role="search">
        <input id="hub-search-bar"
          className="form-control form-control-rounded"
          type="text"
          aria-label={searchLabel}
          placeholder={searchLabel}
          onClick={() => this.props.onFilterBy(this.input.value)}
          onFocus={this.handleFocus.bind(this)}
          onInput={this.handleInput.bind(this)}
          onKeyDown={e => this.handleKeyDown(e)}
          onBlur={this.handleBlur.bind(this)}
          ref={input => this.input = input}/>
        <div className="input-group-addon icon-search"></div>
      </div>
    );
  }
}

export default Search;
