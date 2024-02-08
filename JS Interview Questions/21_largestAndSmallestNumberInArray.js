// Given an array of numbers, write a function to find the largest and smallest numbers in the array.

function largestAndSmallest(arr) {
  let smallest = +Infinity;
  let largest = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }

    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }

  return [smallest, largest];
}

// OR

function findMinMax(arr) {
  let min = Math.min(...arr);

  let max = Math.max(...arr);

  return [min, max];
}
