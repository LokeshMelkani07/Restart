// Write a JavaScript program to find the largest element in a nested array.

// We have an Array in which there are certain elements and certain arrays also
// We need to get the maximum element out of it

function maxElement(n) {
  let largest = -Infinity;
  for (let i = 0; i < n.length; i++) {
    if (Array.isArray(n[i])) {
      // if its an array
      // go inside it recursively
      let nestedArray = maxElement(n[i]);
      largest = Math.max(largest, nestedArray);
    } else {
      // its an normal element
      largest = Math.max(largest, n[i]);
    }
  }

  return largest;
}

const arr = [1, 2, [4, 6], 3, 2, [7, 8, 9], [3, 2, 1], 10];
console.log(maxElement(arr));
