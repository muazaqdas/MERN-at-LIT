# Class 10: Asynchronous JavaScript - Complete Study Material

## Table of Contents
1. [Synchronous vs Asynchronous Programming](#1-synchronous-vs-asynchronous-programming)
2. [Callbacks and Callback Patterns](#2-callbacks-and-callback-patterns)
3. [Promises Introduction and Usage](#3-promises-introduction-and-usage)
4. [Async/Await Syntax](#4-asyncawait-syntax)
5. [Practice Exercises](#practice-exercises)

---

## 1. Synchronous vs Asynchronous Programming

### JavaScript's Single-Threaded Nature

**Definition:** JavaScript executes code on a single thread, meaning it can only do one thing at a time.

```javascript
// Synchronous code - executes line by line
console.log('First');
console.log('Second');
console.log('Third');

// Output (in order):
// First
// Second
// Third
```

### The Call Stack

The **call stack** is a data structure that tracks function execution:

```javascript
function multiply(a, b) {
    return a * b;
}

function square(n) {
    return multiply(n, n);
}

function printSquare(n) {
    const squared = square(n);
    console.log(squared);
}

printSquare(4);

// Call stack execution:
// 1. printSquare(4) is pushed
// 2. square(4) is pushed
// 3. multiply(4, 4) is pushed
// 4. multiply returns, is popped
// 5. square returns, is popped
// 6. printSquare completes, is popped
```

### Blocking vs Non-Blocking Operations

**Blocking (Synchronous):** Code that stops execution until it completes:

```javascript
// BAD: Blocking code
function processLargeFile() {
    // Imagine this takes 5 seconds
    for (let i = 0; i < 1000000000; i++) {
        // Heavy computation
    }
    return 'File processed';
}

console.log('Start');
const result = processLargeFile(); // BLOCKS for 5 seconds!
console.log(result);
console.log('End');

// Output after 5 seconds:
// Start
// File processed
// End

// During these 5 seconds, the browser is FROZEN!
```

**Non-Blocking (Asynchronous):** Code that doesn't stop execution:

```javascript
// GOOD: Non-blocking code
console.log('Start');

setTimeout(function() {
    console.log('This happens later');
}, 2000);

console.log('End');

// Output (immediate):
// Start
// End
// (2 seconds later)
// This happens later
```

### The Event Loop

The **event loop** is what allows JavaScript to perform non-blocking operations:

```javascript
console.log('1: Synchronous');

setTimeout(function() {
    console.log('2: Timeout callback');
}, 0);

Promise.resolve().then(function() {
    console.log('3: Promise callback');
});

console.log('4: Synchronous');

// Output:
// 1: Synchronous
// 4: Synchronous
// 3: Promise callback
// 2: Timeout callback
```

**How it works:**
1. Synchronous code executes first (call stack)
2. Microtasks (Promises) execute next (microtask queue)
3. Macrotasks (setTimeout, setInterval) execute last (callback queue)

**Visual Representation:**
```
┌─────────────────────────────────────────┐
│           Call Stack                     │
│  (Synchronous code executes here)        │
└─────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│      Microtask Queue (Promises)          │
│  (Higher priority than macrotasks)       │
└─────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│   Callback Queue (setTimeout, etc.)      │
│     (Executes after microtasks)          │
└─────────────────────────────────────────┘
```

### Web APIs and Concurrency

**Web APIs** handle asynchronous operations outside the JavaScript engine:

```javascript
// setTimeout is a Web API
setTimeout(function() {
    console.log('Timer completed');
}, 1000);

// fetch is a Web API
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data));

// addEventListener is a Web API
document.addEventListener('click', function() {
    console.log('Clicked!');
});

// While these operations are running,
// JavaScript continues executing other code!
```

### When to Use Asynchronous Programming

Use async code when:
- Making HTTP requests (API calls)
- Reading/writing files
- Database operations
- Timers and delays
- User interactions (events)
- Any operation that takes time

```javascript
// Examples of async operations

// 1. HTTP Request
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(users => displayUsers(users));

// 2. Timer
setTimeout(() => {
    showNotification('Time is up!');
}, 5000);

// 3. User interaction
button.addEventListener('click', () => {
    handleButtonClick();
});

// 4. File reading (in Node.js)
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

### Real-World Examples

#### Example 1: Loading User Data

```javascript
// Synchronous approach (BAD)
function getUserData(userId) {
    // Blocks for several seconds
    const data = makeSlowApiCall(userId);
    return data;
}

const user = getUserData(1); // Freezes browser!
console.log(user);

// Asynchronous approach (GOOD)
function getUserData(userId, callback) {
    // Doesn't block
    makeApiCall(userId, function(data) {
        callback(data);
    });
}

getUserData(1, function(user) {
    console.log(user);
});
// Browser remains responsive!
```

#### Example 2: Multiple Operations

```javascript
// Need to perform multiple operations
// 1. Fetch user
// 2. Fetch user's posts
// 3. Fetch comments for each post

// Synchronous (BLOCKS for long time)
const user = fetchUser(userId);           // Wait 2 seconds
const posts = fetchPosts(user.id);        // Wait 2 seconds
const comments = fetchComments(posts[0]); // Wait 2 seconds
// Total: 6 seconds of blocking!

// Asynchronous (NON-BLOCKING)
fetchUser(userId, function(user) {
    fetchPosts(user.id, function(posts) {
        fetchComments(posts[0], function(comments) {
            // All data ready
        });
    });
});
// Browser remains responsive throughout!
```

---

## 2. Callbacks and Callback Patterns

### What are Callbacks?

**Definition:** A callback is a function passed as an argument to another function, to be executed later.

```javascript
// Simple callback example
function greet(name, callback) {
    console.log('Hello, ' + name);
    callback();
}

function sayGoodbye() {
    console.log('Goodbye!');
}

greet('Alice', sayGoodbye);
// Output:
// Hello, Alice
// Goodbye!
```

### Passing Functions as Arguments

```javascript
// Functions are first-class citizens in JavaScript
// They can be passed as arguments

function executeOperation(a, b, operation) {
    return operation(a, b);
}

// Pass different operations
const sum = executeOperation(5, 3, function(x, y) {
    return x + y;
}); // 8

const product = executeOperation(5, 3, function(x, y) {
    return x * y;
}); // 15

// Or use named functions
function multiply(x, y) {
    return x * y;
}
const result = executeOperation(5, 3, multiply); // 15
```

### Anonymous vs Named Callbacks

```javascript
// Anonymous callback (inline)
setTimeout(function() {
    console.log('This is anonymous');
}, 1000);

// Named callback (reusable)
function logMessage() {
    console.log('This is named');
}
setTimeout(logMessage, 1000);

// Benefits of named callbacks:
// 1. Reusable
// 2. Easier to debug (shows function name in stack trace)
// 3. Can be removed if needed
```

### Callback Execution Timing

```javascript
// Synchronous callback (executes immediately)
function processArray(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}

processArray([1, 2, 3], function(item, index) {
    console.log(`Item ${index}: ${item}`);
});
// Callbacks execute immediately during the loop

// Asynchronous callback (executes later)
function delayedGreeting(name, callback) {
    setTimeout(function() {
        callback('Hello, ' + name);
    }, 1000);
}

delayedGreeting('Bob', function(message) {
    console.log(message); // Executes after 1 second
});
```

### Common Callback Patterns

#### 1. Event Callbacks

```javascript
// DOM event listeners use callbacks
document.querySelector('#button').addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log('Event:', event);
});

// Window events
window.addEventListener('resize', function() {
    console.log('Window resized to:', window.innerWidth);
});

// Custom events
const eventEmitter = {
    events: {},

    on: function(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    },

    emit: function(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(data);
            });
        }
    }
};

