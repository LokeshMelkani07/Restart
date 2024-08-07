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

// Height Checker
/*
A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Let this ordering be represented by the integer array expected where expected[i] is the expected height of the ith student in line.

You are given an integer array heights representing the current order that the students are standing in. Each heights[i] is the height of the ith student in line (0-indexed).

Return the number of indices where heights[i] != expected[i].

Example 1:
Input: heights = [1,1,4,2,1,3]
Output: 3
Explanation:
heights:  [1,1,4,2,1,3]
expected: [1,1,1,2,3,4]
Indices 2, 4, and 5 do not match.
*/
var heightChecker = function (heights) {
  // Brute force Approach: Make another array, sort it and now compare element by element and count number of mismatches
  let count = 0;
  const ss = [...heights];
  ss.sort((a, b) => a - b);
  for (let i = 0; i < heights.length; i++) {
    if (ss[i] !== heights[i]) {
      count++;
    }
  }
  return count;
};

// Optimised Approach
var heightChecker = function (heights) {
  // Optimised Approach
  // We can use any of the sorting algorithm which takes less TC
  // We will use counting sort algorithm
  // We have been given that 1 <= heights[i] <= 100 so we will make a array count[101] of 101 size where we store count of each index in heights
  // once we have it, we start traversing count[] from index = 1 and if count[i] > 0, we check if its height[j] where j starts from 0
  // if not means mismatch is found so mismatch++, j++, count[i]--
  // if count[i] = 0 means we have exhausted current element, move forward so i++
  // at the end return mismatch
  let mismatch = 0;
  let count = Array(101).fill(0);

  for (let i = 0; i < heights.length; i++) {
    count[heights[i]]++;
  }

  let i = 1,
    j = 0;
  while (i < 101) {
    if (count[i] == 0) {
      i++;
    } else {
      if (i != heights[j]) {
        mismatch++;
      }
      count[i]--;
      j++;
    }
  }

  return mismatch;
};

// Relative Sort Array
/*
Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.

Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. Elements that do not appear in arr2 should be placed at the end of arr1 in ascending order.

Example 1:
Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]
*/
var relativeSortArray = function (arr1, arr2) {
  // We are given 2 arrays, arr1 and arr2
  // All elements of arr2 are distinct and are present in arr1
  // We want to sort arr1 in such a way that all elements of arr2 are there in arr1 and those elements not present in arr2 but are present in arr1 come at the end of arr1
  // So we take an auxilliary array
  // arr1 may contain duplicates of arr2 elements also like Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6], Output: [2,2,2,1,4,3,3,9,6,7,19]
  // We copy them as it is that number of times
  // We will copy all included elements of arr1 in aux array which are there in arr2
  // now we sort arr1 so that not included elements come at the end in sorted order
  // now we traverse arr1 and check if element is not present in arr2, push it in aux array
  // return aux array
  let arr = [];
  for (let x of arr2) {
    while (arr1.includes(x)) {
      arr.push(x);
      arr1.splice(arr1.indexOf(x), 1);
    }
  }
  arr1.sort((a, b) => a - b);
  for (let x of arr1) {
    if (!arr2.includes(x)) {
      arr.push(x);
    }
  }
  return arr;
};

