// Find the Index of the First Occurrence in a String
// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
var strStr = function (haystack, needle) {
  return haystack.indexOf(needle);
};

var strStr = function (haystack, needle) {
  // first of all we will find the first character of needle inside haystack
  // if its found then we check substring from that index to needle.length and match with needle
  // else we return -1
  // we will run the loop till haystack.length - needle.length + 1 because of out of bound condition
  for (let j = 0; j < haystack.length - needle.length + 1; j++) {
    if (haystack.charAt(j) == needle.charAt(0)) {
      let substr = haystack.substring(j, j + needle.length);
      if (needle === substr) {
        return j;
      }
    }
  }

  return -1;
};

// Reverse String
// Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory
var reverseString = function (s) {
  let i = 0;
  let j = s.length - 1;
  while (i <= j) {
    let temp = s[i];
    s[i] = s[j];
    s[j] = temp;
    i++;
    j--;
  }

  return s;
};

// Score of a String
/*
You are given a string s. The score of a string is defined as the sum of the absolute difference between the ASCII values of adjacent characters.

Return the score of s.

Example 1:
Input: s = "hello"
Output: 13
Explanation:
The ASCII values of the characters in s are: 'h' = 104, 'e' = 101, 'l' = 108, 'o' = 111. So, the score of s would be |104 - 101| + |101 - 108| + |108 - 108| + |108 - 111| = 3 + 7 + 0 + 3 = 13.
*/
var scoreOfString = function (s) {
  let res = 0;
  let n = s.length;
  for (let i = 0; i < n - 1; i++) {
    res += Math.abs(s.charCodeAt(i) - s.charCodeAt(i + 1));
  }

  return res;
};

// Valid Anagram
// Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  let letters = {};
  //create hashmap for both words, based on a counter
  for (let i = 0; i < s.length; i++) {
    letters[s[i]] = letters[s[i]] ? letters[s[i]] + 1 : 1;
    letters[t[i]] = letters[t[i]] ? letters[t[i]] - 1 : -1;
  }

  for (let letter in letters) {
    //this check for duplicates since if all letters are the same, we will end up with 0
    if (letters[letter] !== 0) {
      return false;
    }
  }
  return true;
};

var isAnagram = function (s, t) {
  // using in-built functions
  return s.split("").sort().join("") === t.split("").sort().join("");
};

//  Longest Common Prefix
// Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".
var longestCommonPrefix = function (strs) {
  // Take the smallest string and take prefix = ""
  // add one character each time from smallests string in prefix and
  // check if prefix is present in other strings or not
  let smallestString = strs[0];
  for (let i = 1; i < strs.length; i++) {
    if (strs[i].length <= smallestString.length) {
      smallestString = strs[i];
    }
  }

  console.log(smallestString);

  let prefix = "";
  for (let j = 0; j < smallestString.length; j++) {
    for (let k = 0; k < strs.length; k++) {
      if (strs[k] == smallestString) {
        continue;
      }

      if (strs[k][j] != smallestString[j]) {
        return prefix;
      }
    }
    prefix += smallestString[j];
  }

  return prefix;
};

// Merge Strings Alternately
// You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string. Return the merged string.
var mergeAlternately = function (word1, word2) {
  let str1 = word1.split("");
  let str2 = word2.split("");

  let res = "";
  let i = 0;
  let j = 0;
  let k = 1;
  while (i < str1.length && j < str2.length) {
    if (k % 2 == 0) {
      res += str2[j++];
    } else {
      res += str1[i++];
    }
    k++;
  }

  while (i < str1.length) {
    res += str1[i++];
  }

  while (j < str2.length) {
    res += str2[j++];
  }

  return res;
};

// Length of last word
// Given a string s consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters only.
var lengthOfLastWord = function (s) {
  // Trim all the whitespaces from the string
  const trimString = s.trim();
  // Now split using " "
  const splitString = trimString.split(" ");
  // As its now converted to any array so get the length of last index of that array
  return splitString[splitString.length - 1].length;
};

// Valid Palindrome
// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.
var isPalindrome = function (s) {
  let str = "";
  // store all non alpha-numeric letters in a string with ignoring all white spaces
  for (let i = 0; i < s.length; i++) {
    if (
      (s[i].toLowerCase() >= "a" && s[i].toLowerCase() <= "z") ||
      (s[i].toLowerCase() >= "A" && s[i].toLowerCase() <= "Z") ||
      (s[i].toLowerCase() >= "0" && s[i].toLowerCase() <= "9" && str[i] != " ")
    ) {
      str += s[i].toLowerCase();
    }
  }

  // check if that string is an palindrome or not
  let i = 0;
  let j = str.length - 1;

  while (i <= j) {
    if (str[i] != str[j]) {
      return false;
    }
    i++;
    j--;
  }

  return true;
};

