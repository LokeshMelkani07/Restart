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

// DP on strings

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

// DP on Strings

// Print all LCS sequences
/*
You are given two strings s and t. Now your task is to print all longest common sub-sequences in lexicographical order.

Example 1:
Input: s = abaaa, t = baabaca
Output: aaaa abaa baaa

Example 2:
Input: s = aaa, t = a
Output: a
*/
var PrintinglongestCommonSubsequence = function (text1, text2) {
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

  // Now we have the tabulation table
  let len = dp[m][n];
  let str = "";

  for (let i = 0; i < len; i++) {
    str[i] = "$";
  }

  let index = len - 1;
  let i = m,
    j = n;
  // we start from last node of table and then we backtrack
  while (i > 0 || j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      str[index] = str[i - 1];
      i--, j--, index--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return str;
};

// Longest Common Substring
/*
Given two strings. The task is to find the length of the longest common substring.

Example 1:
Input: S1 = "ABCDGH", S2 = "ACDGHR", n = 6, m = 6
Output: 4
Explanation: The longest common substring
is "CDGH" which has length 4.

Example 2:
Input: S1 = "ABC", S2 "ACB", n = 3, m = 3
Output: 1
Explanation: The longest common substrings
are "A", "B", "C" all having length 1.
*/
function longestCommonSubstr(text1, text2, m, n) {
  // Initialize dp array
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  let ans = 0;
  // Build the dp array bottom-up
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        ans = Math.max(ans, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return ans;
}

// Here we are only dealing with i-1 and j at a time so instead of making whole dp array mXn we can use 2 arrays only and do little space optimisation
function longestCommonSubstrSpaceOptimised(text1, text2, m, n) {
  // Initialize dp array
  let prev = Array(n + 1).fill(0);
  let curr = Array(n + 1).fill(0);
  let ans = 0;
  // Build the dp array bottom-up
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        curr[j] = 1 + prev[j - 1];
        ans = Math.max(ans, curr[j]);
      } else {
        curr[j] = 0;
      }
    }
    prev = curr;
  }

  return ans;
}

// Minimum Insertion Steps to Make a String Palindrome
/*
Given a string s. In one step you can insert any character at any index of the string. Return the minimum number of steps to make s palindrome.
A Palindrome String is one that reads the same backward as well as forward.

Example 1:
Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already palindrome we do not need any insertions.

Example 2:
Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".

Example 3:
Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".
*/
var minInsertions = function (s) {
  // We will keep the already palindromic part of the string intact
  // We will just disturb the non-palindromic part
  // What we do is just write the non palindromic part in reverse order in the order side thats it
  // So min number of insertions to make whole string palincdrome becomes, total length of string - length of longest palindromic subsequence
  return s.length - longestPalindromeSubseq(s);
};

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

// Shortest Common Supersequence
/*
Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, return any of them.
A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.

Example 1:
Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation:
str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
The answer provided is the shortest such string that satisfies these properties.

Example 2:
Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
Output: "aaaaaaaa"
*/
var shortestCommonSupersequence = function (text1, text2) {
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

  // LCS code ends here,
  // Now we preprocess for the supersequence
  let i = m,
    j = n;
  let ans = "";

  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      // if both characters are same, add it once in the answer string
      ans += text1[i - 1];
      i--, j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      // if max is up, add current ith element and move up
      ans += text1[i - 1];
      i--;
    } else {
      ans += text2[j - 1];
      j--;
    }
  }

  // check which string is still left, add that also in the answer
  while (i > 0) {
    ans += text1[i - 1];
    i--;
  }

  while (j > 0) {
    ans += text2[j - 1];
    j--;
  }

  // reverse the resultant string and return
  return reverseString(ans);
};

function reverseString(str) {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split(""); // var splitString = "hello".split("");
  // ["h", "e", "l", "l", "o"]

  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
  // ["o", "l", "l", "e", "h"]

  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
  // "olleh"

  //Step 4. Return the reversed string
  return joinArray; // "olleh"
}

// Distinct Subsequences
/*
Given two strings s and t, return the number of distinct subsequences of s which equals t.
The test cases are generated so that the answer fits on a 32-bit signed integer.

Example 1:
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit

Example 2:
Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag
*/
var numDistinct = function (s, t) {
  // Top Down Approach
  let n = s.length;
  let m = t.length;
  let dp = Array.from({ length: n }, () => Array(m).fill(-1));
  let ans = helper(s, t, n - 1, m - 1, dp);
  return ans;
};

