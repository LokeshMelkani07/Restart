// Write a JavaScript program to calculate the factorial of a given number.

function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

const number = factorial(5);
console.log(number);
