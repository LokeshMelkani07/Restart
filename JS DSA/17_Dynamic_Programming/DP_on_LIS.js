// Notes: https://drive.google.com/file/d/1pYTTaRv3At0RT83bfIH0ODpyxLWRKBIp/view?usp=sharing

// DP on LIS (Longest Increasing Subsequence)

// Longest Increasing Subsequence
/*
Given an integer array nums, return the length of the longest strictly increasing subsequence.

Example 1:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Example 2:
Input: nums = [0,1,0,3,2,3]
Output: 4
*/
var lengthOfLIS = function (nums) {
  // We need to take account of Previous element we have picked so that we can compare it with current element and add it in our subsequence accordingly
  let n = nums.length;
  // we will make dp[n][n+1] as we do coordinate change to store prev
  // We have 2 states here: index and prev
  // ind values goes from 0 to n-1 so dp[n] for it
  // prev value start from -1 and go till n so dp[n+1] for it
  // prev start from -1 which we cannot store in 2D array so we store -1 in index 0, 0th in 1st index and so on so we create n+1 length array for prev
  let dp = Array.from({ length: n }, () => Array(n + 1).fill(-1));
  return helper(0, -1, nums, n, dp);
};

function helper(ind, prev, nums, n, dp) {
  // base case: we are at last index
  if (ind == n) {
    return 0;
  }

  // prev+1 so that we can store prev = -1 value at 0th index so this way prev = n value get stored in n+1 so we have taken dp[n+1]
  if (dp[ind][prev + 1] != -1) {
    return dp[ind][prev + 1];
  }

  // Either we pick a element for our subsequence, In this case our s=prev updates to current element and length of subsequence increase by 1 and we move to next index
  // if we do not pick, we do not update the length and prev index, just move to next index
  let len = 0 + helper(ind + 1, prev, nums, n, dp);

  // if prev==-1 means first element or ind is greater strictly than take it
  // update length, prev also and take max length of pick/not-pick
  if (prev == -1 || nums[ind] > nums[prev]) {
    len = Math.max(len, 1 + helper(ind + 1, ind, nums, n, dp));
  }

  return (dp[ind][prev + 1] = len);
}

// Bottom Up
var lengthOfLIS = function (nums) {
  // Bottom Up Approach
  let n = nums.length;
  let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  // No need to write base case as in base case we are storing 0 only
  for (let ind = n - 1; ind >= 0; ind--) {
    // apply coordinate change technique in all places where dp array is used of doing prev = prev+1
    for (let prev = ind - 1; prev >= -1; prev--) {
      let len = 0 + dp[ind + 1][prev + 1];
      if (prev == -1 || nums[ind] > nums[prev]) {
        len = Math.max(len, 1 + dp[ind + 1][ind + 1]);
      }

      dp[ind][prev + 1] = len;
    }
  }

  // In top down approach we called for ind=0, prev-1 so in tabulated our answer lies in ind = 0, prev = -1 +1
  return dp[0][-1 + 1];
};

// Space Optimisation
var lengthOfLIS = function (nums) {
  // Space Optimisation
  // We are using only ind+1 so we just need 2 arrays
  // wherever there is dp[ind+1] make it next
  // wherever there is dp[ind] make it curr
  // move next = curr
  // answer stored in next[-1+1]
  let n = nums.length;
  let next = Array(n + 1).fill(0);
  let curr = Array(n + 1).fill(0);

  // No need to write base case as in base case we are storing 0 only
  for (let ind = n - 1; ind >= 0; ind--) {
    // apply coordinate change technique in all places where dp array is used of doing prev = prev+1
    for (let prev = ind - 1; prev >= -1; prev--) {
      let len = 0 + next[prev + 1];
      if (prev == -1 || nums[ind] > nums[prev]) {
        len = Math.max(len, 1 + next[ind + 1]);
      }

      curr[prev + 1] = len;
    }

    next = curr;
  }

  // In top down approach we called for ind=0, prev-1 so in tabulated our answer lies in ind = 0, prev = -1 +1
  return next[-1 + 1];
};

// Most Optimal Solution
var lengthOfLIS = function (nums) {
  // Most Optimal Solution
  // TC: O(n)
  let n = nums.length;
  // dp[i] means length of LIS till index i
  // Initially its all 1 because a number can make an LIS of maximum 1 size with itself
  let dp = Array(n).fill(1);

  let maxi = 1;
  for (let ind = 0; ind < n; ind++) {
    for (let prev = 0; prev < ind; prev++) {
      // if nums[prev] < nums[ind] means we can make a LIS using it
      // if nums[prev] < nums[ind] then its obvious that the subsequence till prev is also capable of becoming a LIS for index ind so dp[ind] = Math.mac(dp[ind], 1 + dp[prev])
      // dp[i] means length of LIS till ith index
      if (nums[prev] < nums[ind]) {
        dp[ind] = Math.max(dp[ind], 1 + dp[prev]);
      }
    }

    maxi = Math.max(maxi, dp[ind]);
  }

  return maxi;
};

