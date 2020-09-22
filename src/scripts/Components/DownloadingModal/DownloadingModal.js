import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Loader from '../Loader/Loader';

import './DownloadingModal.scss';

const DownloadingModal = ({ label }) => {
  return (
    <ReactModal
      isOpen={true}
      contentLabel={label}
      className="h5p-hub-downloading-modal"
      overlayClassName='h5p-hub-downloading-modal-overlay'
      aria={{label: label}}
      appElement={document.getElementById('h5p-hub-panel')}
      parentSelector={() => document.getElementById('h5p-hub')}
    >
      <Loader title={label} />
    </ReactModal>
  );
};

DownloadingModal.propTypes = {
  label: PropTypes.string.isRequired
};

export default DownloadingModal;
