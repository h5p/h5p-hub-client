/**
 * Class responsible for providing translations
 */
export default class Dictionary {

  /**
   * Initialize the dictionary
   *
   * @param {Object} dictionary - dictionary as key/value
   */
  static init(dictionary) {
    Dictionary.dictionary = dictionary;
  }

  /**
   * Get a string from the dictionary. Optionally replace variables
   *
   * @param {string} key
   * @param {Object} replacements
   * @returns {string}
   */
  static get(key, replacements) {
    let translation = Dictionary.dictionary[key];

    // Replace placeholder with variables.
    for (let placeholder in replacements) {
      if (!replacements[placeholder]) {
        continue;
      }
      translation = translation.replace(placeholder, replacements[placeholder]);
    }

    return translation;
  }
}
