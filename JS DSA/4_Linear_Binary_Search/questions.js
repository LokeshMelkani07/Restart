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

// Row with max 1s
/*
Given a boolean 2D array of n x m dimensions, consisting of only 1's and 0's, where each row is sorted. Find the 0-based index of the first row that has the maximum number of 1's.

Example 1:
Input:
N = 4 , M = 4
Arr[][] = {{0, 1, 1, 1},
           {0, 0, 1, 1},
           {1, 1, 1, 1},
           {0, 0, 0, 0}}
Output: 2
Explanation: Row 2 contains 4 1's (0-based
indexing).
*/
function rowWithMax1s(arr, n, m) {
  // We have each row sorted
  // In case 2 rows have same number of 1's, we return the one which comes earlier
  // Brute force
  // We go to each row and calculate number of 1's
  let maxCount = -1;
  let index = -1;
  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < m; j++) {
      count += arr[i][j];
    }
    if (count > maxCount) {
      maxCount = count;
      index = i;
    }
  }

  return index;
}

// Optimised
class Solution {
  rowWithMax1s(arr, n, m) {
    // We have each row sorted
    // In case 2 rows have same number of 1's, we return the one which comes earlier
    // Optimised Approach
    // We go to each row and calculate number of 1's but this time we use Binary search in each row to calculate number of 1's because each row is sorted so if by any way we can find (lower bound of 1 or upper bound of 0 or first occurence of 1), to calculate number of 1's in that row, we do number of elements in the row - index of first occurence of 1 in that row
    let maxCount = 0;
    let index = -1;
    // We need to traverse each row but we can consider each row as a sepearated array and do out operation
    for (let i = 0; i < n; i++) {
      let count = m - this.lowerBound(arr[i], m, 1);
      if (count > maxCount) {
        maxCount = count;
        index = i;
      }
    }

    return index;
  }

  lowerBound(arr, n, ele) {
    let low = 0,
      high = n - 1,
      ans = n;
    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);
      if (arr[mid] >= ele) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return ans;
  }
}

// Search a 2D Matrix II
/*
Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.

Example 1:
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
*/
var searchMatrix = function (matrix, target) {
  // Every Individual Row and Column is sorted
  // Brute force Approach: We check each element and search for target using 2 loops, O(n^2)
  // Better Approach: We traverse each row and apply binary search on each row to get the target considering each row is sorted in itself, O(nlogn)
  // Optimised Approach
  // We will use the information that each row and each col is sorted individually
  // If we stand at mat[0][0] = 1 and we want to find target = 8, we can see standing at 0th row 0th col, our elements in  first are increasing, elements in first column are increasing
  // If we stand at mat[n-1][m-1] = 30, we see elements in that row and decreasing both ways
  // But if we stand at last col, first row, we see elements in that col are increasing in and in that row are decreasing if we stand at mat[0][n-1]
  // so if mat[0][n-1] = 15, we can surely say 8 will not lie in n-1th column, it might lie in 0th row as 8 < 15
  // We do col-- and come to mat[0][n-2] = 11, we check 8 < 11 so it cannot lie on that col, but might lie on that row so again
  // col--, mat[0][n-3] = 7, it might lie on that col as 8 > 7 but it will never lie on that row so this time we do row++
  // mat[1][n-3] = 8 so yes we have got our answer otherwise we would have done col-- or row++ until we get our target otherwise return [-1,-1]
  // last row, first col can also be our starting point, mat[n-1][0] is also a possible starting point
  // TC: O(n+m), to reach target we have to travel n rows and m cols steps at max
  let n = matrix.length,
    m = matrix[0].length;
  let row = 0,
    col = m - 1;
  while (row < n && col >= 0) {
    if (matrix[row][col] == target) {
      return true;
    } else if (matrix[row][col] > target) {
      col--;
    } else {
      row++;
    }
  }

  return false;
};

// Find a Peak Element II
/*
A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbors to the left, right, top, and bottom.

Given a 0-indexed m x n matrix mat where no two adjacent cells are equal, find any peak element mat[i][j] and return the length 2 array [i,j].

You may assume that the entire matrix is surrounded by an outer perimeter with the value -1 in each cell.

You must write an algorithm that runs in O(m log(n)) or O(n log(m)) time.

Example 1:
Input: mat = [[1,4],[3,2]]
Output: [0,1]
Explanation: Both 3 and 4 are peak elements so [1,0] and [0,1] are both acceptable answers.
*/
var findPeakGrid = function (mat) {
  // Peak element is the one which is greater than its left, right, up, down element
  // if there is no left or no right or no up or no bottom for any element like if its at the boundary then -1 is filled there
  // There can be multiple peak elements, we can return any one of them
  // Brute force: We go to every element and check if all 4 directions, O(n*m*4)
  // We start from low = 0, high = last column i.e n-1
  // We find mid (gives us a column), we find max element of that col and go to it, as we have taken max element of that column means its already greater than it up and down, check for left and right
  // if left > maxEle means if we assume mountaineous array graph, there is someone greater than maxEle which can be a potential peak or someone who is more closer to peak so what to do? reduce search space, high = mid-1
  // if right > maxEle means there is someone greater than maxEle which can be closer to peak so, low = mid+1;
  // we make a function which return the row of maxElement in a column
  // leftElement = arr[row][mid-1]
  // rightElement = arr[row][mid+1]
  let n = mat.length,
    m = mat[0].length;
  let low = 0,
    high = m - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    let row = findMaxInCol(mat, mid, n);
    let left = mid - 1 >= 0 ? mat[row][mid - 1] : -1;
    let right = mid + 1 < m ? mat[row][mid + 1] : -1;
    if (mat[row][mid] > left && mat[row][mid] > right) {
      return [row, mid];
    } else if (mat[row][mid] < left) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return [-1, -1];
};

