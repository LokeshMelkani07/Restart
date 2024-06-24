// Binary Search Tree
// It is a special type of binary tree which has all left elements smaller than root and all right elements greater than root. This condition is true for all nodes
// Fact: Inorder Traversal of a BST gives a sorted array
// In a balanced binary Search Tree, (balanced = every node has 2 children). Searching, Inserting, Deleting takes O(logn)
// Whereas In HashTable, all operations takes O(1)
// But still we use BST because if we want elements in a range say 10-30, this operation is also done in logn in BST whereas it can take O(n) in Hashtable
// Similarly In LL, Inserting can take O(n), Searching can take O(n), Deleting can take O(1) if head/ O(n) in worst case
class TreeNode {
  // Any Node contains, its value, left and right
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  // initially root == null
  constructor() {
    this.root = null;
  }

  // While inserting any value in BST, we take root as reference and insert that value accordingly
  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  // Insert node at its right position such that left of any node is always smaller than itself, right of any node is always greater than itself
  insertNode(node, value) {
    // TC: O(height of tree), SC: O(height)
    if (!node) {
      // if by going left, right of root we have reached a state where there is not value present, thats the place. Make a new node there and insert
      return new TreeNode(value);
    }

    // if value of new node is smaller than root, insert it at root.left
    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      // if value of new node is greater than root, insert it at root.right
      node.right = this.insertNode(node.right, value);
    }

    // return root
    return node;
  }

  // Iterative Insertion in BST
  // We will have a root and value
  // We will Iteratievely go to the value where we can insert the node and then insert it
  insertNodeIterative(node, key) {
    // TC: O(height of tree), SC: O(1)
    let newNode = new TreeNode(key);
    let currNode = root;
    let actualParentOfNodeToBeInserted = null;

    while (currNode != null) {
      // Going to the right position to insert the node
      // currNode denotes the position where newNode will be inserted
      // actualParentOfNodeToBeInserted denotes the parent of that newNode to be inserted
      actualParentOfNodeToBeInserted = currNode;
      if (currNode.value < key) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }

    // if we are here means we have currNode = null now means there is a position below this node where we can insert the new node
    if (actualParentOfNodeToBeInserted == null) {
      return newNode;
    } else if (actualParentOfNodeToBeInserted > key) {
      actualParentOfNodeToBeInserted.left = newNode;
    } else {
      actualParentOfNodeToBeInserted.right = newNode;
    }

    return node;
  }

  // For searching we just checking root and value and go left or right accordingly
  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (!node) {
      // if there is no root, return false
      return false;
    }

    if (value === node.value) {
      // if value found
      return true;
    } else if (value < node.value) {
      // if value is smaller, go to left
      return this.searchNode(node.left, value);
    } else {
      // else go to right
      return this.searchNode(node.right, value);
    }
  }
}

// Delete Node in a BST
// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST. Basically, the deletion can be divided into two stages: Search for a node to remove. If the node is found, delete the node.
var deleteNode = function (root, key) {
  // deleting in a BST can be easy and difficult both
  // When we have to delete a leaf node, its easy, just search for it and delete it
  // When we have to delete any node whose left is free but it has a right subtree then also its manageable. just that connect the right subtree of nodeToBeDeleted to left of parent of nodeToBeDeleted
  // It become complex when we have to delete any node which has a left subtree and right subtree both. In that condition what will we do to left and right when we delete the node becomes a headache
  // In this case, we need to insert somebody in place of nodeToBeDeleted such that the property of BST is maintained.
  // We can think of Inorder pre or Inorder successor here.
  // We know, Inorder Traversal of BST gives a sorted array so If we place Inorder pre of nodeToBeDeleted which is maximum element in its left subtree / or Inorder successor of nodeToBeDeleted which is minimum element in its right subtre, then our work is done
  // In this approach we will go for Inorder successor means minimum element of right subtree
  // One of the property of Inorder successor is that, its left will always be null because we know its the minimum element in that subtree
  return deletingInBST(root, key);
};

