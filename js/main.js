'use strict'
const MINE = '💣'
const NUM1 = '1'
const NUM2 = '2️'
const NUM3 = '3'
const NUM4 = '4'
const NUM5 = '5'
const NUM6 = '6'
const NUM7 = '7'
const NUM8 = '8'


// var gCountMines = 0
// var num = [1, 2, 3, 4, 5, 6, 7, 8]
var gId = 1
var gBoard;
var gInterval;
var gSize = 4;
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLevel = {
    SIZE: 4,
    MINES: 2
}

function changeLevel(size, mines) {
    gLevel.SIZE = size;
    gLevel.MINES = mines;
    clearInterval(gInterval)
    var elTimer = document.querySelector('.Timer')
    elTimer.innerText = 0;
    init()


}


function init() {
    // closeModal()
    gBoard = createBoard(gLevel);
    // console.log(gBoard)
    renderBoard(gBoard);
    clearInterval(gInterval)
    var elTimer = document.querySelector('.Timer')
    elTimer.innerText = 0;

    gId = 1
    gGame.isOn = true

}

// creating board in the model:
function createBoard(gLevel) {
    var size = gLevel.SIZE
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            var cell = createCell()
            board[i][j] = cell;
        }
    }
    // Place the mines manually
    // board[2][2].gameElement = MINE;
    // board[1][3].gameElement = MINE;
    for (var i = 0; i < gLevel.MINES; i++) {
        gAddMine(board)
    }

    return board
}


function createCell() {
    var cell = {
        id: gId++,
        minesAroundCount: 8,
        isShown: true,
        isMine: false,
        isMarked: true,
        gameElement: null,
        color: null
    }
    return cell;
}





// rendering board in DOM
function renderBoard(board) {
    // console.table(board)
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            // console.log(cell)


            var numOfNegs = setMinesNegsCount(i, j, board)
            if (cell.gameElement === null) {

                if (numOfNegs === 1) {
                    cell.gameElement = NUM1
                }
                if (numOfNegs === 2) {
                    cell.gameElement = NUM2
                }
                if (numOfNegs === 3) {
                    cell.gameElement = NUM3
                }
                if (numOfNegs === 4) {
                    cell.gameElement = NUM4
                }
                if (numOfNegs === 5) {
                    cell.gameElement = NUM5
                }
                if (numOfNegs === 6) {
                    cell.gameElement = NUM6
                }
                if (numOfNegs === 7) {
                    cell.gameElement = NUM7
                }
                if (numOfNegs === 8) {
                    cell.gameElement = NUM8
                }

            }

            var currCell = 'currCell ' + (i + 1) + ',' + (j + 1)
            strHtml += `\t<td onclick="cellClicked(this,${i},${j})"
            title=" ${currCell}" class="cell" class="timer${setTimer}"

             style="display: ${cell.id}"</td>\n`
        }
        strHtml += '</tr>\n'
    }
    // catch the dom class and inject
    var elBoardBody = document.querySelector('.boardCells')
    // console.log(elBoardBody, strHtml);
    elBoardBody.innerHTML = strHtml;
}





// gBoard[2[2]] = MINE;
// gBoard[1[3]] = MINE;


function restartGame(size) {
    gSize = size;
    init()
    clearInterval(gInterval)
    var elTimer = document.querySelector('.Timer')
    elTimer.innerText = 0;



    //game over?
}



function cellClicked(elCell, i, j) {
    // getting the specific cell from the model:
    var cell = gBoard[i][j];
    console.log(gBoard)
    console.log(cell)
    console.log('cell clicked: ', elCell, i, j)

    // changing the specific cell in the DOM
    elCell.innerText = cell.gameElement
    // if (!elCell === null) gInterval = setInterval(setTimer, 1000);
    if (cell.gameElement === MINE) {
        cell.isMine = true
        elCell.style.backgroundColor = 'red';

        // var elCell = document.querySelector('')
        // elCell.style.backgroundColor = 
        GameOver();
    }
    // if(cell.gameElement === null){
    //     elCell.style.backgroundColor = 'light pink';
    // }
    // if (!cell.gameElement === MINE) {
    //     setMinesNegsCount()
    // }
    // gInterval = setInterval(setTimer,1000)
    if (elCell.innerText === NUM1 || NUM2 || NUM3 || NUM4 || NUM5 || NUM6 || NUM7 || NUM8 || MINE) {
        setTimer()
    }
    // if (elCell.innerText === '') {
    //     expandShown()
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



function GameOver() {
    gGame.isOn = false
    openModal()
    // clearInterval(gInterval)
    // renderBoard()
    clearInterval(gInterval)
    var elTimer = document.querySelector('.Timer')
    elTimer.innerText = 0;
}




function expandShown(board, elCell, i, j) {

    var emptyCellCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            elCell = board[i][j]
            if (elCell.gameElement === '') emptyCellCount++;
        }
    }
    // console.log(negsCount)
    return emptyCellCount;
}


function gAddMine(board) {
    var randI = getRandomInt(0, board.length - 1)
    var randJ = getRandomInt(0, board.length - 1)
    // console.log(randI, randJ, board)
    if (board[randI][randJ].gameElement === null) {
        board[randI][randJ].gameElement = MINE;

        // var currCell = { i: randI, j: randJ }
        // renderCell(currCell, MINE)
        // gCountMines++
    }
}

function setMinesNegsCount(cellI, cellJ, board) {
    // console.log('hi')
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].gameElement === MINE) negsCount++;
        }
    }
    // console.log(negsCount)
    return negsCount;
}

// function handleKey(ev) {

//     if (ev.key === 'click') {
//         if ('click' === MINE) {
//             checkGameOver()
//         }
//         // console.log('ev:', ev);

//     }
// }

function openModal() {

    var elBox = document.querySelector('.modal')
    elBox.style.display = 'block';

    // show the modal and schedule its closing
}
function closeModal() {

    var elBox = document.querySelector('.modal')
    elBox.style.display = 'none';
    init()
    //  hide the modal
}
