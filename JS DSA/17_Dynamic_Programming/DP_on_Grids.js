// DP on Grids
// Notes: https://drive.google.com/file/d/1DYjPZ9wI5zVbUX1cBUvZqQlicT_xgmWQ/view?usp=sharing

// Geek's Training
/*
Geek is going for n days training program, he can perform any one of these three activities Running, Fighting, and Learning Practice. Each activity has some point on each day. as Geek wants to improve all his skills, he can't do the same activity on two consecutive days, help Geek to maximize his merit points as we were given a 2D array of n*3 points corresponding to each day and activity.

Example:
Input:
n = 3
point= [[1,2,5],[3,1,1],[3,3,3]]
Output:
11
Explanation:
Geek will learn a new move and earn 5 point then on second
day he will do running and earn 3 point and on third day
he will do fighting and earn 3 points so, maximum point is 11.
*/
function maximumPoints(points, n) {
  // Top Down Approach
  // We need to keep track to last activity we have chosen as we cannot choose same activity for 2 consecutive days
  // We will make a variable 'last' which we pass in the function which takes values 0,1,2,3
  // 0-> task 0, 1 -> task 1, 2 -> task 2, 3 -> no task chosen
  // initially we pass index = n-1 and last = 3 (no task chosen)
  // index represents day number, its top down approach so we start from n-1
  // we will go to each possible task and try to gain maximum points
  // We will make a DP array of size [N][4] as value of ind = 0 to N and last = 0 to 3
  let dp = Array.from({ length: n }, () => Array(4).fill(-1));
  return helper(n - 1, 3, points, dp);
}

function helper(ind, last, points, dp) {
  // base case
  // we will reach index = 0, now we have options to choose any activity other than last we have chosen
  if (ind == 0) {
    let maxi = 0;
    for (let i = 0; i <= 2; i++) {
      if (i != last) {
        // choose any acitivty other than last chosen, get the one with maximum points on 0th day and return
        maxi = Math.max(maxi, points[0][i]);
      }
    }

    return maxi;
  }

  if (dp[ind][last] != -1) {
    return dp[ind][last];
  }

  // Now we pick any activity other than last
  let maxPoints = 0;
  for (let i = 0; i <= 2; i++) {
    let point = 0;
    if (i != last) {
      point = points[ind][i] + helper(ind - 1, i, points, dp);
    }
    maxPoints = Math.max(maxPoints, point);
  }

  return (dp[ind][last] = maxPoints);
}

// Bottom Up Approach
function tabulationmaximumPoints(points, n) {
  let dp = Array.from({ length: n }, () => Array(4).fill(0));

  // In Tabulation
  // We go ind = 0 to N, last = 0 to 3 again
  // Base case if for ind = 0, we find max of all acitivties chosen other than last
  // dp[N+1][4] where [N+1] means days, 4 means last
  // Base case dp[0][0] represents maximum points we can get on 0th day if we have chosen activity 0 on previous day which will be max(dp[0][1],dp[0][2])
  // dp[0][1] means max(dp[0][2],dp[0][0])
  // dp[0][2] means max(dp[0][0],dp[0][1])
  // dp[0][3] means max(dp[0][1],dp[0][2], dp[0][3])

  dp[0][0] = Math.max(dp[0][1], dp[0][2]);
  dp[0][1] = Math.max(dp[0][0], dp[0][2]);
  dp[0][2] = Math.max(dp[0][0], dp[0][1]);
  dp[0][3] = Math.max(dp[0][0], dp[0][1], dp[0][2]);

  for (let ind = 1; ind < n; ind++) {
    for (let last = 0; last < 4; last++) {
      dp[ind][last] = 0;
      // Now we pick any activity other than last
      for (let task = 0; task < 3; task++) {
        if (task != last) {
          let point = points[ind][task] + dp[ind - 1][task];
          dp[ind][last] = Math.max(dp[ind][last], point);
        }
      }
    }
  }

  return dp[n - 1][3];
}

