import PropTypes from 'prop-types';
import React from 'react';
import './Filter.scss';
import Modal from 'react-modal';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    Modal.setAppElement('.reuse-content-result');
  }

  componentDidMount() {
    window.addEventListener('click', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeModal);
  }

  closeModal = () => {
    document.querySelector('.reuse-content-result').removeAttribute('aria-hidden');
    this.props.onFilterClosed(this.props.id);
  }

  getParent = () => {
    return document.querySelector('.reuse-content-result');
  }

  swallowClicks(event) {
    event.stopPropagation();
  }

  render() {
    const modalAria = { labelledby: this.props.dropdownLabel };

    const style = {
      content: {
        // TODO - must probably be smarter!
        left: Math.max(this.props.toggleButtonRef.current.offsetLeft - 50) + 'px'
      }
    };

    return (
      <Modal
        isOpen={true}
        onRequestClose={this.closeModal}
        contentLabel={this.props.id}
        parentSelector={this.getParent}
        className='filter-dialog'
        overlayClassName='lightbox'
        aria={modalAria}
        style={style}
        shouldCloseOnOverlayClick={false}
      >
        <div className="filter-dialog-content" onClick={this.swallowClicks}>
          <div className="header-text">
            {this.props.dictionary.dialogHeader}
          </div>

          {this.props.data && this.props.data.length !== undefined ?
            //The actually checkboxes/filtering
            this.props.children : <div className="loading" />
          }

          <button
            className="apply-filters-button"
            onClick={this.closeModal}
          >
            {this.props.dictionary.dialogButtonLabel}
          </button>
        </div>
      </Modal>
    );
  }
}

Filter.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array,
  onFilterClosed: PropTypes.func.isRequired,
  checked: PropTypes.array.isRequired,
  handleChecked: PropTypes.func.isRequired,
  dictionary: PropTypes.object.isRequired,
  toggleButtonRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default Filter;
