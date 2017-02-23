import {curry} from "../../../node_modules/h5p-sdk/src/scripts/utils/functional"
import HubServices from "../hub-services";

/**
 * Checks if a needle is found in the haystack.
 * Not case sensitive
 *
 * @param {string} needle
 * @param {string} haystack
 * @return {boolean}
 */
const hasSubString = function(needle, haystack) {
  return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
};

/**
 * Filters a list of content types based on a query
 * @type {Function}
 *
 * @param {string} query
 * @param {ContentType[]} contentTypes
 */
const filterByQuery = curry(function(query, contentTypes) {
  return contentTypes
    .filter(contentType => hasSubString(query, contentType.title) || hasSubString(query, contentType.shortDescription));
});

/**
 * @class
 */
export default class SearchService {
  constructor() {
    this.services = new HubServices({
      rootUrl: '/test/mock/api'
    });

    this.contentTypes = this.services.contentTypes();
  }

  /**
   * Performs a search
   *
   * @param {String} query
   *
   * @return {Promise<ContentType[]>}
   */
  search(query) {
    return this.contentTypes.then(filterByQuery(query));
  }
}