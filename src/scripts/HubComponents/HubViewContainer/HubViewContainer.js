import React from 'react';
import DropDownSelector from '../DropDownSelector/DropDownSelector';
import TabPanel from '../TabPanel/TabPanel';
import ErrorMessage, { severityLevels } from '../../GenericComponents/ErrorMessage/ErrorMessage';
import Dictionary from '../../utils/dictionary';
import CreateContent from '../CreateContent/CreateContent';
import UploadContent from '../UploadContent/UploadContent';
import './HubViewContainer.scss';

class HubViewContainer extends React.Component {

  componentDidUpdate() {
    // TODO: Remove when components are done
    this.tmpCreate.appendChild(this.props.oldCreateContent);
    this.tmpUpload.appendChild(this.props.oldUploadContent);

    this.props.resize();
  }

  render() {
    const sectionId = this.props.state.sectionId || 'content-types';
    const panelClasses = `panel h5p-section-${sectionId}${this.props.isExpanded ? ' open' : ''}`;

    return (
      <section className="h5p-hub h5p-sdk">
        <div className={panelClasses}>
          <DropDownSelector
            title={this.props.title}
            sectionId={sectionId}
            isExpanded={this.props.isExpanded}
            togglePanel={this.props.togglePanel}
          />
          <div id={`panel-body-${sectionId}`} role="region" className={this.props.isExpanded ? '' : 'hidden'}>
            {
              this.props.error &&
              <ErrorMessage
                severity={severityLevels.error}
                dismissable={true}
                errorMessage={this.props.error}
              />
            }

            <TabPanel selected={sectionId}>
              <CreateContent id="content-types" title={Dictionary.get('createContentTabLabel')}>
                <div ref={el => this.tmpCreate = el}/>
              </CreateContent>
              <UploadContent id="upload" title={Dictionary.get('uploadTabLabel')}>
                <div ref={el => this.tmpUpload = el}/>
              </UploadContent>
            </TabPanel>
          </div>
        </div>
      </section>
    );
  }
}

export default HubViewContainer;
