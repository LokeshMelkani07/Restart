// Check whether a string is palindrome or not
function isPalindrome(str) {
  // Base case: If the string is empty or has only one character, it's a palindrome
  if (str.length <= 1) {
    return true;
  }

  // Check if the first and last characters are the same
  if (str[0].toLowerCase() !== str[str.length - 1].toLowerCase()) {
    return false;
  }

  // Recursively check the remaining substring (excluding the first and last characters)
  return isPalindrome(str.slice(1, str.length - 1));
}

// Create pow(x, n) function which returns x^n
function pow(x, n) {
  // Base cases:
  if (n === 0) {
    return 1;
  } else if (n < 0) {
    return 1 / pow(x, -n); // Handle negative exponents
  }

  // Recursive case: x^n = x * x^(n-1)
  return x * pow(x, n - 1);
}

// Create a function which returns the sum of digits of a number (e.g., sumOfDigits(453) is 12)
function sumOfDigits(num) {
  // Base case: If the number is 0, the sum is 0.
  if (num === 0) {
    return 0;
  }

  // Recursive case: The sum of digits is the last digit of the number plus the sum of digits of the remaining number (excluding the last digit).
  return (num % 10) + sumOfDigits(Math.floor(num / 10));
}

// Create a function which returns the number of digits in a number (e.g., countDigits(453) is 3)
function countDigits(num) {
  // Base case: If the number is 0, it has 1 digit (0 itself).
  if (num === 0) {
    return 1;
  }

  // Recursive case: The number of digits is 1 plus the number of digits in the remaining number (excluding the last digit).
  return 1 + countDigits(Math.floor(num / 10));
}

// Calculate LCM and GCD using recursion
function gcd(a, b) {
  // Base case: If b is 0, then GCD(a, b) is a.
  if (b === 0) {
    return a;
  }

  // Recursive case: GCD(a, b) = GCD(b, a % b)
  return gcd(b, a % b);
}

function lcm(a, b) {
  // If either number is 0, the LCM is 0.
  if (a === 0 || b === 0) {
    return 0;
  }

  // Calculate GCD first (can be replaced with iterative approach for efficiency)
  const divisor = gcd(a, b);

  // LCM is product of a and b divided by their GCD (to avoid redundant factors)
  return (a * b) / divisor;
}

// Another approach for LCM
function findLCM(a, b) {
  let lar = Math.max(a, b);
  let small = Math.min(a, b);
  for (i = lar; ; i += lar) {
    if (i % small == 0) return i;
  }
}

// Create a function to reverse a string
function reverseString(str) {
  // Base case: If the string is empty or has only one character, it's already reversed.
  if (str.length <= 1) {
    return str;
  }

  // Recursive case: The reversed string is the last character appended to the reversed version of the remaining substring (excluding the last character).
  return str[str.length - 1] + reverseString(str.slice(0, str.length - 1));
}

// Unique Paths
// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner. The test cases are generated so that the answer will be less than or equal to 2 * 109.
const uniquePaths = (m, n) => {
  // We will start from first row, first col
  // We will try going right and down both
  // base case: we reach last row and last col
  // if we exceed row or col at any time, that way is unsuccessful so return 0
  return helper(m, n, 1, 1);
};

const helper = (m, n, row, col) => {
  if (row === m && col === n) return 1;
  if (row > m || col > n) return 0;

  const pathsRight = helper(m, n, row, col + 1);
  const pathsDown = helper(m, n, row + 1, col);

  return pathsRight + pathsDown;
};

// Memoised
const uniquePathss = (m, n) => {
  // We will start from first row, first col
  // We will try going right and down both
  // base case: we reach last row and last col
  // if we exceed row or col at any time, that way is unsuccessful so return 0
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));
  return helper1(m, n, 1, 1, dp);
};

const helper1 = (m, n, row, col, dp) => {
  if (row === m && col === n) return 1;
  if (row > m || col > n) return 0;
  if (dp[row][col] != -1) return dp[row][col];

  const pathsRight = helper1(m, n, row, col + 1, dp);
  const pathsDown = helper1(m, n, row + 1, col, dp);

  return (dp[row][col] = pathsRight + pathsDown);
};

// Find the Winner of the Circular Game
/*
There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.

The rules of the game are as follows:

Start at the 1st friend.
Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
The last friend you counted leaves the circle and loses the game.
If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
Else, the last friend in the circle wins the game.
Given the number of friends, n, and an integer k, return the winner of the game.
*/

// Non-Recursion Approach
const findTheWinner = (n, k) => {
  // Start from first friend and remove k friends everytime, till we have length of array = 1
  let a = [];
  for (let i = 0; i < n; i++) a.push(i + 1);
  let remove = 0;
  while (a.length > 1) {
    // -1 for 0 based indexing and  % a.length to avoid out of bound
    remove = (remove + k - 1) % a.length;
    // remove one element starting from index = remove
    a.splice(remove, 1);
  }
  return a;
};

// Using Recursion
var findTheWinner1 = function (n, k) {
  // Using Recursion
  // Base Case: We reach the last element in the array, return it
  // everytime, the size of array is shrinking
  const remove = (arr, i) => {
    if (arr.length === 1) {
      return arr[0];
    }
    i = (i + k - 1) % arr.length;
    arr.splice(i, 1);
    return remove(arr, i);
  };
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return remove(arr, 0);
};

