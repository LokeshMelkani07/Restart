// Write a function that removes all falsy values (false, null, 0, “”, undefined, and NaN) from an array.

// The !!value expression converts the value to a boolean. Any value that is falsy (e.g., 0, false, null, '', undefined, NaN) will be converted to false, and any truthy value will be converted to true.
// The filter() method returns a new array containing only the elements for which the callback function returns true.

function removeFalsyValues(arr) {
  return arr.filter((value) => !!value);
}

// Example usage:
const arrayWithFalsyValues = [0, false, null, "", undefined, NaN, 42, "hello"];
console.log("Array with falsy values:", arrayWithFalsyValues);
console.log(
  "Array with falsy values removed:",
  removeFalsyValues(arrayWithFalsyValues)
);