function findMaxInCol(arr, col, n) {
  let maxiIndex = 0;
  let maxEle = -1;
  for (let i = 0; i < n; i++) {
    if (arr[i][col] > maxEle) {
      maxEle = arr[i][col];
      maxiIndex = i;
    }
  }

  return maxiIndex;
}

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

// Find Nth root of M
/*
You are given 2 numbers (n , m); the task is to find n√m (nth root of m).

Example 1:
Input: n = 2, m = 9
Output: 3
Explanation: 32 = 9
*/
class Solution {
  NthRoot(n, m) {
    // Brute force solution can be
    // n = 3, m = 27 means find cube root of 27 which will be = 3 as 3*3*3 = 37
    // n = 4, m = 64 means find 4th root of 64 which will be = 4 as 4*4*4*4 = 64
    // We can run a for loop from 1 to m as max we can go is number itself
    // we run a function which multiples i (n times) and check if its == m, return i
    // if anytime value > m, break out and return -1
    for (let i = 1; i <= m; i++) {
      if (this.func(i, n) == m) {
        return i;
      } else if (this.func(i, n) > m) {
        break;
      }
    }

    return -1;
  }

  func(ind, n) {
    let product = 1;
    for (let i = 1; i <= n; i++) {
      product = product * ind;
    }

    return product;
  }
}

// Optimised
class Solution {
  NthRoot(n, m) {
    // In the previous approach we were starting a loop from index = 1 till m
    // We were checking pow(i,n) everytime and if its == m we return i as answer
    // if its > m, we say its not our answer so move to next index
    // 1,2,3,4,5,6.............m are sorted sequence
    // we can think of something like binary search here where low = 1, high = m at max
    // we run loop till low<=high and check pow(mid,n) == m return mid;
    // if pow(mid,n) > m, high = mid-1;
    // at the end, if we come out of loop means no root possible so return -1
    let low = 1,
      high = m;
    while (low <= high) {
      let mid = (low + high) / 2;
      let ans = this.func(mid, n, m);
      if (ans == 1) {
        return mid;
      } else if (ans == 0) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return -1;
  }

  func(ind, n, m) {
    let ans = 1;
    for (let i = 1; i <= n; i++) {
      ans = ans * ind;
      if (ans > m) {
        return 2;
      }
    }

    if (ans == m) {
      return 1;
    }

    return 0;
  }
}

// Pow(x, n)
/*
Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

Example 1:
Input: x = 2.00000, n = 10
Output: 1024.00000
*/
var myPow = function (x, n) {
  // Optimised way
  // Binary Exponentiation
  // 2^10 = (2*2)^9 = 4^9 (even power -> num = num*num krke power/2 krdia)
  // 4^9 = 4 * 4^8 (odd power -> ek power bahaar nikalke answer mai leli and power-1 krdia)
  // 4^8 = (4*4)^4
  // odd power = take x out  * x^pow-1
  // even power = do (x*x)^pow/2
  // till power != 0
  let m = n;
  n = Math.abs(n);
  let ans = 1;
  while (n > 0) {
    if (n % 2 === 1) {
      ans = ans * x;
      n = n - 1;
    } else {
      x = x * x;
      n = n / 2;
    }
  }

  // if number is negative 2^-3 = 1/2^3
  return m < 0 ? 1 / ans : ans;
};

// Median in a row-wise sorted Matrix
/*
Given a row wise sorted matrix of size R*C where R and C are always odd, find the median of the matrix.

Example 1:
Input:
R = 3, C = 3
M = [[1, 3, 5],
     [2, 6, 9],
     [3, 6, 9]]
Output: 5
Explanation: Sorting matrix elements gives
us {1,2,3,3,5,6,6,9,9}. Hence, 5 is median.
*/

function median(matrix, R, C) {
  // R and C are odd, odd*odd = always odd
  // median is middle value of sorted sequence
  // As out total number of elements are odd (given) so our median will always be arr[n*m/2]th element
  // Brute force, make an empty array, store all elements on matrix in it, sort that matrix and return arr[n*m/2] element
  // TC: O(n*m) + O(n*m log(n*m)) for sorting
  // SC: O(n*m) for storing whole matrix
  let arr = [];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      arr.push(matrix[i][j]);
    }
  }

  arr.sort((a, b) => a - b);
  return arr[parseInt((R * C) / 2)];
}

