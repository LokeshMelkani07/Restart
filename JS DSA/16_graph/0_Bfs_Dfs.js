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
