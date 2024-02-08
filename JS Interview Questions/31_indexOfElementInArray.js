// Implement a function that finds the index of a specific element in an array. If the element is not found, the function should return -1.

function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index if the target element is found
    }
  }
  return -1; // Return -1 if the target element is not found
}

// Example usage:
const array = [1, 2, 3, 4, 5];
const targetElement = 3;
console.log(
  "Index of",
  targetElement,
  "in the array:",
  findIndex(array, targetElement)
); // Output: 2
