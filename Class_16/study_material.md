# Class 16: Node.js & Express Fundamentals - Complete Study Material

## Table of Contents
1. [Introduction to Backend Development](#1-introduction-to-backend-development)
2. [Node.js Fundamentals](#2-nodejs-fundamentals)
3. [Node.js Modules & NPM](#3-nodejs-modules--npm)
4. [Express.js Setup & Routing](#4-expressjs-setup--routing)
5. [REST API Concepts & Implementation](#5-rest-api-concepts--implementation)
6. [MVC Architecture & Best Practices](#6-mvc-architecture--best-practices)
7. [Building Complete Applications](#7-building-complete-applications)
8. [Best Practices and Common Pitfalls](#8-best-practices-and-common-pitfalls)
9. [Practice Exercises](#practice-exercises)
10. [Additional Resources](#additional-resources)

---

## 1. Introduction to Backend Development

### What is Backend Development?

Backend development refers to server-side development focused on databases, scripting, and website architecture. It's everything that happens behind the scenes that users don't see directly.

**Frontend vs Backend:**

| Aspect | Frontend | Backend |
|--------|----------|---------|
| **Location** | Client-side (browser) | Server-side |
| **Languages** | HTML, CSS, JavaScript | Node.js, Python, Java, etc. |
| **Purpose** | User interface and experience | Data processing and storage |
| **Visibility** | Visible to users | Hidden from users |
| **Examples** | Buttons, forms, animations | Authentication, database queries |

### The Client-Server Model

```
┌─────────┐          HTTP Request          ┌─────────┐
│         │ ──────────────────────────────> │         │
│ Client  │                                 │ Server  │
│(Browser)│ <────────────────────────────── │(Node.js)│
│         │          HTTP Response          │         │
└─────────┘                                 └─────────┘
                                                  │
                                                  │ Queries
                                                  ▼
                                            ┌──────────┐
                                            │ Database │
                                            └──────────┘
```

**Request-Response Cycle:**
1. Client sends HTTP request to server
2. Server processes the request
3. Server may query database
4. Server sends HTTP response back to client
5. Client displays the result

### Why Learn Backend with JavaScript?

**Benefits of Full-Stack JavaScript:**
- **Same Language**: Use JavaScript for both frontend and backend
- **Code Reuse**: Share code between client and server
- **JSON Native**: JavaScript handles JSON naturally
- **Large Ecosystem**: npm has millions of packages
- **Active Community**: Huge support and resources
- **Career Opportunities**: High demand for full-stack developers

### The MERN Stack

**M**ongoDB - Database
**E**xpress.js - Backend framework
**R**eact - Frontend framework
**N**ode.js - Runtime environment

This course focuses on the **EN** part of MERN - Express and Node.js.

---

## 2. Node.js Fundamentals

### What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript outside the browser, particularly on servers.

**Key Characteristics:**
- **Runtime Environment**: Not a language or framework, but an environment to run JavaScript
- **V8 Engine**: Same engine that powers Google Chrome
- **Cross-Platform**: Works on Windows, macOS, Linux
- **Open Source**: Free and maintained by the community

### History and Evolution

- **2009**: Ryan Dahl created Node.js
- **2010**: npm (Node Package Manager) released
- **2015**: Node.js Foundation formed
- **2019**: Node.js and JS Foundation merged into OpenJS Foundation
- **Present**: Powers millions of applications worldwide

**Major Companies Using Node.js:**
- Netflix
- LinkedIn
- Uber
- PayPal
- NASA
- Walmart

### Node.js Architecture

#### The V8 Engine

The V8 engine compiles JavaScript directly to native machine code for high performance.

```javascript
// JavaScript code
function add(a, b) {
  return a + b;
}

// V8 compiles this to machine code for fast execution
```

#### Single-Threaded Event Loop

Node.js uses a single thread with an event loop to handle concurrent operations.

**Traditional Multi-Threaded Model:**
```
Request 1 → Thread 1 → Waits for I/O → Response
Request 2 → Thread 2 → Waits for I/O → Response
Request 3 → Thread 3 → Waits for I/O → Response
(Each thread consumes memory)
```

**Node.js Event Loop Model:**
```
Request 1 ─┐
Request 2 ─┼─> Event Loop → Delegate I/O → Continue
Request 3 ─┘                    ↓
                            Callback Queue
                                 ↓
                            Process Results
```

#### How the Event Loop Works

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise callback');
});

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 3. Promise callback
// 2. Timeout callback
```

**Event Loop Phases:**
1. **Call Stack**: Executes synchronous code
2. **Microtask Queue**: Processes Promise callbacks
3. **Macrotask Queue**: Processes setTimeout, setInterval callbacks
4. **I/O Callbacks**: Handles file system, network operations

### Non-Blocking I/O

Node.js excels at I/O-intensive tasks because it doesn't block the thread while waiting for operations to complete.

**Blocking (Synchronous) Code:**

```javascript
const fs = require('fs');

console.log('Start reading file...');
const data = fs.readFileSync('large-file.txt', 'utf8'); // Blocks here
console.log('File content:', data);
console.log('Continue with other tasks'); // Has to wait

// Timeline:
// Start → Wait for file → Process file → Continue
```

**Non-Blocking (Asynchronous) Code:**

```javascript
const fs = require('fs');

console.log('Start reading file...');
fs.readFile('large-file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File content:', data);
});
console.log('Continue with other tasks'); // Executes immediately

// Timeline:
// Start → Continue (file reads in background) → File ready → Process
```

**Why This Matters:**

```javascript
// Handling multiple requests with non-blocking I/O
app.get('/user/:id', async (req, res) => {
  const user = await db.findUser(req.params.id); // Doesn't block other requests
  res.json(user);
});

// Server can handle thousands of concurrent requests
// without creating new threads
```

### Installing and Setting Up Node.js

**Installation Steps:**

1. Download from [nodejs.org](https://nodejs.org)
2. Install LTS (Long Term Support) version
3. Verify installation:

```bash
# Check Node.js version
node --version
# Output: v18.17.0 (or your version)

# Check npm version
npm --version
# Output: 9.6.7 (or your version)
```

**Node.js REPL (Read-Eval-Print Loop):**

```bash
# Start REPL
node

# Now you can run JavaScript
> console.log('Hello Node.js!')
Hello Node.js!
> 2 + 2
4
> const add = (a, b) => a + b
> add(5, 3)
8
> .exit  // Exit REPL
```

### Running JavaScript Files

**Create a file:**

```javascript
// app.js
console.log('Hello from Node.js!');

const greeting = name => `Hello, ${name}!`;
console.log(greeting('World'));

// Access Node.js globals
console.log('Current directory:', __dirname);
console.log('Current file:', __filename);
console.log('Node version:', process.version);
```

**Run the file:**

```bash
node app.js

# Output:
# Hello from Node.js!
# Hello, World!
# Current directory: /Users/yourname/projects
# Current file: /Users/yourname/projects/app.js
# Node version: v18.17.0
```

### Global Objects in Node.js

Node.js provides several global objects that are available in all modules.

#### The `process` Object

```javascript
// Environment information
console.log(process.version); // Node.js version
console.log(process.platform); // Operating system
console.log(process.arch); // CPU architecture

// Environment variables
console.log(process.env.NODE_ENV); // development, production, etc.
console.log(process.env.PORT); // Port number from environment

// Current working directory
console.log(process.cwd());

// Process ID
console.log(process.pid);

// Memory usage
console.log(process.memoryUsage());
// {
//   rss: 30474240,
//   heapTotal: 6791168,
//   heapUsed: 4785928,
//   external: 1090446
// }

// Command line arguments
// Run: node app.js arg1 arg2
console.log(process.argv);
// ['node', '/path/to/app.js', 'arg1', 'arg2']

// Exit process
// process.exit(0); // Success
// process.exit(1); // Error
```

#### Process Events

```javascript
// When process is about to exit
process.on('exit', (code) => {
  console.log(`Process exiting with code: ${code}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
```

#### `__dirname` and `__filename`

```javascript
// __dirname: Absolute path of directory containing current file
console.log(__dirname);
// /Users/yourname/projects/myapp

// __filename: Absolute path of current file
console.log(__filename);
// /Users/yourname/projects/myapp/app.js

// Use with path module for cross-platform compatibility
const path = require('path');
const filePath = path.join(__dirname, 'data', 'file.txt');
console.log(filePath);
// /Users/yourname/projects/myapp/data/file.txt
```

#### Timers

```javascript
// setTimeout - Execute once after delay
setTimeout(() => {
  console.log('Executed after 2 seconds');
}, 2000);

// setInterval - Execute repeatedly
const intervalId = setInterval(() => {
  console.log('Executed every 1 second');
}, 1000);

// clearInterval - Stop interval
setTimeout(() => {
  clearInterval(intervalId);
  console.log('Interval cleared');
}, 5000);

// setImmediate - Execute after current event loop
setImmediate(() => {
  console.log('Executed immediately after I/O events');
});

// process.nextTick - Execute before next event loop phase
process.nextTick(() => {
  console.log('Executed before next event loop tick');
});
```

**Execution Order:**

```javascript
console.log('1');

setImmediate(() => console.log('2'));

process.nextTick(() => console.log('3'));

setTimeout(() => console.log('4'), 0);

Promise.resolve().then(() => console.log('5'));

console.log('6');

// Output:
// 1
// 6
// 3
// 5
// 4
// 2
```

### Node.js Use Cases

**Best Use Cases:**
1. **REST APIs and Microservices**
   - Fast, scalable API servers
   - Microservices architecture

2. **Real-Time Applications**
   - Chat applications
   - Live notifications
   - Collaborative tools

3. **Streaming Applications**
   - Video/audio streaming
   - File uploads/downloads

4. **Server-Side Rendering (SSR)**
   - Next.js, Nuxt.js applications
   - Improved SEO

5. **Command-Line Tools**
   - Build tools (webpack, gulp)
   - CLI utilities

6. **IoT Applications**
   - Lightweight and efficient
   - Event-driven architecture

**Not Ideal For:**
- CPU-intensive operations (video encoding, image processing)
- Heavy computational tasks
- Applications requiring multi-threading

---

## 3. Node.js Modules & NPM

### Understanding Modules

Modules are reusable blocks of code whose existence does not accidentally impact other code. Node.js has three types of modules:

1. **Core Modules**: Built into Node.js
2. **Local Modules**: Created by you
3. **Third-Party Modules**: Installed via npm

### CommonJS Module System

CommonJS is the traditional module system used in Node.js.

#### Exporting from Modules

**Single Export:**

```javascript
// calculator.js
const add = (a, b) => a + b;

module.exports = add;
```

**Multiple Exports (Object):**

```javascript
// calculator.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

module.exports = {
  add,
  subtract,
  multiply,
  divide
};
```

**Multiple Exports (Direct):**

```javascript
// calculator.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;
```

**Important Difference:**

```javascript
// ✅ CORRECT
module.exports = { add, subtract };
exports.add = (a, b) => a + b; // Works

// ❌ WRONG
exports = { add, subtract }; // Doesn't work! Reassignment breaks reference
```

#### Importing Modules

```javascript
// app.js

// Import single export
const add = require('./calculator');
console.log(add(5, 3)); // 8

// Import object with multiple exports
const calculator = require('./calculator');
console.log(calculator.add(5, 3)); // 8
console.log(calculator.subtract(10, 4)); // 6

// Destructuring import
const { add, multiply } = require('./calculator');
console.log(add(5, 3)); // 8
console.log(multiply(4, 2)); // 8
```

#### Module Patterns

**Pattern 1: Utility Functions**

```javascript
// utils/string.js
exports.capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.reverse = (str) => {
  return str.split('').reverse().join('');
};

exports.truncate = (str, length) => {
  return str.length > length ? str.slice(0, length) + '...' : str;
};
```

**Pattern 2: Class/Constructor**

```javascript
// models/User.js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return `${this.name} (${this.email})`;
  }
}

module.exports = User;

// app.js
const User = require('./models/User');
const user = new User('John Doe', 'john@example.com');
console.log(user.getInfo());
```

**Pattern 3: Singleton**

```javascript
// database.js
class Database {
  constructor() {
    this.connection = null;
  }

  connect() {
    if (!this.connection) {
      this.connection = 'Connected to database';
      console.log(this.connection);
    }
    return this.connection;
  }
}

module.exports = new Database(); // Export instance, not class

// app.js
const db = require('./database');
db.connect(); // Connected to database

// Another file
const db2 = require('./database');
db2.connect(); // Same instance, connection already established
```

**Pattern 4: Module with Configuration**

```javascript
// logger.js
module.exports = (prefix = 'LOG') => {
  return {
    log: (message) => console.log(`[${prefix}] ${message}`),
    error: (message) => console.error(`[${prefix}] ERROR: ${message}`),
    warn: (message) => console.warn(`[${prefix}] WARNING: ${message}`)
  };
};

// app.js
const logger = require('./logger')('APP');
logger.log('Application started'); // [APP] Application started
logger.error('Something went wrong'); // [APP] ERROR: Something went wrong
```

### ES6 Module System (ESM)

ES6 modules are the modern JavaScript module system, now supported in Node.js.

#### Configuring ES6 Modules

**Method 1: package.json**

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module"
}
```

**Method 2: .mjs file extension**

```javascript
// calculator.mjs - Automatically treated as ES6 module
```

#### ES6 Export Syntax

**Named Exports:**

```javascript
// calculator.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export function multiply(a, b) {
  return a * b;
}

export class Calculator {
  divide(a, b) {
    return a / b;
  }
}
```

**Default Export:**

```javascript
// calculator.js
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

export default calculator;
```

**Combined Exports:**

```javascript
// calculator.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

const calculator = { add, subtract };
export default calculator;
```

#### ES6 Import Syntax

**Named Imports:**

```javascript
// app.js
import { add, subtract } from './calculator.js';
console.log(add(5, 3)); // 8
```

**Default Import:**

```javascript
// app.js
import calculator from './calculator.js';
console.log(calculator.add(5, 3)); // 8
```

**Combined Import:**

```javascript
// app.js
import calculator, { add, subtract } from './calculator.js';
```

**Import All:**

```javascript
// app.js
import * as calc from './calculator.js';
console.log(calc.add(5, 3)); // 8
console.log(calc.subtract(10, 4)); // 6
```

**Renaming Imports:**

```javascript
// app.js
import { add as sum, subtract as minus } from './calculator.js';
console.log(sum(5, 3)); // 8
console.log(minus(10, 4)); // 6
```

#### CommonJS vs ES6 Modules

| Feature | CommonJS | ES6 Modules |
|---------|----------|-------------|
| Syntax | `require()`, `module.exports` | `import`, `export` |
| Loading | Synchronous | Asynchronous |
| When loaded | Runtime | Parse time |
| Default | Yes (Node.js) | Requires config |
| Tree shaking | No | Yes |
| File extension | .js | .js (with config) or .mjs |

**When to Use Each:**
- **CommonJS**: Legacy Node.js projects, most npm packages
- **ES6 Modules**: Modern projects, better for bundlers, standard JavaScript

### Core Node.js Modules

#### File System (fs)

```javascript
const fs = require('fs');
const fsPromises = require('fs').promises;

// Read file - Callback style
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(data);
});

// Read file - Promise style
fsPromises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Read file - Async/Await
async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}

// Read file - Synchronous (blocking, avoid in production)
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error('Error:', err);
}

// Write file
await fsPromises.writeFile('output.txt', 'Hello Node.js!');

// Append to file
await fsPromises.appendFile('log.txt', 'New log entry\n');

// Check if file exists
try {
  await fsPromises.access('file.txt');
  console.log('File exists');
} catch {
  console.log('File does not exist');
}

// Get file stats
const stats = await fsPromises.stat('file.txt');
console.log('Size:', stats.size);
console.log('Is file:', stats.isFile());
console.log('Is directory:', stats.isDirectory());

// Create directory
await fsPromises.mkdir('new-folder', { recursive: true });

// Read directory contents
const files = await fsPromises.readdir('folder');
console.log(files); // ['file1.txt', 'file2.txt']

// Delete file
await fsPromises.unlink('file-to-delete.txt');

// Delete directory
await fsPromises.rmdir('folder-to-delete');

// Rename/Move file
await fsPromises.rename('old-name.txt', 'new-name.txt');

// Copy file
await fsPromises.copyFile('source.txt', 'destination.txt');
```

**Working with Streams:**

```javascript
const fs = require('fs');

// Read large file with streams (memory efficient)
const readStream = fs.createReadStream('large-file.txt', 'utf8');

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length);
});

