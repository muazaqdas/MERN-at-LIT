# Class 10: Asynchronous JavaScript
## Presentation Notes (1.5 Hours)

---

## Section 1: Synchronous vs Asynchronous Programming (15 minutes)

### JavaScript's Single-Threaded Nature

JavaScript can only do **one thing at a time** (single-threaded).

```javascript
// Synchronous execution - line by line
console.log('First');
console.log('Second');
console.log('Third');

// Output (in order):
// First
// Second
// Third
```

---

### Blocking vs Non-Blocking

**Blocking (BAD):**
```javascript
// Code that stops everything while running
console.log('Start');

// Imagine this takes 5 seconds
for (let i = 0; i < 1000000000; i++) {
    // Heavy computation
}

console.log('End');

// Browser FREEZES for 5 seconds! ❌
```

**Non-Blocking (GOOD):**
```javascript
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

// Browser stays responsive! ✅
```

---

### The Event Loop

JavaScript uses an **event loop** to handle asynchronous operations:

**How it works:**
1. Execute synchronous code first
2. Then execute Promise callbacks (microtasks)
3. Finally execute setTimeout/events (macrotasks)

```javascript
console.log('1: Synchronous');

setTimeout(function() {
    console.log('2: setTimeout');
}, 0);

Promise.resolve().then(function() {
    console.log('3: Promise');
});

console.log('4: Synchronous');

// Output:
// 1: Synchronous
// 4: Synchronous
// 3: Promise  ← runs before setTimeout!
// 2: setTimeout
```

---

### When to Use Asynchronous Code

Use async for operations that take time:
- HTTP requests (API calls)
- Reading/writing files
- Database operations
- Timers and delays
- User interactions

```javascript
// Common async operations

// 1. API call
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(users => console.log(users));

// 2. Timer
setTimeout(() => {
    console.log('5 seconds passed');
}, 5000);

// 3. Event listener
button.addEventListener('click', () => {
    console.log('Button clicked');
});
```

---

## Section 2: Callbacks (25 minutes)

### What is a Callback?

A **callback** is a function passed to another function to be executed later.

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

---

### Callback Basics

```javascript
// Passing functions as arguments
function executeOperation(a, b, operation) {
    return operation(a, b);
}

// Anonymous callback
const sum = executeOperation(5, 3, function(x, y) {
    return x + y;
});
console.log(sum); // 8

// Named callback
function multiply(x, y) {
    return x * y;
}
const product = executeOperation(5, 3, multiply);
console.log(product); // 15
```

---

### Timer Callbacks

```javascript
// setTimeout - execute once after delay
setTimeout(function() {
    console.log('This runs after 2 seconds');
}, 2000);

// setInterval - execute repeatedly
const intervalId = setInterval(function() {
    console.log('This runs every second');
}, 1000);

// Stop the interval after 5 seconds
setTimeout(function() {
    clearInterval(intervalId);
    console.log('Interval stopped');
}, 5000);
```

---

### Countdown Example

```javascript
function countdown(seconds, callback) {
    let remaining = seconds;

    const intervalId = setInterval(function() {
        console.log(remaining);
        remaining--;

        if (remaining < 0) {
            clearInterval(intervalId);
            callback(); // Call when done
        }
    }, 1000);
}

countdown(5, function() {
    console.log('Countdown complete!');
});
```

---

### Array Method Callbacks (Review)

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach(function(num) {
    console.log(num * 2);
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
```

---

### Callback Hell (The Problem)

When callbacks are nested, code becomes hard to read:

```javascript
// BAD: Callback hell (Pyramid of Doom)
getUserData(userId, function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            getLikes(comments[0].id, function(likes) {
                // Finally have all data
                console.log('All data loaded');
                // But code is unreadable! 😢
            });
        });
    });
});

// Problems:
// 1. Hard to read
// 2. Hard to maintain
// 3. Hard to handle errors
// 4. Code grows horizontally
```

---

### Error Handling with Callbacks

**Error-first callback pattern:**

```javascript
function readFile(filename, callback) {
    setTimeout(function() {
        if (filename === 'nonexistent.txt') {
            // First param is error
            callback(new Error('File not found'), null);
        } else {
            // First param is null, second is data
            callback(null, 'File contents');
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
```

---

## Section 3: Promises (30 minutes)

### What is a Promise?

A **Promise** represents a value that will be available in the future.

Think of it as a "promise" that something will be done.

```javascript
// Creating a promise
const myPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        const success = true;

        if (success) {
            resolve('Success!');
        } else {
            reject('Failed!');
        }
    }, 1000);
});

