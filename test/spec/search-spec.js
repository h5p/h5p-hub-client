import search from '../../src/scripts/utils/search.js';
import apiContentTypes from '../mock/api/content-types.json';

describe('sorting', () => {
  it('should be able to sort by most recent', (done) => {
    let result = search(apiContentTypes, null, 'recently')[0];
    expect(result.machineName).toEqual('H5P.DocumentationTool');
    done();
  });

  it('should sort on popularity if there are no recently used', (done) => {
    let editedCache = apiContentTypes;
    editedCache.recentlyUsed = undefined;
    let results = search(editedCache, null, 'recently')
      .map(res => {
        return (res.popularity !== undefined ? res.popularity : 99999999);
      });
    expect(isMonotinic(results)).toEqual(true);
    done();
  });
});

describe('searching', () => {
  it('should give the highest weighting to the title', (done) => {
    let results = search(apiContentTypes, 'question set');
    expect(results[0].machineName).toEqual('H5P.QuestionSet');
    done();
  });

  it('should give heighest weighting to the title even for unintsalled content types', (done) => {
    let results = search(apiContentTypes, null, 'accord');
    expect(results[0].machineName).toEqual('H5P.Accordion');
    done();
  });

  it('should discard results as the search is refined', (done) => {
    let results = search(apiContentTypes, 'question set');
    const incorrectResult = results.find(ct => ct.machineName === 'H5P.TrueFalse');
    expect(incorrectResult).toBeUndefined();
    done();
  });

  it('should not show restriced content types', (done) => {
    let result = search(apiContentTypes, 'questionnaire');
    expect(result.length).toEqual(0);
    done();
  });
});

function isMonotinic(arr) {
  return arr.every(function(e, i, a) {
    if (i) {
      return e >= a[i-1];
    }
    else {
      return true;
    }
  });
}
