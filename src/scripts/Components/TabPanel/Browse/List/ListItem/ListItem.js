import React from 'react';
import PropTypes from 'prop-types';
import noIcon from '../../../../../../images/content-type-placeholder.svg';
import Dictionary from '../../../../../utils/dictionary';

const ListItem = ({contentType, tabindex}) => {

  const title = (contentType.title || contentType.machineName);
  const updateAvailable = (!contentType.isUpToDate && contentType.installed && contentType.canInstall);

  return (
    <div>
      <div className="media-left">
        <img className="media-object" src={contentType.icon || noIcon} alt={title + ' ' + Dictionary.get('contentTypeIconAltText')}/>
      </div>

      <div className="media-body">
        <div className="h4 media-heading">{title}</div>

        {contentType.installed ? (
          <button type="button" className="button button-primary" tabIndex={tabindex} onClick={event => this.handleUse(event, contentType)}>
            <span></span>
            {Dictionary.get('contentTypeUseButtonLabel')}
          </button>
        ) : (
          <button type="button" className="button button-inverse-primary button-install'" tabIndex={tabindex}>
            <span className="icon-arrow-thick"></span>
            {Dictionary.get('contentTypeGetButtonLabel')}
          </button>
        )}

        <div className={'content-type-update-info' + (updateAvailable ? '' : ' hidden')}>
          {Dictionary.get('contentTypeUpdateAvailable')}
        </div>

        <div className="description">{contentType.summary || ''}</div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  contentType: PropTypes.object.isRequired,
  tabindex: PropTypes.number.isRequired
};

export default ListItem;
