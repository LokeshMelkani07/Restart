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
