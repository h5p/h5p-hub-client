import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import './Modal.scss';

class Lightbox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      modalIsOpen: props.visible
    });
  }

  closeModal = () => {
    this.props.onClose();
  }

  getParent = () => {
    return document.querySelector('.h5p-hub');
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel={this.props.label}
        parentSelector={this.getParent}
        className='lightbox-inner'
        overlayClassName='lightbox'
      >
        {this.props.children}
      </Modal>
    );
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default Lightbox;
