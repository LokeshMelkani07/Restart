// Write a function in js that takes an array of objects and a key, and returns a new array sorted based on the values of that key in ascending order.

function sortByKey(arr, key) {
  // Use the sort method and a custom compare function
  return arr.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1; // a comes before b
    } else if (a[key] > b[key]) {
      return 1; // b comes before a
    } else {
      return 0; // equal values, maintain original order
    }
  });
}

// Example usage
const data = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];

const sortedData = sortByKey(data, "age");

console.log(sortedData); // Output: [{ name: "Bob", age: 25 }, { name: "Alice", age: 30 }, { name: "Charlie", age: 35 }]
