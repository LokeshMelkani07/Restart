// Sorting in JS
const arr = [-2, -7, 1000, 5];
console.log(arr.sort()); // -2, -7, 1000, 5, we see 1000 coming before 5 because sort() in JS works by converting numbers to Strongs and then place them in ascending order, As 1 of 1000 comes before 5 of 5 so 1000 is placed before 5
// To sort in proper order, we need to give a comparator function

// In comparator function we take a,b
// if a-b>0 means sort a after b means [b,a]
// if a-b<0 means sort b after a means [a,b]
// if a-b===0 means keep original order of a and b

// Sorting in Ascending order
console.log(arr.sort((a, b) => a - b)); // -7, -2 , 5, 1000

// Sorting in Descending order
console.log(arr.sort((a, b) => b - a)); // 1000, 5, -2, -7

const strArr = ["mango", "apple", "banana"];
console.log(strArr.sort()); // "apple", "banana", "mango"

// Sorting a string
const str = "Lokesh";
console.log(str.split("").sort().join("")); // Split string to array, now sort it and then join it to make it string again

// Bubble Sort in JS
// Worst case TC: O(n2)
// Best case TC: O(n)
// SC: O(1)
function bubbleSort(arr) {
  var i, j;
  var len = arr.length;

  var isSwapped = false;

  for (i = 0; i < len; i++) {
    isSwapped = false;

    for (j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        isSwapped = true;
      }
    }

    // IF no two elements were swapped
    // by inner loop, then break
    if (!isSwapped) {
      break;
    }
  }

  // Print the array
  console.log(arr);
}

var arr1 = [243, 45, 23, 356, 3, 5346, 35, 5];

// calling the bubbleSort Function
bubbleSort(arr1);

// Selection Sort in JS
// Pick smallest or largest element and put it in its correct position
// TC: O(n2)
// SC: O(1)
function swap(arr, xp, yp) {
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}

function selectionSort(arr, n) {
  var i, j, min_idx;

  // One by one move boundary of unsorted subarray
  for (i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < n; j++) {
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }

    // Swap the found minimum element with the first element
    swap(arr, min_idx, i);
  }
}

// Insertion Sort in JS
// It is like sorting the playing cards
// We pick and element as key and now check if previous elements and put it in its correct position
// TC: O(n2)
// SC: O(1)
function insertionSort(arr, n) {
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;

    /* Move elements of arr[0..i-1], that are
        greater than key, to one position ahead
        of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}

// Merge Sort in JS
// Works on Divide and Conquer Algo
// Dividing an array into smaller subarrays, sorting each subarray, and then merging the sorted subarrays back together to form the final sorted array.
// TC: O(nlogn) its an recursive algo, logn for divide and n for merging
// SC: O(n) for copying elements in aux array

function mergeSort(arr, l, r) {
  if (l >= r) {
    return;
  }

  var mid = l + parseInt((r - l) / 2);
  mergeSort(arr, l, mid);
  mergeSort(arr, mid + 1, r);
  merge(arr, l, mid, r);
}

function merge(arr, l, mid, r) {
  // Length of broken arrays
  var n1 = mid - l + 1;
  var n2 = r - mid;

  // create new array
  var L = new Array(n1);
  var R = new Array(n2);

  // Store values in arrays
  for (let i = 0; i < n1; i++) {
    L[i] = arr[l + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }

  // Now Store values in Main array in sorted order
  var i = 0;
  var j = 0;
  var k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }

  // Store leftover elements as it is
  while (i < n1) {
    // if there are some leftover elements in L array
    arr[k++] = L[i++];
  }

  while (j < n2) {
    // if there are some leftover elements in R array
    arr[k++] = R[j++];
  }
}

// Quick Sort in JS
// Picks an element as pivot and Put it in its correct position such that elements before it are smaller than itself, element after it are larger than itself.
// It is also an Divide and Conquer algo
// We can pick any element as pivot, may be start element, last element or middle element
// Here we will pick last element as pivot
// TC: O(N log(N))
// SC: O(N)
function quickSort(arr, low, high) {
  if (low >= high) {
    return;
  }

  // Find pivot element
  let pivot = partition(arr, low, high);
  quickSort(arr, low, pivot - 1);
  quickSort(arr, pivot + 1, high);
}

function partition(arr, low, high) {
  // Pick last element as pivot first
  let pivot = arr[high];
  let i = low - 1; // put i before 0th index

  // Run loop before last element as last element is pivot
  for (let j = 0; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      // swap i and j
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // At end, swap pivot with correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  // i+1 is correct position of partition element
  return i + 1;
}
