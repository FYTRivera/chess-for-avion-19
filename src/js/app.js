import { select, create, selectAll } from './utils.js'

let currentTurn = 'whiteTurn'

class Chess {
    constructor(){
        this.historyBoard = []
        this.holdingArray = []
        this.clickMove = false
        this.clickDisplay = false
        this.render = false
        this.currentPlayer = ''
        this.player1Name = ''
        this.player2Name = ''
        this.player1Color = ''
        this.player2Color = ''

        //2D CHESSBOARD ARRAY
        this.boardState = [
            ['b_rook','b_knight','b_bishop','b_queen','b_king','b_bishop','b_knight','b_rook'],
            ['b_pawn','b_pawn','b_pawn','b_pawn','b_pawn','b_pawn','b_pawn','b_pawn'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['w_pawn','w_pawn','w_pawn','w_pawn','w_pawn','w_pawn','w_pawn','w_pawn'],
            ['w_rook','w_knight','w_bishop','w_queen','w_king','w_bishop','w_knight','w_rook']
        ]

        //IMAGES PER PIECE
        this.piecesImages = {
            'w_pawn': './media/pieces/white_pawn.png',
            'w_rook': './media/pieces/white_rook.png',
            'w_knight': './media/pieces/white_knight.png',
            'w_bishop': './media/pieces/white_bishop.png',
            'w_king': './media/pieces/white_king.png',
            'w_queen': './media/pieces/white_queen.png',
            'b_pawn': './media/pieces/black_pawn.png',
            'b_rook': './media/pieces/black_rook.png',
            'b_knight': './media/pieces/black_knight.png',
            'b_bishop': './media/pieces/black_bishop.png',
            'b_king': './media/pieces/black_king.png',
            'b_queen': './media/pieces/black_queen.png',
        }
    }

    gameStart(){
        const game = new Board()

        game.renderIntroduction()
    }

    clickCellMove(){
        let board = new Board()
        let hold = this.holdingArray
        // const cell = selectAll('.cell')
        // const cells = Array.from(cell)

        // cell.forEach((cell,index) => {
        //     const col = index % 8
        //     const row = (index - col) / 8
        //     let currentPiece = this.boardState[row][col]

        //     cell.addEventListener('click', () => {
        //         if(cell.hasChildNodes() &&  hold.length === 0){
        //                 hold.push(currentPiece)
        //                 cell.firstChild.style.opacity = '0.2'
        //                 // cell.removeChild(cell.firstChild)
        //                 this.boardState[row][col] = ''
        //         }else if(!cell.hasChildNodes()){
        //             console.log('not ok')
        //         }

        //         this.clickDisplayMove()
        //         return
        //     })
        // })
    // }
        // const piece = selectAll('.piece')
        const cell = selectAll('.cell')
        const moveAudio = new Audio('./media/assets/audio/move.wav')
            moveAudio.volume = 0.005
            moveAudio.playbackRate = 5

        // piece.forEach((piece,index) => {
        //     piece.classList.remove('add-animation-piece')

        //     piece.addEventListener('dragstart', () => {
        //         // hold.push(piece)
        //         console.log(index)
        //         piece.classList.add('dragging')
        //         piece.style.opacity = '0'
        //         piece.parentNode.classList.add('ready')
        //     })

        //     piece.addEventListener('dragend', () => {
        //         moveAudio.load()
        //         moveAudio.play()
        //         piece.classList.remove('dragging')
        //         piece.style.opacity = '1'
        //         piece.classList.add('placed')
        //     })
        // })
    
        // cell.forEach(cell => {
        //     cell.addEventListener('dragover', e => {
        //         e.preventDefault()
        //         if(cell.hasChildNodes() === false){
        //             // const colored = select('ready')
        //             const draggable = select('.dragging')
        //             cell.appendChild(draggable)
        //             // this.clickDisplayMove()
        //         }
        //     })
        // })

        cell.forEach((cell,index) => {
            const col = index % 8
            const row = (index - col) / 8
            const currentPiece = this.boardState[row][col]
            
            cell.addEventListener('dragstart', () => {
                let piece = cell.firstChild
                piece.style = `opacity: 0;`
                hold.push(currentPiece)
                
                piece.classList.add('dragging')
                cell.classList.add('ready')
                this.boardState[row][col] = ''
            })

            cell.addEventListener('dragend', () => {
                let piece = cell.firstChild
                let replace = hold.pop()

                this.boardState[row][col] = replace
                console.log(this.boardState)
                moveAudio.load()
                moveAudio.play()
                piece.classList.remove('dragging','add-animation-piece')
                piece.style.opacity = '1'
                piece.classList.add('placed')

                if(currentTurn === 'whiteTurn'){
                    currentTurn = 'blackTurn'
                }
                else{
                    currentTurn = 'whiteTurn'
                }
                swapTurns(currentTurn)
            })

            cell.addEventListener('dragover', e => {
                e.preventDefault()
                if(cell.hasChildNodes() === false){
                    const draggable = select('.dragging')
                    cell.appendChild(draggable)
                    // board.renderPieces()
                }
            })
        })
    }

    // clickDisplayMove(){
    //     const cell = selectAll('.cell')
    //     const cells = Array.from(cell)
    //     let hold = this.holdingArray
    //     const board = new Board()

    //     cell.forEach((cell, index) => {
    //         let col = index % 8
    //         let row = (index - col) / 8

    //         cell.addEventListener('click', () => {
    //             if(!cell.hasChildNodes() && hold.length !== 0){
    //                 let replace = hold.pop()
    //                 this.boardState[row][col] = replace
    //                 // board.renderPieces()
    //                 console.log('ye', hold, this.boardState)
    //             }
    //         })
    //     })
    // }
}

class Board {
    constructor(){
        this.boardCells = 64
    }

