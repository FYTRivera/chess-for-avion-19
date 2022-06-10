import { select, create } from './utils.js'

const initialGame = {
    '1': 'black_rook',
    '2': 'black_knight',
    '3': 'black_bishop',
    '4': 'black_queen',
    '5': 'black_king',
    '6': 'black_bishop',
    '7': 'black_knight',
    '8': 'black_rook',
    '9': 'black_pawn',
    '10': 'black_pawn',
    '11': 'black_pawn',
    '12': 'black_pawn',
    '13': 'black_pawn',
    '14': 'black_pawn',
    '15': 'black_pawn',
    '16': 'black_pawn',
    
    '64': 'white_rook',
    '63': 'white_knight',
    '62': 'white_bishop',
    '61': 'white_queen',
    '60': 'white_king',
    '59': 'white_bishop',
    '58': 'white_knight',
    '57': 'white_rook',
    '56': 'white_pawn',
    '55': 'white_pawn',
    '54': 'white_pawn',
    '53': 'white_pawn',
    '52': 'white_pawn',
    '51': 'white_pawn',
    '50': 'white_pawn',
    '49': 'white_pawn',
}

const piecesImages = {
    'white_pawn': './media/pieces/white_pawn.png',
    'white_rook': './media/pieces/white_rook.png',
    'white_knight': './media/pieces/white_knight.png',
    'white_bishop': './media/pieces/white_bishop.png',
    'white_king': './media/pieces/white_king.png',
    'white_queen': './media/pieces/white_queen.png',
    'black_pawn': './media/pieces/black_pawn.png',
    'black_rook': './media/pieces/black_rook.png',
    'black_knight': './media/pieces/black_knight.png',
    'black_bishop': './media/pieces/black_bishop.png',
    'black_king': './media/pieces/black_king.png',
    'black_queen': './media/pieces/black_queen.png',
}

class Chess {
    constructor(){
        this.initialGame = {
            '1': 'black_rook',
            '2': 'black_knight',
            '3': 'black_bishop',
            '4': 'black_queen',
            '5': 'black_king',
            '6': 'black_bishop',
            '7': 'black_knight',
            '8': 'black_rook',
            '9': 'black_pawn',
            '10': 'black_pawn',
            '11': 'black_pawn',
            '12': 'black_pawn',
            '13': 'black_pawn',
            '14': 'black_pawn',
            '15': 'black_pawn',
            '16': 'black_pawn',
            
            '64': 'white_rook',
            '63': 'white_knight',
            '62': 'white_bishop',
            '61': 'white_queen',
            '60': 'white_king',
            '59': 'white_bishop',
            '58': 'white_knight',
            '57': 'white_rook',
            '56': 'white_pawn',
            '55': 'white_pawn',
            '54': 'white_pawn',
            '53': 'white_pawn',
            '52': 'white_pawn',
            '51': 'white_pawn',
            '50': 'white_pawn',
            '49': 'white_pawn',
        }

        this.piecesImages = {
            'white_pawn': './media/pieces/white_pawn.png',
            'white_rook': './media/pieces/white_rook.png',
            'white_knight': './media/pieces/white_knight.png',
            'white_bishop': './media/pieces/white_bishop.png',
            'white_king': './media/pieces/white_king.png',
            'white_queen': './media/pieces/white_queen.png',
            'black_pawn': './media/pieces/black_pawn.png',
            'black_rook': './media/pieces/black_rook.png',
            'black_knight': './media/pieces/black_knight.png',
            'black_bishop': './media/pieces/black_bishop.png',
            'black_king': './media/pieces/black_king.png',
            'black_queen': './media/pieces/black_queen.png',
        }
    }