eventEmitter.on('userLogin', function(user) {
    console.log('User logged in:', user);
});

eventEmitter.emit('userLogin', { name: 'Alice', id: 1 });
```

#### 2. Timer Callbacks

```javascript
// setTimeout - execute once after delay
setTimeout(function() {
    console.log('Executed after 2 seconds');
}, 2000);

// setInterval - execute repeatedly
const intervalId = setInterval(function() {
    console.log('This runs every second');
}, 1000);

// Clear interval
setTimeout(function() {
    clearInterval(intervalId);
    console.log('Interval cleared');
}, 5000);

// Countdown timer example
function countdown(seconds, callback) {
    let remaining = seconds;

    const intervalId = setInterval(function() {
        console.log(remaining);
        remaining--;

        if (remaining < 0) {
            clearInterval(intervalId);
            callback();
        }
    }, 1000);
}

countdown(5, function() {
    console.log('Countdown complete!');
});
```

#### 3. Array Method Callbacks (Review)

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach - iterate over array
numbers.forEach(function(num, index) {
    console.log(`Index ${index}: ${num}`);
});

// map - transform array
const doubled = numbers.map(function(num) {
    return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - filter array
const evens = numbers.filter(function(num) {
    return num % 2 === 0;
});
console.log(evens); // [2, 4]

// reduce - reduce to single value
const sum = numbers.reduce(function(total, num) {
    return total + num;
}, 0);
console.log(sum); // 15

// find - find first match
const found = numbers.find(function(num) {
    return num > 3;
});
console.log(found); // 4
```

