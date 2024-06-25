// Notes: https://drive.google.com/file/d/1GvGufFc21t4TahGqTHN51am-ByA3lfQd/view?usp=sharing
// DP on Squares

// Maximal Rectangle
// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
var maximalRectangle = function (matrix) {
  // We will use the logic of Maximum area in a historgram
  // Here we will pick each row and send it as a array to maxHistogram function and get the result area array for that row
  // As we move to next row, we keep on adding value to each block if arr[i]==1 then do curr[i] += 1 and if arr[i]=0 then make cur[i]=0
  // and again send curr array to maxhistogram
  // Everytime store the max value of area
  if (matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxArea = 0;

  // Calculate the histogram heights for each row
  const heights = new Array(cols).fill(0);

  for (let i = 0; i < rows; i++) {
    // Update heights array based on current row
    for (let j = 0; j < cols; j++) {
      heights[j] = matrix[i][j] === "1" ? heights[j] + 1 : 0;
    }

    // Calculate the largest rectangle area for the current row
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
};

// Helper function to calculate the largest rectangle area in a histogram
// This function find maxArea in a histogram for that array
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    while (
      stack.length > 0 &&
      (i === heights.length || heights[i] < heights[stack[stack.length - 1]])
    ) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }

  return maxArea;
}

// Maximum sum Rectangle
// Given a 2D matrix M of dimensions RxC. Find the maximum sum submatrix in it.
// Input: R=4, C=5
// M=[[1,2,-1,-4,-20], [-8,-3,4,2,1], [3,8,10,1,3], [-4,-1,1,7,-6]]
// Output: 29
// We need to find maximum sum submatrix in the given matrix
class Solution {
  kadane(arr) {
    let maxi = -Infinity;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      if (sum < 0) {
        sum = 0;
      }
      maxi = Math.max(maxi, sum);
    }
    return maxi;
  }

  maximumSumRectangle(R, C, M) {
    // We can make a row matrix in which we have row equal to Matrix M
    // Humare paas matrix hain, hum kya kar rahe h ki
    // Har baar, C0+C0 ek array bnayega isko hum kadane's algo ki help se maximum sum subrray considering negatives nikalenge and store in a variable 'sum', now for C0+C1 again ek coulmn bnegi jo ki hoga ek array hi, we send this array ot kadane, get sum and if its >previousSum then update 'sum' variable, now do same for C0+C2...same for C0+CN
    // Now we do this for C1+C1, C1+C2...C1+CN and update 'sum' if found any max sum
    // Now for C2 + C2, C2+C3...C2+Cn and so on
    // We will Travel from col 0 and col 0 , col 0 and col 1..... col 0 and col C
    // Evertime we store the sum of Col 0 and Col 1 and so on and after storing we use kadane's algo
    // To find the maximum sum inside that array considering negatives also in efficient manner
    // This way we will then do for C1 - C2, C1-C3, C1-C4 and so on
    // Evertime we will store the maximum answer inside our variable
    let sum = Array(R).fill(0);
    let maxVal = -Infinity;
    for (let cStart = 0; cStart < C; cStart++) {
      sum.fill(0);
      for (let cEnd = cStart; cEnd < C; cEnd++) {
        for (let row = 0; row < R; row++) {
          sum[row] += M[row][cEnd];
        }
        let kadaneResult = this.kadane(sum); // Use this to refer to class methods
        maxVal = Math.max(maxVal, kadaneResult);
      }
    }
    return maxVal;
  }
}

// Count Square Submatrices with All Ones
/*
Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.

Example 1:
Input: matrix =
[
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]
Output: 15
Explanation:
There are 10 squares of side 1.
There are 4 squares of side 2.
There is  1 square of side 3.
Total number of squares = 10 + 4 + 1 = 15.

Example 2:
Input: matrix =
[
  [1,0,1],
  [1,1,0],
  [1,1,0]
]
Output: 7
Explanation:
There are 6 squares of side 1.
There is 1 square of side 2.
Total number of squares = 6 + 1 = 7.
*/
var countSquares = function (matrix) {
  // In DP on rectangle problems, we generally solve using tabulation instead of memoisation
  // We make a DP table in which dp[i][j] = number of submatrices considering dp[i][j] as last block of that submatrix in bottom right corner
  let n = matrix.length; // row size
  let m = matrix[0].length; // col size

  let dp = Array.from({ length: n }, () => Array(n).fill(0));

  // fill 1st row and 1st col as it is
  // 1st row and 1st col can make only 1 or 0 submatrix based on their value with themself only
  // So copy first row and first column, as it is
  for (let i = 0; i < n; i++) {
    dp[i][0] = matrix[i][0];
  }

  for (let j = 0; j < m; j++) {
    dp[0][j] = matrix[0][j];
  }

  // Start processing of dp table
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (matrix[i][j] == 0) {
        // it is a binary matrix so if element is 0 means no count in submatric for that block
        dp[i][j] = 0;
      } else {
        // here, means element is 1
        // Take minimum of diagnol,up, down from DP table
        // +1 for counting the element itself
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      sum += dp[i][j];
    }
  }

  return sum;
};
