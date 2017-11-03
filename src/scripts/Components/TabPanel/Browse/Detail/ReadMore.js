import React from 'react';

import Dictionary from '../../../../utils/dictionary';

class ReadMore extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  handleToggle() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const text = this.props.text;

    if (text === undefined || text.length === 0) {
      return null;
    }

    const needMore = text.length > this.props.maxLength;
    const partOne = needMore ? text.substr(0, this.props.maxLength) : text;
    const partTwo = needMore ? text.substr(this.props.maxLength) : '';

    return (
      <p className="small">

        <span className="part-one" tabIndex="-1">{partOne}</span>
        {
          needMore && [
            <span key="ellipsis" className={!this.state.expanded ? '' : 'hidden'}>...</span>,
            <span key="part-two" className="part-two" tabIndex="-1" className={!this.state.expanded ? 'hidden' : ''}>{partTwo}</span>,
            <button
              key="button"
              type="button"
              className={'link ' + (this.state.expanded ? 'read-less' : 'read-more')}
              onClick={() => this.handleToggle()}>
              {Dictionary.get(this.state.expanded ? 'readLess' : 'readMore')}
            </button>
          ]
        }
      </p>
    );
  }
}

export default ReadMore;
