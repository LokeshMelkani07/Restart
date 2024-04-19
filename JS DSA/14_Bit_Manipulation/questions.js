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
