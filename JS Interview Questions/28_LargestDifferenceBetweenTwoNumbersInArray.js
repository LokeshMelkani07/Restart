// Write a function that takes an array of integers and returns the largest difference between any two numbers in the array.

// Max Difference will be between smallest number and the largest number so
function largestDifference(arr) {
  if (arr.length < 2) {
    return 0; // There must be at least two numbers in the array
  }

  let min = arr[0];
  let maxDifference = 0;

  for (let i = 1; i < arr.length; i++) {
    maxDifference = Math.max(maxDifference, arr[i] - min);
    min = Math.min(min, arr[i]);
  }

  return maxDifference;
}

// Example usage:
const numbers = [7, 2, 8, 4, 9, 5];
console.log("Largest difference:", largestDifference(numbers)); // Output: 7 (9 - 2)
