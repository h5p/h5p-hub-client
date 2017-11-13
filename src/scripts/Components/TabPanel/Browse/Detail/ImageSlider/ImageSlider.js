import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../../utils/dictionary';


import './ImageSlider.scss';

class ImageSlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imagesToShow: this.props.imagesToShow || 5,
      offset: this.props.selected || 0,
      selected: this.props.selected || 0,
      modalIsOpen: false,
      focusOnRender: false
    };
  }

  componentDidMount() {
    if (!this.props.imagesToShow) {
      window.addEventListener('resize', this.onWindowResized);
    }
  }

  onWindowResized = () => {
    if (!this.carousel) {
      return;
    }

    const width = this.carousel.offsetWidth;
    let imagesToShow = 5;

    for (let i = 0; i < breakpoints.length; i++) {
      if (width < breakpoints[i].breakpoint) {
        imagesToShow = breakpoints[i].imagesToShow;
        break;
      }
    }

    if (this.state.imagesToShow != imagesToShow) {
      this.setState({
        imagesToShow: imagesToShow,
        offset: 0,
        selected: 0
      });
    }
  }

  handleImageSelected = (index) => {
    if (this.props.onImageSelect) {
      this.props.onImageSelect(index);
    }
  }

  previousSlide = () => {
    this.setState((prevState) => ({
      offset: prevState.offset - 1,
      selected: prevState.offset - 1
    }));
  }

  nextSlide = () => {
    this.setState((prevState) => ({
      offset: prevState.offset + 1,
      selected: prevState.offset + 1
    }));
  }

  moveFocus(increment) {
    this.setState((prevState) => {

      const index = prevState.selected + increment;

      if (index >= 0 && index < this.props.images.length) {
        let newOffset = prevState.offset;
        if(index < prevState.offset) {
          newOffset = prevState.offset - 1;
        }
        else if (index >= prevState.offset + prevState.imagesToShow) {
          newOffset = prevState.offset + 1;
        }

        return {
          selected: index,
          focusOnRender: true,
          offset: newOffset
        };
      }
    });
  }

  componentWillReceiveProps() {
    this.setState({
      selected: 0,
      offset: 0
    });
  }

  componentDidUpdate() {
    if (this.state.focusOnRender) {
      this.items[this.state.selected].focus();
      this.scroller.scrollLeft = 0;

      this.setState({
        focusOnRender: false
      });
    }
  }

  handleKeyDown(event, index) {
    if (event.defaultPrevented) {
      return;
    }

    switch(event.which) {
      case 37: // Left
      case 38: // Up
        this.moveFocus(-1);
        event.preventDefault();
        break;

      case 39: // Right
      case 40: // Down
        this.moveFocus(+1);
        event.preventDefault();
        break;

      case 32: // Space
      case 13: // Enter
        this.handleImageSelected(index);
        event.preventDefault();
        break;
    }
  }

  onImageModalClose = () => {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    const images = this.props.images;
    if (!images || !images.length) {
      return null;
    }

    const imagesToShow = this.state.imagesToShow;
    const numSlides = images.length;
    const slideStyle = {
      width: (100/numSlides) + '%'
    };
    const totalWidth = numSlides*100/imagesToShow;
    const sliderStyle = {
      width: `${totalWidth}%`,
      marginLeft: `-${this.state.offset * (totalWidth/numSlides)}%`
    };

    this.items = []; // Array to preserve order
    const slides = images.map((image, idx) => {
      return(
        <li
          key={idx}
          style={slideStyle}
          tabIndex={idx === this.state.selected ? 0 : -1}
          onKeyDown={event => this.handleKeyDown(event, idx)}
          onClick={() => this.handleImageSelected(idx)}
          ref={item => item ? this.items.push(item) : undefined}
        >
          <img
            src={image.url}
            alt={image.alt}
            className={this.props.onImageSelect ? 'selectable' : ''}/>
        </li>
      );
    });

    const disablePrev = this.state.offset === 0;
    const disableNext = (this.state.imagesToShow + this.state.offset) >= numSlides;
    const navigationNeeded = (numSlides > this.state.imagesToShow);

    return (
      <div className="carousel" role="region" aria-label={Dictionary.get('screenshots')} ref={carousel => this.carousel = carousel}>
        {
          navigationNeeded &&
          <NavigationButton type="prev" onClick={this.previousSlide} disabled={disablePrev}/>
        }
        <nav className="scroller" ref={scroller => this.scroller = scroller}>
          <ul style={sliderStyle}>
            {slides}
          </ul>
        </nav>
        {
          navigationNeeded &&
          <NavigationButton type="next" onClick={this.nextSlide} disabled={disableNext}/>
        }
        {
          this.props.showProgress &&
          <div className="progress">
            {Dictionary.get('imageLightBoxProgress').replace(':num', this.state.offset+1).replace(':total', numSlides)}
          </div>
        }

      </div>
    );
  }
}
/**
 * Responsive breakpoints
 * @type {Array}
 */
const breakpoints = [
  {
    breakpoint: 576,
    imagesToShow: 2
  },
  {
    breakpoint: 768,
    imagesToShow: 3
  },
  {
    breakpoint: 992,
    imagesToShow: 4
  }
];

const NavigationButton = ({onClick, type, disabled}) => {
  return (
    <button
      className={'navigation ' + type}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

ImageSlider.propTypes = {
  onImageSelect: PropTypes.func,
  imagesToShow: PropTypes.number,
  showProgress: PropTypes.bool.isRequired,
  selected: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  })).isRequired
};

export default ImageSlider;