// Print Longest Increasing Subsequence
/*
Given an integer n and an array of integers arr, return the Longest Increasing Subsequence which is Index-wise lexicographically smallest.
Note - A subsequence S1 is Index-wise lexicographically smaller than a subsequence S2 if in the first position where S1 and S2 differ, subsequence S1 has an element that appears earlier in the array  arr than the corresponding element in S2.
LIS  of a given sequence is defined as that longest possible subsequence all of whose elements are in increasing order. For example, the length of LIS for {10, 22, 9, 33, 21, 50, 41, 60, 80} is 6 and the LIS is {10, 22, 33, 50, 60, 80}.

Example 1:
Input:
n = 16
arr = [0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15]
Output:
0 4 6 9 13 15
Explanation:
longest Increasing subsequence is 0 4 6 9 13 15  and the length of the longest increasing subsequence is 6.
*/
function longestIncreasingSubsequence(n, nums) {
  // Most Optimal Solution
  // TC: O(n)
  // We know how to print length of LIS using above method, but if we want to print the LIS, we need those elements so we need to have a hash where we can store the last previous element of any subsequence formed till ith index
  // dp[i] means length of LIS till index i
  let dp = Array(n).fill(1);
  // hash[i] contains prev element for the ith element for which dp[i] has been updated
  let hash = Array(n).fill(0);
  let lastIndex = 0;

  let maxi = 1;
  for (let ind = 0; ind < n; ind++) {
    hash[ind] = ind;
    for (let prev = 0; prev < ind; prev++) {
      if (nums[prev] < nums[ind] && 1 + dp[prev] > dp[ind]) {
        dp[ind] = 1 + dp[prev];
        hash[ind] = prev;
      }
    }

    // store the lastIndex which will be that of maximum length LIS in dp array
    // We will store the index of max LIS so that it helps during backtrack
    if (dp[ind] > maxi) {
      maxi = dp[ind];
      lastIndex = ind;
    }
  }

  // backtrack to the first index
  // Now we want to print LIS using indexes we have stored in the hash
  let ans = [];
  ans.push(nums[lastIndex]);

  while (hash[lastIndex] != lastIndex) {
    lastIndex = hash[lastIndex];
    ans.push(nums[lastIndex]);
  }

  // reverse the answer as we arebacktracking
  ans.reverse();
  return ans;
}

