import PropTypes from 'prop-types';
import React from 'react';
import './Filter.scss';
import Modal from 'react-modal';
import Dictionary from '../../../../../utils/dictionary';
import Message from '../../../../Message/Message';


class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.appElement = document.getElementById('h5p-hub-reuse-content-container');
    this.state = {
      left: this.calculateLeftPosition(),
      top: this.calculateTopPosition()
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.closeModal);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeModal);
    window.removeEventListener('resize', this.handleResize);
  }

  closeModal = () => {
    this.appElement.removeAttribute('aria-hidden');
    this.props.onFilterClosed(this.props.id);
  }

  swallowClicks(event) {
    event.stopPropagation();
  }

  /**
   * Calculates the position of the dialog
   * 
   * @returns {integer}
   */
  calculateLeftPosition = () => {
    const filterBar = this.props.filterBarRef.current;
    // Font size of the dialog
    const font = 14.672;
    const filterBarWidth = filterBar.offsetWidth;
    const dialogWidth = font * 40;

    let left = Math.max(this.props.toggleButtonRef.current.offsetLeft - 50, 0);

    // Will dialog overflow? If so, use whatever room we have
    if (left + dialogWidth > filterBarWidth) {
      left = Math.max(filterBarWidth - dialogWidth, 0);
    }
    
    return left;
  }

  /**
   * Return top position for modal
   * to be shown below filterbar
   */
  calculateTopPosition = () => {
    const filterBar = this.props.filterBarRef.current;
    return filterBar.offsetTop + filterBar.offsetHeight;
  }

  /**
   * Handles window resizing
   */
  handleResize = () => {
    this.setState({ left: this.calculateLeftPosition(), top: this.calculateTopPosition() });
  }

  render() {
    const modalAria = { labelledby: 'h5p-hub-header-text'};

    const style = {
      overlay: {
        top: this.state.top + 'px'
      },
      content: {
        left: this.state.left + 'px'
      }
    };

    return (
      <Modal
        isOpen={true}
        onRequestClose={this.closeModal}
        contentLabel={this.props.id}
        //The element the modal is attached to
        parentSelector={() => document.getElementById('h5p-hub-reuse-view')}
        //The element that should be hidden (logically, not visually) by the modal
        appElement={this.appElement}
        className='h5p-hub-filter-dialog'
        overlayClassName='h5p-hub-filter-modal'
        aria={modalAria}
        style={style}
        shouldCloseOnOverlayClick={false}
      >
        <div className="h5p-hub-filter-dialog-content" onClick={this.swallowClicks}>
          <div className="h5p-hub-header-text" id='h5p-hub-filter-modal-header-text'>
            {this.props.dictionary.dialogHeader}
          </div>

          {this.props.failedDataFetch ?
            <Message
              severity='error'
              title={Dictionary.get('failedFetchingData')}
              message={Dictionary.get('filterErrorMessage')}>
            </Message>
            : this.props.data ?
              this.props.children //The actual checkboxes/filtering
              : <div className='h5p-hub-loading' />
          }

          <button
            className="h5p-hub-apply-filters-button"
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
  filterBarRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  failedDataFetch: PropTypes.bool
};

export default Filter;
