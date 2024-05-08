// Heaps
// Heap is a complete binary tree which satisfies a heap's property
// A complete Binary Tree is the one whose all nodes has 2 children except leaf nodes and leaf nodes should always start from left
// Heap is of 2 types.
// Max heap - Children is always smaller than its root
// Min Heap - Root is always smaller than children
// Complete Binary Tree of n nodes will have height of logn so thats a property of Heap
// We will represent Heap as array as on now where 0th index will be -1 (redundant) and we will start storing values from index 1
// For any node at index i in the array. its parent will be at index i/2 and for any parent at index i in array. Its left child will be at 2*i and right child will be at 2*i+1
// Inserting in Max Heap
// Insertion should be done in such a way that Complete Binary Tree maintains and Proprty of Heap also maintains
// We will insert the value at the end of our array, now we maintain the property for which we will find the parent of newly added element at i/2, we check if arr[i/2] < value. If yes, swap them as we are making a Max Heap so root should be the maximum. Again do the same at new i/2 index and do till till i>1 or arr[i/2] > value
// Insertion takes O(logn) for processing and O(n) for traversal i.e O(nlogn)
// There is another method of heapify which does the same thing in O(n) which we will see further
// This way our Max Heap is maintained
// Deletion in Max Heap
// It means deleting the root node. We will Delete the last element from the array and store it in 0th index.
// Now To satisfy heap property, we will start from 0th index and check its left child (2*i) and right child (2*i+1) and compare left child with parent, if left child > parent, swap them
// Now we are at left child index, again compare it with its left child and do the same till our array length exceeds
// Insertion and Deletion in an Heap takes O(logn)
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Get the parent index of a given index
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // Get the left child index of a given index
  // Here we start from index = 0 so our left child is at 2*i+1 and right child is at 2*i+2
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  // Get the right child index of a given index
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // Swap two elements in the heap
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  // Insert a new element into the heap
  insert(value) {
    // heapify up means now we are satisfying the heap properties into the array
    this.heap.push(value);
    this.heapifyUp();
  }

  // Heapify up after insertion
  // Take the last element which is just inserted, go to its parent and swap if needed till time we do not reach the first element of array
  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (
      currentIndex > 0 &&
      this.heap[currentIndex] > this.heap[this.getParentIndex(currentIndex)]
    ) {
      const parentIndex = this.getParentIndex(currentIndex);
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  // Deletion in Max Heap
  // Remove and return the maximum element from the heap
  extractMax() {
    if (this.heap.length === 0) {
      return null;
    }

    // Swap lastValue of array with first value and remove first value from array
    // Now apply HeapifyDown to satisfy Heap properties in the array
    const maxValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastValue;
      this.heapifyDown();
    }

    return maxValue;
  }

  // Heapify down after extraction
  // Its nothing but Satisfying heap property to the array
  // We will take 0th index as current index
  // We will find its left child and and right child
  // We will need to take largerChildIndex. initially let say its left child
  // Now we compare left child and right child of currentIndex, the one which is greater becomes our largerChildIndex
  // Now we compare currentIndex value and largerChildIndex value. if largerChildIndex value > currentIndex Value means swap them and make currentIndex = largerChildIndex
  // Keep on repeating the same till leftChild is less than array length
  // else if currentIndex value > largerChildIndex value, break out
  heapifyDown() {
    let currentIndex = 0;

    while (this.getLeftChildIndex(currentIndex) < this.heap.length) {
      const leftChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);
      let largerChildIndex = leftChildIndex;

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] > this.heap[leftChildIndex]
      ) {
        largerChildIndex = rightChildIndex;
      }

      if (this.heap[currentIndex] > this.heap[largerChildIndex]) {
        break;
      }

      this.swap(currentIndex, largerChildIndex);
      currentIndex = largerChildIndex;
    }
  }

  // Peek at the maximum element without removing it
  // Max Heap has first element as greatest
  peekMax() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // Get the size of the heap
  size() {
    return this.heap.length;
  }

  // Check if the heap is empty
  isEmpty() {
    return this.heap.length === 0;
  }

  // Print the elements of the heap
  printHeap() {
    console.log(this.heap);
  }
}

