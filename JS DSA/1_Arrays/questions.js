// 2 sum
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.
var twoSum = function (nums, target) {
  // Using map in O(n)
  let mpp = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (mpp.has(target - nums[i])) {
      return [mpp.get(target - nums[i]), i];
    } else {
      mpp.set(nums[i], i);
    }
  }

  return [];
};

// Majority Element
// Given an array nums of size n, return the majority element.The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
var majorityElement = function (nums) {
  // we will use map to store frequency
  let map = new Map();
  for (let num of nums) {
    if (map.has(num)) {
      let prev = map.get(num);
      map.set(num, prev + 1);
    } else {
      map.set(num, 1);
    }
    if (map.get(num) > nums.length / 2) return num;
  }
};

// Moore's Volting Algorithm Approach
var majorityElement = function (nums) {
  // Moore's Voting algorithm
  // We will consider first element nums[0] as majority element say curr and store its count = 1
  // Now we start traversing from element index 1 to end of array
  // if our nums[i] is same as curr we do count++ for that element
  // if our nums[i] is not same as curr we do count-- for that element and if in doing soo, our count reaches 0, we will say maybe curr is not the majority element.
  // Let us take current index as curr so curr = i and make its count = 1
  // this way we keep on traversing the array. at the end whatever the curr we have, this can be our majority element so to confirm it, we again traverse whole array and check the number of occurence of curr in the array if its > n/2 times means curr is majority element so return curr
  // TC: O(n) and SC: O(1)
  let currIndex = 0;
  let countCurr = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[currIndex]) {
      countCurr++;
    } else {
      countCurr--;
    }

    if (countCurr == 0) {
      currIndex = i;
      countCurr = 1;
    }
  }

  // check if nums[currIndex] is the answer or not
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == nums[currIndex]) {
      count++;
    }
  }

  return count > nums.length / 2 ? nums[currIndex] : -1;
};

// Most Frequent Even Element
// Given an integer array nums, return the most frequent even element.If there is a tie, return the smallest one. If there is no such element, return -1.

// Example 1:
// Input: nums = [0,1,2,2,4,4,1]
// Output: 2
// Explanation: The even elements are 0, 2, and 4. Of these, 2 and 4 appear the most. We return the smallest one, which is 2.
var mostFrequentEven = function (nums) {
  // We will store all even elements and their frequencies inside a map
  // We will also store the maximum frequency count inside our map in a variable
  // Because this will help us in finding the max frequent even number in our array
  // Now, we traverse whole map and check if count of any number is greater than or equal to maxCount. this can be a possible answer
  // but if there are 2 numbers of same count, we will store the smaller than always so we add another condition for that
  // and we return the answer
  let mpp = new Map();
  let maxCountOfMap = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 == 0) {
      mpp.set(nums[i], (mpp.get(nums[i]) || 0) + 1);
      maxCountOfMap = Math.max(maxCountOfMap, mpp.get(nums[i]));
    }
  }

  let ans = Infinity;
  for (let [value, count] of mpp) {
    if (count >= maxCountOfMap && value < ans) {
      ans = value;
    }
  }

  return ans === Infinity ? -1 : ans;
};

// Remove Duplicates from Sorted Array
// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.
var removeDuplicates = function (nums) {
  // we can use set to store all elements of array and then store them back in array
  let st = new Set();
  let cnt = 0;
  let ind = 0;
  for (let n of nums) {
    st.add(n);
  }

  st.forEach((e) => {
    nums[ind++] = e;
    cnt++;
  });

  return cnt;
};

var removeDuplicates = function (nums) {
  // we will use a 2 pointer approach
  // second pointer points to first element i.e 0 index of array as its always unique and loop till end of loop
  // second pointer points to next element of first i.e starts with 1 index and is used to swap
  // everytime we check if second == second+1 then do second++
  // if second != second+1, swap first with second+1 and second++, first++;
  let first = 1;
  for (let second = 0; second < nums.length - 1; second++) {
    if (nums[second] != nums[second + 1]) {
      nums[first] = nums[second + 1];
      first++;
    }
  }

  return first;
};

// Squares of a Sorted Array
// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.
var sortedSquares = function (nums) {
  // First approach could be
  // we Square all numbers of array and then use .sort() method but TC: O(nlogn)
  // To do this in O(n), we will use 2 pointer approach where we use SC: O(n)
  let n = nums.length;
  let left = 0;
  let right = n - 1;
  let rIndex = n - 1;
  let result = [];

  while (left <= right) {
    if (nums[left] * nums[left] >= nums[right] * nums[right]) {
      result[rIndex--] = nums[left] * nums[left];
      left++;
    } else {
      result[rIndex--] = nums[right] * nums[right];
      right--;
    }
  }

  return result;
};

