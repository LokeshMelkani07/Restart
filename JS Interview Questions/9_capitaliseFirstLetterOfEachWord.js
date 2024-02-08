// Write a JavaScript program to convert a string to title case (capitalize the first letter of each word).

function Capitalise(str) {
  // Capitalize the first character of the string
  let result = str.charAt(0).toUpperCase();

  // Loop through the remaining characters
  for (let i = 1; i < str.length; i++) {
    // If the current character is a space, capitalize the next character
    if (str.charAt(i - 1) === " ") {
      result += str.charAt(i).toUpperCase();
    } else {
      result += str.charAt(i);
    }
  }

  return result;
}

const inputString = "this is a test string";
console.log("Title case:", toTitleCase(inputString));
