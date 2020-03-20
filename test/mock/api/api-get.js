import ApiClient from '../../../src/scripts/utils/content-hub/api-client';
import endpoints from '../../../src/scripts/utils/content-hub/endpoints';
import content from './seeds/content';
import languages from './seeds/languages';
import levels from './seeds/levels';
import reviewed from './seeds/reviewed';
import contentTypes from './seeds/content-types';

const settings = window.HubSimulations || {
  latency: 2000,
  fail: false,
  noResults: false
};

const endpointsToData = {};
endpointsToData[endpoints.search] = content;
endpointsToData[endpoints.languages] = languages;
endpointsToData[endpoints.levels] = levels;
endpointsToData[endpoints.reviewed] = reviewed;
endpointsToData[endpoints.contentTypes] = contentTypes;

ApiClient.prototype.get = function(endpoint, params) {

  console.log('SEARCH APPLIED', endpoint, params);
  

  return function() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (settings.fail) {
          reject(new Error('Failed fetching'));
        }
        else {
          resolve(endpointsToData[endpoint](params, settings));
        }
      }, settings.latency);
    });
  };
};