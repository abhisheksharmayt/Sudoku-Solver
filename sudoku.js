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
    span.textContent = board[rowCount][colCount];
    //adding respective classes
    span.classList.add(`row${rowCount}`, `col${colCount}`, `box${boxCount}`);
    colCount++;
}



// spans = document.querySelectorAll("span");

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


// async function sudokuSolver(row, col) {
//     if ((row > 8) || (col > 8)) {
//         return true;
//     }
//     let nextRow = row;
//     let nextCol = col + 1;
//     if (col === 8) {
//         nextRow = row + 1;
//         nextCol = 0;
//     }
//     if (board[row][col] !== ".") {
//         sudokuSolver(nextRow, nextCol)
//         return true;
//     }
//         for(let c='1'; c<='9'; c++){
//             let rowKey = `${uniqChar[row]}${c}`;
//             let colKey = `${uniqChar[col]}${c}`;
//             let boxKey = `${uniqChar[(Math.floor(row / 3) * 3 + Math.floor(col / 3))]}${c}`;
//             if (!rowMap.has(rowKey) && !colMap.has(colKey) && !boxMap.has(boxKey)) {
//                 let currentClass = `.row${row}.col${col}`;
//                 let currentSpan = document.querySelector(currentClass);
//                 board[row][col] = `${c}`;
//                 currentSpan.innerText = board[row][col];
//                 // console.log("hi");
//                 rowMap.set(rowKey, true);
//                 colMap.set(colKey, true);
//                 boxMap.set(boxKey, true);
//                 await new Promise(resolve => {setTimeout(() => {resolve()}, 100)});
//                 if(await sudokuSolver(nextRow, nextCol)) return true;
//                 else{
//                     rowMap.delete(rowKey);
//                     colMap.delete(colKey);
//                     boxMap.delete(boxKey);
//                     board[row][col] = '.';
//                     currentSpan.innerText = board[row][col];
//                 }
//             }
//         }
//         return false;
// }

sudokuSolver2(0, 0);


//ignore
/*
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
                
                sudokuSolver(nextRow, nextCol);
                
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
*/
// console.log("before Solved");
// sudokuSolver(0, 0);
// sudokuSolver2();
// console.log("finished");

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




async function sudokuSolver2(){
    for(let row=0; row<9; row++){
        for(let col=0; col<9; col++){
            if(board[row][col] == '.'){
                for(let c = '1'; c <= '9'; c++){
                    let rowKey = `${uniqChar[row]}${c}`;
                    let colKey = `${uniqChar[col]}${c}`;
                    let boxKey = `${uniqChar[(Math.floor(row / 3) * 3 + Math.floor(col / 3))]}${c}`;
                    if (!rowMap.has(rowKey) && !colMap.has(colKey) && !boxMap.has(boxKey)){
                        board[row][col] = c;
                        let currentClass = `.row${row}.col${col}`;
                        let currentSpan = document.querySelector(currentClass);
                        currentSpan.innerText = board[row][col];
                        currentSpan.style.color = "red";
                        rowMap.set(rowKey, true);
                        colMap.set(colKey, true);
                        boxMap.set(boxKey, true);
                        await new Promise((resolve) => {setTimeout(() => {resolve()}, 10)});
                        if(await sudokuSolver2()){
                            return true;
                        }
                        else{
                            board[row][col]='.';
                            currentSpan.innerText = board[row][col];
                            currentSpan.style.color = "black";
                            rowMap.delete(rowKey);
                            colMap.delete(colKey);
                            boxMap.delete(boxKey);
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}