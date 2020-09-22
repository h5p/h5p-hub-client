import React from 'react';
import PropTypes from 'prop-types';

class Choose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      focused: props.selected
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected,
      focused: nextProps.selected
    });
    if (nextProps.setFocus !== this.props.setFocus) {
      this.setState({
        focusOnRender: true
      });
    }
  }

  select(id) {
    let item = null;
    for (let i = 0; i < this.items.length; i++) {
      if (id === this.items[i].id) {
        item = this.items[i];
        break;
      }
    }
    this.props.onChange(id, item && item.attributes);
    this.setState({ selected: id });
  }

  focus(id, preventFocus) {
    if (id) {
      this.setState({ focused: id, focusOnRender: !preventFocus });
      if (this.props.onFocus) {
        this.props.onFocus(id);
      }
    }
  }

  getSiblingIdFor(id, dir) {
    for (let i = 0; i < this.items.length; i++) {
      if (id === this.items[i].id) {
        const sibling = this.items[i + dir];
        if (sibling) {
          return sibling.id;
        }
      }
    }
  }

  handleClick(event, id) {
    if (!event.defaultPrevented) {
      this.select(id);
      if (event.target.tagName === 'A') {
        event.preventDefault();
      }
    }
  }

  handleKeyDown(event, id) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.which) {
      case 37: // Left
      case 38: // Up
        this.focus(this.getSiblingIdFor(id, -1));
        event.preventDefault();
        break;

      case 39: // Right
      case 40: // Down
        this.focus(this.getSiblingIdFor(id, 1));
        event.preventDefault();
        break;

      case 32: // Space
      case 13: // Enter
        this.select(id);
        event.preventDefault();
        break;
    }
  }

  componentDidUpdate() {
    if (this.state.focusOnRender) {
      delete this.state.focusOnRender;
      if (!this.state.focused) {
        // Focus first item
        if (this.items[0]) {
          this.items[0].focus();
        }
      }
      else {
        // Find highlighted item and give focus
        for (let i = 0; i < this.items.length; i++) {
          if (this.state.focused === this.items[i].id) {
            this.items[i].focus();
            break;
          }
        }
      }
    }
  }


  cloneChild = (child) => !child ? null : React.cloneElement(child, child.props.id ? {
    className: (child.props.className ? child.props.className + ' ' : '') + (this.state.selected ? (child.props.id === this.state.selected ? 'h5p-hub-highlight' : '') : (!this.count ? 'h5p-hub-highlight' : '')),
    tabIndex: (this.state.focused ? (child.props.id === this.state.focused ? 0 : -1) : (!this.count++ ? 0 : -1)),
    role: ['a', 'button'].indexOf(child.type) !== -1 ? undefined : child.props.role || 'button',
    onClick: event => this.handleClick(event, child.props.id),
    onKeyDown: event => this.handleKeyDown(event, child.props.id),
    ref: item => item && !child.props.disabled ? this.items.push(item) : undefined //If disabled then you can't navigate to that element
  } : undefined, !child.props.id && child.props.children ? React.Children.map(child.props.children, this.cloneChild) : child.props.children)

  render() {
    this.items = []; // Array to preserve order
    this.count = 0;
    return React.Children.map(this.props.children, this.cloneChild);
  }
}

Choose.propTypes = {
  selected: PropTypes.string,
  setFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onScrollIntoView: PropTypes.func
};

export default Choose;