// Unique Paths
/*
There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 109.

Example 2:
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
*/

var uniquePaths = function (m, n) {
  // Top Down approach
  // We will start from (m-1,n-1) index and try to move to (0,0)
  // We will have 2 options Up -> i-1,j and Left -> i,j-1
  // We reach our base case if we reach (0,0) or we reach out of boundary
  // We need to return total number of ways so we return 0 or 1 for successful or unsuccessful ways
  let dp = Array.from({ length: m }, () => Array(n).fill(-1));
  return helper(m - 1, n - 1, dp);
};

function helper(ind1, ind2, dp) {
  // base case
  if (ind1 == 0 && ind2 == 0) {
    return 1;
  }

  // if we go out of bound
  if (ind1 < 0 || ind2 < 0) {
    return 0;
  }

  if (dp[ind1][ind2] != -1) {
    return dp[ind1][ind2];
  }

  // Calculate number of ways
  let up = helper(ind1 - 1, ind2, dp);
  let left = helper(ind1, ind2 - 1, dp);

  return (dp[ind1][ind2] = up + left);
}

// Bottom Up
var uniquePathsTabulation = function (m, n) {
  // Bottom Up
  let dp = Array.from({ length: m }, () => Array(n).fill(0));

  for (let ind1 = 0; ind1 < m; ind1++) {
    for (let ind2 = 0; ind2 < n; ind2++) {
      if (ind1 == 0 && ind2 == 0) {
        dp[0][0] = 1;
      } else {
        let up = 0,
          left = 0;
        if (ind1 > 0) {
          // then we can move up means no out of bound comes
          up = dp[ind1 - 1][ind2];
        }

        if (ind2 > 0) {
          // we can move left
          left = dp[ind1][ind2 - 1];
        }

        dp[ind1][ind2] = up + left;
      }
    }
  }

  return dp[m - 1][n - 1];
};

// Space Optimisation
var uniquePathsSpaceOptimised = function (m, n) {
  // Space Optimisation
  let prev = Array(n).fill(0);

  for (let ind1 = 0; ind1 < m; ind1++) {
    let curr = Array(n).fill(0);
    for (let ind2 = 0; ind2 < n; ind2++) {
      if (ind1 == 0 && ind2 == 0) {
        curr[0] = 1;
      } else {
        let up = 0,
          left = 0;
        if (ind1 > 0) {
          // then we can move up means no out of bound comes
          up = prev[ind2];
        }

        if (ind2 > 0) {
          // we can move left
          left = curr[ind2 - 1];
        }

        curr[ind2] = up + left;
      }
    }
    prev = curr;
  }

  return prev[n - 1];
};

// Unique Paths II
/*
You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to 2 * 109.

Example 1:
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
*/
var uniquePathsWithObstacles = function (obstacleGrid) {
  // Same as Unique Path-1
  // Just that now we need to add one more base condition that if we reach nay dead cell i.e cell with value 1 means its a obstackle so return 0 as there is no way ahead, rest everything remains same as previous code
  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;
  return uniquePaths(m, n, obstacleGrid);
};

var uniquePaths = function (m, n, obstacleGrid) {
  // Top Down approach
  // We will start from (m-1,n-1) index and try to move to (0,0)
  // We will have 2 options Up -> i-1,j and Left -> i,j-1
  // We reach our base case if we reach (0,0) or we reach out of boundary
  // We need to return total number of ways so we return 0 or 1 for successful or unsuccessful ways
  let dp = Array.from({ length: m }, () => Array(n).fill(-1));
  return helper(m - 1, n - 1, obstacleGrid, dp);
};

