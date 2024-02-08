// Implement a function that takes two sorted arrays and merges them into a single sorted array without using any built-in sorting functions.

function MergeTwoSortedArrays(arr1, arr2) {
  let mergedArray = [];
  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      mergedArray.push(arr1[i++]);
    } else {
      mergedArray.push(arr2[j++]);
    }
  }

  while (i < arr1.length) {
    mergedArray.push(arr1[i++]);
  }

  while (j < arr2.length) {
    mergedArray.push(arr2[j++]);
  }

  return mergedArray;
}