// Find Pivot Index
// Given an array of integers nums, calculate the pivot index of this array.The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.Return the leftmost pivot index. If no such index exists, return -1.
var pivotIndex = function (nums) {
  // we find total of all array elements
  // we make a variable leftIndex initially 0
  // we loop through array and everytime we check
  // total - leftIndex - arr[i] == leftIndex
  // if no, leftIndex += arr[i]
  // if yes, we have found the index so return i
  let total = nums.reduce((acc, tot) => {
    return acc + tot;
  }, 0);

  let leftIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (total - leftIndex - nums[i] != leftIndex) {
      leftIndex += nums[i];
    } else {
      return i;
    }
  }

  return -1;
};

// Move Zeroes
// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.Note that you must do this in-place without making a copy of the array.
var moveZeroes = function (nums) {
  // We can use 2 pointer approach but that breaks the condition of in-place
  // So we use one pointer which points to first index and we use it for swapping as soon as we see a non-zero element
  // Now we traverse whole loop
  let prev = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      temp = nums[prev];
      nums[prev] = nums[i];
      nums[i] = temp;
      prev++;
    }
  }

  return nums;
};

var moveZeroes = function (nums) {
  // Another Approach
  // j points to index of first 0 of array
  // i points to next index of j
  // Everytime we see any non-zero element, we swap arr[j],arr[i] and move j++
  let j = -1;
  let i = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] == 0) {
      j = i;
      break;
    }
  }

  // if j is still -1 means there is no zero in array, return nums as it is
  if (j == -1) {
    return nums;
  }

  for (i = j + 1; i < n; i++) {
    if (nums[i] != 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
  }

  return nums;
};

// Remove Element
// Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
var removeElement = function (nums, val) {
  // We can simply loop throught the array from end and use splice method if our element is val
  // splice makes changes in the original array
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] == val) {
      // remove 1 element from index = i
      nums.splice(i, 1);
    }
  }
};

// Another approach
var removeElement = function (nums, val) {
  // we can make a variable prev which points to first element
  // we loop through array and when we encounter element != val, we swap
  let prev = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != val) {
      temp = nums[prev];
      nums[prev] = nums[i];
      nums[i] = temp;
      prev++;
    }
  }

  return prev;
};

// Max Consecutive Ones
// Given a binary array nums, return the maximum number of consecutive 1's in the array.
var findMaxConsecutiveOnes = function (nums) {
  // We will count, consecutive ones and store it in a max variable
  let maxLength = 0;
  let maxConsOnes = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 1) {
      maxConsOnes++;
    } else {
      maxLength = Math.max(maxLength, maxConsOnes);
      maxConsOnes = 0;
    }
  }

  // if last element is also 1 it does not get counted in maxLength so we do again
  maxLength = Math.max(maxLength, maxConsOnes);
  return maxLength;
};