function helper(ind1, ind2, obstacleGrid, dp) {
  // check for obstackles
  if (ind1 >= 0 && ind2 >= 0 && obstacleGrid[ind1][ind2] == 1) {
    return 0;
  }

  // base case
  if (ind1 == 0 && ind2 == 0) {
    return 1;
  }

  // if we go out of bound
  if (ind1 < 0 || ind2 < 0) {
    return 0;
  }

  if (dp[ind1][ind2] != -1) {
    return dp[ind1][ind2];
  }

  // Calculate number of ways
  let up = helper(ind1 - 1, ind2, obstacleGrid, dp);
  let left = helper(ind1, ind2 - 1, obstacleGrid, dp);

  return (dp[ind1][ind2] = up + left);
}

// Minimum Path Sum
/*
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example 1:
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

Example 2:
Input: grid = [[1,2,3],[4,5,6]]
Output: 12
*/

// Top Down Approach
var minPathSum = function (grid) {
  // Top Down Approach
  // We need to return minimum path sum
  // Path we can take is either down or right
  // We will use same approach, we start from index m-1,n-1 and go till 0,0
  // we go left or up and take min(left,up)
  // base case is when we reach 0,0 then return the grid[0][0]
  // if we reach out of bound return something that does not impact our result till now as we are taking minimum so return INT_MIN
  let m = grid.length;
  let n = grid[0].length;
  let dp = Array.from({ length: m }, () => Array(n).fill(-1));
  return helper(m - 1, n - 1, grid, dp);
};

function helper(ind1, ind2, grid, dp) {
  if (ind1 == 0 && ind2 == 0) {
    return grid[0][0];
  }

  if (ind1 < 0 || ind2 < 0) {
    return +Infinity;
  }

  if (dp[ind1][ind2] != -1) {
    return dp[ind1][ind2];
  }

  let up = grid[ind1][ind2] + helper(ind1 - 1, ind2, grid, dp);
  let left = grid[ind1][ind2] + helper(ind1, ind2 - 1, grid, dp);

  return (dp[ind1][ind2] = Math.min(up, left));
}

// Bottom Up Approach
var minPathSumTabulation = function (grid) {
  // Bottom Up Approach
  let m = grid.length;
  let n = grid[0].length;
  let dp = Array.from({ length: m }, () => Array(n).fill(0));

  for (let ind1 = 0; ind1 < m; ind1++) {
    for (let ind2 = 0; ind2 < n; ind2++) {
      if (ind1 == 0 && ind2 == 0) {
        dp[ind1][ind2] = grid[0][0];
      } else {
        // if ind1 and ind2 are valid indexes, fill values else fill Infinity in them so that we neglect them while taking math.min
        let up = 0,
          left = 0;
        if (ind1 > 0) {
          up = grid[ind1][ind2] + dp[ind1 - 1][ind2];
        } else {
          up = 1e9;
        }

        if (ind2 > 0) {
          left = grid[ind1][ind2] + dp[ind1][ind2 - 1];
        } else {
          left = 1e9;
        }

        dp[ind1][ind2] = Math.min(up, left);
      }
    }
  }

  return dp[m - 1][n - 1];
};

// Space Optimisation
var minPathSumSpaceOptimised = function (grid) {
  // Space Optimisation Approach
  let m = grid.length;
  let n = grid[0].length;

  let prev = Array(n).fill(0);

  for (let ind1 = 0; ind1 < m; ind1++) {
    let curr = Array(n).fill(0);
    for (let ind2 = 0; ind2 < n; ind2++) {
      if (ind1 == 0 && ind2 == 0) {
        curr[ind2] = grid[0][0];
      } else {
        // if ind1 and ind2 are valid indexes, fill values else fill Infinity in them so that we neglect them while taking math.min
        let up = 0,
          left = 0;
        if (ind1 > 0) {
          up = grid[ind1][ind2] + prev[ind2];
        } else {
          up = 1e9;
        }

        if (ind2 > 0) {
          left = grid[ind1][ind2] + curr[ind2 - 1];
        } else {
          left = 1e9;
        }

        curr[ind2] = Math.min(up, left);
      }
    }
    prev = curr;
  }

  return prev[n - 1];
};

