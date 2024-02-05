// Write a JavaScript program to find the maximum number in an array.

function maxInArray(array) {
  if (array.length == 0) {
    return "Array is empty";
  }

  // assume first element is maximum
  let max = array[0];

  for (let i = 1; i < array.array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  return max;
}

const array = [1, 45, 32, 56, 78];
const ans = maxInArray(array);
console.log(ans);
