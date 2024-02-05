// Write a JavaScript program to reverse a given string.

function reverseString(str) {
  // Split the string into an array of characters, reverse the array, and join it back into a string
  return str.split("").reverse().join("");
}

// Example usage:
const originalString = "Hello, World!";
const reversedString = reverseString(originalString);
console.log("Original string:", originalString);
console.log("Reversed string:", reversedString);
