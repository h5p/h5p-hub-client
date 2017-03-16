import {curry} from 'utils/functional'

/**
 * @class
 * The Search Service gets a content type from hub-services.js
 * in the form of a promise. It then generates a score based
 * on the different weightings of the content type fields and
 * sorts the results based on the generated score.
 */
export default class SearchService {
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
   * Filter out restricted if it is defined and false
   *
   * @return {Promise.<ContentType[]>}
   */
  filterOutRestricted() {
    return this.services.contentTypes()
      .then(cts => cts.filter(ct => !ct.restricted));
  }
}

/**
 * Sort on multiple properties
 *
 * @param {ContentType[]} contentTypes Content types that should be sorted
 * @param {string|string[]} sortOrder Order that sort properties should be applied
 *
 * @return {Array.<ContentType>} Content types sorted
 */
const multiSort = (contentTypes, sortOrder) => {
  sortOrder = Array.isArray(sortOrder) ? sortOrder : [sortOrder];
  return contentTypes.sort((ct1, ct2) => {
    return handleSortType(ct1, ct2, sortOrder);
  });
};

/**
 * Compares two content types and returns a sortable value for them
 *
 * @param {ContentType} ct1
 * @param {ContentType} ct2
 * @param {string[]} sortOrder Order that sort properties should be applied in
 *
 * @return {number} A number indicating how to sort the two content types
 */
const handleSortType = (ct1, ct2, sortOrder) => {
  switch (sortOrder[0]) {
    case 'restricted':
      return sortOnRestricted(ct1, ct2, sortOrder.slice(1));
    case 'popularity':
      return sortOnProperty(ct1, ct2, sortOrder[0], sortOrder.slice(1));
    default:
      return sortSearchResults(ct1, ct2);
  }
};

/**
 * Sort restricted content types. Restricted content types will be moved to the bottom of the
 * list. Content types with undefined restricted property are consider not restricted.
 *
 * @param {ContentType} ct1
 * @param {ContentType} ct2
 * @param {string[]} sortOrder Order to apply sort properties
 *
 * @return {number} A standard comparable value for the two content types
 */
const sortOnRestricted = (ct1, ct2, sortOrder) => {
  if (!ct1.restricted === !ct2.restricted) {
    if (sortOrder) {
      return handleSortType(ct1, ct2, sortOrder);
    }
    else {
      return 0;
    }
  }
  else if (ct1.restricted) {
    return 1;
  }
  else if (ct2.restricted) {
    return -1;
  }
};

/**
 * Sort on a property. Any valid property can be applied. If the content type does not have the
 * supplied property it will get moved to the bottom.
 *
 * @param {ContentType} ct1
 * @param {ContentType} ct2
 * @param {string} property Property that the content types will be sorted on, either
 * numerically or lexically
 * @param {string[]} sortOrder Remaining sort order to apply if two content types have the same
 * value
 *
 * @return {number} A value indicating the comparison between the two content types
 */
const sortOnProperty = (ct1, ct2, property, sortOrder) => {
  // Property does not exist, move to bottom
  if (!ct1.hasOwnProperty(property)) {
    return 1;
  }
  if (!ct2.hasOwnProperty(property)) {
    return -1;
  }

  // Sort on property
  if (ct1[property] > ct2[property]) {
    return 1;
  }
  else if (ct1[property] < ct2[property]) {
    return -1;
  }
  else {
    if (sortOrder) {
      return handleSortType(ct1, ct2, sortOrder);
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
  const filtered = contentTypes.map(contentType => {
    contentType.score = getSearchScore(query, contentType);
    return contentType;
  }).filter(result => result.score > 0);

  return multiSort(filtered, ['restricted', 'default']);
});

/**
 * Callback for Array.sort()
 * Compares two content types on different criteria
 *
 * @param {Object} a First content type
 * @param {Object} b Second content type
 * @return {int}
 */
const sortSearchResults = (a,b) => {
  if (!a.installed && b.installed) {
    return 1;
  }

  if (a.installed && !b.installed) {
    return -1;
  }

  else if (b.score !== a.score) {
    return b.score - a.score;
  }

  else {
    return b.popularity - a.popularity;
  }
};

/**
 * Calculates weighting for different search terms based
 * on existence of substrings
 *
 * @param  {string} query
 * @param  {Object} contentType
 * @return {int}
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
 * Generates a relevance score for a single string
 *
 * @param  {type} query       description
 * @param  {type} contentType description
 * @return {type}             description
 */
const getScoreForEachQuery = function (query, contentType) {
   query = query.trim();
   if (hasSubString(query, contentType.title)) {
     return 100;
   }
   else if (hasSubString(query, contentType.summary)) {
     return 5;
   }
   else if (hasSubString(query, contentType.description)) {
     return 5;
   }
   else if (arrayHasSubString(query, contentType.keywords)) {
     return 5;
   }
   else if (hasSubString(query, contentType.machineName)) {
     return 1;
   }
   else {
     return 0;
   }
};

/**
 * Checks if a needle is found in the haystack.
 * Not case sensitive
 *
 * @param {string} needle
 * @param {string} haystack
 * @return {boolean}
 */
const hasSubString = function(needle, haystack) {
  if (haystack === undefined) {
    return false;
  }

  return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
};

/**
 * Helper function, checks if array has contains a substring
 *
 * @param  {String} subString
 * @param  {Array} arr
 * @return {boolean}
 */
const arrayHasSubString = function(subString, arr) {
  if (arr === undefined || subString === '') {
    return false;
  }

  return arr.some(string => hasSubString(subString, string));
};
