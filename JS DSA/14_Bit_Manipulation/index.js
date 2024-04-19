// Bit Manipulation

// To convert Decimal to Binary
// (13) Decimal = Divide 13 by 2 and keep the remainder till 1 comes and then take remainders from low to high
function convertDecimalToBinary(n) {
  // TC: O(logn)
  // SC: O(logn)
  let res = "";
  while (n != 1) {
    // Store the remainders till n != 1
    if (res % 2 == 1) {
      res = res + "1";
    } else {
      res = res + "0";
    }
    n = n / 2;
  }
  // We need to take remainder from low to high so reverse it
  reverseString(res);
  return res;
}

function reverseString(str) {
  // return a new array of strings
  const arrayStrings = str.split("");

  // reverse the new created array elements
  const reverseArray = arrayStrings.reverse();

  // join all elements of the array into a string
  const joinArray = reverseArray.join("");

  // return the reversed string
  return joinArray;
}

// Convert Binary to Decimal, given a string of binary
// (1101) Binary = 1*2^0 + 0*2^1 + 1*2^1 + 1*2^1
function convertBinaryToDecimal(x) {
  // TC: O(logn)
  let j = x.length - 1;
  let n = 1;
  let ans = 0;
  while (j != 0) {
    // 2^anything * 0 = 0 only so no need to compute 0 vale
    if (x[j] == "1") {
      ans += x[j] * n;
    }
    n = n * 2;
    j--;
  }

  return ans;
}

// When adding a number and a string, JavaScript will treat the number as a string.
// let x = 16 + "Volvo"; is treated as let x = "16" + "Volvo"; by JS
// JavaScript evaluates expressions from left to right. Different sequences can produce different results:
// let x = 16 + 4 + "Volvo"; produces 20Volvo because left to right Number comes first so they add to 20 then String comes to whole gets converted to string
// let x = "Volvo" + 16 + 4; gives Volvo164 as Strng is encountered first so all gets converted to string
//JavaScript has dynamic types. This means that the same variable can be used to hold different data types:
/*
let x;       Now x is undefined
x = 5;       Now x is a Number
x = "John";  Now x is a String
*/
// JS strings can be stored in ' ' or " "
// We can also write quotes inside JS string using ' or " but it should not match the outer commas
/*
Single quote inside double quotes:
let answer1 = "It's alright";

Single quotes inside double quotes:
let answer2 = "He is called 'Johnny'";

Double quotes inside single quotes:
let answer3 = 'He is called "Johnny"';
*/
// All JavaScript numbers are stored as decimal numbers (floating point).Numbers can be written with, or without decimals:
// Extra large or extra small numbers can be written with scientific (exponential) notation:
/*
Example
let y = 123e5;    // 12300000
let z = 123e-5;   // 0.00123
*/
// Javascript numbers are always one type:
// double (64-bit floating point).
// JavaScript BigInt is a new datatype (ES2020) that can be used to store integer values that are too big to be represented by a normal JavaScript Number. let x = BigInt("123456789012345678901234567890");
// In JavaScript, a variable without a value, has the value undefined. The type is also undefined. let car;    // Value is undefined, type is undefined
// Any variable can be emptied, by setting the value to undefined. The type will also be undefined.

// 1s Complement
// 1s Complement of (13)Decimal is Convert it to Binary (1101) and then flip the bits 1->0 and 0->1 i.e 0010

// 2s Complement
// Find 1s Complement, add 1 to it.
// 1101 + 0001 = 0011

// AND Operator
// 1&1 = 1, 0&1 = 0, 0&0 = 0, 1&0 = 0

// OR Operator
// 1|1 = 1, 0|1 = 1, 0|0 = 0, 1|0 = 1

// XOR operator
// 0^1 = 1, 1^0 = 1, 1^1 = 0, 0^0 = 0

// Shift Operator
// x = 13 >> 1 means right shift, shift 1 to right in binary rep of 13
// x = 13 >> 2 means right shift, shift 2 times to right in binary rep of 13
// 1 1 0 1 -> 0 0 1 1
// Right shift a>>b = a / 2^b
// Left shift a<<b = a * 2^b
// x = 13 << 1 means left shift, 1 1 0 1 -> 1 0 1 0

// How does computer stores -13 or +13
// int is 64 bits so first bit if we go from left to right is reserved for sign, 0 -> +ve, 1 -> -ve
// To store Negative Number, its 2s Complement is stored

// Note that all the positive and negative integers whose magnitude is no greater than 2^53 are representable in the Number type (indeed, the integer 0 has two representations, +0 and -0). To safely use integers larger than this, you need to use BigInt, which has no upper bound. Note that the bitwise operators and shift operators operate on 32-bit integers, so in that case, the max safe integer is 2^31-1

// Not Operator (~)
// It works in 2 steps. flip all the bits, Check if number is negative. if yes, store its 2s Complmenet. else, Stop
// (~5) -> 000....101 is normal rep of +5 where first 0 means its +ve. Now flip all bits it becomes 1111.....010.
// Now it checks, first bit is 1 means its negative so store its 2s Complement, flip all bits except sign bit so (1)000....101 + 1 = (1)....0110 which is -6 so (~5) = -6
// ~(-6) means first convert the 6 in Binary to its 2s Complement as Computer always stores -6 in its 2s Complement then flip bits