### Callback Hell Problem

**Problem:** Nested callbacks become hard to read and maintain:

```javascript
// BAD: Callback hell (Pyramid of Doom)
getUserData(userId, function(user) {
    getPostsForUser(user.id, function(posts) {
        getCommentsForPost(posts[0].id, function(comments) {
            getLikesForComment(comments[0].id, function(likes) {
                getUsersWhoLiked(likes, function(users) {
                    // Finally have all the data
                    console.log('All data loaded');
                    // But code is hard to read!
                });
            });
        });
    });
});

// Problems:
// 1. Hard to read (indentation grows)
// 2. Hard to maintain
// 3. Error handling is difficult
// 4. Code flows right instead of down
```

### Error Handling in Callbacks

**Error-first callback pattern** (Node.js convention):

```javascript
// Error-first callbacks
function readFile(filename, callback) {
    // Simulate file reading
    setTimeout(function() {
        // First parameter is error, second is data
        if (filename === 'nonexistent.txt') {
            callback(new Error('File not found'), null);
        } else {
            callback(null, 'File contents here');
        }
    }, 1000);
}

// Usage
readFile('data.txt', function(error, data) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Success:', data);
});

// Nested error handling (becomes messy)
readFile('user.txt', function(error, userData) {
    if (error) {
        console.error('Error reading user:', error);
        return;
    }

    parseJSON(userData, function(error, user) {
        if (error) {
            console.error('Error parsing user:', error);
            return;
        }

        fetchPosts(user.id, function(error, posts) {
            if (error) {
                console.error('Error fetching posts:', error);
                return;
            }

            // Finally have posts
            console.log(posts);
        });
    });
});
```

### Solutions to Callback Hell

#### Solution 1: Named Functions

```javascript
// Instead of nesting, use named functions
function handleUser(user) {
    getPostsForUser(user.id, handlePosts);
}

function handlePosts(posts) {
    getCommentsForPost(posts[0].id, handleComments);
}

function handleComments(comments) {
    console.log('Comments:', comments);
}

getUserData(userId, handleUser);
// More readable, but still awkward
```

#### Solution 2: Modularization

```javascript
// Break into smaller, reusable functions
function loadUserWithPosts(userId) {
    getUserData(userId, function(user) {
        loadPostsForUser(user);
    });
}

function loadPostsForUser(user) {
    getPostsForUser(user.id, function(posts) {
        loadCommentsForPosts(posts);
    });
}

function loadCommentsForPosts(posts) {
    if (posts.length === 0) return;

    getCommentsForPost(posts[0].id, function(comments) {
        console.log('All data loaded:', comments);
    });
}

loadUserWithPosts(userId);
```

#### Solution 3: Promises (Next Section!)

```javascript
// Promises solve callback hell!
getUserData(userId)
    .then(user => getPostsForUser(user.id))
    .then(posts => getCommentsForPost(posts[0].id))
    .then(comments => getLikesForComment(comments[0].id))
    .then(likes => getUsersWhoLiked(likes))
    .then(users => console.log('All data loaded'))
    .catch(error => console.error('Error:', error));

// Much more readable!
```

### Real-World Callback Examples

