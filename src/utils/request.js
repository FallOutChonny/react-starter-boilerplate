import request from 'superagent';

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.body;
}

// function parseText(response) {
//   if (response.status === 204 || response.status === 205) {
//     return null;
//   }
//   return response.text;
// }

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export const get = (url, options = {}) => {
  const { params, accept } = options;
  return request
    .get(url)
    .query(params)
    .set('Accept', accept || 'json')
    .then(checkStatus)
    .then(parseJSON);
};

export const post = (url, options = {}) => {
  const { params, accept } = options;
  return request
    .post(url)
    .send(params)
    .set('Accept', accept || 'json')
    .then(checkStatus)
    .then(parseJSON);
};

export default {
  post,
  get,
};
