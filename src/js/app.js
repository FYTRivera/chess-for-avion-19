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

        placePiecesInPosition(initialGame);
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
            cell.id = i+1

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

