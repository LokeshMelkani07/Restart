// Implement a debounce function in JavaScript that limits the frequency of a function’s execution when it’s called repeatedly within a specified time frame.
// Debouncing is a technique that delays the execution of a function until the user stops performing a certain action for a specified amount of time. For example, if you have a search bar that fetches suggestions from the backend as the user types, you can debounce the function that makes the API call, so that it only runs after the user stops typing for a few seconds. This way, you can avoid making too many API calls that might overload your server or return irrelevant results.

function debounce(cb, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      cb.apply(this, args);
    }, delay);
  };
}

function add(a, b) {
  return a + b;
}

const debouncedFunction = debounce(add, 500);
