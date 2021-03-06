import './fetch';
import Dictionary from './dictionary';

const fetchJSON = (url, data) =>
  fetch(url, {
    method: data === undefined ? 'GET' : 'POST',
    credentials: 'include',
    body: data
  })
    .then(response => {
      return response.json().catch(() => {
        throw {
          title: response.statusText + ' (' + response.status + ')',
          message: [Dictionary.get('unableToInterpretError'), Dictionary.get('unableToInterpretSolution')]
        };
      });
    })
    .then(response => {
      if (response.success === false) {
        throw {
          title: response.message,
          message: response.details
        };
      }
      return response;
    });

export default fetchJSON;