readStream.on('end', () => {
  console.log('Finished reading file');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});

// Write stream
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Line 1\n');
writeStream.write('Line 2\n');
writeStream.end('Final line\n');

// Pipe streams (copy file)
const input = fs.createReadStream('source.txt');
const output = fs.createWriteStream('destination.txt');
input.pipe(output);
```

#### Path Module

```javascript
const path = require('path');

// Join path segments
const filePath = path.join('/users', 'john', 'documents', 'file.txt');
console.log(filePath); // /users/john/documents/file.txt

// Resolve absolute path
const absolutePath = path.resolve('folder', 'file.txt');
console.log(absolutePath); // /current/directory/folder/file.txt

// Get directory name
console.log(path.dirname('/users/john/file.txt')); // /users/john

// Get file name
console.log(path.basename('/users/john/file.txt')); // file.txt
console.log(path.basename('/users/john/file.txt', '.txt')); // file

// Get file extension
console.log(path.extname('file.txt')); // .txt
console.log(path.extname('archive.tar.gz')); // .gz

// Parse path
const parsed = path.parse('/users/john/file.txt');
console.log(parsed);
// {
//   root: '/',
//   dir: '/users/john',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// Format path
const formatted = path.format({
  dir: '/users/john',
  base: 'file.txt'
});
console.log(formatted); // /users/john/file.txt

