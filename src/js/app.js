import { select, create } from './utils.js'

class Chess {
    constructor(){

    }

    renderIntroduction(){
        const APP = select('.app')
        const INTRO_DIV = create('div')
        const TITLE = create('h1')
        const INTRO_BUTTON = create('button')
        const board = new Board()
        
        TITLE.innerHTML = `CHESS`
        INTRO_BUTTON.innerHTML = `<p class="play">PLAY!</p>`
        
        INTRO_DIV.classList.add('introduction')
        TITLE.classList.add('intro-title')
        INTRO_BUTTON.classList.add('intro-button')

        INTRO_BUTTON.addEventListener('click', () => {
            INTRO_BUTTON.classList.add('expansion-1')
            INTRO_BUTTON.innerHTML = ''
            INTRO_BUTTON.style.cursor = 'default'

            setTimeout(()=>{
                TITLE.style.display = 'none'
            }, 2000)

            board.createChessBoard(INTRO_BUTTON)
        },{ once: true })

        APP.append(INTRO_DIV)
        INTRO_DIV.append(TITLE,INTRO_BUTTON)
    }
}

class Board {
    constructor(){
        this.default = {
            boardCells: 64,
            boardData: []
        }
    }

    createChessBoard(INTRO_BUTTON){
        const CONTAINER = create('div')
        CONTAINER.classList.add('container')
        const boardCells = this.default.boardCells

        for(let i = 0; i < boardCells; i++){
            var cell = create('div')
            cell.classList.add('cell')
            cell.id = i

            CONTAINER.append(cell)
        }

        const CELLS = Array.from(cell)

        CELLS.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if(cell.className.trim() == 'cell'){
                    console.log(index, 'hello')
                }
            })
        })

        setTimeout(() => {
            CONTAINER.style.display = 'flex'
            setTimeout(() => {
                CONTAINER.style.opacity = '1'
            },1000)
        }, 1000)

        INTRO_BUTTON.append(CONTAINER)
    }
}


const game = new Chess()

game.renderIntroduction()