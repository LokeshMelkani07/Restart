// Event Emitter
/*
Design an EventEmitter class. This interface is similar (but with some differences) to the one found in Node.js or the Event Target interface of the DOM. The EventEmitter should allow for subscribing to events and emitting them.

Your EventEmitter class should have the following two methods:

subscribe - This method takes in two arguments: the name of an event as a string and a callback function. This callback function will later be called when the event is emitted.
An event should be able to have multiple listeners for the same event. When emitting an event with multiple callbacks, each should be called in the order in which they were subscribed. An array of results should be returned. You can assume no callbacks passed to subscribe are referentially identical.
The subscribe method should also return an object with an unsubscribe method that enables the user to unsubscribe. When it is called, the callback should be removed from the list of subscriptions and undefined should be returned.
emit - This method takes in two arguments: the name of an event as a string and an optional array of arguments that will be passed to the callback(s). If there are no callbacks subscribed to the given event, return an empty array. Otherwise, return an array of the results of all callback calls in the order they were subscribed.


Example 1:
Input:
actions = ["EventEmitter", "emit", "subscribe", "subscribe", "emit"],
values = [[], ["firstEvent", "function cb1() { return 5; }"],  ["firstEvent", "function cb1() { return 6; }"], ["firstEvent"]]
Output: [[],["emitted",[]],["subscribed"],["subscribed"],["emitted",[5,6]]]
Explanation:
const emitter = new EventEmitter();
emitter.emit("firstEvent"); // [], no callback are subscribed yet
emitter.subscribe("firstEvent", function cb1() { return 5; });
emitter.subscribe("firstEvent", function cb2() { return 6; });
emitter.emit("firstEvent"); // [5, 6], returns the output of cb1 and cb2
*/
class EventEmitter {
  // We have eventEmiiter class in which we have 2 methods, subscribe and emit
  // subscribe takes 2 arguements, event Name & callback function
  // Whenever we call subscribe, it should pile up all callback function with that event which will be later called during emit()
  // subscribe also return an object with a method unsubscribe method that enables the user to unsubscribe. When it is called, the callback should be removed from the list of subscriptions and undefined should be returned.
  // emit() takes event name and args array which calls all callback function of that event with args arguements
  // we will use map to store it

  constructor() {
    this.eventCallbacks = new Map();
  }

  subscribe(event, callback) {
    if (!this.eventCallbacks.has(event)) {
      this.eventCallbacks.set(event, []);
    }
    this.eventCallbacks.get(event).push(callback);

    return {
      unsubscribe: () => {
        // Removing that specific callback from that event on calling unsubscribe method
        const callbacks = this.eventCallbacks.get(event);
        const index = callbacks.indexOf(callback);
        if (index >= 0) {
          callbacks.splice(index, 1);
        }
        if (callbacks.length === 0) {
          this.eventCallbacks.delete(event);
        }
      },
    };
  }

  emit(event, args = []) {
    if (this.eventCallbacks.has(event)) {
      return this.eventCallbacks
        .get(event)
        .map((callback) => callback(...args));
    }
    return [];
  }
}
