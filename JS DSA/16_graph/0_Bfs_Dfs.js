// Number of Provinces
/*
There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

Example 1:
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2

Example 2:
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
*/
var findCircleNum = function (isConnected) {
  // Let us make a adjacency list
  // Where we take each row as one node
  // each col gives its connectivity with other nodes
  // if [i]==[j] do not count it inside adjacency list because self connection is useless so if matrix[i][j]==1 and i==j, continue, else put it inside adj[i].push(matrix[j])
  // At the end of whole traversal, we have the adj list
  // Now if in a graph, 1->2->3 then if we start from any node, we can reach any node because all nodes are either directly or indirectly connected
  // This one structure 1->2->3 denotes one province, say we have a disconnected graph where 1->2->3, 4->5->6, 7->8 is the graph so sameway we have 4->5->6 as another province and 7->8 as another province
  // So we know DFS/BFS travel all nodes in their own way. we can use anyone of them
  // We use DFS and everytime we take a different starting point
  // We make a visited array, if a node is unvisited, mark it visited and do DFS on it. At the end of DFS, we must have covered one province so do count++
  // We run a loop this way, which goes to each node and check if its not visited, dfs on it
  let adj = {};
  let m = isConnected.length;
  let n = isConnected[0].length;
  for (let i = 0; i < n; i++) {
    adj[i] = [];
    for (let j = 0; j < n; j++) {
      if (isConnected[i][j] === 1 && i !== j) {
        adj[i].push(j);
      }
    }
  }

  let visited = Array(n).fill(false);
  let provinceCount = 0;

  // Iterate through each city
  for (let i = 0; i < n; i++) {
    // If the city has not been visited, it starts a new province
    if (!visited[i]) {
      provinceCount++;
      // Perform DFS to mark all cities in this province as visited
      dfs(i, visited, adj);
    }
  }

  return provinceCount;
};

function dfs(node, visited, adj) {
  visited[node] = true;
  for (let neighbor of adj[node]) {
    if (!visited[neighbor]) {
      dfs(neighbor, visited, adj);
    }
  }
}

// Rotting Oranges [Important]
/*
You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Example 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
*/
var orangesRotting = function (grid) {
  // We are given with a matrix with values 0,1,2
  // 0 means empty cell
  // 1 means fresh orange
  // 2 means rotten orange
  // Every second, a rotten orange make its 4-directionally adjacent orange as rotten if its a fresh orange and this happend simultaneoulsy
  // Means, at time 0 if 2 rotten orange are there, they will both start their process of rottening fresh oranges simultaneoulsy.
  // If at the end, there is atleast 1 fresh orange left means return -1 else return that minimum time
  // We can think of a algo which traverse in a level i.e BFS
  // because BFS works on a level-wise order. Instead of BFS, if we think of DFS then it will go to whole depth on one side then another and time will not be minimum
  // For BFS we need a queue in which we push {node,time}
  // We make a 2D visited array where we mark [i][j]==2 wherever grid[i][j]==2 initially
  // node = node which has matrix[i][j] == 2 and initially timer = 0
  // We pick any node, go to its neighbour i.e 4 directions for which we make 2 array, dCol = {0,-1,0,+1} and dRow = {-1,0,+1,0} which are based on fact that
  // Up = {row-1, col}, Left = {row,col-1}, Down = {row+1,col}, Right = {row, col+1}
  // When we traverse a neighbour, we check if its !=2 and ==1 then only we push it in queue with time = time+1
  // We do this till end of queue and everytime we store minimum time in a variable
  // At the end, when we are out of queue, we check if Is there any cell in grid which has ==1, and vistied !== 2 then return -1 means we could not rot that orange
  // else return time
  let m = grid.length;
  let n = grid[0].length;
  let visited = Array.from({ length: m }, () => Array(n).fill(0));
  let queue = [];

  // Push all initially rotten oranges into the queue and mark them as visited
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        visited[i][j] = 2;
        queue.push([[i, j], 0]);
      }
    }
  }

  let time = 0;
  let dCol = [0, -1, 0, +1];
  let dRow = [-1, 0, +1, 0];

  // Perform BFS
  while (queue.length) {
    let [ele, eleTime] = queue.shift();
    let eleRow = ele[0];
    let eleCol = ele[1];
    time = Math.max(time, eleTime);

    // Visit neighbours
    for (let i = 0; i < 4; i++) {
      let newRow = eleRow + dRow[i];
      let newCol = eleCol + dCol[i];

      if (
        newRow < m &&
        newCol < n &&
        newRow >= 0 &&
        newCol >= 0 &&
        visited[newRow][newCol] === 0 &&
        grid[newRow][newCol] === 1
      ) {
        queue.push([[newRow, newCol], eleTime + 1]);
        visited[newRow][newCol] = 2;
      }
    }
  }

  // Check if any fresh orange is left
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1 && visited[i][j] !== 2) {
        return -1;
      }
    }
  }

  return time;
};

