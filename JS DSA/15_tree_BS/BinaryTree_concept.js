// Binary Tree
// It can have atmost 2 children that is 0,1,2 at max
// At any level i, number of nodes will be 2^i
// If height of tree is h, Total number of nodes in the tree will be 2^h-1
// We can store any tree in an Array also where if we say for index i, its left node will be at index 2*i and right node will be at 2*i + 1
class Node {
  // Any node has 3 things, value, left, right
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  // we mark root as null initially
  constructor() {
    this.root = null;
  }

  // Insert value in the tree
  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      // if there is no root then insert that node as root only
      this.root = newNode;
    } else {
      // if there is already a root, insert it at right position
      this.insertNode(this.root, newNode);
    }
  }

  // To insert node at any given position
  insertNode(node, newNode) {
    if (!node.left) {
      node.left = newNode;
    } else if (!node.right) {
      node.right = newNode;
    } else {
      // Recursive call to insert into left or right subtree randomly
      Math.random() < 0.5
        ? this.insertNode(node.left, newNode)
        : this.insertNode(node.right, newNode);
    }
  }

  // Print the tree using Inorder Traversal: left, root, right
  printInOrder(node = this.root) {
    if (node !== null) {
      this.printInOrder(node.left);
      console.log(node.value);
      this.printInOrder(node.right);
    }
  }

  // Print the tree using Preorder Traversal: root, left, right
  printPreOrder(node = this.root) {
    if (node !== null) {
      console.log(node.value);
      this.printPreOrder(node.left);
      this.printPreOrder(node.right);
    }
  }

  // Print the tree using PostOrder Traversal: left, right, root
  printPostOrder(node = this.root) {
    if (node !== null) {
      this.printPostOrder(node.left);
      this.printPostOrder(node.right);
      console.log(node.value);
    }
  }
}

// Traversals in BST
// Inorder Traversal - Left, Root, Right
var inorderTraversal = function (root) {
  const res = [];
  traverse(root);
  return res;

  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    res.push(node.val);
    traverse(node.right);
  }
};

var inorderTraversal = function (root) {
  // Iterative Inorder Traversal
  const output = [];

  if (root === null) {
    return output;
  }

  /**
   * The goal is to maintain a stack of nodes to visit as we traverse
   * down the tree. As we traverse down, We go left and push all the
   * left nodes first in the stack. Once we reach to the bottom, we
   * store the node value and traverse right.
   *           1
   *         /   \
   *        2     3    inorder traversal: 4 -> 2 -> 5 -> 1 -> 6 -> 3
   *       / \   /     (left -> root -> right)
   *      4   5 6
   */
  const stack = [];
  let curr = root;

  while (curr !== null || stack.length !== 0) {
    if (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    } else {
      curr = stack.pop();
      output.push(curr.val);
      curr = curr.right;
    }
  }

  return output;
};

// PostOrder Traversal - Left, Right, Root
var postorderTraversal = function (root) {
  let res = [];
  travel(root);
  return res;

  function travel(root) {
    if (!root) return;
    travel(root.left);
    travel(root.right);
    res.push(root.val);
  }
};

var postorderTraversal = function (root) {
  // Iterative Post Order
  if (!root) return [];
  let stack = [],
    res = [];
  stack.push(root);
  while (stack.length) {
    let node = stack[stack.length - 1];
    // Go to extreme left
    if (node.left) {
      stack.push(node.left);
      // Marking them null
      node.left = null;
    }
    // if left is null, go to right then again go to extreme left
    else if (node.right) {
      stack.push(node.right);
      node.right = null;
    }
    // push whatever at top of stack and pop
    else res.push(stack.pop().val);
  }
  return res;
};

// PreOrder Traversal - Root, Left, Right
var preorderTraversal = function (root) {
  const res = [];
  travel(root);
  return res;

  function travel(root) {
    if (!root) return;
    res.push(root.val);
    travel(root.left);
    travel(root.right);
  }
};

