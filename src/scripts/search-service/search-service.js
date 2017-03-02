import {curry, map, filter} from "utils/functional"
import HubServices from "../hub-services";
import lunr from "lunr"

const findContentTypeByMachineName = curry(function(contentTypes, machineName) {
  return contentTypes.filter(contentType => contentType.machineName === machineName)[0];
});


/**
 * Adds a content type to the search index
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
    id: contentType.machineName
  });

  return contentType;
});

/**
 * @class
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
      this.field('title', {boost: 100});
      this.field('summary');
      this.field('description');
      this.field('keywords');
      this.ref('id');
    });

    this.contentTypes = this.services.contentTypes()
      .then(map(addToIndex(this.index))); // Add content types to search index
  }

  /**
   * Performs a search
   *
   * @param {String} query
   *
   * @return {Promise<ContentType[]>}
   */
  search(query) {
    // Display all content types by default
    if (query === '') {
      return this.contentTypes;
    }

    return this.contentTypes.then(contentTypes => {
      return this.index.search(query)
        .map(result => result.ref)
        .map(findContentTypeByMachineName(contentTypes))
    });
  }
}