// Path separator
console.log(path.sep); // / on Unix, \ on Windows

// Check if path is absolute
console.log(path.isAbsolute('/users/john')); // true
console.log(path.isAbsolute('folder/file.txt')); // false

// Normalize path
console.log(path.normalize('/users//john/../jane/./file.txt'));
// /users/jane/file.txt
```

#### URL Module

```javascript
const url = require('url');

// Parse URL string
const myUrl = new URL('https://example.com:8080/path?query=value#hash');

console.log(myUrl.protocol); // https:
console.log(myUrl.hostname); // example.com
console.log(myUrl.port); // 8080
console.log(myUrl.pathname); // /path
console.log(myUrl.search); // ?query=value
console.log(myUrl.searchParams.get('query')); // value
console.log(myUrl.hash); // #hash

// Construct URL
const newUrl = new URL('/api/users', 'https://example.com');
console.log(newUrl.href); // https://example.com/api/users

// URL search params
const params = new URLSearchParams('name=John&age=30&city=NYC');
console.log(params.get('name')); // John
console.log(params.get('age')); // 30

params.append('country', 'USA');
params.set('age', '31'); // Update existing
console.log(params.toString()); // name=John&age=31&city=NYC&country=USA

// Iterate over params
for (const [key, value] of params) {
  console.log(`${key}: ${value}`);
}
```

#### HTTP Module

```javascript
const http = require('http');

// Create simple HTTP server
const server = http.createServer((req, res) => {
  // Request information
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);

  // Set response headers
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;

  // Send response
  res.end(JSON.stringify({ message: 'Hello from Node.js!' }));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Handle different routes
const server2 = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  } else if (req.url === '/api' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'API endpoint' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});
```

### NPM (Node Package Manager)

#### Understanding package.json

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack"
  },
  "keywords": ["nodejs", "express", "api"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.0.0"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

#### Semantic Versioning

**Format: MAJOR.MINOR.PATCH**

```json
{
  "dependencies": {
    "express": "4.18.2"
    //        │  │   └─ PATCH: Bug fixes
    //        │  └───── MINOR: New features (backward compatible)
    //        └──────── MAJOR: Breaking changes
  }
}
```

**Version Ranges:**

```json
{
  "dependencies": {
    "express": "4.18.2",      // Exact version
    "mongoose": "^7.0.0",     // Compatible with 7.x.x (default)
    "lodash": "~4.17.21",     // Compatible with 4.17.x
    "axios": ">=1.0.0",       // Greater than or equal to
    "dotenv": "*"             // Any version (not recommended)
  }
}
```

#### NPM Commands

```bash
# Initialize project
npm init              # Interactive
npm init -y          # With defaults

# Install packages
npm install express                    # Save to dependencies
npm install --save-dev jest           # Save to devDependencies
npm install -g nodemon                # Install globally
npm install express@4.17.1            # Specific version
npm install                           # Install all from package.json

# Shortcuts
npm i express                         # Same as install
npm i -D jest                        # Same as --save-dev
npm i -g                             # Same as --global

# Update packages
npm update                           # Update all packages
npm update express                   # Update specific package

# Remove packages
npm uninstall express                # Remove package
npm uninstall -g nodemon            # Remove global package

# List packages
npm list                            # Show dependency tree
npm list --depth=0                  # Show top-level only
npm list -g                         # Show global packages

# View package info
npm view express                    # Package information
npm view express versions           # Available versions

# Run scripts
npm start                           # Run "start" script
npm test                            # Run "test" script
npm run dev                         # Run custom script

# Check for outdated packages
npm outdated

# Audit for vulnerabilities
npm audit
npm audit fix                       # Fix vulnerabilities

# Clean cache
npm cache clean --force
```

#### Creating npm Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "build": "webpack --mode production",
    "lint": "eslint . --fix",
    "format": "prettier --write \"**/*.js\"",
    "prestart": "echo 'Starting server...'",
    "poststart": "echo 'Server started!'",
    "clean": "rm -rf dist"
  }
}
```

**Pre and Post Hooks:**

```bash
npm start
# Runs: prestart → start → poststart
```

#### Popular npm Packages

**Utility Libraries:**
- `lodash` - Utility functions
- `moment` - Date manipulation
- `axios` - HTTP client
- `dotenv` - Environment variables

**Web Frameworks:**
- `express` - Web framework
- `koa` - Modern web framework
- `fastify` - Fast web framework

**Database:**
- `mongoose` - MongoDB ODM
- `pg` - PostgreSQL client
- `mysql` - MySQL client

**Authentication:**
- `jsonwebtoken` - JWT tokens
- `bcrypt` - Password hashing
- `passport` - Authentication middleware

**Development:**
- `nodemon` - Auto-restart server
- `jest` - Testing framework
- `eslint` - Code linting
- `prettier` - Code formatting

---

## 4. Express.js Setup & Routing

### Introduction to Express.js

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