```javascript
// 1. API Request with XMLHttpRequest
function makeRequest(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, xhr.responseText);
        } else {
            callback(new Error('Request failed: ' + xhr.status));
        }
    };

    xhr.onerror = function() {
        callback(new Error('Network error'));
    };

    xhr.open('GET', url);
    xhr.send();
}

// Usage
makeRequest('https://api.example.com/data', function(error, response) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Data:', response);
});

// 2. Image Loading
function loadImage(url, callback) {
    const img = new Image();

    img.onload = function() {
        callback(null, img);
    };

    img.onerror = function() {
        callback(new Error('Failed to load image'));
    };

    img.src = url;
}

loadImage('photo.jpg', function(error, img) {
    if (error) {
        console.error('Error:', error);
        return;
    }
    document.body.appendChild(img);
});

// 3. Debounced Search
function debounce(func, delay) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            func.apply(this, args);
        }, delay);
    };
}

const searchInput = document.querySelector('#search');
const debouncedSearch = debounce(function(event) {
    console.log('Searching for:', event.target.value);
    performSearch(event.target.value, function(results) {
        displayResults(results);
    });
}, 300);

searchInput.addEventListener('input', debouncedSearch);
```

---

## 3. Promises Introduction and Usage

### What is a Promise?

**Definition:** A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.

Think of a Promise as a "promise" that something will be done in the future.

```javascript
// Creating a simple promise
const myPromise = new Promise(function(resolve, reject) {
    // Async operation
    setTimeout(function() {
        const success = true;

        if (success) {
            resolve('Operation successful!');
        } else {
            reject('Operation failed!');
        }
    }, 1000);
});

// Using the promise
myPromise
    .then(function(result) {
        console.log(result); // 'Operation successful!'
    })
    .catch(function(error) {
        console.error(error);
    });
```

### Promise States

A Promise has three states:

1. **Pending:** Initial state, operation not yet complete
2. **Fulfilled:** Operation completed successfully
3. **Rejected:** Operation failed

```javascript
// Pending promise
const pending = new Promise((resolve, reject) => {
    // Not resolved or rejected yet
});
console.log(pending); // Promise { <pending> }

// Fulfilled promise
const fulfilled = new Promise((resolve, reject) => {
    resolve('Success!');
});
console.log(fulfilled); // Promise { 'Success!' }

// Rejected promise
const rejected = new Promise((resolve, reject) => {
    reject('Error!');
});
console.log(rejected); // Promise { <rejected> 'Error!' }

// Once a promise is settled (fulfilled or rejected),
// it cannot change state
```

### Creating Promises

```javascript
// Basic promise creation
function waitOneSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('One second has passed');
        }, 1000);
    });
}

// Promise with condition
function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age >= 18) {
            resolve('Access granted');
        } else {
            reject('Access denied: Must be 18 or older');
        }
    });
}

// Promise with async operation
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: 'John Doe',
                    email: 'john@example.com'
                });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
}
```

### Promise Methods

#### .then() - Handle Success

```javascript
const promise = fetchUserData(1);

promise.then(function(user) {
    console.log('User:', user);
    // Do something with user data
});

// Arrow function syntax
promise.then(user => {
    console.log('User:', user);
});

// Chaining with return value
promise.then(user => {
    console.log('User name:', user.name);
    return user.email;
}).then(email => {
    console.log('Email:', email);
});
```

#### .catch() - Handle Errors

```javascript
fetchUserData(-1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });

// catch() catches any error in the chain
fetchUserData(1)
    .then(user => {
        throw new Error('Something went wrong!');
    })
    .then(data => {
        // This won't execute
        console.log(data);
    })
    .catch(error => {
        // This will catch the error
        console.error('Caught error:', error.message);
    });
```

#### .finally() - Cleanup

```javascript
// finally() always executes, regardless of success or failure
fetchUserData(1)
    .then(user => {
        console.log('Success:', user);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Cleanup: Hide loading spinner');
        hideLoadingSpinner();
    });

// Practical example
function loadData() {
    showLoadingSpinner();

    fetchUserData(1)
        .then(user => displayUser(user))
        .catch(error => showError(error))
        .finally(() => hideLoadingSpinner());
}
```

### Promise Chaining

One of the most powerful features of Promises:

```javascript
// Chaining promises
fetchUserData(1)
    .then(user => {
        console.log('1. Got user:', user.name);
        return fetchPosts(user.id); // Return new promise
    })
    .then(posts => {
        console.log('2. Got posts:', posts.length);
        return fetchComments(posts[0].id); // Return new promise
    })
    .then(comments => {
        console.log('3. Got comments:', comments.length);
        return processComments(comments); // Return value
    })
    .then(result => {
        console.log('4. Processed:', result);
    })
    .catch(error => {
        // Catches errors from ANY step above
        console.error('Error in chain:', error);
    });
```

