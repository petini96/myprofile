import Loader from './Loader.js';
import Translator from './Translator.js';

/*
Init all process when DOM is loaded. It define the Loader class who loads the JSON from
respective language just one time and then instanciate the Translator. 
The translator catch the initial language and load the first translation.
*/
window.addEventListener('load', function () {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'none';

    const initialElements = document.querySelectorAll('.initial');
    initialElements.forEach(element => {
      element.style.display = 'block';
    });
});


document.addEventListener('DOMContentLoaded', async function () {


    const imageContext = require.context('../../assets', true, /\.(png|svg|jpg|jpeg|gif|json)$/);

    let loader = new Loader
    const languageSelector = document.getElementById('languageSelector');
    let selectedLanguage = languageSelector.value;

    const translator = new Translator(selectedLanguage, loader);
    let translations = await translator.loadTranslations();

    languageSelector.addEventListener('change', async function () {
        translator.changeLanguage(languageSelector.value)
        translations = await translator.loadTranslations();
        translateContent(translations);
    });

    //Finds all translate class and get the translation value for each element.
    function translateContent(translations) {
        document.querySelectorAll('.translate').forEach(element => {
            const key = element.dataset.translate;

            if (element.tagName === 'IMG') {
                const fileToRequire = translator.translate(key, translations);
                try {
                    const imagePath = imageContext(`./${fileToRequire}`);
                    element.setAttribute('src', imagePath);
                } catch (error) {
                    console.error('Erro ao carregar a imagem:', error);
                }
            } else {

                element.textContent = translator.translate(key, translations);
            }
        });
    }

    translateContent(translations);
});
