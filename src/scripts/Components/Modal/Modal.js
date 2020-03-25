import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import Dictionary from '../../utils/dictionary';

import './Modal.scss';

class Modal extends React.Component {

  constructor(props) {
    super(props);
    ReactModal.setAppElement(this.props.parent);
  }

  closeModal = () => {
    document.querySelector(this.props.parent).removeAttribute('aria-hidden');
    this.props.onClose();
  }

  getParent = () => {
    return document.querySelector('.h5p-hub');
  }

  render() {
    const closeButtonProps = {
      className: 'lightbox-close',
      'aria-label': Dictionary.get('close')
    };

    return (
      <ReactModal
        isOpen={true}
        onRequestClose={this.closeModal}
        contentLabel={this.props.label}
        parentSelector={this.getParent}
        className={`lightbox-inner ${this.props.className}`}
        overlayClassName='lightbox'
        aria={this.props.aria}
        parentSelector={() => document.querySelector(this.props.parent)}
      >
        <Button
          buttonProps={closeButtonProps}
          onButtonClick={this.closeModal}/>
        {this.props.children}
      </ReactModal>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  aria: PropTypes.shape({
    label: PropTypes.string,
    labelledby: PropTypes.string,
    describedby: PropTypes.string
  }),
  className: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired
};

export default Modal;