// Trapping Rain Water
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
// Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
var trap = function (height) {
  // We just have to do little array pre-processing where for each element we will find its leftMax i.e element greater than itself in its left including itself
  // rightMax means element greater than itself on right including itself
  // now we have rightMax and leftMax for each element of array
  // Water in a block will only be filled if there is any building greater than itself in its left or right
  // How much water will be store? depends on min(leftMax,rightMax) and we have to subtract height of current block also because that much height is occupied by the building so at that point no water will be filled
  // So our formula becomes, waterFilled = min(leftMax, rightMax) - height[curr]
  // we will calculate the rightMax by traversing array from back
  // We will calculate the leftMax by traversing array from front
  let leftMax = [];
  let rightMax = [];
  // push first element in leftMax because there is no leftMax for first element except itself
  leftMax[0] = height[0];
  for (let i = 1; i < height.length; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // Store last element in last index of rightMax because for last element there is no rightMax
  rightMax[height.length - 1] = height[height.length - 1];
  for (let i = height.length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // Compute the water stored
  let waterStored = 0;
  for (let i = 0; i < height.length; i++) {
    waterStored += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return waterStored;
};

// Another approach using 2 pointers
var trap = function (height) {
  // Another approach using 2 pointers
  // Instead of using 2 seperate arrays to store leftMax and rightMax
  // We can use 2 pointers and 2 variables which will store leftMax and rightMax
  // Because at the time of calculating waterStored, we are just using min(leftMax, rightMax) so we need only one of them at a time
  // Leftmax always contains the maxHeight in the left and same for rightMax
  // We will get the answer from one which is smaller than left or right
  let leftMax = 0,
    rightMax = 0,
    waterStored = 0,
    n = height.length;
  let left = 0,
    right = n - 1;

  while (left < right) {
    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        waterStored += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        waterStored += rightMax - height[right];
      }

      right--;
    }
  }

  return waterStored;
};

// Maximum Subarray
// Given an integer array nums, find the subarray with the largest sum, and return its sum.
// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
var maxSubArray = function (nums) {
  // Kadane's Algorithm
  // We will use this algo which states that to get maximum sum in a subarray
  // We need to consider only positive elements because if we consider negative elements then its difficult to get the maximum sum
  // The intuition of the algorithm is not to consider the subarray as a part of the answer if its sum is less than 0. A subarray with a sum less than 0 will always reduce our answer and so this type of subarray cannot be a part of the subarray with maximum sum.
  // Follow up Question: Print the maximum sum subarray also
  // There can be many subarrays with maximum sum, we need to print any one of them. What we can do is
  // We observe our subarray starts when Currsum == 0 from then our new subarray starts and when Currsum > maxSum, it ends one subarray for us
  // If somehow we can store these start and end index of our subarray, we can run a loop between these indexes and print the largest sum subarray
  // So we make use of 3 variables, start, subStart, subEnd
  let currSum = 0;
  let maxSum = -Infinity;
  let start = 0,
    subStart = -1,
    subEnd = -1;

  for (let i = 0; i < nums.length; i++) {
    if (currSum == 0) {
      // This is the beginning of new Subarray so store the starting index
      start = i; // starting index
    }
    // keep on adding element to the sum
    currSum += nums[i];

    // if we get any maximum sum, update it
    if (currSum > maxSum) {
      maxSum = currSum;
      // Store the starting and ending of this subarray with maximum sum
      subStart = start;
      subEnd = i;
    }

    // if current sum becomes negative, make it 0 as negative will not help us in getting maximum sum
    if (currSum < 0) {
      currSum = 0;
    }
  }

  // Print the subarray
  for (let i = subStart; i <= subEnd; i++) {
    console.log(nums[i] + " ");
  }

  return maxSum;
};

// Best Time to Buy and Sell Stock
/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
*/
var maxProfit = function (prices) {
  // We know we can gather maximum profit, if we buy at the lowest price and sell at the highest price
  // But, the catch here is that we need to buy first then sell it
  // Brute force approach can be where we will pick one stock means buy it so we run one outer loop where we pick each index
  // Now there is another inner loop which we use to sell that stock and we keep on storing the profit by doing prices[j]-prices[i]
  // This way we can proceed
  let maxProfit = 0;
  for (let buy = 0; buy < prices.length; buy++) {
    for (let sell = buy + 1; sell < prices.length; sell++) {
      maxProfit = Math.max(maxProfit, prices[sell] - prices[buy]);
    }
  }

  return maxProfit;
};

// Little Optimised Approach, TC: O(n), SC: O(n)
var maxProfit = function (prices) {
  // Little Optimised Approach
  // We know we can gather maximum profit, if we buy at the lowest price and sell at the highest price
  // But, the catch here is that we need to buy first then sell it
  // We will maintain a auxilliary array in which we will store the rightMax to each element, we will start filling that array from the end
  // Once we have this aux array, we will subtract current - aux and store maxProfit
  let n = prices.length;
  let rightMax = [];
  rightMax[n - 1] = prices[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(prices[i], rightMax[i + 1]);
  }

  let maxProfit = 0;
  for (let i = 0; i < n; i++) {
    maxProfit = Math.max(maxProfit, rightMax[i] - prices[i]);
  }

  return maxProfit;
};

// Most Optimised Approach, TC: O(n), SC: O(1)
var maxProfit = function (prices) {
  // We will think of selling on each day and before that we compare it with its least value before it
  // Basically, we will maintain a variable minSoFar where we store minimum value we have encountered till now
  // We traverse in the loop and update minSoFar if we feel so and for every index we try to sell and check maxProfit using a variable and return it in the end
  let maxProfit = 0;
  let minSoFar = prices[0];
  for (let i = 0; i < prices.length; i++) {
    maxProfit = Math.max(maxProfit, prices[i] - minSoFar);
    minSoFar = Math.min(minSoFar, prices[i]);
  }

  return maxProfit;
};

// Best Time to Buy and Sell Stock II
/*
You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.
Find and return the maximum profit you can achieve.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.
*/
var maxProfit = function (prices) {
  // We can have atmost (max) one stock at a time
  // Means if we buy a stock, we need to sell it before buying another stock
  // We will buy when we encounter a local minima, we will sell when we encounter a local maxima
  // What is a local minima? An element whose left and right both are greater than itself then that element is a local minima
  // What is a local maxima? An element whose left and right both are smaller than itself then that element is a local maxima
  // Or Instead of finding local maxima or local minima, we can directly compare one value with its previous value
  // if curr > prev, subtract them and add it to the profit
  // Because there is no limit on number of transactions we can make
  // Let us take [1,4,7] now 4-1 = 3 + 7-4 = 6 and by local max/min approach 7-1 = 6. So its one or the same thing
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
};

// Second Largest
/*
Given an array Arr of size N, print the second largest distinct element from an array. If the second largest element doesn't exist then return -1.

Example 1:
Input:
N = 6
Arr[] = {12, 35, 1, 10, 34, 1}
Output: 34
Explanation: The largest element of the
array is 35 and the second largest element
is 34.
*/
function print2largest(arr, n) {
  // We will use vairbales to store largest element of array using a for loop
  // Now we again run a loop to check any element which is not equal to largest but the largest element of the array that will be our second largest element of array
  let largest = -1,
    second_largest = -1;
  for (let i = 0; i < n; i++) {
    // find the largest element of array
    largest = Math.max(largest, arr[i]);
  }

  for (let i = 0; i < n; i++) {
    if (arr[i] > second_largest && arr[i] != largest) {
      second_largest = arr[i];
    }
  }

  return second_largest;
}

// Optimal
function print2largest(arr, n) {
  // Optimal approach
  // We will try to do everything in one loop instead of 2 loops
  if (n < 2) {
    return -1;
  }

  let large = -1,
    second_large = -1;
  let i;
  for (i = 0; i < n; i++) {
    if (arr[i] > large) {
      second_large = large;
      large = arr[i];
    } else if (arr[i] > second_large && arr[i] != large) {
      second_large = arr[i];
    }
  }
  return second_large;
}

// Check if Array Is Sorted and Rotated
/*
Given an array nums, return true if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero). Otherwise, return false.

There may be duplicates in the original array.

Note: An array A rotated by x positions results in an array B of the same length such that A[i] == B[(i+x) % A.length], where % is the modulo operation.

Example 1:
Input: nums = [3,4,5,1,2]
Output: true
Explanation: [1,2,3,4,5] is the original sorted array.
You can rotate the array by x = 3 positions to begin on the the element of value 3: [3,4,5,1,2].
*/
var check = function (nums) {
  // Brute force: We will use 2 loops, pick each element and compare it with all next elements j = i+1 till n and if anytime arr[i] > arr[j], return false
  // Optimial: Do this in one traversal instead of 2 loops
  // We will run a loop from i = 1 -> n and check if arr[i] > arr[i-1], if anytime this condition is false, return false because we know in a sorted array arr[i] >= arr[i-1] considering duplicates
  // How to check if a array is rotated?
  // Elements will keep on increasing till a point and after than they will decrease
  // How to check if Array is sorted and rotated both?
  // Elements will be sorted till pivot point, elements will be sorted after pivot point so there will be only one element which does not follow sorting order in rotated array means arr[i-1] > arr[i] for only 1 element in a successful sorted array, last element should be less than first element for it to be a rotated and sorted array
  let count = 0;
  let n = nums.length;
  for (let i = 1; i < n; i++) {
    if (nums[i - 1] > nums[i]) {
      count++;
    }
  }

  if (nums[n - 1] > nums[0]) {
    count++;
  }

  // if count == 1 or less than it, means array was earlier sorted and yes, it is rotated
  return count <= 1;
};

// Rotate Array
/*
Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

Example 1:
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
*/
var rotate = function (nums, k) {
  // Brute force: We will make an temporary array of size k, we will copy all elements from n-k -> n in the temp array
  // We will store all elements from i = 0 -> k in nums to nums[i+k]
  // we will store all elements of temp in nums from starting position
  // nums = [1,2,3,4,5,6,7], k = 3
  // first step: temp = [5,6,7], second step: fill arr in reverse order from end, arr = [na,na,na,1,2,3,4]
  // last step = arr[5,6,7,1,2,3,4]
  let n = nums.length;
  if (n == 0) {
    return [];
  }

  // 0 <= k <= 10^5 so make it within our range
  k = k % n;
  if (k > n) {
    return [];
  }

  let temp = Array(k);
  for (let i = n - k; i < n; i++) {
    temp[i + k - n] = nums[i];
  }

  // fill elements in nums from end index [na,na,na,1,2,3,4] are getting fill in nums in reverse order
  for (let j = n - k - 1; j >= 0; j--) {
    nums[j + k] = nums[j];
  }

  // copying first k elements from temp, back to nums
  for (let i = 0; i < k; i++) {
    nums[i] = temp[i];
  }

  return nums;
};

// Optimial
var rotate = function (nums, k) {
  // Optimal Approach: We will use reverse Algorithm
  // First rotate 0 to (n-k)  elements [1,2,3,4,5,6,7] -> [4,3,2,1,5,6,7]
  // Then rotate (n-k+1) till n elements [4,3,2,1,5,6,7] -> [4,3,2,1,7,6,5]
  // Then rotate whole array once [4,3,2,1,7,6,5] -> [5,6,7,1,2,3,4]
  if (nums.length == 0) {
    return nums;
  }

  // 0 <= k <= 10^5 so make it within our range
  k = k % nums.length;
  if (k > nums.length) {
    return nums;
  }
  let n = nums.length - 1;
  rotateArray(nums, 0, n - k);
  rotateArray(nums, n - k + 1, n);
  rotateArray(nums, 0, n);
};

function rotateArray(nums, start, end) {
  while (start <= end) {
    let temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
}

// Union of Two Sorted Arrays
/*
Given two sorted arrays of size n and m respectively, find their union. The Union of two arrays can be defined as the common and distinct elements in the two arrays. Return the elements in sorted order.

Example 1:
Input:
n = 5, arr1[] = {1, 2, 3, 4, 5}
m = 5, arr2 [] = {1, 2, 3, 6, 7}
Output:
1 2 3 4 5 6 7
Explanation:
Distinct elements including both the arrays are: 1 2 3 4 5 6 7.
*/
function findUnion(arr1, arr2, n, m) {
  // Brute force: We can make use of map data structure to store frequency of elements from both nums1, nums2
  // The map will store everything in key-value pairs and In JS map stores everything in order as inserted so we need to sort it
  // We fill elements back from back to new array and return it
  // We can also use a set instead of it and do the same
  let freq = new Map();
  let union = [];

  for (let num of arr1) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  for (let num of arr2) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  let sortedMap = new Map([...freq].sort((a, b) => a[0] - b[0]));
  for (let [num, count] of sortedMap) {
    union.push(num);
  }

  return union;
}

// Optimal
function findUnion(arr1, arr2, n, m) {
  // Optimal Approach: We can use 2 pointers to traverse arr1 and arr2 simultaneously
  // if arr1[i] <= arr2[j], we check if last element of union[] != arr[i], push it and i++
  // samway for arr2 and j++
  // at the end, push all elements of arr1 and arr2 till it does not gets empty keeping in mind that union[] should not contain these elements already
  // arr1[ i ] == arr2[ j ]  Here we found a common element, so insert only one element in the union. Let’s insert arr[i] in union and increment i. There may be cases like the element to be inserted is already present in the union, in that case, we are inserting duplicates which is not desired. So while inserting always check whether the last element in the union vector is equal or not to the element to be inserted.
  // arr1[ i ] < arr2[ j ] so we need to insert arr1[ i ] in union.IF last element in  union vector is not equal to arr1[ i ],then insert in union else don’t insert. After checking Increment i.
  // arr1[ i ] > arr2[ j ] so we need to insert arr2[ j ] in union. IF the last element in the union vector is not equal to arr2[ j ], then insert in the union, else don’t insert. After checking Increment j.

  let i = 0,
    j = 0;
  let union = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      // Case 1 and 2
      if (union.length === 0 || union[union.length - 1] !== arr1[i])
        union.push(arr1[i]);
      i++;
    } else {
      // Case 3
      if (union.length === 0 || union[union.length - 1] !== arr2[j])
        union.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    // If any elements left in arr1
    if (union[union.length - 1] !== arr1[i]) union.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    // If any elements left in arr2
    if (union[union.length - 1] !== arr2[j]) union.push(arr2[j]);
    j++;
  }

  return union;
}

// Missing Number
/*
Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Example 1:
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
*/
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
};

