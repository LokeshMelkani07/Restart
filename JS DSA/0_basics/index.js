// Sum of all natural numbers from 1 to n

function sumNaturalNumber(num) {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  return sum;
  // Method 2
  // Using formula n(n+1)/2
  //   return num*(num+1)/2;
}

const ans = sumNaturalNumber(50);
console.log(ans);

// Question 2: Sum of digits of a number
// 1256 = 1+2+5+6 = 14
function sumOfDigits(num) {
  let sum = 0;
  while (num != 0) {
    sum += num % 10;
    // Math.floor to get Integer value
    num = Math.floor(num / 10);
  }

  return sum;
}

// Question 3: Count number of digits of a number
function numberOfDigits(num) {
  // We have to manage the negative number also
  num = Math.abs(num);
  // we will use do-while because we need it to run atleast once for say num = 0
  let count = 0;
  do {
    count++;
    num = Math.floor(num / 10);
  } while (num > 0);
  return count;
}

// Palindrome Number
// Palindrome is something which is same from starting or end
function palindrome(x) {
  // Find the reverse of the number
  // Find the reverse of the number
  let num1 = x;
  let reverseNumber = 0;
  while (num1 > 0) {
    let lastDigit = num1 % 10;
    reverseNumber = reverseNumber * 10 + lastDigit;
    num1 = Math.floor(num1 / 10);
  }

  return reverseNumber === x;
}

// Fibonacci Number
// Sum of first n fibo number
var fib = function (n) {
  if (n == 0) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }
  let firstSequence = 0;
  let secondSequence = 1;
  let result;
  for (let i = 2; i <= n; i++) {
    result = firstSequence + secondSequence;
    firstSequence = secondSequence;
    secondSequence = result;
  }

  return result;
};

// Missing Number
// Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
var missingNumber = function (nums) {
  // We have n distinct numbers so we have numbers from 0 to n where n is array length
  // We will find the sum of all digits of array say fTotal
  // We will find sum of all number from 1 to n say fn
  // missing Number = fn - fTotal
  let sumTotal = 0;
  for (let i = 0; i < nums.length; i++) {
    sumTotal += nums[i];
  }

  let sumN = (nums.length * (nums.length + 1)) / 2;
  return sumN - sumTotal;

  // One liner solution
  // return nums.length*(nums.length+1)/2 - nums.reduce((acc,curr) => acc + curr);
};

// Count Odd Numbers in an Interval Range
// Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).
var countOdds = function (low, high) {
  let count = 0;
  for (let i = low; i <= high; i++) {
    if (i & 1) {
      count++;
    }
  }

  return count;
};

// Fizz Buzz
/*
Given an integer n, return a string array answer (1-indexed) where:

    answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
    answer[i] == "Fizz" if i is divisible by 3.
    answer[i] == "Buzz" if i is divisible by 5.
    answer[i] == i (as a string) if none of the above conditions are true.

 Example 1:

Input: n = 3
Output: ["1","2","Fizz"]

Example 2:

Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
*/

var fizzBuzz = function (n) {
  let ans = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      ans.push("FizzBuzz");
    } else if (i % 3 == 0) {
      ans.push("Fizz");
    } else if (i % 5 == 0) {
      ans.push("Buzz");
    } else {
      ans.push(i.toString());
    }
  }

  return ans;
};

// Power of 2
var isPowerOfTwo = function (n) {
  for (let i = 0; i <= 30; i++) {
    let ans = Math.pow(2, i);

    if (ans == n) {
      return true;
    }
  }
  return false;
};

// Square root
// Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.
var mySqrt = function (x) {
  // Edge case
  // Constarints start from 0 so
  if (x <= 1) {
    return x;
  }

  // Now check from 2 to x
  for (let i = 2; i <= x; i++) {
    if (i * i == x) {
      return i;
    }
    if (i * i > x) {
      return i - 1;
    }
  }
};
