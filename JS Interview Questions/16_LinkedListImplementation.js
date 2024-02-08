// Create a JavaScript class for a linked list with methods to insert a node at the beginning, end, or at a specific position, and to delete a node from a given position.

// First make a NOde class
// A node always has a data and next pointer
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Now let us make a Linkedlist class
// We know linkedlist has a head pointer and size
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Insert at the beginning
  insertAtBeginning(data) {
    // Make new node
    const newNode = new Node(data);
    // make new node point to head as newNode is first node now
    newNode.next = this.head;
    // Let head point to newNode now
    this.head = newNode;
    // Update the size of LL
    this.size++;
  }

  // Insert at the end of LL
  insertAtEnd(data) {
    // Make new node
    const newNode = new Node(data);

    // if there is no head means insert at first node
    if (!this.head) {
      this.head = newNode;
    } else {
      // get to the last node
      const current_node = this.head;
      while (current_node.next) {
        current_node = current_node.next;
      }
      // we are at the last node now
      current_node.next = newNode;
    }
    // increase the size in both cases
    this.size++;
  }

  // Insert at any position in LL
  insertAtPosition(data, position) {
    // if its a invalid position
    if (position < 0 || position > this.size) {
      return false;
    }
    // if its first position
    if (position === 0) {
      this.insertAtBeginning(data);
      return true;
    }
    // if its a random position
    // make new node
    const newNode = new Node(data);
    // get the head
    let current = this.head;
    let previous = null;
    let index = 0;
    // Till index != position
    while (index < position) {
      previous = current;
      current = current.next;
      index++;
    }
    newNode.next = current;
    previous.next = newNode;
    this.size++;
    return true;
  }

  // Delete a node from given position in LL
  deleteAtPosition(position) {
    // if position is invalid or there is no node
    if (position < 0 || position >= this.size || !this.head) {
      return false;
    }

    let current = this.head;
    if (position == 0) {
      // move the head
      this.head = current.next;
    } else {
      let index = 0;
      // get to that position
      let previous = null;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      // current points to the position from where we have to remove node
      previous.next = current.next;
    }
    this.size--;
    return current.data;
  }

  // Print the LL
  printList() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data + "-> ";
      current = current.next;
    }

    result += "null";
    console.log(result);
  }
}

// Example usage:
const linkedList = new LinkedList();

linkedList.insertAtEnd(1);
linkedList.insertAtEnd(2);
linkedList.insertAtEnd(4);
linkedList.printList(); // Output: 1 -> 2 -> 4 -> null

linkedList.insertAtBeginning(0);
linkedList.printList(); // Output: 0 -> 1 -> 2 -> 4 -> null

linkedList.insertAtPosition(3, 3);
linkedList.printList(); // Output: 0 -> 1 -> 2 -> 3 -> 4 -> null

linkedList.deleteAtPosition(2);
linkedList.printList(); // Output: 0 -> 1 -> 3 -> 4 -> null
