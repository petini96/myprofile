import { isArray } from "lodash";
import en from "../../assets/json/translations/en.json";
import pt from "../../assets/json/translations/pt.json";
import sp from "../../assets/json/translations/sp.json";
import al from "../../assets/json/translations/al.json";

class Loader {
  constructor() {
    this.loadTranslations()
  }

  //Loads all JSON translators
  async loadTranslations() {
    this.en = this.loadEnTranslations()
    this.pt = this.loadPtTranslations()
    this.sp = this.loadSpTranslations()
    this.al = this.loadAlTranslations()
  }

  //Loads the English JSON translation 
  async loadEnTranslations() {
    return en;
  }

  //Loads the Portugues JSON translation
  async loadPtTranslations() {
    return pt;
  }
  
  async loadSpTranslations() {
    return sp;
  }
  
  async loadAlTranslations() {
    return al;
  }
}
export default Loader;