// Single Number
/*
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

Example 1:
Input: nums = [2,2,1]
Output: 1
*/
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

// Longest Sub-Array with Sum K
/*
Given an array containing N integers and an integer K., Your task is to find the length of the longest Sub-Array with the sum of the elements equal to the given value K.

Example 1:
Input :
A[] = {10, 5, 2, 7, 1, 9}
K = 15
Output : 4
Explanation:
The sub-array is {5, 2, 7, 1}.
*/
function lenOfLongSubarr(a, n, k) {
  // Brute force Approach: We will run 2 loops and one will run from i = 0 ->n , another will run from j = i->n, and inside it we run a loop to take sum of all elements between the range [i,j] and sum them and compare the sum
  // Optimal Approach: we will use hashing to store {sum, i} to store sum related to each index i
  let preSumMap = new Map();
  let sum = 0;
  let maxLen = 0;
  for (let i = 0; i < n; i++) {
    // calculate the prefix sum till index i
    sum += a[i];

    // if the sum = k, update the maxLen
    if (sum === k) {
      maxLen = Math.max(maxLen, i + 1);
    }

    // calculate the sum of remaining part i.e. x - k
    let rem = sum - k;

    // calculate the length and update maxLen
    if (preSumMap.has(rem)) {
      let len = i - preSumMap.get(rem);
      maxLen = Math.max(maxLen, len);
    }

    // update the map checking the conditions
    if (!preSumMap.has(sum)) {
      preSumMap.set(sum, i);
    }
  }

  return maxLen;
}

