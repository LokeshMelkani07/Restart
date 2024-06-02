// Matrix Chain Multiplication (Partition DP starts)
// Notes: https://drive.google.com/file/d/1KsF11eTanUrijkV9RTEq47jkhNSXZGth/view?usp=sharing
// Notes Part 2: https://drive.google.com/file/d/1s2wjJQ5Oiga2ebot0XFqJspa5JEjH_P6/view?usp=sharing
/*
Given a sequence of matrices, find the most efficient way to multiply these matrices together. The efficient way is the one that involves the least number of multiplications.
The dimensions of the matrices are given in an array arr[] of size N (such that N = number of matrices + 1) where the ith matrix has the dimensions (arr[i-1] x arr[i]).

Example 1:
Input: N = 5
arr = {40, 20, 30, 10, 30}
Output: 26000
Explanation: There are 4 matrices of dimension
40x20, 20x30, 30x10, 10x30. Say the matrices are
named as A, B, C, D. Out of all possible combinations,
the most efficient way is (A*(B*C))*D.
The number of operations are -
20*30*10 + 40*20*10 + 40*10*30 = 26000.
*/
class Solution {
  matrixMultiplication(arr, n) {
    // Top Down approach
    // TC: O(n^3), SC: O(n^2) + O(n)
    // Refer the notes
    let dp = Array.from({ length: n }, () => Array(n).fill(-1));
    let ans = this.helper(1, n - 1, dp, arr);
    return ans;
  }

  helper(i, j, dp, arr) {
    let mini = +Infinity;
    if (i === j) return 0;
    if (dp[i][j] != -1) return dp[i][j];

    for (let k = i; k <= j - 1; k++) {
      let steps =
        arr[i - 1] * arr[k] * arr[j] +
        this.helper(i, k, dp, arr) +
        this.helper(k + 1, j, dp, arr);
      if (steps < mini) mini = steps;
    }

    return (dp[i][j] = mini);
  }

  // MCM Tabulation Approach
  matrixMultiplicationTabulation(arr, n) {
    // Bottom up approach
    // Refer the notes
    let dp = Array.from({ length: n }, () => Array(n).fill(-1));
    for (let i = 1; i < n; i++) {
      dp[i][i] = 0;
    }

    for (let i = n - 1; i >= 1; i--) {
      for (let j = i + 1; j < n; j++) {
        let mini = +Infinity;
        for (let k = i; k <= j - 1; k++) {
          let steps = arr[i - 1] * arr[k] * arr[j] + dp[i][k] + dp[k + 1][j];
          if (steps < mini) mini = steps;
        }

        dp[i][j] = mini;
      }
    }

    return dp[1][n - 1];
  }
}

// Minimum Cost to Cut a Stick
// Notes: https://drive.google.com/file/d/1RCEMkN0r9pMrSHDyWkSrSXWCleKNtStQ/view?usp=sharing
/*
Given a wooden stick of length n units. The stick is labelled from 0 to n. For example, a stick of length 6 is labelled as follows:
Given an integer array cuts where cuts[i] denotes a position you should perform a cut at.
You should perform the cuts in order, you can change the order of the cuts as you wish.
The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut). Please refer to the first example for a better explanation.Return the minimum total cost of the cuts.

Example 1:
Input: n = 7, cuts = [1,3,4,5]
Output: 16
Explanation: Using cuts order = [1, 3, 4, 5] as in the input leads to the following scenario:

The first cut is done to a rod of length 7 so the cost is 7. The second cut is done to a rod of length 6 (i.e. the second part of the first cut), the third is done to a rod of length 4 and the last cut is to a rod of length 3. The total cost is 7 + 6 + 4 + 3 = 20.
Rearranging the cuts to be [3, 5, 1, 4] for example will lead to a scenario with total cost = 16 (as shown in the example photo 7 + 4 + 3 + 2 = 16).
*/
var minCost = function (n, cuts) {
  // add 0 and n in cuts array and sort it
  cuts.sort((a, b) => a - b);
  cuts.push(n);
  cuts.unshift(0);
  let memo = Array.from({ length: cuts.length }, () =>
    Array(cuts.length).fill(-1)
  );
  let ans = helper(cuts, 0, cuts.length - 1, memo);
  return ans;
};

function helper(cuts, i, j, memo) {
  if (j - i <= 1) return 0; // Base case: no cuts between i and j

  if (memo[i][j] !== -1) return memo[i][j]; // Return memoized value if available

  let mini = Infinity;
  for (let k = i + 1; k < j; k++) {
    let cost =
      cuts[j] - cuts[i] + helper(cuts, i, k, memo) + helper(cuts, k, j, memo);
    mini = Math.min(mini, cost);
  }

  memo[i][j] = mini; // Memoize the result
  return mini;
}

// Burst Balloons
// Notes: https://drive.google.com/file/d/1RCEMkN0r9pMrSHDyWkSrSXWCleKNtStQ/view?usp=sharing
/*
You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.
If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.
Return the maximum coins you can collect by bursting the balloons wisely.

Example 1:
Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
*/
var maxCoins = function (nums) {
  let n = nums.length;
  let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));
  nums.push(1);
  nums.unshift(1);
  let ans = helper(nums, 1, n, dp);
  return ans;
};

