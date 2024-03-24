// Number of Good Pairs
// Given an array of integers nums, return the number of good pairs. A pair (i, j) is called good if nums[i] == nums[j] and i < j.
var numIdenticalPairs = function (nums) {
  // using loops
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        count++;
      }
    }
  }

  return count;
};

var numIdenticalPairs = function (nums) {
  // using object
  let cnt = {};
  let ans = 0;

  for (let x of nums) {
    ans += cnt[x] || 0;
    cnt[x] = (cnt[x] || 0) + 1;
  }

  return ans;
};

// Count the Number of Consistent Strings
// You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed. Return the number of consistent strings in the array words.
// Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
// Output: 7
// Explanation: All strings are consistent.
function checkProperty(mpp, str) {
  // To check if Object has those elements as keys or not
  for (let i = 0; i < str.length; i++) {
    if (!mpp.hasOwnProperty(str[i])) {
      return false;
    }
  }

  return true;
}

var countConsistentStrings = function (allowed, words) {
  // Let us store "allowed" in a object
  // We need to check if any element of words is there in "allowed" or not
  // So use hasOwnProperty() of Object and check
  let mpp1 = {};
  let ans = 0;

  for (let i = 0; i < allowed.length; i++) {
    mpp1[allowed[i]] = (mpp1[allowed[i]] || 0) + 1;
  }

  for (let j = 0; j < words.length; j++) {
    let str = words[j];
    if (checkProperty(mpp1, str)) {
      ans++;
    }
  }

  return ans;
};

// Two Sum
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.
var twoSum = function (nums, target) {
  // Using map in O(n)
  let mpp = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (mpp.has(target - nums[i])) {
      return [mpp.get(target - nums[i]), i];
    } else {
      mpp.set(nums[i], i);
    }
  }

  return [];
};

// Sum of Unique Elements
// You are given an integer array nums. The unique elements of an array are the elements that appear exactly once in the array. Return the sum of all the unique elements of nums.
var sumOfUnique = function (nums) {
  // Store all elements in the object with its frequency count
  let obj = {};
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    obj[nums[i]] = (obj[nums[i]] || 0) + 1;
  }

  for (let x in obj) {
    if (obj[x] == 1) {
      // x is in "string" so to add it we convert it to int and then add
      sum += Number(x);
    }
  }

  return sum;
};

// Unique Number of Occurrences
// Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.
var uniqueOccurrences = function (arr) {
  // Store all elements and their frequencies in Object
  // then check all values of object should be unique
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    // storing all elements in object
    obj[arr[i]] = (obj[arr[i]] || 0) + 1;
  }

  let values = Object.values(obj); // Gives all values of obj in an array
  if (checkUniqueness(values.sort())) {
    // sending sorted array to check if all values are unique or not
    return true;
  }

  return false;
};

function checkUniqueness(val) {
  // checking all values are unique inside object or not
  for (let i = 0; i < val.length; i++) {
    if (val[i] == val[i + 1]) {
      return false;
    }
  }

  return true;
}

// Roman to Integer
/*
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.



Example 1:

Input: s = "III"
Output: 3
Explanation: III = 3
*/

var romanToInt = function (s) {
  // We can see a trick
  // VI = 6 but IV = 4 we can see if its descending so we add V + I = 5 + 1 = 6
  // But if its Ascending like IV we subtract V from I, V - I = 5 - 1 = 4
  // So we need to check the pairs and see if its ascending or descending
  // First of all we store the given symbols in our map
  const mpp = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    let curr = mpp[s[i]];
    let next = mpp[s[i + 1]];

    if (curr < next) {
      // means subtract next - curr
      // we do i++ as we have covered 2 element at once by subtracting
      result += next - curr;
      i++;
    } else {
      // simply add
      result += curr;
    }
  }

  return result;
};

// Integer to Roman
/*
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given an integer, convert it to a roman numeral.

Example 1:

Input: num = 3
Output: "III"
Explanation: 3 is represented as 3 ones.
Example 2:

Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
*/

