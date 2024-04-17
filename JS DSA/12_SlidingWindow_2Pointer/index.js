// 2 Pointers and Sliding Window
/*
There can be different type of windows:
1. Constant Window
The size of window is constant and fixed

2. Longest Subarray/ Substring where <condition>
Subarray or Substring means continuous part of an array / string

There are 2 ends of a window like l and r
l -> left most portion of the window
r -> right most portion of the window

When we expand the window, we do it with r
When we shrink the window we do it with l

Till the time our condition is getting satisfied, we expand our window.
When it violates the condition, we shrink the window till our condition is valid.
Window length can be found: r - l + 1

3. Number of Subarrays where <condition>

Let say "Find Number of Subarrays With sum = k"
In these type of problems, We find
** Number of subarrays where sum <= k - Number of subarrays where sum <= (k-1) **

4. Find the Shortest / Minimum Window <condition>
We get a valid window, we shrink the window till condition is valid to egt the minimum window.
*/

// Maximum Points You Can Obtain from Cards
/*
There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array cardPoints and the integer k, return the maximum score you can obtain.

Example 1:
Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.
*/
var maxScore = function (cardPoints, k) {
  // Given is, we can only pick elements from front and back
  // We cannot pick random elements from the middle
  // We can think of a solution like
  // We will pick first k elements from front, store maxSum
  // We will then skip k-1th element from front and add last element (n-1)th from right
  // again compare maxSum
  // Now we skip k-2th elment from front and add (n-2)th element from back
  // We will keep on doing this until we pick 0 element from front and k element from back
  // TC: O(2k), SC: O(1)
  let n = cardPoints.length;
  let lsum = 0;
  let rsum = 0;
  let rIndex = n - 1;
  let maxSum = 0;

  for (let i = 0; i < k; i++) {
    lsum = lsum + cardPoints[i];
  }

  maxSum = Math.max(maxSum, lsum);

  for (let j = k - 1; j >= 0; j--) {
    lsum = lsum - cardPoints[j];
    rsum = rsum + cardPoints[rIndex];
    rIndex--;
    maxSum = Math.max(maxSum, lsum + rsum);
  }

  return maxSum;
};

// Longest Substring Without Repeating Characters
// Given a string s, find the length of the longest substring without repeating characters.
// Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
var lengthOfLongestSubstring = function (s) {
  // We can think of an Brute force solution first
  // Where we take a hash of 256 character indexed from 0 to 255 as there are total 256 characters "s consists of English letters, digits, symbols and spaces."
  // We will run 2 loops and will try to generate all substring
  // TC: O(n^2), SC: O(1)
  let hash = Array.from(255).fill(0);
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    let str = "";
    for (let j = i; j < s.length; j++) {
      if (hash[s[j]] == 1) {
        break;
      }
      str = str + s[j];
      let len = j - i + 1;
      maxLen = Math.max(maxLen, len);
      hash[s[j]] = 1;
    }
  }

  return maxLen;
};

var lengthOfLongestSubstring = function (s) {
  // To optimise it we can use sliding window technique
  // To avoid storing repeating characters we can make use of hash tables or something called set
  let st = new Set();
  let l = 0,
    r = 0;
  let maxLen = 0;
  let n = s.length;
  while (r < n) {
    while (st.has(s[r])) {
      st.delete(s[l]);
      l++;
    }
    st.add(s[r]);
    maxLen = Math.max(maxLen, r - l + 1);
    r++;
  }

  return maxLen;
};

// Max Consecutive Ones III
// Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

// Example 1:
// Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
// Output: 6
// Explanation: [1,1,1,0,0,1,1,1,1,1,1]
// Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
var longestOnes = function (nums, k) {
  // Brute force
  // We can think of this question as "Max Subarray with atmost k zeroes"
  // We will generate all subarrays using 2 loops and we will count zeroes in it
  // if zeroes <= k, we will take the length of subarray else we break out
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    let zeroes = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] == 0) {
        zeroes++;
      }

      if (zeroes <= k) {
        let len = j - i + 1;
        maxLen = Math.max(maxLen, len);
      } else {
        break;
      }
    }
  }

  return maxLen;
};

var longestOnes = function (nums, k) {
  // To optimise the problem, we can think of Sliding window as it says subarray
  // We can have atmost k zeroes in our answer subarray
  // We will add / expand 1's in the window
  // We will add / expand 0's also in the window till it does not exceed our limit
  // Once it violates our condition, we shrink window by moving from front till it again satisfies our condition
  let l = 0;
  let r = 0;
  let n = nums.length;
  let maxLen = 0;
  let zeroes = 0;
  while (r < n) {
    if (nums[r] == 0) {
      zeroes++;
    }

    while (zeroes > k) {
      if (nums[l] == 0) {
        zeroes--;
      }
      l++;
    }

    maxLen = Math.max(maxLen, r - l + 1);
    r++;
  }

  return maxLen;
};

