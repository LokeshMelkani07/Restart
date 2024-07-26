// Cache With Time Limit
/*
Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.

The class has three public methods:

set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.

get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.

count(): returns the count of un-expired keys.

Example 1:
Input:
actions = ["TimeLimitedCache", "set", "get", "count", "get"]
values = [[], [1, 42, 100], [1], [], [1]]
timeDelays = [0, 0, 50, 50, 150]
Output: [null, false, 42, 1, -1]
Explanation:
At t=0, the cache is constructed.
At t=0, a key-value pair (1: 42) is added with a time limit of 100ms. The value doesn't exist so false is returned.
At t=50, key=1 is requested and the value of 42 is returned.
At t=50, count() is called and there is one active key in the cache.
At t=100, key=1 expires.
At t=150, get(1) is called but -1 is returned because the cache is empty.
*/
var TimeLimitedCache = function () {
  // We will make a map
  // Inside which we store value and expireTime for each key
  // we check if any key expiration time is up, delete it
  this.data = new Map();
};

TimeLimitedCache.prototype.set = function (key, value, duration) {
  const currentTime = Date.now();
  if (this.data[key] && this.data[key].expiration > currentTime) {
    this.data[key].value = value;
    this.data[key].expiration = currentTime + duration;
    return true;
  } else {
    this.data[key] = {
      value: value,
      expiration: currentTime + duration,
    };
    return false;
  }
};

TimeLimitedCache.prototype.get = function (key) {
  const entry = this.data[key];
  if (entry && entry.expiration > Date.now()) {
    return entry.value;
  }
  return -1;
};

TimeLimitedCache.prototype.count = function () {
  const currentTime = Date.now();
  let count = 0;
  for (const key in this.data) {
    if (this.data[key].expiration > currentTime) {
      count++;
    }
  }
  return count;
};
