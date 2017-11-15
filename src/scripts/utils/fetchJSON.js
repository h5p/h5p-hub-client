import './fetch';

const fetchJSON = (url, method) =>
  fetch(url, {
    method: !method ? 'GET' : method,
    credentials: 'include',
    body: method === 'POST' ? '' : undefined
  })
    .then(response => {
      return response.json().catch(() => {
        throw {
          title: response.statusText + ' (' + response.status + ')',
          details: ['Unable to interpret response.', 'Please check your error log.'] // TODO: l10n
        };
      });
    })
    .then(response => {
      if (response.success === false) {
        throw {
          title: response.message + ' (' + response.errorCode  + ')',
          details: response.details
        };
      }
      return response;
    });

export default fetchJSON;
