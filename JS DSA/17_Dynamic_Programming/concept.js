// Coin Change
// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.
// Example 1:
// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1
var coinChange = function (coins, amount) {
  let dp = Array(amount + 1).fill(Infinity); // Initialize with Infinity instead of -1
  dp[0] = 0;

  let ans = helper(coins, amount, dp);
  return ans === Infinity ? -1 : ans; // Return -1 if no combination is possible
};

function helper(coins, amount, dp) {
  // Base case: amount becomes zero
  if (amount === 0) return 0;

  if (dp[amount] !== Infinity) return dp[amount]; // Check if already computed

  let ans = Infinity;

  for (let i = 0; i < coins.length; i++) {
    if (amount - coins[i] >= 0) {
      let subAns = helper(coins, amount - coins[i], dp);
      if (subAns !== -1 && subAns + 1 < ans) {
        ans = subAns + 1;
      }
    }
  }

  dp[amount] = ans !== Infinity ? ans : -1; // Update dp table
  return dp[amount];
}

// 0 - 1 Knapsack Problem
// You are given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. Note that we have only one quantity of each item. In other words, given two integer arrays val[0..N-1] and wt[0..N-1] which represent values and weights associated with N items respectively. Also given an integer W which represents knapsack capacity, find out the maximum value subset of val[] such that sum of the weights of this subset is smaller than or equal to W. You cannot break an item, either pick the complete item or dont pick it (0-1 property).
// Example 1:
// Input: N = 3, W = 4, values[] = {1,2,3}, weight[] = {4,5,1}
// Output: 3
// Explanation: Choose the last item that weighs 1 unit and holds a value of 3.
//Function to return max value that can be put in knapsack of capacity W.
function knapSack(W, wt, val, n) {
  // To understand this Matrix method, follow this blog: https://medium.com/@fabianterh/how-to-solve-the-knapsack-problem-with-dynamic-programming-eb88c706d3cf or watch this video: https://www.youtube.com/watch?v=y6kpGJBI7t0&list=PLUcsbZa0qzu1oHa_o1-U-ZMR_DgzWvFql&index=2&ab_channel=AnujBhaiya

  // Approach
  // Fill we will make a 2D array of n+1 rows and W+1 cols
  // Where each col represent the target weight we have to make
  // Each row represent, access of wt[n] we have to make that W weight based on that col
  // We fill whose matrix as 0 first
  // Start traversing from index 1 as 0th is already filled
  // We will either take a row item to make col weight or not take it
  // When we no take it, we just copy paste [item-1][col] value directly
  // if we take it, we reduce current wt from col_target and we get the remaining value from above row
  // At the end, we fill a value in a particular block based on max(take, not take)

  // Let us first make an 2D array and fill all with 0
  let arr = Array.from(Array(n + 1), () => Array(W + 1).fill(0));
  let ans = helper(W, wt, val, n, arr);

  function helper(W, wt, val, n, arr) {
    // Start traversing from index = 1
    for (let item = 1; item <= n; item++) {
      for (let cap = 1; cap <= W; cap++) {
        // withoutInclude means copy above value only, this is the value without including current element
        let withoutInclude = arr[item - 1][cap];
        let withInclude = 0;

        // if we have capacity of including current element, then only include it
        // we have used wt[item-1] because index in wt array start from 0 and we are here iterating from index 1
        if (cap >= wt[item - 1]) {
          // if capacity permits, inlcude it
          withInclude = val[item - 1];
          // include its value, check if any capacity still remaining
          let remaining = cap - wt[item - 1];
          // if its remaining, include it from a row above current row
          withInclude += arr[item - 1][remaining];
        }

        // At the end, compare (include/not-include) and store in the block
        arr[item][cap] = Math.max(withoutInclude, withInclude);
      }
    }

    // last row and last col contains answer for W weight target using n blocks
    return arr[n][W];
  }

  return ans;
}

