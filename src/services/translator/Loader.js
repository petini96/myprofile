import { isArray } from "lodash";
import en from "../../assets/json/translations/en.json";
import pt from "../../assets/json/translations/pt.json";

class Loader {
  constructor() {
    this.loadTranslations()
  }

  //Loads all JSON translators
  async loadTranslations() {
    this.en = this.loadEnTranslations()
    this.pt = this.loadPtTranslations()
  }

  //Loads the English JSON translation 
  async loadEnTranslations() {
    return en;
  }

  //Loads the Portugues JSON translation
  async loadPtTranslations() {
    return pt;
  }
}
export default Loader;