    placePiecesInPosition(initialGame){
        for ( const piecePosition in initialGame ) {
            console.log(piecePosition)
            const pieceType = this.initialGame[ piecePosition ]
            const pieceImageLocation = this.piecesImages[ pieceType ]
    
            const imgElement = create( 'img' )
            imgElement.classList.add( 'piece' )
            imgElement.setAttribute( 'piece-type', pieceType )
            imgElement.src = `${ pieceImageLocation }`
            console.log(pieceImageLocation)
    
            document.getElementById( `${ piecePosition }` ).append( imgElement )
        }
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
            const cellSound = new Audio('../.././public/media/assets/audio/cell.wav')
            
            setTimeout(() => {  
                cellSound.load()
                cellSound.loop = true
                cellSound.playbackRate = 8.4
                cellSound.volume = 1
                cellSound.play()

                setTimeout(() => {
                    cellSound.pause()
                },1500)
            },3000)

            setTimeout(()=>{
                TITLE.style.display = 'none'
            }, 2000)

            board.createChessBoard(INTRO_BUTTON)
        },{ once: true })

        APP.append(INTRO_DIV)
        INTRO_DIV.append(TITLE,INTRO_BUTTON)

        placePiecesInPosition(initialGame);
    }
}

class Board {
    constructor(){
        this.default = {
            boardCells: 64,
            // boardData: []
        }

        this.currentPlayer = ''
        this.player1Name = ''
        this.player2Name = ''
        this.player1Color = ''
        this.player2Color = ''
    }

    createChessBoard(INTRO_BUTTON){
        const CONTAINER = create('div')
        CONTAINER.classList.add('container')
        const boardCells = this.default.boardCells

        for(let i = 0; i < boardCells; i++){
            var cell = create('div')
            cell.classList.add('cell')
            cell.id = i+1

            CONTAINER.append(cell)
        }

        // const CELLS = Array.from(cell)

        // CELLS.forEach((cell, index) => {
        //     cell.addEventListener('click', () => {
        //         if(cell.className.trim() == 'cell'){
        //             console.log(index, 'hello')
        //         }
        //     })
        // })

        setTimeout(() => {
            CONTAINER.style.display = 'flex'
            setTimeout(() => {
                CONTAINER.style.opacity = '1'
            },1000)
        }, 1000)

        INTRO_BUTTON.append(CONTAINER)

        this.renderArm(INTRO_BUTTON)

        let test = new Chess()
        test.placePiecesInPosition(test.initialGame)
    }

