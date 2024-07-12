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

  // .join("") makes them a string
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
  // We want to find NGE of all elements present in nums1, using nums2
  // It is given that nums1 is subset of nums2 so we first store NGE of all elements in nums2 using a stack inside map
  // Now we traverse nums1 and find if map has that element as key, if yes, return its NGE else return -1
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
  // if no NGE found, return -1
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
  // if st.top is smaller than current element we pop till we encounter an element greater than current element, it not found we store -1
  // we put ans[i] = st.top and if st.top is empty, we push -1 in ans[i]
  // Now again we traverse from back of array, as its a circular array so if any element has NGE of itself anywhere we will get it after first pass inside our stack
  // for element with ans[i] = -1
  // we check if st.top is lesser than nums[i], pop it till we encounter greater than current element
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
  // Funda is: Apan sab characters ko stack mai dalenge, character by character, but agar apne ko aisa character mila jo stack.top se bhi chota h toh st.top ko nikaal lenge bahaar till removedElements < k and push krdenge uss element ko, so that hum minimum number bna ske inside stack
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

  // Loop to remove trailing 0's if any, we can accomodate 0's in between the resultant number but we do not need any trailing 0's so we remove them from beginnning of stack
  while (stack[0] == "0") {
    stack.shift();
  }

  // At the end our stack contain the resultant minimum number
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

// Implement Stack using Queues
/*
Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

Implement the MyStack class:

void push(int x) Pushes element x to the top of the stack.
int pop() Removes the element on the top of the stack and returns it.
int top() Returns the element on the top of the stack.
boolean empty() Returns true if the stack is empty, false otherwise.
Notes:

You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.
Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.
*/
// Implementing our Queue class
class MyQueue {
  constructor() {
    this.data = [];
    this.front = 0;
    this.rear = 0;
  }

  // Add the 'element' to the rear of the queue
  // Time: O(1)
  enqueue(element) {
    this.data[this.rear] = element;
    this.rear++;
  }

  isEmpty() {
    return this.front == this.rear;
  }

  print() {
    for (let i = this.front; i < this.rear; ++i) console.log(this.data[i]);
  }

  // Delete the front element and return the deleted element
  // Time: O(1)
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue Underflow");
    }
    let frontElement = this.data[this.front];
    this.front++;
    return frontElement;
  }

  length() {
    return this.rear - this.front;
  }

  // Just return the front element
  // Time: O(1)
  getFront() {
    if (this.isEmpty()) {
      throw new Error("Queue is Empty!");
    }
    return this.data[this.front];
  }
}

var MyStack = function () {
  // Making 2 new Queues
  this.q1 = new MyQueue();
  this.q2 = new MyQueue();
};

MyStack.prototype.push = function (x) {
  // Push x into Q2
  // Push all elements of Q1 to Q2
  // Now swap Q2 with Q1
  this.q2.enqueue(x);
  if (!this.q1.isEmpty()) {
    while (!this.q1.isEmpty()) {
      var ele = this.q1.dequeue();
      this.q2.enqueue(ele);
    }
  }

  // swap
  if (!this.q2.isEmpty()) {
    while (!this.q2.isEmpty()) {
      var ele = this.q2.dequeue();
      this.q1.enqueue(ele);
    }
  }
};

MyStack.prototype.pop = function () {
  // Get the top element of Q2, thats the Last element pushed into the stack
  var ele = this.q1.getFront();
  // pop it out
  this.q1.dequeue();
  return ele;
};

MyStack.prototype.top = function () {
  // Top element of Queue 1
  return this.q1.getFront();
};

MyStack.prototype.empty = function () {
  // check if q1 is empty or not
  return this.q1.isEmpty();
};

