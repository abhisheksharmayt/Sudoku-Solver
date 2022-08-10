let innerDivs = document.querySelectorAll(".innerDiv");
let spans = document.querySelectorAll("span");

let rowCount = 0;
let colCount = 0;
let boxCount = 0;
for (let span of spans) {
    if (colCount > 8) {
        rowCount++;
        colCount = 0;
    }
    //generating unique box count
    boxCount = Math.floor(rowCount / 3) * 3 + Math.floor(colCount / 3);
    //adding respective classes
    span.classList.add(`row${rowCount}`, `col${colCount}`, `box${boxCount}`);
    colCount++;
}

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

spans = document.querySelectorAll("span");

rowCount = 0;
colCount = 0;
for (let span of spans) {
    if (colCount > 8) {
        rowCount++;
        colCount = 0;
    }
    span.textContent = board[rowCount][colCount];
    colCount++;
}

//Sudoku solver Algorithm

//first we will create a hashmaps for row,col and boxes and then we will map the given initial values
let boxMap = new Map();
let rowMap = new Map();
let colMap = new Map();

let uniqChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

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

let flag = false;
async function sudokuSolver(row, col) {
    if ((row > 8) || (col > 8)) {
        flag = true;
        return;
    }
    let nextRow = row;
    let nextCol = col + 1;
    if (col === 8) {
        nextRow = row + 1;
        nextCol = 0;
    }
    if (board[row][col] !== ".") {
        sudokuSolver(nextRow, nextCol);
    }
    else {
        let count = 1;
        let currentClass = `.row${row}.col${col}`;
        let currentSpan = document.querySelector(currentClass);
        while (flag === false) {
            let rowKey = `${uniqChar[row]}${count}`;
            let colKey = `${uniqChar[col]}${count}`;
            let boxKey = `${uniqChar[(Math.floor(row / 3) * 3 + Math.floor(col / 3))]}${count}`;
            if (!rowMap.has(rowKey) && !colMap.has(colKey) && !boxMap.has(boxKey)) {
                board[row][col] = `${count}`;
                currentSpan.innerText = board[row][col];
                // console.log("hi");
                rowMap.set(rowKey, true);
                colMap.set(colKey, true);
                boxMap.set(boxKey, true);
                
                sudokuSolver(nextRow, nextCol)
                
                if (!flag) {
                    rowMap.delete(rowKey);
                    colMap.delete(colKey);
                    boxMap.delete(boxKey);
                }
            }
            count++;
            if (count > 9) {
                board[row][col] = ".";
                currentSpan.innerText = ".";
                // await new Promise((resolve) => {setTimeout(() => {resolve()}, 100)});
                return;
            }
        }
    }
}
console.log("before Solved");
sudokuSolver(0, 0);
console.log("finished");

// async function last(){for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//         if (board[i][j] === '.') {
//             let currentClass = `.row${i}.col${j}`;
//             let currentSpan = document.querySelector(currentClass);
//             currentSpan.innerText = "9";
//             board[i][j] = '9';
//             // await new Promise(resolve => {setTimeout(() => {resolve()}, 200)});
//         }
//     }
// }
// }
