import React from 'react';

class BrowseTab extends React.Component {

  componentDidMount() {
    this.tabContent.appendChild(this.props.tab.content);
  }

  render() {
    return (
      <div ref={tabContent => this.tabContent = tabContent} />
    )
  }
}

export default BrowseTab;
