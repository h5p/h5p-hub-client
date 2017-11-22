import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import Button from '../../../../Button/Button';
import Dictionary from '../../../../../utils/dictionary';

import './Modal.scss';

class Lightbox extends React.Component {
  constructor(props) {
    super(props);

    Modal.setAppElement('.h5p-section-content-types');

    this.state = {
      modalIsOpen: false,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      modalIsOpen: props.visible,
    });
  }

  closeModal = () => {
    document
      .querySelector('.h5p-section-content-types')
      .removeAttribute('aria-hidden');
    this.props.onClose();
  };

  getParent = () => {
    return document.querySelector('.h5p-hub');
  };

  render() {
    const closeButtonProps = {
      className: 'lightbox-close',
      'aria-label': Dictionary.get('close'),
    };

    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel={this.props.label}
        parentSelector={this.getParent}
        className={`lightbox-inner ${this.props.className}`}
        overlayClassName="lightbox"
        aria={this.props.aria}
      >
        <Button
          buttonProps={closeButtonProps}
          onButtonClick={this.closeModal}
        />
        {this.props.children}
      </Modal>
    );
  }
}

Lightbox.propTypes = {
  onClose: PropTypes.func.isRequired,
  aria: PropTypes.shape({
    label: PropTypes.string,
    labelledby: PropTypes.string,
    describedby: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
};

export default Lightbox;