// Smallest number on left
/*
Given an array a of integers of length n, find the nearest smaller number for every element such that the smaller element is on left side.If no small element present on the left print -1.

Example 1:
Input: n = 3
a = {1, 6, 2}
Output: -1 1 1
Explaination: There is no number at the
left of 1. Smaller number than 6 and 2 is 1.
*/
class Solution {
  leftSmaller(arr, n) {
    // We want strictly lesser element on the left
    // Brute Force approach can be that we will traverse to all elements and for each element we will run a loop in backward direction, As soon as we get a element smaller than current element we break the loop and store that in result array
    // This will take O(n^2) which can be further optimsied to O(n) using stack
    // We make a stack which is empty currently so for first element push -1
    // We will push first element in stack
    // Now we go to next element and check if st.top is lesser than curr, if yes, store it in result and push curr in stack
    // if no, then pop out that stack element till we get lesser element at stack top, if in doing so, stack becomes empty we store -1 in result array for that curr
    // Now we go to next element, and keep on doing it till we traverse whole array
    // Sameway we can do "previous greater element" just check for greater element instead of smaller element and pop accordingly

    // Initialize an array to store the result
    const result = [];

    // Create an empty stack to store indices of elements
    const stack = [];

    // Iterate through the array from left to right
    for (let i = 0; i < n; i++) {
      // Keep popping elements from the stack while the current element is smaller than the element at the top of the stack
      while (stack.length > 0 && arr[i] <= arr[stack[stack.length - 1]]) {
        stack.pop();
      }

      // If the stack is empty, there is no smaller element on the left
      if (stack.length === 0) {
        result.push(-1); // Push -1 to the result array
      } else {
        result.push(arr[stack[stack.length - 1]]); // Push the smaller element to the result array
      }

      // Push the current index onto the stack
      stack.push(i);
    }

    // Return the result array
    return result;
  }
}

// Help Classmates || Next Smaller Element
/*
Professor X wants his students to help each other in the chemistry lab. He suggests that every student should help out a classmate who scored less marks than him in chemistry and whose roll number appears after him. But the students are lazy and they don't want to search too far. They each pick the first roll number after them that fits the criteria. Find the marks of the classmate that each student picks.
Note: one student may be selected by multiple classmates.

Example 1:
Input: N = 5, arr[] = {3, 8, 5, 2, 25}
Output: 2 5 2 -1 -1
Explanation:
1. Roll number 1 has 3 marks. The first person
who has less marks than him is roll number 4,
who has 2 marks.
2. Roll number 2 has 8 marks, he helps student
with 5 marks.
3. Roll number 3 has 5 marks, he helps student
with 2 marks.
4. Roll number 4 and 5 can not pick anyone as
no student with higher roll number has lesser
marks than them. This is denoted by -1.
Output shows the marks of the weaker student that
each roll number helps in order. ie- 2,5,2,-1,-1
*/
class Solution {
  help_classmate(arr, n) {
    // This problem is same as Next smaller element
    // We will use a stack but this time we will start traversing from back of array
    const result = [];
    const stack = [];

    for (let i = n - 1; i >= 0; i--) {
      while (stack.length > 0 && stack[stack.length - 1] >= arr[i]) {
        stack.pop();
      }

      if (stack.length === 0) {
        result.unshift(-1);
      } else {
        result.unshift(stack[stack.length - 1]);
      }

      stack.push(arr[i]);
    }

    return result;
  }
}

// Largest Rectangle in Histogram
/*
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
*/
var largestRectangleArea = function (heights) {
  // Brute force way O(n^2)
  // We will pick one element and go to its left and its right till we have arr[left] >= arr[i] and arr[right] >= arr[i]
  // At the end we take area = (right-left-1)*arr[i];
  // get mexArea such a way
  let maxArea = -Infinity;
  for (let i = 0; i < heights.length; i++) {
    let left = i;
    let right = i;

    while (left >= 0 && heights[left] >= heights[i]) {
      left--;
    }

    while (right < heights.length && heights[right] >= heights[i]) {
      right++;
    }

    let area = (right - left - 1) * heights[i];
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
};

var largestRectangleArea = function (heights) {
  // Optimised Approach
  // We will make use of Previous smaller and Next smaller element array
  // This time instead of elements, we will push indexes
  // Once we have PSE, NSE array
  // In NSE array if we do not find any nextsmaller element, we will handle it by pushing n (next index to last element) in the result array which will be handled automatically later
  // We will again traverse the loop and for each element area will be (NSE[i] - NLE[i] -1)*arr[i]
  // This way we store the maximum area and return it
  let n = heights.length;
  let PSE = previousSmallerElement(heights, n);
  let NSE = nextSmallerElement(heights, n);
  let maxArea = 0;

  for (let i = 0; i < n; i++) {
    let area = (NSE[i] - PSE[i] - 1) * heights[i];
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
};

function previousSmallerElement(arr, n) {
  // For previous smaller element or previous greater element, always start traversal from beginning of array
  let result = [];
  let stack = [];

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }

    if (stack.length === 0) {
      result.push(-1);
    } else {
      result.push(stack[stack.length - 1]);
    }

    // Storing indexes so that it can help in later calculation
    stack.push(i);
  }

  return result;
}

