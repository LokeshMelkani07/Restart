// Implement a function to reverse a string without using the built-in reverse() method.

function reverseString(str) {
  let n = str.length;
  let res = "";
  for (let i = n - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
}
