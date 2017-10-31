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
          <dt aria-level="2" role="heading" className="h5p-hub-accordion-heading">
            <div role="button" className="h5p-hub-accordion-toggler" aria-expanded="false" aria-controls={child.props.id}>
              <span className="icon-accordion-arrow"></span>
              <span>{child.props.header}</span>
            </div>
          </dt>
          <dl id={child.props.id} role="region" className="h5p-hub-accordion-region hidden">
            <div className="panel-body">
              {child}
            </div>
          </dl>
        </div>
      );
    });

    return (
      <dl className="h5p-hub-accordion">
        {elements}
      </dl>
    );
  }
}

export default Accordion;
