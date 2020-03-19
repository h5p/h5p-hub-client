import PropTypes from 'prop-types';
import React from 'react';
import './Filter.scss';
import Modal from 'react-modal';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    Modal.setAppElement('.reuse-content-result');
  }

  closeModal = () => {
    document.querySelector('.reuse-content-result').removeAttribute('aria-hidden');
    this.props.handleApplyFilters();
  }

  getParent = () => {
    return document.querySelector('.reuse-content-result');
  }

  render() {
    const modalAria = { labelledby: this.props.dropdownLabel};

    const style = {
      content: {
        // TODO - must probably be smarter!
        left: Math.max(this.props.toggleButtonRef.current.offsetLeft-50) + 'px'
      }
    };

    return this.props.open ? (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.closeModal}
        contentLabel={this.props.id}
        onClose={() => this.props.handleApplyFilters(this.props.id)}
        parentSelector={this.getParent}
        className='filter-dialog'
        overlayClassName='lightbox'
        aria={modalAria}
        style={style}
      >

        <div className="header-text">
          {this.props.dictionary.dialogHeader}
        </div>

        {this.props.data && this.props.data.length !== undefined ?
          //The actually checkboxes/filtering
          this.props.children : <div className="loading" />
        }

        <button
          className="apply-filters-button"
          onClick={this.props.handleApplyFilters}
        >
          {this.props.dictionary.dialogButtonLabel}
        </button>

      </Modal> 
    ) : null;       
  }
}

Filter.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array,
  handleApplyFilters: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  checked: PropTypes.array.isRequired,
  handleChecked: PropTypes.func.isRequired,
  dictionary: PropTypes.object.isRequired,
  toggleButtonRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default Filter;
