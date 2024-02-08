// Sort Array in Ascending Order

// .slice() takes only few elements from array based on condition
function sortAscending(arr) {
  return arr.slice().sort((a, b) => a - b);
}

// Example usage:
const numbers = [5, 2, 8, 1, 4];
console.log("Sorted array:", sortAscending(numbers));