#### Returning Values in Chains

```javascript
// Return values are automatically wrapped in promises
Promise.resolve(5)
    .then(num => {
        console.log(num); // 5
        return num * 2; // Automatically wrapped in Promise
    })
    .then(num => {
        console.log(num); // 10
        return num + 3;
    })
    .then(num => {
        console.log(num); // 13
    });

// Return promises for async operations
fetchUser(1)
    .then(user => {
        console.log('User:', user);
        // Return a promise
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
        // Return another promise
        return fetchComments(posts[0].id);
    })
    .then(comments => {
        console.log('Comments:', comments);
    });
```

#### Transforming Data Through Chains

```javascript
// Transform data step by step
fetch('https://api.example.com/users/1')
    .then(response => {
        // Transform response to JSON
        return response.json();
    })
    .then(user => {
        // Extract and transform data
        return {
            displayName: user.firstName + ' ' + user.lastName,
            email: user.email,
            age: calculateAge(user.birthDate)
        };
    })
    .then(transformedUser => {
        // Use transformed data
        console.log('Display name:', transformedUser.displayName);
        displayUserProfile(transformedUser);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### Error Propagation

Errors propagate down the promise chain:

```javascript
fetchUser(1)
    .then(user => {
        console.log('Got user');
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log('Got posts');
        throw new Error('Oops!'); // Error thrown here
    })
    .then(data => {
        // This won't execute
        console.log('Processing data');
    })
    .then(data => {
        // This won't execute either
        console.log('More processing');
    })
    .catch(error => {
        // Error caught here
        console.error('Caught:', error.message);
    })
    .then(() => {
        // This WILL execute (after catch)
        console.log('Continuing after error');
    });
```

### Promise Utility Methods

#### Promise.all() - Parallel Operations

```javascript
// Wait for ALL promises to complete
const promise1 = fetchUser(1);
const promise2 = fetchUser(2);
const promise3 = fetchUser(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        // results is an array of all resolved values
        console.log('User 1:', results[0]);
        console.log('User 2:', results[1]);
        console.log('User 3:', results[2]);
    })
    .catch(error => {
        // If ANY promise rejects, catch is called
        console.error('One of the requests failed:', error);
    });

// Practical example: Loading multiple resources
Promise.all([
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/comments')
])
    .then(responses => {
        // Convert all responses to JSON
        return Promise.all(responses.map(r => r.json()));
    })
    .then(([user, posts, comments]) => {
        console.log('All data loaded:', { user, posts, comments });
        renderPage(user, posts, comments);
    })
    .catch(error => {
        console.error('Failed to load data:', error);
    });
```

#### Promise.race() - First to Complete

```javascript
// Returns the first promise to settle (fulfill or reject)
const timeout = new Promise((resolve, reject) => {
    setTimeout(() => reject('Timeout!'), 5000);
});

const apiCall = fetch('/api/data');

Promise.race([apiCall, timeout])
    .then(response => {
        console.log('API call succeeded before timeout');
        return response.json();
    })
    .catch(error => {
        console.error('Error or timeout:', error);
    });

// Example: Multiple API endpoints, use fastest
Promise.race([
    fetch('https://api1.example.com/data'),
    fetch('https://api2.example.com/data'),
    fetch('https://api3.example.com/data')
])
    .then(response => {
        console.log('Fastest server responded');
        return response.json();
    })
    .then(data => {
        console.log('Data:', data);
    });
```

#### Promise.allSettled() - Wait for All (Success or Failure)

```javascript
// Wait for all promises to complete, regardless of success/failure
const promises = [
    fetchUser(1),
    fetchUser(999), // This might fail
    fetchUser(2),
    fetchUser(-1)   // This might fail
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} succeeded:`, result.value);
            } else {
                console.log(`Promise ${index} failed:`, result.reason);
            }
        });
    });

// Output:
// Promise 0 succeeded: { id: 1, name: 'User 1' }
// Promise 1 failed: User not found
// Promise 2 succeeded: { id: 2, name: 'User 2' }
// Promise 3 failed: Invalid user ID
```

#### Promise.any() - First Successful

```javascript
// Returns the first fulfilled promise (ignores rejections)
Promise.any([
    fetchUser(999), // Fails
    fetchUser(-1),  // Fails
    fetchUser(1),   // Succeeds!
    fetchUser(2)    // Succeeds (but won't wait for this)
])
    .then(user => {
        console.log('Got first successful user:', user);
    })
    .catch(error => {
        console.error('All promises rejected');
    });
```