// Using the promise
myPromise
    .then(function(result) {
        console.log(result); // 'Success!'
    })
    .catch(function(error) {
        console.error(error);
    });
```

---

### Promise States

A Promise has **3 states**:

1. **Pending:** Initial state, not yet complete
2. **Fulfilled:** Operation completed successfully
3. **Rejected:** Operation failed

```javascript
// Pending
const pending = new Promise((resolve, reject) => {
    // Not resolved yet
});

// Fulfilled
const fulfilled = new Promise((resolve, reject) => {
    resolve('Success!');
});

// Rejected
const rejected = new Promise((resolve, reject) => {
    reject('Error!');
});

// Once settled (fulfilled/rejected),
// state CANNOT change
```

---

### Creating Promises

```javascript
// Basic promise
function wait(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Waited ${seconds} seconds`);
        }, seconds * 1000);
    });
}

// Promise with condition
function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age >= 18) {
            resolve('Access granted');
        } else {
            reject('Access denied');
        }
    });
}

// Usage
checkAge(20)
    .then(message => console.log(message))
    .catch(error => console.error(error));
```

---

### Promise Methods

#### .then() - Handle Success

```javascript
fetchUser(1)
    .then(function(user) {
        console.log('User:', user);
        return user.name; // Can return a value
    })
    .then(function(name) {
        console.log('Name:', name);
    });
```

#### .catch() - Handle Errors

```javascript
fetchUser(-1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

#### .finally() - Cleanup

```javascript
fetchUser(1)
    .then(user => console.log('Success:', user))
    .catch(error => console.error('Error:', error))
    .finally(() => {
        console.log('Cleanup: Hide loading spinner');
    });
```

---

### Promise Chaining

One of the most powerful features!

```javascript
// Chain promises together
fetchUser(1)
    .then(user => {
        console.log('1. Got user:', user.name);
        return fetchPosts(user.id); // Return promise
    })
    .then(posts => {
        console.log('2. Got posts:', posts.length);
        return fetchComments(posts[0].id); // Return promise
    })
    .then(comments => {
        console.log('3. Got comments:', comments.length);
    })
    .catch(error => {
        // Catches errors from ANY step
        console.error('Error:', error);
    });

// No more callback hell!
// Code flows downward, not rightward
```

---

### Return Values in Chains

```javascript
// Return values are automatically wrapped in promises
Promise.resolve(5)
    .then(num => {
        console.log(num); // 5
        return num * 2;
    })
    .then(num => {
        console.log(num); // 10
        return num + 3;
    })
    .then(num => {
        console.log(num); // 13
    });
```

---

### Error Propagation

Errors automatically propagate down the chain:

```javascript
fetchUser(1)
    .then(user => {
        console.log('Got user');
        return fetchPosts(user.id);
    })
    .then(posts => {
        throw new Error('Oops!'); // Error here
    })
    .then(data => {
        // This won't run
        console.log('Processing');
    })
    .catch(error => {
        // Error caught here
        console.error('Error:', error.message);
    })
    .then(() => {
        // This WILL run (after catch)
        console.log('Continuing');
    });
```

---

### Promise.all() - Parallel Operations

Wait for **ALL** promises to complete:

```javascript
// Load multiple users at once
const promise1 = fetchUser(1);
const promise2 = fetchUser(2);
const promise3 = fetchUser(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log('User 1:', results[0]);
        console.log('User 2:', results[1]);
        console.log('User 3:', results[2]);
    })
    .catch(error => {
        // If ANY promise fails
        console.error('Error:', error);
    });

// Practical example
Promise.all([
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/comments')
])
    .then(responses => {
        return Promise.all(responses.map(r => r.json()));
    })
    .then(([user, posts, comments]) => {
        console.log('All data loaded');
        renderPage(user, posts, comments);
    });
```

---

### Promise.race() - First to Complete

Returns the **first** promise to settle:

```javascript
// Timeout implementation
const timeout = new Promise((resolve, reject) => {
    setTimeout(() => reject('Timeout!'), 5000);
});

const apiCall = fetch('/api/data');

