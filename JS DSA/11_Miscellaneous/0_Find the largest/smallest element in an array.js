// Find the largest/smallest element in an array
const largestSmallestElement = (arr) => {
  let maxi = Math.min;
  let mini = Math.max;
  for (let i of arr) {
    if (i > maxi) {
      maxi = i;
    }

    if (i < mini) {
      mini = i;
    }
  }

  return { maxi, mini };
};

const arr = [1, 2, 3, 89, 65, 34, 68, 97, 223, 345, 23, 54, 67, 87];
console.log(largestSmallestElement(arr));