### Converting Callbacks to Promises

```javascript
// Callback-based function
function readFileCallback(filename, callback) {
    setTimeout(() => {
        if (filename === 'data.txt') {
            callback(null, 'File contents');
        } else {
            callback(new Error('File not found'), null);
        }
    }, 1000);
}

// Convert to promise-based function
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        readFileCallback(filename, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

// Usage
readFilePromise('data.txt')
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Utility function to promisify callbacks
function promisify(callbackFunction) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            callbackFunction(...args, (error, data) => {
                if (error) reject(error);
                else resolve(data);
            });
        });
    };
}

// Usage
const readFileAsync = promisify(readFileCallback);
readFileAsync('data.txt')
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### Real-World Promise Examples

```javascript
// 1. Fetch API (returns promises)
fetch('https://api.example.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP error: ' + response.status);
        }
        return response.json();
    })
    .then(users => {
        console.log('Users:', users);
        displayUsers(users);
    })
    .catch(error => {
        console.error('Error fetching users:', error);
        showErrorMessage('Failed to load users');
    });

// 2. Sequential operations
function loadUserProfile(userId) {
    let userData;

    return fetchUser(userId)
        .then(user => {
            userData = user;
            return fetchPosts(user.id);
        })
        .then(posts => {
            userData.posts = posts;
            return fetchFriends(userData.id);
        })
        .then(friends => {
            userData.friends = friends;
            return userData;
        });
}

loadUserProfile(1)
    .then(profile => {
        console.log('Complete profile:', profile);
        displayProfile(profile);
    })
    .catch(error => {
        console.error('Error loading profile:', error);
    });

// 3. Parallel operations for better performance
function loadDashboard(userId) {
    return Promise.all([
        fetchUser(userId),
        fetchPosts(userId),
        fetchNotifications(userId),
        fetchFriends(userId)
    ])
        .then(([user, posts, notifications, friends]) => {
            return {
                user,
                posts,
                notifications,
                friends
            };
        });
}

loadDashboard(1)
    .then(dashboard => {
        console.log('Dashboard data:', dashboard);
        renderDashboard(dashboard);
    })
    .catch(error => {
        console.error('Error loading dashboard:', error);
    });