function nextSmallerElement(arr, n) {
  // For next smaller element or next greater element, always start traversal from end of array
  let result = [];
  let stack = [];

  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }

    if (stack.length === 0) {
      // if we push -1 then it will be difficult for us in calculation so if we do not find any next smaller element, we push n which is next element to last element of array and consider that there is next smaller element at some index n
      // this case will be automatically handled at the end
      result.push(n);
    } else {
      result.push(stack[stack.length - 1]);
    }

    stack.push(i);
  }

  return result.reverse(); // Reverse the result to get correct order
}

// Maximal Rectangle
// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
// Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// Output: 6
var maximalRectangle = function (matrix) {
  // We will use the logic of Maximum area in a historgram
  // Here we will pick each row and send it as a array to maxHistogram function and get the result area array for that row
  // As we move to next row, we keep on adding value to each block if arr[i]==1 then do curr[i] += 1 and if arr[i]=0 then make cur[i]=0
  // and again send curr array to maxhistogram
  // Everytime store the max value of area
  if (matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxArea = 0;

  // Calculate the histogram heights for each row
  const heights = new Array(cols).fill(0);

  for (let i = 0; i < rows; i++) {
    // Update heights array based on current row
    for (let j = 0; j < cols; j++) {
      heights[j] = matrix[i][j] === "1" ? heights[j] + 1 : 0;
    }

    // Calculate the largest rectangle area for the current row
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
};

// Helper function to calculate the largest rectangle area in a histogram
// This function find maxArea in a histogram for that array
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    while (
      stack.length > 0 &&
      (i === heights.length || heights[i] < heights[stack[stack.length - 1]])
    ) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }

  return maxArea;
}

// Infix, PreFix, PostFix Expressions
// We have a BODMAS rule while solving expressions where we have to take care of Precedence and Associvity while solving any expression
// We have (Bracket -> Order (2^3) -> Divide -> Multiply -> Addition -> Subtraction) as Order
// Associvity of Multiply and divide are same so if both are present simultaneously in an expression, we solve what is occuring first
// Associvity of Addition and Subtraction are same so if both are present simultaneously in an expression, we solve what is occuring first
// Infix means Operand Operator Operand
// Prefix means Operator Operand Operand
// Postfix means Operand Operand Operator
// For any compiler it is easy to solve expression in postfix instead of infix because postfix does not have any brackets or do not have to care about precedence or associvity
// It uses a stack where it starts traversing the expression and pushes operands in the stack and when it encounters any operand, it pops out first 2 element from stack top and perform that operation on them and push the result in the stack
// This way it returns the result in the stack top at the end
/*
Infix Expression
A + B
A + B * C

Prefix Expression
+ A B
+ A * B C

Postfix Expression
A B +
A B C * +
*/

// Convert Infix Expression to Postfix Expression
/*
We will use a stack and we will traverse all elements in infix expression and do following operation
if infix[i] is a operand or number, simply print it in result array

if its a operator check,
if stack is empty, push it directly
if stack is not empty, check if precedence of stack.top is lower than infix[i]. if yes, push infix[i] in stack or else keep popping out the element from stack and push in result till lower precedence element is found in the stack.

if its a opening bracket, push directly in the stack
if its a closing bracket, pop out from stack and push in result array till opening bracket is encountered. now pop that opening bracket also out of stack and push in result

keep on doing these operations till infix[i] reaches end of array
*/
// Function to check if a character is an operator (+, -, *, /, ^)
function isOperator(char) {
  return ["+", "-", "*", "/", "^"].includes(char);
}

// Function to get the precedence of an operator
function precedence(operator) {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "^":
      return 3;
    default:
      return 0;
  }
}

