// Creating an empty array
const arr1 = [];
const arr2 = new Array(); // another way of declaration empty array
console.log(arr1, arr2);

// In JS we can put anything inside an array
const arr3 = [
  1,
  2,
  3,
  4,
  "Hello",
  {
    name: "lokesh",
  },
  [1, 2, 3],
];

// Arrays are 0 indexed in JS
const length = arr1.length; // To find length of array
arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr1[0]);
console.log(arr1[length - 1]);

// TC for accesing any element through index is O(1)

// Add or delete items from array
const last_ele = arr1.pop(); // to delete from end
console.log(last_ele); // 8

// Add element at end of array
arr1.push(9);
console.log(arr1); // [1,2,3,4,5,6,7,9]

// adding element at startv of array
arr1.unshift(0);

// push, pop takes O(1)
// unshift takes O(n)

// Delete element from start of array
arr1.shift(); // Takes O(n)

// looping through an array
for (let i = 0; i < arr1.length; i++) {
  console.log(arr1[i]);
}

// Method 2
arr1.forEach((ele, ind) => {
  console.log(ele);
});

// Method 3
for (let x of arr1) {
  console.log(x);
}

// Check if element exits in array or not
const findElement = (arr, target) => {
  for (let x of arr) {
    if (x == target) {
      return true;
    }
    return false;
  }
};

// In-built function for the same
console.log(arr1.includes(4));

// Find element index
const findElementIndex = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (x == target) {
      return i;
    }
    return -1;
  }
};

// In-built function
console.log(arr1.indexOf(4));

// Delete, add & update element from range of index
arr1.splice(1, 3); // delete element from index 1 to 3 in array

// Add items at specific index
arr1.splice(1, 0, 2, 3, 4, 5, 6, 7); // adds element from index 1

// Add and delete at same time
// Delete from index 1 to 3 and add [10,11,12] there
arr1.splice(1, 3, 10, 11, 12);

// Difference between splice and slice
// The term ‘slice’ literally means to cut something into pieces. It is used to cut out elements from an array. It does not affect the original array.The returned value of the slice method is an array of the values found between start and end excluding the value at end. arr.slice(start,end) where end is excluded. Slice returns new Array
// ‘Splice’, according to the dictionary, means to join things together. It is used to remove elements from an array or replace them. array.splice(start, deleteCount, newElem1, newElem2, ..., newElemN;start denotes the index from which the method will start its operation on the array.deleteCount denotes the number of values to be deleted from the start. If the value is 0, nothing will be deleted.newElem1 to newElemN denote the values that would be added after the start.The returned value is the values that are affected,i.e., deleted. If deleteCount is 0, an empty array would be returned. Splice updates in the same array

// Copying in the array in JS
// Shallow copy V/S Deep Copy
const arr4 = arr1; // Makes Shallow copy, If we change arr4, it will change arr1 also. Both points to same memory location
const arr5 = [...arr1]; // Makes a deep copy, now both points to different location and changing one does not changes other
const arr6 = Array.from(arr1); // Another way of deep copy
const arr7 = arr1.concat(); // Another way of deep copy

// Adding 2 arrays in JS
const newArr = [...arr1, ...arr2]; // creates a new array which contains element of both arr1, arr2
const newArr2 = arr1.concat(arr2); // also does same work

// How to check if 2 arrays are equal?
const isArrayEqual = (arr1, arr2) => {
  if (arr1.length != arr2.length) {
    // if lengths are not equal means they cannot be equal
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      return false;
    }
  }
  return true;
};

// Another way
const isArrayEqual2 = (arr1, arr2) => {
  // arr.every((ele,i)=>{}) check the specified condition for every element ele in array arr
  return (
    arr1.length === arr2.length && arr1.every((ele, i) => arr1[i] === arr2[i])
  );
};

// Sort an array in Ascending and Descending
const x = [1, 2, 5, 6, 3, 10];
x.sort(); // sorts in Asecnding order
x.sort((a, b) => {
  b - a;
}); // Sort in desc order, O(nlogn), works like if b-a is positive it will swap else not

// Reverse an array
x.reverse();

// Map, Filter, Reduce
const arr9 = [10, 12, 34, 1, 3, 5, 7];
const newArrMap = arr9.map((ele, i, arr) => {
  console.log(ele);
});

// Filter
const positiveNumbers = arr9.filter((ele, i) => {
  ele > 0;
});

// Reduce
const sumArr = arr9.reduce((acc, ele) => {
  acc + ele;
}, 0);

// Flat Method in Array
// Let say we have nested array and we want to make it into 1 array
const y = [1, 2, [1, 4, 5, 6], 5, 7, [[10, 11, 21, 35], 1, 5, 6, 8]];
const flatteredArray = y.flat(1); // 1 means depth of nesting here above we have only one level of nesting

// Time and Space complexity of Array Methods: https://dev.to/lukocastillo/time-complexity-big-0-for-javascript-array-methods-and-examples-mlg

// Find vs Filter in JS
// filter() returns an array containing the element that satisfies the condition, but find() returns the element itself that satisfies the condition.In filter(), whole array is iterated despite the fact that the element being searched for is present at the beginning. But in find(), as soon as the element that satisfies the condition is found, it gets returned.
