// Write a function that takes an array of integers as input and returns a new array with only the unique elements.

function getUniqueElements(arr) {
  // Create a Set to store unique elements
  const uniqueSet = new Set(arr);

  // Convert the Set back to an array
  const uniqueArray = Array.from(uniqueSet);

  return uniqueArray;
}

// Example usage:
const inputArray = [1, 2, 3, 4, 2, 3, 5, 6, 1];
console.log("Unique elements:", getUniqueElements(inputArray)); // Output: [1, 2, 3, 4, 5, 6]
