// Check whether a string is palindrome or not
function isPalindrome(str) {
  // Base case: If the string is empty or has only one character, it's a palindrome
  if (str.length <= 1) {
    return true;
  }

  // Check if the first and last characters are the same
  if (str[0].toLowerCase() !== str[str.length - 1].toLowerCase()) {
    return false;
  }

  // Recursively check the remaining substring (excluding the first and last characters)
  return isPalindrome(str.slice(1, str.length - 1));
}

// Create pow(x, n) function which returns x^n
function pow(x, n) {
  // Base cases:
  if (n === 0) {
    return 1;
  } else if (n < 0) {
    return 1 / pow(x, -n); // Handle negative exponents
  }

  // Recursive case: x^n = x * x^(n-1)
  return x * pow(x, n - 1);
}

// Create a function which returns the sum of digits of a number (e.g., sumOfDigits(453) is 12)
function sumOfDigits(num) {
  // Base case: If the number is 0, the sum is 0.
  if (num === 0) {
    return 0;
  }

  // Recursive case: The sum of digits is the last digit of the number plus the sum of digits of the remaining number (excluding the last digit).
  return (num % 10) + sumOfDigits(Math.floor(num / 10));
}

// Create a function which returns the number of digits in a number (e.g., countDigits(453) is 3)
function countDigits(num) {
  // Base case: If the number is 0, it has 1 digit (0 itself).
  if (num === 0) {
    return 1;
  }

  // Recursive case: The number of digits is 1 plus the number of digits in the remaining number (excluding the last digit).
  return 1 + countDigits(Math.floor(num / 10));
}

// Calculate LCM and GCD using recursion
function gcd(a, b) {
  // Base case: If b is 0, then GCD(a, b) is a.
  if (b === 0) {
    return a;
  }

  // Recursive case: GCD(a, b) = GCD(b, a % b)
  return gcd(b, a % b);
}

function lcm(a, b) {
  // If either number is 0, the LCM is 0.
  if (a === 0 || b === 0) {
    return 0;
  }

  // Calculate GCD first (can be replaced with iterative approach for efficiency)
  const divisor = gcd(a, b);

  // LCM is product of a and b divided by their GCD (to avoid redundant factors)
  return (a * b) / divisor;
}

// Another approach for LCM
function findLCM(a, b) {
  let lar = Math.max(a, b);
  let small = Math.min(a, b);
  for (i = lar; ; i += lar) {
    if (i % small == 0) return i;
  }
}

// Create a function to reverse a string
function reverseString(str) {
  // Base case: If the string is empty or has only one character, it's already reversed.
  if (str.length <= 1) {
    return str;
  }

  // Recursive case: The reversed string is the last character appended to the reversed version of the remaining substring (excluding the last character).
  return str[str.length - 1] + reverseString(str.slice(0, str.length - 1));
}
