import { isArray } from "lodash";

class Translator {

  constructor(language, loader) {
    this.language = language;
    this.loader = loader;
  }
  //Loads all translations
  async loadTranslations() {
    let language = this.language
    return this.loader[language]
  }
  //Splits the undesrcore from key
  splitKey(key) {
    return key.split('_');
  }
  //Verifies if there's brackets, equals vector format
  hasBrackets(text) {
    const pattern = /\[\d+\]/;
    return pattern.test(text);
  }
  //Removes the brackets from text
  removeBrackets(text) {
    return text.replace(/\[\d+\]/g, '');
  }
  //Extracts the number from text
  extractNumberFromBrackets(text) {
    const pattern = /\[(\d+)\]/g;
    const numberFounds = [];
    let match;
    while ((match = pattern.exec(text)) !== null) {
      numberFounds.push(match[1]);
    }
    return numberFounds;
  }
  //Filters the string dotted to search the Item from JSON and get it.
  getItemFromJSON(jsonData, stringPath) {
    const keys = stringPath.split(".");
    let currentItem = jsonData;
    let keysearch = "";
    let keyIndex = 0;

    for (const key of keys) {
      keysearch = this.removeBrackets(key)
      if (!currentItem.hasOwnProperty(keysearch)) {
        return null;
      }
      if (this.hasBrackets(key)) {
        keyIndex = parseInt(this.extractNumberFromBrackets(key), 10)
        currentItem = currentItem[keysearch][keyIndex];
      } else {
        currentItem = currentItem[key];
      }
    }
    return currentItem;
  }

   /**
   * Return the translation matching value by key.
   * @param {string} key - The identifier from HTML element.
   * @param {number} translations - The translator JSON loaded.
   * @returns {string} - The value translated.
   */
  translate(key, translations) {
    let currentItem = translations;
    let keys = this.splitKey(key)
    let dataSearch = ""
    let index = 0;
    for (const pos of keys) {
      if (index === 0) {
        dataSearch = pos
      } else {
        dataSearch += "." + pos
      }
      index++
    }
    const item = this.getItemFromJSON(translations, dataSearch);
    return item
  }
  //Changes the actual language to another
  changeLanguage(language) {
    this.language = language;
  }
}
export default Translator;
