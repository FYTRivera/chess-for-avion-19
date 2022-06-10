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
            '61': 'white_king',
            '60': 'white_queen',
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
            // console.log(piecePosition)
            const pieceType = this.initialGame[ piecePosition ]
            const pieceImageLocation = this.piecesImages[ pieceType ]
    
            const imgElement = create( 'img' )
            imgElement.classList.add( 'piece' )
            imgElement.setAttribute( 'piece-type', pieceType )
            imgElement.src = `${ pieceImageLocation }`
            // console.log(pieceImageLocation)
    
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
            const cellSound = new Audio('../.././public/assets/cell.wav')
            
            setTimeout(() => {  
                cellSound.load()
                cellSound.loop = true
                cellSound.playbackRate = 8.4
                // cellSound.volume = 0
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

        // placePiecesInPosition(initialGame);
    }
}

class Board {
    constructor(){
        this.default = {
            boardCells: 64,
            // boardData: []
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
        addCellListeners()
    }

    renderArm(INTRO_BUTTON){
        const arm = create('div')
        const armJoint = create('div')
        const shoulder1 = create('div')
        const shoulder2 = create('div')
        const shoulder3 = create('div')
        const screen = create('div')
        const h1P1Name = create('h1')
        const inputP1Name = create('input')
        const p1Select = create('h1')
        const p1WB = create('div')
        const p1WhiteButton = create('button')
        const p1BlackButton = create('button')

        h1P1Name.innerHTML = `Player 1 Name:`
        p1Select.innerHTML = `Select Color`
        p1WhiteButton.innerHTML = `<i class="fa-regular fa-chess-queen"></i>`
        p1BlackButton.innerHTML = `<i class="fa-solid fa-chess-queen"></i>`

        inputP1Name.setAttribute('autocomplete', 'off')

        arm.classList.add('arm')
        armJoint.classList.add('arm-joint')
        shoulder1.classList.add('shoulder1')
        shoulder2.classList.add('shoulder2')
        shoulder3.classList.add('shoulder3')
        screen.classList.add('screen')
        h1P1Name.classList.add('h1-name')
        inputP1Name.classList.add('input-name')
        p1Select.classList.add('p1-select')
        p1WB.classList.add('p1-WB')
        p1WhiteButton.classList.add('p1-Wbutton')
        p1BlackButton.classList.add('p1-Bbutton')

        setTimeout(()=> {
            armJoint.style.display = 'flex'
        },3500)

        p1WhiteButton.addEventListener('click', () => {
            shoulder3.style = `animation-direction: alternate-reverse;`
            shoulder2.style = `animation-direction: alternate-reverse;`
            shoulder1.style = `animation-direction: alternate-reverse;`
            armJoint.style = `animation-direction: alternate-reverse;`
        })

        p1BlackButton.addEventListener('click', () => {
            shoulder3.style = `animation-direction: reverse;`
            shoulder2.style = `animation-direction: reverse;`
            shoulder1.style = `animation-direction: reverse;`
            armJoint.style = `animation-direction: reverse;`
        })

        INTRO_BUTTON.append(arm)
        arm.append(armJoint)
        armJoint.append(shoulder1)
        shoulder1.append(shoulder2)
        shoulder2.append(shoulder3) 
        shoulder3.append(screen)
        screen.append(h1P1Name,inputP1Name,p1Select,p1WB)
        p1WB.append(p1WhiteButton,p1BlackButton)
    }
}

// function placePiecesInPosition(initialGame){
//     for ( const piecePosition in initialGame ) {
//         // console.log(piecePosition)
//         const pieceType = initialGame[ piecePosition ]
//         const pieceImageLocation = piecesImages[ pieceType ]

//         const imgElement = document.createElement( 'img' )
//         imgElement.classList.add( 'piece' )
//         imgElement.setAttribute( 'piece-type', pieceType )
//         imgElement.src = `${ pieceImageLocation }`
//         // console.log(pieceImageLocation)

//         document.getElementById( `${ piecePosition }` ).append( imgElement )
//     }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////



function addCellListeners() {
    


    document.querySelectorAll(`.cell`).forEach( pieceBoxElement => {
        const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )
        const pieceElement = pieceBoxElement.querySelector(`.piece`)
        const pieceType = pieceElement?.getAttribute( 'piece-type' ) ?? null

        const handleParams = {
            pieceBoxElement,
            pieceBoxPosition,
            pieceElement,
            pieceType
        }

        // console.log(handleParams)
        // piecesEventListeners[ pieceBoxPosition ] = {
        //     'mouseenter': _ => {
        //         piecesHandle.handlePieceMouseenter( handleParams )
        //     },
        //     'mouseleave': _ => {
        //         piecesHandle.handlePieceMouseleave( handleParams )
        //     },
        //     'click': _ => {
        //         piecesHandle.handlePieceClick( handleParams )
        //     },
        // }

        // pieceBoxElement.addEventListener( 'mouseenter', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseenter' ])
        // pieceBoxElement.addEventListener( 'mouseleave', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseleave' ])
        // pieceBoxElement.addEventListener( 'click', this.piecesEventListeners[ pieceBoxPosition ][ 'click' ])

        //pieceBoxElement.addEventListener('click', handlePieceClick(handleParams))
        pieceBoxElement.addEventListener("click", function (){
            handlePieceClick(handleParams, pieceElement, pieceBoxElement);
        });
        pieceBoxElement.addEventListener("click", function (){
            handleMove(handleParams, pieceElement, pieceBoxElement);
        });
    })
}

let pieceArray = []

function handlePieceClick(handleParams, pieceElement, pieceBoxElement){
    if(handleParams.pieceType!=null){
        console.log(handleParams)
        console.log(handleParams.pieceType)
        
        // pieceElement.remove();
        const pieceBoxElementSelected = document.getElementById( `${handleParams.pieceBoxPosition }` )
        const pieceElementSelected = pieceBoxElementSelected.querySelector(`.piece`)
        // console.log( pieceElementSelected)
        // console.log(pieceBoxElement)
        if (pieceElementSelected!=undefined){
            pieceArray.push(pieceElementSelected)
        }
        
        

        console.log(pieceArray)
    }
    else{
       
    }
    
}

function handleMove(handleParams, pieceElement, pieceBoxElement){
    if(handleParams.pieceType!=null){
        
    }
    else{
        if (pieceArray[0]!=undefined){
            pieceBoxElement.append(pieceArray[0])
        }
        if (pieceArray[0]!=undefined){
            pieceArray.pop()
            
        }  
    } 
    
}

const game = new Chess()

game.renderIntroduction()

