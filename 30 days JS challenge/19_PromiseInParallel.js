// Execute Asynchronous Functions in Parallel
/*
Given an array of asynchronous functions functions, return a new promise promise. Each function in the array accepts no arguments and returns a promise. All the promises should be executed in parallel.

promise resolves:

When all the promises returned from functions were resolved successfully in parallel. The resolved value of promise should be an array of all the resolved values of promises in the same order as they were in the functions. The promise should resolve when all the asynchronous functions in the array have completed execution in parallel.
promise rejects:

When any of the promises returned from functions were rejected. promise should also reject with the reason of the first rejection.
Please solve it without using the built-in Promise.all function.
*/
var promiseAll = async function (functions) {
  // We need to execute multiple promises in parallel without using Promiss.all
  // We can run a loop and take each function and store its result in an array and at the end when all functions are resolved, we return that array as a new resolved promise
  // If in between, any promise rejects, we return rejected promise
  return new Promise(function (resolve, reject) {
    let count = 0;
    let res = new Array(functions.length);

    for (let i = 0; i < functions.length; i++) {
      let fn = functions[i];
      fn()
        .then(function (val) {
          count += 1;
          res[i] = val;
          if (count === functions.length) resolve(res);
        })
        .catch(function (err) {
          reject(err);
        });
    }
  });
};
