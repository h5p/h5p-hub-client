import React from 'react';
import PropTypes from 'prop-types';
import noIcon from '../../../../../../images/content-type-placeholder.svg';
import Dictionary from '../../../../../utils/dictionary';
import updatable from '../../../../../utils/updatable';

import './ListItem.scss';

const ListItem = ({contentType, apiVersion, tabindex, onSelect}) => {

  const title = (contentType.title || contentType.machineName);
  const updateAvailable =  updatable(contentType, apiVersion);

  const handleSelect = (event) => {
    onSelect(contentType);
    event.preventDefault();
  };

  const handleKeyDown = (event) => {
    if (event.which === 13 || event.which === 32) {
      handleSelect(event);
    }
  };

  const textIcons = contentType.icons ? contentType.icons.map((icon, i) => (
    <img key={i} className="h5p-hub-media-text-icon" src={ icon.src } alt={ icon.alt } title={ icon.alt }/>
  )) : null;

  return (
    <div>
      <div className="h5p-hub-media-left">
        <img className="h5p-hub-media-object" src={contentType.icon || noIcon} alt={title + ' ' + Dictionary.get('contentTypeIconAltText')}/>
      </div>

      <div className="h5p-hub-media-body">
        <div className="h5p-hub-headline">
          <span className="h5p-hub-title">{title}</span>
          <span className='h5p-hub-by'>{Dictionary.get('by')}</span>
          <span className="h5p-hub-owner">{contentType.owner}</span>
        </div>

        { textIcons }

        {contentType.installed ? (
          <button type="button" className="h5p-hub-button h5p-hub-button-primary" tabIndex={tabindex} onClick={handleSelect} onKeyDown={handleKeyDown}>
            {Dictionary.get('contentTypeDetailButtonLabel')}
          </button>
        ) : (
          <button type="button" className="h5p-hub-button h5p-hub-button-inverse-primary h5p-hub-button-install" tabIndex={tabindex}>
            {Dictionary.get('contentTypeGetButtonLabel')}
          </button>
        )}

        <div className={'h5p-hub-content-type-update-info' + (updateAvailable ? '' : ' hidden')}>
          {Dictionary.get('contentTypeUpdateAvailable')}
        </div>

        <div className="h5p-hub-description">{contentType.summary || ''}</div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  contentType: PropTypes.object.isRequired,
  apiVersion: PropTypes.object.isRequired,
  tabindex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default ListItem;
