# Class 16: Node.js & Express Fundamentals

**Duration:** 2.5 hours teaching + 30 minutes assessment
**Total:** 3 hours

## Learning Objectives
By the end of this class, students will be able to:
- Understand Node.js runtime environment and its role in backend development
- Work with Node.js modules (CommonJS and ES6) and npm packages
- Set up and configure an Express.js server with routing
- Design and implement RESTful API endpoints
- Apply MVC architecture pattern to organize backend applications

## Topics Covered

### 1. Node.js Fundamentals (40 minutes)
- What is Node.js and why use it for backend:
  - JavaScript runtime built on Chrome's V8 engine
  - Non-blocking, event-driven architecture
  - Single-threaded with event loop
  - Benefits over traditional server technologies
- Understanding the Node.js event loop:
  - Call stack and callback queue
  - Asynchronous vs synchronous operations
  - Non-blocking I/O operations
- Node.js use cases and ecosystem:
  - API servers and microservices
  - Real-time applications
  - Command-line tools
  - Full-stack JavaScript development
- Setting up Node.js environment:
  - Installing Node.js and npm
  - Verifying installation
  - Node REPL (Read-Eval-Print Loop)
  - Running JavaScript files with Node
- Global objects and built-in modules:
  - `process` object and environment variables
  - `__dirname` and `__filename`
  - Common built-in modules overview

### 2. Node.js Modules & NPM (35 minutes)
- Module system in Node.js:
  - What are modules and why use them
  - Creating and exporting modules
  - Importing and using modules
- CommonJS module syntax:
  - `module.exports` and `exports`
  - `require()` function
  - Exporting single vs multiple values
- ES6 module syntax (ESM):
  - `export` and `export default`
  - `import` statement
  - Named vs default exports
  - Configuring package.json for ES6 modules
- Core Node.js modules:
  - `fs` (File System) for file operations
  - `path` for file path manipulation
  - `http` for creating servers
  - `url` for URL parsing
- NPM (Node Package Manager):
  - Understanding package.json
  - Installing packages (`npm install`)
  - Dev dependencies vs dependencies
  - Package versioning (semantic versioning)
  - Popular npm packages for backend development
  - `npm init` for project initialization

### 3. Express.js Setup & Routing (50 minutes)
- Introduction to Express.js:
  - What is Express and why use it
  - Express vs vanilla Node.js http module
  - Express philosophy and benefits
  - Installing Express in a project
- Creating your first Express server:
  - Basic server setup
  - `app.listen()` and port configuration
  - Starting and stopping the server
  - Testing with browser and Postman
- Understanding middleware:
  - What is middleware and how it works
  - `app.use()` for middleware registration
  - Request-response cycle
  - Built-in middleware (express.json, express.urlencoded)
  - Custom middleware functions
  - Middleware execution order
- Express routing basics:
  - Route methods (GET, POST, PUT, DELETE)
  - Route paths and patterns
  - Route parameters (`:id`, `:userId`)
  - Query parameters
  - Sending responses (res.send, res.json, res.status)
- Organizing routes:
  - Express Router for modular routes
  - Separating route files
  - Route prefixes and mounting routers

### 4. REST API Concepts & Implementation (45 minutes)
- Understanding REST architecture:
  - What is REST (Representational State Transfer)
  - RESTful principles and constraints
  - Stateless communication
  - Resource-based URLs
- HTTP methods and their purposes:
  - GET - Retrieve data
  - POST - Create new resources
  - PUT/PATCH - Update existing resources
  - DELETE - Remove resources
  - Method idempotency
- HTTP status codes:
  - 2xx Success codes (200, 201, 204)
  - 3xx Redirection codes
  - 4xx Client error codes (400, 401, 404)
  - 5xx Server error codes (500)
  - When to use each status code
- RESTful API design best practices:
  - Naming conventions for endpoints
  - Plural vs singular resource names
  - Nested resources and relationships
  - API versioning strategies
- Building a simple REST API:
  - CRUD operations (Create, Read, Update, Delete)
  - Request body handling
  - Response formatting
  - Error handling in routes
  - Using Postman for API testing
- Data handling without database:
  - In-memory data storage (arrays/objects)
  - Simulating database operations
  - Data persistence limitations

### 5. MVC Architecture & Best Practices (30 minutes)
- Introduction to MVC pattern:
  - Model-View-Controller concept
  - Separation of concerns
  - Benefits of MVC architecture
  - MVC in backend context (API-focused)
- Implementing MVC in Express:
  - **Models** - Data structures and business logic
  - **Views** - API responses (JSON in REST APIs)
  - **Controllers** - Request handlers and logic
  - Routes as the entry points
- Project structure and organization:
  - Folder structure best practices
  - Separating routes, controllers, and models
  - Creating a scalable project architecture
  - File naming conventions
- Controllers in depth:
  - Creating controller functions
  - Keeping controllers thin
  - Handling errors in controllers
  - Async/await in controller functions
- Best practices for Express applications:
  - Environment variables with dotenv
  - Error handling middleware
  - Input validation
  - Code organization and modularity
  - Consistent API response format
  - Logging and debugging with Morgan

## Assignment/Test (30 minutes)
**Practical Assessment:**
1. Set up a Node.js project with Express and create a basic server
2. Build a REST API for managing a book collection (CRUD operations)
3. Implement proper routing with Express Router for different resources
4. Create an MVC structure for a todo list API with separate models, controllers, and routes
5. Add middleware for logging requests and handling errors

**Quiz Topics:**
- Node.js event loop and asynchronous programming
- Difference between CommonJS and ES6 modules
- HTTP methods and appropriate status codes
- RESTful API design principles
- MVC architecture components and their roles

## Resources
- [Node.js Official Documentation](https://nodejs.org/docs/latest/api/)
- [Express.js Documentation](https://expressjs.com/)
- [npm Documentation](https://docs.npmjs.com/)
- [RESTful API Design Guide](https://restfulapi.net/)
- [MDN HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Understanding MVC Architecture](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

## Prerequisites for Next Class
- Understanding of Node.js and npm basics
- Familiarity with Express.js server setup
- Knowledge of RESTful API principles
- Understanding of asynchronous JavaScript (Promises, async/await)
- Basic understanding of MVC architecture

## Next Class Preview
Class 17 will cover MongoDB database integration, data modeling with Mongoose, and implementing full CRUD operations with persistent data storage for building complete backend applications.
