# Class 17: MongoDB, Authentication & Full-Stack Integration

**Duration:** 2.5 hours teaching + 30 minutes assessment
**Total:** 3 hours

## Learning Objectives
By the end of this class, students will be able to:
- Understand MongoDB and integrate it with Express using Mongoose ODM
- Implement secure user authentication with JWT tokens and password hashing
- Build authorization middleware to protect API endpoints
- Connect React frontend with Express backend including authentication flow
- Create a complete full-stack MERN application with user authentication

## Topics Covered

### 1. MongoDB & Mongoose Fundamentals (55 minutes)
Introduction to NoSQL databases and MongoDB integration with Node.js applications.

- **MongoDB Introduction**:
  - What is MongoDB and NoSQL databases
  - Document-based data model vs relational databases
  - Collections and documents structure
  - BSON (Binary JSON) format
  - MongoDB Atlas cloud database setup
  - Connecting to MongoDB from Node.js
- **Mongoose ODM (Object Document Mapping)**:
  - What is Mongoose and why use it
  - Schema definition and structure
  - Schema types (String, Number, Date, Boolean, ObjectId, etc.)
  - Field properties (required, default, unique, validate)
  - Creating models from schemas
  - Schema validation and custom validators
- **CRUD Operations with Mongoose**:
  - Creating documents: `.create()`, `new Model()` with `.save()`
  - Reading documents: `.find()`, `.findById()`, `.findOne()`
  - Query methods and filtering
  - Updating documents: `.findByIdAndUpdate()`, `.updateOne()`, `.updateMany()`
  - Deleting documents: `.findByIdAndDelete()`, `.deleteOne()`, `.deleteMany()`
  - Mongoose promises and async/await patterns
  - Error handling with database operations

### 2. Authentication & Authorization (50 minutes)
Implementing secure user authentication and authorization in Express applications.

- **Authentication Concepts**:
  - Difference between authentication and authorization
  - Password security fundamentals
  - Hashing vs encryption
  - bcryptjs for password hashing
  - Salt rounds and password strength
  - JWT (JSON Web Tokens) overview
  - Token-based authentication flow
  - Stateless authentication benefits
- **Implementing User Authentication**:
  - Designing User model with Mongoose
  - Pre-save hooks for password hashing
  - User registration endpoint
  - Password validation and hashing
  - User login endpoint
  - Comparing hashed passwords with bcrypt
  - Generating JWT tokens with jsonwebtoken
  - Token payload structure
  - Setting token expiration
  - Sending tokens to client
- **Authorization & Protected Routes**:
  - Creating authentication middleware
  - Verifying JWT tokens
  - Extracting user information from tokens
  - Attaching user to request object
  - Protecting API endpoints with middleware
  - Role-based access control (RBAC)
  - Creating authorization middleware for different roles
  - Handling unauthorized access
  - Token refresh strategies (optional)

### 3. Frontend + Backend Integration (45 minutes)
Connecting React frontend with Express backend for complete full-stack applications.

- **Setting Up Backend for Frontend Integration**:
  - CORS (Cross-Origin Resource Sharing) configuration
  - Installing and configuring cors middleware
  - Allowing specific origins for security
  - Handling preflight requests
  - Environment-based CORS settings
  - API endpoint organization for frontend consumption
  - Consistent error response format
- **Frontend API Client Setup**:
  - Using fetch API vs axios for HTTP requests
  - Creating an API service/utility file
  - Base URL configuration with environment variables
  - Setting up axios interceptors
  - Adding authentication headers automatically
  - Request and response interceptors
  - Error handling and retry logic
  - Handling network errors
- **Authentication in React**:
  - Storing JWT tokens (localStorage vs cookies)
  - Creating authentication context with Context API
  - Auth state management (user, token, loading)
  - Login and register form implementation
  - Connecting forms to backend API
  - Handling authentication responses
  - Storing tokens on successful login
  - Updating auth state across application
  - Protected routes in React Router
  - Redirect to login for unauthenticated users
  - Automatic logout on token expiration
  - Token validation on app initialization
- **Complete Request/Response Cycle**:
  - Data fetching from protected endpoints
  - Sending authenticated requests
  - Displaying user-specific data
  - Form submissions to backend
  - Optimistic UI updates
  - Error state management in components
  - Loading states during API calls
  - Success feedback to users
  - Handling authentication errors (401, 403)

## Assignment/Test (30 minutes)

**Practical Assessment:**
1. Set up MongoDB Atlas and connect to Express application
2. Create a User model with Mongoose including password hashing
3. Implement registration and login endpoints with JWT authentication
4. Build authentication middleware to protect API routes
5. Create a React frontend with login/register forms connected to backend
6. Implement protected routes in React that require authentication
7. Build a simple CRUD feature (e.g., user profile or notes) that requires authentication

**Quiz Topics:**
- MongoDB document structure and NoSQL concepts
- Mongoose schema definition and validation
- Password hashing with bcrypt and security best practices
- JWT token structure and authentication flow
- CORS and why it's necessary for frontend-backend communication
- Token storage strategies and security implications
- Protected routes implementation (frontend and backend)

## Resources
- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas - Cloud Database](https://www.mongodb.com/cloud/atlas)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Tokens Introduction](https://jwt.io/introduction)
- [jsonwebtoken npm Package](https://www.npmjs.com/package/jsonwebtoken)
- [CORS - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [React Context API](https://react.dev/reference/react/useContext)

## Prerequisites for Next Class
- MongoDB and Mongoose integration in Express applications
- User authentication with JWT tokens
- Password hashing and security fundamentals
- React state management with Context API
- Frontend-backend communication with authenticated requests
- CORS configuration and cross-origin requests
- Protected routes implementation (both frontend and backend)

## Next Class Preview
Class 18 will cover advanced backend features including data relationships in MongoDB, advanced authentication patterns (refresh tokens, OAuth), API testing and validation, application deployment to production, and performance optimization strategies for full-stack applications.