// Minimum Number of Moves to Seat Everyone
/*
There are n seats and n students in a room. You are given an array seats of length n, where seats[i] is the position of the ith seat. You are also given the array students of length n, where students[j] is the position of the jth student.

You may perform the following move any number of times:

Increase or decrease the position of the ith student by 1 (i.e., moving the ith student from position x to x + 1 or x - 1)
Return the minimum number of moves required to move each student to a seat such that no two students are in the same seat.

Note that there may be multiple seats or students in the same position at the beginning.

Example 1:
Input: seats = [3,1,5], students = [2,7,4]
Output: 4
Explanation: The students are moved as follows:
- The first student is moved from from position 2 to position 1 using 1 move.
- The second student is moved from from position 7 to position 5 using 2 moves.
- The third student is moved from from position 4 to position 3 using 1 move.
In total, 1 + 2 + 1 = 4 moves were used.

Example 2:
Input: seats = [4,1,5,9], students = [1,3,2,6]
Output: 7
Explanation: The students are moved as follows:
- The first student is not moved.
- The second student is moved from from position 3 to position 4 using 1 move.
- The third student is moved from from position 2 to position 5 using 3 moves.
- The fourth student is moved from from position 6 to position 9 using 3 moves.
In total, 0 + 1 + 3 + 3 = 7 moves were used.

Example 3:
Input: seats = [2,2,6,6], students = [1,3,2,6]
Output: 4
Explanation: Note that there are two seats at position 2 and two seats at position 6.
The students are moved as follows:
- The first student is moved from from position 1 to position 2 using 1 move.
- The second student is moved from from position 3 to position 6 using 3 moves.
- The third student is not moved.
- The fourth student is not moved.
In total, 1 + 3 + 0 + 0 = 4 moves were used.
*/
var minMovesToSeat = function (seats, students) {
  // We will sort both students and seats
  // We will try to allocate first seat available to first student
  // If ith seat != jth student means move jth student to some places and make him seat
  // Store that count
  seats.sort((a, b) => a - b);
  students.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < students.length; i++) {
    count += Math.abs(students[i] - seats[i]);
  }

  return count;
};

// Minimum Difference Between Largest and Smallest Value in Three Moves
/*
You are given an integer array nums.

In one move, you can choose one element of nums and change it to any value.

Return the minimum difference between the largest and smallest value of nums after performing at most three moves.

Example 1:
Input: nums = [5,3,2,4]
Output: 0
Explanation: We can make at most 3 moves.
In the first move, change 2 to 3. nums becomes [5,3,3,4].
In the second move, change 4 to 3. nums becomes [5,3,3,3].
In the third move, change 5 to 3. nums becomes [3,3,3,3].
After performing 3 moves, the difference between the minimum and maximum is 3 - 3 = 0.
*/
var minDifference = function (nums) {
  /*
    We have 4 plans:

kill 3 biggest elements
kill 2 biggest elements + 1 smallest elements
kill 1 biggest elements + 2 smallest elements
kill 3 smallest elements

Example from @himanshusingh11:

A = [1,5,6,13,14,15,16,17]
n = 8

Case 1: kill 3 biggest elements

All three biggest elements can be replaced with 14
[1,5,6,13,14,15,16,17] -> [1,5,6,13,14,14,14,14] == can be written as A[n-4] - A[0] == (14-1 = 13)

Case 2: kill 2 biggest elements + 1 smallest elements

[1,5,6,13,14,15,16,17] -> [5,5,6,13,14,15,15,15] == can be written as A[n-3] - A[1] == (15-5 = 10)

Case 3: kill 1 biggest elements + 2 smallest elements

[1,5,6,13,14,15,16,17] -> [6,6,6,13,14,15,16,16] == can be written as A[n-2] - A[2] == (16-6 = 10)

Case 4: kill 3 smallest elements

[1,5,6,13,14,15,16,17] -> [13,13,13,13,14,15,16,17] == can be written as A[n-1] - A[3] == (17-13 = 4)

Answer is minimum of all these cases!
    */

  let n = nums.length;
  if (n <= 4) return 0; // if length is <= 4, we will make largest element same as smallest element, rest all we make 0 and difference become 0 as we have atmost 3 moves to perform

  // Sort the array
  nums.sort((a, b) => a - b);

  // Evaluate the minimum difference possible with at most 3 moves
  let minDiff = Math.min(
    nums[n - 1] - nums[3], // Change 3 smallest elements
    nums[n - 2] - nums[2], // Change 2 smallest and 1 largest element
    nums[n - 3] - nums[1], // Change 1 smallest and 2 largest elements
    nums[n - 4] - nums[0] // Change 3 largest elements
  );

  return minDiff;
};

