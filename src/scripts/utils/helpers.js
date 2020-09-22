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
    };
  });
};

/** 
* Check whether two arrays are equal sets.
*
* @param {Array} a1
* @param {Array} a2
*/
export const arraysEqualSets = (a1, a2) => {
  const superSet = {};
  for (const i of a1) {
    const e = i + typeof i;
    superSet[e] = 1;
  }

  for (const i of a2) {
    const e = i + typeof i;
    if (!superSet[e]) {
      return false;
    }
    superSet[e] = 2;
  }

  for (let e in superSet) {
    if (superSet[e] === 1) {
      return false;
    }
  }

  return true;
};


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

/**
 * Compare two "filter" objects
 * 
 * @param {Object} a 
 * @param {Object} b 
 */
export const hubFiltersEqual = (a, b) => {
  // The HUB filter supports the following fields:
  const fields = [
    'contentTypes',
    'disciplines',
    'language',
    'level',
    'license',
    'reviewed'
  ];

  for (let i = 0; i < fields.length; i++) {
    const fieldA = a[fields[i]];
    const fieldB = b[fields[i]];
    const aIsArray = Array.isArray(fieldA);
    const bIsArray = Array.isArray(fieldB);

    const differs = (aIsArray !== bIsArray) ||
      (aIsArray && bIsArray && !arraysEqualSets(fieldA, fieldB));

    if (differs) {
      return false;
    }
  }

  return true;
};

/**
 * Extend an array just like JQuery's extend.
 * @param {object} arguments Objects to be merged.
 * @return {object} Merged objects.
 */
export const extend = (...args) => {
  for (let i = 1; i < args.length; i++) {
    for (let key in args[i]) {
      if (args[i].hasOwnProperty(key)) {
        if (typeof args[0][key] === 'object' && typeof args[i][key] === 'object') {
          extend(args[0][key], args[i][key]);
        }
        else {
          args[0][key] = args[i][key];
        }
      }
    }
  }
  return args[0];
};

/**
 * Get licenses in a listable format
 *
 * @param arr
 * @param license
 * @returns {any[]}
 */
export const getLicensesReducer = (arr, license) => {

  /**
   * Get licenses or license versions if they exist for a given license
   *
   * @param license
   * @returns {{name: string, id: string, url: string}[]}
   */
  const getLicenseVersions = (license) => {
    if (license.versions.length) {
      return license.versions.map(version => ({
        id: `${license.id}-${version.id}`,
        parentLicenseId: license.id,
        version: version.id,
        name: `${license.name} ${version.name}`,
        url: version.url
      }));
    }

    return [license];
  };

  if (license.licenses) {
    // Flatten option group
    const licenses = license.licenses.reduce((optGroupArr, optGroupLicense) => {
      const licenseVersions = getLicenseVersions(optGroupLicense);
      return optGroupArr.concat(licenseVersions);
    }, []);
    return arr.concat(licenses);
  }

  const licenseVersions = getLicenseVersions(license);
  return [...arr, ...licenseVersions];
};
