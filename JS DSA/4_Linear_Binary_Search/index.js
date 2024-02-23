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
