// Remove All Adjacent Duplicates In String
// You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them. We repeatedly make duplicate removals on s until we no longer can. Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.
// Input: s = "abbaca"
// Output: "ca"
// Explanation: For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".
var removeDuplicates = function (s) {
  // We will make use of stack
  // We will push all elements of string s into the stack
  // but before pushing we check if stack.top is same as s[i] then pop out else push that character
  // Doing this, at the end of string traversal s, our stack contain output
  const st = [];

  for (const char of s) {
    st[st.length - 1] === char ? st.pop() : st.push(char);
  }

  return st.join("");
};

// Valid Parentheses
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.
var isValid = function (s) {
  // What we will do is, we push all opening brackets in our stack
  // if we encounter a closing bracket, we check if we have its opening brakcet in stack top
  // if yes, then pop it out
  // else return false
  // we will put all valid parentheses pairs inside object so that we can check if its valid before adding into stack
  const obj = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (obj.hasOwnProperty(s[i])) {
      // if its an opening bracket, put in stack
      stack.push(s[i]);
    } else {
      // if its closing bracket
      // stack.at(-1) means check if top element of array has closing bracket as s[i] or not
      if (stack.length === 0 || obj[stack.at(-1)] != s[i]) {
        return false;
      }

      stack.pop();
    }
  }

  return stack.length === 0;
};

// Backspace String Compare
// Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character. Note that after backspacing an empty text, the text will continue empty.
// Input: s = "ab#c", t = "ad#c"
// Output: true
// Explanation: Both s and t become "ac".
var backspaceCompare = function (s, t) {
  // We keep on traversing string s and t
  // We push characters of both in stack
  // if we encounter '#' we pop out st.top without push # in stack
  // At the end of traversal if both result string are same, return true else false
  const stack1 = [];
  const stack2 = [];
  for (const char of s) {
    if (char !== "#") {
      stack1.push(char);
    } else {
      stack1.pop();
    }
  }

  for (const char of t) {
    if (char !== "#") {
      stack2.push(char);
    } else {
      stack2.pop();
    }
  }

  return stack1.join("") === stack2.join("");
};

// Next Greater Element I
// The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2. For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1. Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.
// Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
// Output: [-1,3,-1]
// Explanation: The next greater element for each value of nums1 is as follows: - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1. - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3. - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
var nextGreaterElement = function (nums1, nums2) {
  // We will use a map and a stack to store next greater element
  // We will make a map in which we store NGE for each corresponding element of nums2 which we later use in nums1
  // We will use a stack which will give us NGE for an element
  // NGE means first greater element that is to the right of x in the same array
  const map = {};
  const stack = [];

  nums2.forEach((n) => {
    // For each element in nums2, store its NGE
    while (stack.length > 0 && stack[stack.length - 1] < n) {
      // if current element is greater than stack.top means thats its NGE so store it in map
      // where key = stack.top and value is current element
      map[stack.pop()] = n;
    }

    // Otherwise directly push in stack
    stack.push(n);
  });

  // Now for each element in nums2, check if that key has a value in map, store it in array else store -1
  // .map returns us a new array
  return nums1.map((n) => map[n] || -1);
};

// Online Stock Span
/*
Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days.
Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.
Implement the StockSpanner class:

StockSpanner() Initializes the object of the class.
int next(int price) Returns the span of the stock's price given that today's price is price.


Example 1:

Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6
*/
var StockSpanner = function () {
  // initialise a empty stack
  this.st = [];
};

StockSpanner.prototype.next = function (price) {
  // price is the price of current stock, now we need to return span of days behind that index when its value was lower than its current price
  // Minimum value of span = 1 so we initialise span with 1
  // if stack.top has value lesser than current price increase stock by that span
  // if doing this stock becomes empty, push it in stack with price and its span
  // return span
  let span = 1;
  while (this.st.length > 0 && this.st[this.st.length - 1][0] <= price) {
    span += this.st.pop()[1];
  }

  this.st.push([price, span]);
  return span;
};

