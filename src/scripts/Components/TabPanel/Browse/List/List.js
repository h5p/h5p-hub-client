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
      if (library.machineName.toLocaleLowerCase().replace('.','-') === id.replace('h5p-hub-', '')) {
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

  scrollIntoView = (element) => {
    const compensation = this.choose.items[0].offsetTop;

    // Scroll given element into view
    if (element.offsetTop - compensation < this.list.scrollTop) {
      // Scroll up to show element
      this.list.scrollTop = element.offsetTop - compensation;
      return;
    }

    const elementBottom = element.offsetTop - compensation + element.clientHeight;
    if (elementBottom > this.list.scrollTop + this.list.clientHeight) {
      // Scroll down to show element
      const computedStyles = window.getComputedStyle(this.listElement);
      this.list.scrollTop = elementBottom - this.list.clientHeight + parseFloat(computedStyles.marginTop) + parseFloat(computedStyles.marginBottom);
    }
  }

  componentDidUpdate() {
    if (this.state && this.state.resetScroll) {
      delete this.state.resetScroll;

      // Reset list scrolling
      this.list.scrollTop = 0;
    }
    else if (this.props.focused && this.choose && this.choose.items) {
      // Find highlighted element and scroll into view
      const focused = this.props.focused.machineName.toLocaleLowerCase().replace('.','-');
      for (let i = 0; i < this.choose.items.length; i++) {
        if (focused === this.choose.items[i].id) {
          this.scrollIntoView(this.choose.items[i]);
          break;
        }
      }
    }
  }

  render() {
    const listItems = this.props.contentTypes.map((contentType, i) => (
      <li key={i} id={contentType.machineName.toLocaleLowerCase().replace('.','-')} className="h5p-hub-media">
        <ListItem contentType={contentType}
          apiVersion={this.props.apiVersion}
          tabindex={this.props.focused ? (this.props.focused === contentType ? 0 : -1) : (i === 0 ? 0 : -1)}
          onSelect={this.props.onSelect}/>
      </li>
    ));

    H5P.externalDispatcher.trigger('h5p-hub-content-types-render', {
      numContentTypes: this.props.contentTypes.length,
      contentTypeListClassName: "h5p-hub-content-type-list"
    });

    return (
      <div className="h5p-hub-content-type-list"
        aria-hidden={!this.props.visible}
        ref={el => this.list = el}>

        {this.props.contentTypes.length ? (
          <ol
            ref={el => this.listElement = el}>
            <Choose selected={this.props.focused ? this.props.focused.machineName.toLocaleLowerCase().replace('.','-') : null}
              setFocus={this.props.setFocus}
              onChange={this.handleSelect}
              onFocus={this.handleFocus}
              ref={comp => this.choose = comp}>
              {listItems}
            </Choose>
          </ol>
        ) : (
          <div className="h5p-hub-no-results">
            <div className="h5p-hub-no-results-title">{Dictionary.get('noResultsFound')}</div>
            <div className="h5p-hub-no-results-desc">{Dictionary.get('noResultsFoundDesc')}</div>
          </div>
        )}
      </div>
    );
  }
}

List.propTypes = {
  contentTypes: PropTypes.array.isRequired,
  apiVersion: PropTypes.object.isRequired,
  focused: PropTypes.object,
  visible: PropTypes.bool,
  setFocus: PropTypes.bool,
  onUse: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
};

export default List;
