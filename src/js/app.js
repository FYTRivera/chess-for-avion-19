import { select, create } from './utils.js'


function introduction(){
    const APP = select('.app')
    const INTRO_DIV = create('div')
    const TITLE = create('h1')
    const INTRO_BUTTON = create('button')

    renderIntroduction(APP,INTRO_DIV, TITLE, INTRO_BUTTON)

    INTRO_BUTTON.addEventListener('click', () => {
        console.log('hello')
    })
}

const renderIntroduction = (APP,INTRO_DIV, TITLE, INTRO_BUTTON) => {
    INTRO_DIV.classList.add('introduction')
    TITLE.classList.add('intro-title')
    INTRO_BUTTON.classList.add('intro-button')

    TITLE.innerHTML = 'CHESS'
    INTRO_BUTTON.innerHTML = 'PLAY!'

    APP.append(INTRO_DIV)
    INTRO_DIV.append(TITLE,INTRO_BUTTON)
}

introduction()