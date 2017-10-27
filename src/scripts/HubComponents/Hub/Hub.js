import React from 'react';
import DropDownSelector from '../DropDownSelector/DropDownSelector';
import TabPanel from '../TabPanel/TabPanel';
import Message, { severityLevels } from '../../GenericComponents/Message/Message';
import Dictionary from '../../utils/dictionary';
import Browser from '../Browser/Browser';
import UploadContent from '../UploadContent/UploadContent';
import './Hub.scss';

class Hub extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      section: 'content-types',
      selected: props.selected
    };
  }

  componentDidUpdate() {
    this.props.onResize();
  }

  render() {
    return (
      <section className="h5p-hub h5p-sdk">
        <div className={`panel h5p-section-${this.state.section}${this.state.expanded ? ' open' : ''}`}>
          <DropDownSelector
            title={Dictionary.get('hubPanelLabel')}
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
              <Browser id="content-types"
                title={Dictionary.get('createContentTabLabel')}
                contentTypes={this.props.contentTypes}
                apiVersion={this.props.apiVersion}/>
              <UploadContent id="upload" title={Dictionary.get('uploadTabLabel')}>
                <div>TODO</div>
              </UploadContent>
            </TabPanel>
          </div>
        </div>
      </section>
    );
  }
}

export default Hub;
