import {curry, map, filter} from "utils/functional"
import HubServices from "../hub-services";
import lunr from "lunr"

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

    // Set up lunr index
    this.index = lunr(function() {
      this.field('title', {boost: 10}); // Certain fields can given a higher importance
      this.field('summary');
      this.field('description');
      this.field('keywords');
      this.ref('id'); //
    });

    // Add content types to the search index
    this.contentTypes = this.services.contentTypes()
      .then(map(addToIndex(this.index)));
  }

  /**
   * Performs a search
   *
   * @param {String} query
   *
   * @return {Promise<ContentType[]>} A promise of an array of content types
   */
  search(query) {
    // Display all content types by default
    if (query === '') {
      return this.contentTypes;
    }

    // Otherwise, filter content types by a query
    return this.contentTypes.then(contentTypes => {
      return this.index.search(query)
        .map(result => result.ref)
        .map(findContentTypeByMachineName(contentTypes))
    });
  }
}

/**
 * Adds a content type to the lunrjs search index
 * creates an id for the index using the machine name
 * of the content type.
 *
 * @param  {lunr.Index} index
 * @param  {ContentType} contentType
 *
 * @return {ContentType}
 */
const addToIndex = curry((index, contentType) => {
  index.add({
    title: contentType.title,
    summary: contentType.summary,
    description: contentType.description,
    keywords: contentType.keywords,
    id: contentType.machineName
  });

  return contentType;
});

/**
 * helper function
 *
 * @param  {ContentType[]}
 * @param  {string} machineName
 * @return {ContentType}
 */
const findContentTypeByMachineName = curry(function(contentTypes, machineName) {
  return contentTypes.filter(contentType => contentType.machineName === machineName)[0];
});
