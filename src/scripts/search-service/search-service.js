import {curry} from 'utils/functional'
import HubServices from '../hub-services';

/**
 * @class
 * The Search Service gets a content type from hub-services.js
 * in the form of a promise. It then generates a score based
 * on the different weightings of the content type fields and
 * sorts the results based on the generated score.
 */
export default class SearchService {
  /**
   * @param {Object} state
   * @param {string} state.apiRootUrl
   */
  constructor(state) {
    this.services = new HubServices({
      apiRootUrl: state.apiRootUrl
    });

    // Add content types to the search index
    this.contentTypes = this.services.contentTypes();
  }

  /**
   * Performs a search
   *
   * @param {String} query
   *
   * @return {Promise<ContentType[]>} A promise of an array of content types
   */
  search(query) {
    return this.contentTypes.then(filterByQuery(query));
  }
}

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
  return contentTypes.map(contentType =>
    ({
      contentType: contentType,
      score: getSearchScore(query, contentType)
    }))
    .filter(result => result.score > 0)
    .sort(sortSearchResults) // Sort by installed, relevance and popularity
    .map(result => result.contentType); // Unwrap result object;
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

const AddNumber=function(a,b)
{
  return a+b;
}