**Why Express?**
- Simplifies Node.js server creation
- Robust routing system
- Middleware support
- Large ecosystem
- Easy to learn
- Industry standard

### Setting Up Express

**Installation:**

```bash
# Create project
mkdir my-express-app
cd my-express-app

# Initialize package.json
npm init -y

# Install Express
npm install express

# Install nodemon for development
npm install --save-dev nodemon

# Update package.json scripts
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**Basic Server:**

```javascript
// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Define a route
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Run server:**

```bash
npm run dev  # Use nodemon (auto-restart)
npm start    # Use node
```

### Understanding Middleware

Middleware functions have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle (`next`).

**Middleware Flow:**

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
            ↓                ↓                ↓
          next()          next()          res.send()
```

#### Application-Level Middleware

```javascript
const express = require('express');
const app = express();

// Middleware that runs for all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass to next middleware
});

// Middleware for specific path
app.use('/api', (req, res, next) => {
  console.log('API request');
  next();
});

// Multiple middleware functions
app.use('/admin',
  (req, res, next) => {
    console.log('Check authentication');
    next();
  },
  (req, res, next) => {
    console.log('Check authorization');
    next();
  }
);
```

#### Built-In Middleware

```javascript
// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Serve static files with virtual path prefix
app.use('/static', express.static('public'));
// Now: http://localhost:3000/static/image.jpg → public/image.jpg
```

#### Custom Middleware

```javascript
// Logger middleware
const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  next();
};

app.use(logger);

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify token (simplified)
  if (token === 'valid-token') {
    req.user = { id: 1, name: 'John' }; // Attach user to request
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Use on specific routes
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

// Validation middleware
const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  next();
};

app.post('/users', validateUser, (req, res) => {
  // If we reach here, validation passed
  res.json({ message: 'User created', data: req.body });
});
```

#### Error Handling Middleware

```javascript
// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Throwing errors in routes
app.get('/error', (req, res, next) => {
  const error = new Error('Something went wrong!');
  error.statusCode = 500;
  next(error); // Pass to error handler
});

// Async error handling
app.get('/async-error', async (req, res, next) => {
  try {
    const data = await someAsyncOperation();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

#### Third-Party Middleware

```javascript
// Morgan - HTTP request logger
const morgan = require('morgan');
app.use(morgan('dev'));
// Output: GET /api/users 200 15.234 ms

// CORS - Enable Cross-Origin Resource Sharing
const cors = require('cors');
app.use(cors());

// Helmet - Security headers
const helmet = require('helmet');
app.use(helmet());

// Compression - Compress responses
const compression = require('compression');
app.use(compression());

// Cookie Parser - Parse cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

### Express Routing

#### Basic Routing

```javascript
// GET request
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST request
app.post('/users', (req, res) => {
  const userData = req.body;
  res.status(201).json({ message: 'User created', data: userData });
});

// PUT request
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  res.json({ message: `User ${id} updated`, data: updates });
});

// PATCH request
app.patch('/users/:id', (req, res) => {
  res.json({ message: 'User partially updated' });
});

// DELETE request
app.delete('/users/:id', (req, res) => {
  res.json({ message: 'User deleted' });
});

// Handle multiple methods on same route
app.route('/users/:id')
  .get((req, res) => {
    res.json({ message: 'Get user' });
  })
  .put((req, res) => {
    res.json({ message: 'Update user' });
  })
  .delete((req, res) => {
    res.json({ message: 'Delete user' });
  });
```

#### Route Parameters

```javascript
// Single parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId });
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Optional parameter
app.get('/users/:id?', (req, res) => {
  if (req.params.id) {
    res.json({ message: `User ${req.params.id}` });
  } else {
    res.json({ message: 'All users' });
  }
});

// Parameter validation
app.param('id', (req, res, next, id) => {
  // Validate ID
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  // Check if resource exists
  req.user = { id, name: 'John' }; // Attach to request
  next();
});

app.get('/users/:id', (req, res) => {
  res.json(req.user); // Already validated and loaded
});
```

#### Query Parameters

```javascript
// URL: /search?q=nodejs&page=1&limit=10
app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;

  res.json({
    query: q,
    page: parseInt(page),
    limit: parseInt(limit),
    results: [] // Your search results
  });
});

// URL: /filter?tags=nodejs,express,api
app.get('/filter', (req, res) => {
  const tags = req.query.tags ? req.query.tags.split(',') : [];
  res.json({ tags });
});

// URL: /sort?order=desc&field=createdAt
app.get('/sort', (req, res) => {
  const { order = 'asc', field = 'id' } = req.query;
  res.json({ sortBy: field, order });
});
```

#### Route Patterns

```javascript
// Wildcard routes
app.get('/files/*', (req, res) => {
  res.send(`File path: ${req.params[0]}`);
});
// Matches: /files/docs/readme.txt

// Regular expression routes
app.get(/^\/api\/v[0-9]+\/users$/, (req, res) => {
  res.send('Versioned API endpoint');
});
// Matches: /api/v1/users, /api/v2/users

// Character class
app.get('/ab?cd', (req, res) => {
  res.send('Match');
});
// Matches: /acd, /abcd

app.get('/ab+cd', (req, res) => {
  res.send('Match');
});
// Matches: /abcd, /abbcd, /abbbcd

app.get('/ab*cd', (req, res) => {
  res.send('Match');
});
// Matches: /abcd, /abxcd, /ab123cd
```

### Response Methods

```javascript
// Send text
app.get('/text', (req, res) => {
  res.send('Plain text response');
});

// Send JSON
app.get('/json', (req, res) => {
  res.json({ message: 'JSON response', success: true });
});

// Send status code
app.get('/status', (req, res) => {
  res.sendStatus(204); // No Content
});

// Set status and send JSON
app.get('/created', (req, res) => {
  res.status(201).json({ message: 'Resource created' });
});

// Send file
app.get('/download', (req, res) => {
  res.sendFile('/path/to/file.pdf');
});

// Download file
app.get('/file', (req, res) => {
  res.download('/path/to/file.pdf', 'downloaded-file.pdf');
});

// Redirect
app.get('/old-url', (req, res) => {
  res.redirect('/new-url');
});

app.get('/external', (req, res) => {
  res.redirect(301, 'https://example.com'); // Permanent redirect
});

// Set headers
app.get('/headers', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.set('X-Custom-Header', 'value');
  res.send({ message: 'Headers set' });
});

// Chain methods
app.get('/chain', (req, res) => {
  res
    .status(200)
    .set('Content-Type', 'application/json')
    .json({ message: 'Chained methods' });
});
```

### Express Router

Organize routes into separate modules for better code structure.

**routes/users.js:**

```javascript
const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
  console.log('User router middleware');
  next();
});

// Routes
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
  res.status(204).send();
});

module.exports = router;
```

**routes/posts.js:**

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all posts' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get post ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Post created' });
});

module.exports = router;
```

**server.js:**

```javascript
const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

app.use(express.json());

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(3000);
```

**Nested Routers:**

```javascript
// routes/api.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const postRoutes = require('./posts');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;

// server.js
const apiRoutes = require('./routes/api');
app.use('/api/v1', apiRoutes);

// Results in:
// /api/v1/users
// /api/v1/posts
```

---

## 5. REST API Concepts & Implementation

### Understanding REST

REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server communication protocol (typically HTTP).

**REST Principles:**

1. **Client-Server Architecture**: Separation of concerns between UI and data storage
2. **Stateless**: Each request contains all information needed to process it
3. **Cacheable**: Responses must define themselves as cacheable or not
4. **Uniform Interface**: Consistent way to interact with resources
5. **Layered System**: Client cannot tell if connected directly to end server
6. **Code on Demand** (optional): Servers can extend client functionality

