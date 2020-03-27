import React from 'react';
import Button from '../Button/Button';

import './Accordion.scss';

class Accordion extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      expanded: props.expanded
    };
  }

  handleToggle(child) {
    this.setState({
      expanded: this.state.expanded === child.props.id ? undefined : child.props.id
    });
  }

  render() {
    const elements = React.Children.map(this.props.children, child => {

      const buttonProps = {
        className: "h5p-hub-accordion-toggler",
        "aria-expanded": this.state.expanded === child.props.id
      };

      return (
        <div>
          <dt aria-level="2" role="heading" className="h5p-hub-accordion-heading">
            <Button buttonProps={buttonProps}
              onButtonClick={() => this.handleToggle(child)}
            >
              <span className="icon-accordion-arrow"></span>
              <span>{child.props.header}</span>
            </Button>
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
