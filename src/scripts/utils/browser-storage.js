/**
 * Class responsible for providing access to browser's storage
 */
export default class BrowserStorage {
  /**
   * Constructor
   *
   * @param {string} prefix - used for all keys
   */
  constructor(prefix) {
    this.prefix = prefix;
  }

  /**
   * Generates the key
   *
   * @param {string} key
   */
  _key(key) {
    return `${this.prefix}-${key}`;
  }

  /**
   * Save an item
   *
   * @param {string} key
   * @param {object} value
   */
  setObj(key, value) {
    localStorage.setItem(this._key(key), JSON.stringify(value));
    return value;
  }

  /**
   * Get an item
   *
   * @param {string} key
   */
  getObj(key) {
    return JSON.parse(localStorage.getItem(this._key(key)));
  }

  /**
   * Remove an item
   *
   * @param {string} key
   */
  remove(key) {
    localStorage.removeItem(this._key(key));
  }
}
