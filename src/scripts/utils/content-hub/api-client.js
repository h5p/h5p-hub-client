import endpoints from './endpoints';
import fetchJSON from '../fetchJSON';

export default class ApiClient {
  constructor({language = 'en'}) {
    this.language = language;
    this.licenses = {};
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

      // Create promises for all the metadata
      const metadataPromises = [];
      const metadata = [
        {
          name: 'levels',
          hierarchical: false
        },
        {
          name: 'languages',
          hierarchical: false
        },
        {
          name: 'licenses',
          hierarchical: false
        },
        {
          name: 'disciplines',
          hierarchical: true
        }];
      for (let i = 0; i < metadata.length; i++) {
        const metadataType = metadata[i].name;
        ApiClient[metadataType] = new Promise((resolve, reject) => {
          metadataPromises.push({
            type: metadataType,
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

  static search(datas) {
    return () => {
      return new Promise((resolve, reject) => {
        if (window.H5PIntegration.Hub === undefined) {
          return reject(new Error('Did you forget to add the Hub integration?'));
        }
        const query = [];

        if (datas.filters !== undefined) {
          // Add licensing facets
          if (datas.filters.license !== undefined) {
            // TODO: How can we tell if these filters have been turned off? I.e. you want to view content that cannot be used commercially?
            if (datas.filters.license.indexOf('modified') !== -1) {
              query.push('can_be_modified=1');
            }
            if (datas.filters.license.indexOf('commercial') !== -1) {
              query.push('allows_commercial_use=1');
            }
          }

          // Add reviewed facet
          if (datas.filters.reviewed !== undefined && datas.filters.reviewed.indexOf('reviewed') !== -1) {
            // TODO: How can we tell if this filter has been turned off? I.e. you want to view content that is not reviewed
            query.push('reviewed=1');
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
              //supportedFilters[supportedFilter]
              const facet = datas.filters[supportedFacet];
              for (let i = 0; i < facet.length; i++) {
                query.push(supportedFacets[supportedFacet] + '[]=' + facet[i]);
              }
            }
          }
        }

        // Add sorting
        if (datas.orderBy === 'newest') {
          query.push('sort_by=created_at');
        }

        // Add pagination
        if (datas.page !== undefined && datas.page > 1) {
          query.push('from=' + (datas.page * 6));
        }

        // TODO: Should it not be possible to filter on keywords?

        // Add fuzzy text search
        if (datas.query !== undefined && datas.query.trim()) {
          query.push('text=' + datas.query);
        }

        const queryString = query.join('&');
        const url = window.H5PIntegration.Hub.contentSearchUrl + (queryString ? '?' + queryString : '');
        return new fetchJSON(url, undefined, 'omit')
          .then(response => {
            resolve({
              numResults: response.total,
              content: response.items,
              pages: response.total / 6,
              page: datas.page || 1
            });
          })
          .catch(reason => {
            reject(reason);
          });
      });
    };
  }
}