// Optimal (For only positives, if it includes negative too then hashing approach is sufficient)
function lenOfLongSubarr(arr, n, k) {
  // Most Optimal Approach (For only positives)
  // We will take 2 pointers left = 0 and right = 0, we take sum = arr[0], maxLen = -1
  // we will move right to index = 1 start taking sum += a[right] now [left,right] denotes our subarray
  // So if our sum == k anytime, we update maxLen
  // if anytime our sum > k, we will move left++ and sum = sum - arr[left]
  let left = 0,
    right = 0;
  let sum = arr[0];
  let maxLen = 0;
  while (right < n) {
    // we do right++ initially because our left, right = 0 both initially
    // To start taking sum of subarray elements we need to expand our subarray using right++
    // We will shrink our subarray using left++ when sum > k
    right++;
    if (right < n) {
      sum += arr[right];
    }

    // if sum > k, move left
    while (left <= right && sum > k) {
      sum = sum - arr[left];
      left++;
    }

    if (sum == k) {
      // store maxLen, as we need maximum subarray so we do not stop till our right goes out of bound
      maxLen = Math.max(maxLen, right - left + 1);
    }
  }

  return maxLen;
}

// Sort an array of 0's 1's and 2's
/*
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
*/
var sortColors = function (nums) {
  // Brute Force Approach: We will just simply sort the array although it is not expexted in the problem statement
  // Better Approach: We will simply count number of 0's, number of 1's, number of 2's and paste in the based indexes in sequence of 0,1,2 running 3 loops based on count
  // Optimal Approach: We will use 3 pointers where we want to run them such that arr[0….low-1] contains 0. [Extreme left part], arr[low….mid-1] contains 1. arr[high+1….n-1] contains 2. [Extreme right part], n = size of the array
  // We will use 3 pointers, low, mid, high
  // low starts from 0, mid also starts from 0, high starts from nums.length-1
  // we will run a loop till mid <= high
  // low will take care of 0's, mid will take care of 1's and high will take care of 2's
  let low = 0,
    mid = 0,
    high = nums.length - 1,
    temp = 0;
  while (mid <= high) {
    if (nums[mid] == 0) {
      temp = nums[low];
      nums[low] = nums[mid];
      nums[mid] = temp;
      low++;
      mid++;
    } else if (nums[mid] == 1) {
      mid++;
    } else {
      temp = nums[mid];
      nums[mid] = nums[high];
      nums[high] = temp;
      high--;
    }
  }

  return nums;
};

