import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../utils/dictionary';

import DropDownSelector from './DropDownSelector/DropDownSelector';
import TabPanel from './TabPanel/TabPanel';
import Browse from './TabPanel/Browse/Browse';
import UploadContent from './TabPanel/UploadContent/UploadContent';

import './Hub.scss';

class Hub extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      section: 'content-types',
      selected: props.selected,
      title: props.title
    };
  }

  componentWillReceiveProps(nextProps) {
    // Recieve updates to panel title
    this.state.title = nextProps.title;
  }

  componentDidUpdate() {
    this.props.onResize();
  }

  handleUse = (contentType) => {
    // Collapse Hub
    this.setState({expanded: false, title: contentType.title || contentType.machineName});

    this.props.onUse(contentType);
  }

  handleUpload = (data) => {
    // Collapse Hub
    this.setState({expanded: false, title: data.h5p.title});

    this.props.onUpload(data);
  }

  render() {
    return (
      <section className="h5p-hub h5p-sdk">
        <div className={`panel h5p-section-${this.state.section}${this.state.expanded ? ' open' : ''}`}>
          <DropDownSelector
            title={this.state.title || Dictionary.get('hubPanelLabel')}
            sectionId={this.state.section}
            isExpanded={this.state.expanded}
            togglePanel={() => this.setState({expanded: !this.state.expanded})}
          />
          <div id={`panel-body-${this.state.section}`} role="region" className={this.state.expanded ? '' : 'hidden'}>
            <TabPanel selected={this.state.section} onSelect={id => this.setState({section: id})}>
              <Browse id="content-types"
                title={Dictionary.get('createContentTabLabel')}
                contentTypes={this.props.contentTypes}
                setFocus={this.state.expanded}
                onUse={this.handleUse} />
              <UploadContent id="upload"
                title={Dictionary.get('uploadTabLabel')} // TODO set the title of the dropdown when uploading
                getAjaxUrl={this.props.getAjaxUrl}
                contentId={this.props.contentId}
                onUpload={this.handleUpload} />
            </TabPanel>
          </div>
        </div>
      </section>
    );
  }
}

Hub.propTypes = {
  title: PropTypes.string,
  contentId: PropTypes.number,
  contentTypes: PropTypes.object.isRequired,
  selected: PropTypes.string,
  getAjaxUrl: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  onUse: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired
};

export default Hub;
