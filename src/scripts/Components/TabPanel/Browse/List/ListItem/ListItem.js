import React from 'react';
import PropTypes from 'prop-types';
import noIcon from '../../../../../../images/content-type-placeholder.svg';
import Dictionary from '../../../../../utils/dictionary';

import './ListItem.scss';

const ListItem = ({contentType, tabindex, onUse}) => {

  const title = (contentType.title || contentType.machineName);
  const updateAvailable = (!contentType.isUpToDate && contentType.installed && contentType.canInstall);

  const handleUse = (event) => {
    onUse(contentType);
    event.preventDefault();
  };

  const handleKeyDown = (event) => {
    if (event.which === 13 || event.which === 32) {
      handleUse(event);
    }
  };

  return (
    <div>
      <div className="media-left">
        <img className="media-object" src={contentType.icon || noIcon} alt={title + ' ' + Dictionary.get('contentTypeIconAltText')}/>
      </div>

      <div className="media-body">
        <div className="h4 media-heading">{title}</div>

        {contentType.installed ? (
          <button type="button" className="button button-primary" tabIndex={tabindex} onClick={handleUse} onKeyDown={handleKeyDown}>
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
  tabindex: PropTypes.number.isRequired,
  onUse: PropTypes.func.isRequired
};

export default ListItem;