// Rearrange Array Elements by Sign
/*
You are given a 0-indexed integer array nums of even length consisting of an equal number of positive and negative integers.

You should return the array of nums such that the the array follows the given conditions:

Every consecutive pair of integers have opposite signs.
For all integers with the same sign, the order in which they were present in nums is preserved.
The rearranged array begins with a positive integer.
Return the modified array after rearranging the elements to satisfy the aforementioned conditions.

Example 1:
Input: nums = [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]
Explanation:
The positive integers in nums are [3,1,2]. The negative integers are [-2,-5,-4].
The only possible way to rearrange them such that they satisfy all conditions is [3,-2,1,-5,2,-4].
Other ways such as [1,-2,2,-5,3,-4], [3,1,2,-2,-5,-4], [-2,3,-5,1,-4,2] are incorrect because they do not satisfy one or more conditions.
*/
var rearrangeArray = function (nums) {
  // Brute Force Approach: We will try to calculate number of positive elements and store them in an array pos[], calculate number of negative elements and store them in an array neg[]
  // 'nums consists of equal number of positive and negative integers.' is given
  // We will again do a traversal from i = 0 -> i < n/2 and at all 2*i (even index) indexes we fill positive numbers, At all 2*i + 1 (odd index) we will fill all negative numbers
  let pos = [];
  let neg = [];
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      pos.push(nums[i]);
    } else {
      neg.push(nums[i]);
    }
  }

  for (let j = 0; j < n / 2; j++) {
    nums[2 * j] = pos[j];
    nums[2 * j + 1] = neg[j];
  }

  return nums;
};

// Better Approach
var rearrangeArray = function (nums) {
  // Better Approach: Instead of doing everything in 2 loops, we will try to do everything in a single pass
  // It is given that resultant array should start from positive element so we can make 2 variables, posIndex = 0 as we need positive element in 0th index, negIndex = 1 (initially) as we need to start filling negative elements from 1st index
  // Once we store any positive element we increment by 2 steps and sameway for negative element
  let n = nums.length;
  let arr = Array(n).fill(0);
  let posIndex = 0,
    negIndex = 1;
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      arr[posIndex] = nums[i];
      posIndex += 2;
    } else {
      arr[negIndex] = nums[i];
      negIndex += 2;
    }
  }

  return arr;
};

// Follow Up Question
var rearrangeArray = function (nums) {
  // Follow Up Question: Do the same thing given that number of positive elements are not equal to negative elements so while rearranging elements alternatively, start with a positive element and fill all leftover elements are at the end
  // So we will use pos[] and neg[] approach only but this time, if we check whether number of positive is greater in number or number of negatives are greater in number
  // whomsoever is greater, leftover elements will be coming from it only
  let pos = [];
  let neg = [];
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) pos.push(nums[i]);
    else neg.push(nums[i]);
  }

  if (pos.length < neg.length) {
    // negatives are in greater number
    for (let i = 0; i < pos.length; i++) {
      nums[2 * i] = pos[i];
      nums[2 * i + 1] = neg[i];
    }

    // nums is already filled till pos.length*2 index because half element of pos.length come from neg also so we need to fill leftOver negatives in nums from pos.length*2 index
    let index = pos.length * 2;
    for (let i = pos.length; i < neg.length; i++) {
      nums[index] = neg[i];
      index++;
    }
  }
  // If negatives are lesser than the positives.
  else {
    // First, fill array alternatively till the point
    // where positives and negatives are equal in number.
    for (let i = 0; i < neg.length; i++) {
      nums[2 * i] = pos[i];
      nums[2 * i + 1] = neg[i];
    }

    // Fill the remaining positives at the end of the array.
    let index = neg.length * 2;
    for (let i = neg.length; i < pos.length; i++) {
      nums[index] = pos[i];
      index++;
    }
  }
  return nums;
};

