// Swap 2 Numbers using Bit Manipulation
// We can do this by using a third variable but without third variable, we need XOR operator
// XOR of same numbers is 0, 5^5 = 0, anything^0 = 1
function swapTwoNumbers(x, y) {
  x = x ^ y;
  y = x ^ y; // y = (x^y)^y = x
  x = x ^ y; // x = (x^y)^x = y
}

// Check if ith bit is set or not in Number N
// N = 13, i = 2
// bits start from 0 moving from right to left
// We will write 13 into its binary, create a mask of 1<<i and then & it with Binary rep of 13
// 1&1 = 1, 0&1 = 0 so we get ith bit using mask
// We can also do its right shift, (13>>i & 1). if gives 1 means set or else not set
function checkIthBit(N, i) {
  // Let say N is a string containing binary representation
  // TC: O(1) as bit operations are very fast
  let mask = 1 << i;
  if (N & mask) {
    return true;
  }

  return false;
}

// Set the ith bit
// Same as previous one, create a mask and do OR

function setIthBit(N, i) {
  // Let say N is a string containing binary representation
  // TC: O(1) as bit operations are very fast
  let mask = 1 << i;
  N = N | mask;
}

// Clear the ith bit
// means make ith bit to 0, same as previous one but somehow we need a mask which has ith bit as 0 rest all 1 and we do N & mask
// To make mask we do ~(1<<i)
function clearIthBit(N, i) {
  // Let say N is a string containing binary representation
  // TC: O(1) as bit operations are very fast
  let mask = 1 << i;
  N = N & ~mask;
}

// Toggle the ith bit
// Make 1 -> 0 and 0 -> 1
// Make a mask 1<<i and use XOR operator
// 1^1 = 0, 0^0 = 0, 1^0 = 1, 0^1 = 1
function toggleIthBit(N, i) {
  // Let say N is a string containing binary representation
  // TC: O(1) as bit operations are very fast
  let mask = 1 << i;
  N = N ^ mask;
}

// Remove the last set bit (rightmost set bit)
// Just an Observation N = 16 is 10000 and N = 15 is 01111, N = 40 is 101000 and N = 39 is 100111 so if we do N & (N-1) We remove the last set bit easily
function removeLastSetBit(N) {
  return N & (N - 1);
}

// Check if N is power of 2 or not
// Brute force, Every power of 2 will have 1 set bit only
// if N & N-1 == 0 means its a power of 2
// 16 = 10000, 15 = 1111
// 8 = 1000, 7 = 111
// 10 = 1010, 9 = 1001
// We observe after first set bit of 10 all bits are reversed in 9 rest things are same
function powerofTwo(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) == 0;
}

// Count the number of set bits in a given Number
// We need to convert Decimal to Binary and when remainder comes 1, do count++
// To optimise it or make it faster, we can use bit opetations instead of normal operations
// In Binary Search instead of (low + high)/2 we can also write (low + high) >> 1
function countSetBit(n) {
  let count = 0;
  while (n != 1) {
    // n % 2 === 1 means its checking for ODD number
    // Last bit of an ODD number is always 1 so when we do any odd & 1 we get 1
    // Instead of n%2==1 we can also write n&1==1
    // if (n % 2 == 1) {
    if (n & 1) {
      count++;
    }
    // above whole statement can also be written as count += n&1

    // Below statement can also be written as n = n>>1
    n = n >> 1;
    // n = n / 2;
  }

  if (n == 1) count++;
  return count;
}