// Fruit Into Baskets
/*
You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
Given the integer array fruits, return the maximum number of fruits you can pick.
Example 1:

Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
Example 2:

Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].
Example 3:

Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].
*/
var totalFruit = function (tree) {
  // Problem statement says we have fruits array
  // Inside fruits array each element represent a type of fruit means 0 is one type of fruit, 1 is another type of fruit, 2 is another and so on.
  // We have only 2 basket and each basket can have atmost one type of fruit
  // we can put fruit of type 2 in one basket as many as we want and type 1 in another as many as we want
  // Once we start picking up, we cannot skip elements means it should be continuous
  // So problem is "Return the length of Max Subarray with atmost 2 type of element"
  const hashMap = new Map();
  let left = 0,
    maxLen = 0;
  for (let right = 0; right < tree.length; right++) {
    const rightFruit = tree[right];
    hashMap.set(rightFruit, hashMap.get(rightFruit) + 1 || 0);
    while (hashMap.size > 2) {
      const leftFruit = tree[left];
      if (hashMap.get(leftFruit) === 0) {
        hashMap.delete(leftFruit);
      } else {
        hashMap.set(leftFruit, hashMap.get(leftFruit) - 1);
      }
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};

// Number of Substrings Containing All Three Characters
// Given a string s consisting only of characters a, b and c. Return the number of substrings containing at least one occurrence of all these characters a, b and c.

var numberOfSubstrings = function (s) {
  // We will use sliding window concept
  // We will store the characters and their occurence in the map
  // First, we keep on expanding window till we have a,b,c in our map and window
  // Once we have it, We find the number of substring we can make using that window and adding further elements
  // means from s = "abcabc", we have valid window when j = 2 i.e we have a,b,c in our window at that point
  // Now we can make abc, abca, abcab, abcabc as substring using "abc" when j = 2 so to find number of such substring we can do (n - j)
  // Now we have such substring, we now start shrinking our window and keep it valid always
  const map = {};
  let count = 0,
    start = 0,
    end = 0;
  const n = s.length;
  while (end < n) {
    map[s[end]] = (map[s[end]] || 0) + 1;
    while (map["a"] && map["b"] && map["c"]) {
      count += n - end;
      map[s[start]]--;
      start++;
    }
    end++;
  }
  return count;
};

// Longest Repeating Character Replacement
// You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.
// Example 1:
// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa.
var characterReplacement = function (s, k) {
  // We will use sliding window technique
  // We will use a map to store frequency of occrence of characters
  // we have a variable maxF in which we store max occurence of any character in our subarray
  // Let say we have subarray of length = 5, aabbb and k = 2
  // We have max occurence of b = 3
  // number of changes we need to do is maxF - (window length)  = 5-3 = 2
  // if we make 2 changes we can convert all to b's
  // But we can only make changes if its <= k
  // So keeping this in mind, we slide the window
  let l = 0;
  let r = 0;
  let n = s.length;
  let maxLen = 0;
  let maxF = 0;
  let changes = 0;
  const hash = {};

  while (r < n) {
    hash[s[r]] = (hash[s[r]] || 0) + 1;
    // Store the maximum occurence frequency inside maxF
    maxF = Math.max(maxF, hash[s[r]]);
    while (r - l + 1 - maxF > k) {
      // As we are shrinking the window, we change the maxF
      hash[s[l]]--;
      maxF = 0;
      // We traverse whole object and get maximum value inside maxF
      for (const [key, value] of Object.entries(hash)) {
        maxF = Math.max(maxF, value);
      }
      l++;
    }

    // Number of changes to be made in the window = (r-l+1) - maxF
    // if its valid, store in answer
    if (r - l + 1 - maxF <= k) {
      maxLen = Math.max(maxLen, r - l + 1);
    }
    r++;
  }

  return maxLen;
};

// Binary Subarrays With Sum
// Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal. A subarray is a contiguous part of the array.
var numSubarraysWithSum = function (nums, goal) {
  // "Number of subarrays with sum less than equal to k - Number of subarrays with sum less than equal to k-1 = Number of Subarrays whose Sum = k"
  return subArrayWithGoal(nums, goal) - subArrayWithGoal(nums, goal - 1);
};

var subArrayWithGoal = function (nums, goal) {
  // This function will give us number of subarrays which can be formed less than equal to goal
  // [1,0,1,0,1], goal = 2
  // using sliding window if we want to know number of subarrays then we can see that if 1,0 make sum <= 2 means 1 and 0 individually also are valid subarrays so to get number of valid subarrays from that window we can do count = count + (r-l+1)
  let l = 0;
  let r = 0;
  let n = nums.length;
  let ans = 0;
  let sum = 0;
  // In above questions to find number of subarrays whose sum = goal, we are doing "Number of subarrays with sum less than equal to k - Number of subarrays with sum less than equal to k-1 = Number of Subarrays whose Sum = k"
  // if goal = 0 then goal-1 = -1 so below condition is for that
  if (goal < 0) {
    return 0;
  }

  while (r < n) {
    sum += nums[r];
    while (sum > goal) {
      sum = sum - nums[l];
      l++;
    }
    ans = ans + (r - l + 1);
    r++;
  }

  return ans;
};

// Count Number of Nice Subarrays
// Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it. Return the number of nice sub-arrays.
// Input: nums = [1,1,2,1,1], k = 3
// Output: 2
// Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].
var numberOfSubarrays = function (nums, goal) {
  // The problem is same as Number of subarrays with sum = k
  // Just that consider, odd number = 1, even number = 0 in whole array
  // any number % 2 == 0 means even and 1 means odd So to make elements in form of 0 and 1 we will do % 2
  // So we can copy paste same code here also
  return subArrayWithGoal(nums, goal) - subArrayWithGoal(nums, goal - 1);
};

var subArrayWithGoal = function (nums, goal) {
  // This function will give us number of subarrays which can be formed less than equal to goal
  // [1,0,1,0,1], goal = 2
  // using sliding window if we want to know number of subarrays then we can see that if 1,0 make sum <= 2 means 1 and 0 individually also are valid subarrays so to get number of valid subarrays from that window we can do count = count + (r-l+1)
  let l = 0;
  let r = 0;
  let n = nums.length;
  let ans = 0;
  let sum = 0;
  // In above questions to find number of subarrays whose sum = goal, we are doing "Number of subarrays with sum less than equal to k - Number of subarrays with sum less than equal to k-1 = Number of Subarrays whose Sum = k"
  // if goal = 0 then goal-1 = -1 so below condition is for that
  if (goal < 0) {
    return 0;
  }

  while (r < n) {
    sum += nums[r] % 2;
    while (sum > goal) {
      sum = sum - (nums[l] % 2);
      l++;
    }
    ans = ans + (r - l + 1);
    r++;
  }

  return ans;
};

// Subarrays with K Different Integers
// Given an integer array nums and an integer k, return the number of good subarrays of nums. A good array is an array where the number of different integers in that array is exactly k. For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3. A subarray is a contiguous part of an array.
var subarraysWithKDistinct = function (nums, k) {
  // If we try to apply normal sliding window using a map for k different integers
  // We will miss out on many elements between l and r which can form valid subarrays individually and in group also
  // So here we are confused whether to expand the window or shrink it
  // So we go to "Subarrays sum==k" approach which is
  // Subarray with k different integers = Subarray with less than or equal to k different integers - Subarray with less than or equal to k-1 different integers
  return subArrayWithK(nums, k) - subArrayWithK(nums, k - 1);
};

var subArrayWithK = function (nums, k) {
  // We will make use of map
  let l = 0;
  let r = 0;
  let n = nums.length;
  let len = 0;
  const hash = {};

  while (r < n) {
    hash[nums[r]] = (hash[nums[r]] || 0) + 1;
    while (Object.keys(hash).length > k) {
      hash[nums[l]]--;
      if (hash[nums[l]] === 0) {
        delete hash[nums[l]];
      }
      l++;
    }

    if (Object.keys(hash).length <= k) {
      len = len + (r - l + 1);
    }

    r++;
  }
  return len;
};

// Minimum Window Substring
//Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "". The testcases will be generated such that the answer is unique.
var minWindow = function (s, t) {
  // We will store the characters and their occurence in t string in a map
  // We will start making a window in string s
  // We make variable count to store count of characters in t, minLen to store minLen substring which has all characters of string t, startIndex = -1 where we store startIndex of our valid string so that we can find the sunstring later
  // Store the elements one by one in same map, if map[s[j]]>0 means means its coming from t so count = count + 1 and map[s[j]]--
  // for every element mark map[s[j]]--
  // when count = t.size means we have all characters of t inside our substring so thats a valid substring so store minLen and startIndex of it
  // Now we try to shrink down the window as we need minimum window substring so
  // map[s[left]]-- and if at anytime map[s[left]] > 0 means count-- as we have missed one character of t in our substring
  // At the end we have startIndex and minLen so we can use s.substr() function
  let hash = {};
  let m = t.size;
  let n = s.size;
  for (let i = 0; i < m; i++) {
    hash[t[i]] = (hash[t[i]] || 0) + 1;
  }

  let l = 0;
  let r = 0;
  let minLen = Infinity;
  let sIndex = -1;
  let count = 0;
  while (r < n) {
    if (hash[s[r]] !== undefined && hash[s[r]] > 0) {
      // means t contains this character
      count++;
    }

    hash[s[r]] = (hash[s[r]] || 0) - 1;

    while (count == m) {
      if (r - l + 1 < minLen) {
        minLen = r - l + 1;
        sIndex = l;
      }

      hash[l]++;
      if (hash[l] > 0) {
        count--;
      }
    }

    r++;
  }

  return sIndex === -1 ? "" : s.substr(sIndex, sIndex + minLen);
};
