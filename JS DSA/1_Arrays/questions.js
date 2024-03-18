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
