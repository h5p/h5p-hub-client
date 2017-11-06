import React from 'react';

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
  }

  select(id) {
    this.props.onChange(id);
    this.setState({selected: id});
  }

  focus(id, preventFocus) {
    if (id) {
      this.setState({focused: id, focusOnRender: !preventFocus});
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
    return React.Children.map(this.props.children, (child, i) =>
      child ? React.cloneElement(child, {
        className: (child.props.className ? child.props.className + ' ' : '') + (this.state.selected ? (child.props.id === this.state.selected ? 'hightlight' : '') : (i === 0 ? 'hightlight' : '')),
        tabIndex: (this.state.focused ? (child.props.id === this.state.focused ? 0 : -1) : (i === 0 ? 0 : -1)),
        role: child.props.role || 'button',
        onClick: event => this.handleClick(event, child.props.id),
        onKeyDown: event => this.handleKeyDown(event, child.props.id),
        ref: item => item ? this.items.push(item) : undefined
      }) : null
    );
  }
}

export default Choose;
