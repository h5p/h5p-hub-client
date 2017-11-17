import search from '../../src/scripts/utils/search.js';
import apiContentTypes from '../mock/api/content-types.json';

describe('sorting', () => {
  it('should be able to sort by most recent', (done) => {
    let result = search(apiContentTypes, null, 'recently')[0];
    expect(result.machineName).toEqual('H5P.DocumentationTool');
    done();
  });
});

describe('searching', () => {
  it('should give the highest weighting to the title', (done) => {
    let results = search(apiContentTypes, 'question set');
    expect(results[0].machineName).toEqual('H5P.QuestionSet');
    done();
  });

  it('should discard results as the search is refined', (done) => {
    let results = search(apiContentTypes, 'question set');
    const incorrectResult = results.find(ct => ct.machineName === 'H5P.TrueFalse');
    expect(incorrectResult).toBeUndefined();
    done();
  });
});
