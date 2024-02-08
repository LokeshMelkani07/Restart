// Implement a function that checks if a given string is a palindrome (reads the same forwards and backwards) while ignoring whitespace and punctuation.

function isPalindrome(str) {
  // Remove whitespace and punctuation, and convert to lowercase
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Compare the cleaned string with its reversed version
  return cleanStr === cleanStr.split("").reverse().join("");
}

// Example usage:
const testString1 = "A man, a plan, a canal, Panama";
console.log(`${testString1} is a palindrome? ${isPalindrome(testString1)}`); // Output: true

const testString2 = "race car";
console.log(`${testString2} is a palindrome? ${isPalindrome(testString2)}`); // Output: true

/*
The split() method splits a String object into an array of strings by separating the string into substrings.

The splice() method changes the content of an array by removing existing elements and/or adding new elements.

The join() method joins all elements of an array into a string.

*/
var a = "asdasd|dasd|rttewrtert";
var b = a.split("|");
// ["asdasd", "dasd", "rttewrtert"]
var c = b.splice(1);
// ["dasd", "rttewrtert"]
var d = c.join("");
// dasdrttewrtert
