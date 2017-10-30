import React from 'react';

import Dictionary from '../../utils/dictionary';

class ImageSlider extends React.Component {
  render() {
    return (
      <div className="carousel" role="region" data-size="5" data-prevent-resize-loop="true" aria-label={Dictionary.get('screenshots')}>
        <nav className="scroller">
          <ul></ul>
        </nav>
        <button type="button" className="carousel-button next hidden" disabled aria-label={Dictionary.get('nextImage')}>
          <span className="icon-arrow-thick"></span>
        </button>
        <button type="button" className="carousel-button previous hidden" disabled aria-label={Dictionary.get('previousImage')}>
          <span className="icon-arrow-thick"></span>
        </button>
      </div>
    );
  }
}

export default ImageSlider;
