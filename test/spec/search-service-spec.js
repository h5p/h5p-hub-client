import { SearchService } from '../../src/scripts/search-service/search-service';
import cacheMock from '../mock/api/content-type-cache.json';

describe('Search service', () => {
  const mockedService = {
    contentTypes: () => {
      return Promise.resolve(cacheMock.libraries);
    },
    recentlyUsed: () => {
      return Promise.resolve(cacheMock.recentlyUsed);
    }
  };
  const search = new SearchService(mockedService);

  describe('searching', () => {

    it('should give the highest weighting to title', (done) => {
      search.search('multiple choice')
        .then(cts => {
          expect(cts[0].machineName).toEqual('H5P.MultiChoice');
          done();
        })
    });

    it('should discard results as the search is refined', (done) => {
      search.search('question set')
        .then(cts => {
          const result = cts.find(ct => ct.machineName === 'H5P.TrueFalse');
          expect(result).toBeUndefined();
          done();
        })
    });
  });

  describe('sorting', () => {

    it('should filter the most popular content type first (H5P.CoursePresentation)', (done) => {
      search.sortOn('popularity')
        .then(cts => {
          expect(cts[0].machineName).toEqual('H5P.CoursePresentation');
          done();
        });
    });

    it('should filter content types without popularity last', (done) => {
      search.sortOn('popularity')
        .then(cts => {
          expect(cts[cts.length - 1].popularity).toEqual(undefined);
          done();
        });
    });

    it('should sort most recently used content type first', (done) => {
      search.sortOnRecent(cacheMock.libraries)
        .then(cts => {
          expect(cts[0].machineName).toEqual('H5P.CoursePresentation');
          done();
        })
    });
  });

  describe('restricted filtering', () => {

    it('should filter out content type when filtering out restricted', (done) => {
      const noFilter = cacheMock.libraries.find(ct => ct.machineName === 'H5P.Accordion');
      expect(noFilter).toBeDefined();
      expect(noFilter.restricted).toBeTruthy();

      search.applyFilters(['restricted']).then(cts => {
        const restricted = cts.find(ct => ct.machineName === 'H5P.Accordion');
        expect(restricted).toBeUndefined();
        done();
      });
    });

    it('should keep content types where restricted is not defined', (done) => {
      const noFilter = cacheMock.libraries.find(ct => ct.machineName === 'Reorder');
      expect(noFilter).toBeDefined();
      expect(noFilter.restricted).toBeUndefined();

      search.applyFilters(['restricted']).then(cts => {
        const resNotDefined = cts.find(ct => ct.machineName === 'Reorder');
        expect(resNotDefined).toBeDefined();
        done();
      })
    });

    it('should keep content types where restricted is false', (done) => {
      const noFilter = cacheMock.libraries.find(ct => ct.machineName === 'H5P.InteractiveVideo');
      expect(noFilter).toBeDefined();
      expect(noFilter.restricted).toBeFalsy();

      search.applyFilters(['restricted']).then(cts => {
        const notRestricted = cts.find(ct => ct.machineName === 'H5P.InteractiveVideo');
        expect(notRestricted).toBeDefined();
        done();
      })
    });

  });
});
