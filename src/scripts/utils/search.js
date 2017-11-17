
/* Used to determine separate scoring for the different content type properties */
const propertyScoring = [
  {
    name: 'title',
    max: 1000,
    min: 100
  },
  {
    name: 'summary',
    max: 50,
    min: 25
  },
  {
    name: 'description',
    max: 50,
    min: 25
  },
  {
    name: 'keywords',
    max: 50,
    min: 25
  },
  {
    name: 'machineName',
    max: 1,
    min: 0.5
  }
];

/* Map order by id to a property name */
const orderByMap = {
  'recently': 'recently',
  'newest': 'createdAt',
  'a-to-z': 'title'
};

// Some properties are usually ordered desc.
const reverseProps = ['createdAt', 'updatedAt'];

/**
 *
 * @param {Object} list Content Type list
 * @param {string} filterBy Search query
 * @param {string} orderBy
 */
export default function search(list, filterBy, orderBy) {
  if (filterBy) {
    const filtered = list.libraries.map(contentType => ({
      contentType: contentType,
      score: getSearchScore(filterBy, contentType)
    })).filter(result => result.score > 0 && !isUnavailable(result.contentType, list.apiVersion));

    return multiSort(filtered);
  }

  let sortOn = [orderByMap[orderBy]];
  if (orderBy === 'recently') {

    if (!list.recentlyUsed || !list.recentlyUsed.length) {
      // Switch to popularity
      sortOn = ['popularity'];
    }
    else {
      // Add recently value to content types
      for (let i = 0; i < list.recentlyUsed.length; i++) {
        let machineName = list.recentlyUsed[i];

        for (let j = 0; j < list.libraries.length; j++) {
          let contentType = list.libraries[j];

          if (contentType.machineName === machineName) {
            contentType.recently = i + 1; // Avoid stripping 0
          }
        }
      }
      sortOn.push('popularity'); // Alternative/second order by
    }
  }
  else if (orderBy === 'newest') {
    sortOn.splice(0, 0, 'installed');
  }

  return multiSort(list.libraries.filter(contentType => !isUnavailable(contentType, list.apiVersion)), sortOn);
}

/**
 * Check if the content type is restricted or unsupported and should be filtered
 * away.
 *
 * @param {Object} contentType
 * @param {Object} apiVersion
 * @return {boolean}
 */
const isUnavailable = (contentType, apiVersion) => {
  // Determine if the content type is using an API version that is not yet supported
  const apiNotSupported = !(apiVersion.major > contentType.h5pMajorVersion ||
                           (apiVersion.major === contentType.h5pMajorVersion &&
                            apiVersion.minor >= contentType.h5pMinorVersion));

  // If the content type is restricted or requires a newer API, skip showing it
  return contentType.restricted || (!contentType.installed && apiNotSupported);
};

/**
 * Calculates weighting for different search terms based
 * on existence of substrings
 *
 * @param  {string}       query
 * @param  {ContentType}  contentType
 * @return {number}
 */
const getSearchScore = function(query, contentType) {
  let queries = query.split(' ').filter(query => query !== '');
  let queryScores = queries.map(query => getScoreForEachQuery(query, contentType));
  if (queryScores.indexOf(0) > -1) {
    return 0;
  }
  return queryScores.reduce((a, b) => a + b, 0);
};

/**
 * Generates a score for a query based on a content type's properties
 *
 * @param  {string}       query
 * @param  {ContentType}  contentType
 * @return {number}
 */
const getScoreForEachQuery = function (query, contentType) {
  query = query.trim();

  for (let i = 0; i < propertyScoring.length; i++) {
    let ps = propertyScoring[i];

    let score = determinePropertyScore(query, contentType[ps.name], ps.max, ps.min);
    if (score !== -1) {
      return score;
    }
  }

  return 0; // No matches
};

/**
 * Determines score only for the first hit on query
 */
const determinePropertyScore = function(query, property, max, min) {
  if (!property) {
    return -1; // Unable to search this property
  }

  // Separate handling for arrays
  if (property instanceof Array) {
    for (let i = 0; i < property.length; i++) {
      let score = determinePropertyScore(query, property[i], max, min);
      if (score !== -1) {
        return score;
      }
    }

    return -1; // No hits in array
  }

  // Handle strings
  const strPos = property.toLowerCase().indexOf(query.toLowerCase());
  if (strPos === -1) {
    return -1; // No hits
  }

  // Calculate and return score
  const p = (property.length - strPos) / property.length;
  return ((max - min) * p) + min;
};

/**
 * Sort on multiple properties
 *
 * @param {MixedContentType[]|ContentType[]} contentTypes Content types that should be sorted
 * @param {string|string[]} sortOrder Order that sort properties should be applied
 *
 * @return {Array.<ContentType>} Content types sorted
 */
export const multiSort = (contentTypes, sortOrder) => {
  // Make sure all sorted instances are mixed content type
  const mixedContentTypes = contentTypes.map(contentType => {
    if (contentType.hasOwnProperty('score') && contentType.hasOwnProperty('contentType')) {
      return contentType;
    }

    // Return a mixed content type with score 1 to survive filtering
    return {
      contentType: contentType,
      score: 0.1
    };
  });

  return mixedContentTypes.sort((firstContentType, secondContentType) => {
    return !sortOrder ? sortSearchResults(firstContentType, secondContentType) : sortOnProperty(
      firstContentType,
      secondContentType,
      sortOrder[0],
      sortOrder.slice(1)
    );
  }).map(mixedContentType => mixedContentType.contentType);
};

/**
 * Sort on a property. Any valid property can be applied. If the content type does not have the
 * supplied property it will get moved to the bottom.
 *
 * @param {MixedContentType} firstContentType
 * @param {MixedContentType} secondContentType
 * @param {string} property Property that the content types will be sorted on, either
 * numerically or lexically
 * @param {string[]} sortOrder Remaining sort order to apply if two content types have the same
 * value
 *
 * @return {number} A value indicating the comparison between the two content types
 */
const sortOnProperty = (firstContentType, secondContentType, property, sortOrder) => {
  // Property does not exist, move to bottom
  if (!firstContentType.contentType.hasOwnProperty(property)) {
    return 1;
  }
  if (!secondContentType.contentType.hasOwnProperty(property)) {
    return -1;
  }

  // Sort on property
  const reverse = (reverseProps.indexOf(property) === -1 ? 1 : -1);
  if (firstContentType.contentType[property] > secondContentType.contentType[property]) {
    return 1 * reverse;
  }
  else if (firstContentType.contentType[property] < secondContentType.contentType[property]) {
    return -1 * reverse;
  }
  else {
    if (sortOrder.length) {
      return sortOnProperty(
        firstContentType,
        secondContentType,
        sortOrder[0],
        sortOrder.slice(1)
      );
    }
    else {
      return 0;
    }
  }
};

/**
 * Callback for Array.sort()
 * Compares two content types on different criteria
 *
 * @param {MixedContentType} a First content type
 * @param {MixedContentType} b Second content type
 * @return {number}
 */
const sortSearchResults = (a,b) => {
  if (!a.contentType.installed && b.contentType.installed) {
    return 1;
  }
  if (a.contentType.installed && !b.contentType.installed) {
    return -1;
  }
  else if (b.score !== a.score) {
    return b.score - a.score;
  }
  else {
    return b.contentType.popularity - a.contentType.popularity;
  }
};