// String Compression
// Given an array of characters chars, compress it using the following algorithm: Begin with an empty string s. For each group of consecutive repeating characters in chars: If the group's length is 1, append the character to s. Otherwise, append the character followed by the group's length. The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars. After you are done modifying the input array, return the new length of the array. You must write an algorithm that uses only constant extra space.
// Input: chars = ["a","a","b","b","c","c","c"]
// Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
// Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
var compress = function (temp) {
  let res = "";
  let count = 0;
  for (let i = 0; i < temp.length; i++) {
    count++;
    // if its unique character, add it in the string else count it
    if (temp[i] != temp[i + 1]) {
      res = res + temp[i] + count;
      // now new character starts so make count = 0
      count = 0;
    }
  }

  return res;
};

// Reverse words in a string
// Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space. Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.
var reverseWords = function (s) {
  // split the string into an array
  // begin from end of the array and add words in the result string while ignoring whitespaces
  let arr = s.trim().split(" ");
  console.log(arr);
  let res = "";
  for (let j = arr.length - 1; j >= 0; j--) {
    if (arr[j] == "") {
      continue;
    }

    // if length of result string is more than 0 then add a whitespace before adding new word
    if (res.length > 0) {
      res += " ";
    }

    res += arr[j];
  }

  return res;
};

// Reverse Vowels of a String
// Given a string s, reverse only all the vowels in the string and return it. The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.
var reverseVowels = function (s) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  let chars = s.split(""); // Convert string to character array for in-place modification

  let left = 0,
    right = chars.length - 1;

  while (left < right) {
    while (left < right && !vowels.has(chars[left])) {
      left++; // Skip non-vowels on the left
    }
    while (left < right && !vowels.has(chars[right])) {
      right--; // Skip non-vowels on the right
    }
    if (left < right) {
      // Swap vowels if both pointers meet vowels
      [chars[left], chars[right]] = [chars[right], chars[left]];
      left++;
      right--;
    }
  }

  return chars.join(""); // Join the character array back into a string
};

// Rotate String
// Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s. A shift on s consists of moving the leftmost character of s to the rightmost position. For example, if s = "abcde", then it will be "bcdea" after one shift.
var rotateString = function (s, goal) {
  // just take substring, everytime add first character to the end of string
  // s.substring(1) skips first character from string everytime, abcde becomes bcde
  console.log(s.substring(1));
  let n = s.length;
  let i = 0;
  while (i < n) {
    s = s.substring(1) + s[0];
    if (s === goal) {
      return true;
    }
    i++;
  }

  return false;
};

// Compare Version Numbers
/*
Given two version strings, version1 and version2, compare them. A version string consists of revisions separated by dots '.'. The value of the revision is its integer conversion ignoring leading zeros.

To compare version strings, compare their revision values in left-to-right order. If one of the version strings has fewer revisions, treat the missing revision values as 0.

Return the following:

If version1 < version2, return -1.
If version1 > version2, return 1.
Otherwise, return 0.

Example 1:
Input: version1 = "1.2", version2 = "1.10"
Output: -1
Explanation:
version1's second revision is "2" and version2's second revision is "10": 2 < 10, so version1 < version2.

Example 2:
Input: version1 = "1.01", version2 = "1.001"
Output: 0
Explanation:
Ignoring leading zeroes, both "01" and "001" represent the same integer "1".
*/
var compareVersion = function (version1, version2) {
  // Each version number contains 2.45.64.23.67
  // and 2,45,64,23,67 are revisions
  // Each revision is separated by a '.'
  // Ignore any leading zeroes in any revision means 001 = 1 or 00004 = 4 only
  // if there is no digit, consider it as 0
  // we need to start comparing from left -> right
  // if v1>v2 return 1, v2>v1 return -1 else return 0
  // we will take the number before . everytime from both strings and compare then
  let v1length = version1.length;
  let v2length = version2.length;
  if (v1length == 0) {
    return -1;
  } else if (v2length == 0) {
    return 1;
  }

  let i = 0;
  let j = 0;
  while (i < v1length || j < v2length) {
    let n1 = 0,
      n2 = 0;
    while (i < v1length && version1[i] != ".") {
      n1 = n1 * 10 + (version1[i] - "0");
      i++;
    }

    while (j < v2length && version2[j] != ".") {
      n2 = n2 * 10 + (version2[j] - "0");
      j++;
    }

    if (n1 > n2) return 1;
    else if (n2 > n1) return -1;

    i++;
    j++;
  }

  return 0;
};
