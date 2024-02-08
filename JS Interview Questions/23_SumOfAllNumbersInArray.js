// Implement a function to find the sum of all the numbers in an array

function SumOfAllNumbers(arr) {
  return arr.reduce((acc, curr) => {
    acc += curr;
  }, 0);
}
