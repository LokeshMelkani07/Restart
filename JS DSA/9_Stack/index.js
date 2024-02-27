// Stack in JS
// Stack Implementation using Array
// LIFO Data Structure which has push(), pop(), top()
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

const stack = new Stack();
stack.push(10);
stack.push(12);
stack.push(13);
stack.push(15);
stack.push(17);
stack.pop();
console.log(stack.peek());
console.log(stack);

// Stack implmentation using Linkedlist
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class StackLinkedList {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop() {
    if (this.isEmpty()) {
      return "List is already empty";
    }
    const item = this.top.data;
    this.top = this.top.next;
    this.size--;
    return item;
  }

  peek() {
    return this.top.data;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const stack1 = new StackLinkedList();
stack1.push(10);
stack1.push(12);
stack1.push(14);
console.log(stack1.pop());
console.log(stack1.peek());
console.log(stack1);

// Valid Parentheses
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.
var isValid = function (s) {
  // What we will do is, we push all opening brackets in our stack
  // if we encounter a closing bracket, we check if we have its opening brakcet in stack top
  // if yes, then pop it out
  // else return false
  // we will put all valid parentheses pairs inside object so that we can check if its valid before adding into stack
  const obj = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (obj.hasOwnProperty(s[i])) {
      // if its an opening bracket, put in stack
      stack.push(s[i]);
    } else {
      // if its closing bracket
      // stack.at(-1) means check if top element of array has closing bracket as s[i] or not
      if (stack.length === 0 || obj[stack.at(-1)] != s[i]) {
        return false;
      }

      stack.pop();
    }
  }

  return stack.length === 0;
};
