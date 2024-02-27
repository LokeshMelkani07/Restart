// Linkedlist in JS
// Array takes contiguous block in memory
// LL takes non-contiguous memory
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Insert at head
  insertAtHead(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Insert at any index
  insertAt(index, data) {
    if (index < 0 || index > this.size) {
      return "Invalid Index";
    }

    // if index is 0 means insert at head position
    if (index === 0) {
      this.insertAtHead(data);
      return;
    }

    // if index is different than 0 and a valid index means add not at that index by traversing
    let newNode = new Node(data);
    let temp = this.head;
    // Traverse to index-1 element and add new node in its next node
    for (let i = 0; i < index - 1; i++) {
      temp = temp.next;
    }

    newNode.next = temp.next;
    temp.next = newNode;

    // Change the size
    this.size++;
  }

  // Print the Linkedlist
  print() {
    let result = "";
    let temp = this.head;
    while (temp) {
      result += `${temp.data}->`;
      temp = temp.next;
    }
    return result;
  }

  // Remove element from head of LL
  removeAtHead() {
    if (this.isEmpty()) {
      return "List is already empty";
    }

    this.head = this.head.next;
    this.size--;
  }

  // Remove element
  // We will take 2 pointers, prev and current
  removeElement(data) {
    if (this.isEmpty()) {
      return "List is already empty";
    }

    let current = this.head,
      prev = null;
    while (current) {
      if (current.data === data) {
        if (prev === null) {
          // prev=null means its first element
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return current.element;
      }
      prev = current;
      current = prev.next;
    }
    return -1;
  }

  // Search element in LL
  searchElement(data) {
    let curr = this.head;
    let index = 0;

    while (curr) {
      if (curr.data === data) {
        return index;
      }
      index++;
      curr = curr.next;
    }
    return -1;
  }

  // Middle element of LL
  // Given the head of a singly linked list, return the middle node of the linked list.If there are two middle nodes, return the second middle node.
  middleNode() {
    // We will take fast and slow pointer approach
    // fast will move by 2 steps and slow moves by 1 step
    let slow = this.head,
      fast = this.head;
    while (fast && fast.next) {
      // Move till fast is null and fast->next is also null
      fast = fast.next.next;
      slow = slow.next;
    }
    return slow;
  }

  // Reverse the LL
  // Given the head of a singly linked list, reverse the list, and return the reversed list.
  reverse() {
    // We will take 3 pointers, prev,curr,next
    let prev = null,
      curr = this.head,
      next;
    while (curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }

  // Detect Cycle in LL
  // Given head, the head of a linked list, determine if the linked list has a cycle in it.There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.Return true if there is a cycle in the linked list. Otherwise, return false.
  isCycle() {
    // We will take fast and slow pointer approach where fast moves by 2 steps and slow moves by 1 step, if any time fast and slow are equal means there is a cycle
    let slow = this.head,
      fast = this.head;
    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;

      if (slow === fast) {
        return true;
      }
    }
    return false;
  }

  // Check LL is empty or not
  isEmpty() {
    return this.size === 0;
  }
}

let list = new LinkedList();
list.insertAtHead(43); // 43
list.insertAtHead(50); // 50->43
list.insertAtHead(34); // 34->50->43
list.insertAt(2, 46); // 34->50->46->43
list.removeAtHead(); // 50->46->43
list.removeElement(46); // 50->43
list.reverse(); // 43->50
console.log(list.isCycle()); // false
console.log(list.middleNode()); // 50
console.log(list.searchElement(50)); //1
console.log(list.print()); // 43->50