// Flood Fill
/*
An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

Return the modified image after performing the flood fill.

Example 1:
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.
*/
var floodFill = function (image, sr, sc, color) {
  // We will take a temp matrix where we make it same as image but temp[sr][sc] = 2 marked
  // Now we do BFS so we add sr,sc in the queue
  // Now we pick element from queue
  // travel in its 4 direction and check for valid points
  // mark the nodes in 4 direction as 2 in temp and add them in the queue but make sure to check that image[][] = 1 and != 2
  // at the end, when queue gets empty, temp has our resultant matrix
  let originalColor = image[sr][sc];

  // If the starting pixel's color is the same as the new color, no need to do anything
  if (originalColor === color) return image;

  let m = image.length;
  let n = image[0].length;
  let queue = [{ row: sr, col: sc }];
  let directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  while (queue.length) {
    let { row, col } = queue.shift();
    image[row][col] = color;

    for (let [dRow, dCol] of directions) {
      let newRow = row + dRow;
      let newCol = col + dCol;

      if (
        newRow >= 0 &&
        newRow < m &&
        newCol >= 0 &&
        newCol < n &&
        image[newRow][newCol] === originalColor
      ) {
        queue.push({ row: newRow, col: newCol });
      }
    }
  }

  return image;
};

//  01 Matrix
/*
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

Example 1:
Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
*/
var updateMatrix = function (mat) {
  // We will take a queue
  // We will push all element with value = 0 in the queue
  // Now we apply BFS technique and get the topmost element of queue
  // traverse in its all 4 directions, if that value is != 0 then add its value + 1
  // push it in queue
  // At the end, our matrix contain all element with nearest distance to 0
  let m = mat.length;
  let n = mat[0].length;
  let q = [];
  let dRow = [-1, 0, +1, 0];
  let dCol = [0, -1, 0, +1];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] == 0) {
        q.push({ row: i, col: j });
      } else {
        // mark it -1 so that we have a clue that its not been processed yet
        mat[i][j] = -1;
      }
    }
  }

  while (q.length) {
    let { row, col } = q.shift();
    // traverse 4 directionally
    for (let i = 0; i < 4; i++) {
      let directionRow = row + dRow[i];
      let directionCol = col + dCol[i];
      if (
        directionRow < m &&
        directionRow >= 0 &&
        directionCol < n &&
        directionCol >= 0 &&
        mat[directionRow][directionCol] == -1
      ) {
        mat[directionRow][directionCol] = mat[row][col] + 1;
        q.push({ row: directionRow, col: directionCol });
      }
    }
  }

  return mat;
};

