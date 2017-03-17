export default class Dictionary {

  static init(dictionary) {
    Dictionary.dictionary = dictionary;
  }

  /**
   * Get a string from the dictionary. Optionally replace variables
   * @param {string} key
   * @param {Object} replacements
   * @returns {string}
   */
  static get(key, replacements) {

    // var translation = Dictionary.dictionary[key];
    //
    // // Replace placeholder with variables.
    // for (var placeholder in replacements) {
    //   if (!replacements[placeholder]) {
    //     continue;
    //   }
    //   translation = translation.replace(placeholder, replacements[placeholder]);
    // }
    //
    // return translation;
  }
}