// Print all subsequences of a string
// Given a string, we have to find out all its subsequences of it. A String is a subsequence of a given String, that is generated by deleting some character of a given string without changing its order.
// Input : abc
// Output : a, b, c, ab, bc, ac, abc
function printSubsequence(input, output) {
  // Base Case
  // if the input is empty print the output string
  if (input.length == 0) {
    document.write(output + "<br>");
    return;
  }

  // output is passed with including
  // the Ist character of
  // Input string
  printSubsequence(input.substring(1), output + input[0]);

  // output is passed without
  // including the Ist character
  // of Input string
  printSubsequence(input.substring(1), output);
}

// Driver code
// output is set to null before passing in as a
// parameter
var output = "";
var input = "abcd";
printSubsequence(input, output);

// Backtracking

// N Queens
/*
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

Example 1:
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
*/
var solveNQueens = function (n) {
  // Approach
  // First, we will make n*n array named as board
  // Now we start filling the board by placing the queen at each column of a row and checking that if we place queen at that col of that row, Will we be able to get an answer?
  // How to check if we get an answer.
  // Base case: we reach row===n means we have sucessfully placed n queens in the board of n*n
  // how to check if we can place any queen in a block?
  // we make isValid function where we pass that row and col
  // We check diagnol, up-right, up-left contains any Queen, then return false else we can place the queen there
  // if our this approach of filling the queen fails, we backtrack and move to next col and try to place the queen there
  // if we succeed in placing the queen in any col, we move to next row
  let result = [];
  // Initiate board. the initial value should be "."
  // Making n*n board
  let board = new Array(n);
  for (let i = 0; i < n; i++) {
    board[i] = new Array(n).fill(".");
  }

  function isValid(row, col) {
    // check if there is a queen above the head.
    for (let i = 0; i < row; i++) {
      if (board[i][col] == "Q") return false;
    }
    //check if there is a queen on the right-top corner.
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] == "Q") return false;
    }
    // check if there is a queen on the left-top corner.
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] == "Q") return false;
    }
    return true;
  }

  function backtrack(row) {
    // when we reached the last row of the board. end the track.
    if (row == n) {
      // rearrange the result as requested.
      // We have reached the end row, means we have found one successful way of placing n queens so store it and go to backtracking step
      result.push([...board].map((row) => row.join("")));
      return;
    }
    // track from left to right.
    for (let col = 0; col < n; col++) {
      if (!isValid(row, col)) continue;
      board[row][col] = "Q";
      // go into the next row.
      backtrack(row + 1);
      // Once queen has been placed in one way, let us try another way so we backtrack and try another way
      board[row][col] = ".";
    }
  }
  // track from top to bottom.
  backtrack(0);
  return result;
};

// Sudoku Solver
/*
Write a program to solve a Sudoku puzzle by filling the empty cells.
A sudoku solution must satisfy all of the following rules:
Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.

Example 1:
Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]

Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
*/
function solveSudoku(board) {
  const n = board.length;
  dfs(board, n);
}

function dfs(board, n) {
  // for every cell in the sudoku
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      // if its empty
      if (board[row][col] !== ".") continue;
      // try every number 1-9
      for (let i = 1; i <= 9; i++) {
        const c = i.toString();
        // if that number is valid
        if (isValid(board, row, col, n, c)) {
          board[row][col] = c;
          // continue search for that board, ret true if solution is reached
          if (dfs(board, n)) return true;
        }
      }
      // solution wasnt found for any num 1-9 here, must be a dead end...
      // set the current cell back to empty
      board[row][col] = ".";
      // ret false to signal dead end
      return false;
    }
  }
  // all cells filled, must be a solution
  return true;
}

function isValid(board, row, col, n, c) {
  const blockRow = Math.floor(row / 3) * 3;
  const blockCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < n; i++) {
    if (board[row][i] === c || board[i][col] === c) return false;
    const curRow = blockRow + Math.floor(i / 3);
    const curCol = blockCol + Math.floor(i % 3);
    if (board[curRow][curCol] === c) return false;
  }
  return true;
}

// Path with Maximum Gold
/*
In a gold mine grid of size m x n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.

Return the maximum amount of gold you can collect under the conditions:

Every time you are located in a cell you will collect all the gold in that cell.
From your position, you can walk one step to the left, right, up, or down.
You can't visit the same cell more than once.
Never visit a cell with 0 gold.
You can start and stop collecting gold from any position in the grid that has some gold.


Example 1:

Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
Output: 24
Explanation:
[[0,6,0],
 [5,8,7],
 [0,9,0]]
Path to get the maximum gold, 9 -> 8 -> 7.
*/
var getMaximumGold = function (grid) {
  let row = grid.length;
  let col = grid[0].length;
  let maxGold = 0;

  const dfsBacktrack = (i, j, currentGold) => {
    if (i < 0 || j < 0 || i >= row || j >= col || grid[i][j] == 0) {
      return 0;
    } //out of bound conditions

    const goldInCurrentCell = grid[i][j];
    currentGold += goldInCurrentCell;

    //mark Visited
    grid[i][j] = 0;

    //update Max Gold
    maxGold = Math.max(maxGold, currentGold);

    //traverse all dir
    dfsBacktrack(i + 1, j, currentGold);
    dfsBacktrack(i - 1, j, currentGold);
    dfsBacktrack(i, j + 1, currentGold);
    dfsBacktrack(i, j - 1, currentGold);

    //backtrack
    grid[i][j] = goldInCurrentCell;
  };

  //main
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] !== 0) {
        dfsBacktrack(i, j, 0);
      }
    }
  }

  return maxGold;
};