// Surrounded Regions
/*
You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:

Connect: A cell is connected to adjacent cells horizontally or vertically.
Region: To form a region connect every 'O' cell.
Surround: The region is surrounded with 'X' cells if you can connect the region with 'X' cells and none of the region cells are on the edge of the board.
A surrounded region is captured by replacing all 'O's with 'X's in the input matrix board.

Example 1:
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

Explanation:
In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded
*/
var solve = function (board) {
  // '0' ke chaaro taraf dekho
  // Agar uske (uppar, left, right, neeche) har jagah 'X' h toh hum usko bhi X bna skte h and ye kaam In a group of 0's mai bhi ho skta h
  // like if a group of 0's has X in its all 4 directions then we can make them all into X
  // We need to return this modified array
  // We can observe one thing that all 0's which are connected to any O that is at boundary will never get converted
  // So we need to start our BFS/DFS from boundary 0's
  // All 0's other than ones in the boundary will definately get coverted to X as they will always be surrounded by X
  // We need to have an visited matrix and start traversal from O in boundary
  // We check first row (boundary), if we found an O, start dfs mark them visited as 1 (which means they will not be converted)
  // We check first Col (Its another boundary), again same DFS
  // We check last row and last col similary and look out for O's to apply BFS
  // While start DFS, we will check in all 4 directions
  // We can also apply BFS but it should also start from boundary O
  // At last mark all 0's in visited as X and return it
  let m = board.length;
  let n = board[0].length;
  let visited = Array.from({ length: m }, () => Array(n).fill(0));
  let dRow = [-1, 0, +1, 0];
  let dCol = [0, -1, 0, +1];

  function dfs(row, col) {
    // mark it visited
    visited[row][col] = 1;

    // travel in its 4 directions
    for (let i = 0; i < 4; i++) {
      let newRow = row + dRow[i];
      let newCol = col + dCol[i];
      if (
        newRow >= 0 &&
        newRow < m &&
        newCol >= 0 &&
        newCol < n &&
        !visited[newRow][newCol] &&
        board[newRow][newCol] == "O"
      ) {
        dfs(newRow, newCol);
      }
    }
  }

  // check for boundary row
  for (let i = 0; i < m; i++) {
    // check for first row
    if (!visited[i][0] && board[i][0] == "O") {
      dfs(i, 0);
    }

    // check for last row
    if (!visited[i][n - 1] && board[i][n - 1] == "O") {
      dfs(i, n - 1);
    }
  }

  // check for boundary col
  for (let j = 0; j < n; j++) {
    // first col
    if (!visited[0][j] && board[0][j] == "O") {
      dfs(0, j);
    }

    // last col
    if (!visited[m - 1][j] && board[m - 1][j] == "O") {
      dfs(m - 1, j);
    }
  }

  // check and modify all O's based on visited array
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j] == 0 && board[i][j] == "O") {
        board[i][j] = "X";
      }
    }
  }

  return board;
};

// Number of Enclaves
/*
You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell.

A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid.

Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.

Example 1:
Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
Output: 3
Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.

Example 2:
Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
Output: 0
Explanation: All 1s are either on the boundary or can reach the boundary.
*/
var numEnclaves = function (board) {
  // Same as Above problem "Surrounded Regions"
  // Just that hume vo vale 1's chahiye jo boundary par h
  // Hume unn 1's ka count dena h jo boundary par nhi h means "Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves."
  // So we pick 1's in the boundary and start DFS on them, so that whole group attached to them is taken at once for which we use visited array
  // We apply DFS on first row, last row, first col, last col and mark them visited accordingly if they are not visited and their value is 1 on boundary.
  // To apply DFS, we need to check 4 directionally as given
  // At the end, values which has marked visited==0 and has value = 1 are ones which are our answer so count and return them.
  let m = board.length;
  let n = board[0].length;
  let visited = Array.from({ length: m }, () => Array(n).fill(0));
  let dRow = [-1, 0, +1, 0];
  let dCol = [0, -1, 0, +1];

  function dfs(row, col) {
    // mark it visited
    visited[row][col] = 1;

    // travel in its 4 directions
    for (let i = 0; i < 4; i++) {
      let newRow = row + dRow[i];
      let newCol = col + dCol[i];
      if (
        newRow >= 0 &&
        newRow < m &&
        newCol >= 0 &&
        newCol < n &&
        !visited[newRow][newCol] &&
        board[newRow][newCol] == 1
      ) {
        dfs(newRow, newCol);
      }
    }
  }

  // check for boundary row
  for (let i = 0; i < m; i++) {
    // check for first row
    if (!visited[i][0] && board[i][0] == 1) {
      dfs(i, 0);
    }

    // check for last row
    if (!visited[i][n - 1] && board[i][n - 1] == 1) {
      dfs(i, n - 1);
    }
  }

  // check for boundary col
  for (let j = 0; j < n; j++) {
    // first col
    if (!visited[0][j] && board[0][j] == 1) {
      dfs(0, j);
    }

    // last col
    if (!visited[m - 1][j] && board[m - 1][j] == 1) {
      dfs(m - 1, j);
    }
  }

  let count = 0;
  // check and modify all O's based on visited array
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j] == 0 && board[i][j] == 1) {
        count++;
      }
    }
  }

  return count;
};

