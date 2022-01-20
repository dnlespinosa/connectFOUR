/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(height, width) {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y=0; y<height; y++){
    let nullArr = [];
    for (let x=0; x<width; x++){
      nullArr.push(null);
    }
    board.push(nullArr);
  }
  return board
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: Set a variable to create a table row, set an ID of that row to "column-top", add an event listener to that row
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // TODO: Create the playable columns in each tr. The number of columns will be determined by the width of the game board. Also sets an ID to the column# of the respective block
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: Create a the rows and blocks for play. The number of playable rows is determined by the height of the game board. This will also create each individual block that the game pieces will be placed into. Also sets an ID to the 'row-column' of the respective block
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let y = HEIGHT-1;
  for (let i=y; i>=0; i--){
    let space = document.getElementById(`${i}-${x}`);
    if(space.children.length < 1){
       y=i;
    }
    return y;
  }
  
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const gamePiece = document.createElement('div');
  const playingSquare = document.getElementById(`${y}-${x}`);
  gamePiece.className += 'piece';
  if (currPlayer===1){
    gamePiece.className += '.p1'
  } else if (currPlayer===2) {
    gamePiece.className += '.p2'
  }
  playingSquare.append(gamePiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  if (currPlayer === 1 ? board[y][x]=1 : board[y][x]=2);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  function checkForTie(){
    board.every((rowArr) => {
      rowArr.every((cells)=>{
        return cells != null;
      })
    })
  }
  if (checkForTie()){
    return endGame(`You tied! Shake hands`)
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === 1 ? currPlayer = 2 : currPlayer = 1);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // On every click, the below function will iterate through the entire board. With each iteration, the function will create four values each with 4 arrays that represent four connecting pieces (horizontally, vertically, diagonally up or down). These values are then tested against the _win function to see if any of these values have currPlayer listed four times. If so, it will return true. 

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(HEIGHT, WIDTH);
makeHtmlBoard();
