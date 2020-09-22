import ApiClient from '../../../src/scripts/utils/content-hub/api-client';
import endpoints from '../../../src/scripts/utils/content-hub/endpoints';
import content from './seeds/content';
import languages from './seeds/languages';
import levels from './seeds/levels';
import license from './seeds/license';
import licenses from './seeds/licenses';
import contentTypes from './seeds/content-types';
import disciplines from './seeds/disciplines';

const endpointsToData = {};
endpointsToData[endpoints.search] = content;
endpointsToData[endpoints.languages] = languages;
endpointsToData[endpoints.levels] = levels;
endpointsToData[endpoints.contentTypes] = contentTypes;
endpointsToData[endpoints.disciplines] = disciplines;
endpointsToData[endpoints.license] = license;
endpointsToData[endpoints.licenses] = licenses;

const urlParams = window.URLSearchParams ? new URLSearchParams(window.location.search) : {
  get: function () {
    return null;
  }
};
const latency = urlParams.get('latency') || 2000;
const loadingForever = urlParams.get('loading') !== null;
const errorLoading = urlParams.get('error') !== null;
const emptyResults = urlParams.get('empty') !== null;

const get = function(endpoint, params) {
  if (loadingForever) {
    return new Promise(function () {});
  }
  else if (errorLoading) {
    return new Promise(function (resolve, reject) {
      reject(new Error('Failed fetching data'));
    });
  }
  else if (emptyResults) {
    return new Promise(function (resolve) {
      resolve(endpointsToData[endpoint](params, true));
    });
  }

  return new Promise(function(resolve) {
    setTimeout(function() {
      if(endpoint === endpoints.disciplines && !params) {
        resolve(ApiClient.makeHierarchicalList(ApiClient.massageMetadata(endpointsToData[endpoint](params))));
      }
      else if(endpoint === endpoints.contentTypes && !params) {
        resolve(ApiClient.makeHierarchicalContentTypes(ApiClient.massageContentTypes(endpointsToData[endpoint](params))));
      }
      else if(endpoint === endpoints.contentTypes && params && params.flat) {
        resolve(ApiClient.massageContentTypes(endpointsToData[endpoint](params)));
      }
      else {
        resolve(ApiClient.massageMetadata(endpointsToData[endpoint](params)));
      }
    }, latency);
  });
};


ApiClient.init = function(language) {
  ApiClient.instance = new ApiClient(language);
  ApiClient.levels = get(endpoints.levels);
  ApiClient.disciplines = get(endpoints.disciplines);
  ApiClient.languages = get(endpoints.languages);
  ApiClient.licenses = get(endpoints.licenses);
  ApiClient.contentTypes = get(endpoints.contentTypes);
  ApiClient.flatContentTypes = get(endpoints.contentTypes, {flat: true});
  ApiClient.flatDisciplines = get(endpoints.disciplines,{flat: true});
};

ApiClient.search = function(params) {
  console.log('Running search', params);
  return function () {
    return get(endpoints.search, params);
  };
};

