// Join Two Arrays by ID
/*
Given two arrays arr1 and arr2, return a new array joinedArray. All the objects in each of the two inputs arrays will contain an id field that has an integer value.

joinedArray is an array formed by merging arr1 and arr2 based on their id key. The length of joinedArray should be the length of unique values of id. The returned array should be sorted in ascending order based on the id key.

If a given id exists in one array but not the other, the single object with that id should be included in the result array without modification.

If two objects share an id, their properties should be merged into a single object:

If a key only exists in one object, that single key-value pair should be included in the object.
If a key is included in both objects, the value in the object from arr2 should override the value from arr1.

Example 1:
Input:
arr1 = [
    {"id": 1, "x": 1},
    {"id": 2, "x": 9}
],
arr2 = [
    {"id": 3, "x": 5}
]
Output:
[
    {"id": 1, "x": 1},
    {"id": 2, "x": 9},
    {"id": 3, "x": 5}
]
Explanation: There are no duplicate ids so arr1 is simply concatenated with arr2.

Example 2:
Input:
arr1 = [
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 3, "y": 6}
],
arr2 = [
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
Output:
[
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
Explanation: The two objects with id=1 and id=3 are included in the result array without modifiction. The two objects with id=2 are merged together. The keys from arr2 override the values in arr1.

Example 3:
Input:
arr1 = [
    {"id": 1, "b": {"b": 94},"v": [4, 3], "y": 48}
]
arr2 = [
    {"id": 1, "b": {"c": 84}, "v": [1, 3]}
]
Output: [
    {"id": 1, "b": {"c": 84}, "v": [1, 3], "y": 48}
]
Explanation: The two objects with id=1 are merged together. For the keys "b" and "v" the values from arr2 are used. Since the key "y" only exists in arr1, that value is taken form arr1.
*/
var join = function (arr1, arr2) {
  // arr1 and arr2 ke har element ke paas ek id h and ek value h
  // Hume merge krna h dono ko based on ascending order of ID
  // if dono ki id same h toh merge krdo dono ki values ko and add into result
  // if there is an id which is there in one array, not in other then usko as it is daaldo result mai
  // return that merged array at the end

  // Create a map to store the merged objects by their id
  let map = new Map();

  // Helper function to merge two objects
  function merge(obj1, obj2) {
    let result = { ...obj1, ...obj2 };
    return result;
  }

  // Insert all objects from arr1 into the map
  for (let obj of arr1) {
    map.set(obj.id, obj);
  }

  // Insert all objects from arr2 into the map, merging if necessary
  for (let obj of arr2) {
    if (map.has(obj.id)) {
      let mergedObj = merge(map.get(obj.id), obj);
      map.set(obj.id, mergedObj);
    } else {
      map.set(obj.id, obj);
    }
  }

  // Convert map values to array and sort by id
  let result = Array.from(map.values());
  result.sort((a, b) => a.id - b.id);

  return result;
};