// Next Permutation
/*
A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
Given an array of integers nums, find the next permutation of nums.

The replacement must be in place and use only constant extra memory.

Example 1:
Input: nums = [1,2,3]
Output: [1,3,2]
*/
var nextPermutation = function (nums) {
  // Problem statement: We will be given an array and we need to return the next permutation of that array sequence
  // For arr [1,2,3], all its permutations are [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1]
  // Now arr could be anything say arr = [2,3,1] then we need to return next lexicographically greater permutation of [2,3,1] in sequence of its all sequence i.e return [3,1,2]
  // How to find next permutation?
  // We observe that there can be presence of a mountaineous sttucture in the array if we look from the end of array like it is there in [2,3,1] or [1,3,2] or [3,1,2] but its not necessary, it might also happen that array is sorted in decreasing order if we look from end of array
  // first and foremost task is to find the break point of array i.e such a index where arr[i] < arr[i+1]
  // if break point is found, repeat some steps i.e from index = brk_point till index = n, we have whole right half of array, in that right half. find an element such that it is greater than arr[brk_point] say ind2
  // if such element is found, store its index and swap it with break point index value, now reverse whole right half from brk_pint +1 till n
  // and that is our next permutation because if we see [2,3,1] brk_pointi is arr[0] = 2, we see gretest element on right half is arr[1] = 3 so swap. after swap it becomes [3,2,1] now we reverse brk_point+1 i.e arr[0+1] till arr[n] so array becomes [3,1,2] and i.e our next permutation of [2,3,1]
  // Now what if break point is not present? like [3,2,1] means array is sorted in decreasing order and that is case when that permutation is the last permutation of that array so its next permutation will be reverse(Arr) so array becomes [1,2,3] i.e increasingly sorted and thats our answer
  let brk_pt = -1;
  let n = nums.length;
  // we will start searching for break point from index = n-2 because we will look for ind and ind+1 so to avoid overflow
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      brk_pt = i;
      break;
    }
  }

  // if break point not found
  if (brk_pt == -1) {
    reverse(nums, 0, n - 1);
    return nums;
  }

  let ind2 = -1;
  for (let i = n - 1; i > brk_pt; i--) {
    if (nums[i] > nums[brk_pt]) {
      // if such element found, swap and break out
      [nums[i], nums[brk_pt]] = [nums[brk_pt], nums[i]];
      break;
    }
  }

  // reverse whole right half
  reverse(nums, brk_pt + 1, n - 1);
  return nums;
};

function reverse(arr, start, end) {
  while (start <= end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

// Leaders in an array
/*
Given an array A of positive integers. Your task is to find the leaders in the array. An element of the array is a leader if it is greater than all the elements to its right side or if it is equal to the maximum element on its right side. The rightmost element is always a leader.

Example 1:
Input:
n = 6
A[] = {16,17,4,3,5,2}
Output: 17 5 2
Explanation: The first leader is 17
as it is greater than all the elements
to its right.  Similarly, the next
leader is 5. The right most element
is always a leader so it is also
included.
*/

function leaders(arr, n) {
  // Based on conditions of a leader and the given fact that 'The rightmost element is always a leader.'
  // What we are doing is, we are always comparing any element with all elements on its right and deciding whether current element is an leader or not
  // What if we start traversal from the end element and each time we store the maximum element we encounter
  // In this process if we find someone greater than our maximum element means he is also a leader so push him in result array and update the maximum
  let res = [];
  // Rightmost element is always a leader so push it in array everytime and start traversal from i = n-2
  let maxi = arr[n - 1];
  res.push(arr[n - 1]);
  for (let i = n - 2; i >= 0; i--) {
    if (arr[i] > maxi) {
      res.push(arr[i]);
      maxi = arr[i];
    }
  }

  return res;
}

// Longest Consecutive Sequence
/*
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
*/
var longestConsecutive = function (nums) {
  // We will use set Data structure to store elements in unique fashion
  // We will add all elements inside set
  // Now we traverse the set, for each element inside set
  // we check its ele-1, if not found
  // we check for its ele+1 and count it till we find it
  let n = nums.length;
  if (n == 0) {
    return 0;
  }

  let longest = 1; // there will always be one element inside array so longest = 1
  const st = new Set();
  for (let i = 0; i < n; i++) {
    st.add(nums[i]);
  }

  // Check inside set
  for (let val of st) {
    if (!st.has(val - 1)) {
      // check for val+1
      let count = 1; // we have found the first element so count = 1 initialised
      let x = val;
      while (st.has(x + 1)) {
        // check till we get consecutive number and do count++
        count++;
        x++;
      }

      // update longest variable with count
      longest = Math.max(longest, count);
    }
  }

  return longest;
};

// Set Matrix Zeroes
/*
Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
You must do it in place.
*/
var setZeroes = function (matrix) {
  // Brute force Approach: We will traverse all row and col and if we encounter a mat[i][j] == 0, we make whole row and whole col as -1
  // Why -1, why not 0? because if we mark everyone as 0 in that row and col, then it will make other 1's in those row and col as 0 which will bring change in our answer so initially mark them all as -1 and later we will mark them all with 0 once whole traversal is done
  let n = matrix.length;
  let m = matrix[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] == 0) {
        markRow(i, matrix, m);
        markCol(j, matrix, n);
      }
    }
  }

  // Mark all -1 as 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === -1) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
};