Promise.race([apiCall, timeout])
    .then(response => {
        console.log('API succeeded before timeout');
        return response.json();
    })
    .catch(error => {
        console.error('Timeout or error:', error);
    });
```

---

### Callbacks vs Promises

```javascript
// With Callbacks (nested)
getUserData(1, function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            console.log('Done');
        });
    });
});

// With Promises (flat)
getUserData(1)
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => console.log('Done'))
    .catch(error => console.error(error));

// Much cleaner! ✅
```

---

## Section 4: Async/Await (20 minutes)

### Introduction to Async/Await

**Async/await** makes asynchronous code look synchronous!

```javascript
// With Promises
function getUser() {
    return fetchUser(1)
        .then(user => fetchPosts(user.id))
        .then(posts => {
            console.log('Posts:', posts);
            return posts;
        });
}

// With Async/Await (cleaner!)
async function getUser() {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts);
    return posts;
}
```

---

### The `async` Keyword

Declares a function that returns a Promise:

```javascript
// async function always returns a promise
async function sayHello() {
    return 'Hello';
}

// Same as:
function sayHello() {
    return Promise.resolve('Hello');
}

// Usage
sayHello().then(message => {
    console.log(message); // 'Hello'
});

// Throwing errors
async function fail() {
    throw new Error('Something went wrong');
}

fail().catch(error => {
    console.error(error.message);
});
```

---

### The `await` Keyword

Pauses execution until Promise resolves:

```javascript
// ✅ CORRECT: await inside async function
async function loadUser() {
    const user = await fetchUser(1);
    console.log('User:', user);

    // Can use result immediately
    console.log('Name:', user.name);

    // Await multiple operations
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts);
}

// ❌ ERROR: await outside async
function badExample() {
    const user = await fetchUser(1); // SyntaxError!
}
```

---

### Error Handling with Try/Catch

```javascript
async function loadUser(userId) {
    try {
        const user = await fetchUser(userId);
        console.log('User:', user);
        return user;

    } catch (error) {
        console.error('Failed to load user:', error);
        return null;
    }
}

// Multiple operations
async function loadData(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        const comments = await fetchComments(posts[0].id);

        return { user, posts, comments };

    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}
