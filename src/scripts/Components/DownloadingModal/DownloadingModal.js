import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import spinner from '../../../images/spinner.svg';

import './DownloadingModal.scss';

const DownloadingModal = ({ label }) => {

  const labelRef = useRef(null);

  const focusDownloadingMessage = () => {
    labelRef.current.focus();
  };

  return (
    <ReactModal
      isOpen={true}
      contentLabel={label}
      className="h5p-hub-downloading-modal"
      overlayClassName='h5p-hub-downloading-modal-overlay'
      aria={{label: label}}
      appElement={document.getElementById('h5p-hub-panel')}
      parentSelector={() => document.getElementById('h5p-hub')}
      onAfterOpen={focusDownloadingMessage}
    > 
      <img className="h5p-hub-spinner" src={spinner} aria-hidden="true" />
      <span className="h5p-hub-downloading-message" tabIndex="-1" ref={labelRef}>{label}</span>
    </ReactModal>
  );
};

DownloadingModal.propTypes = {
  label: PropTypes.string.isRequired
};

export default DownloadingModal;
