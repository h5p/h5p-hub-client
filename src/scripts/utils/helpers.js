import PropTypes from 'prop-types';

export const nonEmptyString = (props, propName, componentName) => {
  if(props[propName] === undefined || props[propName].length === 0) {
    return new Error(`Non empty string for prop ${propName} in ${componentName}`);
  }
};

export const stopPropagation = event => event.stopPropagation();

export const onSpaceOrEnterEvent = (event, callback) => {
  if ([32,13].indexOf(event.which) !== -1) {
    event.preventDefault();
    callback();
  }
};

export const minimizeLongText = (text, threshold = 90) => {
  return (text.length > threshold) ? (text.substr(0, threshold-3) + '...') : text;
};

/**
 * Maps content screenshots to a format that ImageSlider accepts
 *
 * @param screenshots Screenshots as received from the content hub
 * @returns {Array} Image Slider processable screenshots
 */
export const mapContentScreenShotsForImageSlider = (screenshots) => {
  return screenshots.map((ss) =>  {
    return {
      url: ss.path,
      alt: ss.altText,
    }
  });
}

export const contentDefinition = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  reviewed: PropTypes.bool.isRequired,
  content_type: PropTypes.string.isRequired,
  description: PropTypes.string,
  screenshots: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      altText: PropTypes.string,
    })
  ),
  icon: PropTypes.string,
  level: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  disciplines: PropTypes.array.isRequired
});
