import React from 'react';
import PropTypes from 'prop-types';
import Async from 'react-async';
import Dictionary from '../../utils/dictionary';
import { initials } from '../../utils/helpers';

import './SelectedPublisher.scss';

const SelectedPublisher = ({ publisher, onBackArrowClick, onBackArrowKeyDown, searchPromise, children }) => {
  if (publisher && publisher.name) {
    return (
      <div className="h5p-hub-selectedpublisher">
        <a
          href="#"
          className="h5p-hub-selectedpublisher-back-button h5p-hub-icon-arrow-thin"
          aria-label={Dictionary.get('contentTypeBackButtonLabel')}
          onClick={onBackArrowClick}
          onKeyDown={onBackArrowKeyDown}
        />
          <div className="h5p-hub-selectedpublisher-logo-container">
          {publisher.logo ? (
              <img className="" src={publisher.logo} />
            ) : (
              <>
                <div className="h5p-hub-selectedpublisher-avatar-background" />
                <div className="h5p-hub-selectedpublisher-avatar">
                  {initials(publisher.name, 6)}
                </div>
              </>
            )
          }
          </div>
        <div className="h5p-hub-selectedpublisher-details">
          <div className="h5p-hub-selectedpublisher-name">
            <h3>{publisher.name}</h3>
            {searchPromise &&
              <Async promiseFn={searchPromise}>
                {({ data }) => (
                  <div className={'h5p-hub-selectedpublisher-content-count' + (data?.counts?.publisher ? '' : ' h5p-hub-selectedpublisher-content-hidden')}>
                    {Dictionary.get('numberOfContents').replace(':count', data?.counts?.publisher ? data.counts.publisher : '')}
                  </div>
                )}
              </Async>
            }
          </div>
          {children}
        </div>
      </div>
    );
  } else {
    return children;
  }
};

SelectedPublisher.propTypes = {
  publisher: PropTypes.object.isRequired,
  onBackArrowClick: PropTypes.func.isRequired,
  onBackArrowKeyDown: PropTypes.func.isRequired,
  searchPromise: PropTypes.func,
};

export default SelectedPublisher;
