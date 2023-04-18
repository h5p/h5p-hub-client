import React from 'react';
import PropTypes from 'prop-types';
import Dictionary from '../utils/dictionary';
import fetchJSON from '../utils/fetchJSON';

import DropDownSelector from './DropDownSelector/DropDownSelector';
import TabPanel from './TabPanel/TabPanel';
import ReuseContent from './TabPanel/Reuse/ReuseContent';
import Browse from './TabPanel/Browse/Browse';
import UploadContent from './TabPanel/UploadContent/UploadContent';
import Message from './Message/Message';

import './Hub.scss';

class Hub extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: props.expanded,
      section: 'h5p-hub-content-types',
      selected: props.selected,
      title: props.title,
      contentTypes: props.contentTypes
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.state.title) {
      // Recieve updates to panel title
      this.state.title = nextProps.title;
    }
    if (nextProps.expanded !== this.state.expanded) {
      // Recieve updates to panel title
      this.state.expanded = nextProps.expanded;
    }
  }

  componentDidUpdate() {
    this.props.onResize();
  }

  handleUse = (contentType) => {
    // Collapse Hub
    this.setState({
      expanded: false,
      title: contentType.title || contentType.machineName,
      infoMessage: null
    });

    this.props.onUse(contentType);
  }

  handleUpload = (data, type = 'upload') => {
    let panelTitle = data.h5p.mainLibrary;
    for (let i = 0; i < data.contentTypes.libraries.length; i++) {
      if (data.contentTypes.libraries[i].machineName === panelTitle) {
        panelTitle = data.contentTypes.libraries[i].title;
        break;
      }
    }
    let title = Dictionary.get('uploadSuccess').replace(':title', panelTitle);
    if (type === 'reuse') {
      title = Dictionary.get('reuseSuccess').replace(':title', panelTitle);
    }

    // Collapse Hub, update title and content type cache
    this.setState({
      expanded: false,
      title: panelTitle,
      contentTypes: data.contentTypes,
      infoMessage: {
        title: title,
        message: data.contentTypes.details
      }
    });

    this.props.onUpload(data);
  }

  handleUpdate = (contentTypes) => {
    // Handles updates to the content type cache
    this.props.onUpdate(contentTypes);
    this.setState({
      contentTypes: contentTypes
    });
  }

  handleReload = () => {
    fetchJSON(this.props.getAjaxUrl('content-type-cache'))
      .then(response => this.handleUpdate(response))
      .catch(reason => this.setState({error: reason}));
  };

  handleInfoDismiss = () => {
    this.setState({
      infoMessage: null
    });
  }

  handleTabPanelSelect = (id) => {
    this.setState({
      section: id
    });
  }

  handleRender = (title, expanded) => {
    this.props.onRender(title, expanded);
  }

  render() {
    this.handleRender(this.state.title, this.state.expanded);
    return (
      <section className="h5p-hub" id='h5p-hub'>
        <div className={`h5p-hub-panel h5p-hub-section-${this.state.section}${this.state.expanded ? ' h5p-hub-open' : ''}`} id='h5p-hub-panel'>
          <DropDownSelector
            title={this.state.title || Dictionary.get('hubPanelLabel')}
            sectionId={this.state.section}
            isExpanded={this.state.expanded}
            togglePanel={() => this.setState({expanded: !this.state.expanded})}
          />
          <div id={`h5p-hub-panel-body-${this.state.section}`} role="region" className={this.state.expanded ? '' : 'h5p-hub-hidden'}>
            <TabPanel selected={this.state.section} onSelect={this.handleTabPanelSelect} canPaste={this.props.canPaste} canPasteTitle={this.props.canPasteTitle} onPaste={this.props.onPaste}>
              <Browse id="h5p-hub-content-types" 
                title={Dictionary.get('createContentTabLabel')}
                contentTypes={this.state.contentTypes}
                setFocus={this.state.expanded && this.state.section === 'h5p-hub-content-types'}
                getAjaxUrl={this.props.getAjaxUrl}
                error={this.state.error}
                onUse={this.handleUse}
                onInstall={this.handleUpdate}
                onReload={this.handleReload}/>
              {
                this.props.enableContentHubSearch &&
                <ReuseContent id="h5p-hub-reuse"
                              title={Dictionary.get('reuseContentTabLabel')}
                              isVisible={this.state.expanded && this.state.section === 'h5p-hub-reuse'}
                              getAjaxUrl={this.props.getAjaxUrl}
                              onDownload={this.handleUpload}
                />
              }
              {
                this.props.enableContentHub && 
                  <UploadContent id="h5p-hub-upload"
                    title={Dictionary.get('uploadTabLabel')}
                    getAjaxUrl={this.props.getAjaxUrl}
                    contentId={this.props.contentId}
                    setFocus={this.state.expanded && this.state.section === 'h5p-hub-upload'}
                    onUpload={this.handleUpload}
                  />
              }
            </TabPanel>
          </div>
        </div>
        {
          !!this.state.infoMessage &&
          <Message
            {...this.state.infoMessage}
            severity='info'
            onClose={this.handleInfoDismiss}/>
        }
      </section>
    );
  }
}

Hub.propTypes = {
  title: PropTypes.string,
  contentTypes: PropTypes.object.isRequired,
  selected: PropTypes.string,
  getAjaxUrl: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  onUse: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  enableContentHub: PropTypes.bool.isRequired,
  enableContentHubSearch: PropTypes.bool.isRequired,
};

export default Hub;
