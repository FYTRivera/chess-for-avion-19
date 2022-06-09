import { select, create } from './utils.js'

class Chess {
    constructor(){
		this.setDefault();
    }

    setDefault() {
		this.info = {
			preview: false, // when previewing match history
			started: false, // when the started
			ended: false, // when the game is ended
			won: null, // Winning player
			turn: null, // Player turn
			timer: 5, // Five minutes Timer
		};

		this.data = {
			// players: [],
			// matchHistory: [],
			// board: null,
		};
	}

    renderIntroduction(){
        const APP = select('.app')
        const INTRO_DIV = create('div')
        const TITLE = create('h1')
        const INTRO_BUTTON = create('button')
        const board = new Board()
        
        TITLE.innerHTML = `CHESS`
        INTRO_BUTTON.innerHTML = `PLAY!`
        
        INTRO_DIV.classList.add('introduction')
        TITLE.classList.add('intro-title')
        INTRO_BUTTON.classList.add('intro-button')

        INTRO_BUTTON.addEventListener('click', () => {
            INTRO_BUTTON.classList.add('expansion-1')
            INTRO_BUTTON.innerHTML = ''
            INTRO_BUTTON.style.cursor = 'default'
            const cellSound = new Audio('../.././public/assets/cell.wav')
            
            setTimeout(() => {  
                cellSound.load()
                cellSound.loop = true
                cellSound.playbackRate = 8.4
                // cellSound.volume = 0
                cellSound.play()

                setTimeout(() => {
                    cellSound.pause()
                },2100)
            },3000)

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

        this.renderArm(INTRO_BUTTON)
    }

    renderArm(INTRO_BUTTON){
        const armJoint = create('div')
        const shoulder = create('div')
        armJoint.classList.add('arm')
        shoulder.classList.add('shoulder')

        setTimeout(()=> {
            armJoint.style.display = 'flex'
        },2000)

        INTRO_BUTTON.append(armJoint)
        armJoint.append(shoulder)
    }
}

const game = new Chess()

game.renderIntroduction()