// Sqrt(x)
// Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well. You must not use any built-in exponent function or operator. For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.
var mySqrt = function (x) {
  // something*something = x means something is sqrt of x
  // constraints say 0<=x so if x = 0 or 1, sqrt will be 0 or 1 itself
  // now we start from 2 to x/2 and we check if i*i == x
  // we go till x/2 because after that i*i is always > x
  // if i*i > x then we return i-1 as The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
  if (x <= 1) {
    return x;
  }

  for (let i = 2; i <= x; i++) {
    // this loop always run till sqrt(x) so TC: O(logn)
    if (i * i === x) {
      return i;
    }

    if (i * i > x) {
      return i - 1;
    }
  }
};

// First Bad Version
// You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad. Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad. You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
var solution = function (isBadVersion) {
  return function (n) {
    // Let say we have an array of good and bad like [G,G,G,B,B,B,B] and we want to find first bad product (B)
    // This question is same as find pivot point in an array
    // We have isBadVersion(version) function which is an API which tells us whether that product is bad or good so we use it
    // We need to make minimum number of API calls to get the result so we can also use linear search but as we see array is sorted like all (G) one side and all other (B) on the other side.
    // So we will use binary search and start = 1 as array start from 1
    let start = 1;
    let end = n;
    let res = n; // let last element be first bad product

    while (start <= end) {
      let mid = Math.floor(start + (end - start) / 2);

      if (isBadVersion(mid)) {
        // means its bad so store in result
        res = mid;
        // search in left half for any previous bad version
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return res;
  };
};

// Search Insert Position
// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.
var searchInsert = function (nums, target) {
  // As its given in Constraints that "nums contains distinct values sorted in ascending order." We do binary search
  // if number is found then its okay otherwise Binary search ends when start > end means end points to one index lesser than target so we return end+1 to give correct insert position of target in nums
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return end + 1;
};

// Find Minimum in Rotated Sorted Array
// Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become: [4,5,6,7,0,1,2] if it was rotated 4 times. [0,1,2,4,5,6,7] if it was rotated 7 times. Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]]. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.
var findMin = function (nums) {
  // it will be like a mountain array
  // we have a pivot and our minimum element will always come after pivot
  // if(nums[mid]>nums[end]) means mid can be a pivot so go to right of mid so start = mid+1
  // if(nums[mid]<nums[end]) means be in left half so put end = mid
  // at the end our nums[start] contains our minimum element
  let start = 0;
  let end = nums.length - 1;
  while (start < end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (nums[mid] > nums[end]) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  return nums[start];
};

// Find First and Last Position of Element in Sorted Array
// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.
// find mid, now to get first occurence, do end = mid-1
// to get last occurence do, start = mid+1;
// to compile both logic in single code, we use string to check if we want first or last occurence
var firstLastOccurence = (arr, target, operation) => {
  let start = 0;
  let end = arr.length - 1;
  let ans = -1;

  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);

    if (arr[mid] == target) {
      ans = mid;
      if (operation == "first") {
        end = mid - 1;
      }
      if (operation == "last") {
        start = mid + 1;
      }
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return ans;
};

var searchRange = function (nums, target) {
  var first = firstLastOccurence(nums, target, "first");
  var last = firstLastOccurence(nums, target, "last");
  return [first, last];
};

// Single Element in a Sorted Array
// You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Return the single element that appears only once. Your solution must run in O(log n) time and O(1) space.
var singleNonDuplicate = function (nums) {
  // we can do XOR to get that single element
  let x = nums[0];
  console.log("x^x ", 1 ^ 1); // 0
  console.log("x^x ", 0 ^ 2); // 2
  for (let i = 1; i < nums.length; i++) {
    x = x ^ nums[i];
  }

  return x;
};

var singleNonDuplicate = function (nums) {
  // As array is sorted, we can also check element by element
  for (let i = 0; i < nums.length - 1; i += 2) {
    if (nums[i] != nums[i + 1]) {
      return nums[i];
    }
  }

  return nums[nums.length - 1];
};

// Search a 2D Matrix
// You are given an m x n integer matrix matrix with the following two properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise. You must write a solution in O(log(m * n)) time complexity.
var searchMatrix = function (matrix, target) {
  // Linear search in 2D matrix
  let n = matrix.length - 1;
  let m = matrix[0].length - 1;

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (matrix[i][j] === target) {
        return true;
      }
    }
  }

  return false;
};

var searchMatrix = function (matrix, target) {
  // It is a sorted array so we can use Binary search
  // Think of 2D array as 1D array then think of applying BS
  // but if we have mid = 5 in 1D, means (1,1) element in 2D array
  // how to convert mid = 5 to (row,col) in 2D?
  // we have a formula for it, matrix[mid/n][mid%n]
  let m = matrix.length;
  let n = matrix[0].length;
  let start = 0;
  let end = m * n - 1;

  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    let row = Math.floor(mid / n);
    let col = mid % n;
    console.log("row ", row);
    console.log("col ", col);
    if (matrix[row][col] == target) {
      return true;
    } else if (matrix[row][col] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return false;
};

// Find Peak Element
// A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array. You must write an algorithm that runs in O(log n) time.
var findPeakElement = function (arr) {
  // peak element is the one jiske aage peeche vale sab usse chote h
  // say, mid is peak element
  // then mid+1 and mid-1 both are smaller than mid
  // what if we are at 0 or last index? we have to handle them separately
  // shrink array based on condition that, if we have prev element as smaller than current element, move to right half for the answer
  // else move to left half
  let n = arr.length;
  // we have to return the index of peak element
  if (n == 0) return -1;
  if (n == 1) return 0;
  if (arr[0] > arr[1]) return 0;
  if (arr[n - 1] > arr[n - 2]) return n - 1;

  let start = 1;
  let end = n - 2;

  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);

    if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1]) {
      return mid;
    }

    if (arr[mid] > arr[mid - 1]) start = mid + 1;
    else end = mid - 1;
  }

  return -1;
};

// Search in Rotated Sorted Array
// There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2]. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.
var search = function (arr, target) {
  let n = arr.length;
  let start = 0,
    end = n - 1;
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (arr[mid] == target) {
      return mid;
    }
    // Check if Left part is sorted or not
    else if (arr[start] <= arr[mid]) {
      // check if target lie in left part
      if (target >= arr[start] && target <= arr[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      // otherwise check if target lies in right half
      if (target >= arr[mid] && target <= arr[end]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
};
