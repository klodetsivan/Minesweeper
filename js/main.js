'use strict'
const MINE = '💣'
const NUM1 = '1'
const NUM2 = '2️'


var gCountMines = 0
// var num = [1, 2, 3, 4, 5, 6, 7, 8]
var gId = 1
var gBoard;
var gInterval;
var size;
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
// var numOfNegs = setMinesNegsCount()


function init() {
    gBoard = createBoard();
    console.log(gBoard)
    renderBoard(gBoard);
    setTimer()
    gId = 1
}

// creating board in the model:
function createBoard(size = 4) {

    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            var cell = createCell()
            board[i][j] = cell;
        }
    }
    // Place the mines manually
    board[2][2].gameElement = MINE;
    board[1][3].gameElement = MINE;

    return board
}

function createCell() {
    var cell = {
        id: gId++,
        minesAroundCount: 4,
        isShown: true,
        isMine: false,
        isMarked: true,
        gameElement: null,

    }
    return cell;
}

// rendering board in DOM
function renderBoard(board) {
    console.table(board)
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            console.log(cell)
            var numOfNegs =  setMinesNegsCount(i,j,board)
            if (cell.gameElement === null) {

                if (numOfNegs === 1 ) {
                    cell.gameElement = NUM1
                } 
                if (numOfNegs ===2) {
                    cell.gameElement = NUM2
                }

            }
             
            var currCell = 'currCell ' + (i + 1) + ',' + (j + 1)
            strHtml += `\t<td onclick="showCell(this,${i},${j})"
            title=" ${currCell}" class="cell" class="timer${setTimer}"

             style="display: ${cell.id}"</td>\n`
        }
        strHtml += '</tr>\n'
    }
    var elBoardBody = document.querySelector('.boardCells')
    // console.log(elBoardBody, strHtml);
    elBoardBody.innerHTML = strHtml;

}


// gBoard[2[2]] = MINE;
// gBoard[1[3]] = MINE;


function restartGame(gBoard) {
    init()
    clearInterval(gInterval)
    var elTimer = document.querySelector('.Timer')
    elTimer.innerText = 0;

    //game over?
}



function showCell(elCell, i, j) {
    // getting the specific cell from the model:
    var cell = gBoard[i][j];
    console.log('cell clicked: ', elCell, i, j)


    // changing the specific cell in the DOM
    elCell.innerText = cell.gameElement

    // if (!cell.gameElement === MINE) {
    //     setMinesNegsCount()
    // }

    // if (elCell.innerText === '') console.log('hi')
    // if (elCell.innerText === MINE) console.log('hi')
    // if (elCell.innerText === num) {

    // }

    // renderCell(cell, MINE)
    // //controling class list of an element:
    // elCell.classList.add()
    return cell;

}

// function setMinesNegsCount(cellClicked) {
//     var count = 0
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i > mat.length - 1) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (j < 0 || j > mat[0].length - 1) continue
//             if (i === rowIdx && j === colIdx) continue
//             var currCell = mat[i][j]
//             if (currCell === '$') count++
//         }
//     }
//     return count
// }





// function cellClicked(elCell, i, j) {
//     var cell = gBoard[cellI][cellJ];
//     if (cell.isMine) {
//         // setMinesNegsCount()
//     }
// }

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}


// function gAddMine(gBoard) {
//     var randI = getRandomInt(0, gBoard.length)
//     var randJ = getRandomInt(0, gBoard.length)
//     if (gBoard[randI][randJ].gameElement === '') {
//         gBoard[randI][randJ] = MINE;
//         var currCell = { i: randI, j: randJ }
//         renderCell(currCell, MINE)
//         gCountMines++
//     }
// }

function setMinesNegsCount(cellI, cellJ, board) {
    console.log('hi')
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].gameElement===MINE) negsCount++;
        }
    }
    console.log(negsCount)
    return negsCount;
}