// LIS using Binary Search
class Solution {
  lower_bound(a, n, k) {
    let l = 0,
      r = n - 1,
      ans_lb = 0;
    while (l <= r) {
      let mid = l + parseInt((r - l) / 2);

      if (a[mid] >= k) {
        if (a[mid] == k) {
          ans_lb = mid;
        }
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    return ans_lb;
  }

  //Function to find length of longest increasing subsequence.
  longestSubsequence(n, a) {
    let temp = [];
    temp.push(a[0]);
    for (let i = 1; i < n; i++) {
      if (a[i] > temp[temp.length - 1]) {
        temp.push(a[i]);
      } else {
        // console.log("a[i] is ",a[i]);
        let ind = this.lower_bound(temp, temp.length, a[i]);
        // console.log("ind is ", ind);
        temp[ind] = a[i];
      }
    }

    return temp.length;
  }
}

// Largest Divisible Subset
/*
Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:

answer[i] % answer[j] == 0, or
answer[j] % answer[i] == 0
If there are multiple solutions, return any of them.


Example 1:
Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.
*/
var largestDivisibleSubset = function (nums) {
  // After sorting the array problem changes to "Longest Divisble Subsequence"
  // Earlier we were doing Longest Increasing Subsequence
  let n = nums.length;
  // sort the array
  nums.sort((a, b) => a - b);
  let dp = Array(n).fill(1);
  // hash[i] contains prev element for the ith element for which dp[i] has been updated
  let hash = Array(n).fill(0);
  let lastIndex = 0;

  let maxi = 1;
  for (let ind = 0; ind < n; ind++) {
    hash[ind] = ind;
    for (let prev = 0; prev < ind; prev++) {
      if (nums[ind] % nums[prev] == 0 && 1 + dp[prev] > dp[ind]) {
        dp[ind] = 1 + dp[prev];
        hash[ind] = prev;
      }
    }

    // store the lastIndex which will be that of maximum length LIS in dp array
    if (dp[ind] > maxi) {
      maxi = dp[ind];
      lastIndex = ind;
    }
  }

  // backtrack to the first index
  let ans = [];
  ans.push(nums[lastIndex]);

  while (hash[lastIndex] != lastIndex) {
    lastIndex = hash[lastIndex];
    ans.push(nums[lastIndex]);
  }

  // reverse the answer as we arebacktracking
  ans.reverse();
  return ans;
};

// Longest String Chain
/*
You are given an array of words where each word consists of lowercase English letters.

wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.

For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.

Return the length of the longest possible word chain with words chosen from the given list of words.

Example 1:
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chains is ["a","ba","bda","bdca"].

Example 2:
Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].

Example 3:
Input: words = ["abcd","dbqca"]
Output: 1
Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.
*/
var longestStrChain = function (nums) {
  // here we deal with " sequence of words" so we can choose words in any fashion from nums array
  // words = ["xbc","pcxbcf","xb","cxbc","pcxbc"] has output 5 as All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"]. so we can choose words in any fashion
  // So instead of subsequence, this question becomes that of subset nums[i] means string ith so we need to sort the nums first based on length of all i strings
  // It is same as LIS just that whenever we add new element to ind, we check if its strictly one character extra than our previous one
  nums.sort((a, b) => a.length - b.length);
  let n = nums.length;
  // dp[i] means length of LIS till index i
  let dp = Array(n).fill(1);

  let maxi = 1;
  for (let ind = 0; ind < n; ind++) {
    for (let prev = 0; prev < ind; prev++) {
      // To check if difference between prev and ind is of only 1 character, we make below function
      if (comparePossiblity(nums[ind], nums[prev]) && dp[ind] < 1 + dp[prev]) {
        dp[ind] = 1 + dp[prev];
      }
    }

    maxi = Math.max(maxi, dp[ind]);
  }

  return maxi;
};

function comparePossiblity(s1, s2) {
  // s1 is the bigger string and s2 is smaller one because s1 is ind, s2 denotes prev
  let n1 = s1.length;
  let n2 = s2.length;
  if (n1 != n2 + 1) {
    return false;
  }
  let first = 0;
  let second = 0;

  while (first < n1) {
    if (second < n2 && s1[first] == s2[second]) {
      // if characters matches, increment both, else increment only extra character vali string
      first++;
      second++;
    } else {
      first++;
    }
  }

  // if both reach the end means it just contain one extra character
  if (first == n1 && second == n2) {
    return true;
  }
}

// Longest Bitonic subsequence
/*
Given an array of positive integers. Find the maximum length of Bitonic subsequence.
A subsequence of array is called Bitonic if it is first strictly increasing, then strictly decreasing.

Example 1:
Input:
n = 5
nums = [1, 2, 5, 3, 2]
Output:
5
Explanation:
The sequence {1, 2, 5} is
increasing and the sequence {3, 2} is
decreasing so merging both we will get
length 5.
*/
function LongestBitonicSequence(n, nums) {
  // For strictly increasing sequence
  // dp[i] means length of LIS till index i
  // We need dp1 to store LIS of each number of nums
  // We need dp1 to store LIS of each element of reverse(nums)
  // Bitonic means strictly increasing and then decreasing or only strictly inc or strictly decreasing
  // If we have LIS for a particular element from front and back, we can find its LIS pattern by doing dp1[i]+dp2[i]-1
  // -1 for that ith element which is repeated in both dp1 and dp2
  // At the end, longest such result is our output
  let dp1 = Array(n).fill(1);
  for (let ind = 0; ind < n; ind++) {
    for (let prev = 0; prev < ind; prev++) {
      if (nums[prev] < nums[ind] && dp1[ind] < 1 + dp1[prev]) {
        dp1[ind] = 1 + dp1[prev];
      }
    }
  }

  // for stricly decreasing or reverse of nums
  let dp2 = Array(n).fill(1);
  for (let ind = n - 1; ind >= 0; ind--) {
    for (let prev = n - 1; prev > ind; prev--) {
      if (nums[prev] < nums[ind] && dp2[ind] < 1 + dp2[prev]) {
        dp2[ind] = 1 + dp2[prev];
      }
    }
  }

  let maxi = 0;
  for (let i = 0; i < n; i++) {
    maxi = Math.max(maxi, dp1[i] + dp2[i] - 1);
  }

  return maxi;
}

// Number of Longest Increasing Subsequence
/*
Given an integer array nums, return the number of longest increasing subsequences.

Notice that the sequence has to be strictly increasing.


Example 1:
Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].
*/
var findNumberOfLIS = function (nums) {
  let n = nums.length;
  // count[i] stores number of LIS for ith index
  // We need to consider all LIS a number can make with its previous elements, if [1,5], [4,5], [3,5] all LIS 5 can make of length 2 with everybody previous to him should be considered
  // dp[i] means length of LIS till index i
  let dp = Array(n).fill(1);
  // count[i] means number of LIS till that index i
  let count = Array(n).fill(1);

  let maxi = 1;
  for (let ind = 0; ind < n; ind++) {
    for (let prev = 0; prev < ind; prev++) {
      if (nums[prev] < nums[ind] && dp[prev] + 1 > dp[ind]) {
        // means an LIS can be formed with a element
        dp[ind] = 1 + dp[prev];
        count[ind] = count[prev];
      } else if (nums[prev] < nums[ind] && dp[prev] + 1 == dp[ind]) {
        // One element can make LIS of same length with many elements so for that case we have written below statement
        // means an LIS of same length which is already calculated can be formed from another element means count++
        count[ind] += count[prev];
      }
    }

    // store maximum length LIS possible in nums
    maxi = Math.max(maxi, dp[ind]);
  }

  let nos = 0;
  // find all element with longest LIS, store the count of such LIS
  for (let i = 0; i < n; i++) {
    if (dp[i] == maxi) nos += count[i];
  }

  return nos;
};
