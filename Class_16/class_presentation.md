# Class 16: Node.js & Express Fundamentals
## Presentation Notes (2.5 Hours)

---

## Section 1: Node.js Fundamentals (40 minutes)

### What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows you to run JavaScript on the server side. Instead of just running JavaScript in the browser, you can now build complete server applications with JavaScript.

**Key Features:**
- Event-driven, non-blocking I/O model
- Single-threaded with event loop
- NPM - largest ecosystem of open source libraries
- Cross-platform (Windows, macOS, Linux)
- Perfect for I/O intensive applications

### Why Use Node.js for Backend?

**Benefits:**
- **Full-stack JavaScript**: Use the same language for frontend and backend
- **High Performance**: V8 engine compiles JavaScript to machine code
- **Scalability**: Handle thousands of concurrent connections
- **Active Community**: Millions of packages available via NPM
- **Modern Async**: Built for asynchronous programming from the ground up

### Understanding the Event Loop

Node.js uses a single-threaded event loop to handle concurrent operations without blocking.

```javascript
// Synchronous (Blocking) - Avoid in Node.js
const fs = require('fs');
const data = fs.readFileSync('file.txt'); // Blocks until file is read
console.log(data);
console.log('Next operation'); // Has to wait

// Asynchronous (Non-Blocking) - Preferred
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('Next operation'); // Executes immediately
```

**Event Loop Phases:**
1. **Call Stack**: Executes synchronous code
2. **Callback Queue**: Stores callbacks from async operations
3. **Event Loop**: Moves callbacks to call stack when it's empty

```javascript
console.log('Start'); // 1. Executes first

setTimeout(() => {
  console.log('Timeout'); // 3. Executes last (async)
}, 0);

console.log('End'); // 2. Executes second

// Output:
// Start
// End
// Timeout
```

### Setting Up Node.js

**Installation:**
```bash
# Check if Node.js is installed
node --version

# Check npm version
npm --version

# Run Node.js REPL (Read-Eval-Print Loop)
node

# Run a JavaScript file
node app.js
```

**Your First Node.js Program:**

```javascript
// app.js
console.log('Hello from Node.js!');

const currentTime = new Date();
console.log('Current time:', currentTime);

// Access process information
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
```
### Install dotenv

#### Install dotenv to use .env keys
```javascript
  npm install dotenv
```
### Global Objects in Node.js

```javascript
// import dotenv to access custom environment key values 
require('dotenv').config();
// __dirname - Current directory path
console.log(__dirname); // /Users/username/project

// __filename - Current file path
console.log(__filename); // /Users/username/project/app.js

// process - Process information and control
console.log(process.env.NODE_ENV); // Environment variables
console.log(process.argv); // Command line arguments

// setTimeout, setInterval - Same as browser
setTimeout(() => {
  console.log('Delayed execution');
}, 1000);
```

---

## Section 2: Node.js Modules & NPM (35 minutes)

### What Are Modules?

Modules are reusable pieces of code that you can import and use in your applications. Node.js has a robust module system that helps organize code.

**Types of Modules:**
1. **Built-in Modules**: Provided by Node.js (fs, http, path, etc.)
2. **Local Modules**: Your own custom modules
3. **Third-party Modules**: Installed via NPM

### CommonJS Module System

**Exporting a Module:**

```javascript
// math.js - Single export
const add = (a, b) => a + b;
module.exports = add;

// math.js - Multiple exports
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

module.exports = {
  add,
  subtract,
  multiply
};

// Alternative syntax
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
```

**Importing a Module:**

```javascript
// app.js - Importing single export
const add = require('./math');
console.log(add(5, 3)); // 8

// app.js - Importing multiple exports
const math = require('./math');
console.log(math.add(5, 3)); // 8
console.log(math.subtract(10, 4)); // 6

// Destructuring import
const { add, multiply } = require('./math');
console.log(add(5, 3)); // 8
console.log(multiply(4, 2)); // 8
```

### ES6 Module System (ESM)

**Configuration:**

```json
// package.json
{
  "type": "module"
}
```

**Exporting with ES6:**

