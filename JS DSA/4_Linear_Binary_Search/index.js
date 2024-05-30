// Linear Search in JS
// TC: O(n) in worst case
function linear_search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      return i;
    }
  }
  return -1;
}

const arr = [1, 2, 3, 4, 5, 6];
console.log(linear_search(arr, 3));
console.log(arr.includes(4)); // another way
console.log(arr.indexOf(4)); // another way
console.log(arr.find((num) => num > 0)); // another way
console.log(arr.findIndex((num) => num > 0)); // another way

// Find the Index of the First Occurrence in a String
var strStr = function (haystack, needle) {
  // Using Linear Search
  // TC: O(m*n), SC: O(1)
  let m = haystack.length;
  let n = needle.length;
  for (let i = 0; i <= m - n; i++) {
    let flag = true;
    for (let j = 0; j < n; j++) {
      if (haystack[i + j] !== needle[j]) {
        flag = false;
      }
    }

    if (flag) {
      return i;
    }
  }

  return -1;
};

// Binary Search in JS
// Applied in Sorted Array
// TC: O(logn)
function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}

const arr1 = [1, 2, 3, 4, 5, 6, 7];
console.log(binarySearch(arr, 7));

// Recursive Binary Search
function recursiveBinarySearch(arr, target, start, end) {
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      return recursiveBinarySearch(arr, target, 0, mid - 1);
    } else {
      return recursiveBinarySearch(arr, target, mid + 1, end);
    }
  }
  return -1;
}

// Search Insert Position
// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.You must write an algorithm with O(log n) runtime complexity.
var searchInsert = function (nums, target) {
  // start always either points to next position of desired element
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

  return start;
};

// Floor and Ceil of a number
function floorAndCeil(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  let floor = -1;
  let ceil = -1;

  while (start <= end) {
    let mid = start + (end - start) / 2;
    if (arr[mid] == target) {
      floor = mid;
      ceil = mid;
      return [floor, ceil];
    } else if (arr[mid] > target) {
      ceil = end;
      end = mid - 1;
    } else {
      floor = start;
      start = mid + 1;
    }
  }

  return [floor, ceil];
}

// Lower Bound
// Given a sorted array arr[] of size N without duplicates, and given a value x. Floor of x is defined as the largest element K in arr[] such that K is smaller than or equal to x. Find the index of K(0-based indexing).
function findFloor(nums, n, target) {
  // floor is value k such that k is greatest number smaller than or equal to target
  // if equal value is found return it
  // if smaller value is found, store it in the answer that can be our possible answer but search for as greatest value as possible which can be smaller than target
  // if value is coming greater than target, reduce the search space so high = mid-1
  let low = 0;
  let high = n - 1;
  let ans = -1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return ans;
}

// Number of occurrence
/*
Given a sorted array Arr of size N and a number X, you need to find the number of occurrences of X in Arr.

Example 1:
Input:
N = 7, X = 2
Arr[] = {1, 1, 2, 2, 2, 2, 3}
Output: 4
Explanation: 2 occurs 4 times in the
given array.
*/
class Solution {
  count(arr, n, x) {
    // if any way we can find, first occurence and last occurence of x in array, we can do last - first + 1 (0-based indexing)  = number of x in array
    let first = this.findFirstOccurence(arr, n, x);
    let last = this.findLastOccurence(arr, n, x);
    // if there is no occurence of element in array then its count = 0 so simply return 0
    if (first == -1 || last == -1) {
      return 0;
    }
    return last - first + 1;
  }

  findFirstOccurence(arr, n, x) {
    let low = 0;
    let high = n - 1;
    let first = -1;
    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);
      if (arr[mid] == x) {
        first = mid;
        high = mid - 1;
      } else if (arr[mid] < x) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return first;
  }

  findLastOccurence(arr, n, x) {
    let low = 0;
    let high = n - 1;
    let last = -1;
    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);
      if (arr[mid] == x) {
        last = mid;
        low = mid + 1;
      } else if (arr[mid] < x) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return last;
  }
}
