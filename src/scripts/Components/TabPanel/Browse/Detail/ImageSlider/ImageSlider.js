import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from '../../../../../utils/dictionary';
import {nonEmptyString} from '../../../../../utils/helpers';


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

  componentWillUnmount() {
    if (!this.props.imagesToShow) {
      window.removeEventListener('resize', this.onWindowResized);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // If focusOnRender is changing from true to false, it means
    // this is invoked after focus is set, and we don't need to re-render
    return !(this.state.focusOnRender && !nextState.focusOnRender);
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
    this.setState((prevState) => {
      const index = prevState.offset - 1;
      if (index >= 0) {
        return {
          offset: index,
          selected: index
        };
      }
    });
  }

  nextSlide = () => {
    this.setState((prevState, props) => {
      const index = prevState.offset + 1;
      if (index < props.images.length) {
        return {
          offset: index,
          selected: index
        };
      }
    });
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected || 0,
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

    let swallowEvent = false;

    switch(event.which) {
      case 37: // Left
      case 38: // Up
        this.moveFocus(-1);
        swallowEvent = true;
        break;

      case 39: // Right
      case 40: // Down
        this.moveFocus(+1);
        swallowEvent = true;
        break;

      case 32: // Space
      case 13: // Enter
        this.handleImageSelected(index);
        swallowEvent = true;
        break;
    }

    if (swallowEvent) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onImageModalClose = () => {
    this.setState({
      modalIsOpen: false
    });
  }

  handleGlobalKeyDown = (event) => {
    if (event.which === 39) {
      // Right
      this.nextSlide();
    }
    else if (event.which === 37) {
      // Left
      this.previousSlide();
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
      <div
        className="carousel"
        role="region"
        aria-label={Dictionary.get('screenshots')}
        ref={carousel => this.carousel = carousel}
        onKeyDown={this.handleGlobalKeyDown}>
        {
          navigationNeeded &&
          <NavigationButton type="prev" label={Dictionary.get('previousImage')} onClick={this.previousSlide} disabled={disablePrev}/>
        }
        <nav className="scroller" ref={scroller => this.scroller = scroller}>
          <ul style={sliderStyle}>
            {slides}
          </ul>
        </nav>
        {
          navigationNeeded &&
          <NavigationButton type="next" label={Dictionary.get('nextImage')} onClick={this.nextSlide} disabled={disableNext}/>
        }
        {
          this.props.showProgress &&
          <div className="progress" role="alert">
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

const NavigationButton = ({onClick, type, disabled, label}) => {
  return (
    <button
      className={'navigation ' + type}
      aria-disabled={disabled}
      aria-label={label}
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
    url: nonEmptyString,
    alt: nonEmptyString
  })).isRequired
};

export default ImageSlider;
