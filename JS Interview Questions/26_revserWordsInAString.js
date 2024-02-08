// Write a function that reverses the order of words in a sentence without using the built-in reverse() method.

// We will use a stack for it
function reverseWords(str) {
  // create a stack
  const words = [];
  let wordStart = 0;

  // "Lokesh is a good boy"
  // In above example each word has " " in between except the last word which does not have any space at its end
  // So we handle that case alag se
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " " || i == str.length - 1) {
      const word =
        i === str.length - 1
          ? str.substring(wordStart)
          : str.substring(wordStart, i);
      // We have the word now, push it
      words.push(word);
      // Now i points to " " so to go to new word we point wordStart to i+1
      wordStart = i + 1;
    }

    // Now we pop from stack
    let reversedString = "";
    while (words.length > 0) {
      reversedString += words.pop() + " ";
    }

    // remove trailing spaces
    // The trim() method removes whitespace from both ends of a string.
    return reversedString.trim();
  }
}
