// Binary Search Tree
/*
every left child has a smaller value than its parent
every right child has a larger value than its parent
every node can contain from 0 to 2 children.
*/

// Binary Tree Node is represented as
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
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

// Get Path Between root to a node in a Binary Tree
// Given a Binary Tree root and a integer x, return path from root to that node
var binaryTreePaths = function (root, x) {
  // We will use a Recursive approach where
  // We store value in result array, then first go to the left, if we reach null and we do not find x, we return false
  // Then we go to right and do the same, if found x we return true else return false
  // Now if any one of the call from left or right for a node gives true, we return true
  // if both call are false means both left and right subtree of that node does not contain x means its a waste so pop it out of ans array and return false for that call
  let res = [];
  if (root == null) return res;
  getPath(root, x, res);
  return res;
};

function getPath(root, x, res) {
  if (root == null) {
    // if we have reached null, return false
    return false;
  }

  // else push that value in ans array
  res.push(root.val);

  // if that value matches x, return true
  if (root.val === x) {
    return true;
  }

  // if either of left-subtree or right-subtree gives true, means the node is there in the subtree so return true
  if (getPath(root.left, x, res) || getPath(root.right, x, res)) {
    return true;
  }

  // else pop that node out from result array
  res.pop();
  return false;
}

// Find the Lowest Common Ancestor Between Two Tree Nodes
// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
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
