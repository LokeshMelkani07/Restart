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

// Next Greater Node In Linked List
// You are given the head of a linked list with n nodes. For each node in the list, find the value of the next greater node. That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it. Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.
// Input: head = [2,1,5]
// Output: [5,5,0]
class Stack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    this.stack.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.stack.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }
}

var nextLargerNodes = function (head) {
  // What are we doing is
  // We convert LL to an array first
  // Now we traverse that array, element by element
  // if our stack is empty, we push current index to stack and move in array
  // if stack is not empty, we check if index at top of stack has value is lesser than current arr[i] means arr[i] is next greater node for that stack.top index so push it in resultant array for stack.top index and pop that index out of stack
  // This thing should go on inside a loop so that we get next greater element for all smaller index inside stack
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }

  // Make a stack
  let st = new Stack();
  // Make result array
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    while (!st.isEmpty() && arr[st.peek()] < arr[i]) {
      let ele = st.pop();
      res[ele] = arr[i];
    }

    // otherwise if stack is empty or condition not satisfied, push index into stack
    // push 0 in res array for element whose condition does not satisfy this
    res[i] = 0;
    st.push(i);
  }

  return res;
};

// Remove Zero Sum Consecutive Nodes from Linked List
// Given the head of a linked list, we repeatedly delete consecutive sequences of nodes that sum to 0 until there are no such sequences. After doing so, return the head of the final linked list.  You may return any such answer. (Note that in the examples below, all sequences are serializations of ListNode objects.)
var removeZeroSumSublists = function (head) {
  // We will use concept of prefix sum
  // We will create a dummy node of Psum value 0 first
  // We will create a map where we will store the {prefixSum,curr_node}
  // prefixSum will be sum till curr_node
  // everytime we calculate prefix sum, we check if that exists inside map
  // if not, add it in the map
  // if yes, get node which is already present for that prefixSum, now delete all entries in between that node and current node
  // Make link after removing all those values
  const dummy = new ListNode();
  const mpp = new Map();
  dummy.next = head;
  let pSum = 0;
  // for 0 pSum we have dummy node so that dummy.next can point to empty list
  mpp.set(pSum, dummy);

  while (head) {
    pSum += head.val;
    // if we have that sum in map means all nodes between that node and current_node.next has sum = 0, so remove them and delete link
    if (mpp.has(pSum)) {
      // Delete all in-between nodes whose sum is 0 consecutively from map
      // remove there link also
      // get to the starting of that to_be_deleted nodes
      let actual_node = mpp.get(pSum).next;
      let sum = pSum;
      // till to_be_deleted nodes not equal to head, just remove them from map
      while (actual_node !== head) {
        sum += actual_node.val;
        // delete from map
        mpp.delete(sum);
        actual_node = actual_node.next;
      }

      // Once all removed, Draw link
      mpp.get(pSum).next = head.next;
    } else {
      // if sum not found, store that pSum and that node
      mpp.set(pSum, head);
    }

    head = head.next;
  }

  // dummy.next has head of our new LL so return it
  return dummy.next;
};

// Reverse Linked List II
// Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list. 1 <= left <= right <= n
// Input: head = [1,2,3,4,5], left = 2, right = 4
// Output: [1,4,3,2,5]
var reverseBetween = function (head, left, right) {
  // dummy node will help us getting head of result
  let dummy = new ListNode(0);
  dummy.next = head;
  let prevNode = dummy; // This will be at (left-1)th index node
  let prev = head; // this will be at left index node
  // Traverse to the point where LL to be reversed
  for (let i = 0; i < left - 1; i++) {
    prevNode = prevNode.next;
    prev = prev.next;
  }

  let curr = prev; // curr is at left index node
  // At the end of reversing the list, we need to link last rev node i.e right to prevNode and we need to link prev node to last node of LL so we store left index node at first_rev_node
  let first_rev_node = prev;
  // we will start reversing such that first node points to null which we will handle later
  let temp = null;

  // for right-left number of times, reverse the links
  for (let i = 0; i <= right - left; i++) {
    let nextNode = curr.next;
    curr.next = temp;
    temp = curr;
    curr = nextNode;
  }

  // Now reverse the links for first and last node of reversed LL
  first_rev_node.next = curr;
  prevNode.next = temp;

  // dummy.next has head of result LL
  return dummy.next;
};

// Odd Even Linked List
// Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list. The first node is considered odd, and the second node is even, and so on. Note that the relative order inside both the even and odd groups should remain as it was in the input. You must solve the problem in O(1) extra space complexity and O(n) time complexity.
// Input: head = [1,2,3,4,5]
// Output: [1,3,5,2,4]
var oddEvenList = function (head) {
  // We will create a separate list for odd and even nodes
  // As it is given that first node is odd one and we have to append all odd then all even in resultant list
  // We will build seperate list of odd and even then append odd.next = even
  if (head === null) {
    return head;
  }

  let odd = head;
  let even = head.next;
  let evenHead = even;

  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }

  // append odd followed by even list
  odd.next = evenHead;
  return head;
};