```javascript
// math.js - Named exports
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Default export
const multiply = (a, b) => a * b;
export default multiply;

// Both together
export const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
export default multiply;
```

**Importing with ES6:**

```javascript
// app.js - Named imports
import { add, subtract } from './math.js';
console.log(add(5, 3)); // 8

// Default import
import multiply from './math.js';
console.log(multiply(4, 2)); // 8

// Combined import
import multiply, { add, subtract } from './math.js';

// Import everything
import * as math from './math.js';
console.log(math.add(5, 3)); // 8
```

### Core Node.js Modules

**File System (fs):**

```javascript
const fs = require('fs');

// Read file asynchronously
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(data);
});

// Write file
fs.writeFile('output.txt', 'Hello Node.js!', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});

// Using promises (modern approach)
const fsPromises = require('fs').promises;

async function readFileAsync() {
  try {
    const data = await fsPromises.readFile('data.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

**Path Module:**

```javascript
const path = require('path');

// Join paths
const filePath = path.join(__dirname, 'files', 'data.txt');
console.log(filePath); // /Users/project/files/data.txt

// Get file extension
console.log(path.extname('file.txt')); // .txt

// Get filename
console.log(path.basename('/users/project/file.txt')); // file.txt

// Get directory name
console.log(path.dirname('/users/project/file.txt')); // /users/project
```

### NPM (Node Package Manager)

**Initializing a Project:**

```bash
# Create package.json interactively
npm init

# Create with defaults
npm init -y
```

**Installing Packages:**

```bash
# Install package locally
npm install express

# Install as dev dependency
npm install --save-dev nodemon

# Install specific version
npm install express@4.17.1

# Install globally
npm install -g nodemon
```

**package.json Structure:**

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

**Using NPM Scripts:**

```bash
# Run scripts defined in package.json
npm start
npm run dev
npm test
```

---

## Section 3: Express.js Setup & Routing (50 minutes)

### What is Express.js?

Express is a minimal and flexible Node.js web application framework that provides robust features for building web and mobile applications.

**Why Use Express?**
- Simplifies server creation
- Powerful routing system
- Middleware support
- Easy integration with databases
- Large ecosystem of plugins

### Creating Your First Express Server

**Installation:**

```bash
npm init -y
npm install express
```

**Basic Server:**

```javascript
// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Define a route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Run the server:**
```bash
node index.js
```

### Understanding Middleware

Middleware functions have access to the request object (req), response object (res), and the next middleware function.

```javascript
const express = require('express');
const app = express();

// Middleware that logs every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to next middleware
});

// Built-in middleware to parse JSON
app.use(express.json());

// Built-in middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Custom middleware for authentication check
const checkAuth = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Use middleware on specific route
app.get('/protected', checkAuth, (req, res) => {
  res.json({ message: 'You have access!' });
});

app.listen(3000);
```

**Middleware Execution Order:**

```javascript
// First middleware
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

// Second middleware
app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

// Route handler
app.get('/', (req, res) => {
  console.log('Route handler');
  res.send('Response');
});

// Output when accessing /:
// Middleware 1
// Middleware 2
// Route handler
```

### Express Routing Basics

**HTTP Methods:**

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// GET - Retrieve data
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST - Create new data
app.post('/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User created', user: newUser });
});

// PUT - Update existing data
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  res.json({ message: `User ${userId} updated`, updates });
});

// DELETE - Remove data
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ${userId} deleted` });
});

app.listen(3000);
```

**Route Parameters:**

```javascript
// URL parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ID: ${userId}` });
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Query parameters
app.get('/search', (req, res) => {
  const { q, page, limit } = req.query;
  // URL: /search?q=nodejs&page=1&limit=10
  res.json({ query: q, page, limit });
});
```

**Sending Responses:**

```javascript
// Send text
app.get('/text', (req, res) => {
  res.send('Plain text response');
});

// Send JSON
app.get('/json', (req, res) => {
  res.json({ message: 'JSON response', success: true });
});

// Send status code with response
app.get('/created', (req, res) => {
  res.status(201).json({ message: 'Resource created' });
});

// Send only status
app.get('/nocontent', (req, res) => {
  res.sendStatus(204); // No Content
});