// Notes2: https://drive.google.com/file/d/1Es_sGEQGi8k8UP0ufe_boOFc1Ik4M0-A/view?usp=sharing

// Triangle
/*
Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

Example 1:
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
*/

// Top Down Approach
var minimumTotal = function (triangle) {
  // Top Down Approach
  // In this problem, our starting point is fixed but our ending point differs everytime because we just need to reach to last row of triangle and in that way we can either move down or diagnol and get minimum path sum this way
  // We will start from index 0,0 and move till last row and we do not check out of bound because we only move down and diagnol
  // for every element there is a down element will last index for which we are writing a base case
  // for every element except that of last row, we have diagnol element for all so no need to check out of bound for diagnol element
  // We will try to reach the base case of last row where col is not fixed as we can have any ending column
  let m = triangle.length;
  let dp = Array.from({ length: m }, () => Array(m).fill(-1));
  return helper(0, 0, triangle, dp);
};

function helper(ind1, ind2, triangle, dp) {
  if (ind1 == triangle.length - 1) {
    return triangle[ind1][ind2];
  }

  if (dp[ind1][ind2] != -1) {
    return dp[ind1][ind2];
  }

  // We can either move down or diagnol
  let down = triangle[ind1][ind2] + helper(ind1 + 1, ind2, triangle, dp);
  let diagnol = triangle[ind1][ind2] + helper(ind1 + 1, ind2 + 1, triangle, dp);

  return (dp[ind1][ind2] = Math.min(down, diagnol));
}

// Bottom Up
var minimumTotal = function (triangle) {
  // Bottom up Approach
  // In triangle, we know max number of cols can be = max number of rows
  // We declare dp of n*n where n = number of rows
  // Base case, we fill for n-1th row, for all values of j we will triangle[n-1][j]
  // In recursion we went from 0 to n-1 as starting point is fixed but ending point is variable
  // In tabulation we will go from n-1 to 0
  let m = triangle.length;
  let dp = Array.from({ length: m }, () => Array(m).fill(0));

  for (let j = 0; j < m; j++) {
    dp[m - 1][j] = triangle[m - 1][j];
  }

  // Now we move from n-2th row to 0th row
  // we move from ith col to 0th col as max number of col in triangle = total number of rows
  for (let ind1 = m - 2; ind1 >= 0; ind1--) {
    for (let ind2 = ind1; ind2 >= 0; ind2--) {
      // We can either move down or diagnol
      let down = triangle[ind1][ind2] + dp[ind1 + 1][ind2];
      let diagnol = triangle[ind1][ind2] + dp[ind1 + 1][ind2 + 1];

      dp[ind1][ind2] = Math.min(down, diagnol);
    }
  }

  return dp[0][0];
};

// Space Optimisation
var minimumTotal = function (triangle) {
  // Space Optimisation
  // To fill any row, we just need its next row
  // To fill n-2th row, we use n-1th row and go down or diagnol so
  let m = triangle.length;
  let front = Array(m).fill(0);

  for (let j = 0; j < m; j++) {
    front[j] = triangle[m - 1][j];
  }

  // Now we move from n-2th row to 0th row
  // we move from ith col to 0th col as max number of col in triangle = total number of rows
  for (let ind1 = m - 2; ind1 >= 0; ind1--) {
    let curr = Array(m).fill(0);
    for (let ind2 = ind1; ind2 >= 0; ind2--) {
      // We can either move down or diagnol
      let down = triangle[ind1][ind2] + front[ind2];
      let diagnol = triangle[ind1][ind2] + front[ind2 + 1];

      curr[ind2] = Math.min(down, diagnol);
    }
    front = curr;
  }

  return front[0];
};

