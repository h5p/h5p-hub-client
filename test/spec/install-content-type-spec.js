// import SearchService from '../src/scripts/search-service/search-service';
// import cacheMock from './mock/api/content-type-cache.json';
// import Hub from '../src/scripts/hub.js';

// describe('Search Service', () => {
//   // Check that attach is called
//   it('should return something', () => {
//     console.log('test');
//
//     let service = new SearchService({
//       apiRootUrl: 'test/mock/api/'
//     });
//
//     let result = service.search('test')
//       .then(result => console.log(JSON.stringify(result)));
//   });
//
//   it('should return something else', () => {
//     console.log('test2');
//   });
// });

// describe('Search service filtering', () => {
  /*const mockedService = {
    contentTypes: () => {
      return Promise.resolve(cacheMock.libraries);
    }
  };
  const search = new SearchService(mockedService);*/

  /*it('should filter the most popular content type first (H5P.MultiChoice)', (done) => {
    search.filter('popularity')
      .then(cts => {
        expect(cts[0].machineName).toEqual('H5P.MultiChoice');
        done();
      });
  });

  it ('should filter content types without popularity last', (done) => {
    search.filter('popularity')
      .then(cts => {
        expect(cts[cts.length - 1].machineName).toEqual('H5P.Feedback');
        done();
      });
  })*/
// });
