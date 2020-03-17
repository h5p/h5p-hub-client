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
   * @param {Object} [replacements]
   *
   * @returns {string}
   */
  static get(key, replacements) {
    let translation = Dictionary.dictionary[key];

    if (translation === undefined) {
      return `Key not found in dictionary: ${key}`;
    }

    if (replacements) {
      translation = Dictionary.replace(translation, replacements);
    }
    
    return translation;
  }

  /**
   * Replace variables in translation strings
   * 
   * @param {string} translation 
   * @param {Object} replacements 
   */
  static replace(translation, replacements) {
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