### RESTful Resource Design

**Resource**: Any information that can be named (user, product, order, etc.)

**Resource Naming Best Practices:**

```javascript
// ✅ CORRECT - Use nouns, not verbs
GET    /api/users
GET    /api/users/123
POST   /api/users
PUT    /api/users/123
DELETE /api/users/123

// ✅ CORRECT - Use plural nouns
GET    /api/products
POST   /api/orders

// ❌ WRONG - Don't use verbs
GET    /api/getUsers
POST   /api/createUser
DELETE /api/deleteUser

// ✅ CORRECT - Nested resources
GET    /api/users/123/posts
GET    /api/users/123/posts/456
POST   /api/users/123/posts

// ❌ WRONG - Too deeply nested (hard to maintain)
GET    /api/users/123/posts/456/comments/789/likes

// ✅ BETTER - Flat structure for deeply nested
GET    /api/comments/789/likes
POST   /api/comments/789/likes

// ✅ CORRECT - Use hyphens for multi-word resources
GET    /api/shopping-carts
GET    /api/user-profiles

// ❌ WRONG - Don't use underscores or camelCase in URLs
GET    /api/shopping_carts
GET    /api/shoppingCarts
```

### HTTP Methods (CRUD Operations)

| HTTP Method | CRUD | Purpose | Idempotent | Safe |
|-------------|------|---------|------------|------|
| GET | Read | Retrieve resource(s) | Yes | Yes |
| POST | Create | Create new resource | No | No |
| PUT | Update | Replace entire resource | Yes | No |
| PATCH | Update | Update partial resource | Yes | No |
| DELETE | Delete | Remove resource | Yes | No |

**Idempotent**: Making the same request multiple times produces the same result
**Safe**: Request doesn't modify server state

```javascript
// GET - Retrieve data (idempotent, safe)
app.get('/api/books', (req, res) => {
  // Returns same data every time (unless data changed externally)
  res.json(books);
});

// POST - Create (NOT idempotent)
app.post('/api/books', (req, res) => {
  // Each request creates a NEW resource
  const book = createBook(req.body);
  res.status(201).json(book);
});

// PUT - Full update (idempotent)
app.put('/api/books/:id', (req, res) => {
  // Same request produces same result
  updateBook(req.params.id, req.body);
  res.json(updatedBook);
});

// PATCH - Partial update (idempotent)
app.patch('/api/books/:id', (req, res) => {
  // Update only specified fields
  partialUpdateBook(req.params.id, req.body);
  res.json(updatedBook);
});

// DELETE - Remove (idempotent)
app.delete('/api/books/:id', (req, res) => {
  // First call deletes, subsequent calls also return success
  deleteBook(req.params.id);
  res.status(204).send();
});
```

### HTTP Status Codes

**Success Codes (2xx):**

| Code | Name | Usage |
|------|------|-------|
| 200 | OK | Successful GET, PUT, PATCH, or DELETE |
| 201 | Created | Successful POST (resource created) |
| 204 | No Content | Successful DELETE (no response body) |

**Client Error Codes (4xx):**

| Code | Name | Usage |
|------|------|-------|
| 400 | Bad Request | Invalid data/syntax |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Authenticated but no permission |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |

**Server Error Codes (5xx):**

| Code | Name | Usage |
|------|------|-------|
| 500 | Internal Server Error | Generic server error |
| 502 | Bad Gateway | Invalid response from upstream |
| 503 | Service Unavailable | Server overloaded or down |

**Example Usage:**

```javascript
// 200 OK - Successful GET
app.get('/api/users/:id', (req, res) => {
  const user = findUser(req.params.id);
  res.status(200).json(user); // or just res.json(user)
});

// 201 Created - Successful POST
app.post('/api/users', (req, res) => {
  const user = createUser(req.body);
  res.status(201).json(user);
});

// 204 No Content - Successful DELETE
app.delete('/api/users/:id', (req, res) => {
  deleteUser(req.params.id);
  res.status(204).send();
});

// 400 Bad Request - Invalid data
app.post('/api/users', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }
});

// 401 Unauthorized - No authentication
app.get('/api/protected', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Authentication required' });
  }
});

// 403 Forbidden - No permission
app.delete('/api/users/:id', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
});

// 404 Not Found - Resource doesn't exist
app.get('/api/users/:id', (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// 422 Unprocessable Entity - Validation error
app.post('/api/users', (req, res) => {
  const errors = validateUser(req.body);
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }
});

// 500 Internal Server Error
app.get('/api/users', (req, res) => {
  try {
    const users = getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### API Response Format

**Consistent Response Structure:**

```javascript
// ✅ CORRECT - Consistent success response
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe"
  }
}

// ✅ CORRECT - Consistent error response
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User with ID 123 not found"
  }
}

// ✅ CORRECT - Collection with metadata
{
  "success": true,
  "data": [
    { "id": 1, "name": "User 1" },
    { "id": 2, "name": "User 2" }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}

// ❌ WRONG - Inconsistent structure
// Sometimes: { "user": {...} }
// Sometimes: { "data": {...} }
// Sometimes: { "result": {...} }
```

**Implementation:**

```javascript
// Response helper functions
const sendSuccess = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data
  });
};

const sendError = (res, message, statusCode = 500, code = null) => {
  res.status(statusCode).json({
    success: false,
    error: {
      code: code || `ERROR_${statusCode}`,
      message
    }
  });
};

// Usage
app.get('/api/users/:id', (req, res) => {
  const user = findUser(req.params.id);

  if (!user) {
    return sendError(res, 'User not found', 404, 'USER_NOT_FOUND');
  }

  sendSuccess(res, user);
});

app.post('/api/users', (req, res) => {
  const user = createUser(req.body);
  sendSuccess(res, user, 201);
});
```

### Building a Complete REST API

**Example: Library Books API**

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// In-memory data store
let books = [
  {
    id: 1,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    isbn: '978-0452284234',
    available: true
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    isbn: '978-0061120084',
    available: true
  }
];

let nextId = 3;

// Helper functions
const findBook = (id) => books.find(b => b.id === parseInt(id));
const findBookIndex = (id) => books.findIndex(b => b.id === parseInt(id));

// GET /api/books - Get all books with filtering and sorting
app.get('/api/books', (req, res) => {
  let result = [...books];

  // Filter by author
  if (req.query.author) {
    result = result.filter(b =>
      b.author.toLowerCase().includes(req.query.author.toLowerCase())
    );
  }

  // Filter by availability
  if (req.query.available !== undefined) {
    const available = req.query.available === 'true';
    result = result.filter(b => b.available === available);
  }

  // Sort
  if (req.query.sortBy) {
    const field = req.query.sortBy;
    const order = req.query.order === 'desc' ? -1 : 1;

    result.sort((a, b) => {
      if (a[field] < b[field]) return -1 * order;
      if (a[field] > b[field]) return 1 * order;
      return 0;
    });
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedResults = result.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: paginatedResults,
    meta: {
      page,
      limit,
      total: result.length,
      totalPages: Math.ceil(result.length / limit)
    }
  });
});

// GET /api/books/:id - Get single book
app.get('/api/books/:id', (req, res) => {
  const book = findBook(req.params.id);

  if (!book) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  res.json({
    success: true,
    data: book
  });
});

// POST /api/books - Create new book
app.post('/api/books', (req, res) => {
  const { title, author, year, isbn } = req.body;

  // Validation
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!author || author.trim().length === 0) {
    errors.push('Author is required');
  }

  if (!year || year < 1000 || year > new Date().getFullYear()) {
    errors.push('Valid year is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // Check for duplicate ISBN
  if (isbn && books.some(b => b.isbn === isbn)) {
    return res.status(409).json({
      success: false,
      error: 'Book with this ISBN already exists'
    });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim(),
    year: parseInt(year),
    isbn: isbn || null,
    available: true
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    data: newBook
  });
});

// PUT /api/books/:id - Full update
app.put('/api/books/:id', (req, res) => {
  const index = findBookIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  const { title, author, year, isbn, available } = req.body;

  // Validation (same as POST)
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!author || author.trim().length === 0) {
    errors.push('Author is required');
  }

  if (!year || year < 1000 || year > new Date().getFullYear()) {
    errors.push('Valid year is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // Update book
  books[index] = {
    id: parseInt(req.params.id),
    title: title.trim(),
    author: author.trim(),
    year: parseInt(year),
    isbn: isbn || null,
    available: available !== undefined ? available : true
  };

  res.json({
    success: true,
    data: books[index]
  });
});

// PATCH /api/books/:id - Partial update
app.patch('/api/books/:id', (req, res) => {
  const index = findBookIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  const updates = req.body;
  const allowedFields = ['title', 'author', 'year', 'isbn', 'available'];

  // Validate allowed fields
  const invalidFields = Object.keys(updates).filter(
    field => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Invalid fields: ${invalidFields.join(', ')}`
    });
  }

  // Apply updates
  books[index] = {
    ...books[index],
    ...updates
  };

  res.json({
    success: true,
    data: books[index]
  });
});

