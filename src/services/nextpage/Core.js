let upSvgElement = null;
let downSvgElement = null;

let currentIndex = 0;

const initialElement = document.getElementById('personal-info');
const mePhotoElement = document.getElementById('me-photo');
const skills1 = document.getElementById('skills-1');
const skills2 = document.getElementById('skills-2');
const aboutMe = document.getElementById('about-me');
let navegationControll = createNavegationControll();

let sections = [
    {
        order: 0,
        documentId: 'personal-info',
        element: initialElement,
    },
    {
        order: 1,
        documentId: 'me-photo',
        element: mePhotoElement,
    },
    {
        order: 2,
        documentId: 'about-me',
        element: skills1,
    },
    {
        order: 3,
        documentId: 'skills-1',
        element: skills2,
    },
    {
        order: 4,
        documentId: 'skills-2',
        element: aboutMe,
    },
];

async function loadSVG(svgPath) {
    const response = await fetch(svgPath);
    const upSvgText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(upSvgText, 'image/svg+xml');

    const upSvgElement = doc.documentElement;
    return upSvgElement;
}


function getCurrentElement() {
    return sections.find(section => section.order === currentIndex);
}

function clearNavegationControll() {
    let navegationControll = document.getElementById("navegation-controll");
    if (navegationControll) {
        navegationControll.remove();
    }
}

function createNavegationControll() {
    let navegationControll = document.createElement('div');
    navegationControll.classList.add("navegation-controll");
    return navegationControll;
}

function nextIndex(){
    currentIndex = currentIndex + 1;
}

function previousIndex(){
    currentIndex = currentIndex - 1;
}

async function moveToSection() {
    let pickedElement = getCurrentElement().element;
   
    pickedElement.scrollIntoView({ behavior: 'smooth' });
            
}

window.addEventListener('load', async function () {
    await loadSVG('/src/assets/icons/up.svg')
        .then(svgElement => {
            upSvgElement = svgElement;
        })

    await loadSVG('/src/assets/icons/down.svg').then(svgElement => {
        downSvgElement = svgElement;
    });
    document.body.appendChild(navegationControll);
    navegationControll.appendChild(upSvgElement);
    navegationControll.appendChild(downSvgElement);

    //clearNavegationControll();
    // await moveToSection('down');
    // await moveToSection('up');
    // const upBtn = document.getElementById('up-svg');
    // const downBtn = document.getElementById('down-svg');

    // const upBtn = this.document.createElement('')


    upSvgElement.addEventListener('click', async function () {
        //clearNavegationControll();
        previousIndex();
        await moveToSection('up');
    });
    downSvgElement.addEventListener('click', async function () {
        //clearNavegationControll();
        nextIndex();
        await moveToSection('down');
    });

});


// currentSection.element.scrollIntoView({ behavior: 'smooth' });
