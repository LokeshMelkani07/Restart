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
  this.size = k;
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