// DELETE /api/books/:id - Delete book
app.delete('/api/books/:id', (req, res) => {
  const index = findBookIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  books.splice(index, 1);

  res.status(204).send();
});

// Search endpoint
app.get('/api/books/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      error: 'Search query is required'
    });
  }

  const results = books.filter(book =>
    book.title.toLowerCase().includes(q.toLowerCase()) ||
    book.author.toLowerCase().includes(q.toLowerCase())
  );

  res.json({
    success: true,
    data: results,
    meta: {
      query: q,
      count: results.length
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Testing REST APIs

**Using cURL:**

```bash
# GET all books
curl http://localhost:3000/api/books

# GET with query parameters
curl "http://localhost:3000/api/books?author=Orwell&available=true"

# GET single book
curl http://localhost:3000/api/books/1

# POST create book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925,
    "isbn": "978-0743273565"
  }'

# PUT update book
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "year": 1949,
    "isbn": "978-0452284234",
    "available": false
  }'

# PATCH partial update
curl -X PATCH http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"available": true}'

# DELETE book
curl -X DELETE http://localhost:3000/api/books/1

# Search
curl "http://localhost:3000/api/books/search?q=gatsby"
```

**Using Postman:**

1. Create a new collection "Books API"
2. Add requests for each endpoint
3. Set environment variables for base URL
4. Create tests to verify responses
5. Save example responses

---

## 6. MVC Architecture & Best Practices

### Understanding MVC Pattern

MVC (Model-View-Controller) is a software architectural pattern that separates application logic into three interconnected components.

**MVC Components in REST APIs:**

```
Client Request
      ↓
   Routes (Entry point)
      ↓
  Controller (Request handling & coordination)
      ↓
   Model (Data & business logic)
      ↓
  Controller (Format response)
      ↓
   View (JSON response)
      ↓
Client Response
```

**Benefits:**
- **Separation of Concerns**: Each component has a specific responsibility
- **Maintainability**: Easier to update and debug
- **Testability**: Each component can be tested independently
- **Reusability**: Models and controllers can be reused
- **Scalability**: Easy to add new features
- **Team Collaboration**: Different developers can work on different components

### Project Structure

```
my-api/
├── config/
│   ├── database.js       # Database configuration
│   └── environment.js    # Environment variables
├── controllers/
│   ├── book.controller.js
│   └── user.controller.js
├── models/
│   ├── book.model.js
│   └── user.model.js
├── routes/
│   ├── book.routes.js
│   ├── user.routes.js
│   └── index.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── utils/
│   ├── helpers.js
│   └── logger.js
├── tests/
│   ├── book.test.js
│   └── user.test.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

### Implementing Models

Models represent data structures and contain business logic.

**models/book.model.js:**

```javascript
// In-memory data store (later replace with database)
let books = [
  {
    id: 1,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    isbn: '978-0452284234'
  }
];

let nextId = 2;

class Book {
  // Get all books with optional filtering
  static getAll(filters = {}) {
    let result = [...books];

    if (filters.author) {
      result = result.filter(b =>
        b.author.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    if (filters.year) {
      result = result.filter(b => b.year === parseInt(filters.year));
    }

    return result;
  }

  // Get book by ID
  static getById(id) {
    return books.find(book => book.id === parseInt(id));
  }

  // Create new book
  static create(bookData) {
    const newBook = {
      id: nextId++,
      title: bookData.title,
      author: bookData.author,
      year: parseInt(bookData.year),
      isbn: bookData.isbn || null,
      createdAt: new Date()
    };

    books.push(newBook);
    return newBook;
  }

  // Update book
  static update(id, bookData) {
    const index = books.findIndex(book => book.id === parseInt(id));

    if (index === -1) {
      return null;
    }

    books[index] = {
      ...books[index],
      ...bookData,
      id: parseInt(id), // Ensure ID doesn't change
      updatedAt: new Date()
    };

    return books[index];
  }

  // Delete book
  static delete(id) {
    const index = books.findIndex(book => book.id === parseInt(id));

    if (index === -1) {
      return false;
    }

    books.splice(index, 1);
    return true;
  }

  // Search books
  static search(query) {
    const lowerQuery = query.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery)
    );
  }

  // Check if ISBN exists
  static isbnExists(isbn) {
    return books.some(book => book.isbn === isbn);
  }

  // Get books by author
  static getByAuthor(author) {
    return books.filter(book =>
      book.author.toLowerCase() === author.toLowerCase()
    );
  }

  // Get statistics
  static getStats() {
    return {
      totalBooks: books.length,
      uniqueAuthors: new Set(books.map(b => b.author)).size,
      oldestBook: Math.min(...books.map(b => b.year)),
      newestBook: Math.max(...books.map(b => b.year))
    };
  }
}

module.exports = Book;
```

**Model with Class-based approach:**

```javascript
// models/User.js
class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt || new Date();
  }

  // Instance method
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }

  // Instance method
  isEmailValid() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  // Static methods for CRUD operations
  static async findAll() {
    // Database query here
    return users.map(u => new User(u));
  }

  static async findById(id) {
    // Database query here
    const userData = users.find(u => u.id === id);
    return userData ? new User(userData) : null;
  }

  async save() {
    // Save to database
    if (this.id) {
      // Update existing
      return this.update();
    } else {
      // Create new
      this.id = nextId++;
      users.push(this.toJSON());
      return this;
    }
  }

  async update() {
    // Update in database
    const index = users.findIndex(u => u.id === this.id);
    if (index !== -1) {
      users[index] = this.toJSON();
    }
    return this;
  }

  async delete() {
    // Delete from database
    const index = users.findIndex(u => u.id === this.id);
    return index !== -1 ? users.splice(index, 1) : false;
  }
}

module.exports = User;
```

### Implementing Controllers

Controllers handle incoming requests, interact with models, and return responses.

**controllers/book.controller.js:**

```javascript
const Book = require('../models/book.model');

// GET /api/books - Get all books
exports.getAllBooks = (req, res) => {
  try {
    const filters = {
      author: req.query.author,
      year: req.query.year
    };

    const books = Book.getAll(filters);

    res.json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error retrieving books',
      details: error.message
    });
  }
};

// GET /api/books/:id - Get single book
exports.getBookById = (req, res) => {
  try {
    const book = Book.getById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error retrieving book',
      details: error.message
    });
  }
};