// Longest Common Subsequence
// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. For example, "ace" is a subsequence of "abcde". A common subsequence of two strings is a subsequence that is common to both strings.
// Example 1:
// Input: text1 = "abcde", text2 = "ace"
// Output: 3
// Explanation: The longest common subsequence is "ace" and its length is 3.
var longestCommonSubsequence = function (text1, text2) {
  // We will follow the approach where we start traversing from last element of both strings
  // If both elements are same, 1 + discard_them and move at index ele-1
  // if not equal, here arises 2 cases
  // If both not same, first discard_that_index_from_first_string and leave second string as it is
  // If both not same, first discard_that_index_from_second_string and leave first string as it is
  // We will take max(answer from both cases)
  // Top Down Approach
  let m = text1.length;
  let n = text2.length;
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  let ans = helper(text1, text2, m, n, dp);

  function helper(text1, text2, m, n, dp) {
    if (m === 0 || n === 0) {
      return 0;
    }

    if (dp[m][n] !== 0) {
      return dp[m][n];
    }

    let first_string_ele = text1.charAt(m - 1);
    let second_string_ele = text2.charAt(n - 1);

    if (first_string_ele === second_string_ele) {
      dp[m][n] = 1 + helper(text1, text2, m - 1, n - 1, dp);
    } else {
      let first_call = helper(text1, text2, m - 1, n, dp);
      let second_call = helper(text1, text2, m, n - 1, dp);

      dp[m][n] = Math.max(first_call, second_call);
    }

    return dp[m][n];
  }

  return ans;
};

var longestCommonSubsequence = function (text1, text2) {
  // Bottom Up / Tabulation approach
  // We will make a matrix of m+1 and n+1 size where we have 0th col and 0th row as 0 because it repesents empty string
  // row and col represents that character of text1 and text2
  // each cell represents longest common subsequence for a string, say we have text1 = ABCDE, text2 = ABSDC then col[4] represents max lcs that can be formed for ABSD
  // this way we check if our rowth and colth element matches we add (diagnol value + 1)
  // if they do not match, we take max(up value,left value)
  const m = text1.length;
  const n = text2.length;

  // Initialize dp array
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Build the dp array bottom-up
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // if the value matches we take diagnol + 1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // else we take max(up, left)
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // The result is stored at dp[m][n] i.e last block
  return dp[m][n];
};

// Longest Palindromic Subsequence
// Given a string s, find the longest palindromic subsequence's length in s. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.
// Example 1:
// Input: s = "bbbab"
// Output: 4
// Explanation: One possible longest palindromic subsequence is "bbbb".

var longestPalindromeSubseq = function (s) {
  // we will just use LCS method only where we make one more string P which is reverse of string s
  // Now we find LCS of s and p which will be our Longest Palindromic subsequence
  let p = reverseString(s);

  function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  }

  return longestCommonSubsequence(s, p);
};

var longestCommonSubsequence = function (text1, text2) {
  // Bottom Up / Tabulation approach
  // We will make a matrix of m+1 and n+1 size where we have 0th col and 0th row as 0 because it repesents empty string
  // row and col represents that character of text1 and text2
  // each cell represents longest common subsequence for a string, say we have text1 = ABCDE, text2 = ABSDC then col[4] represents max lcs that can be formed for ABSD
  // this way we check if our rowth and colth element matches we add (diagnol value + 1)
  // if they do not match, we take max(up value,left value)
  const m = text1.length;
  const n = text2.length;

  // Initialize dp array
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Build the dp array bottom-up
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // if the value matches we take diagnol + 1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // else we take max(up, left)
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // The result is stored at dp[m][n] i.e last block
  return dp[m][n];
};

// Delete Operation for Two Strings
// Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same. In one step, you can delete exactly one character in either string.
// Example 1:
// Input: word1 = "sea", word2 = "eat"
// Output: 2
// Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".
var minDistance = function (word1, word2) {
  // Just use LCS to find longest common subsequence between word1 and word2
  // the number of elements in word1 other than LCS + number of elements in word2 other than LCS is the answer
  let m = word1.length;
  let n = word2.length;
  let ans = longestCommonSubsequence(word1, word2);
  return m - ans + (n - ans);
};

var longestCommonSubsequence = function (text1, text2) {
  // Bottom Up / Tabulation approach
  const m = text1.length;
  const n = text2.length;

  // Initialize dp array
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Build the dp array bottom-up
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // if the value matches we take diagnol + 1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // else we take max(up, left)
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // The result is stored at dp[m][n] i.e last block
  return dp[m][n];
};
