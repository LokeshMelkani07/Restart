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
