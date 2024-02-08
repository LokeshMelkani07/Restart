// Implement a deep clone function in JavaScript that creates a copy of a nested object or array without any reference to the original

// Simple way to clone a object can be
// use Object.assign
// Using JSON.stringify and JSON.parse
// Using ... operator

const obj1 = {
  name: "lokesh",
  class: "Btech",
  age: 21,
};

const obj2 = Object.assign({}, obj1);

console.log(obj2);

// Or
const obj3 = JSON.parse(JSON.stringify(obj1));

// Or
const obj4 = {
  ...obj1,
};
