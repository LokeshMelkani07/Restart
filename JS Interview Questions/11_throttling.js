// Implement Throttling
// Throttling is a technique that limits the execution of a function to once in every specified time interval. For example, if you have a resize event handler that adjusts the layout of your page, you can throttle the function that updates the layout, so that it only runs once every 100ms. This way, you can avoid running your code too frequently, which might cause janky user interface or high CPU usage.
// The main difference between debouncing and throttling is that debouncing executes the function only after some cooling period, while throttling executes the function at a regular interval. Debouncing and throttling are both useful techniques to improve the performance of your code, but they have different use cases and effects.

// A function that updates the layout of the page
function updateLayout() {
  // Update layout logic
}
// A throttle function that takes a function and an interval as parameters
function throttle(func, interval) {
  // A flag variable to track whether the function is running or not
  let isRunning = false;
  // Return a function that takes arguments
  return function (...args) {
    // If the function is not running
    if (!isRunning) {
      // Set the flag to true
      isRunning = true;
      // Apply the function with arguments
      func.apply(this, args);
      // Set a timer that will reset the flag after the interval
      setTimeout(() => {
        // Set the flag to false
        isRunning = false;
      }, interval);
    }
  };
}
// A throttled version of the update layout function with 100ms interval
const throttledUpdateLayout = throttle(updateLayout, 100);
// Add an event listener to the window resize event
window.addEventListener("resize", () => {
  // Call the throttled update layout function
  throttledUpdateLayout();
});
