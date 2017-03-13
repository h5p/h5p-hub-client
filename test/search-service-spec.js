import SearchService from '../src/scripts/search-service/search-service';

describe('Search Service', () => {
  // Check that attach is called
  it('should return something', () => {
    console.log('test');

    let service = new SearchService({
      apiRootUrl: 'test/mock/api/'
    });

    let result = service.search('test')
      .then(result => console.log(JSON.stringify(result)));
  });

  it('should return something else', () => {
    console.log('test2');
  });
});