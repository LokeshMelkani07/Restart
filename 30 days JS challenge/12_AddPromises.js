// Add Two Promises
/*
Given two promises promise1 and promise2, return a new promise. promise1 and promise2 will both resolve with a number. The returned promise should resolve with the sum of the two numbers.


Example 1:
Input:
promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)),
promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
Output: 7
Explanation: The two input promises resolve with the values of 2 and 5 respectively. The returned promise should resolve with a value of 2 + 5 = 7. The time the returned promise resolves is not judged for this problem.
*/
var addTwoPromises = async function (promise1, promise2) {
  return new Promise(function (resolve, reject) {
    promise1
      .then(function (result1) {
        promise2
          .then(function (result2) {
            resolve(result1 + result2);
          })
          .catch(function (error) {
            reject(error);
          });
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
/*
    Another Approach using Promise.all and reduce. Promise.all also gives a single promoise in return
    const addTwoPromises = async function(promise1, promise2) {
     return Promise.all([promise1,promise2])
     .then(value => value.reduce((acc,val) => acc+val,0))
    };
*/