function helper(s, t, i, j, dp) {
  // Base case
  if (j < 0) return 1;
  if (i < 0) return 0;
  if (dp[i][j] != -1) return dp[i][j];

  // if matching
  if (s[i] == t[j]) {
    return (dp[i][j] =
      helper(s, t, i - 1, j - 1, dp) + helper(s, t, i - 1, j, dp));
  } else {
    return (dp[i][j] = helper(s, t, i - 1, j, dp));
  }
}

var numDistinctTabulation = function (s, t) {
  // bottom up Approach
  let n = s.length;
  let m = t.length;
  let dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  // Write base cases
  // if str2 is finished
  for (let i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }

  // if str1 is finished
  // We do not start from j = 0 as its been already covered in above loop
  for (let j = 1; j <= m; j++) {
    dp[0][j] = 0;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s[i - 1] == t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][m];
};

// Edit Distance
/*
Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
You have the following three operations permitted on a word:
Insert a character
Delete a character
Replace a character


Example 1:
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation:
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
*/
var minDistance = function (word1, word2) {
  // Solving using Top Down Approach
  // What we will do is, we will start traversing both strings from the end index
  // We keep on comparing them one by one
  // if both character are same, we skip that index so call for i-1,j-1
  // if both character not same means we need to do any one operation from Insertion, Deletion, Replacement
  // We will perform the operation which is minimum of all
  // For Deletion, we do i-1,j
  // For Insertion, we do j-1 because if we insert into word1, it makes i and j same when we skip them so simply we can swrite it as j-1 means we are skiping that index of word2
  // For replacement, we do i-1,j-1 because we are just skipping that character of both word1 and word2
  // get 1+min(insertion,deletion,replacement) and store in dp array
  const m = word1.length;
  const n = word2.length;

  // Initialize memoization table with dimensions (m+1) x (n+1)
  const memo = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));

  // Helper function for recursive memoized approach
  const helper = (i, j) => {
    // Base case: If either string is empty, return the length of the other string
    if (i === 0) return j;
    if (j === 0) return i;

    // Check if result is already memoized
    if (memo[i][j] !== -1) return memo[i][j];

    // Case 1: Characters match, no operation needed
    if (word1[i - 1] === word2[j - 1]) {
      memo[i][j] = helper(i - 1, j - 1);
    } else {
      // Case 2: Try deletion, insertion, and replacement operations
      // We are doing 1 + min() because +1 means current decision + decision we took for further calls
      memo[i][j] =
        1 +
        Math.min(
          helper(i - 1, j), // Deletion
          helper(i, j - 1), // Insertion
          helper(i - 1, j - 1) // Replacement
        );
    }

    return memo[i][j];
  };

  return helper(m, n); // Call helper function with full lengths of word1 and word2
};

var minDistance = function (word1, word2) {
  // Bottom Up Approach / Tabulation
  // We will make a matrix in which we store say word1 = ABCAB, word2 = EACB
  // We will make a matrix of word2.length+1 rows and word2.length+1 cols
  // Where 0,0 block represent ' ' for both
  // row numbering are as follows: ' ', E, A, C, B
  // col numbering are as follows: ' ', A, B, C, A, B
  // for any block in Eth row Cth col, it represents minimum operation required to make "ABC" to "E"
  // So while traversing whole matrix we check everytime, if elements match, we just copy diagnol answer, if they do not match, take 1 + min(up,left,diagnol) because they represent Insertion,deletion,replacement
  // We start traversing from index = 1 because for index = 0, its empty string
  // 0th row means min operation needed to make ' ' from that column element which is same as column number
  // 0th col means min operation needed to make ' ' from that row element which will be row number
  const m = word1.length;
  const n = word2.length;

  // Initialize dp array with dimensions (m+1) x (n+1)
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Initialize first row and column of dp array
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; // Operations needed to convert word1 to empty string
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j; // Operations needed to convert empty string to word2
  }

  // Build dp array bottom-up
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // Characters match, no operation needed
      } else {
        //
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j], // Deletion (left)
            dp[i][j - 1], // Insertion (Up)
            dp[i - 1][j - 1] // Replacement (Diagnol)
          );
      }
    }
  }

  return dp[m][n]; // Minimum operations required to convert word1 to word2
};

// Wildcard Matching
/*
Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:
Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.

Example 3:
Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
*/
// Wildcard Matching
/*
Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:
'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:
Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.

Example 3:
Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
*/
var isMatch = function (s, p) {
  // Top Down Approach
  let n = s.length;
  let m = p.length;
  let dp = Array.from({ length: n }, () => Array(m).fill(-1));
  let ans = helper(n - 1, m - 1, s, p, dp);
  return ans;
};