function appendingMinorMiddleMajor(minor, middle, major, val, result) {
  if (val <= 3) {
    for (let i = 1; i <= val; i++) {
      result += minor;
    }
  } else if (val == 4) {
    result += minor;
    result += middle;
  } else if (val == 5) {
    result += middle;
  } else if (val <= 8) {
    result += middle;
    for (let i = 6; i <= val; i++) {
      result += minor;
    }
  } else if (val == 9) {
    result += minor;
    result += major;
  }
}

var intToRoman = function (num) {
  /*
     We see that rules for (1,2,3) are same, (4,5) are same, (6,7,8) are same, (9,10) are same
     1 - I, 2 - II, 3 - III
     4 - IV, 5 - V
     6 - VI, 7 - VII, 8 - VIII
     9 - IX, 10 - X
     for 1 to 10 we have minor - I, middle - V, major - X
     10 to 100 we have minor - X, middle - L, major - C
     100 to 1000 we have minor - C, middle - D, major - M
     Let see formation for 1 to 10
     1 - minor, 2 - minor minor minor, 3 - minor minor minor
     4 - minor middle, 5 - middle
     6 - middle-minor, 7 - middle-minor-minor, 8 - middle-minor-minor-minor
     9 - minor-major, 10 - major
     So we use this rule
    */

  // Processing for thousands
  let result = "";
  appendingMinorMiddleMajor("M", "*", "*", num / 1000, result);
  // decrease 1000th digit from number means 2456 becomes 2456%1000 = 456
  num = num % 1000;

  // Processing for hundredth
  appendingMinorMiddleMajor("C", "D", "M", num / 100, result);
  num = num % 100;

  // Processing for tenth
  appendingMinorMiddleMajor("X", "L", "C", num / 10, result);
  num = num % 10;

  // Processing for unit
  appendingMinorMiddleMajor("I", "V", "X", num, result);

  return result;
};

// Longest Substring Without Repeating Characters
/*
Given a string s, find the length of the longest substring without repeating characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
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

// Group Anagrams
/*
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
*/
var groupAnagrams = function (strs) {
  // Let us store anagrams as keys and strings as its values in form of array
  // We will sort the letters so that it is easy to find
  let obj = {};
  for (let x of strs) {
    let keys = x.split("").sort().join(""); // split string into characters and sort them and join them into an array
    if (obj[keys]) {
      // if it exists in the object, push the string
      obj[keys].push(x);
    } else {
      // else store that string for that anagram pair
      obj[keys] = [x];
    }
  }

  console.log(obj); // { aet: [ 'eat', 'tea', 'ate' ], ant: [ 'tan', 'nat' ], abt: [ 'bat' ] }

  // Object values has arrays which contains strings related to an particular anagram
  // Object.values gives us all values of object in form of array which is needed according to format of question
  return Object.values(obj);
};

// Find All Anagrams in a String
/*
Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:

Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
*/
var findAnagrams = function (s, p) {
  // Store p in a map
  let obj = {};
  for (let i = 0; i < p.length; i++) {
    obj[p[i]] = (obj[p[i]] || 0) + 1;
  }

  let res = [];

  let n = p.length;
  let i = 0;
  let j = 0;
  let count = 0;
  // Make a window of p.length and check
  while (j < s.length) {
    // if that character is in map means add into count
    if (obj[s[j]] > 0) count++;
    // remove it from object
    obj[s[j]]--;
    // move j pointer
    j++;

    // if count==p.length means we have one anagram store its starting index of substring
    if (count == p.length) res.push(i);
    // if window length is same as p.length and count != p.length yet. means we dont have anagram in this window so reduce count by moving starting pointer
    if (j - i == p.length) {
      // if that pointer has increased count so reduce it
      if (obj[s[i]] >= 0) count--;
      // add into map again
      obj[s[i]]++;
      // move starting pointer
      i++;
    }
  }

  return res;
};
