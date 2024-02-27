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
