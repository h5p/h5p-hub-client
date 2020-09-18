import React, { useState } from 'react';
import PropTypes from 'prop-types';
import placeholderImage from '../../../../images/placeholder.svg';

export default function ContentIcon({ src, className = '' }) {
  const [usePlaceholder, setUsePlaceholder] = useState(!src);

  const handleImageLoadingFailed = () => {
    if (usePlaceholder) {
      // Do nothing if placholder fails loading
      return;
    }

    setUsePlaceholder(true);
  };

  return <img
    className={`h5p-hub-content-icon ${className}`}
    src={usePlaceholder ? placeholderImage : src}
    onError={handleImageLoadingFailed}
  />;
}

ContentIcon.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string
};