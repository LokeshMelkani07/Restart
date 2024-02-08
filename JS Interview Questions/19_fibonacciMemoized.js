// Create a JavaScript function that returns the Fibonacci sequence up to a given number, utilizing memoization for optimized performance.

function memoizedFibo(n, memo = {}) {
  if (n <= 1) {
    return n;
  }

  if (n in memo) {
    return memo[n];
  }

  memo[n] = fiboSequence(n - 1, memo) + fiboSequence(n - 2, memo);
  return memo[n];
}
