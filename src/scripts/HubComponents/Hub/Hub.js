import React from 'react';
import DropDownSelector from '../DropDownSelector/DropDownSelector';
import TabPanel from '../TabPanel/TabPanel';
import Message, { severityLevels } from '../../GenericComponents/Message/Message';
import Dictionary from '../../utils/dictionary';
import Browse from '../Browse/Browse';
import UploadContent from '../UploadContent/UploadContent';
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

  handleUse(contentType) {
    // Collapse Hub
    this.setState({expanded: false, title: contentType.title || contentType.machineName});

    this.props.onUse(contentType);
  }

  handleUpload(data) {
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
            {
              this.props.error &&
              <Message
                severity={severityLevels.error}
                dismissable={true}
                message={this.props.error}
              />
            }

            <TabPanel selected={this.state.section} onSelect={id => this.setState({section: id})}>
              <Browse id="content-types"
                title={Dictionary.get('createContentTabLabel')}
                contentTypes={this.props.contentTypes}
                apiVersion={this.props.apiVersion}
                onUse={this.handleUse.bind(this)} />
              <UploadContent id="upload"
                title={Dictionary.get('uploadTabLabel')}
                getAjaxUrl={this.props.getAjaxUrl}
                contentId={this.props.contentId}
                onUpload={this.handleUpload.bind(this)} />
            </TabPanel>
          </div>
        </div>
      </section>
    );
  }
}

export default Hub;
