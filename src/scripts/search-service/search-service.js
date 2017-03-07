import {curry, map, filter} from "utils/functional"
import HubServices from "../hub-services";

/**
 * @class
 * The Search Service gets a content types from HubServices
 * then indexes them using lunrjs. It then searches through
 * the lunrjs index and returns content types that match the query.
 */
export default class SearchService {
  /**
   * @param {object} state
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
  if (query == "") {
    return contentTypes.sort(function(a,b){
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      return 0;
    });
  }

  return contentTypes
    .reduce((result, contentType) => {
      result.push({
        contentType: contentType,
        score: getSearchScore(query, contentType)
      })
      return result;
    }, [])
    .filter(result => result.score > 0)
    .sort((a,b) => b.score - a.score)
    .map(result => result.contentType)
});

/**
 * Calculates weighting for different search terms based
 * on existence of substrings
 *
 * @param  {String} query
 * @param  {Object} contentType
 * @return {int}
 */
const getSearchScore = function(query, contentType) {
  let score = 0;
  if (hasSubString(query, contentType.title)) {
    score += 20;
  };
  if (hasSubString(query, contentType.summary)) {
    score += 5;
  };
  if (hasSubString(query, contentType.description)) {
    score += 5;
  };
  if (arrayHasSubString(query, contentType.keywords)) {
      score += 5;
  };
  return score;
}

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
  if (arr === undefined) {
    return false;
  }

  return arr.some(string => hasSubString(subString, string));
}
