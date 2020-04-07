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

export const contentDefinition = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  reviewed: PropTypes.bool.isRequired,
  contentType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  screenshots: PropTypes.arrayOf(PropTypes.shape({
    url: nonEmptyString,
    alt: nonEmptyString
  })).isRequired,
  image: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  language: PropTypes.object.isRequired,
  disciplines: PropTypes.array.isRequired
});