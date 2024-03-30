// Middle of the Linked List
// Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.
var middleNode = function (head) {
  // We will use slow pointer and fast pointer
  // Move fast pointer by 2 units
  // Move slow pointer by 1 unit
  // When fast pointer reaches the end, slow pointer points to the middle node
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
};
// Reverse Linked List
// Given the head of a singly linked list, reverse the list, and return the reversed list.
var reverseList = function (head) {
  // For reversing, we use 3 pointers
  // prev, curr, naxt
  // prev points to null, curr points to head, naxt points to curr.next
  // till curr traverse the complete list, we makes changes in the node
  // naxt points to curr.next
  // curr.next points to prev
  // prev points to curr
  // curr points to naxt
  let prev = null,
    curr = head,
    naxt;
  while (curr) {
    naxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = naxt;
  }

  head = prev;
  return head;
};

// Merge Two Sorted Lists
// You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.
var mergeTwoLists = function (list1, list2) {
  // Same as merging 2 sorted arrays
  // head is node which will build the merged LL
  // ans is node whose next points to head of merged LL as we have to return head of merged LL
  let head = new ListNode(null);
  let ans = new ListNode(-1);
  ans = head;
  if (list1 === null) {
    return list2;
  }

  if (list2 === null) {
    return list1;
  }

  while (list1 && list2) {
    // Merge node to next to head and move head and the node
    if (list1.val <= list2.val) {
      head.next = list1;
      head = list1;
      list1 = list1.next;
    } else {
      head.next = list2;
      head = list2;
      list2 = list2.next;
    }
  }

  // if list1 is empty means append whole list2 to head next
  if (list1 === null) {
    head.next = list2;
  }

  // if list2 is empty means append whole list1 to head next
  if (list2 === null) {
    head.next = list1;
  }

  // return ans.next as it points to head of merged LL
  return ans.next;
};

// Remove Duplicates from Sorted List
// Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.
var deleteDuplicates = function (head) {
  // Make a temp variable that points to head of LL
  // everytime we check if temp->val and temp->next->val are equal or not
  // if equal, store temp->next and points temp->next = temp->next->next
  // else simply move temp = temp->next;
  var current = head;

  while (current) {
    if (current.next !== null && current.val == current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
};

// Remove Duplicates from Sorted List II
// Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.
// Input: head = [1,2,3,3,4,4,5]
// Output: [1,2,5]
var deleteDuplicates = function (head) {
  // We will make a fake head whose next gives us head of result LL
  // We will check curr.next.val and curr.next.next.val
  // if equal, we will move curr.next to number where above condition does not satifies
  // otherwise, just move curr
  let fake = new ListNode(0);
  fake.next = head;
  let curr = fake;
  while (curr.next != null && curr.next.next != null) {
    if (curr.next.val === curr.next.next.val) {
      // this is our duplicate value
      let duplicate = curr.next.val;
      // check if curr.next has same value as duplicate, ignore curr.next everytime
      while (curr.next != null && curr.next.val == duplicate) {
        curr.next = curr.next.next;
      }
    } else {
      // else just move curr to next node
      curr = curr.next;
    }
  }

  return fake.next;
};

//  Linked List Cycle
// Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter. Return true if there is a cycle in the linked list. Otherwise, return false.
var hasCycle = function (head) {
  // We will have one fast pointer which moves by 2 units
  // one slow pointer which moves by 1 unit
  // if anytime, fast == slow means there is a cycle
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

//  Linked List Cycle II
// Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter. Do not modify the linked list.
var detectCycle = function (head) {
  // We will use slow and fast pointer approach to find the collision point
  // means where our cycle let slow and fast meet
  // Now we have another pointer entry == head, move slow and entry till
  // slow === entry, that time both points to tail of LL
  // return entry or slow
  let fast = head;
  let slow = head;
  let entry = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow == fast) {
      // collision point found, check for tail now
      while (entry != slow) {
        entry = entry.next;
        slow = slow.next;
      }

      return slow;
    }
  }

  // No such cycle detected
  return null;
};

//  Intersection of Two Linked Lists
// Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.
var getIntersectionNode = function (headA, headB) {
  // More optimal approach
  // We have 2 dummy nodes, d1 at l1 head and d2 at l2 head
  // We move both pointers together in l1 and l2 resp
  // if l1 becomes NULL, we take it to headB and continue iterating
  // if l2 becomes NULL, we take it to headA and continue iteration
  // What this does is, it reduces the differences between length of both lists and at the end, both dummy nodes are at same nodes of both list
  // So if there is no intersection, thet both points to NULL,otherwise both points to intersection point
  let dummy1 = headA;
  let dummy2 = headB;

  if (headA === null || headB === null) {
    return null;
  }

  while (dummy1 !== dummy2) {
    dummy1 = dummy1 === null ? headB : (dummy1 = dummy1.next);
    dummy2 = dummy2 === null ? headA : (dummy2 = dummy2.next);
  }

  return dummy1; // or dummy2
};

/*
// Another Approach
ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        // Optimised approach
        // We can use a set, in which we store the nodes
        // set stores only unique values
        // we do not need them to be sorted so we can use unordered_set
        // We store all values of list1 in set
        // now we traverse list2 and check if any node already found in set return it
        // else after iteration ends, return NULL
        unordered_set<ListNode*> st;

        while(headA != NULL)
        {
            st.insert(headA);
            headA = headA->next;
        }

        while(headB != NULL)
        {
            if(st.find(headB) != st.end())
            {
                return headB;
            }
            headB = headB->next;
        }

        return NULL;
    }
*/
