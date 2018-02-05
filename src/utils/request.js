import request from 'superagent';

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.body;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function callApi(method, url, options) {
  const { params, accept } = options;
  return request[method](url)
    .query(params)
    .set('Accept', accept || 'json')
    .then(checkStatus)
    .then(parseJSON);
}

export default {
  post: (url, options = {}) => callApi('POST', url, options),
  get: (url, options = {}) => callApi('GET', url, options),
  put: (url, options = {}) => callApi('PUT', url, options),
  delete: (url, options = {}) => callApi('DELETE', url, options),
};
