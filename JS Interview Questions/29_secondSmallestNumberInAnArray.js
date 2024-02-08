// Implement a function that finds the second smallest element in an array of integers.

function secondSmallest(arr) {
  if (arr.length < 2) {
    return undefined;
  }

  let smallest = +Infinity;
  let secondSmallest = +Infinity;

  for (let i of arr) {
    if (i < smallest) {
      // we have new minimum
      secondSmallest = smallest;
      smallest = i;
    } else if (i < secondSmallest && i !== smallest) {
      secondSmallest = i;
    }

    return secondSmallest === Infinity ? undefined : secondSmallest;
  }
}

// Example usage:
const numbers = [7, 2, 8, 4, 9, 5];
console.log("Second smallest element:", secondSmallest(numbers)); // Output: 4
