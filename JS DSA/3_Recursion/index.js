// Recursion in JS
function fun() {
  console.log("fun");
  fun();
}

fun(); // Runs indefinately

function func(n) {
  if (n == 0) {
    // Base case
    return;
  }

  console.log(n);
  func(n - 1);
}

func(10);

// Questions
// Factorial of a number
function fact(n) {
  // n! = n*(n-1)*(n-2)...3*2*1
  if (n == 0) {
    return 1;
  }

  return n * fact(n - 1);
}

fact(10);

// Sum of Array
function sumOfArray(arr) {
  if (arr.length === 0) {
    return 0;
  }

  const lastElement = arr.pop();
  return lastElement + sumOfArray(arr);
}

sumOfArray([1, 2, 3, 4]);

// Fibonacci Number
function fibo(n) {
  if (n == 0 || n == 1) {
    return n;
  }

  return fibo(n - 1) + fibo(n - 2);
}
