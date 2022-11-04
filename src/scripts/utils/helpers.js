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
 * Get the first characters from each word.
 * If only one word, and not longer than maxLength, the text is trimmed and returned otherwise unchanged.
 * If number of words is larger than maxLength, the first character from first and last word is used.
 *
 * Examples:
 *  initials('Donald Duck') => 'DD'
 *  initials('Donald Fauntleroy Duck') => 'DFD'
 *  initials('donald fauntleroy duck') => 'DFD'
 *  initials('Donald Fauntleroy Duck', 2) => 'DD'
 *  initials('Donald') => 'Donald'
 *  initials('  DoNaLd ') => 'DoNaLd'
 *  initials('Donald', 3) => 'D'
 *
 * @param text
 * @param maxLength
 * @return {string}
 */
export const initials = (text, maxLength = 2) => {
  const parts = text.trim().split(' ');

  if (parts.length === 1 && parts[0].trim().length <= maxLength) {
    return text.trim();
  } else if (parts.length > maxLength) {
    return (parts.shift().trim().charAt(0) + parts.pop().trim().charAt(0)).toUpperCase();
  }
  return parts.map(t => t.trim().charAt(0)).join('').toUpperCase();
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
  level: PropTypes.string,
  language: PropTypes.string.isRequired,
  disciplines: PropTypes.array
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
    'reviewed',
    'publisher',
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
 * This reducer turns an array of license details objects that are structured
 * hierarchically into a flat object where each object's key is the license's
 * id and version separated by a dash '-', or just id if the license has only
 * one version.
 *
 * @param {object} licenses
 * @param {object} license
 * @returns {object}
 */
export const licensesReducer = (licenses, license) => {

  /**
   * Get an object containing all versions of the current license
   * where the key is the license's id+version.
   *
   * @param license
   * @returns {{name: string, id: string, url: string}[]}
   */
  const getLicenseVersions = (license) => {
    if (license.versions.length) {
      return license.versions.reduce((licenses, version) => {
        return { ...licenses, [`${license.id}-${version.id}`]: {
          id: `${license.id}-${version.id}`,
          parentLicenseId: license.id,
          version: version.id,
          name: `${license.name} ${version.name}`,
          url: version.url
        }};
      }, {});
    }

    return { [license.id]: { ...license } };
  };

  if (license.licenses) {
    const subLicenses = license.licenses.reduce((subLicences, subLicense) => {
      const licenseVersions = getLicenseVersions(subLicense);
      return { ... subLicences, ...licenseVersions };
    }, {});
    return { ...licenses, ...subLicenses };
  }

  const licenseVersions = getLicenseVersions(license);
  return { ...licenses, ...licenseVersions };
};
