// Contains Duplicate
// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
var containsDuplicate = function (nums) {
  // Let us store the frequency inside a map
  const mpp = new Map();
  for (let i = 0; i < nums.length; i++) {
    mpp.set(nums[i], (mpp.get(nums[i]) || 0) + 1);
  }

  for (let [key, value] of mpp) {
    if (value > 1) {
      return true;
    }
  }

  return false;
};

// Intersection of Two Arrays
/*
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.
Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.
*/
var intersection = function (nums1, nums2) {
  // Store result of both nums1 and nums2 in map
  // check whose length is less, pick that map and traverse it
  // check if other map has that key, if yes, store it in array
  const mpp1 = new Map();
  const mpp2 = new Map();
  for (let i = 0; i < nums1.length; i++) {
    mpp1.set(nums1[i], (mpp1.get(nums1[i]) || 0) + 1);
  }

  for (let j = 0; j < nums2.length; j++) {
    mpp2.set(nums2[j], (mpp2.get(nums2[j]) || 0) + 1);
  }

  let res = [];
  for (let [key, value] of mpp1) {
    if (mpp2.has(key)) {
      res.push(key);
    }
  }

  return res;
};

// Intersection of Two Arrays II
// Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.
// Example 1:
// Input: nums1 = [1,2,2,1], nums2 = [2,2]
// Output: [2,2]
// Example 2:
// Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// Output: [4,9]
// Explanation: [9,4] is also accepted.
var intersect = function (nums1, nums2) {
  let res = [];
  const mpp = new Map();
  for (let i = 0; i < nums1.length; i++) {
    mpp.set(nums1[i], (mpp.get(nums1[i]) || 0) + 1);
  }

  for (let y of nums2) {
    if (mpp.has(y)) {
      console.log(y);
      res.push(y);
      mpp.set(y, mpp.get(y) - 1);
      if (mpp.get(y) == 0) {
        mpp.delete(y);
      }
    }
  }

  return res;
};

// Distribute Candies
/*
Alice has n candies, where the ith candy is of type candyType[i]. Alice noticed that she started to gain weight, so she visited a doctor.
The doctor advised Alice to only eat n / 2 of the candies she has (n is always even). Alice likes her candies very much, and she wants to eat the maximum number of different types of candies while still following the doctor's advice.
Given the integer array candyType of length n, return the maximum number of different types of candies she can eat if she only eats n / 2 of them.

Example 1:

Input: candyType = [1,1,2,2,3,3]
Output: 3
Explanation: Alice can only eat 6 / 2 = 3 candies. Since there are only 3 types, she can eat one of each type.
Example 2:

Input: candyType = [1,1,2,3]
Output: 2
Explanation: Alice can only eat 4 / 2 = 2 candies. Whether she eats types [1,2], [1,3], or [2,3], she still can only eat 2 different types.
*/
var distributeCandies = function (candyType) {
  // We have elements in the array where it contains duplicate also
  // We have unique elements = type of candies
  // Alice can eat max of n/2 candies
  // We need to get number of unique elements and n/2
  // return the one which is lesser
  let n = candyType.length;
  // Store all candies in set to get unique number of candies
  const st = new Set();
  for (let i = 0; i < n; i++) {
    st.add(candyType[i]);
  }

  return Math.min(n / 2, st.size);
};

// Longest Consecutive Sequence
/*
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.
Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
*/
var longestConsecutive = function (nums) {
  // We will use set Data structure to store elements in unique fashion
  // We will add all elements inside set
  // Now we traverse the set, for each element inside set
  // we check its ele-1, if not found
  // we check for its ele+1 and count it till we find it
  let n = nums.length;
  if (n == 0) {
    return 0;
  }

  let longest = 1; // there will always be one element inside array so longest = 1
  const st = new Set();
  for (let i = 0; i < n; i++) {
    st.add(nums[i]);
  }

  // Check inside set
  for (let val of st) {
    if (!st.has(val - 1)) {
      // check for val+1
      let count = 1; // we have found the first element so count = 1 initialised
      let x = val;
      while (st.has(x + 1)) {
        // check till we get consecutive number and do count++
        count++;
        x++;
      }

      // update longest variable with count
      longest = Math.max(longest, count);
    }
  }

  return longest;
};

