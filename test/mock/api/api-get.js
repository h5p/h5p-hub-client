import ApiClient from '../../../src/scripts/utils/content-hub/api-client';
import endpoints from '../../../src/scripts/utils/content-hub/endpoints';
import content from './seeds/content';
import languages from './seeds/languages';
import levels from './seeds/levels';

const defaultTimeout = 2500;

const endpointsToData = {};
endpointsToData[endpoints.search] = content;
endpointsToData[endpoints.languages] = languages;
endpointsToData[endpoints.levels] = levels;

ApiClient.prototype.get = function(endpoint) {
  return function() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(endpointsToData[endpoint]());
      }, defaultTimeout);
    });
  };
};