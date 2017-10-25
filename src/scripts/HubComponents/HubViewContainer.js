import React from 'react';

import BrowseTabs from './BrowseTabs';

class HubViewContainer extends React.Component {

  onPanelClick() {
    this.props.togglePanel();
  }

  onPanelKeyUp(e) {
    if (e.which === 13 || e.which === 32) {
      this.props.togglePanel();
    }
  }

  componentDidUpdate() {
    this.props.resize();
  }

  render() {
    let sectionId = 'content-types';
    const panelClasses = 'panel' + (this.props.isExpanded ? ' open' : '');

    return (
      <section className="h5p-hub h5p-sdk">
        <div className={panelClasses}>
          <div className="h5p-hub-client-drop-down" aria-level="1" role="heading">
          <span role="button"
                onClick={this.onPanelClick.bind(this)}
                onKeyUp={this.onPanelKeyUp.bind(this)}
                className="icon-hub-icon"
                aria-expanded={this.props.isExpanded.toString()}
                aria-controls={`panel-body-${sectionId}`}
                tabIndex="0"
          >
            <span className="h5p-hub-description">H5P Hub.</span>
            <span className="h5p-hub-selected">{this.props.title}</span>
          </span>
          </div>
          <div id={`panel-body-${sectionId}`} role="region" className={this.props.isExpanded ? '' : 'hidden'}>
            <BrowseTabs tabConfigs={this.props.tabConfigs}/>
          </div>
        </div>
      </section>
    );
  }
}

export default HubViewContainer;