// Happy Number
/*
Write an algorithm to determine if a number n is happy.
A happy number is a number defined by the following process:
Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

Example 1:

Input: n = 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
*/
var isHappy = function (n) {
  // We will just do simple maths
  // To optimise and get away from time consuming part we will use set
  // Everytime we take sum which is not equal to 1, we store it in set so that next time when we encounter same number, we can check our set and we do not need to do same time consuming part again and again, simply return false
  let st = new Set();
  while (n !== 1) {
    let sum = 0;
    while (n > 0) {
      sum = sum + (n % 10) * (n % 10);
      n = Math.floor(n / 10);
    }

    if (st.has(sum)) {
      return false;
    } else {
      st.add(sum);
      n = sum;
    }
  }

  return true;
};

// First Unique Character in a String
/*
Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

Example 1:

Input: s = "leetcode"
Output: 0
Example 2:

Input: s = "loveleetcode"
Output: 2
*/
var firstUniqChar = function (s) {
  // Store the elements in a map with its frequency
  // Traverse the map
  // if frequency is 1, return index
  const mpp = new Map();
  for (let i = 0; i < s.length; i++) {
    mpp.set(s[i], (mpp.get(s[i]) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (mpp.has(s[i]) && mpp.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
};

// Find Common Characters
/*
Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.

Example 1:

Input: words = ["bella","label","roller"]
Output: ["e","l","l"]
Example 2:

Input: words = ["cool","lock","cook"]
Output: ["c","o"]
*/
var commonChars = function (words) {
  // Hard Problem
  // Simple, we will create a array of 26 characters say common and store frequency in the charCode of each character of words[0] string
  // Hum charCode vale index mai uss element ki frequency store krenge
  // Matlab agar charCode('a') = 12 then arr[12] = 1
  // Now hum baaki ki strings ka bhi aise hi krenge and everytime we compare the minimum frequency and store it in common array so that we have common characters with freuqncy and index representing the charCode
  // At the end we convert back the character from charCode and store in result array
  let res = [];
  // Create an array
  let common = Array(26).fill(0);
  for (let i = 0; i < words[0].length; i++) {
    // Store the frequency at charCode for first string
    let count = words[0][i].charCodeAt(0) - "a".charCodeAt(0);
    common[count]++;
  }

  // Doing same for other strings now
  for (let i = 1; i < words.length; i++) {
    let commonChar = Array(26).fill(0);
    for (let j = 0; j < words[i].length; j++) {
      // Store the frequency at charCode for first string
      let count = words[i][j].charCodeAt(0) - "a".charCodeAt(0);
      commonChar[count]++;
    }

    // compare and store minimum inside common array now
    for (let k = 0; k < common.length; k++) {
      common[k] = Math.min(common[k], commonChar[k]);
    }
  }

  // Store the characters based on charCode inside result now
  for (let k = 0; k < common.length; k++) {
    while (common[k] != 0) {
      res.push(String.fromCharCode(k + "a".charCodeAt(0)));
      common[k]--;
    }
  }

  return res;
};

// Sort Characters By Frequency
/* Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string. Return the sorted string. If there are multiple answers, return any of them.
Example 1:

Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
Example 2:

Input: s = "cccaaa"
Output: "aaaccc"
Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
Note that "cacaca" is incorrect, as the same characters must be together.
*/
var frequencySort = function (s) {
  // store whole frequency inside map first
  const mpp = new Map();
  for (let ch of s) {
    mpp.set(ch, (mpp.get(ch) || 0) + 1);
  }

  // Sort the keys based on their frequency in map in ascending order so we make an array and do it
  const arr = [...mpp.keys()].sort((a, b) => mpp.get(b) - mpp.get(a));
  console.log(arr);
  let res = "";
  for (let i = 0; i < arr.length; i++) {
    // add the element its frequency number of times in the result string
    res += arr[i].repeat(mpp.get(arr[i]));
  }

  return res;
};

// Valid Sudoku
/*
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
*/
var isValidSudoku = function (board) {
  // We will get the row index, col index, box index
  // We will make map for each one of them and store any new value in it
  // Whenever we encounter a value, we check if already exist in our maps then return false, else store it in map
  const row = {};
  const col = {};
  const box = {};
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = board[i][j];
      if (value !== ".") {
        const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        if (
          row[`${i} - ${value}`] ||
          col[`${j} - ${value}`] ||
          box[`${boxIndex} - ${value}`]
        ) {
          return false;
        }
        row[`${i} - ${value}`] = true;
        col[`${j} - ${value}`] = true;
        box[`${boxIndex} - ${value}`] = true;
      }
    }
  }

  return true;
};

// Longest Substring Without Repeating Characters
/*
Given a string s, find the length of the longest substring without repeating characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
*/
var lengthOfLongestSubstring = function (s) {
  // We will use Sliding window Technique
  // Where we will move window if we find any character already present in our set
  // We will use set to store characters
  let st = new Set();
  let i = 0;
  let maxLen = 0;
  if (s.length == 0) return 0;
  if (s.length == 1) return 1;
  for (let j = 0; j < s.length; j++) {
    while (st.has(s[j])) {
      st.delete(s[i]);
      i++;
    }

    st.add(s[j]);
    maxLen = Math.max(maxLen, j - i + 1);
  }

  return maxLen;
};

// Minimum Common Value
/*
Given two integer arrays nums1 and nums2, sorted in non-decreasing order, return the minimum integer common to both arrays. If there is no common integer amongst nums1 and nums2, return -1.

Note that an integer is said to be common to nums1 and nums2 if both arrays have at least one occurrence of that integer.

Example 1:
Input: nums1 = [1,2,3], nums2 = [2,4]
Output: 2
Explanation: The smallest element common to both arrays is 2, so we return 2.
*/
var getCommon = function (nums1, nums2) {
  let st = new Set();
  for (let x of nums1) {
    st.add(x);
  }

  for (let y of nums2) {
    if (st.has(y)) {
      return y;
    }
  }

  return -1;
};

// Hand of Straights
/*
Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.

Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.

Example 1:
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]

Example 2:
Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.
*/
var isNStraightHand = function (hand, groupSize) {
  /*
  Approach
  Check for Valid Group Size: The total number of cards must be divisible by the group size to possibly form the required groups. If not, return False.

  Count Card Frequencies: Use a dictionary or Counter from the collections module to count how many times each card appears.

  Sort the Card Values: Sort the unique card values. This helps in sequentially forming groups starting from the smallest card value.

  Form Groups: Iterate through the sorted card values and try to form groups starting from each card:

  For each card value, if it has not been fully used in previous groups, attempt to form a group of consecutive cards starting from that value.

  For each card in the required group, check if there are enough cards to form the group. If not, return False.

  Decrement the count of each card in the group as they are used.

  Return Result: If all groups can be successfully formed, return True.
  */
  // What we do is, we first check if hand.size is not divisble by groupSize then we simply can't make groupSize groups
  // If we can, we store frequency of all cards in a map
  // We now sort hands[] as we need consecutive element
  // Now we run a loop to make group of size groupSize
  // eveyrtime we take first element from map and go consecutive in it
  // if its count < 0 means we cannot use it in group so return false
  // else if we can use it, then use it and decrease its count
  if (hand.length % groupSize !== 0) {
    return false;
  }

  let cardCount = new Map();
  for (let card of hand) {
    cardCount.set(card, (cardCount.get(card) || 0) + 1);
  }

  let sortedCards = Array.from(cardCount.keys()).sort((a, b) => a - b);

  for (let card of sortedCards) {
    let count = cardCount.get(card);
    if (count > 0) {
      // if count>0 then only use it for group making
      for (let i = 0; i < groupSize; ++i) {
        // if its count < 0 means its all frequency has already been used so we cannot use it for further groups
        if ((cardCount.get(card + i) || 0) < count) {
          return false;
        }
        // decrease its count once we have used it in a group
        cardCount.set(card + i, cardCount.get(card + i) - count);
      }
    }
  }

  // if we have traversed all elements of hand[] means we have all the groups of groupSize so
  return true;
};
