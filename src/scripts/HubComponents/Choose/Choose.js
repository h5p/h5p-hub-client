import React from 'react';

class Choose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      focused: props.selected
    };
  }

  select(id) {
    this.props.onChange(id);
    this.setState({selected: id});
  }

  focus(id) {
    this.setState({focused: id, focusOnRender: true});
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
    }
  }

  handleKeyDown(event, id) {
    if (event.defaultPrevented) {
      return;
    }

    switch(event.which) {
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
      for (let i = 0; i < this.items.length; i++) {
        if (this.state.focused === this.items[i].id) {
          this.items[i].focus();
        }
      }
    }
  }

  render() {
    this.items = []; // Array to preserve order
    return React.Children.map(this.props.children, child =>
      child ? React.cloneElement(child, {
        className: (child.props.className ? child.props.className + ' ' : '') + (child.props.id === this.state.selected ? 'hightlight' : ''),
        tabIndex: child.props.id === this.state.focused ? 0 : -1,
        role: 'button',
        onClick: event => this.handleClick(event, child.props.id),
        onKeyDown: event => this.handleKeyDown(event, child.props.id),
        ref: item => item ? this.items.push(item) : undefined
      }) : null
    );
  }
}

export default Choose;
