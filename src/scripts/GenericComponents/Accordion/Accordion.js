import React from 'react';
import ReactDOM from 'react-dom';
import initPanel from "components/panel";

import './Accordion.scss';

class Accordion extends React.Component {

  componentDidMount() {
    var rootElement = ReactDOM.findDOMNode(this);
    initPanel(rootElement);
  }

  render() {
    const elements = React.Children.map(this.props.children, child => {
      return (
        <div>
          <dt aria-level="2" role="heading" className="license-panel-heading">
            <div role="button" aria-expanded="false" aria-controls="license-panel">
              <span className="icon-accordion-arrow"></span>
              <span>{child.props.header}</span>
            </div>
          </dt>
          <dl id="license-panel" role="region" className="hidden">
            <div className="panel-body">
              {child}
            </div>
          </dl>
        </div>
      );
    });

    return (
      <dl className="panel panel-default license-panel">
        {elements}
      </dl>
    );
  }
}

export default Accordion;
