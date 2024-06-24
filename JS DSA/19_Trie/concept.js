// Trie
// In a Binary Tree we have limitation of putting only 2 childrens
// Whereas in a Trie we are free to put as many childrens to a node as possible for that purpose
// Any TrieNode has a map and variable isEnd
// map to store all characters node by node like a tree and isEnd tells that this is the end of certain word
// Let say we store apple so we start from root node, we go character by character and we see if root ke map has "a"
// if yes, go inside it using node.children.get(chars)
// if not, make a new TrieNode there, this was we keep on storing node by node and at the last node we mark isEnd = true to mark the end of a word
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndofWord = false;
  }
}

var Trie = function () {
  this.root = new TrieNode();
};

Trie.prototype.insert = function (word) {
  // Before inserting start from root
  // We are using map to store words
  let node = this.root;
  for (let chars of word) {
    // go to each character
    if (!node.children.has(chars)) {
      // if that character node is not present, make new node for that character and go to depth of its
      node.children.set(chars, new TrieNode());
    }

    // go to that new node and again add more words till whole word gets added
    node = node.children.get(chars);
  }

  // at last node, mark isEnd = true to mark the end of the word
  node.isEndofWord = true;
};

Trie.prototype.search = function (word) {
  // Start from root and move char by char if found, if not found return false
  let current = this.root;

  for (let chars of word) {
    if (current.children.has(chars)) {
      current = current.children.get(chars);
    } else {
      return false;
    }
  }

  return current.isEndofWord;
};

Trie.prototype.startsWith = function (prefix) {
  // start from root and keep on checking word by word, if we have travelled all the characters of prefix successfully inside trie
  // means we have found a word with that prefix
  let current = this.root;

  for (let chars of prefix) {
    if (current.children.has(chars)) {
      current = current.children.get(chars);
    } else {
      return false;
    }
  }

  return true;
};

// Maximum XOR of Two Numbers in an Array
/*
Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.
Example 1:
Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.
*/
class TrieNode {
  constructor() {
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(num) {
    let node = this.root;
    // How will be insert the num
    // We will insert from 31st bit to 0th bit
    // Insert bits of num into the trie
    for (let i = 31; i >= 0; i--) {
      let bit = (num >> i) & 1;
      if (!node.children.has(bit)) {
        node.children.set(bit, new TrieNode());
      }
      node = node.children.get(bit);
    }
  }

  findMaxXor(num) {
    let node = this.root;
    let ans = 0;
    for (let i = 31; i >= 0; i--) {
      let bit = (num >> i) & 1; // Get the i-th bit of num
      let invertBit = bit ^ 1; // Invert it as 0^1 = 1, 1^1 = 0 so we have used bit^1 to invert it
      if (node.children.has(invertBit)) {
        // If the inverted bit exists in the trie, update ans accordingly
        ans |= 1 << i; // we know max XOR will be something like 1111....111 so we add 1 in ith place in the ans to construct maximum XOR using num so we have use | operation and 1<<i
        node = node.children.get(invertBit);
      } else {
        // if inverted bit not found, go with whatever in hand
        node = node.children.get(bit);
      }
    }
    return ans;
  }
}

var findMaximumXOR = function (nums) {
  // How to get maximum XOR for a given number say number = 1000 (8)
  // We will get maximum XOR if we take XOR of 1000 (8) with 0111(7)
  // 8 ^ 7 = 15
  // So we will store binary representation of every element in array inside a trie
  // Now trie just contains 0 and 1, it does not contain isEnd = true/false because we need that variable only when we are searching anything but here we do not search anything so we only store 0 and 1 inside TrieNode
  // We fill all the array elements inside Trie
  // We now traverse element by element and check for a particular element, which other element can give maximum XOR
  // how to find it? The element for maximum XOR will be the one whose bits will be reverse of current element so look for it in the trie
  // say we are at 1000(8) we start from 1 and we see if current node has something corresponding to !1 = 0
  // if yes go to it, if no, we have no other option just go with it
  // At the end we have the anwer for 1000(8) store it, now go to next element and try to find maximum such XOR
  let trie = new Trie();
  for (let num of nums) {
    // insert all in the trie
    trie.insert(num);
  }
  let maxAns = 0;
  for (let num of nums) {
    // now again traverse all elements and get their maxXor from trie
    let ans = trie.findMaxXor(num);
    maxAns = Math.max(maxAns, ans);
  }
  return maxAns;
};