// Minimum Bit Flips to Convert Number
//  bit flip of a number x is choosing a bit in the binary representation of x and flipping it from either 0 to 1 or 1 to 0. For example, for x = 7, the binary representation is 111 and we may choose any bit (including any leading zeros not shown) and flip it. We can flip the first bit from the right to get 110, flip the second bit from the right to get 101, flip the fifth bit from the right (a leading zero) to get 10111, etc. Given two integers start and goal, return the minimum number of bit flips to convert start to goal.
var minBitFlips = function (start, goal) {
  // XOR is only operator which works on different bits
  // 0^1 = 1, 1^0 = 1 so it can tell us the different bits in start and goal
  let a = start ^ goal;
  // once we have the result, just count number of set bits in it
  let count = 0;

  // for that we use rightshift operator
  while (a !== 0) {
    if (a & 1) {
      count++;
    }

    a = a >> 1;
  }

  return count;
};

// Power Set or Subsets
// Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
var subsets = function (nums) {
  // We know if there are 3 element, number of subset is 2^3 = 8
  // if there are 2 element, number of subset is 2^2 = 4
  // if there are n elements, number of subsets is 2^n
  // we can also write 2^n as 1<<n
  // we see [1,2,3] can be represented in terms of 2 1 0 indexes
  // now we can write binary representation from 0 to 2^3 -1 = 8 - 1 = 7
  // where 0 means that index is not included, 1 means that index is included
  // 0 0 0 = [], 0 0 1 = [3] = 0 1 0 = [2], 1 0 0 = [1], 1 0 1 = [1,3]....1 1 1 = [1,2,3]
  let n = nums.length;
  let ans = [];
  for (let i = 0; i < 1 << n; i++) {
    let arr = [];
    for (let j = 0; j < n; j++) {
      // now check the set bits
      if (i & (1 << j)) {
        arr.push(nums[j]);
      }
    }
    ans.push(arr);
  }

  return ans;
};

// Single Number
// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.
var singleNumber = function (nums) {
  // We can think of using map to store frequency and check
  // but we can also think of using XOR operator as we know, a^a = 0, a^0 = a
  // In [4,1,2,1,2], all same number gives res = 0 ^ 4 = 4
  // 4^1^1^2^2 = 4 so thats the answer
  let XOR = 0;
  for (let i = 0; i < nums.length; i++) {
    XOR = XOR ^ nums[i];
  }

  return XOR;
};

// Single Number II
// Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it.
// Input: nums = [0,1,0,1,0,1,99], Output: 99
var singleNumber = function (nums) {
  // [2,2,3,2] has [10] [10] [11] [10] if we start checking rightmost bit of [2,2,3,2] and if number of set bit is multiple of 3 means our resultant has that rightmost bit as not set because its given that every element repeats thrice except one element
  // now we check 1th index of [2,2,3,2] ki binary representation, if its number of set bits are not multiple of 3 means 1th bit of our result is set
  // this way we form our resultant number
  let ans = 0;
  for (let index = 0; index <= 31; index++) {
    // we have 32 bits so we check for all of them
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      // check for all element of nums array
      if (nums[i] & (1 << index)) {
        // if index bit is set count++
        count++;
      }
    }

    if (count % 3 == 1) {
      // means number of set bits are not multiple of 3 so our answe has that bit as set so set the index bit of ans
      ans = ans & (1 << index);
    }
  }

  return ans;
};

var singleNumber = function (nums) {
  // More Optimised
  // We first sort the array so that all same elements come together to form group of 3
  // we start traversing from 1st index and check everytime i-1th index
  // if its same we move three places forward and keep on doing this till end of array
  // if its not same then i-1th element is our answer
  // corner case: if unique element is at end of array, above way fails then we always return last element of array as its written that one element is unique always
  nums.sort();
  for (let i = 1; i < nums.length; i += 3) {
    if (nums[i] != nums[i - 1]) {
      return nums[i - 1];
    }
  }

  // if we encounter corner case
  return nums[nums.length - 1];
};