// Minimum Falling Path Sum
/*
Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).
*/
var minFallingPathSum = function (matrix) {
  // Top Down Approach
  // We have a variable starting point and variable ending point
  // This time we can move either directly down, diagnolly left on down, diagnolly right on down
  // We need to return minimum path sum this way
  // As we have Variable starting points and ending points and as its a recursion we go from n-1 to 0 so we take variables ending points and store the max one in the answer
  // We will go till first row for any given jth col
  // For every element we have 3 choices, either go staright up, left diagnol or right diagnol
  // Our base case comes when we reach i == 0
  // Other base case is if we go out of bound while going for diagnol so return something which does not effect our max(ans) so we return -infinity
  // At the end, return min(all ending points);
  let m = matrix.length;
  let n = matrix[0].length;
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));
  let maxi = 1e8;

  for (let j = 0; j < n; j++) {
    maxi = Math.min(maxi, helper(m - 1, j, matrix, dp));
  }

  return maxi;
};

function helper(ind1, ind2, matrix, dp) {
  if (ind2 < 0 || ind2 >= matrix[0].length) {
    return 1e8;
  }

  if (ind1 == 0) {
    return matrix[0][ind2];
  }

  if (dp[ind1][ind2] != -1) {
    return dp[ind1][ind2];
  }

  let up = matrix[ind1][ind2] + helper(ind1 - 1, ind2, matrix, dp);
  // left diagnol
  let ld = matrix[ind1][ind2] + helper(ind1 - 1, ind2 - 1, matrix, dp);
  // right diagnol
  let rd = matrix[ind1][ind2] + helper(ind1 - 1, ind2 + 1, matrix, dp);

  return (dp[ind1][ind2] = Math.min(up, rd, ld));
}

// Bottom Up
var minFallingPathSum = function (matrix) {
  // Bottom Up
  let m = matrix.length;
  let n = matrix[0].length;
  let dp = Array.from({ length: m }, () => Array(n).fill(0));

  for (let j = 0; j < n; j++) {
    dp[0][j] = matrix[0][j];
  }

  for (let ind1 = 1; ind1 < m; ind1++) {
    for (let ind2 = 0; ind2 < n; ind2++) {
      let up = matrix[ind1][ind2] + dp[ind1 - 1][ind2];
      // left diagnol
      let ld = 0,
        rd = 0;
      if (ind2 - 1 >= 0) {
        ld = matrix[ind1][ind2] + dp[ind1 - 1][ind2 - 1];
      } else {
        ld = 1e8;
      }
      // right diagnol
      if (ind2 + 1 < n) {
        rd = matrix[ind1][ind2] + dp[ind1 - 1][ind2 + 1];
      } else {
        rd = 1e8;
      }
      dp[ind1][ind2] = Math.min(up, rd, ld);
    }
  }

  let maxi = 1e8;

  for (let j = 0; j < n; j++) {
    maxi = Math.min(maxi, dp[m - 1][j]);
  }

  return maxi;
};