// Heap Sort, Heapify Method to Implement Max Heep in O(n)
// We will start from end element and think of it as a root node of any max-heap and check if that complete heep satisfies properties of heap
// if yes, move one element back
// if no, check its parents and do swapping and all which we do during deletion method
// do this till we reach first element
// We can start our operation from last non-leaf node of the tree which is (n/2 - 1)th node. we can ignore all leaf nodes which we know are from (n/2 + 1......n)
// Now to do heap sort, we know root node of max-heap is maximum element so we start from end of array and swap it with first value so that in the sorted version of array, max element is at the end
// Now we apply heapify-down function to rest of array from index 0 to curr_index-1. now we do curr_index-- and this runs on loop till we reach first element
var sortArray = function (nums) {
  //  We will sort this array using heap sort which works in O(nlogn)
  // First we will build heap from given array which can be done in O(n) using heapify method
  // In which what we do is we start traversing from first non leaf node and consider it as a root of heap, we compare it with its left and right child and we make swaps based on required condition and then we keep on doing it till we reach end of array
  // Now we have build the heap out of array, now we need to do heap sort
  // We know in a Max-heap, maximum element is at root, so we run a loop in which we start from end element, we swap it with first element of array and now send array from index 0 to current_index-1 for heapify to build heap from it
  // We keep on doing it till index = 0 and this way we have our sorted array
  return heapSort(nums);
};

function heapSort(nums) {
  // Building heap from the given array, given 1 <= nums.length <= 5 * 104 so we keep this in mind
  buildHeap(nums);

  for (let i = nums.length - 1; i >= 1; i--) {
    [nums[0], nums[i]] = [nums[i], nums[0]];
    heapify(nums, i, 0);
  }

  return nums;
}

function buildHeap(nums) {
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    heapify(nums, nums.length, i);
  }
}

function heapify(nums, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && nums[left] > nums[largest]) {
    largest = left;
  }

  if (right < n && nums[right] > nums[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [nums[i], nums[largest]] = [nums[largest], nums[i]];
    heapify(nums, n, largest);
  }
}

// Kth Largest Element in an Array
/*
Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
*/
var findKthLargest = function (nums, k) {
  // We will implement this using min-heap of size k
  // Where we store only k elements at a time
  // We will insert all elements of array in heap but as soon as its size exceed k we delete elements from it, we know in a min-heap, smallest element in the heap will be deleted first
  // At end when all elements are inserted in it
  // Our top element of heap will be kth largest element
  // We can implement whole heap class
  // In JavaScript, there is no built-in implementation of a priority queue out of the box like some other programming languages provide. However, you can implement a priority queue using various data structures such as arrays, linked lists, or binary heaps.
  // A min-priority queue is a data structure where each element has an associated priority, and the element with the lowest priority is dequeued first. It supports operations like insertion (enqueue), deletion of the minimum element (dequeue), and peeking at the minimum element without removing it.
  let minHeap = new MinPriorityQueue();

  for (let i = 0; i < nums.length; i++) {
    minHeap.enqueue(nums[i]);

    if (minHeap.size() > k) minHeap.dequeue();
  }

  return minHeap.front().element;
};

// Connect n ropes with minimum cost
/*
Given are N ropes of different lengths, the task is to connect these ropes into one rope with minimum cost, such that the cost to connect two ropes is equal to the sum of their lengths.

Examples:
Input: arr[] = {4,3,2,6} , N = 4
Output: 29
Explanation:

First, connect ropes of lengths 2 and 3. Now we have three ropes of lengths 4, 6, and 5.
Now connect ropes of lengths 4 and 5. Now we have two ropes of lengths 6 and 9.
Finally connect the two ropes and all ropes have connected.


Input: arr[] = {1, 2, 3} , N = 3
Output: 9
Explanation:
First, connect ropes of lengths 1 and 2. Now we have two ropes of lengths 3 and 3.
Finally connect the two ropes and all ropes have connected.
*/

// Create a min-heap and insert all lengths into the min-heap.
// Do following while the number of elements in min-heap is greater than one.
// Extract the minimum and second minimum from min-heap
// Add the above two extracted values and insert the added value to the min-heap.
// Maintain a variable for total cost and keep incrementing it by the sum of extracted values.
// Return the value of total cost.
function minCost(arr, n) {
  // Create a priority queue
  let pq = [];

  // Adding items to the pQueue
  for (let i = 0; i < n; i++) {
    pq.push(arr[i]);
  }

  pq.sort(function (a, b) {
    return a - b;
  });

  // Initialize result
  let res = 0;

  // While size of priority queue
  // is more than 1
  while (pq.length > 1) {
    // Extract shortest two ropes from pq
    let first = pq.shift();
    let second = pq.shift();

    // Connect the ropes: update result
    // and insert the new rope to pq
    res += first + second;
    pq.push(first + second);
    // sorting again to maintain min-heap properties
    pq.sort(function (a, b) {
      return a - b;
    });
  }

  return res;
}