// Word Ladder [Important]
/*
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

Example 1:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
*/
var ladderLength = function (beginWord, endWord, wordList) {
  // We are given a beginWord, endWord and list
  // We need to count number of steps it took us to convert beginWord to endWord using words from list
  // let say beginWord = "hit", endWord = "cog", list = ["hot","dot","dog","lot","log","cog"]
  // we will start from "hit" and mark it level 1
  // We will take h and replace it from a-z like ait,bit, cit, dit,...zit and every time we check if list contain that word, if yes. mark it level 2
  // we have a possible guy to go on next step, now delete it from list because its been taken
  // if no, now we go to h (i) t and now we i -> a-z and check everytime like hat, hbt, hct........hzt and check list everytime and do the same if we get another possible answer or not, mark it level 2 same
  // Now same with h i (t) and mark it level 2
  // Now we move to next level and pick each guy of level 2
  // We make set of wordList so that we can search in less complexity
  // So we everytime we replace and check and delete if found and increment level
  // So this is kind of BFS we are following where we push {hit, 1} and now we run our algo with level+1 everytime till our resultant is "endWord"
  // at the end, return level that represents number of transformations
  let st = new Set(wordList);
  if (!st.has(endWord)) {
    return 0;
  }

  let q = [];
  q.push({ word: beginWord, level: 1 });
  st.delete(beginWord);

  while (q.length) {
    let ele = q.shift();
    let wrd = ele.word;
    let lvl = ele.level;

    if (wrd === endWord) {
      return lvl;
    }

    for (let i = 0; i < wrd.length; i++) {
      // Picking that character up
      let originalWord = wrd[i];
      for (let chCode = 97; chCode <= 122; chCode++) {
        // ASCII 'a' is 97 and 'z' is 122
        // In JS, strings are immutable so we cannot modify them directly so we need to create a new string with that one changed character
        // checking all possiblities of it, from a to z and putting that character and checking the set ony by one
        let ch = String.fromCharCode(chCode);
        // if that character is same as one we have already, do not check for it and continue
        if (ch === originalWord) continue;

        // make a new word with replaced character everytime and check if its a possible way
        // if yes, store it in queue
        let newWord = wrd.substring(0, i) + ch + wrd.substring(i + 1);

        if (st.has(newWord)) {
          st.delete(newWord);
          q.push({ word: newWord, level: lvl + 1 });
        }
      }
    }
  }

  return 0;
};

