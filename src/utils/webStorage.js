function executeCallback(promise, callback) {
  if (callback) {
    promise.then(
      result => {
        callback(null, result);
      },
      error => {
        callback(error);
      }
    );
  }
}

function normalizeKey(key) {
  // Cast the key to a string, as that's all we can set as a key.
  if (typeof key !== 'string') {
    console.warn(`${key} used as a key, but it is not a string.`);
    return String(key);
  }

  return key;
}

/* eslint-disable consistent-return */
function getIDB() {
  /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
  try {
    if (typeof indexedDB !== 'undefined') {
      return indexedDB;
    }
    if (typeof webkitIndexedDB !== 'undefined') {
      return webkitIndexedDB;
    }
    if (typeof mozIndexedDB !== 'undefined') {
      return mozIndexedDB;
    }
    if (typeof OIndexedDB !== 'undefined') {
      return OIndexedDB;
    }
    if (typeof msIndexedDB !== 'undefined') {
      return msIndexedDB;
    }
  } catch (err) {
    throw new Error(err);
  }
  return null;
}

const idb = getIDB();
const dbName = 'reactstarter';
const dbVersion = 1;
const storeName = 'keyvaluepairs';

/**
 * Create a indexeddb connection.
 * @returns A `Promise` object.
 */
function openIdbConnection() {
  return new Promise((reslove, reject) => {
    const req = idb.open(dbName, dbVersion);
    let db;

    req.onupgradeneeded = () => {
      db = req.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    req.onsuccess = () => {
      db = req.result;
      reslove(db);
    };

    req.onerror = error => {
      reject(error);
    };
  });
}

const idbDriver = {
  /**
   * Fetches an item for a `key` and invokes a callback upon completion.
   * Returns a `Promise` object.
   * @param {string} key - Key of the item to fetch.
   * @param {function} callback - Function that will be called with a result if found or
   *    any error.
   * @returns A `Promise` object.
   */
  getItem: (key, callback) => {
    const promise = new Promise((resolve, reject) => {
      openIdbConnection()
        .then(db => {
          const transaction = db.transaction([storeName], 'readonly');
          const store = transaction.objectStore(storeName);
          const req = store.get(normalizeKey(key));

          req.onsuccess = () => {
            let value = req.result;

            if (value === undefined) {
              value = null;
            }
            resolve(value);
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },
  /**
   * Sets the value for a `key` and invokes a callback upon completion.
   * Returns a `Promise` object.
   * @param {string} key - Key of the item to set.
   * @param {any} value - Value to set for the `key`.
   * @param {function} callback - Function that will be called with any error.
   * @returns A `Promise` object.
   */
  setItem: (key, value, callback) => {
    const promise = new Promise((resolve, reject) => {
      openIdbConnection()
        .then(db => {
          const transaction = db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const req = store.put(value, normalizeKey(key));

          req.onsuccess = () => {
            resolve();
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },
  /**
   * Removes an item for a `key` and invokes a callback upon completion.
   * Returns a `Promise` object.
   * @param {string} key - Key of the item to remove.
   * @param {function} callback - Function that will be called with any error.
   * @returns A `Promise` object.
   */
  removeItem: (key, callback) => {
    const promise = new Promise((resolve, reject) => {
      openIdbConnection()
        .then(db => {
          const transaction = db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const req = store.delete(normalizeKey(key));

          req.onsuccess = () => {
            resolve();
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },
  /**
   * Erases *all* `AsyncStorage` for all clients, libraries, etc.  You probably
   * don't want to call this; use `removeItem` or `multiRemove` to clear only
   * your app's keys. Returns a `Promise` object.
   * @param {function} callback - Function that will be called with any error.
   * @returns A `Promise` object.
   */
  clear: callback => {
    const promise = new Promise((resolve, reject) => {
      openIdbConnection()
        .then(db => {
          const transaction = db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const req = store.clear();

          req.onsuccess = () => {
            resolve();
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },
  /**
   * Gets item counts.
   * Returns a `Promise` object.
   * @param {function} callback - Function that will be called the keys found and any error.
   * @returns A `Promise` object.
   */
  length: callback => {
    const promise = new Promise((resolve, reject) => {
      openIdbConnection()
        .then(db => {
          const transaction = db.transaction([storeName], 'readonly');
          const store = transaction.objectStore(storeName);
          const req = store.count();

          req.onsuccess = () => {
            resolve(req.result);
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },
  /**
   * Gets *all* keys known to your app; for all callers, libraries, etc.
   * Returns a `Promise` object.
   * @param {function} callback - Function that will be called the keys found and any error.
   * @returns A `Promise` object.
   *
   * Example: see the `multiGet` example.
   */
  getAllKeys: callback => {
    const promise = new Promise((resolve, reject) => {
      openIdbConnection()
        .then(db => {
          const transaction = db.transaction([storeName], 'readonly');
          const store = transaction.objectStore(storeName);
          const req = store.openCursor();
          let storedKeys = []; // eslint-disable-line

          req.onsuccess = () => {
            const cursor = req.result;

            if (!cursor) {
              resolve(storedKeys);
              return;
            }

            storedKeys.push(cursor.key);
            cursor.continue();
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },
};

const localStorageDriver = {
  getItem: (key, callback) => {
    try {
      const result = localStorage.getItem(normalizeKey(key));

      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      if (callback) {
        callback(callback);
      }
    }
  },

  setItem: (key, value, callback) => {
    try {
      localStorage.setItem(normalizeKey(key), value);

      if (callback) {
        callback(null, value);
      }
    } catch (error) {
      if (callback) {
        callback(callback);
      }
    }
  },

  removeItem: (key, callback) => {
    try {
      localStorage.removeItem(normalizeKey(key));

      if (callback) {
        callback();
      }
    } catch (error) {
      if (callback) {
        callback(error);
      }
    }
  },

  clear: callback => {
    try {
      for (let i = localStorage.length - 1; i >= 0; i -= 1) {
        const key = localStorage.key(i);
        localStorage.removeItem(key);
      }

      if (callback) {
        callback();
      }
    } catch (error) {
      if (callback) {
        callback(error);
      }
    }
  },

  length: callback => {
    try {
      const { length } = localStorage;
      if (callback) {
        callback(null, length);
      }
      return length;
    } catch (error) {
      if (callback) {
        callback(error);
      }
    }
  },

  getAllKeys: callback => {
    try {
      const keys = [];
      for (let i = localStorage.length - 1; i >= 0; i -= 1) {
        keys.push(localStorage.key(i));
      }

      if (callback) {
        callback(null, keys);
      }
      return keys;
    } catch (error) {
      if (callback) {
        callback(error);
      }
    }
  },
};

// If yout want, you can create another driver like WebSQL, sessionStorage
const drivers = [idbDriver, localStorageDriver];

class WebStorage {
  constructor() {
    this.driver = drivers.slice();
  }

  setDriver(driver) {
    this.driver = driver;
  }

  driver = () => this.driver;
  getItem = (key, callback) => this.driver.getItem(key, callback);
  setItem = (key, val, callback) => this.driver.setItem(key, val, callback);
  removeItem = (key, callback) => this.driver.removeItem(key, callback);
  clear = callback => this.driver.clear(callback);
  length = callback => this.driver.length(callback);
  getAllKeys = callback => this.driver.getAllKeys(callback);
}

export default new WebStorage();
