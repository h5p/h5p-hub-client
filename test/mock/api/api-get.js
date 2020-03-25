import ApiClient from '../../../src/scripts/utils/content-hub/api-client';
import endpoints from '../../../src/scripts/utils/content-hub/endpoints';
import content from './seeds/content';
import languages from './seeds/languages';
import levels from './seeds/levels';
import contentTypes from './seeds/content-types';
import disciplines from './seeds/disciplines';

const endpointsToData = {};
endpointsToData[endpoints.search] = content;
endpointsToData[endpoints.languages] = languages;
endpointsToData[endpoints.levels] = levels;
endpointsToData[endpoints.contentTypes] = contentTypes;
endpointsToData[endpoints.disciplines] = disciplines;



const urlParams = window.URLSearchParams ? new URLSearchParams(window.location.search) : {
  get: function () {
    return null;
  }
};
const latency = urlParams.get('latency') || 2000;
const loadingForever = urlParams.get('loading') !== null;
const errorLoading = urlParams.get('error') !== null;
const emptyResults = urlParams.get('empty') !== null;

ApiClient.prototype.get = function(endpoint, params) {
  console.log('SEARCH APPLIED', endpoint, params);

  if (loadingForever) {
    return function() {
      return new Promise(function () {});
    };
  }
  else if (errorLoading) {
    return function() {
      return new Promise(function (resolve, reject) {
        reject(new Error('Failed fetching data'));
      });
    };
  }
  else if (emptyResults) {
    return function() {
      return new Promise(function (resolve) {
        resolve(endpointsToData[endpoint](params, true));
      });
    };
  }

  return function() {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(endpointsToData[endpoint](params));
      }, latency);
    });
  };
};