// Function to convert infix expression to postfix expression
function infixToPostfix(infix) {
  const result = []; // Array to store the postfix expression
  const stack = []; // Stack to hold operators and parentheses

  for (let i = 0; i < infix.length; i++) {
    const token = infix[i];

    // If token is an operand (letter or digit), add it to the result
    if ((token >= "a" && token <= "z") || (token >= "0" && token <= "9")) {
      result.push(token);
    } else if (token === "(") {
      // If token is a left parenthesis, push it onto the stack
      stack.push(token);
    } else if (token === ")") {
      // If token is a right parenthesis, pop operators from the stack until we find a left parenthesis
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        result.push(stack.pop());
      }
      // Discard the left parenthesis from the stack
      stack.pop();
    } else if (isOperator(token)) {
      // If token is an operator
      // Pop operators with higher or equal precedence from the stack and add them to the result
      while (
        stack.length > 0 &&
        precedence(stack[stack.length - 1]) >= precedence(token)
      ) {
        result.push(stack.pop());
      }
      // Push the current operator onto the stack
      stack.push(token);
    }
  }

  // Pop remaining operators from the stack and add them to the result
  while (stack.length > 0) {
    result.push(stack.pop());
  }

  // Join the elements of the result array to form the postfix expression
  return result.join("");
}

// Evaluating Postfix Expression
// Function to evaluate a postfix expression
function evaluatePostfix(postfix) {
  const stack = []; // Stack to store operands

  // Helper function to perform arithmetic operations
  const performOperation = (operand1, operand2, operator) => {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
      case "^":
        return Math.pow(operand1, operand2);
      default:
        throw new Error("Invalid operator");
    }
  };

  // Loop through each token in the postfix expression
  for (let token of postfix) {
    // If token is an operand, push it onto the stack
    if (!isNaN(token)) {
      stack.push(parseFloat(token)); // Convert token to number
    } else {
      // If token is an operator, perform operation
      const operand2 = stack.pop(); // Pop the top operand
      const operand1 = stack.pop(); // Pop the second top operand
      const result = performOperation(operand1, operand2, token); // Perform operation
      stack.push(result); // Push the result back onto the stack
    }
  }

  // The final result will be at the top of the stack
  return stack.pop();
}

// Infix to Prefix, same as Infix to Postfix just that during conversion and evaluation we reverse the string before processing so that operators can occue before operand and we can process them easily.
// Function to check if a character is an operator (+, -, *, /, ^)
function isOperator(char) {
  return ["+", "-", "*", "/", "^"].includes(char);
}

// Function to get the precedence of an operator
function precedence(operator) {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "^":
      return 3;
    default:
      return 0;
  }
}