    renderArm(INTRO_BUTTON){
        const arm = create('div')
        const armJoint = create('div')
        const shoulder1 = create('div')
        const shoulder2 = create('div')
        const shoulder3 = create('div')
        const screen1 = create('div')
        const screen2 = create('div')
        const h1P1Name = create('h1')
        const h1P2Name = create('h1')
        const inputP1Name = create('input')
        const inputP2Name = create('input')
        const p1Select = create('h1')
        const p2Select = create('h1')
        const p1WB = create('div')
        const p2WB = create('div')
        const p1WhiteButton = create('button')
        const p1BlackButton = create('button')
        const p2WhiteButton = create('div')
        const p2BlackButton = create('div')
        const startGame = create('button')

        h1P1Name.innerHTML = `Player 1 Name:`
        h1P2Name.innerHTML = `Player 2 Name:`
        p1Select.innerHTML = `Select Color`
        p2Select.innerHTML = `Auto-Selected Color`
        p1WhiteButton.innerHTML = `<i class="fa-regular fa-chess-queen"></i>`
        p1BlackButton.innerHTML = `<i class="fa-solid fa-chess-queen"></i>`
        p2WhiteButton.innerHTML = `<i class="fa-regular fa-chess-queen"></i>`
        p2BlackButton.innerHTML = `<i class="fa-solid fa-chess-queen"></i>`
        startGame.innerHTML = `Start Game`
        
        inputP1Name.setAttribute('autocomplete', 'off')
        inputP1Name.setAttribute('type', 'text')
        inputP1Name.setAttribute('spellcheck', 'false')
        inputP2Name.setAttribute('autocomplete', 'off')
        inputP2Name.setAttribute('type', 'text')
        inputP2Name.setAttribute('spellcheck', 'false')

        arm.classList.add('arm')
        armJoint.classList.add('arm-joint')
        shoulder1.classList.add('shoulder1')
        shoulder2.classList.add('shoulder2')
        shoulder3.classList.add('shoulder3')
        screen1.classList.add('screen-1')
        screen2.classList.add('screen-2')
        h1P1Name.classList.add('h1-name1')
        h1P2Name.classList.add('h1-name2')
        inputP1Name.classList.add('input-name1')
        inputP2Name.classList.add('input-name2')
        p1Select.classList.add('p1-select')
        p2Select.classList.add('p2-select')
        p1WB.classList.add('p1-WB')
        p2WB.classList.add('p2-WB')
        p1WhiteButton.classList.add('p1-Wbutton')
        p1BlackButton.classList.add('p1-Bbutton')
        p2WhiteButton.classList.add('p2-Wbutton')
        p2BlackButton.classList.add('p2-Bbutton')
        startGame.classList.add('start-game')

        setTimeout(()=> {
            armJoint.style.display = 'flex'
        },3500)

        p1WhiteButton.addEventListener('click', () => {
            if(inputP1Name.value === ''){
                return inputP1Name.select()
            } else {
                screen1.style.display = 'none'
                screen2.style.display = 'flex'
                this.player1Name = inputP1Name.value
                this.currentPlayer = 'white'
                this.player1Color = 'white'
                p2WhiteButton.style.display = 'none'
                console.log(this.currentPlayer)
                console.log(this.player1Name)
            }
        })

        p1BlackButton.addEventListener('click', () => {
            if(inputP1Name.value === ''){
                return inputP1Name.select()
            } else {
                screen1.style.display = 'none'
                screen2.style.display = 'flex'
                this.player1Name = inputP1Name.value
                this.currentPlayer = 'black'
                this.player1Color = 'black'
                p2BlackButton.style.display = 'none'
                console.log(this.currentPlayer)
                console.log(this.player1Name)
            }
        })

        INTRO_BUTTON.append(arm)
        arm.append(armJoint)
        armJoint.append(shoulder1)
        shoulder1.append(shoulder2)
        shoulder2.append(shoulder3) 
        shoulder3.append(screen1,screen2)
        screen1.append(h1P1Name,inputP1Name,p1Select,p1WB)
        screen2.append(h1P2Name,inputP2Name,p2Select,p2WB,startGame)
        p1WB.append(p1WhiteButton,p1BlackButton)
        p2WB.append(p2WhiteButton,p2BlackButton)

    
        startGame.addEventListener('click', () => {
            if(inputP2Name.value === ''){
                return inputP2Name.select()
            } else {
                this.player2Name = inputP2Name.value
                shoulder3.style = `animation: height3reverse 0.5s ease-in-out 0s 1 reverse backwards,idle3 1s ease-in-out infinite alternate;`
                shoulder2.style = `animation: height2reverse 0.5s ease-in-out 0.5s 1 reverse backwards,idle2 1s ease-in-out infinite alternate`
                shoulder1.style = `animation: height1reverse 0.5s ease-in-out 1s 1 reverse backwards,idle1 1s ease-in-out infinite alternate`
                armJoint.style = `animation: growJointreverse 0.5s ease-in-out 1.5s 1 reverse backwards;`
                arm.style = `animation: growArmreverse 0.5s ease-in-out 2s 1 reverse backwards;`
                screen2.style = `animation: height3reverse 0.5s ease-in-out 0s 1 reverse backwards,idle3 1s ease-in-out infinite alternate;`
            }
        })
    }
}



function placePiecesInPosition(initialGame){
    for ( const piecePosition in initialGame ) {
        console.log(piecePosition)
        const pieceType = initialGame[ piecePosition ]
        const pieceImageLocation = piecesImages[ pieceType ]

        const imgElement = document.createElement( 'img' )
        imgElement.classList.add( 'piece' )
        imgElement.setAttribute( 'piece-type', pieceType )
        imgElement.src = `${ pieceImageLocation }`
        console.log(pieceImageLocation)

        document.getElementById( `${ piecePosition }` ).append( imgElement )
    }
}



const game = new Chess()

game.renderIntroduction()