// Swap Nodes in Pairs
// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)
// Input: head = [1,2,3,4]
// Output: [2,1,4,3]
var swapPairs = function (head) {
  // We will use a dummy pointer whose next point to head
  let dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  let curr = head;

  // Take one pair at a time, reverse its links and jump to next pair
  while (curr !== null && curr.next !== null) {
    // this is next pair to swap
    let next_pair_to_be_swapped = curr.next.next;
    // this is second node of current_pair_to_be_swapped
    let second = curr.next;

    // change links
    second.next = curr;
    curr.next = next_pair_to_be_swapped;
    prev.next = second;

    // move prev to curr because position of head should also change based on swapped nodes
    prev = curr;
    curr = next_pair_to_be_swapped;
  }

  // dummy.next gives head of result LL
  return dummy.next;
};

// Reorder List
// You are given the head of a singly linked-list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln Reorder the list to be on the following form: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → … You may not modify the values in the list's nodes. Only nodes themselves may be changed.
// Input: head = [1,2,3,4]
// Output: [1,4,2,3]
var reorderList = function (head) {
  // We will get the middle of the LL
  // We will now have 2 LL, 0 to middle-1 say L1
  // middle to end say L2
  // we will reverse the L2 linkedlist
  // Now we have head of L1 and L2 and we merge them in starightforward manner
  // 1->2->3->4->5->6->7->8
  // L1 = 1->2->3->4->null
  // L2 = 5->6->7->8->null
  // reverse L2 = 8->7->6->5->null
  // merge(L1,L2) = 1->8->2->7->3->6->4->5->null

  if (head == null || head.next == null) return;

  // head of first LL
  let l1 = head;
  // head of next LL
  let prev = null;
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  console.log("middle ", prev);

  prev.next = null; // this is tail of first LL

  // slow has head of second LL so we use it to reverse the LL
  // reverse LL gives us head of reversed LL
  let l2 = reverse(slow);
  console.log("l2 ", l2);
  // Take both heads and merge them
  merge(l1, l2);
};

function middle(head) {
  let prev = null;
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  return prev;
}

function reverse(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    let nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }

  return prev;
}

function merge(l1, l2) {
  while (l1 !== null) {
    let l1_next = l1.next;
    let l2_next = l2.next;

    l1.next = l2;

    if (l1_next == null) {
      break;
    }

    l2.next = l1_next;
    l1 = l1_next;
    l2 = l2_next;
  }
}

// Remove Nth Node From End of List
// Given the head of a linked list, remove the nth node from the end of the list and return its head.
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]
var removeNthFromEnd = function (head, n) {
  // We make a dummy node pointing its next to the head
  // We make a slow and fast pointer both at dummy initially
  // We move fast pointer to n steps forward
  // Now we move both slow and fast pointer by 1 step each till fast->next != NULL or fast is not at the last node
  // Now our slow pointer is standing at node, whose next node is to be deleted
  // So slow->next = slow->next->next and return dummy->next as answer
  // This automatically handles our edge case also
  let dummy = new ListNode(0);
  dummy.next = head;
  let slow = dummy;
  let fast = dummy;

  let cnt = 0;
  while (cnt != n) {
    fast = fast.next;
    cnt++;
  }

  while (fast.next !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;

  return dummy.next;
};

// Merge k Sorted Lists
// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.
/*
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
*/
var mergeKLists = function (lists) {
  // We will simpy use merge sort
  // First we will merge first 2 LL of lists get result l3
  // now we merge l3 and next LL of lists get l4
  // now we merge l4 and next LL of lists get l5 and so on
  // we keep on doing this till lists.size == 1
  // At the end we just have one array left which contain our merged result
  if (lists.length == 0) {
    return null;
  }

  while (lists.length > 1) {
    // .shift() gives us first element of array
    let list1 = lists.shift();
    let list2 = lists.shift();

    let merged = merge(list1, list2);
    lists.push(merged);
  }

  return lists[0];
};

function merge(list1, list2) {
  // Simple merge sort
  let dummy = new ListNode(0);
  let head = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      dummy.next = list1;
      list1 = list1.next;
    } else {
      dummy.next = list2;
      list2 = list2.next;
    }

    dummy = dummy.next;
  }

  if (list1 == null) {
    dummy.next = list2;
  }

  if (list2 == null) {
    dummy.next = list1;
  }

  return head.next;
}
