import React from 'react';
import Buttonify from '../Buttonify';

import './Accordion.scss';


class Accordion extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      expanded: props.expanded
    };
  }

  handleToggle(child) {
    this.setState({expanded: this.state.expanded === child.props.id ? undefined : child.props.id});
  }

  render() {
    const elements = React.Children.map(this.props.children, child => {
      return (
        <div>
          <dt aria-level="2" role="heading" className="h5p-hub-accordion-heading">
            <Buttonify>
              <div
                className="h5p-hub-accordion-toggler"
                aria-expanded={this.state.expanded == child.props.id}
                onButtonClick={() => this.handleToggle(child)}
              >
                <span className="icon-accordion-arrow"></span>
                <span>{child.props.header}</span>
              </div>
            </Buttonify>
          </dt>
          <dl role="region" className={'h5p-hub-accordion-region' + (this.state.expanded == child.props.id ? '' : ' hidden')}>
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
