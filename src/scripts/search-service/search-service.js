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
  // Sort alphabetically upon initialization
  if (query == '') {
    return contentTypes.sort(function(a,b){
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      return 0;
    });
  }

  return contentTypes
    .map(function(contentType){
      // Append a search score to each content type
      let result = {
        contentType: contentType,
        score: getSearchScore(query, contentType)
      };
      return result;
    })
    .filter(result => result.score > 0) // Only show hits
    .sort((a,b) => b.score - a.score) // Sort by relevance
    .map(result => result.contentType); // Unwrap result object
});

/**
 * Calculates weighting for different search terms based
 * on existence of substrings
 *
 * @param  {string} query
 * @param  {Object} contentType
 * @return {int}
 */
const getSearchScore = function(query, contentType) {
  let score = 0;
  // Tokenize the query string and ignore spaces 
  let queries = query.split(' ').filter(query => query !== '');

  queries.forEach(function(query) {
    if (hasSubString(query, contentType.title)) {
      score += 100;
    }
    if (hasSubString(query, contentType.summary)) {
      score += 5;
    }
    if (hasSubString(query, contentType.description)) {
      score += 5;
    }
    if (arrayHasSubString(query, contentType.keywords)) {
        score += 5;
    }
  });

  return score;
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