// Optimised
class Solution {
  median(matrix, R, C) {
    // Optimised Approach
    // We can see that we have sorted elements given row-wise
    // We observe there are equal number of element on left and right of median element
    // Max answer can go between lowest element of matrix and highest element of matrix
    // So our search space can be between first element and last element of matrix
    // Median is arr[r*c/2]th element and as array indexing starts from 0
    // So let say R = 3, C = 5 then total R*C becomes 15
    // arr[15/2] = arr[7] is our median means 8th element (0-based indexing)
    // 8th element in the sorted sequence is my median
    // low = minimum element of 0th column, high = maximum element of C-1th column
    // We need to have data of each element which tells how many element <= current element in the matrix
    // if anytime we find it to be <= 7 we need more so low = mid+1
    // else high = mid-1
    // at the end of loop, return low as it stands upon the median
    // How to find how many elements are smaller than equal to element mid?
    // upper bound means elements greater than x, lower bound means elements lower than equal to x
    // We have row-wise sorted in matrix so we can use binary search in every row and try to find upper bound of mid in each row
    // say mid = 8, in first row upper_bound(8) = 3 index means 0,1,2 element are smaller than equal to 8, count += 3
    // in 1st row, upper_bound(8) = 5 means 0,1,2,3,4 are smaller than equal to 8 so count += 4
    // and so on for each row
    let low = +Infinity,
      high = -Infinity;

    for (let i = 0; i < R; i++) {
      low = Math.min(low, matrix[i][0]);
      high = Math.max(high, matrix[i][C - 1]);
    }

    let required = (R * C) / 2;
    while (low <= high) {
      let mid = parseInt((low + high) / 2);
      let smallerThanEquals = this.func(mid, matrix, R, C);
      if (smallerThanEquals <= required) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return low;
  }

  func(x, matrix, n, m) {
    let count = 0;
    for (let i = 0; i < n; i++) {
      // go for every row
      count += this.upperBound(matrix[i], x, n);
    }

    return count;
  }

  upperBound(arr, x, n) {
    let low = 0;
    let high = n - 1;
    let ans = n;
    while (low <= high) {
      let mid = parseInt((low + high) / 2);
      if (arr[mid] > x) {
        // can be a possible answer
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return ans;
  }
}

// Median of Two Sorted Arrays
/*
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
*/
var findMedianSortedArrays = function (nums1, nums2) {
  // median is the middle element of an sorted sequence
  // if size of the sequence is odd, median is middle element
  // if size of the sequence is even, media is (middle + (middle+1))/2th element
  // Brute force
  // We will merge both arrays into one and then find size of merged array and return median based on whether size is odd or even
  // As both arrays are sorted so we can use approach of "Merge 2 sorted arrays" to merge them
  let ans = mergeTwoSortedArrays(nums1, nums2);
  let n = ans.length;

  // Calculate median
  if (n % 2 === 1) {
    // Odd length, median is the middle element
    return ans[Math.floor(n / 2)];
  } else {
    // Even length, median is the average of the two middle elements
    return (ans[Math.floor(n / 2) - 1] + ans[Math.floor(n / 2)]) / 2;
  }
};

function mergeTwoSortedArrays(nums1, nums2) {
  let i = 0,
    j = 0,
    k = 0;
  let m = nums1.length,
    n = nums2.length;
  let nums3 = [];
  while (i < m && j < n) {
    if (nums1[i] <= nums2[j]) {
      nums3[k++] = nums1[i++];
    } else {
      nums3[k++] = nums2[j++];
    }
  }

  while (i < m) {
    nums3[k++] = nums1[i++];
  }

  while (j < n) {
    nums3[k++] = nums2[j++];
  }

  return nums3;
}

// Optimised Approach
var findMedianSortedArrays = function (nums1, nums2) {
  // median is the middle element of an sorted sequence
  // if size of the sequence is odd, median is middle element
  // if size of the sequence is even, media is (middle + (middle+1))/2th element
  // Optimised Approach
  // Our method of finding the median differs on basis of whether the length of the array is odd or even
  // for odd, median has equal number of elements on both sides
  // We see array is sorted so we can think of binary search to optimise
  // but how to apply binary search?
  // Instead of merging both arrays, we can think of an approach where withour merging we can find the median
  // Let say we merged nums1 = [1,3], nums2 = [2,4] into nums3 = [1,2,3,4], let us now derive an algo for even length
  // Now let say we draw a line in the middle and we see total = 4, left half has 2 elements and right half has 2 elements
  // median = max(of left half) + min(of right half)/2
  // if somehow we could formulate a correct left half and right half, we can find the median for even case
  // We see in left half total element = 2 and 1 from nums1, 1 from nums2
  // Sameway in right half, total element = 2 and 1 from nums1, 1 from nums2
  // On process of making left half and right half, we start from left half, we pick 1 element from nums1, total = 2 - 1 = 1 element from nums2
  // let say in left half we had total = 5, we started form trying 1 element from nums1, 4 element from nums2. sameways for right half, we put left over elements
  // We sort them and we see, sorted order is not corect means this way is failed
  // Now we take 2 element from nums1 and 3 element from nums2 in left half, which makes total = 5 and leftover elements in right half
  // We sort them and check, whether it makes a well sorted sequence or not
  // How to check if its a well sorted sequence or not??
  // We will sort both left and right half and then pick last element of left half and first element of right half and if last element of left half > first element of right half. Its not a valid sorted sequence
  // if its not a well sorted sequence, we pick 3 elements from nums1 and 2 element from nums2 in left half and leftOver in right half
  // We check and yes, it forms valid sorted sequence so we have valid left half and valid right half
  // Let us go ahead and check for 4 element form nums1, 1 from nums2 and check. No, it does not make valid well sorted sequence so once we have got our valid sequence its of no use to go forward
  // To check well sorted sequence, we are sorting + then checking which takes some time so instead we can try another approach
  // (As both nums1 and nums2 are sorted individually and when we are taking them, that order will be maintained so the elements we are taking from nums1 in left ka last element should be smaller than first element we are taking in right half from nums2 && last element of nums2 we are taking in left half should be smaller than first element of nums1 we are taking in right half) then its a valid sequence
  // Now we have formulated correct sequence, how to find median using it??
  // We take last element of nums1 added in left half = l1
  // last element of nums2 added in left half = l2
  // first element of nums1 added in right half = r1
  // first element of nums2 added in right half = r2
  // We know median is last elemnt of left half + first element of right half / 2
  // So in left half, last element will be max(l1,l2) whichever is maximum of both of them
  // So in right half, first element will be min(r1,r2) whichever is minimum of both of them
  // median = max(l1,l2) + min(r1,r2)/2
  // We need to know how many elements from nums1 in left half say n1, total - n1 = number of elements from nums2 in left half
  // number of elements from nums1 can be anything between 0 to max(number of elements from nums1)
  // if any mid comes, we check if we can make a correct sequence out of it. if no, we will not be able to do it for mid+1,mid+2.... so eliminate right half and stay in left half
  // How to check whether to go in left half (high = mid-1) or right half (low = mid+1) ?
  // We have had l1, l2, r1, r2
  // if l1 > r2, high = mid-1
  // if l2 > r1, low = mid+1
  // So we are doing binary Search to determine, how many elements to take from nums1 where range can go from 0 to max(number of element in nums1)
  // What if we apply binary search on min(nums1,nums2) so that TC of binary search is reduced as our search space gets reduced, because we are applying BS on array whose length is smaller
  // If a case comes when we take 0 elements of nums1 in left half, so in that case we will take l1 = -Infinity
  // Our mid1 will be mid found using BS in nums1 which always point to the  the first element of right half
  // mid2 = total - mid1 which will be mid of elements from nums2, which will always point to the first element of right half
  // so we can say arr1[mid1] = r1, arr2[mid2] = r2, l1 = arr1[mid1-1], l2 = arr2[mid2-1]
  // What if array length is odd? then to draw symmetry we need to either take more number of elements on left and one lesser on right in this case formula of median becomes max(l1,l2)
  // or more number of elements on right and one lesser on left in this case median formula becomes min(r1,r2)
  // Number of elements needed on left will be (n1+n2+1)/2 (always) this formula works on both even and odd
  // It might happen that mid1 or mid2 gets a value which is not present in the array so always check conditions before assigning l1,l2,r1,r2
  let n1 = nums1.length;
  let n2 = nums2.length;
  if (n1 > n2) {
    return findMedianSortedArrays(nums2, nums1);
  }

  let low = 0;
  let high = n1;
  let n = n1 + n2;
  let totalElementsOnLeftHalf = Math.floor((n1 + n2 + 1) / 2);
  while (low <= high) {
    let mid1 = (low + high) >> 1;
    let mid2 = totalElementsOnLeftHalf - mid1;
    let l1 = -Infinity;
    let l2 = -Infinity;
    let r1 = +Infinity;
    let r2 = +Infinity;
    if (mid1 < n1) r1 = nums1[mid1];
    if (mid2 < n2) r2 = nums2[mid2];
    if (mid1 - 1 >= 0) l1 = nums1[mid1 - 1];
    if (mid2 - 1 >= 0) l2 = nums2[mid2 - 1];
    if (l1 <= r2 && l2 <= r1) {
      if (n % 2 == 1) {
        // odd
        return Math.max(l1, l2);
      } else {
        return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
      }
    } else if (l1 > r2) high = mid1 - 1;
    else low = mid1 + 1;
  }

  return 0;
};

// K-th element of two Arrays
/*
Given two sorted arrays arr1 and arr2 of size N and M respectively and an element K. The task is to find the element that would be at the kth position of the final sorted array.

Example 1:
Input:
arr1[] = {2, 3, 6, 7, 9}
arr2[] = {1, 4, 8, 10}
k = 5
Output:
6
Explanation:
The final sorted array would be -
1, 2, 3, 4, 6, 7, 8, 9, 10
The 5th element of this array is 6.
*/
class Solution {
  kthElement(A, B, n, m, k) {
    // Both A and B array are in sorted order
    // Merge them hypothetically and return the kth element of both merged arrays
    // Brute force approach, we will merge both arrays, return kth element from merged array
    let nums3 = this.mergeTwoSortedArrays(A, B);
    return nums3[k - 1];
  }

  mergeTwoSortedArrays(nums1, nums2) {
    let i = 0,
      j = 0,
      k = 0;
    let m = nums1.length,
      n = nums2.length;
    let nums3 = [];
    while (i < m && j < n) {
      if (nums1[i] <= nums2[j]) {
        nums3[k++] = nums1[i++];
      } else {
        nums3[k++] = nums2[j++];
      }
    }

    while (i < m) {
      nums3[k++] = nums1[i++];
    }

    while (j < n) {
      nums3[k++] = nums2[j++];
    }

    return nums3;
  }
}

// Optimised
class Solution {
  kthElement(nums1, nums2, n1, n2, k) {
    // Optimised Approach
    // We will follow 'Median of 2 sorted Arrays' Symmetry approach
    // Over there we were trying to making left half containing half of elements and rest elements on right half
    // We were applying binary search to find our number of elements from arr1 in left half and do accordingly
    // Here we will try to form left half of k elements and right half of (n+m) - k elements and last element of left half willbe our kth element, return it
    if (n1 > n2) {
      return this.kthElement(nums2, nums1, n2, n1, k);
    }

    let low = 0;
    let high = Math.min(k, n1); // if given k =2 and n1=6, to formulate a correct left half, we only need k elements in left half so no need to take n1 elements completely, just take min(k,n1)
    let n = n1 + n2;
    // we only need k elements on left half
    let totalElementsOnLeftHalf = k;
    while (low <= high) {
      let mid1 = (low + high) >> 1;
      let mid2 = totalElementsOnLeftHalf - mid1;
      let l1 = -Infinity;
      let l2 = -Infinity;
      let r1 = +Infinity;
      let r2 = +Infinity;
      if (mid1 < n1) r1 = nums1[mid1];
      if (mid2 < n2) r2 = nums2[mid2];
      if (mid1 - 1 >= 0) l1 = nums1[mid1 - 1];
      if (mid2 - 1 >= 0) l2 = nums2[mid2 - 1];
      if (l1 <= r2 && l2 <= r1) {
        // we just need to return kth element
        return Math.max(l1, l2);
      } else if (l1 > r2) high = mid1 - 1;
      else low = mid1 + 1;
    }

    return 0;
  }
}

// Koko Eating Bananas
/*
Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

Example 1:
Input: piles = [3,6,7,11], h = 8
Output: 4
*/
var minEatingSpeed = function (piles, h) {
  // piles[i] means number of bananas in that pile
  // h is number of hours koko has to eat all bananas
  // we have to find minimum integer k which signifies number of bananas/hour koko can eat, such that it can eat all bananas within h hours
  // we can start taking value of k = 1 for piles = [3,6,7,11], h = 8
  // for piles[0] = 3, it takes 3 hours
  // 6 -> 6 hours, 7 -> 7 hours, 11 -> 11 hours in total 3+6+7+11 = 26 but h = 8 so we need to increase value of k
  // if piles[i] = 11 and k = 3, it will take 3*4 = 12 hours, although it takes 11.5 but always take ceil value
  // let us take k = 2, 3.....so on, we keep on increasing or decreasing value of k such that our condition of h = 8 is fulfilled
  // Brute force, start from k = 1, calculate the time and keep on increasing until time = h condition meets
  // 1,2,3,4....... is sorted value so we can think of binary search where our search space can go from k = 1 to (max number in array)
  // TC: O(n) for requiredTime() + O(log(max element)) for BS
  let low = 1,
    high = -Infinity;
  let n = piles.length;
  for (let i = 0; i < n; i++) {
    high = Math.max(high, piles[i]);
  }

  let k = 0;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    let time = requiredTime(mid, piles);
    if (time <= h) {
      // if we have less time than h, make it more lesser as we need minimum value for k so store it and move towards more lesser
      k = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  // we can return either low or k (both are possible answers)
  return k;
};

function requiredTime(k, piles) {
  let time = 0;
  let n = piles.length;
  for (let i = 0; i < n; i++) {
    time += Math.ceil(piles[i] / k);
  }

  return time;
}

// Minimum Number of Days to Make m Bouquets
/*
You are given an integer array bloomDay, an integer m and an integer k.

You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.

The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet.

Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.

Example 1:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.
*/
var minDays = function (bloomDay, m, k) {
  // blooming means opening of a flower
  // bloomDay[i] means number of days it takes for a flower to bloom, bloomDay[0] = 7 means it takes 7 days to 0th index flower to bloom
  // m = number of bouquets we need to make
  // k = number of adjacent (saath-saath) flowers needed to make 1 bouquet
  // We need to return minimum number of days, jisme we can easily make m bouquets using k adjacent flowers from the array and if its not possible, we return -1
  // minimum number of days can be min(array), maximum can be max(ele) of array when all flowers gets bloomed
  // if m = 3, k = 2 and array size = 5, we cannot make m bouquets does not matter if we take max number of days or not so return -1
  // if(m*k > bloomDay.size) return -1
  // In all other cases, its always possible
  let low = +Infinity,
    high = -Infinity;
  let n = bloomDay.length;

  if (n < m * k) {
    return -1;
  }

  for (let i = 0; i < n; i++) {
    low = Math.min(low, bloomDay[i]);
    high = Math.max(high, bloomDay[i]);
  }

  let ans = high;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    let days = required(mid, bloomDay, n, k, m);

    if (days) {
      // if m or more bouquets can be made successfully using mid days, store it and try to search for lesser values
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  // we can also return low
  return ans;
};

function required(day, arr, n, numberofAdjacenFlower, numberOfBouquets) {
  let count = 0;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] <= day) {
      count++;
    } else {
      // adding number of bouquet which can be made using k flowers fromm count number of flowers
      ans += Math.floor(count / numberofAdjacenFlower);
      count = 0;
    }
  }

  // if last pair of flowers come under 'if(arr[i]>=day)' condition so they never go inside else part hence will never be part of ans so make them part of our answer by writing below statement
  ans += Math.floor(count / numberofAdjacenFlower);

  return ans >= numberOfBouquets;
}

// Find the Smallest Divisor Given a Threshold
/*
Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, divide all the array by it, and sum the division's result. Find the smallest divisor such that the result mentioned above is less than or equal to threshold.

Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: 7/3 = 3 and 10/2 = 5).

The test cases are generated so that there will be an answer.

Example 1:
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1.
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2).
*/
var smallestDivisor = function (nums, threshold) {
  // We have a nums array containing some elements
  // We have a value threshold which tells minimum sum we should have
  // We need to find smallest divisor which upon dividing with all elements of nums and then taking sum of its ceil value <= threshold, take minimum such value
  // We can start taking smallestDivisor value from 1 and go on till we do not find our answer so we can think of something as BS as 1,2,3,4......sorted values
  // Minimum value can be 1 which can divide all elements
  // Max value can be max(array)
  let low = 1,
    high = -Infinity;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    high = Math.max(high, nums[i]);
  }

  let ans = -1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    let sum = required(nums, mid);
    if (sum <= threshold) {
      // if we have an answer, store it and go towards minimum
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  // return ans also possible
  return low;
};

function required(nums, limit) {
  let sum = 0;
  // as it is given in the question, return the ceil value of divisor
  for (let i = 0; i < nums.length; i++) {
    sum += Math.ceil(nums[i] / limit);
  }

  return sum;
}

// Capacity To Ship Packages Within D Days
/*
A conveyor belt has packages that must be shipped from one port to another within days days.

The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.

Example 1:
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.
*/
var shipWithinDays = function (weights, days) {
  // we are given the weights array where weights[i] tells us weight of ith element
  // days = maximum total number of days we have to ship all weights in belt
  // we need to find minimum capacity of ship such that we can ship all weights within 'days' days
  // minimum capacity of ship will be max(array) weight so that we can pick atleast something within 'days' days
  // maximum capacity of ship will be sum of all elements which means we can take everything on one day
  // Now we need to think of decreasing our search space everytime
  let low = -Infinity,
    high = 0;
  let n = weights.length;
  for (let i = 0; i < n; i++) {
    low = Math.max(low, weights[i]);
    high += weights[i];
  }

  let ans = -1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    let day = required(weights, mid, n);
    if (day <= days) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return low;
};

function required(arr, capacity, n) {
  let load = 0;
  let day = 0;
  for (let i = 0; i < n; i++) {
    if (load + arr[i] <= capacity) {
      load += arr[i];
    } else {
      day++;
      load = arr[i];
    }
  }

  // in case we do not reach the else part, we will not be able to add weights we put in the belt on last day so we need to do day++
  // or we can directly start day = 1 during initialisation as days always start from 1,2,3,4.........
  day++;

  return day;
}

// Kth Missing Positive Number
/*
Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.

Return the kth positive integer that is missing from this array.

Example 1:
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.
*/
var findKthPositive = function (arr, k) {
  // We are given with an array arr which contains some number
  // We are given an variable 'k'
  // we need to return kth missing positive number
  // arr = [2,3,4,7,11], k = 5, missing numbers = 1,5,6,8,9,10 so 5th missing number = 9 so return 9
  // Brute force, we consider k = 5 means 5 is missing number (let us assume)
  // we check arr[i] if its <= k means from 1,2,3,4,5,6,7,8,9,10,11.
  // 2 is not missing so our sequence becomes 1,3,4,5,6,7,8,9,10,11 so we do k++
  // we see 3, so 1,4,5,6,7,8,9,10,11 is our sequence now, k++
  // we do this till arr[i] <= k, once arr[i] > k the value we have stored is our answer
  // Initiution: we consider all numbers are missing intially from 1 to n
  // so k = 5 means 5 is our missing number
  // but as soon as we see number between 1 to k is there in array means its not missing so earlier k = 5 was 5 but now sequence mai se 2 has gone so k = 6 has become our 5th missing number
  // again we check array and increase k
  // once hum array mai aisa number dekhte h which is not between 1 to k, means we have found our kth missing positive number
  let n = arr.length;
  let m = k;
  for (let i = 0; i < n; i++) {
    if (arr[i] <= m) {
      m++;
    } else {
      break;
    }
  }

  // m is our kth missing number
  return m;
};

// Optimised (Binary Search)
var findKthPositive = function (arr, k) {
  // Array is sorted (given)
  // We can apply binary search but On what basis should we apply binary search?
  // If somehow we can get a range in which our answer will lie, we can get the answer
  // How to get that range?
  // We will apply BS again, low = arr[0], high = arr[n-1] as array is sorted
  // We will take help of k
  // arr = [2,3,4,7,11], k = 5, if our arr was simply arr = [1,2,3,4,5]
  // we can see at arr[0] ( 1 should have been there, but 2 is present so 2-1 = 1 element is missing till 0th index)
  // we can see at arr[1] ( 2 should have been there, but 3 is present so 3-2 = 1 element is missing till 1st index)
  // we can see at arr[2] ( 3 should have been there, but 4 is present so 4-3 = 1 element is missing till 2nd index)
  // we can see at arr[3] ( 4 should have been there, but 7 is present so 7-4 = 3 element is missing till 3rd index)
  // we can see at arr[4] ( 5 should have been there, but 7 is present so 7-4 = 3 element is missing till 4th index) and so on..
  // we can see at arr[5] ( 5 should have been there, but 11 is present so 11-5 = 6 element are missing till 5th index)
  // we have k = 5 so we need 5th missing number so now we know our answer lies between 4th and 5th index of arr
  // So we will apply binary search on search space of missing numbers and our parameter to move low and high will be value of k
  // At the end of BS, high points to someIndex, low points to someIndex+1
  // arr[high] will be at 7 for above example, arr[low] = 11 as these are the range within which our k = 5 exists
  // arr[high] = 7 has missing = 3 means before it 3 elements are missing
  // we need 5ht missing number so 5-3 = 2
  // arr[high] = 7 + 2 = 9 is our 5th missing number
  let n = arr.length;
  let low = 0,
    high = n - 1,
    missing = 0;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    // mid has 0 based indexing so mid+1
    missing = arr[mid] - (mid + 1);
    if (missing < k) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  // we are at our range ke starting
  // we need to find how many numbers are missing till that index for which we use
  // expected value = high+1 for highth index (considering 0-based indexing)
  // actual value = arr[high]
  // missing = actual - expected = arr[high] - (high+1)
  // leftOver = k - missing = k - arr[high] + high - 1
  // final result = arr[high] + leftOver = arr[high] + k - arr[high] + high - 1 = (k + high + 1)
  // low = high+1 only so we can also return k - low
  // We return either (k + high + 1) or (k + low) because if high becomes -ve then writing directly can give wrong result
  return k + low;
};

// Aggressive Cows
/*
You are given an array consisting of n integers which denote the position of a stall. You are also given an integer k which denotes the number of aggressive cows. You are given the task of assigning stalls to k cows such that the minimum distance between any two of them is the maximum possible.
The first line of input contains two space-separated integers n and k.
The second line contains n space-separated integers denoting the position of the stalls.

Example 1:
Input:
n=5
k=3
stalls = [1 2 4 8 9]
Output:
3
Explanation:
The first cow can be placed at stalls[0],
the second cow can be placed at stalls[2] and
the third cow can be placed at stalls[3].
The minimum distance between cows, in this case, is 3,
which also is the largest among all possible ways.
*/
class Solution {
  solve(n, k, stalls) {
    // This is a new type of pattern of Binary search in which we have to find max of some min or min of some max
    // We are given stalls array which says stalls[i] = position of ith stall
    // We have k cows, we need to assign stall to k cows such that minimum distance between any 2 cows is maximum
    // means we place cows in a one way, we find minimum distance between any 2 cows in that way and store it in mini array
    // we place cows in another way and again store minimum distance between any 2 cows in mini array
    // we place in another way and similarly do the same thing
    // Now we return the maximum element of mini array which we are asked to do, 'minimum distance between any two of them is the maximum possible'
    // First of all we sort the array so that we do not need to find distance between all cows like C1,C3 or C1,C4 instead we can only find distance between adjacent cows and get the minimum of them
    // We start placing cow from 0th index only so that we can successfully accomodate k cows
    // We will start taking maxDistance = 1 and put cows and check if we can put all k cows in minimum distance of 1 between them
    // if yes, we need to maximize the distance so let us now check for maxDistance = 2, we try to check if we can pur k cows for minimum distance of k cows?
    // if yes, maximize it more, go for maxDistance = 3 and check
    // if no, we try to go lesser on our search space so decrease our search space instead of checking for 5,6,7,... if its not possible for 4 so leave 5,6,7,8...
    // Start from 1, max we can go till is (maxElementofArray - minElementofArray) considering we have only 2 cows, one will be put at 0th index and other at last index and as its a sorted array so we take (max-min) as last element
    // We can also apply Linear search where we apply loop from i = 1 to (maxElement - minElement) and check if for that i, we can place k cows and if(true) {continue;} else {return i-1;} means case previous to what we have failed to place
    // or we can do Binary search also

    // Sort the array first
    stalls.sort((a, b) => a - b);
    let low = 0;
    let high = 0;
    let maxi = -Infinity,
      mini = +Infinity;
    for (let i = 0; i < n; i++) {
      maxi = Math.max(maxi, stalls[i]);
      mini = Math.min(mini, stalls[i]);
    }

    high = maxi - mini;
    let ans = -1;
    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);
      let dist = this.required(mid, k, stalls);
      if (dist) {
        ans = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return ans;
  }

  required(dist, k, stalls) {
    // We place the first cow at 0th index so count start from 1
    let count = 1;
    let lastCowPlacedAt = stalls[0];
    // start loop from index = 1 as 1st cow already placed at 0th index
    for (let i = 1; i < stalls.length; i++) {
      if (stalls[i] - lastCowPlacedAt >= dist) {
        count++;
        lastCowPlacedAt = stalls[i];
      }
    }

    if (count >= k) {
      return true;
    }

    return false;
  }
}

// Allocate minimum number of pages
/*
You have N books, each with A[i] number of pages. M students need to be allocated contiguous books, with each student getting at least one book.
Out of all the permutations, the goal is to find the permutation where the sum of maximum number of pages in a book allotted to a student should be minimum, out of all possible permutations.

Note: Return -1 if a valid assignment is not possible, and allotment should be in contiguous order (see the explanation for better understanding).
*/
class Solution {
  findPages(a, n, m) {
    // a[] is an array which contains number of pages of ith book
    // m = number of students to which we need to allocate books
    // conditions are, allocation should be contiguous, we cannot allocate to 1 then 2 then again 1
    // all students should get atleast one book
    // if its not possible to allocate books to m students, return -1
    // In what case will it be immpossible??
    // When number of students > number of books i.e m > n, return -1 where n = size of array
    // We need to allocate such that the maximum number of pages in a book allocated to a student is minimum
    // We allocate books in one way to say m = 4, we allocate books to 4 students. maximum number of pages comes x1
    // We allocate books in another way to m = 4, and max pages = x2
    // Similarly again we try another way and max pages = x3
    // return min(x1, x2, x3)
    // We need to start taking a value for maxPagesAnyStudentCanHold and keep on checking if we can allocate books keeping all coniditons in mind using this value
    // if yes, we store it and go for higher value of maxPagesAnyStudentCanHold so that we can maximize it
    // if no, we go for lesser values of maxPagesAnyStudentCanHold
    // What is minimum value of maxPagesAnyStudentCanHold we should take?
    // It should be such that we can allocate one book to each student successfully = max(element of array)
    // What should be the maximum value of maxPagesAnyStudentCanHold?
    // Let say we are given numberOfStudent = 1, then we need to allocate all books to that 1 student so maximum value of maxPagesAnyStudentCanHold = summation of array
    // We can run a loop from i = low to high where low and high are as discussed above and check possiblity for each value of i
    if (m > n) {
      return -1;
    }
    let low = -Infinity,
      high = 0;
    for (let i = 0; i < n; i++) {
      low = Math.max(low, a[i]);
      high += a[i];
    }

    let ans = 0;
    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);
      let pages = this.required(mid, a, m);
      if (pages) {
        // if this is true means allocationDone <= noOfStudents so we need to reduce number of pages allocated to increase more students
        ans = mid;
        high = mid - 1;
      } else {
        // if more number of students are allocated, just increase the number of pages per student allowed so that we can maximize the value
        low = mid + 1;
      }
    }

    return ans;
  }

