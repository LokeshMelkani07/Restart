// Write a function that determines if two strings are anagrams of each other

// If two strings are anagram of each other then there sorted versions will also be equal
function checkAnagram(str1, str2) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr1 = str1.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const cleanStr2 = str2.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Sort the characters in the strings
  const sortedStr1 = cleanStr1.split("").sort().join("");
  const sortedStr2 = cleanStr2.split("").sort().join("");

  // Compare the sorted strings
  return sortedStr1 === sortedStr2;
}

// Example usage:
const str1 = "listen";
const str2 = "silent";
console.log(`${str1} and ${str2} are anagrams? ${areAnagrams(str1, str2)}`); // Output: true
