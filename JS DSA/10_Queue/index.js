// Queue in JS
// Queue is FIFO Data structure with front, rear functionality of pushing and popping

// Queue implmentation using Array
class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(data) {
    // item will be added from end
    this.queue.push(data);
  }

  dequeue() {
    // item will be deleted from front
    // .shift means remove from front
    return this.isEmpty() ? null : this.queue.shift();
  }

  front() {
    // gives first element from front
    return this.isEmpty() ? null : this.queue.at(0);
  }

  back() {
    // gives first element from end
    return this.isEmpty() ? null : this.queue.at(-1);
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  size() {
    return this.queue.length;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // 1
console.log(queue.front()); // 2
console.log(queue.back()); // 3
console.log(queue.isEmpty()); // false
console.log(queue.size()); // 2
console.log(queue); // Queue { queue: [2, 3]}

// Queue implmentation using Linkedlist
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class QueueLinkedList {
  constructor() {
    // We know in queue, enqueue and dequeue is from front and rear
    // it takes O(1) so for LL, we need to maintain a pointer for front node + one pointer for last node
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(data) {
    // Peeche se daalo, aage se nikaalo
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.size++;
  }

  dequeue() {
    // Peeche se daalo, aage se nikaalo
    if (this.isEmpty()) {
      return null;
    }

    const deletedItem = this.head.data;
    this.head = this.head.next;
    this.size--;
    return deletedItem;
  }

  front() {
    return this.isEmpty() ? null : this.head.data;
  }

  back() {
    return this.isEmpty() ? null : this.tail.data;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const queue1 = new QueueLinkedList();
queue1.enqueue(5);
queue1.enqueue(6);
queue1.enqueue(7);
console.log(queue1.dequeue()); // 5
console.log(queue1.front()); // 6
console.log(queue1.back()); // 7
console.log(queue1.size); // 2
console.log(queue1);

// Queue implementation using Stacks
/*
Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

void push(int x) Pushes element x to the back of the queue.
int pop() Removes the element from the front of the queue and returns it.
int peek() Returns the element at the front of the queue.
boolean empty() Returns true if the queue is empty, false otherwise.
Notes:

You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
*/

class QueueStack {
  constructor() {
    // We will make use of 2 stacks
    // Stack is a LIFO means whatever we add, last element to be added becomes first element to come out
    // whereas, Queue is FIFO, first element added is first one to come out so
    // we take 2 stacks
    // we push all element inside stack1 to stack2 and push new element inside stack1, now push all stack2 element inside stack1 and this way stack1 functions as queue
    this.stack1 = [];
    this.stack2 = [];
  }

  push(x) {
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop());
    }

    this.stack1.push(x);

    while (this.stack2.length > 0) {
      this.stack1.push(this.stack2.pop());
    }
  }

  pop() {
    if (this.empty()) {
      return null;
    }

    return this.stack1.pop();
  }

  peek() {
    return this.empty() ? null : this.stack1.at(-1);
  }

  empty() {
    return this.stack1.length === 0;
  }
}

// Circular queue Implementation using Linkedlist
// In Circular Queue, last node points to first node
/*
Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values.

Implement the MyCircularQueue class:

MyCircularQueue(k) Initializes the object with the size of the queue to be k.
int Front() Gets the front item from the queue. If the queue is empty, return -1.
int Rear() Gets the last item from the queue. If the queue is empty, return -1.
boolean enQueue(int value) Inserts an element into the circular queue. Return true if the operation is successful.
boolean deQueue() Deletes an element from the circular queue. Return true if the operation is successful.
boolean isEmpty() Checks whether the circular queue is empty or not.
boolean isFull() Checks whether the circular queue is full or not.
*/
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class MyCircularQueue {
  constructor(k) {
    // Capacity is given by us for the maximum size of our queue
    // size represents number of elements present currently inside the queue
    this.capacity = k;
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enQueue(data) {
    if (this.isFull()) {
      return false;
    }

    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.tail.next = this.head;
    this.size++;
    return true;
  }

  deQueue() {
    if (this.isEmpty()) {
      return false;
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      // As it is a circular Queue, we need to maintain the property where, last element points to first element so during Dequeue, we remove element from front and maintain the property by pointing tail.next to head.next
      // if head==tail means both becomes null now after dequeue
      this.head = this.head.next;
      this.tail.next = this.head;
    }

    this.size--;
    return true;
  }

  Front() {
    return this.isEmpty() ? -1 : this.head.data;
  }

  Rear() {
    return this.isEmpty() ? -1 : this.tail.data;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.capacity;
  }
}

// Number of Recent Calls
// You have a RecentCounter class which counts the number of recent requests within a certain time frame. Implement the RecentCounter class: RecentCounter() Initializes the counter with zero recent requests. int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t]. It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.
var RecentCounter = function () {
  // this array will act like a queue for us
  this.requests = [];
};

RecentCounter.prototype.ping = function (t) {
  this.requests.push(t);

  // We need to gather requests between [t-3000, t]
  // if first requets does not come under the range, pop it from front
  while (this.requests[0] < t - 3000) {
    this.requests.shift();
  }

  // return length of array at the end
  return this.requests.length;
};

// Design Circular Deque
/*
Design your implementation of the circular double-ended queue (deque).

Implement the MyCircularDeque class:

MyCircularDeque(int k) Initializes the deque with a maximum size of k.
boolean insertFront() Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise.
boolean insertLast() Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise.
boolean deleteFront() Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise.
boolean deleteLast() Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise.
int getFront() Returns the front item from the Deque. Returns -1 if the deque is empty.
int getRear() Returns the last item from Deque. Returns -1 if the deque is empty.
boolean isEmpty() Returns true if the deque is empty, or false otherwise.
boolean isFull() Returns true if the deque is full, or false otherwise.
*/
// This is an Circular Deque
var MyCircularDeque = function (k) {
  this.data = [];
  this.front = 0;
  this.rear = 0;
  // size represents the capacity
  this.size = k;
  // length represents the number of elements currently present inside queue
  this.length = 0;
};

MyCircularDeque.prototype.insertFront = function (value) {
  if (this.isFull()) {
    return false;
  } else {
    // This is an Circular Deque so if indexes exceed we need to take care of it using modulo operator
    this.front = (this.front + this.size - 1) % this.size;
    this.data[this.front] = value;
    this.length++;
    return true;
  }
};

MyCircularDeque.prototype.insertLast = function (value) {
  if (this.isFull()) {
    return false;
  } else {
    this.data[this.rear] = value;
    this.rear = (this.rear + 1) % this.size;
    this.length++;
    return true;
  }
};

MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) {
    return false;
  } else {
    this.front = (this.front + 1) % this.size;
    this.length--;
    return true;
  }
};

MyCircularDeque.prototype.deleteLast = function () {
  if (this.isEmpty()) {
    return false;
  } else {
    this.rear = (this.rear + this.size - 1) % this.size;
    this.length--;
    return true;
  }
};

MyCircularDeque.prototype.getFront = function () {
  if (!this.isEmpty()) {
    return this.data[this.front];
  }

  return -1;
};

MyCircularDeque.prototype.getRear = function () {
  if (!this.isEmpty()) {
    return this.data[(this.rear + this.size - 1) % this.size];
  }

  return -1;
};

MyCircularDeque.prototype.isEmpty = function () {
  return this.length === 0;
};

MyCircularDeque.prototype.isFull = function () {
  return this.length === this.size;
};

// Flatten a multilevel linked list
// Given a linked list where in addition to the next pointer, each node has a child pointer, which may or may not point to a separate list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in below figure. You are given the head of the first level of the list. Flatten the list so that all the nodes appear in a single-level linked list. You need to flatten the list in way that all nodes at the first level should come first, then nodes of second level, and so on.
class Node {
  // Every node has a data, next pointer, child pointer
  constructor() {
    this.next = null;
    this.child = null;
    this.data = 0;
  }
}

function flattenLinkedList(head) {
  // What we will do is, we will have a head pointer and a tail pointer
  // Head pointer will point to head of LL, tail pointer points to last node of LL
  // We start traversing from head of LL, if any node has child, we will append tail.next to curr.child and traverse tail to last node of that child
  // now do curr = curr.next and again if any curr has a child, move it to tail.next and move tail to end of that list
  // do this till curr reaches the tail itself
  // This way we get whole LL flattened
  if (!head) return;

  let curr = head;
  let tail = head;
  let temp = head;

  while (tail.next != null) {
    // move tail to the end
    tail = tail.next;
  }

  while (curr != tail) {
    // if curr has child, append it to the tail
    if (curr.child) {
      tail.next = curr.child;
      temp = curr.child;
      while (temp.next != null) {
        temp = temp.next;
      }
      tail = temp;
    }

    curr = curr.next;
  }

  return head;
}

// Solution Using Queue with space O(n)
function flattenUsingQueue(head) {
  // In this solution we will make use of queue
  // We will have a curr which starts from the head pointer
  // We will traverse till curr.next != null and print but while doing this, if any curr has child, we will push it in the queue
  // Once we reach curr.next == null, we check the queue
  // if its not empty, we will get the top element of queue (FIFO) and we point curr to it and start traversing from that node until curr.next != null and print it and sameway if we get any curr has child, we push it in the queue
  // We keep on doing this till curr.next === null and queue is empty
  if (!head) return null;

  const queue = []; // Queue to store nodes with child pointers
  let curr = head;

  while (curr) {
    if (curr.child) {
      queue.push(curr.child); // Push the child node to the queue
      curr.child = null; // Set child to null to flatten the list
    }

    if (!curr.next && queue.length > 0) {
      let nextNode = queue.shift(); // Dequeue the next node from the queue
      curr.next = nextNode; // Connect the next node
      nextNode.prev = curr; // Set the prev pointer of the next node
    }

    curr = curr.next; // Move to the next node
  }

  return head;
}

// Flatten a Multilevel Doubly Linked List
// You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional child pointer. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure as shown in the example below. Given the head of the first level of the list, flatten the list so that all the nodes appear in a single-level, doubly linked list. Let curr be a node with a child list. The nodes in the child list should appear after curr and before curr.next in the flattened list. Return the head of the flattened list. The nodes in the list must have all of their child pointers set to null.
// Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12], these are given level by level i.e 3 has child 7 which has (8,9,10) and 8 has child (11,12) so print output in such a way that children are printed first
// Output: [1,2,3,7,8,11,12,9,10,4,5,6]
function Node(val, prev, next, child) {
  this.val = val;
  this.prev = prev;
  this.next = next;
  this.child = child;
}

var flatten = function (head) {
  // Here the way of printing is different
  // If we see a node has a child, we will print the child first
  // means print whole child LL first then move to next curr node
  // So we need to maintain a stack where we will push the next node of any curr and its child
  // and we pick the child first using LIFO property and print the child first then curr.next
  // We will make a dummyNode which points to one node previous to head
  // when stack becomes empty, stop
  // at the end we will return dummyNode.next
  if (!head) return;
  let dummy = new Node(0, null, head, null);

  let current = dummy;
  let stack = [head];
  let previous = null; // to append

  while (stack.length != 0) {
    current = stack.pop();

    if (previous) {
      // if there is any prev node, append current to its next
      current.prev = previous;
      previous.next = current;
    }

    // we will push current.next first in stack then we push current.child because during printing we want current.child first then current.next and we know stack works in LIFO fashion
    if (current.next != null) {
      stack.push(current.next);
    }

    if (current.child != null) {
      stack.push(current.child);
      current.child = null;
    }

    previous = current; // point previous to current
  }

  return dummy.next;
};

// Sliding Window Maximum
/*
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.
Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
*/
var maxSlidingWindow = function (nums, k) {
  // Brute Force Approach
  // We will traverse from index 0 to n-k index, we conside max = arr[i]
  // Where we run another loop from 1 to k-1 size
  // we check arr[i+j] > max then update max, else store that sliding window maximum element
  let maxi = -Infinity;
  let result = [];
  for (let i = 0; i <= nums.length - k; i++) {
    maxi = nums[i];
    // we run below loop from 1 to <k because first element of window has already been considered in the above statement
    for (let j = 1; j < k; j++) {
      if (nums[i + j] > maxi) {
        maxi = nums[i + j];
      }
    }
    result.push(maxi);
  }

  return result;
};

// Optimised approach using heap
var maxSlidingWindow = function (nums, k) {
  // Little Optimised Approach
  // We will use max-heap here
  // We will push k elements in the heap at a time and everytime we push top element of max-heap in result array
  // then we remove it and process further
  const maxHeap = [];
  const result = [];
  let i = 0;
  for (; i < k; i++) {
    maxHeap.push(nums[i]);
  }

  maxHeap.sort((a, b) => b - a);
  result.push(maxHeap[0]);
  maxHeap.unshift();
  for (; i < nums.length; i++) {
    maxHeap.push(nums[i]);
    maxHeap.sort((a, b) => b - a);

    result.push(maxHeap[0]);

    maxHeap.unshift();
  }

  return result;
};

// Most Optimised Approach using Deque
var maxSlidingWindow = function (nums, k) {
  // Most Optimised Approach
  // We will maintain a Doubly ended queue (Deque)
  // In which we store index of elements in such a way that before pushing any element arr[i], we check if the last element added in our deque was greater than arr[i] or smaller than arr[i]
  // if its greater than arr[i] then just push arr[i] simply
  // but if its smaller than arr[i] then pop that one out first till we get greater number than arr[i] and then push arr[i]
  // this way, everytime our deque contains greater element of that window everytime so we just print it and move further
  // Do this till we reach end of array
  const result = [];
  const deque = []; // Deque to store indices, not actual elements

  for (let i = 0; i < nums.length; i++) {
    // Remove elements from the front of the deque if they are out of the window range
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // Remove elements from the back of the deque that are smaller than the current element
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i); // Push the current index to the deque

    // Start adding max elements to the result array once the window size is reached
    if (i >= k - 1) {
      result.push(nums[deque[0]]); // The front of the deque stores the max element's index
    }
  }

  return result;
};