function deletingInBST(root, key) {
  if (root === null) {
    return null;
  }

  if (root.val > key) {
    // root.left is used so that attach root.left with whatever calculation we have done after deleting, just make it as it is
    root.left = deletingInBST(root.left, key);
  } else if (root.val < key) {
    root.right = deletingInBST(root.right, key);
  } else {
    // if we are at root and key == root.val means we have to delete same element we are standing in, In this case 3 cases arise
    // there is no left subtree, only right subtree
    // there is no right subtree, only left subtree
    // There are both left and right so use inorder succ approach
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    } else {
      // both children present
      // We will go to leftmost element that is minimum element of right subtree and place it in place of root
      let tempNode = findInorderSuccessor(root.right);
      root.val = tempNode;
      // Now we need to delete that minimum right subtree node also from its earlier poisiton so we again call the deleting function for that value this time
      root.right = deletingInBST(root.right, tempNode);
    }
  }

  return root;
}

function findInorderSuccessor(node) {
  // we know inorder successor will be the leftmost node of right subtree
  let curr = node;
  let value = node.val;
  while (curr != null) {
    value = curr.val;
    curr = curr.left;
  }

  return value;
}

// Validate Binary Search Tree
// Given the root of a binary tree, determine if it is a valid binary search tree (BST).
// A valid BST is defined as follows:
// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.
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

// Floor and Ceil of a BST
// A key will be given to us
// Floor value means any such greatest value in BST which is smaller than key in BST
// Ceil means any such value which is smallest in BST and is greater than key in BST
// One approach, we can do Inorder Traversal of BST which will result in Sorted Array and search for key in it
// if key found, element before it = floor, element after it = ceil
// if key not found, element just greater than it = ceil, just smaller than it = floor
// But this approach takes space, recursion also takes space
// Let us try to do it iteratively
// We will apply something like Binary Search in BST, where we see a element, we have 2 variable floor = null, ceil = null
// if(root.val) > key, we store floor = root.val and go root.left
// if(root.val) < key, we store ceil = root.val and go root.right
function floor(root, value) {
  let floorValue = null;
  let current = root;

  while (current !== null) {
    if (value === current.value) {
      return current.value;
    } else if (value < current.value) {
      current = current.left;
    } else {
      // if we have greater value, store it and go to more right for more greater value
      floorValue = current.value;
      current = current.right;
    }
  }

  return floorValue;
}

function ceil(root, value) {
  let ceilValue = null;
  let current = root;

  while (current !== null) {
    if (value === current.value) {
      return current.value;
    } else if (value < current.value) {
      // if we have smaller value, store it and go to more right for more smaller value
      ceilValue = current.value;
      current = current.left;
    } else {
      current = current.right;
    }
  }

  return ceilValue;
}

// Two Sum IV - Input is a BST
// Given the root of a binary search tree and an integer k, return true if there exist two elements in the BST such that their sum is equal to k, or false otherwise.
var findTarget = function (root, k) {
  // We will just use a set to store element
  // if we are at a element and we check if sum - element is already present inside set means there is a element in tree which combines with current element and forms given sum
  // if not found, simply add it in set
  // go to left, go to right
  // if we reach null this way means no element is found return false
  let st = new Set();
  return twoSum(root, k, st);
};

function twoSum(root, k, st) {
  if (root == null) {
    return false;
  }

  // go to left
  if (twoSum(root.left, k, st)) {
    return true;
  }

  // check the set
  if (st.has(k - root.val)) {
    return true;
  }

  // if not found in set, add it
  st.add(root.val);

  // go to right
  return twoSum(root.right, k, st);
}

// Inorder Traversal in a BST
function inorderTraversal(root) {
  // Inorder Traversal of a BST gives a sorted array and we know in a BST, all smaller values are in left so first go the extreme left, store all values in stack. now pop them out one by one and store in answer, go to right
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      // go to extreme left and keep on pushing in stack
      stack.push(current);
      current = current.left;
    }

    // once we are at extreme left, pop
    current = stack.pop();
    // store
    result.push(current.value);
    // go to right
    current = current.right;
  }

  return result;
}

// Recursive
function inorderTraversal(root) {
  const result = [];
  inorderHelper(root, result);
  return result;
}

function inorderHelper(node, result) {
  if (!node) return;

  inorderHelper(node.left, result);
  result.push(node.value);
  inorderHelper(node.right, result);
}
