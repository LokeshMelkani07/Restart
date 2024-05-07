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
  let currSum = 0;
  let maxSum = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    // keep on adding element to the sum
    currSum += nums[i];

    // if we get any maximum sum, update it
    if (currSum > maxSum) {
      maxSum = currSum;
    }

    // if current sum becomes negative, make it 0 as negative will not help us in getting maximum sum
    if (currSum < 0) {
      currSum = 0;
    }
  }

  return maxSum;
};
