import React from 'react';
import DropDownSelector from '../DropDownSelector/DropDownSelector';
import BrowseTabs from '../TabPanel/TabPanel';
import ErrorMessage, { severityLevels } from '../../GenericComponents/ErrorMessage/ErrorMessage';
import './HubViewContainer.scss';

class HubViewContainer extends React.Component {

  componentDidUpdate() {
    this.props.resize();
  }

  render() {
    let sectionId = this.props.tabConfigs.find(tab => tab.selected === true).id;
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
            <BrowseTabs
              onSelectedTab={this.props.onSelectedTab}
              tabConfigs={this.props.tabConfigs}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default HubViewContainer;