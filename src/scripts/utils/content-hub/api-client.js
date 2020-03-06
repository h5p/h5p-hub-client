import endpoints from './endpoints';

export default class ApiClient {
  constructor({language = 'en'}) {
    this.language = language;
  }

  static init(language) {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(language);
    }
  }

  get(endpoint, params) {
    return () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('GETTING HERE');
          reject(new Error('not implemented'));
        }, 2000);
      });
    };
  }

  static search({
    query = '',
    orderBy = '',
    filters = [],
    limit = 10,
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

  static getDisciplines() {
    return ApiClient.instance.get(endpoints.disciplines);
  }

  static getContentTypes() {
    return ApiClient.instance.get(endpoints.contentTypes);
  }

  static getLicenses() {
    return ApiClient.instance.get(endpoints.licenses);
  }

  static getLanguages() {
    return ApiClient.instance.get(endpoints.languages);
  }

  static getLevels() {
    return ApiClient.instance.get(endpoints.levels);
  }
}