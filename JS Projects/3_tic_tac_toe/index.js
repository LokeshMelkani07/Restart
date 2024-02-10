const grid_size = 6;
let current_player = "X";
const boardRef = document.querySelector(".tic_tac_toe");
// To store information related to X or O we make an 2D array
const grid = [];

// We will use below function to make a board row and col
function createBoard() {
  // To create a matrix, first create one row
  for (let j = 0; j < grid_size; j++) {
    const row = document.createElement("div");
    row.className = "row";
    // create cells in that row
    for (let i = 0; i < grid_size; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      // Add Event Listener to each cell
      // Clicking on any cell should do some activity
      /*
      cell.addEventListener("click", (e) => {
        e.target.innerText = current_player;
        changePlayer();
      });
      */
      cell.setAttribute("data-row", j);
      cell.setAttribute("data-cell", i);
      console.log(cell);
      row.appendChild(cell);
    }

    // append that row in our main div and this way create rows and cells based on user input
    boardRef.appendChild(row);
  }
}

function changePlayer() {
  current_player = current_player === "X" ? "O" : "X";
}

// To do event bubbling
function addListener() {
  boardRef.addEventListener("click", (e) => {
    // We will check if we are clicking in Div
    if (e.target.nodeName === "DIV") {
      // We will check if we are clicking inside cell
      if (e.target.classList.contains("cell")) {
        console.log("Yes");
        e.target.innerText = current_player;
        // Everytime we add X or O we update the grid and store information related to that [row][col] inside grid
        const rowId = e.target.dataset.row;
        const cellID = e.target.dataset.cell;
        updateGrid(rowId, cellID, current_player);
        changePlayer();
      }
    }
  });
}

// Below Function is to check for winner
function getWinner() {
  // Winner is one who make all X or all O in whole row or whole col or whole diagnol
  // Now we will check the winner by iterating the 2D grid
  // we will make a function to check whole line in which we give it a array
  for (let i = 0; i < grid.length; i++) {
    // checking whole row
    if (checkLine(game[i])) {
      return true;
    }
  }

  // checking whole col
  for (let i = 0; i < grid.length; i++) {
    // Taking each row and going on each for that col
    const colValues = game.map((row) => {
      return row[i];
    });
    // checking whole row
    if (checkLine(colValues)) {
      return true;
    }
  }

  // Check for diagnol
  for (let i = 0; i < grid.length; i++) {
    // front diagnol means index element of each row
    // All diagnol have same value i,j
    const diagnolValues = grid.map((row, idx) => row[inx]);
    if (checkLine(diagnolValues)) {
      return true;
    }
    // reverse diagnol checking
    const reverseDiagnolValues = grid.map((row, idx) => row[game - i - 1]);
    if (checkLine(reverseDiagnolValues)) {
      return true;
    }
  }
}

function updateGrid(rowIndex, colIndex, value) {
  console.log(rowIndex, colIndex, current_player);
  // Now we have row index, col index, value
  if (!grid[rowIndex]) {
    // if row is not present, create a row
    grid[rowIndex] = [];
  }
  grid[rowIndex][colIndex] = value;
  console.log(grid);
}

// We give an array to this function and it checks whole array if first element of array matches other element or not, just to check winner
function checkLine(arr) {
  // check every element of array
  return arr.every((data) => {
    arr[0] === data && data != undefined;
  });
}

createBoard();

addListener();
