import React from 'react';
import './DropDownSelector.scss';

class DropDownSelector extends React.Component {

  onPanelKeyUp(e) {
    if (e.which === 13 || e.which === 32) {
      this.props.togglePanel();
    }
  }

  render() {
    return (
      <div className="h5p-hub-client-drop-down" aria-level="1" role="heading">
        <div
          className="icon-hub-icon"
          role="button"
          onClick={this.props.togglePanel.bind(this)}
          onKeyUp={this.onPanelKeyUp.bind(this)}
          aria-expanded={this.props.isExpanded.toString()}
          aria-controls={`panel-body-${this.props.sectionId}`}
          tabIndex="0"
        >
          <span className="h5p-hub-description">H5P Hub.</span>
          <span className="h5p-hub-selected">{this.props.title}</span>
        </div>
      </div>
    );
  }
}

export default DropDownSelector;
