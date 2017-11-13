import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../../utils/dictionary';

import './ImageSlider.scss';

class ImageSlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imagesToShow: 5,
      offset: 0,
      selected: 0
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResized);
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
        imagesToShow: imagesToShow
      });
    }
  }

  handleImageSelected = (index) => {
    console.log('TODO: Open screenshots in overlay: ' + index);
  }

  previousSlide = () => {
    var offset = this.state.offset - 1;
    this.setState({
      offset: offset,
      selected: offset
    });
  }

  nextSlide = () => {
    const offset = this.state.offset + 1;
    this.setState({
      offset: offset,
      selected: offset
    });
  }

  focusOn(index) {
    if (index >= 0 && index < this.props.images.length) {
      this.setState({
        selected: index,
        focusOnRender: true,
        offset: this.offsetNeeded(index)
      });
    }
  }

  focusNext() {
    this.focusOn(this.state.selected + 1);
  }

  focusPrevious() {
    this.focusOn(this.state.selected - 1);
  }

  /**
   * Check if offset needs to be changed for a certain slide
   *
   * @param {number} index The index of the slide
   */
  offsetNeeded(index) {
    if(index < this.state.offset) {
      return this.state.offset - 1;
    }
    else if (index >= this.state.offset + this.state.imagesToShow) {
      return this.state.offset + 1;
    }

    return this.state.offset;
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

      delete this.state.focusOnRender;
    }
  }

  handleKeyDown(event, index) {
    if (event.defaultPrevented) {
      return;
    }

    switch(event.which) {
      case 37: // Left
      case 38: // Up
        this.focusPrevious();
        event.preventDefault();
        break;

      case 39: // Right
      case 40: // Down
        this.focusNext();
        event.preventDefault();
        break;

      case 32: // Space
      case 13: // Enter
        this.handleImageSelected(index);
        event.preventDefault();
        break;
    }
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
          <img src={image.url} alt={image.alt}/>
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
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  })).isRequired
};

export default ImageSlider;
