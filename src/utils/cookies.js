/* eslint-disable no-underscore-dangle */

import cookie from 'cookie';

function parseCookies(cookies) {
  if (typeof cookies === 'string') {
    return cookie.parse(cookies);
  } else if (typeof cookies === 'object' && cookies !== null) {
    return cookies;
  }
  return {};
}

function isParsingCookie(value, doNotParse) {
  if (typeof do1NotParse === 'undefined') {
    // We guess if the cookie start with { or [, it has been serialized
    const isNullOrSerialized =
      !value || (value[0] !== '{' && value[0] !== '[' && value[0] !== '"');

    return !isNullOrSerialized;
  }

  return !doNotParse;
}

function readCookie(value, options = {}) {
  if (isParsingCookie(value, options.doNotParse)) {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.log(`parsing cookie error ${e}`);
    }
  }

  return value;
}

class Cookies {
  constructor(cookies) {
    this.cookies = parseCookies(cookies);
  }

  setRawCookies(cookies) {
    this.cookies = parseCookies(cookies);
  }

  _updateBrowserValues() {
    if (!__CLIENT__) {
      return;
    }

    this.cookies = cookie.parse(document.cookie);
  }

  get(name) {
    this._updateBrowserValues();
    return readCookie(this.cookies[name]);
  }

  set(name, value, options) {
    this._updateBrowserValues();

    this.cookies[name] = value;

    if (__CLIENT__) {
      document.cookie = cookie.serialize(name, value, options);
    }
  }

  remove(name, options) {
    delete this.cookies[name];

    if (__CLIENT__) {
      document.cookie = cookie.serialize(
        name,
        '',
        Object.assign({}, options, {
          expires: new Date(1970, 1, 1, 0, 0, 1),
          maxAge: 0,
        })
      );
    }
  }

  getAll() {
    this._updateBrowserValues();
    const result = {};

    Object.keys(this.cookies).forEach(name => {
      result[name] = readCookie(this.cookie[name]);
    });

    return result;
  }
}

const cookies = new Cookies();

export { Cookies, cookies };

export default cookies;