```

---

### Finally Block for Cleanup

```javascript
async function loadData() {
    showLoadingSpinner();

    try {
        const data = await fetchData();
        displayData(data);

    } catch (error) {
        showError(error.message);

    } finally {
        hideLoadingSpinner(); // Always runs
    }
}
```

---

### Converting Promises to Async/Await

```javascript
// Promise chain
function getUserPosts(userId) {
    return fetchUser(userId)
        .then(user => {
            return fetchPosts(user.id);
        })
        .then(posts => {
            return posts;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Async/await version
async function getUserPosts(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        return posts;

    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

### Sequential vs Parallel Execution

**Sequential (SLOW):**
```javascript
async function loadDataSlow() {
    const user1 = await fetchUser(1); // Wait 1s
    const user2 = await fetchUser(2); // Wait 1s
    const user3 = await fetchUser(3); // Wait 1s
    // Total: 3 seconds ❌
    return [user1, user2, user3];
}
```

**Parallel (FAST):**
```javascript
async function loadDataFast() {
    // All start at once!
    const [user1, user2, user3] = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);
    // Total: 1 second ✅
    return [user1, user2, user3];
}
```

---

### When to Use Sequential vs Parallel

```javascript
async function loadProfile(userId) {
    // Sequential (posts needs user.id)
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id);

    // Parallel (all independent)
    const [comments, likes, shares] = await Promise.all([
        fetchComments(posts[0].id),
        fetchLikes(posts[0].id),
        fetchShares(posts[0].id)
    ]);

    return { user, posts, comments, likes, shares };
}
```

---

### Benefits of Async/Await

**1. More Readable**
```javascript
// Looks like synchronous code!
async function example() {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    return posts;
}
```

**2. Better Error Handling**
```javascript
// Use familiar try/catch
try {
    const data = await fetchData();
} catch (error) {
    console.error(error);
}
```

**3. Easier Debugging**
- Better stack traces
- Can set breakpoints easily
- Step through code naturally

---

### Real-World Example: Form Submission

```javascript
async function handleFormSubmit(event) {
    event.preventDefault();

    const button = event.target.querySelector('button');
    button.disabled = true;
    button.textContent = 'Submitting...';

    try {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to submit');
        }

        const result = await response.json();
        showSuccess('User created!');

    } catch (error) {
        showError('Failed: ' + error.message);

    } finally {
        button.disabled = false;
        button.textContent = 'Submit';
    }
}
```

---

### Real-World Example: Loading Dashboard

```javascript
async function loadDashboard() {
    showLoadingSpinner();

    try {
        // Load user first
        const user = await fetchCurrentUser();

        // Load everything else in parallel
        const [notifications, messages, posts] = await Promise.all([
            fetchNotifications(user.id),
            fetchMessages(user.id),
            fetchPosts(user.id)
        ]);

        // Render dashboard
        renderDashboard({
            user,
            notifications,
            messages,
            posts
        });

    } catch (error) {
        showError('Failed to load dashboard');

    } finally {
        hideLoadingSpinner();
    }
}
```

---

## Key Takeaways

### ✅ Remember:

**Callbacks:**
- Functions passed to other functions
- Used for async operations
- Can lead to "callback hell"

**Promises:**
- Represent future values
- 3 states: pending, fulfilled, rejected
- Chain with `.then()`, `.catch()`, `.finally()`
- Use `Promise.all()` for parallel operations

**Async/Await:**
- Makes async code look synchronous
- Use `async` keyword to declare function
- Use `await` keyword to wait for promises
- Use `try/catch` for error handling
- Use `Promise.all()` for parallel operations

---

### 🎯 Best Practices:

1. **Always handle errors:**
   ```javascript
   try {
       const data = await fetchData();
   } catch (error) {
       console.error(error);
   }
   ```

2. **Use parallel when possible:**
   ```javascript
   // Good - parallel
   const [a, b] = await Promise.all([fetchA(), fetchB()]);

   // Bad - sequential (when not needed)
   const a = await fetchA();
   const b = await fetchB();
   ```

3. **Clean up resources:**
   ```javascript
   try {
       // ...
   } catch (error) {
       // ...
   } finally {
       cleanup(); // Always runs
   }
   ```

---

### 🚫 Common Mistakes:

1. **Forgetting async:**
   ```javascript
   // ❌ ERROR
   function bad() {
       const data = await fetchData();
   }

   // ✅ CORRECT
   async function good() {
       const data = await fetchData();
   }
   ```

2. **Sequential when should be parallel:**
   ```javascript
   // ❌ SLOW
   const user = await fetchUser(1);
   const posts = await fetchPosts(1);

   // ✅ FAST
   const [user, posts] = await Promise.all([
       fetchUser(1),
       fetchPosts(1)
   ]);
   ```

3. **Not catching errors:**
   ```javascript
   // ❌ BAD
   async function bad() {
       const data = await fetchData();
   }

   // ✅ GOOD
   async function good() {
       try {
           const data = await fetchData();
       } catch (error) {
           console.error(error);
       }
   }
   ```

---

## Evolution of Async JavaScript

```javascript
// 1. Callbacks (old way)
getUserData(1, function(user) {
    getPosts(user.id, function(posts) {
        console.log(posts);
    });
});

// 2. Promises (better)
getUserData(1)
    .then(user => getPosts(user.id))
    .then(posts => console.log(posts))
    .catch(error => console.error(error));

// 3. Async/Await (best!)
async function loadData() {
    try {
        const user = await getUserData(1);
        const posts = await getPosts(user.id);
        console.log(posts);
    } catch (error) {
        console.error(error);
    }
}
```

---

## Practice Challenge

**Build a User Profile Loader:**

1. Fetch user data from API
2. Fetch user's posts (in parallel with friends list)
3. Fetch friends list
4. Display everything
5. Handle errors gracefully
6. Show loading spinner during operations

**Use async/await!**

**Time: 20-30 minutes**

---

## Quick Reference

### Promise Syntax:
```javascript
new Promise((resolve, reject) => { })
  .then(result => { })
  .catch(error => { })
  .finally(() => { });
```

### Async/Await Syntax:
```javascript
async function name() {
  try {
    const result = await promise;
  } catch (error) {
    // handle error
  } finally {
    // cleanup
  }
}
```

### Parallel Operations:
```javascript
const [a, b, c] = await Promise.all([p1, p2, p3]);
```

---

## Questions?

Next class: **Fetch API & Working with Real APIs**
- Making HTTP requests
- Working with JSON
- Building real projects
- API integration