```

---

## 4. Async/Await Syntax

### Introduction to Async/Await

**Async/await** is syntactic sugar over Promises, making asynchronous code look synchronous:

```javascript
// With Promises
function getUserPosts() {
    return fetchUser(1)
        .then(user => fetchPosts(user.id))
        .then(posts => {
            console.log('Posts:', posts);
            return posts;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// With Async/Await (cleaner!)
async function getUserPosts() {
    try {
        const user = await fetchUser(1);
        const posts = await fetchPosts(user.id);
        console.log('Posts:', posts);
        return posts;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### The `async` Keyword

Declares an asynchronous function that returns a Promise:

```javascript
// async function always returns a promise
async function sayHello() {
    return 'Hello';
}

// Equivalent to:
function sayHello() {
    return Promise.resolve('Hello');
}

// Using the async function
sayHello().then(message => {
    console.log(message); // 'Hello'
});

// If you return a promise, it's unwrapped
async function getUser() {
    return fetchUser(1); // Returns a promise
}

getUser().then(user => {
    console.log(user);
});

// If you throw an error, promise is rejected
async function failingFunction() {
    throw new Error('Something went wrong');
}

failingFunction().catch(error => {
    console.error(error.message);
});
```

### The `await` Keyword

Pauses execution until the Promise resolves:

```javascript
// await can only be used inside async functions
async function example() {
    // Wait for promise to resolve
    const user = await fetchUser(1);
    console.log('User:', user);

    // Can use the result immediately
    console.log('User name:', user.name);

    // Await multiple operations
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts);

    const comments = await fetchComments(posts[0].id);
    console.log('Comments:', comments);
}

// ❌ ERROR: await outside async function
function badExample() {
    const user = await fetchUser(1); // SyntaxError!
}

// ✅ CORRECT: await inside async function
async function goodExample() {
    const user = await fetchUser(1); // Works!
}
```

### Error Handling with Try/Catch

```javascript
// Basic try/catch
async function loadUser(userId) {
    try {
        const user = await fetchUser(userId);
        console.log('User loaded:', user);
        return user;
    } catch (error) {
        console.error('Failed to load user:', error);
        throw error; // Re-throw if needed
    }
}

// Multiple operations
async function loadUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        const comments = await fetchComments(posts[0].id);

        return { user, posts, comments };
    } catch (error) {
        console.error('Error loading data:', error.message);
        return null;
    }
}

// Handling different errors
async function processUser(userId) {
    try {
        const user = await fetchUser(userId);

        if (!user.isActive) {
            throw new Error('User is not active');
        }

        const posts = await fetchPosts(user.id);
        return posts;

    } catch (error) {
        if (error.message === 'User not found') {
            console.log('Creating new user...');
            return createUser(userId);
        } else if (error.message === 'User is not active') {
            console.log('User is inactive');
            return null;
        } else {
            console.error('Unexpected error:', error);
            throw error;
        }
    }
}

// Finally block for cleanup
async function loadData() {
    showLoadingSpinner();

    try {
        const data = await fetchData();
        displayData(data);
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoadingSpinner(); // Always executes
    }
}
```

### Converting Promises to Async/Await

```javascript
// Promise chain
function getUserProfile(userId) {
    return fetchUser(userId)
        .then(user => {
            console.log('Got user');
            return fetchPosts(user.id);
        })
        .then(posts => {
            console.log('Got posts');
            return fetchComments(posts[0].id);
        })
        .then(comments => {
            console.log('Got comments');
            return comments;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// Async/await version (much cleaner!)
async function getUserProfile(userId) {
    try {
        const user = await fetchUser(userId);
        console.log('Got user');

        const posts = await fetchPosts(user.id);
        console.log('Got posts');

        const comments = await fetchComments(posts[0].id);
        console.log('Got comments');

        return comments;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### Benefits of Async/Await

1. **More Readable:** Looks like synchronous code
2. **Better Error Handling:** Use familiar try/catch
3. **Easier Debugging:** Better stack traces
4. **Simpler Control Flow:** Easier to write conditionals and loops

```javascript
// Complex control flow with promises (messy)
function processUsers(userIds) {
    let allPosts = [];

    return Promise.all(userIds.map(id => fetchUser(id)))
        .then(users => {
            return Promise.all(users.map(user => {
                return fetchPosts(user.id)
                    .then(posts => {
                        allPosts = allPosts.concat(posts);
                    });
            }));
        })
        .then(() => {
            return allPosts;
        });
}

// Same logic with async/await (clean!)
async function processUsers(userIds) {
    const users = await Promise.all(
        userIds.map(id => fetchUser(id))
    );

    let allPosts = [];

    for (const user of users) {
        const posts = await fetchPosts(user.id);
        allPosts = allPosts.concat(posts);
    }

    return allPosts;
}
```

### Sequential vs Parallel Execution

```javascript
// Sequential (slow - waits for each operation)
async function loadDataSequential() {
    const user1 = await fetchUser(1);    // Wait 1 second
    const user2 = await fetchUser(2);    // Wait 1 second
    const user3 = await fetchUser(3);    // Wait 1 second
    // Total: 3 seconds
    return [user1, user2, user3];
}

// Parallel (fast - all operations start together)
async function loadDataParallel() {
    const [user1, user2, user3] = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);
    // Total: 1 second (all run at once)
    return [user1, user2, user3];
}

// When to use sequential vs parallel
async function loadUserProfile(userId) {
    // These must be sequential (posts depend on user)
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id); // Needs user.id

    // These can be parallel (independent operations)
    const [comments, likes, shares] = await Promise.all([
        fetchComments(posts[0].id),
        fetchLikes(posts[0].id),
        fetchShares(posts[0].id)
    ]);

    return { user, posts, comments, likes, shares };
}
```

### Common Async/Await Patterns

#### Pattern 1: Error Recovery

```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) {
                throw error; // Last attempt failed
            }
            console.log(`Attempt ${i + 1} failed, retrying...`);
            await delay(1000); // Wait 1 second before retry
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

#### Pattern 2: Timeout

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), timeout);
    });

    const fetchPromise = fetch(url).then(r => r.json());

    return Promise.race([fetchPromise, timeoutPromise]);
}