// POST /api/books - Create new book
exports.createBook = (req, res) => {
  try {
    const { title, author, year, isbn } = req.body;

    // Validation (can be moved to middleware)
    if (!title || !author || !year) {
      return res.status(400).json({
        success: false,
        error: 'Title, author, and year are required'
      });
    }

    // Check for duplicate ISBN
    if (isbn && Book.isbnExists(isbn)) {
      return res.status(409).json({
        success: false,
        error: 'Book with this ISBN already exists'
      });
    }

    const newBook = Book.create({ title, author, year, isbn });

    res.status(201).json({
      success: true,
      data: newBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error creating book',
      details: error.message
    });
  }
};

// PUT /api/books/:id - Update book
exports.updateBook = (req, res) => {
  try {
    const { title, author, year, isbn } = req.body;

    // Validation
    if (!title || !author || !year) {
      return res.status(400).json({
        success: false,
        error: 'Title, author, and year are required'
      });
    }

    const updatedBook = Book.update(req.params.id, {
      title,
      author,
      year,
      isbn
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: updatedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error updating book',
      details: error.message
    });
  }
};

// DELETE /api/books/:id - Delete book
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
    res.status(500).json({
      success: false,
      error: 'Error deleting book',
      details: error.message
    });
  }
};

// GET /api/books/search - Search books
exports.searchBooks = (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const results = Book.search(q);

    res.json({
      success: true,
      query: q,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error searching books',
      details: error.message
    });
  }
};

// GET /api/books/stats - Get statistics
exports.getStats = (req, res) => {
  try {
    const stats = Book.getStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error retrieving statistics',
      details: error.message
    });
  }
};
```

**Controller with Async/Await:**

```javascript
// For database operations (MongoDB, PostgreSQL, etc.)
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Mongoose example
    res.json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

### Setting Up Routes

**routes/book.routes.js:**

```javascript
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Import middleware
const { validateBook } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/', bookController.getAllBooks);
router.get('/stats', bookController.getStats);
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById);

// Protected routes (require authentication)
router.post('/', authenticate, validateBook, bookController.createBook);
router.put('/:id', authenticate, validateBook, bookController.updateBook);
router.delete('/:id', authenticate, bookController.deleteBook);

module.exports = router;
```

**routes/index.js:**

```javascript
const express = require('express');
const router = express.Router();

const bookRoutes = require('./book.routes');
const userRoutes = require('./user.routes');

// Mount route modules
router.use('/books', bookRoutes);
router.use('/users', userRoutes);

// API health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
```

### Main Server File

**server.js:**

```javascript
const express = require('express');
const app = express();

// Import routes
const apiRoutes = require('./routes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(logger);

// Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Books API',
    version: '1.0.0',
    endpoints: {
      books: '/api/books',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; // For testing
```

### Middleware Implementation

**middleware/validation.js:**

```javascript
// Validation middleware
exports.validateBook = (req, res, next) => {
  const { title, author, year } = req.body;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  if (!author || author.trim().length === 0) {
    errors.push('Author is required');
  } else if (author.length > 100) {
    errors.push('Author must be less than 100 characters');
  }

  if (!year) {
    errors.push('Year is required');
  } else if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
    errors.push('Valid year is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

exports.validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};
```

**middleware/auth.js:**

```javascript
// Authentication middleware (simplified example)
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication token required'
    });
  }

  // Verify token (simplified - use JWT in real apps)
  if (token === 'Bearer valid-token') {
    req.user = { id: 1, name: 'John Doe', role: 'admin' };
    next();
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
    }

    next();
  };
};
```

**middleware/errorHandler.js:**

```javascript
// Global error handling middleware
module.exports = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value entered';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
```

**middleware/logger.js:**

```javascript
// Request logging middleware
module.exports = (req, res, next) => {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} ` +
      `${res.statusCode} - ${duration}ms`
    );
  });

  next();
};
```

### Environment Configuration

**.env:**

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=27017
DB_NAME=bookstore

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# API
API_VERSION=v1
API_BASE_URL=http://localhost:3000/api
```

**config/environment.js:**

```javascript
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'bookstore'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret',
    expire: process.env.JWT_EXPIRE || '7d'
  }
};
```

---

## 7. Building Complete Applications

### Complete Todo API Example

This example demonstrates a full MVC implementation with all best practices.

**models/todo.model.js:**

```javascript
let todos = [];
let nextId = 1;

class Todo {
  static getAll(options = {}) {
    let result = [...todos];

    // Filter by completed status
    if (options.completed !== undefined) {
      result = result.filter(t => t.completed === options.completed);
    }

    // Filter by priority
    if (options.priority) {
      result = result.filter(t => t.priority === options.priority);
    }

    // Sort
    if (options.sortBy) {
      result.sort((a, b) => {
        const order = options.order === 'desc' ? -1 : 1;
        if (a[options.sortBy] < b[options.sortBy]) return -1 * order;
        if (a[options.sortBy] > b[options.sortBy]) return 1 * order;
        return 0;
      });
    }

    return result;
  }

  static getById(id) {
    return todos.find(t => t.id === parseInt(id));
  }

  static create(data) {
    const newTodo = {
      id: nextId++,
      title: data.title,
      description: data.description || '',
      completed: false,
      priority: data.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    todos.push(newTodo);
    return newTodo;
  }

  static update(id, data) {
    const index = todos.findIndex(t => t.id === parseInt(id));
    if (index === -1) return null;

    todos[index] = {
      ...todos[index],
      ...data,
      id: parseInt(id),
      updatedAt: new Date()
    };

    return todos[index];
  }

  static delete(id) {
    const index = todos.findIndex(t => t.id === parseInt(id));
    if (index === -1) return false;

    todos.splice(index, 1);
    return true;
  }

  static toggleComplete(id) {
    const todo = this.getById(id);
    if (!todo) return null;

    return this.update(id, { completed: !todo.completed });
  }

  static getStats() {
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      byPriority: {
        high: todos.filter(t => t.priority === 'high').length,
        medium: todos.filter(t => t.priority === 'medium').length,
        low: todos.filter(t => t.priority === 'low').length
      }
    };
  }

  static deleteCompleted() {
    const initialLength = todos.length;
    todos = todos.filter(t => !t.completed);
    return initialLength - todos.length;
  }
}

module.exports = Todo;
```

**controllers/todo.controller.js:**

```javascript
const Todo = require('../models/todo.model');

exports.getAllTodos = (req, res) => {
  try {
    const options = {
      completed: req.query.completed === 'true' ? true :
                 req.query.completed === 'false' ? false : undefined,
      priority: req.query.priority,
      sortBy: req.query.sortBy,
      order: req.query.order
    };

    const todos = Todo.getAll(options);

    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getTodoById = (req, res) => {
  try {
    const todo = Todo.getById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.createTodo = (req, res) => {
  try {
    const newTodo = Todo.create(req.body);

    res.status(201).json({
      success: true,
      data: newTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateTodo = (req, res) => {
  try {
    const updatedTodo = Todo.update(req.params.id, req.body);

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteTodo = (req, res) => {
  try {
    const deleted = Todo.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.toggleTodoComplete = (req, res) => {
  try {
    const todo = Todo.toggleComplete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getTodoStats = (req, res) => {
  try {
    const stats = Todo.getStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteCompletedTodos = (req, res) => {
  try {
    const deletedCount = Todo.deleteCompleted();

    res.json({
      success: true,
      message: `Deleted ${deletedCount} completed todo(s)`,
      deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

**routes/todo.routes.js:**

```javascript
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const { validateTodo } = require('../middleware/validation');