// Function to reverse a string
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Function to convert infix expression to prefix expression
function infixToPrefix(infix) {
  const stack = []; // Stack to hold operators and parentheses
  const result = []; // Array to store the prefix expression

  // Reverse the infix expression to facilitate prefix conversion
  infix = reverseString(infix);

  for (let i = 0; i < infix.length; i++) {
    const token = infix[i];

    if (token === "(") {
      // Reverse parentheses
      stack.push(")");
    } else if (token === ")") {
      stack.push("(");
    } else if (
      (token >= "a" && token <= "z") ||
      (token >= "0" && token <= "9")
    ) {
      // Operands
      result.push(token);
    } else if (isOperator(token)) {
      // Operators
      while (
        stack.length > 0 &&
        isOperator(stack[stack.length - 1]) &&
        precedence(stack[stack.length - 1]) >= precedence(token)
      ) {
        result.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    result.push(stack.pop());
  }

  // Reverse the result to get the prefix expression
  return reverseString(result.join(""));
}

// Function to evaluate a prefix expression
function evaluatePrefix(prefix) {
  const stack = [];

  // Helper function to perform arithmetic operations
  const performOperation = (operand1, operand2, operator) => {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
      case "^":
        return Math.pow(operand1, operand2);
      default:
        throw new Error("Invalid operator");
    }
  };

  // Reverse the prefix expression to facilitate evaluation
  prefix = reverseString(prefix);

  for (let token of prefix) {
    if (!isNaN(token)) {
      // Operands
      stack.push(parseFloat(token));
    } else if (isOperator(token)) {
      // Operators
      const operand1 = stack.pop();
      const operand2 = stack.pop();
      const result = performOperation(operand1, operand2, token);
      stack.push(result);
    }
  }

  // The final result will be at the top of the stack
  return stack.pop();
}

// Reverse Substrings Between Each Pair of Parentheses
/*
You are given a string s that consists of lower case English letters and brackets.

Reverse the strings in each pair of matching parentheses, starting from the innermost one.

Your result should not contain any brackets.

Example 1:
Input: s = "(abcd)"
Output: "dcba"

Example 2:
Input: s = "(u(love)i)"
Output: "iloveu"
Explanation: The substring "love" is reversed first, then the whole string is reversed.

Example 3:
Input: s = "(ed(et(oc))el)"
Output: "leetcode"
Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.
*/
var reverseParentheses = function (s) {
  // We just need to reverse whatever is between ( )
  // We will use a stack where we push till we encounter ')'
  // When we encounter ")", we pop all elements in LIFO fashion and reverse them and push whole reversed string in stack
  // We keep on doing it till end of string
  // At the end we empty the stack in a result string
  // answer comes in reverse order when we console log we observe it
  // return reverse(result)
  let n = s.length;
  let st = [];
  for (let i = 0; i < n; i++) {
    if (s[i] != ")") {
      st.push(s[i]);
    } else {
      let res = "";
      while (st.length > 0 && st[st.length - 1] != "(") {
        res += st.pop();
      }

      console.log("Res ", res);
      let reverseStr = reverseString(res);
      st.pop();
      st.push(reverseStr);
    }
  }

  let result = "";
  while (st.length != 0) {
    result += st.pop();
  }

  return reverseString(result);
};

function reverseString(s) {
  let str = s.split("");
  let newStr = str.reverse();
  let returnString = newStr.join("");
  // console.log(returnString);
  return returnString;
}

// Maximum Score From Removing Substrings
/*
You are given a string s and two integers x and y. You can perform two types of operations any number of times.

Remove substring "ab" and gain x points.
For example, when removing "ab" from "cabxbae" it becomes "cxbae".
Remove substring "ba" and gain y points.
For example, when removing "ba" from "cabxbae" it becomes "cabxe".
Return the maximum points you can gain after applying the above operations on s.

Example 1:
Input: s = "cdbcbbaaabab", x = 4, y = 5
Output: 19
Explanation:
- Remove the "ba" underlined in "cdbcbbaaabab". Now, s = "cdbcbbaaab" and 5 points are added to the score.
- Remove the "ab" underlined in "cdbcbbaaab". Now, s = "cdbcbbaa" and 4 points are added to the score.
- Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba" and 5 points are added to the score.
- Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5 points are added to the score.
Total score = 5 + 4 + 5 + 5 = 19.

Example 2:
Input: s = "aabbaaxybbaabb", x = 5, y = 4
Output: 20
*/
var maximumGain = function (s, x, y) {
  // We will follow a greedy approaach
  // Where we check if x>y or y>x
  // accordingly we first collect all 'ab' or 'ba' based on x>y or y>x because we want to maximize our points so we will store maximum vale first
  // then we collect 'ba' or 'ab' based on x>y or y>x
  let score = 0;
  let n = s.length;
  if (x >= y) {
    let obj = removePairs(s, "b", "a", x);
    // console.log("string ",s);
    let obj1 = removePairs(obj.res, "a", "b", y);
    score += obj.scr + obj1.scr;
  } else {
    let obj = removePairs(s, "a", "b", y);
    // console.log("string ",s);
    let obj1 = removePairs(obj.res, "b", "a", x);
    score += obj.scr + obj1.scr;
  }

  return score;
};

function removePairs(str, target, check, point) {
  console.log(str);
  let st = [];
  let score = 0;
  let n = str.length;
  let j = 0;
  while (j < n) {
    if (str[j] != target) {
      st.push(str[j]);
      j++;
    } else {
      if (st.length > 0 && st[st.length - 1] == check) {
        st.pop();
        score += point;
        j++;
      } else {
        st.push(str[j]);
        j++;
      }
    }
  }

  // console.log(st);
  let res = "";
  let i = 0;
  while (i < st.length) {
    res += st[i];
    i++;
  }
  // console.log(res);

  return { scr: score, res: res };
}