// Usage
try {
    const data = await fetchWithTimeout('/api/data', 3000);
    console.log('Data:', data);
} catch (error) {
    console.error('Request failed or timed out:', error);
}
```

#### Pattern 3: Processing in Batches

```javascript
async function processBatches(items, batchSize) {
    const results = [];

    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);

        // Process batch in parallel
        const batchResults = await Promise.all(
            batch.map(item => processItem(item))
        );

        results.push(...batchResults);
        console.log(`Processed batch ${i / batchSize + 1}`);
    }

    return results;
}

// Usage
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const results = await processBatches(items, 3);
```

#### Pattern 4: Conditional Async Operations

```javascript
async function loadUserData(userId, includeDetails = false) {
    const user = await fetchUser(userId);

    if (includeDetails) {
        // Only fetch if needed
        const [posts, friends, activity] = await Promise.all([
            fetchPosts(user.id),
            fetchFriends(user.id),
            fetchActivity(user.id)
        ]);

        return { ...user, posts, friends, activity };
    }

    return user;
}
```

### Real-World Async/Await Examples

```javascript
// 1. Form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        const result = await response.json();

        showSuccessMessage('User created successfully!');
        console.log('Created user:', result);

    } catch (error) {
        showErrorMessage('Failed to create user: ' + error.message);
        console.error('Error:', error);

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    }
}

// 2. Loading dashboard with multiple API calls
async function loadDashboard() {
    showLoadingSpinner();

    try {
        // Load user first
        const user = await fetchCurrentUser();

        // Then load everything else in parallel
        const [
            notifications,
            messages,
            posts,
            friends,
            stats
        ] = await Promise.all([
            fetchNotifications(user.id),
            fetchMessages(user.id),
            fetchPosts(user.id),
            fetchFriends(user.id),
            fetchUserStats(user.id)
        ]);

        // Render dashboard
        renderDashboard({
            user,
            notifications,
            messages,
            posts,
            friends,
            stats
        });

    } catch (error) {
        showError('Failed to load dashboard: ' + error.message);
    } finally {
        hideLoadingSpinner();
    }
}

// 3. Search with debouncing
let searchTimeout;

async function handleSearch(query) {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
        if (query.length < 3) {
            clearResults();
            return;
        }

        showSearchingIndicator();

        try {
            const results = await fetch(`/api/search?q=${query}`)
                .then(r => r.json());

            displayResults(results);

        } catch (error) {
            showError('Search failed');
        } finally {
            hideSearchingIndicator();
        }
    }, 300);
}

// 4. Infinite scroll / lazy loading
async function loadMorePosts() {
    if (isLoading || !hasMore) return;

    isLoading = true;
    showLoadingIndicator();

    try {
        const posts = await fetch(`/api/posts?page=${currentPage}`)
            .then(r => r.json());

        if (posts.length === 0) {
            hasMore = false;
            showEndMessage();
        } else {
            appendPosts(posts);
            currentPage++;
        }

    } catch (error) {
        showError('Failed to load posts');
    } finally {
        isLoading = false;
        hideLoadingIndicator();
    }
}

// Setup scroll listener
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMorePosts();
    }
});
```

---

## Practice Exercises

### Exercise 1: Promise Creation
Create a function that returns a promise which resolves after a random time (1-3 seconds) with a random number.

### Exercise 2: Promise Chaining
Build a function that:
1. Fetches a user
2. Fetches that user's posts
3. Fetches comments for the first post
4. Returns a summary object with all data

### Exercise 3: Error Handling
Create a robust API call function that:
- Retries up to 3 times on failure
- Has a 5-second timeout
- Returns a default value if all attempts fail

### Exercise 4: Parallel Operations
Write a function that loads multiple users in parallel and returns:
- All users that loaded successfully
- A list of IDs that failed
- Total time taken

### Exercise 5: Convert to Async/Await
Take this promise chain and convert it to async/await:
```javascript
function loadUserProfile(userId) {
    return fetchUser(userId)
        .then(user => fetchPosts(user.id))
        .then(posts => {
            return Promise.all(posts.map(post => fetchComments(post.id)));
        })
        .then(comments => {
            return comments.flat();
        })
        .catch(error => {
            console.error('Error:', error);
            return [];
        });
}
```

---

## Additional Resources

- [MDN: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info: Async/Await](https://javascript.info/async-await)
- [The Event Loop Visualized](http://latentflip.com/loupe/)
