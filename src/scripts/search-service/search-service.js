import {curry, forEach, filter} from "../../../node_modules/h5p-sdk/src/scripts/utils/functional"
import HubServices from "../hub-services";
import lunr from "../../../node_modules/lunr"

const findContentTypeById = curry(function(contentTypes, id) {
  return contentTypes.filter(contentType => contentType.id === id)[0];
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

    this.contentTypes = this.services.contentTypes(); // Get content types
    this.contentTypes.then(forEach(this.addToIndex.bind(this))); // Add content types to search index
  }

  /**
   * addToIndex - Adds a content type to the search index
   *
   * @param  {Object} contentType
   */
  addToIndex(contentType) {
    this.index.add({
      title: contentType.title,
      summary: contentType.summary,
      id: contentType.id
    });
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
      return this.contentTypes.then(contentTypes => contentTypes);
    }

    return this.contentTypes.then(contentTypes => {
      return this.index.search(query)
        .map(result => result.ref)
        .map(findContentTypeById(contentTypes))
    });
  }
}