var singleNumber = function (nums) {
  // Most Optimised Solution
  // We will use concepts of buckets where we have 2 buckets ones and twos
  // ones has element occuring once
  // twos has element occuring twice
  // we only put element into ones if its not already in twos
  // once we put element into twos, we delete it from ones
  // So we need to add element into bucket for which we can use | or ^
  // We need to check in the bucket for which we will use ~ operator
  // we will use & and if result is 1 we do the operation else we neglect it
  // At the end, our ones contains element coming only once in the array
  let ones = 0,
    twos = 0;
  for (let i = 0; i < nums.length; i++) {
    ones = (ones ^ nums[i]) & ~twos;
    twos = (twos ^ nums[i]) & ~ones;
  }

  return ones;
};

// Single Number III
// Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.
// Input: nums = [1,2,1,3,2,5]
// Output: [3,5]
// Explanation:  [5, 3] is also a valid answer.
var singleNumber = function (nums) {
  // We can think of using Map but it will take TC: O(nLogm + m) and SC: O(n)
  // To Optimise it, we can think of solution of buckets
  // We will first take XOR of all elements in nums, a^a = 0 and 0^a = a
  // So all duplicates get to 0 and we get XOR of 2 unique elements as result
  // Now we know if we have something inside num = 100100 then num-1 = 100011 i.e all bits after rightmost set bit inside num will flip in num-1 and rest remains same
  // if we do num & num-1 say res we get all bits as same in both 100000 and rest all becomes 0
  // Now when we do res ^ num say rightmost, we get the first rightmost set bit of number num
  // Now we take 2 buckets b1 and b2, we put all numbers whose rightmost set bit = 1 in B1 and those who have rightmost set bit as 0 in B2
  // how to check rightmost bit, we do element & rightmost
  // Now when we store like that, we know that both unique element will have difference in their rightmost bit so one will go inside B1 and other go inside B2
  // We do XOR while putting numbers inside B1 and B2 so that duplicates get cancelled and we are left with only unique
  // return B1 and B2
  let XORR = 0;
  for (let i = 0; i < nums.length; i++) {
    XORR = XORR ^ nums[i];
  }

  let B1 = 0;
  let B2 = 0;
  let rightmost = (XORR & (XORR - 1)) ^ XORR;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] & rightmost) {
      B1 = B1 ^ nums[i];
    } else {
      B2 = B2 ^ nums[i];
    }
  }

  return [B1, B2];
};

// Find XOR of numbers in given Range
//You are given two numbers 'L' and 'R'.
// Find the XOR of the elements in the range [L, R].
// For Example:
// For 'L' = 1 and ‘R’ = 5.
// The answer is 1.
function findXOR(N) {
  // Let say we are given and Number N and we are asked to find XOR of numbers from 1 to N
  // We can do looping and do XOR but it will take TC: O(N)
  // Let say N = 13, Let us observe a pattern
  /*
  N = 13
  1 = 1
  1^2 = 3
  1^2^3 = 0
  1^2^3^4 = 4

  1^2^3^4^5 = 1
  1^2^3^4^5^6 = 7
  1^2^3^4^5^6^7 = 0
  1^2^3^4^5^6^7^8 = 8

  1^2^3^4^5^6^7^8^9 = 1
  1^2^3^4^5^6^7^8^9^10 = 11
  1^2^3^4^5^6^7^8^9^10^11 = 0
  1^2^3^4^5^6^7^8^9^10^12 = 12

  1^2^3^4^5^6^7^8^9^10^12^13 = 1

  We see if N%4 == 1, XOR is 1
  We see if N%4 == 2, XOR is N+1
  We see if N%4 == 3, XOR is 0
  We see if N%4 == 0 (multiple of 4), XOR is N

  So we can use this observation
  */

  if (N % 4 == 1) return 1;
  else if (N % 4 == 2) return N + 1;
  else if (N % 4 == 3) return 0;
  else return N;
}

