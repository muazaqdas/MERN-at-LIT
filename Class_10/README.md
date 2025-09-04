# Class 10: Asynchronous JavaScript

**Duration:** 2.5 hours teaching + 30 minutes assessment  
**Total:** 3 hours

## Learning Objectives
By the end of this class, students will be able to:
- Understand synchronous vs asynchronous programming
- Work with callbacks and handle callback patterns
- Use Promises for cleaner asynchronous code
- Implement async/await for modern asynchronous programming
- Handle errors in asynchronous operations

## Topics Covered

### 1. Synchronous vs Asynchronous Programming (25 minutes)
- JavaScript single-threaded nature
- Call stack and execution context
- Blocking vs non-blocking operations
- Web APIs and the event loop
- Concurrency model in JavaScript
- When and why to use asynchronous programming
- Real-world examples of asynchronous operations

### 2. Callbacks and Callback Patterns (45 minutes)
- What are callback functions
- Passing functions as arguments
- Anonymous vs named callbacks
- Callback execution timing
- Common callback patterns:
  - Event callbacks
  - Timer callbacks (`setTimeout`, `setInterval`)
  - Array method callbacks (review)
- Callback hell problem:
  - Nested callbacks and readability issues
  - Error handling in nested callbacks
  - Solutions and alternatives

### 3. Promises Introduction and Usage (60 minutes)
- Promise concept and states:
  - Pending, fulfilled, rejected
- Creating promises with Promise constructor
- Promise methods:
  - `.then()` for success handling
  - `.catch()` for error handling
  - `.finally()` for cleanup
- Promise chaining:
  - Returning values from `.then()`
  - Chaining multiple asynchronous operations
  - Transforming data through chains
- Error propagation in promise chains
- `Promise.all()` for parallel operations
- `Promise.race()` for competitive operations
- Converting callbacks to promises

### 4. Async/Await Syntax (50 minutes)
- `async` function declaration
- `await` keyword usage and rules
- Error handling with try/catch blocks
- Converting promise chains to async/await
- Benefits of async/await:
  - Improved readability
  - Better error handling
  - Easier debugging
- Parallel vs sequential execution:
  - `Promise.all()` with async/await
  - Independent vs dependent operations
- Common async/await patterns and best practices

## Assignment/Test (30 minutes)
**Practical Assessment:**
1. Convert callback-based code to use Promises
2. Implement error handling in asynchronous operations
3. Create a function that uses async/await for multiple operations
4. Build a simple timer-based application using async patterns
5. Handle multiple asynchronous operations with proper error handling

**Quiz Topics:**
- Synchronous vs asynchronous execution
- Callback patterns and callback hell
- Promise states and methods
- Async/await syntax and error handling
- When to use different asynchronous patterns

## Resources
- [Asynchronous JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [Promises - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Async/Await - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

## Prerequisites for Next Class
- Solid understanding of JavaScript functions
- Familiarity with callback concepts
- Understanding of error handling basics

## Next Class Preview
Class 11 will focus on API integration using the Fetch API, working with JSON data, and building a practical project that combines asynchronous programming with real-world data.