  required(maxPage, a, noOfStudents) {
    let allocationDone = 1;
    let lastAllocated = 0;
    for (let i = 0; i < a.length; i++) {
      if (lastAllocated + a[i] <= maxPage) {
        lastAllocated += a[i];
      } else {
        allocationDone++;
        lastAllocated = a[i];
      }
    }

    if (allocationDone <= noOfStudents) {
      return true;
    }

    return false;
  }
}

// Split Array Largest Sum
/*
Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split.

A subarray is a contiguous part of the array.


Example 1:
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
*/
var splitArray = function (a, m) {
  // Same as Painter's Partition Problem where
  // We are given an array containing value, m = 2, where m = number of painters
  // We need to allocate contigous part of array to both painters such that complete allocation happens to both and allocation is contiguous, return such that sum of max allocation is minimum
  // It cannot happen that we allocate [] to any one, we need to allocate atleast one element to each painter
  // Same as Book Allocation Problem
  // a[] is an array which contains number of pages of ith book
  // m = number of students to which we need to allocate books
  // conditions are, allocation should be contiguous, we cannot allocate to 1 then 2 then again 1
  // all students should get atleast one book
  // if its not possible to allocate books to m students, return -1
  // In what case will it be immpossible??
  // When number of students > number of books i.e m > n, return -1 where n = size of array
  // We need to allocate such that the maximum number of pages in a book allocated to a student is minimum
  // We allocate books in one way to say m = 4, we allocate books to 4 students. maximum number of pages comes x1
  // We allocate books in another way to m = 4, and max pages = x2
  // Similarly again we try another way and max pages = x3
  // return min(x1, x2, x3)
  // We need to start taking a value for maxPagesAnyStudentCanHold and keep on checking if we can allocate books keeping all coniditons in mind using this value
  // if yes, we store it and go for higher value of maxPagesAnyStudentCanHold so that we can maximize it
  // if no, we go for lesser values of maxPagesAnyStudentCanHold
  // What is minimum value of maxPagesAnyStudentCanHold we should take?
  // It should be such that we can allocate one book to each student successfully = max(element of array)
  // What should be the maximum value of maxPagesAnyStudentCanHold?
  // Let say we are given numberOfStudent = 1, then we need to allocate all books to that 1 student so maximum value of maxPagesAnyStudentCanHold = summation of array
  // We can run a loop from i = low to high where low and high are as discussed above and check possiblity for each value of i
  let n = a.length;
  if (m > n) {
    return -1;
  }
  let low = -Infinity,
    high = 0;
  for (let i = 0; i < n; i++) {
    low = Math.max(low, a[i]);
    high += a[i];
  }

  let ans = 0;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    let pages = required(mid, a, m);
    if (pages) {
      // if this is true means allocationDone <= noOfStudents so we need to reduce number of pages allocated to increase more students
      ans = mid;
      high = mid - 1;
    } else {
      // if more number of students are allocated, just increase the number of pages per student allowed so that we can maximize the value
      low = mid + 1;
    }
  }

  return ans;
};

function required(maxPage, a, noOfStudents) {
  let allocationDone = 1;
  let lastAllocated = 0;
  for (let i = 0; i < a.length; i++) {
    if (lastAllocated + a[i] <= maxPage) {
      lastAllocated += a[i];
    } else {
      allocationDone++;
      lastAllocated = a[i];
    }
  }

  if (allocationDone <= noOfStudents) {
    return true;
  }

  return false;
}
