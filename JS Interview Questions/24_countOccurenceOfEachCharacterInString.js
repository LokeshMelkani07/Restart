// Given a string, write a function to count the occurrences of each character in the string.

function countCharacters(str) {
  const charCount = {};
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  return charCount;
}

// Example usage:
const inputString = "hello";
console.log("Occurrences of each character:", countOccurrences(inputString));