// Redirect
app.get('/old-page', (req, res) => {
  res.redirect('/new-page');
});
```

### Organizing Routes with Express Router

**routes/users.js:**

```javascript
const express = require('express');
const router = express.Router();

// All routes here are prefixed with /users

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

module.exports = router;
```

**index.js:**

```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());

// Mount the router
app.use('/users', userRoutes);

// Another router
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

app.listen(3000);
```

---

## Section 4: REST API Concepts & Implementation (45 minutes)

### What is REST?

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to perform CRUD operations.

**REST Principles:**
1. **Client-Server**: Separation of concerns
2. **Stateless**: Each request contains all necessary information
3. **Cacheable**: Responses can be cached
4. **Uniform Interface**: Consistent API structure
5. **Layered System**: Client doesn't know if connected to end server

### HTTP Methods and Their Purposes

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Retrieve data | Get list of users |
| POST | Create new resource | Create new user |
| PUT | Update entire resource | Update all user fields |
| PATCH | Update partial resource | Update user email only |
| DELETE | Remove resource | Delete user |

```javascript
// GET - Read (Idempotent, Safe)
app.get('/api/books', (req, res) => {
  // Return all books
});

// POST - Create (Not idempotent)
app.post('/api/books', (req, res) => {
  // Create new book
});

// PUT - Full Update (Idempotent)
app.put('/api/books/:id', (req, res) => {
  // Replace entire book
});

// PATCH - Partial Update (Idempotent)
app.patch('/api/books/:id', (req, res) => {
  // Update specific fields
});

// DELETE - Remove (Idempotent)
app.delete('/api/books/:id', (req, res) => {
  // Delete book
});
```

### HTTP Status Codes

**Success Codes (2xx):**
- `200 OK` - Successful GET, PUT, PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE

**Client Error Codes (4xx):**
- `400 Bad Request` - Invalid data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Authenticated but no permission
- `404 Not Found` - Resource doesn't exist
- `422 Unprocessable Entity` - Validation error

**Server Error Codes (5xx):**
- `500 Internal Server Error` - Generic server error
- `503 Service Unavailable` - Server overloaded or down

```javascript
// Proper status code usage
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(200).json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author required' });
  }

  const newBook = { id: Date.now(), title, author };
  books.push(newBook);

  res.status(201).json(newBook);
});
```

### RESTful API Design Best Practices

**URL Naming Conventions:**

```javascript
// ✅ CORRECT - Use plural nouns for resources
GET    /api/users
GET    /api/users/123
POST   /api/users
PUT    /api/users/123
DELETE /api/users/123

// ❌ WRONG - Don't use verbs in URLs
GET    /api/getUsers
POST   /api/createUser
DELETE /api/deleteUser

// ✅ CORRECT - Nested resources
GET    /api/users/123/posts
GET    /api/users/123/posts/456

// ❌ WRONG - Too deeply nested
GET    /api/users/123/posts/456/comments/789/likes
// Better: GET /api/comments/789/likes
```

**Consistent Response Format:**

```javascript
// ✅ CORRECT - Consistent structure
// Success response
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe"
  }
}

// Error response
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User with ID 123 not found"
  }
}

// ❌ WRONG - Inconsistent structure
// Sometimes: { "user": {...} }
// Sometimes: { "data": {...} }
// Sometimes: { "result": {...} }
```

### Building a Complete REST API

**Example: Books API with In-Memory Storage**

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// In-memory data store
let books = [
  { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json({ success: true, data: books });
});

// GET single book
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  res.json({ success: true, data: book });
});

// POST create book
app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;

  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      error: 'Title and author are required'
    });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year: year || new Date().getFullYear()
  };

  books.push(newBook);
  res.status(201).json({ success: true, data: newBook });
});

// PUT update book
app.put('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      error: 'Title and author are required'
    });
  }

  books[bookIndex] = {
    id: parseInt(req.params.id),
    title,
    author,
    year
  };

  res.json({ success: true, data: books[bookIndex] });
});

// DELETE book
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  books.splice(bookIndex, 1);
  res.status(204).send(); // No content
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Testing with Postman or cURL:**

```bash
# GET all books
curl http://localhost:3000/api/books