function helper(nums, i, j, dp) {
  // Base case
  if (i > j) return 0;
  if (dp[i][j] !== -1) return dp[i][j]; // Return memoized value if available

  let maxCoins = -Infinity;
  for (let k = i; k <= j; k++) {
    let coins =
      nums[i - 1] * nums[k] * nums[j + 1] +
      helper(nums, i, k - 1, dp) +
      helper(nums, k + 1, j, dp);
    maxCoins = Math.max(maxCoins, coins);
  }

  dp[i][j] = maxCoins; // Memoize the result
  return maxCoins;
}

// Tabulation Approach
var maxCoinsTabulation = function (nums) {
  let n = nums.length;
  // we make length: n+2 so that when we call dp[ind+1] it does not go out of bound
  let dp = Array.from({ length: n + 2 }, () => Array(n + 2).fill(0));
  nums.push(1);
  nums.unshift(1);
  // Tabulation approach
  for (let i = n; i >= 1; i--) {
    for (let j = 1; j <= n; j++) {
      // covering the base case, for i>j we do not do anything
      if (i > j) continue;
      let maxCoins = -Infinity;
      for (let k = i; k <= j; k++) {
        // we make dp array length to be n+2 so that dp[k+1] does not go out of bound
        let coins =
          nums[i - 1] * nums[k] * nums[j + 1] + dp[i][k - 1] + dp[k + 1][j];
        maxCoins = Math.max(maxCoins, coins);
      }
      dp[i][j] = maxCoins;
    }
  }

  return dp[1][n];
};

// Palindrome Partitioning II
// Notes: https://drive.google.com/file/d/1ILQHkEle3KxhnlWGM9_kRjJi94fuwCwH/view?usp=sharing
/*
Given a string s, partition s such that every substring of the partition is a palindrome.Return the minimum cuts needed for a palindrome partitioning of s.

Example 1:
Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
*/
var minCut = function (s) {
  // Top Down Approach
  // TC: O(N) * O(N) = O(N^2), SC: O(N) + O(N) aux space
  let n = s.length;
  let dp = Array(n).fill(-1);
  let ans = helper(0, n, s, dp);
  // we do ans -1 because our code makes extra partition at the end of string which is not needed then it calls for base case
  return ans - 1;
};

function helper(i, n, s, dp) {
  if (i == n) return 0;
  if (dp[i] != -1) return dp[i];
  let minCost = +Infinity;

  for (let j = i; j < n; j++) {
    if (isPalindrome(i, j, s)) {
      let cost = 1 + helper(j + 1, n, s, dp);
      minCost = Math.min(minCost, cost);
    }
  }

  return (dp[i] = minCost);
}

function isPalindrome(i, j, s) {
  while (i < j) {
    if (s[i] != s[j]) return false;
    i++;
    j--;
  }

  return true;
}

// Tabulation approach
var minCut = function (s) {
  // Top Down Approach
  let n = s.length;
  let dp = Array(n + 1).fill(0);
  dp[n] = 0;
  // i goes from 0 to n in top down approach so it goes form n to 0 in bottom up approach
  // j goes from i to n in top down so its goes from n to i in bottom up
  for (let i = n - 1; i >= 0; i--) {
    let minCost = +Infinity;
    for (let j = i; j < n; j++) {
      if (isPalindrome(i, j, s)) {
        let cost = 1 + dp[j + 1];
        minCost = Math.min(minCost, cost);
      }
    }
    dp[i] = minCost;
  }

  return dp[0] - 1;
};

function isPalindrome(i, j, s) {
  while (i < j) {
    if (s[i] != s[j]) return false;
    i++;
    j--;
  }

  return true;
}

// Partition Array for Maximum Sum
// Notes: https://drive.google.com/file/d/1ILQHkEle3KxhnlWGM9_kRjJi94fuwCwH/view?usp=sharing
/*
Given an integer array arr, partition the array into (contiguous) subarrays of length at most k. After partitioning, each subarray has their values changed to become the maximum value of that subarray. Return the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
Input: arr = [1,15,7,9,2,5,10], k = 3
Output: 84
Explanation: arr becomes [15,15,15,9,10,10,10]
*/
var maxSumAfterPartitioning = function (arr, k) {
  // Top Down Approach
  let n = arr.length;
  let dp = Array(n + 1).fill(-1);
  let ans = helper(0, n, k, arr, dp);
  return ans;
};

function helper(i, n, k, arr, dp) {
  if (i == n) return 0;
  if (dp[i] != -1) return dp[i];
  let maxAns = -Infinity;
  let maxi = -Infinity;
  let len = 0;
  for (let j = i; j < Math.min(i + k, n); j++) {
    len++;
    maxi = Math.max(maxi, arr[j]);
    let sum = len * maxi + helper(j + 1, n, k, arr, dp);
    maxAns = Math.max(maxAns, sum);
  }

  return (dp[i] = maxAns);
}

// Tabulation Code
var maxSumAfterPartitioning = function (arr, k) {
  // Bottom Up Approach
  let n = arr.length;
  let dp = Array(n + 1).fill(0);
  dp[n] = 0;

  for (let i = n - 1; i >= 0; i--) {
    let maxAns = -Infinity;
    let maxi = -Infinity;
    let len = 0;
    for (let j = i; j < Math.min(i + k, n); j++) {
      len++;
      maxi = Math.max(maxi, arr[j]);
      let sum = len * maxi + dp[j + 1];
      maxAns = Math.max(maxAns, sum);
    }

    dp[i] = maxAns;
  }

  return dp[0];
};
