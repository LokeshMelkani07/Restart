// Implement a function that flattens a nested array in JavaScript, converting it into a single-level array.

function flattenArray(arr) {
  let result = [];

  arr.forEach((ele) => {
    if (Array.isArray(ele)) {
      result = result.concat(flattenArray(ele));
    } else {
      result.push(flattenArray);
    }
  });
}

// Example usage:
const nestedArray = [1, [2, [3, 4]], 5, [6]];
const flattened = flattenArray(nestedArray);
