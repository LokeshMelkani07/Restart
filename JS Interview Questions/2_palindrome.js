// Write a JavaScript function to check if a given string is a palindrome (reads the same forwards and backwards).

function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  // Compare the clean string with its reverse
  return cleanStr === cleanStr.split("").reverse().join("");
}

// Example usage:
const str1 = "A man, a plan, a canal, Panama";
const str2 = "racecar";
const str3 = "hello";

console.log(isPalindrome(str1)); // Output: true
console.log(isPalindrome(str2)); // Output: true
console.log(isPalindrome(str3)); // Output: false
