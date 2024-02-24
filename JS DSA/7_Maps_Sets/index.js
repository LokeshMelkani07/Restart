// Map, Set, Weakmap, WeakSet in JS
// Map stores key-value pairs but it is also done by objects also
/*
1. In Object, the data-type of the   key-field is restricted to integer, strings, and symbols. Whereas in Map, the key-field can be of any data-type (integer, an array, even an object!)
2. In the Map, the original order of elements is preserved. This is not true in case of objects.
3. The Map is an instance of an object but the vice-versa is not true.
4. Object has many methods in its prototype whereas maps does not have any method in its prototype so based on performance maps are better
*/
// The Time Complexity for insertion, searching and deletion of entries or elements in Map and Set in JavaScript is O(log(n)).
// has, get, set methods has TC: O(1) unlike array where find method takes o(n)
// Creating a Map
const myMap = new Map();

// Adding key-value pairs to the Map
myMap.set("name", "Lokesh");
myMap.set("age", 21);

// Getting a value using a key
console.log(myMap.get("name")); // Lokesh

// Checking if a key exists
console.log(myMap.has("age")); // true

// Removing a key-value pair
myMap.delete("age");

// Iterating through the Map
for (const [key, value] of myMap) {
  console.log(key, value);
}

myMap.forEach((key, value) => {
  console.log(`${key} is for ${value}`);
});

// Size of the Map
console.log(myMap.size); // 1

// Clearing the Map
myMap.clear();

// Sort Characters By Frequency
// Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.Return the sorted string. If there are multiple answers, return any of them.
var frequencySort = function (s) {
  // store whole frequency inside map first
  const mpp = new Map();
  for (let ch of s) {
    mpp.set(ch, (mpp.get(ch) || 0) + 1);
  }

  // Sort the keys based on their frequency of values so we make an array and do it
  const arr = [...mpp.keys()].sort((a, b) => mpp.get(b) - mpp.get(a));
  console.log(arr);
  let res = "";
  for (let i = 0; i < arr.length; i++) {
    // The repeat() method returns a string with a number of copies of a string.
    // The repeat() method returns a new string.
    // ch.repeat(mpp.get(arr[i])) means repeat 'ch' mpp.get(arr[i]) times
    res += arr[i].repeat(mpp.get(arr[i]));
  }

  return res;
};

// Weak Map in JS
// Basically, Let say we create a object and we store it in map
// Now we check if map has our object, it says yes
// Now we make that object null
// again we check inside map, that object still exists inside map
// Let say instead of map,we store object in weakmap and make object null now.
// The object will be automatically garbage collected from weakmap also
// So A Map is an unordered list of key-value pairs where the key and the value can be of any type like string, boolean, number, etc whereas In a Weak Map, every key can only be an object and function. It used to store weak object references.
// Maps are iterable but weakmap are not iterable
let obj = { key: "value" };

// Creating a WeakMap
let weakMap = new WeakMap();
weakMap.set(obj, "metadata");

// Checking if the object still exists in the WeakMap
console.log(weakMap.has(obj)); // true

// Removing the strong reference to the object
obj = null;

// At this point, the object is no longer strongly referenced
// The WeakMap's weak reference will allow the object to be garbage collected
console.log(weakMap.has(obj)); // false

// Set in JS
// The Time Complexity for insertion, searching and deletion of entries or elements in Map and Set in JavaScript is O(log(n)).
// has, get, set methods has TC: O(1) unlike array where find method takes o(n)
// Set is collection of unique values. Each value can only occur once in a Set. A Set can hold any value of any data type.
// For a Set, typeof returns object
// we have set.keys or set.values or set.enteries to get values of set, set.foreach also there to traverse
// Creating a Set
const mySet = new Set();

// Adding values to the Set
mySet.add(1);
mySet.add("hello");
mySet.add(true);

// Checking if a value exists
console.log(mySet.has(1)); // true

// Removing a value
mySet.delete("hello");

// Iterating through the Set
for (const value of mySet) {
  console.log(value);
}

// Size of the Set
console.log(mySet.size); // 2

// Clearing the Set
mySet.clear();

// Union of 2 arrays
// Unions means all elements of both array but do not repeat any element which is present in both of them
const arr1 = [1, 2, 3, 4, 56];
const arr2 = [2, 3, 7, 8, 9, 4];

console.log([...new Set([...arr1, ...arr2])]);

// Intersection of Two Arrays
// Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.
var intersection = function (nums1, nums2) {
  // Fill common elements in resultant array
  // Solution is O(n3) where find also takes O(n) but has, set, get function of set takes O(1) so we optimise using it.
  const res = [];
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      if (nums1[i] === nums2[j] && !res.find((x) => x === nums1[i])) {
        res.push(nums1[i]);
        break;
      }
    }
  }

  return res;
};

// Optimised using Set
var intersection = function (nums1, nums2) {
  // We make a set and store elements of nums2 in set
  // we check if that set contain element of nums1
  // if no then we check result set and add it if everything is good
  const res = new Set();
  const nums2Set = new Set(nums2);

  for (let i = 0; i < nums1.length; i++) {
    if (nums2Set.has(nums1[i]) && !res.has(nums1[i])) {
      res.add(nums1[i]);
    }
  }

  // res is a set, we need to return array so
  return [...res];
};
