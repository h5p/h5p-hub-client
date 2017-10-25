import React from 'react';

class TabButton extends React.Component {

  componentDidMount() {
    this.tabContent.appendChild(this.props.tab.content);
  }

  render() {
    return (
      <div
        className={`tabpanel${this.props.tab.selected ? '' : ' hidden'}`}
        id={`tab-panel-${this.props.tab.id}`}
        aria-labelledby={`tab-${this.props.tab.id}`}
        role='tabpanel'
        ref={tabContent => this.tabContent = tabContent}
      />
    )
  }
}

export default TabButton;