# GET single book
curl http://localhost:3000/api/books/1

# POST create book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","year":1925}'

# PUT update book
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","year":1949}'

# DELETE book
curl -X DELETE http://localhost:3000/api/books/1
```

---

## Section 5: MVC Architecture & Best Practices (30 minutes)

### What is MVC?

MVC (Model-View-Controller) is a software design pattern that separates application logic into three interconnected components.

**MVC Components:**
- **Model**: Data and business logic
- **View**: Presentation layer (for APIs, this is JSON responses)
- **Controller**: Handles requests and coordinates Model and View

**Benefits:**
- Separation of concerns
- Easier to maintain and test
- Scalable architecture
- Team collaboration friendly

### MVC in Express Applications

**Project Structure:**

```
src/
├── models/
│   └── book.model.js
├── controllers/
│   └── book.controller.js
├── routes/
│   └── book.routes.js
├── middleware/
│   └── errorHandler.js
├── config/
│   └── database.js
├── .env
├── package.json
└── server.js
```

### Implementing Models

**models/book.model.js:**

```javascript
// For now, using in-memory data
// Later this will interact with database

let books = [
  { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
];

class Book {
  static getAll() {
    return books;
  }

  static getById(id) {
    return books.find(book => book.id === parseInt(id));
  }

  static create(bookData) {
    const newBook = {
      id: books.length + 1,
      ...bookData
    };
    books.push(newBook);
    return newBook;
  }

  static update(id, bookData) {
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index === -1) return null;

    books[index] = {
      id: parseInt(id),
      ...bookData
    };
    return books[index];
  }

  static delete(id) {
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index === -1) return false;

    books.splice(index, 1);
    return true;
  }
}

module.exports = Book;
```

### Implementing Controllers

**controllers/book.controller.js:**

```javascript
const Book = require('../models/book.model');

// Controller functions handle request/response logic
exports.getAllBooks = (req, res) => {
  try {
    const books = Book.getAll();
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getBookById = (req, res) => {
  try {
    const book = Book.getById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createBook = (req, res) => {
  try {
    const { title, author, year } = req.body;

    // Validation
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        error: 'Title and author are required'
      });
    }

    const newBook = Book.create({ title, author, year });
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateBook = (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        error: 'Title and author are required'
      });
    }

    const updatedBook = Book.update(req.params.id, { title, author, year });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteBook = (req, res) => {
  try {
    const deleted = Book.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

### Setting Up Routes

**routes/book.routes.js:**

```javascript
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Routes map to controller functions
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
```

### Main Server File

**server.js:**

```javascript
const express = require('express');
const app = express();
const bookRoutes = require('./routes/book.routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Best Practices

**1. Environment Variables:**

```bash
# .env
PORT=3000
NODE_ENV=development
DB_CONNECTION_STRING=mongodb://localhost:27017/mydb
API_KEY=your-secret-key
```

```javascript
// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_CONNECTION_STRING;
```

**2. Error Handling Middleware:**

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
```

**3. Input Validation:**

```javascript
const validateBook = (req, res, next) => {
  const { title, author, year } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }

  if (!author || author.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Author is required'
    });
  }

  if (year && (year < 1000 || year > new Date().getFullYear())) {
    return res.status(400).json({
      success: false,
      error: 'Invalid year'
    });
  }

  next();
};

// Use in routes
router.post('/', validateBook, bookController.createBook);
```

**4. Async/Await in Controllers:**

```javascript
// Using async/await for cleaner code
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll(); // If using database
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

---

## Key Takeaways

### ✅ Node.js:
- JavaScript runtime for server-side development
- Event-driven, non-blocking I/O model
- Single-threaded with event loop
- Access to file system, network, and OS features
- npm for package management

### ✅ Modules:
- CommonJS: `require()` and `module.exports`
- ES6 Modules: `import` and `export`
- Core modules: fs, path, http, url
- Third-party packages via npm
- Organize code into reusable components

### ✅ Express.js:
- Minimal web framework for Node.js
- Middleware for request processing
- Robust routing system
- Easy server setup with `app.listen()`
- Express Router for modular routes

### ✅ REST APIs:
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Proper status codes (200, 201, 404, 500)
- Resource-based URLs with plural nouns
- Stateless communication
- Consistent response format

### ✅ MVC Architecture:
- Models: Data and business logic
- Views: JSON responses for APIs
- Controllers: Handle requests, coordinate Model and View
- Organized folder structure
- Separation of concerns for maintainability

---

## Common Mistakes

**1. Not Using Middleware Correctly:**

❌ WRONG:
```javascript
app.get('/api/users', (req, res) => {
  const data = req.body; // undefined - no JSON parser
  res.send(data);
});
```

✅ CORRECT:
```javascript
app.use(express.json()); // Add JSON middleware first

app.get('/api/users', (req, res) => {
  const data = req.body;
  res.json(data);
});
```

**2. Forgetting to Handle Errors:**

❌ WRONG:
```javascript
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  res.json(user); // Could be undefined
});
```

✅ CORRECT:
```javascript
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});
```

**3. Using Verbs in REST URLs:**

❌ WRONG:
```javascript
POST /api/createUser
GET  /api/getUsers
DELETE /api/deleteUser/123
```

✅ CORRECT:
```javascript
POST   /api/users
GET    /api/users
DELETE /api/users/123
```

**4. Not Returning After Sending Response:**

❌ WRONG:
```javascript
app.get('/api/users/:id', (req, res) => {
  if (!user) {
    res.status(404).json({ error: 'Not found' });
    // Code continues executing!
  }
  res.json(user); // Error: Cannot set headers after they are sent
});
```

✅ CORRECT:
```javascript
app.get('/api/users/:id', (req, res) => {
  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(user);
});
```

---

## Quick Reference

### Creating an Express Server:
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/resource', (req, res) => {
  res.json({ message: 'Success' });
});

app.listen(3000, () => console.log('Server running'));
```

