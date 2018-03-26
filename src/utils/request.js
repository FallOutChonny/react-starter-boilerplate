export default (url, options) => {
  const fullUrl = url; // do your staff

  return fetch(fullUrl, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }

      return json;
    })
  );
};