function helper(i, j, s, p, dp) {
  // base cases
  // 1. if both are exhausted, success
  if (i < 0 && j < 0) return true;
  // 2. if i is exhausted, j still left, unsuccessful
  if (i < 0 && j >= 0) return false;
  // 3. if j is exhausted(empty) but i still has "*" in it
  if (j < 0 && i >= 0) {
    for (let k = 0; k <= i; k++) {
      // if anyone is not '*' means unsuccessful comparison
      if (s[k] != "*") {
        return false;
      }
    }

    // if all "*", success as given '*' Matches any sequence of characters (including the empty sequence).
    return true;
  }

  if (dp[i][j] != -1) return dp[i][j];

  // recurrence
  if (s[i] == p[j] || s[i] == "?") {
    // both match
    return (dp[i][j] = helper(i - 1, j - 1, s, p, dp));
  }

  if (s[i] == "*") {
    // either take one at a time or take sequence at a time
    return (dp[i][j] = helper(i - 1, j, s, p, dp) | helper(i, j - 1, s, p, dp));
  }

  // if not matched
  // simply
  return (dp[i][j] = false);
}

// Bottom Up
var isMatch = function (s, p) {
  // Bottom Up
  let n = s.length;
  let m = p.length;
  let dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));
  dp[0][0] = true; // Empty string matches empty pattern

  // for i<0 && j>=0, return false
  // So for all i==0, all j should have false
  for (let j = 1; j <= m; j++) {
    dp[0][j] = false;
  }

  // for j<0 && i>=0
  // for any i greater than 0
  for (let i = 1; i <= n; i++) {
    let flag = true;
    for (let k = 1; k <= i; k++) {
      // if anyone is not '*' means unsuccessful comparison
      if (s[k - 1] != "*") {
        flag = false;
        break;
      }
    }

    dp[i][0] = flag;
  }

  // changing parameters
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s[i - 1] == p[j - 1] || s[i - 1] == "?") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (s[i - 1] == "*") {
        // Consider '*' as empty sequence or take one character at a time
        dp[i][j] = dp[i - 1][j] | dp[i][j - 1];
      } else {
        dp[i][j] = false;
      }
    }
  }

  return dp[n][m];
};

// Rod Cutting
/*
Given a rod of length N inches and an array of prices, price[]. price[i] denotes the value of a piece of length i. Determine the maximum value obtainable by cutting up the rod and selling the pieces.
Note: Consider 1-based indexing.

Example 1:

Input:
N = 8
Price[] = {1, 5, 8, 9, 10, 17, 17, 20}
Output:
22
Explanation:
The maximum obtainable value is 22 by
cutting in two pieces of lengths 2 and
6, i.e., 5+17=22.
*/
//Function to find the maximum possible value of the function.
function cutRod(price, n) {
  // We are taking each length and subtacing that piece from total length and at the same time we are adding its price in the answer
  // This way we try to get the maximum answer we can get
  // Top Down Approach
  let dp = Array(n + 1).fill(-1);
  let ans = helper(n);
  dp[0] = 0;

  function helper(length) {
    // base case will be when total length become 0 or negative means no more rod to cut
    if (length <= 0) return 0;
    if (dp[length] != -1) return dp[length];
    let maxVal = -Infinity;

    for (let i = 1; i <= length; i++) {
      // store max Value of price
      maxVal = Math.max(maxVal, price[i - 1] + helper(length - i));
    }

    dp[length] = maxVal;
    return maxVal;
  }

  return ans;
}

function cutRod(price, n) {
  // Tabulation Method
  // We will make a dp array of length n+1 in which we store -1 initially and dp[0] = 0
  // dp[0] says maximum profit in cutting rod of length 0
  // dp[1] says maximum profit in cutting rod of length 1
  // say we need to find dp[5] so for that we need to have information about
  // dp[0],dp[1]...dp[4] say we pick
  // price[1] + dp[5-1=4] = gives value for dp[5] or another option
  // price[2] + dp[5-2=3] or
  // price[3] + dp[2] or
  // price[4] + dp[1] or
  // we need maximum of all these options so dp[i] = max(dp[i],price[j] + dp[i-i-1]) becomes our formula
  let dp = Array(n + 1).fill(-1);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] = Math.max(dp[i], price[j] + dp[i - j - 1]);
    }
  }

  return dp[n];
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

// Matrix Chain Multiplication (Partition DP starts)
// Notes: https://drive.google.com/file/d/1RCEMkN0r9pMrSHDyWkSrSXWCleKNtStQ/view?usp=sharing
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
  let n = matrix.length; // row size
  let m = matrix[0].length; // col size

  let dp = Array.from({ length: n }, () => Array(n).fill(0));

  // fill 1st row and 1st col as it is
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
        dp[i][j] = 0;
      } else {
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