// Chocolates Pickup
/*
You are given an r rows and c cols matrix grid representing a field of chocolates where grid[i][j] represents the number of chocolates that you can collect from the (i, j) cell.

You have two robots that can collect chocolates for you:

Robot #1 is located at the top-left corner (0, 0), and
Robot #2 is located at the top-right corner (0, cols - 1).
Return the maximum number of chocolates collection using both robots by following the rules below:

From a cell (i, j), robots can move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1).
When any robot passes through a cell, It picks up all chocolates, and the cell becomes an empty cell.
When both robots stay in the same cell, only one takes the chocolates.
Both robots cannot move outside of the grid at any moment.
Both robots should reach the bottom row in grid.

Example:
Input:
r = 3, c = 4
grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
Output:
24
Explanation:
Path of robot #1 and #2 are described in color green and blue respectively. Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12. Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12. Total of cherries: 12 + 12 = 24.
*/
class Solution {
  solve(n, m, grid) {
    // 3D DP
    // we will start traversing from first row and go till last row
    // Both Robots has fixed starting point i.e 0,0 and 0,c-1
    // Both move simultaneously means both increment their row by +1 at a time
    // Both Robot can move in 3 directions only, down, left diagnol, right diagnol
    // For every movement of Robot 1, there can be 3 possible movements for Robot 2 and vice-versa
    // We take each movement into consideration and run 2 loop which go from -1,0,+1
    // These loop takes into account all 9 cases of movement done by Robot 1 and Robot 2
    // if both robots are at same column we consider only one in the result
    // Otherwise we include both in the result
    let dp = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => Array(m).fill(-1))
    );
    return this.helper(0, 0, m - 1, n, m, grid, dp);
  }

  helper(i, j1, j2, n, m, grid, dp) {
    // Base case
    // If any of the Robot goes out of bound while covering diagnols then we take care of this case
    if (j1 < 0 || j2 < 0 || j1 >= m || j2 >= m) {
      return -1e8;
    }

    // if we are at last row, thats a base case
    if (i == n - 1) {
      // if both end at same col, consider only once
      if (j1 == j2) {
        return grid[i][j1];
      } else {
        return grid[i][j1] + grid[i][j2];
      }
    }

    if (dp[i][j1][j2] != -1) {
      return dp[i][j1][j2];
    }

    // Now Consider all possible ways
    let maxi = -1e8;
    for (let move1 = -1; move1 <= +1; move1++) {
      for (let move2 = -1; move2 <= +1; move2++) {
        let value = 0;
        if (j1 == j2) {
          value = grid[i][j1];
        } else {
          value = grid[i][j1] + grid[i][j2];
        }
        value += this.helper(i + 1, j1 + move1, j2 + move2, n, m, grid, dp);
        maxi = Math.max(maxi, value);
      }
    }

    return (dp[i][j1][j2] = maxi);
  }
}

// Bottom Up
function tabulationsolve(n, m, grid) {
  // Tabulation Approach
  // We take dp[n][m][m]
  // We have a base case of row = n-1, means for row = n-1, j1 and j2 can have multiple values from 0 to m-1 so we write 2 for loops for it
  // Now Our row goes from 0 to n-1 in recursion so in tabulation we go from n-1 to 0, but n-1 case already covered in base case
  // So our row loop start from n-2 to 0
  // our j1 and j2 remains same from 0 to m-1
  // Copy the recurrence but keep in mind while covering all 9 cases of directions, it should not go out of bound and it it does, store -1e8
  // at the end return dp[0][0][m-1]
  let dp = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => Array(m).fill(0))
  );

  // base case
  for (let j1 = 0; j1 < m; j1++) {
    for (let j2 = 0; j2 < m; j2++) {
      if (j1 == j2) {
        dp[n - 1][j1][j2] = grid[n - 1][j1];
      } else {
        dp[n - 1][j1][j2] = grid[n - 1][j1] + grid[n - 1][j2];
      }
    }
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j1 = 0; j1 < m; j1++) {
      for (let j2 = 0; j2 < m; j2++) {
        // Now Consider all possible ways
        let maxi = -1e8;
        for (let move1 = -1; move1 <= +1; move1++) {
          for (let move2 = -1; move2 <= +1; move2++) {
            let value = 0;
            if (j1 == j2) {
              value = grid[i][j1];
            } else {
              value = grid[i][j1] + grid[i][j2];
            }
            if (
              j1 + move1 >= 0 &&
              j2 + move2 >= 0 &&
              j1 + move1 < m &&
              j2 + move2 < m
            ) {
              value += dp[i + 1][j1 + move1][j2 + move2];
            } else {
              value += -1e8;
            }
            maxi = Math.max(maxi, value);
          }
        }

        dp[i][j1][j2] = maxi;
      }
    }
  }

  return dp[0][0][m - 1];
}
