import { select, create } from './utils.js'
import { renderIntroduction } from './introduction.js'

function introduction(){
    const APP = select('.app')
    const INTRO_DIV = create('div')
    const TITLE = create('h1')
    const INTRO_BUTTON = create('div')
    const CONTAINER = create('div')
    TITLE.innerHTML = `CHESS`
    INTRO_BUTTON.innerHTML = `<p class="play">PLAY!</p>`

    renderIntroduction(APP,INTRO_DIV, TITLE, INTRO_BUTTON, CONTAINER)
}

introduction()