import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import Dictionary from '../../utils/dictionary';

import './Modal.scss';

class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  closeModal = () => {
    document.getElementById(this.props.appElementId).removeAttribute('aria-hidden');
    this.props.onClose();
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
        className={`lightbox-inner ${this.props.className}`}
        overlayClassName='lightbox'
        aria={this.props.aria}
        appElement={document.getElementById(this.props.appElementId)}
        parentSelector={() => document.getElementById(this.props.parentId)}
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
  //The element the modal is attached to,
  //can't be the same as appElement, because then aria-hidden is applied to the modal
  parentId: PropTypes.string.isRequired,
  //The element that should be hidden (logically, not visually) by the modal
  appElementId: PropTypes.string.isRequired
};

export default Modal;
