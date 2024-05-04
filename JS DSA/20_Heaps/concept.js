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

  // Build a heap from an array of elements
  buildHeap(arr) {
    this.heap = arr;
    for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  // Print the elements of the heap
  printHeap() {
    console.log(this.heap);
  }
}