// Now let us find the XOR from given range L to R
function XorFromLtoR(L, R) {
  // We can use the above logic and think of solution like
  // L = 4, R = 7
  // if we find XOR of 1 to L-1 = 1^2^3 say res1 using above logic in O(1)
  // we find XOR of 1 to R, 1^2^3^4^5^6^7 say res2
  // we find res1^res2
  // All duplicate terms get 0 and we are left with 4^5^6^7 which is needed so this way we do it in O(1)
  let res1 = findXOR(L - 1);
  let res2 = findXOR(R);

  return res1 ^ res2;
}

// Divide Two Integers
/*
Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.
The integer division should truncate toward zero, which means losing its fractional part. For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.
Return the quotient after dividing dividend by divisor.
Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the quotient is strictly less than -231, then return -231.

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = 3.33333.. which is truncated to 3.
*/
var divide = function (dividend, divisor) {
  // Naive Solution
  // It is given that if answer exceed INT_MAX, return INT_MAX and sameway for INT_MIN
  // We can think of adding divisor till we do not get the dividend and store the count
  // dividend = 22, divisor = 3, we can do 3+3+3+3+3+3+3 so count = 7
  // TC: O(dividend) in worst case if dividend is 22, divisor is 1
  let sum = 0;
  let count = 0;
  while (sum + divisor <= dividend) {
    count = count + 1;
    sum = sum + divisor;
  }

  return count;
};

var divide = function (dividend, divisor) {
  // Optimised Approach
  // Say dividend = 22, divisor = 3
  // We try to deal in power of 2's,
  // we check if we can reduce 3*2^0 = 3 from 22, yeah
  // can we remove 3*2^1 = 6 from 22, yeah yeah
  // can we remove 3*2^2 = 12 from 22, yeah yeah
  // can we remove 3*2^3 = 24 from 22, Nooooo
  // So we take 2^2 and store in answer, now 22 becomes 22-12 = 10
  // Again we start from 3*2^0 = 3, can we remove it from 10, yeah
  // Can we remove 3*2^1 = 6 from 10, yeah yeah
  // Can we remove 3*2^2 = 12 from 10, Noooo
  // So we take 2^1 and store in answer, answer becomes 2^2+2^1 = 6, now 10 becomes 10-6 = 4
  // Again we start from 3*2^0 = 3, can we remove it from 4, yeah yeah
  // can we remove from 3*2^1 = 6, can we remove it from 4, Noooo
  // So we take 2^0 and store in answer, answer becomes 2^2+2^1+2^0 = 7, now 4 becomes 4-3 = 1
  // Now dividend becomes < divisor so stop and return answer
  // For negatives we know answer will be negative if divisor +ve, dividend -ve
  // Or dividend +ve, divisor -ve
  // So we handle it accordinlgy at the end, we also handle overflow at the end accordingly
  if (dividend == divisor) return 1;
  if (divisor === 0) return 0;
  if (dividend === 0) return 0;
  let sign = true; // means positive
  if (dividend < 0 && divisor >= 0) sign = false;
  if (dividend >= 0 && divisor < 0) sign = false;
  let dDend = Math.abs(dividend);
  let dSor = Math.abs(divisor);
  let ans = 0;
  let maxi = Math.pow(2, 31) - 1;
  let mini = Math.pow(-2, 31);

  if ((dividend >= maxi || dividend <= mini) && dSor === 1)
    return sign ? maxi : mini;

  while (dDend >= dSor) {
    let count = 0;
    while (dDend > dSor << (count + 1)) {
      count = count + 1;
    }
    ans += 1 << count;
    dDend = dDend - (dSor << count);
  }

  if (ans >= Math.pow(2, 31) - 1) {
    if (sign == true) {
      return Math.pow(2, 31) - 1;
    } else {
      return (Math.pow(2, 31) - 1) * -1;
    }
  }

  if (ans < Math.pow(-2, 31)) {
    if (sign == true) {
      return Math.pow(-2, 31);
    } else {
      return Math.pow(-2, 31) * -1;
    }
  }

  return sign === true ? ans : ans * -1;
};