/*
Sort Array by Increasing Frequency
Given an array of integers nums, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order. Return the sorted array.

Example 1:
Input: nums = [1,1,2,2,2,3]
Output: [3,1,1,2,2,2]
Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.

Example 2:
Input: nums = [2,3,1,3,2]
Output: [1,3,3,2,2]
Explanation: '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.
*/
var frequencySort = function (nums) {
  // Make a map
  // Store the frequency of elements
  // Sort the elements based on frequency in descending order
  // if 2 elements have same frequency, sort them on descending order
  let mpp = new Map();
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    let leftOver = mpp.get(nums[i]) || 0;
    mpp.set(nums[i], leftOver + 1);
  }

  nums.sort((a, b) => {
    return mpp.get(a) - mpp.get(b) || b - a;
  });

  return nums;
};

// Sort the Jumbled Numbers [Important] [Check the mapping concept of picking each digit of a number from beginning instead of num*10 + last%10 vala concept]
/*
You are given a 0-indexed integer array mapping which represents the mapping rule of a shuffled decimal system. mapping[i] = j means digit i should be mapped to digit j in this system.

The mapped value of an integer is the new integer obtained by replacing each occurrence of digit i in the integer with mapping[i] for all 0 <= i <= 9.

You are also given another integer array nums. Return the array nums sorted in non-decreasing order based on the mapped values of its elements.

Notes:

Elements with the same mapped values should appear in the same relative order as in the input.
The elements of nums should only be sorted based on their mapped values and not be replaced by them.

Example 1:
Input: mapping = [8,9,4,0,2,1,3,5,7,6], nums = [991,338,38]
Output: [338,38,991]
Explanation:
Map the number 991 as follows:
1. mapping[9] = 6, so all occurrences of the digit 9 will become 6.
2. mapping[1] = 9, so all occurrences of the digit 1 will become 9.
Therefore, the mapped value of 991 is 669.
338 maps to 007, or 7 after removing the leading zeros.
38 maps to 07, which is also 7 after removing leading zeros.
Since 338 and 38 share the same mapped value, they should remain in the same relative order, so 338 comes before 38.
Thus, the sorted array is [338,38,991].

Example 2:
Input: mapping = [0,1,2,3,4,5,6,7,8,9], nums = [789,456,123]
Output: [123,456,789]
Explanation: 789 maps to 789, 456 maps to 456, and 123 maps to 123. Thus, the sorted array is [123,456,789].
*/
var sortJumbled = function (mapping, nums) {
  // mapping = [8,9,4,0,2,1,3,5,7,6] means 0 -> 8, 1 -> 9, 2 -> 4, 3->0........9->6
  // we need to replace all numbers in nums with its mapping values and then return an array with sorted values in ascending order
  // if 2 values have same mapping value, return in same relative order like In [991,338,38], 338 and 38 both corresponds to 007 mapping value so return in same order [338,38] in answer array
  // mapping each number with its mapping
  // storing all original and mapped value in a map
  // sorting the map based on mapped values
  // storing all original values from sorted map
  // To store mapped values, we take each digit from a number one by one using split and join function to convert it to a string, then splitting it to an array and then return it as a string with its mapped values
  let mpp = mappingEachNumber(mapping, nums);
  return mpp;
};

function mappingEachNumber(mapping, nums) {
  let mpp = {};
  // [ '06655', '95749', '984313', '030', '53', '39257162', '070' ]
  let arr = nums.map((digit) => {
    // taking each element of nums, splitting it and storing its mapped values and then again joining it.
    return digit
      .toString()
      .split("")
      .map((ele) => {
        return mapping[ele];
      })
      .join("");
  });

  // storing all original and mapped inside an object
  let mappedValues = nums.map((digit, index) => {
    return { original: digit, mapped: arr[index] };
  });

  // osrt based on mapped values
  mappedValues.sort((a, b) => a.mapped - b.mapped);

  // returning all mapped values
  return mappedValues.map((digit) => digit.original);
}
