import PropTypes from 'prop-types';
import React from 'react';
import Dictionary from '../../../../../utils/dictionary';
import CheckboxList from '../../../../CheckboxList/CheckboxList';
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
    const modalAria = { label: Dictionary.get(`${this.props.id}Dropdown`) };
    const filterIdUpperCase = this.props.id.charAt(0).toUpperCase() + this.props.id.slice(1);
    const filterText = Dictionary.get(`filter${filterIdUpperCase}`);
    const applyFilterText = Dictionary.get(`apply${filterIdUpperCase}Filter`);

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
      >

        <div className="header-text">
          {Dictionary.get(`select${this.props.id.charAt(0).toUpperCase() + this.props.id.slice(1)}`)}
        </div>

        {this.props.data && this.props.data.length !== undefined ?
          <CheckboxList
            onChecked={this.props.handleChecked}
            items={this.props.data}
            checked={this.props.checked}
            filter={this.props.id}
          /> : <div className="loading" />
        }

        <button
          className="apply-filters-button"
          onClick={this.props.handleApplyFilters}
          aria-label={applyFilterText}
        >
          {filterText}
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
  handleChecked: PropTypes.func.isRequired
};

export default Filter;
