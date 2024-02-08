// Write a function that generates a random alphanumeric string of a given length.

function generateRandomAlphanumeric(length) {
  const alphanumericChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    // Generate a random index to select a character from the alphanumericChars
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    // Append the selected character to the randomString
    randomString += alphanumericChars[randomIndex];
  }

  return randomString;
}

// Example usage:
const length = 8;
console.log("Random alphanumeric string:", generateRandomAlphanumeric(length));