// Is Graph Bipartite?
/*
There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. More formally, for each v in graph[u], there is an undirected edge between node u and node v. The graph has the following properties:

There are no self-edges (graph[u] does not contain u).
There are no parallel edges (graph[u] does not contain duplicate values).
If v is in graph[u], then u is in graph[v] (the graph is undirected).
The graph may not be connected, meaning there may be two nodes u and v such that there is no path between them.
A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.

Return true if and only if it is bipartite.

Example 1:
Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other.

Example 2:
Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.
*/
var isBipartite = function (graph) {
  // Question can be modified like: We are given a undirected graph and we need to colour our graph by using only 2 type of colors, such that mo 2 adjacent nodes have same colour. So, we need to return true if we can color whole graph keeping above condition in mind else return false
  // One of the observations is: if graph contain odd number of nodes cycle, it can never be bipartite, if its contain even cycle or has linear nodes, it can be bipartite
  // We will start from node 0 to n-1 to cover all components, we apply DFS and we pick a colour 0 (initially for node 0), now we make DFS calls and mark its neighbours with different colour everytime, we need a visited array which we call colour array that gives us colour of a node initally all -1
  // If we have a neighbour which is already coloured and has same colour has parent, return false, the graph cannot be bipartite
  let n = graph.length;
  let color = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    if (color[i] == -1) {
      if (dfs(i, 0, graph, color) == false) {
        return false;
      }
    }
  }

  return true;
};

function dfs(node, col, graph, colorArray) {
  colorArray[node] = col;
  for (let neighbour of graph[node]) {
    if (colorArray[neighbour] == -1) {
      if (dfs(neighbour, !col, graph, colorArray) == false) {
        return false;
      }
    } else if (colorArray[neighbour] == col) {
      return false;
    }
  }

  return true;
}

// Number of Distinct Islands
/*
Given a boolean 2D matrix grid of size n * m. You have to find the number of distinct islands where a group of connected 1s (horizontally or vertically) forms an island. Two islands are considered to be distinct if and only if one island is not equal to another (not rotated or reflected).

Example 1:
Input:
grid[][] = {{1, 1, 0, 0, 0},
            {1, 1, 0, 0, 0},
            {0, 0, 0, 1, 1},
            {0, 0, 0, 1, 1}}
Output:
1
Explanation:
grid[][] = {{1, 1, 0, 0, 0},
            {1, 1, 0, 0, 0},
            {0, 0, 0, 1, 1},
            {0, 0, 0, 1, 1}}
Same colored islands are equal.
We have 2 equal islands, so we
have only 1 distinct island.
*/

class Solution {
  //Function to count the number of distinct islands.
  countDistinctIslands(grid) {
    // We need to collect all 1's which are in groups
    // The group can have any number of 1's in it
    // We will pick the starting 1 and do dfs on it, we will traverse all its connected 1's so one island is there
    // Now we go to any other 1 and do same
    // This way we travel all nodes of matrix and check if its a land means has value = 1 and its not visited yet, do BFS on it.
    // We go in all 8 directions of it because its been said that "group of connected 1s (horizontally or vertically) forms an island"
    // This way whenever we finish a bfs call, we do count++ and at the end we have count of number of distinct islands
    let m = grid.length;
    let n = grid[0].length;
    let visited = Array({ length: m }, () => Array(n).fill(0));
    let count = 0;
    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) {
        if (!visited[row][col] && grid[row][col] == 1) {
          this.bfs(row, col, visited, grid);
          count++;
        }
      }
    }

    return count;
  }

  bfs(row, col, visited, grid) {
    visited[row][col] = 1;
    let q = [];
    q.push({ r: row, c: col });
    let m = grid.length;
    let n = grid[0].length;

    while (q.length) {
      let ele = q.shift();
      let dRow = ele.r;
      let dCol = ele.c;

      // Traverse in 8 directions
      // If we write down all 8 directions on basis of row,col
      // We see row goes like row -1 , row, row+1
      // col goes like col-1, col, col+1
      // This way we can simplify these traversal using only 2 loops
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let directionRow = dRow + i;
          let directionCol = dCol + j;
          if (
            directionRow < m &&
            directionRow >= 0 &&
            directionCol < n &&
            directionCol >= 0 &&
            !visited[directionRow][directionCol] &&
            grid[directionRow][directionCol] === 1
          ) {
            visited[directionRow][directionCol] = 1;
            q.push({ r: directionRow, c: directionCol });
          }
        }
      }
    }
  }
}
