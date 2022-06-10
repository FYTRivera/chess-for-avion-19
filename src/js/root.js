import { select, create } from './utils.js'

let boardState = [
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['w_pawn','w_pawn','w_pawn','w_pawn','w_pawn','w_pawn','w_pawn','w_pawn'],
    ['','','','','','','','']
]

console.log(boardState)

function renderPieces(object,property){
    for(let i=0; i < 9; i++){
        for(let j=0; j < 9; j++){
            if(boardState[i][j] === object[property]){
                const img = create('img')
                img.src = `${property}`

                document.getElementById([i][j]).append(img)
            }
        }
    }
    renderPieces(piecesImages,property)
}

const piecesImages = {
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

renderPieces()