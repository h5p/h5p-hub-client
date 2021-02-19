import endpoints from './endpoints';
import fetchJSON from '../fetchJSON';

// 1 minute in milliseconds
const CACHE_EXPIRATION_DURATION = 60 * 1000;

const now = () => (new Date()).getTime();

export default class ApiClient {
  constructor({language = 'en'}) {
    this.language = language;
    this.licenses = {};
    this.searchCache = {};
  }

  static init(language, url, contentTypes) {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(language);

      //Make promise for content types metadata
      ApiClient.contentTypes = new Promise(resolve => {
        // Massage content types so they can be used by the Content Hub
        const cts = ApiClient.massageContentTypes(contentTypes);
        const hierarchical = ApiClient.makeHierarchicalContentTypes(cts);
        resolve(hierarchical);
      });

      ApiClient.flatContentTypes = new Promise(resolve => {
        // Massage content types so they can be used by the Content Hub
        const cts = ApiClient.massageContentTypes(contentTypes);
        resolve(cts);
      });

      // Create promises for all the metadata
      const metadataPromises = [];
      const metadata = [
        {
          name: 'levels',
          promise: 'levels',
          hierarchical: false
        },
        {
          name: 'languages',
          promise: 'languages',
          hierarchical: false
        },
        {
          name: 'licenses',
          promise: 'licenses',
          hierarchical: false
        },
        {
          name: 'disciplines',
          promise: 'disciplines',
          hierarchical: true
        },
        {
          name: 'flatDisciplines',
          promise: 'disciplines',
          hierarchical: false
        }];
      for (let i = 0; i < metadata.length; i++) {
        const metadataType = metadata[i].name;
        ApiClient[metadataType] = new Promise((resolve, reject) => {
          metadataPromises.push({
            type: metadata[i].promise,
            hierarchical: metadata[i].hierarchical,
            resolve: resolve,
            reject: reject
          });
        });
      }

      // Fetch all metadata and then resolve all the promises
      new fetchJSON(url)
        .then(response => {
          for (let i = 0; i < metadataPromises.length; i++) {
            const promise = metadataPromises[i];
            if (response.success === true && response.data[promise.type] !== undefined) {
              if (promise.hierarchical) {
                promise.resolve(ApiClient.makeHierarchicalList(ApiClient.massageMetadata(response.data[promise.type])));
              }
              else if (promise.type === 'licenses') {
                promise.resolve(ApiClient.massageLicenses(response.data[promise.type]));
              }
              else {
                promise.resolve(ApiClient.massageMetadata(response.data[promise.type]));
              }
            }
            else {
              promise.reject(new Error('Unable to load ' + promise.type + ' metadata.'));
            }
          }
        })
        .catch(reason => {
          for (let i = 0; i < metadataPromises.length; i++) {
            metadataPromises[i].reject(reason);
          }
        });
    }
  }

  /**
   * Since the data format from the hub is different from the data format
   * used in the client we need to message them a little.
   *
   * @param {Array} datas
   * @return {Array}
   */
  static massageMetadata(datas) {
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      data.label = data.translation ? data.translation : data.name;
      data.id = data.name;
    }
    return datas;
  }

  /**
   * Convert backend format of licenses to the format needed by the UI
   *
   * @param {*} list
   */
  static massageLicenses(list) {
    return list.map(element => {
      const result = {...element};
      if (result.licenses !== undefined) {
        result.licenses = ApiClient.massageLicenses(result.licenses);
      }
      else {
        result.id =  result.name,
        result.name = result.translation || result.name,
        result.versions = ApiClient.massageMetadata(result.versions);
      }
      return result;
    });
  }

  /**
   * Need to massage the content type data to be in the right format
   *
   * @param {Onject} contentTypes
   * @return {Array}
   */
  static massageContentTypes(contentTypes) {
    const cts = [];
    for (let i = 0; i < contentTypes.libraries.length; i++) {
      const library = contentTypes.libraries[i];
      cts.push({
        id: library.machineName + ' ' + library.majorVersion + '.' + library.minorVersion,
        label: library.title,
        categories: library.categories
      });
    }
    return cts;
  }

  /**
   * Create a hierarchical list
   * Need to have elements with id and parent
   * @param  {Array} list
   * @return {Array}
   */
  static makeHierarchicalList(list) {
    //Create lookup table
    const lookupTable = {};
    for (let i = 0; i < list.length; i++) {
      lookupTable[list[i].id] = list[i];
    }

    //Add children to parents
    for (let i = 0; i < list.length; i++) {
      if (list[i].parent !== null) {
        const parent = lookupTable[list[i].parent];
        parent.children = parent.children ? parent.children.concat([list[i]]) : [list[i]];
      }
    }

    const hierarchicalList = [];

    //Add all disciplines without parent to list
    for (let discipline of Object.values(lookupTable)) {
      if (discipline.parent === null) {
        hierarchicalList.push(discipline);
      }
    }
    return hierarchicalList;
  }

  /**
   * Make a hierarchical list of the content types
   * @param  {Array} list
   * @return {Array}
   */
  static makeHierarchicalContentTypes(list) {
    //Create categories
    const categoriesObject = {};
    for (let i = 0; i < list.length; i++) {
      if (list[i].categories && list[i].categories.length > 0) {
        list[i].categories.forEach(category => {
          if (categoriesObject[category] === undefined) {
            categoriesObject[category] = {
              id: category,
              label: category,
              children: []
            };
          }
        });
      }
    }

    //Add children to parents
    for (let i = 0; i < list.length; i++) {
      const categories = list[i].categories;
      if (categories !== undefined && categories.length > 0) {
        categories.forEach(category => {
          const parent = categoriesObject[category];
          parent.children = parent.children.concat([list[i]]);
        });
      }
    }

    return Object.values(categoriesObject);
  }

  static getLicense(id) {
    // Cache the license text
    if (!ApiClient.instance.licenses[id]) {
      ApiClient.instance.licenses[id] = ApiClient.instance.get(endpoints.license, {id: id});
    }

    return ApiClient.instance.licenses[id];
  }

  /**
   * Get cached query promise.
   *
   * @param {String} queryString
   * @return {Function|null}
   */
  static getCachedQueryResults(queryString) {
    const cache = ApiClient.instance.searchCache[queryString];

    // Return the promise if it exists AND it hasn't expired
    if (cache && now() < cache.expiresAt) {
      return cache.promise;
    }
  }
  
  /**
   * Perform a search using the HUB Content API. Will cache each search.
   * 
   * @param {Object} datas
   * @return {Function}
   */
  static search(datas) {
    const formData = new FormData();

    if (datas.filters !== undefined) {
      // Add licensing facets
      if (datas.filters.license !== undefined) {
        if (datas.filters.license.indexOf('modified') !== -1) {
          formData.append('can_be_modified', 1);
        }
        if (datas.filters.license.indexOf('commercial') !== -1) {
          formData.append('allows_commercial_use', 1);
        }
      }

      // Add reviewed facet
      if (datas.filters.reviewed !== undefined && datas.filters.reviewed.indexOf('reviewed') !== -1) {
        formData.append('reviewed', 1);
      }

      // Add multi facets
      const supportedFacets = {
        contentTypes: 'content_types',
        disciplines: 'disciplines',
        language: 'languages',
        level: 'levels'
      };
      for (let supportedFacet in supportedFacets) {
        if (supportedFacets.hasOwnProperty(supportedFacet) && datas.filters[supportedFacet] !== undefined) {
          const facet = datas.filters[supportedFacet];
          for (let i = 0; i < facet.length; i++) {
            formData.append(supportedFacets[supportedFacet] + '[]', facet[i]);
          }
        }
      }
    }

    // Add sorting
    if (datas.orderBy === 'newest') {
      formData.append('sort_by', 'created_at');
    }

    // Add pagination
    if (datas.page !== undefined && datas.page > 1) {
      formData.append('from', ((datas.page - 1) * 6).toString());
    }

    // Add fuzzy text search
    if (datas.query !== undefined && datas.query.trim()) {
      formData.append('text', datas.query);
    }

    // Did we create a promise for this query already?
    // If we did, use the "cached" promise.
    const queryString = new URLSearchParams(formData).toString();
    const cachedPromise = this.getCachedQueryResults(queryString);
    if (cachedPromise) {
      return () => cachedPromise;
    }

    const promise = new Promise((resolve, reject) => {
      if (window.H5PIntegration.Hub === undefined) {
        return reject(new Error('Did you forget to add the Hub integration?'));
      }
      
      const url = window.H5PIntegration.Hub.contentSearchUrl;

      return new fetchJSON(url, formData, 'omit').then(response => {
        resolve({
          numResults: response.total,
          content: response.items,
          pages: Math.ceil(parseInt(response.total) / 6),
          page: datas.page || 1
        });
      }).catch(reason => {
        //Delete cache if fetching failed
        delete ApiClient.instance.searchCache[queryString];
        reject(reason);
      });
    });
    
    ApiClient.instance.searchCache[queryString] = {
      promise: promise,
      expiresAt: now() + CACHE_EXPIRATION_DURATION
    };

    return () => promise;
  }
}
