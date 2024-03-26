// How Many Numbers Are Smaller Than the Current Number
// Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it. That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i]. Return the answer in an array.
/*
Example 1:

Input: nums = [8,1,2,2,3]
Output: [4,0,1,1,3]
Explanation:
For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3).
For nums[1]=1 does not exist any smaller number than it.
For nums[2]=2 there exist one smaller number than it (1).
For nums[3]=2 there exist one smaller number than it (1).
For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).
*/
var smallerNumbersThanCurrent = function (nums) {
  // We will make another array where we will store the sorted nums array
  // Now we map through nums array and get the indexof that nums's element in sorted array
  // nums = [8,1,2,2,3]
  // sorted = [1,2,2,3,8]
  // sorted.indexof(8) = 4 (0-based indexing) means 4 element smaller than 8
  // sorted.indexof(1) = 0 means 0 element smaller than 1
  const sorted = [...nums].sort((a, b) => a - b);
  return nums.map((e) => sorted.indexOf(e));
};

// Merge Sorted Array
/*
You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

Example 1:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
*/
var merge = function (nums1, m, nums2, n) {
  // Make a new empty array
  const arr = [];
  let i = 0,
    j = 0,
    k = 0;
  while (i < m && j < n) {
    // Store the smaller element first
    if (nums1[i] <= nums2[j]) {
      arr[k++] = nums1[i++];
    } else {
      arr[k++] = nums2[j++];
    }
  }

  // if any one of the array is still left with some elements, push the, as it is
  while (i < m) {
    arr[k++] = nums1[i++];
  }

  // if any one of the array is still left with some elements, push the, as it is
  while (j < n) {
    arr[k++] = nums2[j++];
  }

  // Push the elements from arr into nums1
  let len = arr.length;
  k = 0;
  while (k < len) {
    nums1[k] = arr[k];
    k++;
  }

  return nums1;
};

// Sort an Array
/*
Given an array of integers nums, sort the array in ascending order and return it.
You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

Example 1:
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).
*/
var sortArray = function (nums) {
  // Let us use Merge Sort
  return mergeSort(nums);
};

const mergeSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
};

const merge = (left, right) => {
  const result = [];
  let leftIndex = 0,
    rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
};

//  Largest Number
/*
Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.
Since the result may be very large, so you need to return a string instead of an integer.

Example 1:
Input: nums = [10,2]
Output: "210"
*/
var largestNumber = function (nums) {
  // We will use sorting + string comparison
  // Let say we keep one pointer "i" = 0 and another "j" = i+1
  // Now we concate ij and ji and compare
  // ij > ji means its good go ahead, if ji > ij means not good, swap them and move j++
  // this way we move i++ and after each iteration ith poisiton has correct element and j always start from i+1 till end
  // we can use sort() with custom comparator to do it
  if (!nums || nums.length == 0) {
    return "0";
  }

  // sort() comparator acts as a double for-loop where each element with compared with each element and based on condition of comp, sorting is done
  // TC of sort() in JS is nlogn and it uses quick-sort under the hood
  const sorted = nums.sort((a, b) => {
    let firstString = a.toString() + b.toString();
    let secondString = b.toString() + a.toString();
    // if ba > ab means swap it
    return secondString - firstString;
  });

  const joined = sorted.join("");
  if (parseInt(joined) === 0) {
    return "0";
  } else {
    return joined;
  }
};

// Sort Colors
/*
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
You must solve this problem without using the library's sort function.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
*/
var sortColors = function (nums) {
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