// GET routes
router.get('/', todoController.getAllTodos);
router.get('/stats', todoController.getTodoStats);
router.get('/:id', todoController.getTodoById);

// POST routes
router.post('/', validateTodo, todoController.createTodo);

// PATCH routes
router.patch('/:id/toggle', todoController.toggleTodoComplete);
router.patch('/:id', validateTodo, todoController.updateTodo);

// DELETE routes
router.delete('/completed', todoController.deleteCompletedTodos);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
```

**middleware/validation.js:**

```javascript
exports.validateTodo = (req, res, next) => {
  const { title, priority } = req.body;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    errors.push('Priority must be low, medium, or high');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};
```

---

## 8. Best Practices and Common Pitfalls

### Best Practices

#### 1. Use Environment Variables

```javascript
// ✅ CORRECT
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

// ❌ WRONG - Hardcoded values
const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/mydb';
```

#### 2. Handle Errors Properly

```javascript
// ✅ CORRECT
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ❌ WRONG - No error handling
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});
```

#### 3. Validate Input

```javascript
// ✅ CORRECT
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }

  if (!email.includes('@')) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }

  // Create user
});

// ❌ WRONG - No validation
app.post('/users', (req, res) => {
  const user = createUser(req.body);
  res.json(user);
});
```

#### 4. Use Consistent Response Format

```javascript
// ✅ CORRECT
res.json({
  success: true,
  data: { id: 1, name: 'John' }
});

res.status(404).json({
  success: false,
  error: 'Not found'
});

// ❌ WRONG - Inconsistent format
res.json({ id: 1, name: 'John' });
res.json({ user: { id: 1, name: 'John' } });
res.json({ result: 'success', userData: {...} });
```

#### 5. Separate Concerns (MVC)

```javascript
// ✅ CORRECT - Separated concerns
// Model
class User {
  static async findAll() { /* DB logic */ }
}

// Controller
exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

// Route
router.get('/users', userController.getUsers);

// ❌ WRONG - Everything in route handler
router.get('/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});
```

#### 6. Use Async/Await Instead of Callbacks

```javascript
// ✅ CORRECT - Async/await
async function readFile() {
  try {
    const data = await fs.promises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// ❌ WRONG - Callback hell
fs.readFile('file1.txt', (err, data1) => {
  if (err) throw err;
  fs.readFile('file2.txt', (err, data2) => {
    if (err) throw err;
    fs.readFile('file3.txt', (err, data3) => {
      if (err) throw err;
      console.log(data1, data2, data3);
    });
  });
});
```

#### 7. Always Return After Sending Response

```javascript
// ✅ CORRECT
if (!user) {
  return res.status(404).json({ error: 'Not found' });
}
res.json(user);

// ❌ WRONG - Code continues executing
if (!user) {
  res.status(404).json({ error: 'Not found' });
  // Code continues here!
}
res.json(user); // Error: Cannot set headers after they are sent
```

#### 8. Use Appropriate HTTP Status Codes

```javascript
// ✅ CORRECT
app.post('/users', (req, res) => {
  const user = createUser(req.body);
  res.status(201).json(user); // 201 Created
});

app.get('/users/:id', (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'Not found' }); // 404 Not Found
  }
  res.status(200).json(user); // 200 OK
});

// ❌ WRONG - Always returning 200
app.post('/users', (req, res) => {
  const user = createUser(req.body);
  res.json(user); // Should be 201
});
```

### Common Pitfalls

#### Pitfall 1: Not Using Middleware for JSON Parsing

```javascript
// ❌ WRONG - Missing JSON middleware
const express = require('express');
const app = express();

app.post('/users', (req, res) => {
  console.log(req.body); // undefined!
  res.json(req.body);
});

// ✅ CORRECT - Add JSON middleware
app.use(express.json());
app.post('/users', (req, res) => {
  console.log(req.body); // { name: "John", ... }
  res.json(req.body);
});
```

#### Pitfall 2: Blocking the Event Loop

```javascript
// ❌ WRONG - Synchronous file reading
const fs = require('fs');
app.get('/file', (req, res) => {
  const data = fs.readFileSync('large-file.txt'); // Blocks!
  res.send(data);
});

// ✅ CORRECT - Asynchronous
app.get('/file', async (req, res) => {
  try {
    const data = await fs.promises.readFile('large-file.txt');
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

#### Pitfall 3: Not Handling Async Errors

```javascript
// ❌ WRONG - Unhandled async error
app.get('/users', async (req, res) => {
  const users = await User.findAll(); // If this throws, app crashes!
  res.json(users);
});

// ✅ CORRECT - Wrapped in try-catch
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### Pitfall 4: Using Verbs in URLs

```javascript
// ❌ WRONG
POST   /api/createUser
GET    /api/getUsers
DELETE /api/deleteUser/123

// ✅ CORRECT
POST   /api/users
GET    /api/users
DELETE /api/users/123
```

#### Pitfall 5: Not Validating IDs

```javascript
// ❌ WRONG
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  res.json(user);
});

// ✅ CORRECT - Parse ID and validate
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});
```

---

## Practice Exercises

### Exercise 1: Basic Express Server
Create a simple Express server with the following routes:
- `GET /` - Returns a welcome message
- `GET /about` - Returns information about the API
- `GET /time` - Returns the current server time
- `404` handler for undefined routes

**Time: 10 minutes**

### Exercise 2: User Management API
Build a REST API for managing users with:
- In-memory storage (array of user objects)
- User properties: id, name, email, age
- CRUD operations (GET all, GET by ID, POST, PUT, DELETE)
- Proper error handling and status codes
- Input validation

**Time: 30 minutes**

### Exercise 3: MVC Todo API
Create a complete todo list API using MVC architecture:
- Separate models, controllers, and routes
- Todo properties: id, title, description, completed, priority
- CRUD operations
- Additional endpoints: toggle complete, get by status, delete completed
- Validation middleware
- Error handling middleware

**Time: 45 minutes**

### Exercise 4: Blog Post API
Implement a blog API with:
- Posts and comments (nested resources)
- `/api/posts` - Get all posts, create post
- `/api/posts/:id` - Get, update, delete post
- `/api/posts/:id/comments` - Get comments for post
- `/api/comments` - Get all comments
- Filtering and sorting
- Pagination

**Time: 60 minutes**

### Exercise 5: E-commerce Product API
Build a product catalog API with:
- Products with categories
- Search functionality
- Filtering by category, price range
- Sorting by price, name, date
- Pagination with metadata
- Product reviews (nested resource)
- Statistics endpoint (total products, average rating, etc.)

**Time: 75 minutes**

---

## Additional Resources

### Official Documentation
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [Express.js Documentation](https://expressjs.com/)
- [npm Documentation](https://docs.npmjs.com/)

### Tutorials and Guides
- [Node.js Best Practices - GitHub](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Guide - MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [RESTful API Design Guide](https://restfulapi.net/)

### Tools
- [Postman](https://www.postman.com/) - API testing tool
- [Insomnia](https://insomnia.rest/) - Alternative API client
- [Nodemon](https://nodemon.io/) - Auto-restart development server
- [Morgan](https://github.com/expressjs/morgan) - HTTP request logger

### Books
- "Node.js Design Patterns" by Mario Casciaro
- "Express in Action" by Evan Hahn
- "RESTful Web API Design with Node.js" by Valentin Bojinov

### Video Courses
- Traversy Media - Node.js Crash Course
- Academind - Node.js Complete Guide
- freeCodeCamp - Node.js and Express.js Full Course

### Community
- [Node.js Reddit](https://www.reddit.com/r/node/)
- [Stack Overflow - Node.js](https://stackoverflow.com/questions/tagged/node.js)
- [Node.js Discord](https://discord.gg/nodejs)
