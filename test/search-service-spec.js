import SearchService from '../src/scripts/search-service/search-service';
import cacheMock from './mock/api/content-type-cache.json';

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

describe('Search service', () => {
  const mockedService = {
    contentTypes: () => {
      return Promise.resolve(cacheMock.libraries);
    }
  };
  const search = new SearchService(mockedService);

  describe('sorting', () => {

    it('should filter the most popular content type first (H5P.MultiChoice)', (done) => {
      search.sortOn('popularity')
        .then(cts => {
          expect(cts[0].machineName).toEqual('H5P.MultiChoice');
          done();
        });
    });

    it('should filter content types without popularity last', (done) => {
      search.sortOn('popularity')
        .then(cts => {
          expect(cts[cts.length - 1].machineName).toEqual('H5P.Boardgame');
          done();
        });
    })

  });

  describe('restricted filtering', () => {

    it('should filter out content type when filtering out restricted', (done) => {
      const noFilter = cacheMock.libraries.find(ct => ct.machineName === 'H5P.ImpressPresentation');
      expect(noFilter).toBeDefined();
      expect(noFilter.restricted).toBeTruthy();

      search.filterOutRestricted().then(cts => {
        const restricted = cts.find(ct => ct.machineName === 'H5P.ImpressPresentation');
        expect(restricted).toBeUndefined();
        done();
      });
    });

    it('should keep content types where restricted is not defined', (done) => {
      const noFilter = cacheMock.libraries.find(ct => ct.machineName === 'Reorder');
      expect(noFilter).toBeDefined();
      expect(noFilter.restricted).toBeUndefined();

      search.filterOutRestricted().then(cts => {
        const resNotDefined = cts.find(ct => ct.machineName === 'Reorder');
        expect(resNotDefined).toBeDefined();
        done();
      })
    });

    it('should keep content types where restricted is false', (done) => {
      const noFilter = cacheMock.libraries.find(ct => ct.machineName === 'H5P.InteractiveVideo');
      expect(noFilter).toBeDefined();
      expect(noFilter.restricted).toBeFalsy();

      search.filterOutRestricted().then(cts => {
        const notRestricted = cts.find(ct => ct.machineName === 'H5P.InteractiveVideo');
        expect(notRestricted).toBeDefined();
        done();
      })
    });

  });
});