// Find Median from Data Stream
/*
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.
For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
*/
var MedianFinder = function () {
  // Median is a number which is the middle element of an sorted array
  // If length of array is even, median is average of both middle elements
  // Let us analyse what is a median?
  // All element on left of median value are smaller than it say leftVals
  // All element on right of median value are greater than it say rightVals
  // if rightVals = leftVals in number then we can say median will be average of (largest value from left, smallest value from right)
  // if rightVals > leftVals means median is smallest value from right
  // if rightVals < leftVals means median is largest value from left
  // For this purpose we can make use of max heap for leftVals and min heap for rightVals
  // What we will do is, we will store elements in min heap and max heap in such a way that if number of elements are odd, we keep majority elements in max heap means if say there are 7 (odd) number of elements in array, we store 4 elements in max heap and 3 in min heap and in such case, our median becomes the largest value from max heap
  // When we insert something in maxheap we check if maxheap has even number of elements then we remove one element from it and push it in minHeap
  // Everytime before inserting we check if our current element is greater than our top element of maxHeap, we push it in minheap
  // else we push it in maxHeap and do the shifting if there are even numbers
  this.minHeap = new MinPriorityQueue();
  this.maxHeap = new MaxPriorityQueue();
};

MedianFinder.prototype.addNum = function (num) {
  // if maxHeap is empty then simply add in maxHeap because we want majority elements in maxHeap
  // OR if maxHeap peek element is greater than num, means num will come before peek element in sorted array then also we should add element in maxHeap
  // else just add in minHeap
  if (this.maxHeap.isEmpty() || this.maxHeap.front() >= num) {
    this.maxHeap.enqueue(num);
  } else {
    this.minHeap.enqueue(num);
  }

  // Balance the heaps if necessary
  // if maxHeap size is odd, remove a element and push in minheap
  // if minheap size is more than maxHeap, means majority element are not in maxheap so shift elements in maxHeap
  if (this.maxHeap.size() > this.minHeap.size() + 1) {
    this.minHeap.enqueue(this.maxHeap.dequeue());
  } else if (this.minHeap.size() > this.maxHeap.size()) {
    this.maxHeap.enqueue(this.minHeap.dequeue());
  }
};

MedianFinder.prototype.findMedian = function () {
  // if size of both max and min heap are same, median is average of largest value of maxheap and smallest value of minheap side
  // else just give top element of maxHeap as majority elements are inside maxHeap
  if (this.maxHeap.size() === this.minHeap.size()) {
    return (this.maxHeap.front() + this.minHeap.front()) / 2;
  } else {
    return this.maxHeap.front();
  }
};

// Relative Ranks
/*
You are given an integer array score of size n, where score[i] is the score of the ith athlete in a competition. All the scores are guaranteed to be unique.

The athletes are placed based on their scores, where the 1st place athlete has the highest score, the 2nd place athlete has the 2nd highest score, and so on. The placement of each athlete determines their rank:

The 1st place athlete's rank is "Gold Medal".
The 2nd place athlete's rank is "Silver Medal".
The 3rd place athlete's rank is "Bronze Medal".
For the 4th place to the nth place athlete, their rank is their placement number (i.e., the xth place athlete's rank is "x").
Return an array answer of size n where answer[i] is the rank of the ith athlete.

Example 1:
Input: score = [5,4,3,2,1]
Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
Explanation: The placements are [1st, 2nd, 3rd, 4th, 5th].
*/
var findRelativeRanks = function (score) {
  // We will use max-heap to store ith athelete and his score
  // This way we always get max-Score at the top
  // We assign ranks based on the top score which we fetch from priority queue
  /*
    for example: score = [5,4,3,2,1]
    Our maxHeap looks like
    { priority: 5, element: 0 }
    { priority: 4, element: 1 }
    { priority: 3, element: 2 }
    { priority: 2, element: 3 }
    { priority: 1, element: 4 }
    */
  let maxHeap = new MaxPriorityQueue();
  for (let i = 0; i < score.length; i++) {
    // put i as node based on priority of score[i] so top score always at top
    // we are pushing element based on {element,priority}
    maxHeap.enqueue(i, score[i]);
  }

  let ans = [];
  for (let i = 0; i < score.length; i++) {
    let item = maxHeap.dequeue();
    let rank;
    console.log(item);

    switch (i) {
      case 0:
        rank = "Gold Medal";
        break;
      case 1:
        rank = "Silver Medal";
        break;
      case 2:
        rank = "Bronze Medal";
        break;
      // (i+1) because we start our loop from index 0 whereas rank are starting from index 1 in score array
      default:
        rank = (i + 1).toString();
        break;
    }

    // item.element means ith athlete which is put in maxHeap based on priority of their score[i]
    ans[item.element] = rank;
  }

  return ans;
};