// Next Greater Element II
// Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums. The next greater number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.
// Input: nums = [1,2,1]
// Output: [2,-1,2]
// Explanation: The first 1's next greater number is 2;  The number 2 can't find next greater number.  The second 1's next greater number needs to search circularly, which is also 2.
var nextGreaterElements = function (nums) {
  // Brute force
  // We will run 2 loops and check for circular elements also
  let n = nums.length;
  let ans = [];
  for (let i = 0; i < n; i++) {
    ans[i] = -1;
    for (let j = 1; j < n; j++) {
      if (nums[i] < nums[(i + j) % n]) {
        ans[i] = nums[(i + j) % n];
        break;
      }
    }
  }

  return ans;
};

var nextGreaterElements = function (nums) {
  // Using stack
  // We will start traversing from back of array
  // We push element in the stack
  // if st.top is smaller than current element we pop
  // we put ans[i] = st.top and if st.top is empty, we push -1 in ans[i]
  // Now again we traverse from back of array
  // for element with ans[i] = -1
  // we check if st.top is lesser than nums[i], pop it
  // after that put ans[i] = st.top else -1
  // if ans[i] != -1 simply push that element in stack
  const stack = [];
  let n = nums.length;
  let ans = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
      stack.pop();
    }

    ans[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(nums[i]);
  }

  for (let i = n - 1; i >= 0; i--) {
    if (ans[i] == -1) {
      while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
        stack.pop();
      }

      ans[i] = stack.length ? stack[stack.length - 1] : -1;
    }

    stack.push(nums[i]);
  }

  return ans;
};

// Remove K Digits
// Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.
// Input: num = "1432219", k = 3
// Output: "1219"
// Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
var removeKdigits = function (num, k) {
  // We will make use of stack
  // We will store characters into the stack but if stack.top contains character greater than our current character we pop it out
  // because we need to make smallest possible number
  // We need to strictly remove k digits so if removed<k we again pop from stack
  // now we again run a loop to remove any leading zeroes in the stack
  // as it is given that num does not have any leading zeros except for the zero itself.
  const stack = [];
  let removed = 0;
  for (let digit of num) {
    // remove any number greater than current element in stack if any
    while (stack.length && removed < k && stack[stack.length - 1] > digit) {
      stack.pop();
      removed++;
    }

    stack.push(digit);
  }

  // Loop to remove strict k digits
  while (removed < k) {
    stack.pop();
    removed++;
  }

  // Loop to remove trailing 0's if any
  while (stack[0] == "0") {
    stack.shift();
  }

  return stack.length ? stack.join("") : "0";
};

// Sum of Subarray Minimums
// Given an array of integers arr, find the sum of min(b) means minimum from all the subarrays possible of arr are summed and return them, where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.
// Input: arr = [3,1,2,4]
// Output: 17
// Explanation: Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1. Sum is 17.
var sumSubarrayMins = function (arr) {
  // Reference: https://www.youtube.com/watch?v=9-TXIVEXX2w&t=455s&ab_channel=Fraz
  // For any element curr, we find number of element in its left which are larger than it so that when we form subarrays with them, our curr comes out as minimum of them all
  // Sameway we find, number of elements in its right which are larger than curr for same reason
  // Let say on left = g1, right = g2
  // Sum of all element g1 * g2 * arr[i] for that arr[i] gives us our result
  let M = Math.pow(10, 9) + 7;
  let PLE = new Array(arr.length).fill(-1); // initialised with -1 because if there is no element larger previous to curr
  let NLE = new Array(arr.length).fill(arr.length); // initialised with arr.length if all elements are larger next to curr
  findPLE(PLE, arr);
  findNLE(NLE, arr);
  let sum = 0;
  // PLE contains number of elements previous to curr which are larger than curr
  // NLE contains number of elmenets next to curr, which are larger than curr
  // i - PLE[i] gives us count of such numbers and sameway NLE[i] - i gives count of such number
  //
  for (let i = 0; i < arr.length; i++) {
    sum = (sum + (i - PLE[i]) * (NLE[i] - i) * arr[i]) % M;
  }
  return sum;
  // T.C: O(N)
  // S.C: O(N)
};

function findPLE(PLE, arr) {
  // To find previous larger element
  let stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      // we use less than or equal to
      // in either PLE or NLE in order to not miss out on subarrays
      // where there are duplicates of minimum element
      stack.pop();
    }
    if (stack.length > 0) {
      PLE[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
}

function findNLE(NLE, arr) {
  // To find Next larger element
  let stack = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      NLE[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
}