### CRUD Operations Template:
```javascript
// GET all
router.get('/', controller.getAll);

// GET one
router.get('/:id', controller.getById);

// POST create
router.post('/', controller.create);

// PUT update
router.put('/:id', controller.update);

// DELETE remove
router.delete('/:id', controller.delete);
```

### MVC File Structure:
```javascript
// Model
class Model {
  static getAll() { /* ... */ }
  static create(data) { /* ... */ }
}

// Controller
exports.getAll = (req, res) => {
  const data = Model.getAll();
  res.json(data);
};

// Route
router.get('/', controller.getAll);
```

---

## Practice Challenge

**Build a Task Management REST API:**

Create a complete REST API for managing tasks with the following features:

**Requirements:**
1. Use Express.js with MVC architecture
2. Implement CRUD operations for tasks
3. Task properties: id, title, description, completed (boolean), createdAt
4. Organize code into models, controllers, and routes folders
5. Include proper error handling and validation
6. Use appropriate HTTP methods and status codes
7. Test all endpoints with Postman or cURL

**Endpoints to implement:**
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/complete` - Mark task as completed
- `DELETE /api/tasks/:id` - Delete task

**Bonus:**
- Add filtering (e.g., `GET /api/tasks?completed=true`)
- Add sorting (e.g., `GET /api/tasks?sort=createdAt`)
- Add pagination (e.g., `GET /api/tasks?page=1&limit=10`)

**Time: 40 minutes**

---

## Resources

- [Node.js Official Documentation](https://nodejs.org/docs/latest/api/)
- [Express.js Documentation](https://expressjs.com/)
- [npm Documentation](https://docs.npmjs.com/)
- [RESTful API Design Guide](https://restfulapi.net/)
- [HTTP Status Codes Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Understanding MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

---

## Questions?

**What we learned today:**
- Node.js runtime and event loop
- Module systems (CommonJS and ES6)
- Express.js server setup and middleware
- RESTful API design principles
- MVC architecture pattern
- Best practices for backend development

**Next class:** We'll dive into **MongoDB** and learn how to persist data in a database, create data models with Mongoose, and build complete CRUD applications with real data storage!
