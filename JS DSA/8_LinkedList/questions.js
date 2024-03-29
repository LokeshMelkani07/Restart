// Middle of the Linked List
// Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.
var middleNode = function (head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};

// Reverse Linked List
// Given the head of a singly linked list, reverse the list, and return the reversed list.
var reverseList = function (head) {
  let prev = null,
    curr = head,
    currNext;
  while (curr) {
    currNext = curr.next;
    curr.next = prev;
    prev = curr;
    curr = currNext;
  }

  head = prev;
  return head;
};

// Linked List Cycle
// Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter. Return true if there is a cycle in the linked list. Otherwise, return false.
var hasCycle = function (head) {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast === slow) {
      return true;
    }
  }

  return false;
};
