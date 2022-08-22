document.body.onload = initializeSudoku;

const solveButton = document.querySelector("#solve");
solveButton.addEventListener('click', sudokuSolver2);
const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', resetSudoku);
const speedButton = document.querySelector("#speed");

let speed = 0;

speedButton.addEventListener('change', () => {
    speed = parseInt(speedButton.value);
});

const defaultBoard =
    [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ]
    
let board =
    [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ]

let innerDivs = document.querySelectorAll(".innerDiv");
let spans = document.querySelectorAll("span");

//hashmaps for row,col and boxes and then we will map the given initial values
let boxMap = new Map();
let rowMap = new Map();
let colMap = new Map();
let uniqChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];


//-------- initializes sudoku ---------

function initializeSudoku() {
    let rowCount = 0;
    let colCount = 0;
    let boxCount = 0;
    for (let i = 0; i < spans.length; i++) {
        if (colCount > 8) {
            rowCount++;
            colCount = 0;
        }
        //generating unique box count
        boxCount = Math.floor(rowCount / 3) * 3 + Math.floor(colCount / 3);
        spans[i].textContent = board[rowCount][colCount];
        //adding respective classes
        spans[i].classList.add(`row${rowCount}col${colCount}`);
        innerDivs[i].classList.add(`row${rowCount}-col${colCount}`);
        colCount++;
    }
    fillMap();
}


//-------- fill map whith default values ---------
function fillMap() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] != '.') {

                let rowKey = uniqChar[i] + board[i][j];
                rowMap.set(rowKey, true);


                let colKey = uniqChar[j] + board[i][j];
                colMap.set(colKey, true);

                let boxKey = uniqChar[(Math.floor(i / 3) * 3 + Math.floor(j / 3))] + board[i][j];
                boxMap.set(boxKey, true);
            }
        }
    }
}

//-------- Main Sudoku Solver Function ---------
async function sudokuSolver2() {
    disableButtons("#reset", true);
    disableButtons("#solve", true);
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == '.') {
                for (let c = '1'; c <= '9'; c++) {
                    if (isSafe(row, col, c) === true) {
                        changeValue(row, col, c, true);
                        await new Promise((resolve) => { setTimeout(() => { resolve() }, speed) });
                        if (await sudokuSolver2()) {
                            return true;
                        }
                        else {
                            await new Promise((resolve) => { setTimeout(() => { resolve() }, speed) });
                            changeValue(row, col, c, false);
                        }
                    }
                }
                return false;
            }
        }
    }
    disableButtons("#reset", false);
    return true;
}

//-------- isSafe : checks is it a safe place ---------
function isSafe(row, col, c) {
    let rowKey = `${uniqChar[row]}${c}`;
    let colKey = `${uniqChar[col]}${c}`;
    let boxKey = `${uniqChar[(Math.floor(row / 3) * 3 + Math.floor(col / 3))]}${c}`;
    if (!rowMap.has(rowKey) && !colMap.has(colKey) && !boxMap.has(boxKey)) return true;
    return false;
}

//-------- changeValue : manipulates div colour and text ---------

function changeValue(row, col, c, toggle) {
    let rowKey = `${uniqChar[row]}${c}`;
    let colKey = `${uniqChar[col]}${c}`;
    let boxKey = `${uniqChar[(Math.floor(row / 3) * 3 + Math.floor(col / 3))]}${c}`;
    let innerDivClass = `.row${row}-col${col}`;
    let currentClass = `.row${row}col${col}`;
        let currentSpan = document.querySelector(currentClass);
    if (toggle) {
        board[row][col] = c;
        currentSpan.innerText = board[row][col];
        currentSpan.style.color = "#EA5455";
        document.querySelector(innerDivClass).style.backgroundColor = "#DDFFBC";
        rowMap.set(rowKey, true);
        colMap.set(colKey, true);
        boxMap.set(boxKey, true);
    }
    else {
        board[row][col] = '.';
        currentSpan.innerText = board[row][col];
        currentSpan.style.color = "black";
        document.querySelector(innerDivClass).style.backgroundColor = "#FEFFDE";
        rowMap.delete(rowKey);
        colMap.delete(colKey);
        boxMap.delete(boxKey);
    }
}

//-------- disable buttons ---------

function disableButtons(thisButton, doThis) {
    let buttons = document.querySelector(thisButton);
    buttons.disabled = doThis;
}

//-------- resets sudoku to default board ---------

async function resetSudoku() {
    boxMap.clear();
    rowMap.clear();
    colMap.clear();
    let rowCount = 0;
    let colCount = 0;
    let boxCount = 0;
    for (let i = 0; i < spans.length; i++) {
        if (colCount > 8) {
            rowCount++;
            colCount = 0;
        }
        board[rowCount][colCount] = defaultBoard[rowCount][colCount];
        boxCount = Math.floor(rowCount / 3) * 3 + Math.floor(colCount / 3);
        spans[i].textContent = board[rowCount][colCount];
        if (board[rowCount][colCount] === '.') {
            await new Promise((resolve) => { setTimeout(() => { resolve() }, 20) });
            let cla = `.row${rowCount}-col${colCount}`;
            document.querySelector(cla).style.backgroundColor = "#FEFFDE";
        }
        colCount++;
    }
    fillMap();
    disableButtons("#solve", false);
}