    //CREATE AND RENDER INTRODUCTION ANIMATIONS
    renderIntroduction(){
        const APP = select('.app')
        const INTRO_DIV = create('div')
        const TITLE = create('h1')
        const INTRO_BUTTON = create('button')
        
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
                },1300)
            },3000)

            setTimeout(()=>{
                TITLE.style.display = 'none'
            }, 2000)

            this.createChessBoard(INTRO_BUTTON)
        },{ once: true })

        APP.append(INTRO_DIV)
        INTRO_DIV.append(TITLE,INTRO_BUTTON)
    }

    //CREATE CHESSBOARD
    createChessBoard(INTRO_BUTTON){
        const CONTAINER = create('div')
        CONTAINER.classList.add('container')
        const boardCells = this.boardCells

        for(let i=0; i < boardCells; i++){
            const cell = create('div')
            cell.classList.add('cell')
            cell.id = i

            CONTAINER.append(cell)
        }
        
        setTimeout(() => {
            CONTAINER.style.display = 'flex'
            setTimeout(() => {
                CONTAINER.style.opacity = '1'
            },1000)
        }, 1000)

        INTRO_BUTTON.append(CONTAINER)

        this.renderArm(INTRO_BUTTON)
    }

    //CREATE AND RENDER THE INTRODUCTION ROBOT ARM ANIMATIONS
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
        p2Select.innerHTML = `Auto-selected Color`
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

        const chess = new Chess()

        setTimeout(()=> {
            armJoint.style.display = 'flex'
        },3500)

        p1WhiteButton.addEventListener('click', () => {
            if(inputP1Name.value === ''){
                return inputP1Name.select()
            } else {
                screen1.style.display = 'none'
                screen2.style.display = 'flex'
                chess.player1Name = inputP1Name.value
                chess.currentPlayer = 'white'
                chess.player1Color = 'white'
                p2WhiteButton.style.display = 'none'
            }
        })

        p1BlackButton.addEventListener('click', () => {
            if(inputP1Name.value === ''){
                return inputP1Name.select()
            } else {
                screen1.style.display = 'none'
                screen2.style.display = 'flex'
                chess.player1Name = inputP1Name.value
                chess.currentPlayer = 'black'
                chess.player1Color = 'black'
                p2BlackButton.style.display = 'none'
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
                chess.player2Name = inputP2Name.value
                shoulder3.style = `animation: height3reverse 0.3s ease-in-out 0s 1 reverse backwards,idle3 1s ease-in-out infinite alternate;`
                shoulder2.style = `animation: height2reverse 0.3s ease-in-out 0.3s 1 reverse backwards,idle2 1s ease-in-out infinite alternate`
                shoulder1.style = `animation: height1reverse 0.3s ease-in-out 0.6s 1 reverse backwards,idle1 1s ease-in-out infinite alternate`
                armJoint.style = `animation: growJointreverse 0.3s ease-in-out 1.1s 1 reverse backwards;`
                arm.style = `animation: growArmreverse 0.5s ease-in-out 1.6s 1 reverse backwards;`
                screen2.style = `animation: height3reverse 0.5s ease-in-out 0s 1 reverse backwards,idle3 1s ease-in-out infinite alternate;`

                this.renderPieces()
                chess.clickCellMove()
            }
        })
    }
    
    //RENDER CHESSBOARD PIECES BASED ON 2D CHESSBOARD ARRAY
    renderPieces(){
        const chess = new Chess()

        const cell = selectAll('.cell')
        const cells = Array.from(cell)
        const obj = chess.piecesImages

        cell.forEach((cell,index) => {
            const col = index % 8
            const row = (index - col) / 8
            const currentCell = chess.boardState[row][col]

            if(obj.hasOwnProperty(currentCell) && !cell.hasChildNodes()){
                let img = create('img')
                img.src = obj[currentCell]
                img.classList.add('piece','add-animation-piece')
                img.id = 'images'
                img.setAttribute('draggable','true')
                cells[index].append(img)
            }else if(obj.hasOwnProperty(currentCell === '') && cell.hasChildNodes()){
                cell[index].removeChild(cell.firstChild)
            }
        })
    }
}

class Player {

}

const start = new Chess()

start.gameStart()

swapTurns(currentTurn)

function swapTurns(currentTurn){
    
    if (currentTurn === 'whiteTurn'){
        console.log(`white's turn`)
    }

    else{
        console.log(`black's turn`)
    }
}