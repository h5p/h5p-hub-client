import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem/ListItem';
import Choose from '../../../Choose/Choose';
import Dictionary from '../../../../utils/dictionary';

import './List.scss';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contentTypes !== this.props.contentTypes) {
      // Reset scrolling when content types change
      this.setState({resetScroll: true});
    }
  }

  getLibrary = (id) => {
    for (let i = 0; i < this.props.contentTypes.length; i++) {
      const library = this.props.contentTypes[i];
      if (library.machineName.toLocaleLowerCase().replace('.','-') === id) {
        return library;
      }
    }
  }

  handleFocus = (id) => {
    this.props.onFocus(this.getLibrary(id));
  }

  handleSelect = (id) => {
    const contentType = this.getLibrary(id);
    if (contentType.installed) {
      this.props.onUse(contentType);
    }
    else {
      this.props.onSelect(contentType);
      this.props.onFocus(contentType);
    }
  }

  componentDidUpdate() {
    if (this.state.resetScroll) {
      delete this.state.resetScroll;

      // Reset list scrolling
      this.list.scrollTop = 0;
    }
  }

  render() {
    const listItems = this.props.contentTypes.map((contentType, i) => (
      <li key={i} id={contentType.machineName.toLocaleLowerCase().replace('.','-')} className="media">
        <ListItem contentType={contentType}
          tabindex={this.props.focused ? (this.props.focused === contentType ? 0 : -1) : (i === 0 ? 0 : -1)}
          onSelect={this.props.onSelect}/>
      </li>
    ));

    return (
      <div className="content-type-list"
        aria-hidden={!this.props.visible}
        ref={el => this.list = el}>

        {this.props.contentTypes.length ? (
          <ol>
            <Choose selected={this.props.focused ? this.props.focused.machineName.toLocaleLowerCase().replace('.','-') : null}
              setFocus={this.props.setFocus}
              onChange={this.handleSelect}
              onFocus={this.handleFocus}>
              {listItems}
            </Choose>
          </ol>
        ) : (
          <div className="no-results">
            <div className="no-results-title">{Dictionary.get('noResultsFound')}</div>
            <div className="no-results-desc">{Dictionary.get('noResultsFoundDesc')}</div>
          </div>
        )}
      </div>
    );
  }
}

List.propTypes = {
  contentTypes: PropTypes.array.isRequired,
  focused: PropTypes.object,
  visible: PropTypes.bool,
  setFocus: PropTypes.bool,
  onUse: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
};

export default List;