var preorderTraversal = function (root) {
  // Iterative PreOrder - root, left, right
  // We are pushing right first then left because stack is LIFO
  // So to get left first we will push it at last
  if (!root) return [];
  let stack = [],
    res = [];
  stack.push(root);
  while (stack.length) {
    let node = stack.pop();
    res.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return res;
  // Time Complexity: O(n)
  // Space Complexity: O(n)
};

// Height of a Binary Tree
// Maximum Depth of Binary Tree
// Given the root of a binary tree, return its maximum depth.A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
var maxDepth = function (root) {
  // Recursive Solution
  // 1 + max(left subtree ki height, right subtree ki height)
  if (root === undefined || root === null) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

var maxDepth = function (root) {
  // For Iterative method
  // We can do Level Order Traversal
  // Each depth we will make a variable and increment it
  // We will use Queue for it
  if (!root) return 0;
  let depth = 0;
  // Making a queue
  const queue = [root];

  while (queue.length) {
    depth++;
    const len = queue.length;
    // for each level we make certain calculations
    for (let i = 0; i < len; i++) {
      if (queue[i].left) queue.push(queue[i].left);
      if (queue[i].right) queue.push(queue[i].right);
    }

    // To remove the first element from the queue, we use below operation
    // To match FIFO functionality of queue
    queue.splice(0, len);
  }

  return depth;
};

// Count Complete Tree Nodes / Size of Binary Tree
// Given the root of a complete binary tree, return the number of the nodes in the tree.
var countNodes = function (root) {
  // Just think like if i get answer of left subtree and right subtree
  // Will i be able to find total answer?
  // Yes, i will do left + right + 1 for root
  // think of base case now
  // what can it be? node is null means do not include it in answer so return 0
  // so just use recursion and find the answer
  if (root == null) {
    return 0;
  }

  return countNodes(root.left) + countNodes(root.right) + 1;
};

// Maximum Binary Tree
// You are given an integer array nums with no duplicates. A maximum binary tree can be built recursively from nums using the following algorithm: Create a root node whose value is the maximum value in nums. Recursively build the left subtree on the subarray prefix to the left of the maximum value. Recursively build the right subtree on the subarray suffix to the right of the maximum value. Return the maximum binary tree built from nums.
/*
Input: nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,1]
Explanation: The recursive calls are as follow:
- The largest value in [3,2,1,6,0,5] is 6. Left prefix is [3,2,1] and right suffix is [0,5].
    - The largest value in [3,2,1] is 3. Left prefix is [] and right suffix is [2,1].
        - Empty array, so no child.
        - The largest value in [2,1] is 2. Left prefix is [] and right suffix is [1].
            - Empty array, so no child.
            - Only one element, so child is a node with value 1.
    - The largest value in [0,5] is 5. Left prefix is [0] and right suffix is [].
        - Only one element, so child is a node with value 0.
        - Empty array, so no child.
*/

var constructMaximumBinaryTree = function (nums) {
  // We will solve for one case, rest recursion will do
  // base case will be when nums array is empty
  if (nums.length === 0) return null;
  // get max value from array
  let max = Math.max(...nums);
  // get index of that max element
  let index = nums.indexOf(max);
  // make that max element at root
  let head = new TreeNode(max);
  // now send left subtree to left of root
  head.left = constructMaximumBinaryTree(nums.slice(0, index));
  // now send right subtree to right of root
  head.right = constructMaximumBinaryTree(nums.slice(index + 1));
  // return root at the end
  return head;
};

// Find Maximum node in a binary tree
function findMaxNode(root) {
  // Let say we have answer to left subtree say 9, we have answer to right subtree say 7 and we have value of current standing node say 5
  // How to find maximum of them?
  // max(currentValue, max(leftAnswer,rightAnswer))
  // Just do the same and base case will be when we reach leaf node
  // To handle it, if root==null, return Minimum answer you can return so that during comparison it automatically destroys down
  // TC: O(n), SC: O(height of tree)
  if (root == null) {
    return Math.min;
  }

  return Math.max(root.value, Math.max(findMaxNode(root.left, root.right)));
}

// Binary Tree Level Order Traversal
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[9,20],[15,7]]
var levelOrder = function (root) {
  // We can use queue for this purpose
  let queue = [root];
  let res = [];
  if (root == null) return res;

  // Everytime we explore a level and print it
  while (queue.length != 0) {
    let len = queue.length;
    let order = [];
    for (let i = 0; i < len; i++) {
      let ele = queue.shift();
      if (ele.left) {
        queue.push(ele.left);
      }
      if (ele.right) {
        queue.push(ele.right);
      }
      order.push(ele.val);
    }
    res.push(order);
  }

  return res;
};

// Left View of a binary Tree
// It means when we look the tree from the left, whatever we see it left view
// To implement it, we can do one thing, that is we do level order traversal and in each level the first node we encounter will be its left view
function leftView(root) {
  const result = [];
  if (!root) return result;

  let queue = [root];

  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === 0) {
        result.push(node.value); // Add the first node (leftmost) at each level
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

// Left view Recursively
// We can do it recursively also where we will use a hashmap to store the first node of each level, we will go both left and right but if for any level, a value is already present in the map, we ignore it
// if for any level, any value is not present in the map we store it as it will be first value i.e left view for us
function leftView(root) {
  // Map stores level as keys and nodes as values
  let leftViewMap = new Map();

  function leftViewRecursive(node, level) {
    if (!node) return;

    if (!leftViewMap.has(level)) {
      leftViewMap.set(level, node.value); // Store the first node of each level
    }

    leftViewRecursive(node.left, level + 1);
    leftViewRecursive(node.right, level + 1);
  }

  // initially we send level as 0
  leftViewRecursive(root, 0);
  // print all values from map
  return [...leftViewMap.values()]; // Convert Map values to an array
}

// Right View of a binary Tree
// It means when we look the tree from the right, whatever we see it right view
// To implement it, we can do one thing, that is we do level order traversal and in each level the last node we encounter will be its right view
function rightView(root) {
  const result = [];
  if (root) return result;

  let queue = [root];

  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) {
        result.push(node.value); // Add the last node (rightmost) at each level
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

// Right View Recursive
// Here we will do same thing but we go to right node first as we need right view
function rightView(root) {
  const rightViewMap = new Map();

  function rightViewRecursive(node, level) {
    if (!node) return;

    rightViewMap.set(level, node.value); // Overwrite nodes at each level, last node wins

    rightViewRecursive(node.right, level + 1);
    rightViewRecursive(node.left, level + 1);
  }

  rightViewRecursive(root, 0);
  return [...rightViewMap.values()]; // Convert Map values to an array
}

// Top View and Bottom View of a Binary Tree
// Top view means all nodes we see when we see the Binary Tree from top
// Bottom view means all nodes we see when we see the Binary Tree from bottom
// If 2 nodes are overlapping then according to the convention, node coming later in the level order traversal from both will be considered in the final answer
// We will use the concept of Horizontal distance where we will use level order traversal
// We can consider root as level 0 then we consider left to it as -1 then again left to it as -2 and so on
// We can consider root as level 0 then we consider right to it as +1 then again right to it as +2 and so on
// Now during printing we can print first node of any level for top view and last node of any level as bottom view
// We will maintain a hashmap to store first element of each level and another map to store last element of each level
// We will use level order traversal to get the element at each level
function topView(root) {
  // if root is null, return []
  if (!root) return [];

  // Make a queue where we store {node,horizontal-distance}
  // consider hd for root = 0
  const queue = [{ node: root, hd: 0 }]; // hd: Horizontal distance from root
  // map to store node and hd for first element of each level
  const topViewMap = new Map();

  while (queue.length > 0) {
    const { node, hd } = queue.shift();

    // if map do not has any element for this hd, store it
    if (!topViewMap.has(hd)) {
      topViewMap.set(hd, node.value); // Store the first node of each horizontal distance
    }

    // go to left hd-1
    if (node.left) queue.push({ node: node.left, hd: hd - 1 });
    // go to right hd+1
    if (node.right) queue.push({ node: node.right, hd: hd + 1 });
  }

  // map values has all top view elements of tree
  return [...topViewMap.values()];
}

// Bottom View
function bottomView(root) {
  if (!root) return [];

  const queue = [{ node: root, hd: 0 }]; // hd: Horizontal distance from root
  const bottomViewMap = new Map();

  while (queue.length > 0) {
    const { node, hd } = queue.shift();

    // overwrite all values for each hd so that last value will be what we need for bottom view
    bottomViewMap.set(hd, node.value); // Overwrite nodes at each horizontal distance

    if (node.left) queue.push({ node: node.left, hd: hd - 1 });
    if (node.right) queue.push({ node: node.right, hd: hd + 1 });
  }

  return [...bottomViewMap.values()];
}

// Convert Binary Tree to Doubly Linkedlist where you have to print inorder traversal of binary tree as double linkedlist where left node of any root can be considered as its previous pointer and right node can be considered as next pointer, return head of such linkedlist
function TreeNode(value) {
  // Treenode will have left and right as null and a node value
  return { value, left: null, right: null };
}

function ListNode(value) {
  // node of a LL will have prev and next and value
  return { value, prev: null, next: null };
}

function convertToDLL(root) {
  // let prev and head = null initially
  let prevNode = null;
  let head = null;

  function inorderTraversal(node) {
    // its a inorder so start from left, node, right
    if (!node) return;

    // go to left
    inorderTraversal(node.left);

    // Make a new node
    const newNode = ListNode(node.value);
    if (!head) {
      // if there is no head, make new node as head of LL
      head = newNode;
    } else {
      // if there is head already, then make new node as next to prevNode
      prevNode.next = newNode;
      newNode.prev = prevNode;
    }
    // update previous node
    prevNode = newNode;

    // go to right now
    inorderTraversal(node.right);
  }

  // call the function
  inorderTraversal(root);
  // return head
  return head;
}

// Diameter of Binary Tree
// Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.
var diameterOfBinaryTree = function (root) {
  let ans = 0;
  // we will implement height of BT function only with slight modification
  // We will answer of left subtree, we have answer of right subtree, we club them and get maximum such value
  // We have height of left subtree, we have height of right subtree. It is given that diameter means "length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them." so we just club both heights and store maximum such answer
  function height(root) {
    if (root === null) return 0;

    let lt = height(root.left);
    let rt = height(root.right);

    // We will store max number of edges in the answer
    ans = Math.max(ans, lt + rt);
    return 1 + Math.max(lt, rt);
  }

  height(root);
  return ans;
};

// Find the Lowest Common Ancestor Between Two Tree Nodes
// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
// Ancestor means father of any node, any node can be its ancestor itself also
var lowestCommonAncestor = function (root, p, q) {
  // Brute force
  // We can find path from root -> p and store it in a Array
  // We can find path from root -> q and store it in a array
  // Now we can match element by element in the array, last common element between both arrays will be our LCA
  // Optimised Approach
  // We will Traverse left and right of a node
  // Everytime we check if from left we get null and from right we get either of p or q, we return p or q
  // If for any node we get p or q from left and p or q from right means that can be a possible LCA means below that node, there are p or q in its left and right so return that node in this case
  if (root === null || root === p || root === q) {
    // if you have encountered null, return null
    // if you have reached p or q, no need to go futher, return p or q itself
    return root;
  }

  // go to left
  var left = lowestCommonAncestor(root.left, p, q);
  // go to right
  var right = lowestCommonAncestor(root.right, p, q);

  // if left is null, return right
  if (left == null) {
    return right;
  }
  // if right is null, return left
  else if (right == null) {
    return left;
  }
  // if both not null, return that node
  else {
    return root;
  }
};

// Minimum time to burn a Tree starting from a Leaf node
// Given a binary tree and a leaf node from this tree. It is known that in 1s all nodes connected to a given node (left child, right child, and parent) get burned in 1 second. Then all the nodes which are connected through one intermediate get burned in 2 seconds, and so on. The task is to find the minimum time required to burn the complete binary tree.
// What is our approach
// minimumTimeToBurn is our main function where we are given a root node and start node from where we have to start burning the tree
// We are first of all mapping all nodes with their parents in a map using a queue, for that purpose we have made mappingParentToEachNode() which fill the map for us and returns the location of 'start' node in the tree
// Now we have mapping of all parents, we can traverse left and right and we know one thing that is given and i.e "all nodes connected to a given node (left child, right child, and parent) get burned in 1 second"
// So we can go left and right, now we have parent also, let us start calculating time
// we have findingTime() function which takes parent map and location of that node, we use BFS technique to pick a level and try to go all left right and parent of that node and check if we have burnt anyone??
// To check if we have burnt anyone from left,right,parent. We will take a variable fl which is initially 0, if we burn anyone we make if 1.
// if at end of one level iteration, if fl=1 means we have burnt somebody, maxi++ means time++
// Now to make sure that we do not burn the node already burnt, we make a visited object and mark all nodes burnt already so that we do not travel them again
// this approach takes O(n) for level order 2 times + o(n) for map and SC: O(n) for queue 2 times and visited object and map
function minimumTimeToBurn(root, start) {
  if (!root) return 0;
  // map to store parent mapping
  let mpp = new Map();
  // get the mapping done and return the location of start node in tree
  let targetAddressNode = mappingParentToEachNode(root, start, mpp);
  // return us the time required to burn complete tree from start node
  let res = findingTime(mpp, targetAddressNode);
  return res;
}

function mappingParentToEachNode(root, start, mpp) {
  // This function gives us the mapping
  let res;
  let queue = [root];

  while (queue.length > 0) {
    let ele = queue.shift();
    if (ele.val == start) {
      // if its the same element as given one, store it to return it later
      res = ele;
    }
    if (ele.left) {
      // if there is left means we have one child, store it in map
      mpp[ele.left] = ele;
      // push it in queue
      queue.push(ele.left);
    }
    if (ele.right) {
      // if there is right means we have one more child, store it in map
      mpp[ele.right] = ele;
      // push it in queue
      queue.push(ele.right);
    }
  }

  // This will map all nodes with their parents and return us the location of given leaf node
  return res;
}

function findingTime(mpp, node) {
  // Let us calculate time to burn
  // Again we do bfs
  let time = 0;
  // making a visited to store already-burnt nodes
  let visited = {};
  // make a queue for bfs
  let queue = [node];
  // mark given node as visited
  visited[node] = 1;

  while (queue.length != 0) {
    // get one level
    let sz = queue.length();
    // below variable tells if we have burnt somebody or not. for each new level we make it 0 again
    let burnt_somebody = 0;
    for (let i = 0; i < sz; i++) {
      // cover all elements of that level in one go
      let ele = queue.shift();
      if (ele.left && !visited[ele.left]) {
        // if there is left which is unvisited, mark it visited
        visited[ele.left] = 1;
        // push in queue
        queue.push(ele.left);
        // burnt it so increment value
        burnt_somebody = 1;
      }
      if (ele.right && !visited[ele.right]) {
        // same for right
        visited[ele.right] = 1;
        queue.push(ele.right);
        burnt_somebody = 1;
      }
      if (mpp[ele] && !visited[mpp[ele]]) {
        // check if it has a parent. if yes, do the same with it
        visited[mpp[ele]] = 1;
        queue.push(mpp[ele]);
        burnt_somebody = 1;
      }
    }
    // if burnt_somebody = 1 means we have burnt somebody so time++
    if (burnt_somebody) time++;
  }

  // return time
  return time;
}

// Binary Tree Paths
// Given the root of a binary tree, return all root-to-leaf paths in any order. A leaf is a node with no children.
var binaryTreePaths = function (root) {
  // We will find a node for which there is no left and right means its a leaf node so push it in result
  let result = [];
  traverse(root, "");

  function traverse(node, path) {
    if (!node) return;

    if (!node.left && !node.right) {
      result.push(path + node.val);
      return;
    }
    traverse(node.left, path + node.val + "->");
    traverse(node.right, path + node.val + "->");
  }
  return result;
};

// Print all leaf nodes of a tree
// Leaf nodes are nodes which do not have children
class Node {
  constructor() {
    this.data = 0;
    this.left = null;
    this.right = null;
  }
}

// Function to print leaf
// nodes from left to right
function printLeafNodes(root) {
  // If node is null, return
  if (root == null) return;

  // If node is leaf node, print its data
  if (root.left == null && root.right == null) {
    document.write(root.data + " ");
    return;
  }

  // If left child exists, check for leaf
  // recursively
  if (root.left != null) printLeafNodes(root.left);

  // If right child exists, check for leaf
  // recursively
  if (root.right != null) printLeafNodes(root.right);
}

// Utility function to create a new tree node
function newNode(data) {
  var temp = new Node();
  temp.data = data;
  temp.left = null;
  temp.right = null;
  return temp;
}

// Let us create binary tree
var root = newNode(1);
root.left = newNode(2);
root.right = newNode(3);
root.left.left = newNode(4);
root.right.left = newNode(5);
root.right.right = newNode(8);
root.right.left.left = newNode(6);
root.right.left.right = newNode(7);
root.right.right.left = newNode(9);
root.right.right.right = newNode(10);

// Print leaf nodes of the given tree
printLeafNodes(root);

// Invert Binary Tree
// Given the root of a binary tree, invert the tree, and return its root.
/*
                1
              /    \
            2        3
          /   \    /   \
        4      5  6     7
*/

/*
                1
              /    \
            3        2
          /   \    /   \
        7      6  5     4
*/

var invertTree = function (root) {
  // We just need to swap left and right subtree at each level
  // Pick each node, swap left and right node everytime
  // then move to the left and right
  if (root == null) return root;

  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  if (root.left) invertTree(root.left);
  if (root.right) invertTree(root.right);

  return root;
};

// Sum of Left Leaves
// Given the root of a binary tree, return the sum of all left leaves. A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.
// Input: root = [3,9,20,null,null,15,7]
// Output: 24
// Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.
var sumOfLeftLeaves = function (root) {
  // Using BFS Traversal
  let sum = 0,
    res = [];

  let node,
    queue = [root];
  while (queue.length) {
    node = queue.shift();
    if (node.left) {
      if (!node.left.left && !node.left.right) sum = sum + node.left.val;
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }

  return sum;
};

var sumOfLeftLeaves = function (root, left = false) {
  // Using DFS
  // if root has no left and right children and left = true means its a left leave so return its value
  if (!root) {
    return 0;
  }

  if (!root.left && !root.right) return left ? root.val : 0;
  // On going right, we mark left as default i.e false
  return sumOfLeftLeaves(root.left, true) + sumOfLeftLeaves(root.right);
};

// Valid Binary Search Tree?
// A valid binary search tree (BST) has ALL left children with values less than the parent node, and ALL right children with values greater than the parent node.
// Everything on the right of a Node should be greater than it
// Everything on the left of a Node should be lesser than it
// Algo
// What we will do is, we have root, We make a range for every node i.e for root its [-Infinity, +Infinity]
// We check if root.val is between range, if yes, go to left
// Now range becomes [-Infinity, root.val] and for right node range becomes [root.val, +Infinity]
// We keep on Traversing the tree like that and if both left && right return true at the end, means its a valid BST
var isValidBST = function (root) {
  return helper(root, Math.max, Math.min);
};

function helper(root, maxi, mini) {
  if (root == null) return true;

  if (root.val >= maxi || root.val <= mini) return false;

  return (
    helper(root.left, root.val, mini) && helper(root.right, maxi, root.val)
  );
}
