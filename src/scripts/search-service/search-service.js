import {curry} from 'utils/functional';

/**
 * @typedef {Object} MixedContentType
 *
 * @property {ContentType} contentType Original content type properties
 * @property {number} score Indicates how well the content type matches the current search context
 */

/**
 * @class
 * The Search Service gets a content type from hub-services.js
 * in the form of a promise. It then generates a score based
 * on the different weightings of the content type fields and
 * sorts the results based on the generated score.
 */
export class SearchService {
  /**
   * @param {HubServices} services
   */
  constructor(services) {
    this.services = services;
  }

  /**
   * Performs a search
   *
   * @param {String} query
   *
   * @return {Promise<ContentType[]>} A promise of an array of content types
   */
  search(query) {
    // Add content types to the search index
    return this.services.contentTypes().then(filterByQuery(query));
  }

  /**
   * Filter all content types by given property
   *
   * @param {string|Array} sortOrder One or more properties
   *
   * @return {Promise.<ContentType[]>|*}
   */
  sortOn(sortOrder) {
    return this.services.contentTypes()
      .then(contentTypes => multiSort(contentTypes, sortOrder));
  }

  /**
   * Returns a list of content type objects sorted
   * on most recently used.
   *
   * @return {ContentType[]}  Content Types
   */
  sortOnRecent(contentTypes) {
    return this.services.recentlyUsed()
      .then(recentlyUsed => {
        if (recentlyUsed.length !== 0) {
          return sortContentTypesByMachineName(contentTypes, recentlyUsed);
        }
        else {
          return contentTypes;
        }
      });
  }

  /**
   * Filter out restricted if it is defined and false
   *
   * @param {string[]} filters Filters that should be applied
   *
   * @return {Promise.<ContentType[]>}
   */
  applyFilters(filters) {
    return this.services.contentTypes()
      .then(contentTypes => multiFilter(contentTypes, filters));
  }
}

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
      score: 1
    };
  });

  sortOrder = Array.isArray(sortOrder) ? sortOrder : [sortOrder];
  return mixedContentTypes.sort((firstContentType, secondContentType) => {
    return handleSortType(firstContentType, secondContentType, sortOrder);
  }).map(mixedContentType => mixedContentType.contentType);
};

/**
 * Apply multiple filters to content types
 *
 * @param {ContentType[]} contentTypes Content types that should be filtered
 * @param {string[]} filters Filters that should be applied
 *
 * @return {ContentType[]} Remaining content types after filtering
 */
const multiFilter = (contentTypes, filters) => {
  // Finished filtering
  if (!filters.length) {
    return contentTypes;
  }

  // Apply filter
  return multiFilter(handleFilter(contentTypes, filters.shift()), filters);
};

/**
 * Applies a single filter to content types
 *
 * @param {ContentType[]} contentTypes Content types that should be filtered
 * @param {string} filter Filter that should be applied
 *
 * @return {ContentType[]} Content types remaining after applying filter
 */
const handleFilter = (contentTypes, filter) => {
  switch(filter) {
    case 'restricted':
      return contentTypes.filter(contentType => !contentType.restricted);
    case 'installed':
      return contentTypes.filter(contentType => contentType.installed);
  }
};

/**
 * Compares two content types and returns a sortable value for them
 *
 * @param {MixedContentType} firstContentType
 * @param {MixedContentType} secondContentType
 * @param {string[]} sortOrder Order that sort properties should be applied in
 *
 * @return {number} A number indicating how to sort the two content types
 */
const handleSortType = (firstContentType, secondContentType, sortOrder) => {
  switch (sortOrder[0]) {
    case 'restricted':
      return sortOnRestricted(
        firstContentType,
        secondContentType,
        sortOrder.slice(1)
      );
    case 'popularity':
      return sortOnProperty(
        firstContentType,
        secondContentType,
        sortOrder[0],
        sortOrder.slice(1)
      );
    case 'title':
      return sortOnProperty(
        firstContentType,
        secondContentType,
        sortOrder[0],
        sortOrder.slice(1)
      );
    default:
      return sortSearchResults(firstContentType, secondContentType);
  }
};

/**
 * Sort restricted content types. Restricted content types will be moved to the bottom of the
 * list. Content types with undefined restricted property are consider not restricted.
 *
 * @param {MixedContentType} firstContentType
 * @param {MixedContentType} secondContentType
 * @param {string[]} sortOrder Order to apply sort properties
 *
 * @return {number} A standard comparable value for the two content types
 */
const sortOnRestricted = (firstContentType, secondContentType, sortOrder) => {
  if (!firstContentType.contentType.restricted === !secondContentType.contentType.restricted) {
    if (sortOrder.length) {
      return handleSortType(firstContentType, secondContentType, sortOrder);
    }
    else {
      return 0;
    }
  }
  else if (firstContentType.contentType.restricted) {
    return 1;
  }
  else if (secondContentType.contentType.restricted) {
    return -1;
  }
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
  if (firstContentType.contentType[property] > secondContentType.contentType[property]) {
    return 1;
  }
  else if (firstContentType.contentType[property] < secondContentType.contentType[property]) {
    return -1;
  }
  else {
    if (sortOrder.length) {
      return handleSortType(firstContentType, secondContentType, sortOrder);
    }
    else {
      return 0;
    }
  }
};

/**
 * Filters a list of content types based on a query
 * @type {Function}
 *
 * @param {string} query
 * @param {ContentType[]} contentTypes
 */
const filterByQuery = curry(function(query, contentTypes) {
  if (query == '') {
    return contentTypes;
  }

  // Append a search score to each content type
  const filtered = contentTypes.map(contentType => ({
    contentType: contentType,
    score: getSearchScore(query, contentType)
  })).filter(result => result.score > 0);

  return multiSort(filtered, ['restricted', 'default']);
});

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
 * Filters an array of content type objects based
 * on an order specified by an array of machine names.
 *
 * @param  {ContentType[]} contentTypes
 * @param  {string[]}     machineNames
 * @return {ContentType[]}              filtered content types
 */
const sortContentTypesByMachineName = function(contentTypes, machineNames) {
  const sortables = [];
  const unsortables = [];

  // Find all the content types that need to be sorted move them to a new array
  // place the rest in a different array to be appended at the end
  contentTypes.forEach(contentType => {
    const hasSortableMachineName = machineNames.indexOf(contentType.machineName.toString()) > -1;

    if (hasSortableMachineName) {
      sortables.push(contentType);
    }
    else {
      unsortables.push(contentType);
    }
  });

  sortables.sort((a,b) => {
    const aIndex = machineNames.indexOf(a.machineName.toString());
    const bIndex = machineNames.indexOf(b.machineName.toString());

    if (aIndex === -1 && bIndex === -1) { // neither are recently used
      return 0;
    }
    else if (aIndex !== -1 && bIndex === -1) { // b is not recently used
      return -1;
    }
    else if (aIndex === -1 && bIndex !== -1) { // a is not recently used
      return 1;
    }
    else if (aIndex !== -1 && bIndex !== -1) { // both are recently used
      return (aIndex < bIndex) ? -1 : 1;
    }
  });

  return sortables.concat(unsortables);
};
