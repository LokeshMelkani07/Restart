// Objects in JS
const person = {
  name: "Lokesh",
  age: 21,
  skills: ["coding", "cricket"],
  projects: {
    Frontend: "E-commerce",
  },
  code: function () {
    return "start code";
  },
  walk: () => {
    return "Start walk";
  },
};

console.log(person.age); // 21
console.log(person["name"]); // Lokesh
console.log(person.code());

// How to add, delete and update keys
// First of all we should know if object has that key or not so we use
console.log(person.hasOwnProperty("last name")); // return true or false

// Updating value
person.name = "Mohit";
// Adding new value
person.location = "New Delhi";
// Delete property from object
delete person.age;

// Shallow Copy and Deep Copy of an object
const person1 = person; // creates shallow copy
const person2 = { ...person, hobbies: "yes" }; // creates deep copy
// Another way of deep copy
const person3 = Object.assign({}, person);
// Note: Object.assign() method creates shallow copy for nested objects

// Important method of object
// Difference between freeze and seal method of object
Object.freeze(person); // Means this will freeze this object, now we cannot update or add or delete keys from person object

// To check if our object is frozen or not
console.log(Object.isFrozen(person));

// Ceil method
Object.seal(person); // we cannot add or delete the key but can update it with new keys
// whereas in freeze we even cannot update keys

// Keys, values and entries
console.log(Object.keys(person)); // returns all keys of the object
console.log(Object.values(person)); // returns all values of the object
console.log(Object.entries(person)); // returns all entries of object

// Loop through an Object
for (let key in person) {
  console.log(key, person[key]);
}

// Another way
Object.keys(person).forEach((e) => console.log(e));

// Check if 2 objects are equal or not
console.log(Object.is(person, person3)); // returns true or false

// Another way of checking if equal or not
let isFlag = true;
for (let key in person) {
  if (person[key] !== person3[key]) {
    isFlag = false;
  }
}

if (isFlag == true) {
  console.log("They are sane");
}

// Find count of all players [Important]
// To store a collection we can either use Array or Object
const data = {
  id: 1,
  name: ["P1", "P4"],
  next: {
    id: 2,
    name: ["P3"],
    next: {
      id: 3,
      name: ["P3", "P4", "P5"],
      next: {
        id: 4,
        name: ["P1", "P2", "P4"],
        next: {
          id: 5,
          name: ["P2", "P3", "P5"],
          next: null,
        },
      },
    },
  },
};

const playerCount = (data) => {
  if (data === null) {
    return {};
  }

  let countPlayer = {};
  for (let player of data.name) {
    countPlayer[player] = (countPlayer[player] || 0) + 1;
  }
  const nextPlayerCount = playerCount(data.next);

  for (let key in nextPlayerCount) {
    countPlayer[key] = (countPlayer[key] || 0) + nextPlayerCount[key];
  }
  return countPlayer;
};

const countPlayer = playerCount(data);
console.log(countPlayer); // {p1: 2, p4: 3, p3: 3, p2: 2: p5: 2}

// Prototype and Inheritence in Objects
const obj1 = {
  name: "Vishal",
};

const obj2 = {
  age: 21,
  __proto__: obj1,
};

console.log(obj2.name); // Vishal