function markRow(row, matrix, m) {
  for (let i = 0; i < m; i++) {
    if (matrix[row][i] !== 0) {
      matrix[row][i] = -1;
    }
  }
}

function markCol(col, matrix, n) {
  for (let i = 0; i < n; i++) {
    if (matrix[i][col] !== 0) {
      matrix[i][col] = -1;
    }
  }
}

// Better Approach
var setZeroes = function (matrix) {
  // Better Approach, Instead of making -1 this time, we will use 2 arrays row and col which will store indexes where we have to make element as 0
  // say matrix[i][j] = 0 then row[i] = 1, col[j] = 1
  // now after whole traversal, we traverse again and if(row[i] || col[j]) then matrix[i][j] = 0
  const n = matrix.length;
  const m = matrix[0].length;
  const row = new Array(n).fill(0); // row array
  const col = new Array(m).fill(0); // col array

  // Traverse the matrix:
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 0) {
        // mark ith index of row with 1:
        row[i] = 1;

        // mark jth index of col with 1:
        col[j] = 1;
      }
    }
  }

  // Finally, mark all (i, j) as 0
  // if row[i] or col[j] is marked with 1.
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (row[i] || col[j]) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
};

// Rotate Image
/*
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
*/
var rotate = function (matrix) {
  // By observation, we see that the first column of the original matrix is the reverse of the first row of the rotated matrix, so that’s why we transpose the matrix and then reverse each row, and since we are making changes in the matrix itself space complexity gets reduced to O(1).
  // Transpose each col and reverse each row
  // we get the answer
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    matrix[i].reverse();
  }
};

// Spiral Matrix
/*
Given an m x n matrix, return all elements of the matrix in spiral order.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
*/
var spiralOrder = function (matrix) {
  // TC: O(m*n)
  let ans = [];
  let row_size = matrix.length;
  let col_size = matrix[0].length;

  let count = 0;
  let total = row_size * col_size;

  let startingRow = 0;
  let startingCol = 0;
  let endingRow = row_size - 1;
  let endingCol = col_size - 1;

  while (count < total) {
    // Print starting row
    for (let i = startingCol; count < total && i <= endingCol; i++) {
      ans.push(matrix[startingRow][i]);
      count++;
    }
    startingRow++;

    // Print ending col
    for (let i = startingRow; count < total && i <= endingRow; i++) {
      ans.push(matrix[i][endingCol]);
      count++;
    }
    endingCol--;

    // print ending row
    for (let i = endingCol; count < total && i >= startingCol; i--) {
      ans.push(matrix[endingRow][i]);
      count++;
    }
    endingRow--;

    // print starting col
    for (let i = endingRow; count < total && i >= startingRow; i--) {
      ans.push(matrix[i][startingCol]);
      count++;
    }
    startingCol++;
  }
  return ans;
};

// Subarray Sum Equals K
/*
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,1,1], k = 2
Output: 2
*/
var subarraySum = function (nums, k) {
  // Brute force Approach: We will use 2 loops and take a variable count = 0, we take sum of all elements in second loop which start from j = i -> n
  // if(sum==k) we do count++ and in the end, we return count
  // Optimal Approach: We will use map and prefixSum, Inside the map we will store prefix and its count
  // We will set mpp[0] = 1 because say given array is [3, -3, 1, 1, 1] and k is 3. Now, for index 0, we get the total prefix sum as 3, and k is also 3. So, the prefix sum of the remove-part should be x-k = 3-3 = 0. Now, if the value is not previously set for the key 0 in the map, we will get the default value 0 for the key 0 and we will add 0 to our answer. This will mean that we have not found any subarray with sum 3 till now. But this should not be the case as index 0 itself is a subarray with sum k i.e. 3. So, in order to avoid this situation we need to set the value of 0 as 1 on the map beforehand.
  // we will calculate prefix sum for each element and we check if prefix - k is present in the map because let say our current_sum = 14 , required  = 7 , then 14-7 if its exited in map ealrier. means there must have been an subarray with required sum of 7, add into count and add that prefix sum into the answer
  let mpp = new Map();
  let count = 0;
  let n = nums.length;
  let prefixSum = 0;
  mpp.set(0, 1);
  for (let i = 0; i < n; i++) {
    prefixSum += nums[i];

    if (prefixSum == k) {
      count++;
    }

    let remove = prefixSum - k;
    if (mpp.has(remove)) {
      count += mpp.get(remove);
    }

    mpp.set(prefixSum, (mpp.get(prefixSum) || 0) + 1);
  }

  return count;
};
