// Strings in JS
// Collection of characters is string
// String Methods in JS: https://www.geeksforgeeks.org/javascript-string-methods/
let firstName = "Lokesh";

// Length of a string
console.log(firstName.length);

console.log(firstName.charAt(0)); // Access specific element at specific index

console.log(firstName[0]); // Another way

console.log(firstName.charCodeAt(0)); // ASCII code of that letter at index 0

console.log(firstName.includes("l")); // Check if "l" present in that string or not

console.log(firstName.includes("Lokesh")); // same way

firstName.indexOf("l"); // get index of "l" in string

firstName.lastIndexOf("l"); // it finds "l" from end of the string

let anotherName = "Mohit";
// Compare 2 strings
firstName.localeCompare(anotherName); // -1 means not equal, 0 means equal

const str = "Lokesh is a good boy";

// Replace Lokesh with Rohit
str.replace("Lokesh", "Rohit"); // returns new string, but if there are more than 1 "Lokesh" it will only replace first occurence of "LOkesh", to replace all occurence of "Lokesh" we can use replaceAll or regex

str.replace("/Lokesh/g", "Rohit"); // regex way

str.substring(6, 12); // get substring

str.slice(-10, -1); // returns the substring, we can write -ve number in slice, means we can take characters from end of string but we cannot do it in substring thats the difference

str.search("Lokesh"); // search in the string

str.split("."); // divides the string into array from "." present in the string

const subString = str.split(" "); // break into array from " "
console.log(subString.join(" ")); // Join the array into string

console.log(str.startsWith("Lokesh")); // returns if substring starts with "Lokesh"
console.log(str.endsWith("Lokesh")); // returns if substring ends with "Lokesh"

const strTrim = "             Lokesh             ";
console.log(strTrim.trim()); // Removes whitespaces from the beginning and end of the string. Output: "Lokesh"

// We can also use trimStart() or trimEnd() to remove whitespaces from start or end specficially

const upperString = "lokesh";
const lowerString = "Lokesh";
console.log(upperString.toLocaleLowerCase); // convert to lowercase
console.log(upperString.toLocaleUpperCase); // to uppercase

// Difference between toLowerCase & toLocaleLowerCase
// The toLocaleLowerCase() method returns the value of the string converted to lower case according to any locale-specific case mappings. toLocaleLowerCase() does not affect the value of the string itself. In most cases, this will produce the same result as toLowerCase(), but for some locales, such as Turkish, whose case mappings do not follow the default case mappings in Unicode, there may be a different result.

let num = 10;
console.log(num.toString()); // Convert number to string

// Convert object to string
let obj = {
  name: "firstname",
  age: 21,
};

console.log(JSON.stringify(obj));

// Concatenate strings
const lastName = "  melkani";
console.log(firstName.concat(lastName, " is a good boy")); // Lokesh Melkani is a good boy
console.log(firstName + lastName); // Same work of concatenation
console.log(`${firstName} ${lastName} is a Good boy`); // same work

// Questions
// Find the Index of the First Occurrence in a String
// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
var strStr = function (haystack, needle) {
  return haystack.includes(needle) ? haystack.indexOf(needle) : -1;
};

// Reverse String
// Write a function that reverses a string. The input string is given as an array of characters s.You must do this by modifying the input array in-place with O(1) extra memory.

var reverseString = function (s) {
  return s.reverse();
};

// Valid Anagram
// Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
var isAnagram = function (s, t) {
  return s.split("").sort().join("") == t.split("").sort().join("");
};

// Longest Common Prefix
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

  // Questions says, check common word with which every other word is starting from in the string array
  let prefix = "";
  for (let j = 0; j < smallestString.length; j++) {
    for (let k = 0; k < strs.length; k++) {
      if (strs[k] == smallestString) {
        continue;
      }

      // we check if that index of string has that character or not
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
  // Convert string to array
  // In even index add, element from word2
  // In odd index add, element from word1
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

// Length of Last Word
// Given a string s consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters only.

var lengthOfLastWord = function (s) {
  // Trim all the whitespaces from the string
  const trimString = s.trim();
  // Now split using " "
  const splitString = trimString.split(" ");
  // As its now converted to any array so get the length of last index of that array
  return splitString[splitString.length - 1].length;
};
