import endpoints from './endpoints';

export default class ApiClient {
  constructor({language = 'en'}) {
    this.language = language;
  }

  static init(language) {
    if (!ApiClient.instance) {
      const instance = ApiClient.instance = new ApiClient(language);
      
      ApiClient.levels = instance.get(endpoints.levels);
      ApiClient.disciplines = instance.get(endpoints.disciplines);
      ApiClient.languages = instance.get(endpoints.languages);
      ApiClient.licenses = instance.get(endpoints.licenses);
      ApiClient.contentTypes = instance.get(endpoints.contentTypes);
      ApiClient.reviewed = instance.get(endpoints.reviewed);
    }
  }

  get(endpoint, params) {
    return () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('not implemented'));
        }, 2000);
      });
    };
  }

  static search({
    query = '',
    orderBy = '',
    filters = [],
    limit = 8,
    page = 0
  }) {
    return ApiClient.instance.get(endpoints.search, {
      query: query,
      orderBy: orderBy,
      filters: filters,
      limit: limit,
      page: page
    });
  }
}