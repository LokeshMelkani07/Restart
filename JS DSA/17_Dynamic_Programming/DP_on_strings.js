// Notes: https://drive.google.com/file/d/1xywbY9Dj_RHLwrmtOIO6t8OPNzNDYfkB/view?usp=sharing
// DP on Strings

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
