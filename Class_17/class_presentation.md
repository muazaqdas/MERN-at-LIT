# Class 17: MongoDB, Authentication & Full-Stack Integration
## Presentation Notes (2.5 Hours)

---

## Section 1: MongoDB & Mongoose Fundamentals (55 minutes)

### What is MongoDB?

MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents. Unlike traditional relational databases with tables and rows, MongoDB uses collections and documents.

**MongoDB vs Relational Databases:**

| Feature | Relational (SQL) | MongoDB (NoSQL) |
|---------|------------------|-----------------|
| Data Structure | Tables with rows | Collections with documents |
| Schema | Fixed schema | Flexible schema |
| Relationships | Foreign keys, JOINs | Embedded or referenced |
| Scaling | Vertical | Horizontal |
| Query Language | SQL | MongoDB Query Language |

**Why MongoDB for JavaScript?**
- Native JSON format matches JavaScript objects
- Flexible schema perfect for rapid development
- Easy to scale
- Great performance for read-heavy applications
- Works seamlessly with Node.js ecosystem

### MongoDB Basics

**Documents:**
```javascript
// A document in MongoDB (similar to JSON)
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  createdAt: ISODate("2024-01-15T10:00:00Z")
}
```

**Collections:**
```javascript
// Users collection contains multiple user documents
Users Collection:
  - { _id: 1, name: "John", email: "john@example.com" }
  - { _id: 2, name: "Jane", email: "jane@example.com" }
  - { _id: 3, name: "Bob", email: "bob@example.com" }
```

### Setting Up MongoDB Atlas

```bash
# 1. Create account at mongodb.com/cloud/atlas
# 2. Create a new cluster (free tier available)
# 3. Create database user
# 4. Whitelist your IP address (or use 0.0.0.0/0 for development)
# 5. Get connection string

# Install mongoose
npm install mongoose
```

**Connecting to MongoDB:**

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

**.env file:**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
PORT=5000
```

**server.js:**
```javascript
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Mongoose ODM

Mongoose provides a schema-based solution to model your data.

**Creating a Schema:**

```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot exceed 120']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);
```

**Schema Types:**
- `String` - Text data
- `Number` - Numeric values
- `Date` - Date and time
- `Boolean` - true/false
- `ObjectId` - Reference to another document
- `Array` - List of values
- `Mixed` - Any data type

**Field Options:**
- `required` - Field must be provided
- `unique` - Value must be unique across collection
- `default` - Default value if not provided
- `trim` - Remove whitespace
- `lowercase/uppercase` - Convert case
- `min/max` - Numeric/date range validation
- `enum` - Allowed values
- `match` - Regex validation

### CRUD Operations with Mongoose

**Create Documents:**

```javascript
const User = require('../models/User');

// Method 1: Using create()
const createUser = async () => {
  try {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Method 2: Using new and save()
const createUserAlt = async () => {
  try {
    const user = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 25
    });
    await user.save();
    console.log('User created:', user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

**Read Documents:**

```javascript
// Find all users
const getAllUsers = async () => {
  const users = await User.find();
  console.log(users);
};

// Find users with filter
const getActiveUsers = async () => {
  const users = await User.find({ isActive: true });
  console.log(users);
};

// Find one user by ID
const getUserById = async (id) => {
  const user = await User.findById(id);
  console.log(user);
};

// Find one user by criteria
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  console.log(user);
};

// Find with specific fields
const getUserNames = async () => {
  const users = await User.find().select('name email -_id');
  // Returns only name and email, excludes _id
  console.log(users);
};

// Find with sorting and limiting
const getRecentUsers = async () => {
  const users = await User.find()
    .sort({ createdAt: -1 }) // -1 for descending
    .limit(10);
  console.log(users);
};
```

**Update Documents:**

```javascript
// Find by ID and update
const updateUser = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    { age: 31, isActive: false },
    { new: true, runValidators: true }
    // new: true returns updated document
    // runValidators: true applies schema validation
  );
  console.log('Updated user:', user);
};

// Update one document
const updateUserEmail = async (oldEmail, newEmail) => {
  const result = await User.updateOne(
    { email: oldEmail },
    { email: newEmail }
  );
  console.log('Modified count:', result.modifiedCount);
};

// Update many documents
const deactivateOldUsers = async () => {
  const result = await User.updateMany(
    { age: { $gte: 65 } },
    { isActive: false }
  );
  console.log('Modified count:', result.modifiedCount);
};
```

**Delete Documents:**

```javascript
// Find by ID and delete
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  console.log('Deleted user:', user);
};

// Delete one document
const deleteUserByEmail = async (email) => {
  const result = await User.deleteOne({ email });
  console.log('Deleted count:', result.deletedCount);
};

// Delete many documents
const deleteInactiveUsers = async () => {
  const result = await User.deleteMany({ isActive: false });
  console.log('Deleted count:', result.deletedCount);
};
```

**In Controllers:**

```javascript
// controllers/user.controller.js
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
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
```

---

## Section 2: Authentication & Authorization (50 minutes)

### Authentication vs Authorization

**Authentication**: Verifying who you are (login)
**Authorization**: Verifying what you can do (permissions)

```javascript
// Authentication: "Are you John Doe?"
// Authorization: "Can John Doe delete this post?"
```

### Password Security with bcrypt

Never store plain text passwords! Use bcrypt to hash passwords.

```bash
npm install bcryptjs
```

**How bcrypt works:**

```javascript
const bcrypt = require('bcryptjs');

// Hashing a password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Example
const password = 'mySecretPassword';
const hashed = await hashPassword(password);
console.log(hashed);
// $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

// Comparing passwords
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const isMatch = await comparePassword('mySecretPassword', hashed);
console.log(isMatch); // true

const isMatch2 = await comparePassword('wrongPassword', hashed);
console.log(isMatch2); // false
```

### User Model with Password Hashing

```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### JWT (JSON Web Tokens)

JWT is a compact, self-contained way to securely transmit information between parties.

```bash
npm install jsonwebtoken
```

**JWT Structure:**
```
header.payload.signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6InVzZXIifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Creating and Verifying Tokens:**

```javascript
const jwt = require('jsonwebtoken');

// Create token
const createToken = (userId) => {
  const payload = {
    userId: userId,
    role: 'user'
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );

  return token;
};

// Verify token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
    // { userId: '123', role: 'user', iat: 1234567890, exp: 1234567890 }
  } catch (error) {
    throw new Error('Invalid token');
  }
};
```

**.env:**
```bash
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRE=7d
```

### Registration Endpoint

```javascript
// controllers/auth.controller.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Create user (password will be hashed by pre-save hook)
    const user = await User.create({
      name,
      email,
      password
    });

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
```

### Login Endpoint

```javascript
// controllers/auth.controller.js
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

**routes/auth.routes.js:**

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
```

### Authentication Middleware

Middleware to protect routes and verify JWT tokens.

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};
```

**Using the middleware:**

```javascript
// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes - require authentication
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.delete('/account', protect, userController.deleteAccount);

module.exports = router;
```

### Authorization Middleware (Role-Based)

```javascript
// middleware/auth.js
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    next();
  };
};
```

**Usage:**

```javascript
const { protect, authorize } = require('../middleware/auth');

// Only admins can access
router.delete('/users/:id', protect, authorize('admin'), userController.deleteUser);

// Admins and moderators can access
router.put('/posts/:id', protect, authorize('admin', 'moderator'), postController.updatePost);
```

---

## Section 3: Frontend + Backend Integration (45 minutes)

### Setting Up CORS

CORS (Cross-Origin Resource Sharing) allows your backend to accept requests from your frontend.

```bash
npm install cors
```

**Basic CORS setup:**

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Or with specific origin
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true
}));

// Or multiple origins
app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  credentials: true
}));
```

**Environment-based CORS:**

```javascript
// config/cors.js
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://myapp.com'
    : 'http://localhost:3000',
  credentials: true
};

module.exports = corsOptions;

// server.js
const corsOptions = require('./config/cors');
app.use(cors(corsOptions));
```

### Frontend API Client Setup

**Create API utility file:**

```javascript
// src/utils/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**.env in React:**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

**API service functions:**

```javascript
// src/services/authService.js
import api from '../utils/api';

export const authService = {
  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
```

### Authentication Context in React

```javascript
// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const data = await authService.getCurrentUser();
      setUser(data.user);
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Using in App.js:**

```javascript
// src/App.js
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Your app components */}
      </Router>
    </AuthProvider>
  );
}
```

### Login Component

```javascript
// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
```

### Protected Routes in React

```javascript
// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

**Using protected routes:**

```javascript
// src/App.js
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

### Making Authenticated Requests

```javascript
// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data.data);
    } catch (err) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      setTodos([...todos, response.data.data]);
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>My Todos</h2>
      {/* Todo list and form */}
    </div>
  );
}
```

---

## Key Takeaways

### ✅ MongoDB & Mongoose:
- MongoDB stores data in flexible JSON-like documents
- Mongoose provides schema validation and data modeling
- Use async/await with Mongoose methods (.create, .find, .findById, etc.)
- Schema validation prevents invalid data from being saved
- Connection to MongoDB Atlas for cloud database

### ✅ Authentication:
- Never store plain text passwords - use bcrypt hashing
- JWT tokens for stateless authentication
- Pre-save hooks in Mongoose for automatic password hashing
- Separate registration and login endpoints
- Token expiration for security

### ✅ Authorization:
- Authentication middleware verifies JWT tokens
- Authorization middleware checks user roles/permissions
- Protect routes by adding middleware
- Return 401 for authentication failures, 403 for authorization failures

### ✅ Frontend Integration:
- CORS required for cross-origin requests
- Axios interceptors for automatic token injection
- React Context API for global auth state
- Protected routes redirect unauthenticated users
- localStorage for token persistence

---

## Common Mistakes

**1. Not Hashing Passwords:**

❌ WRONG:
```javascript
const user = await User.create({
  email: 'user@example.com',
  password: 'plaintext' // Stored as plain text!
});
```

✅ CORRECT:
```javascript
// Use pre-save hook in schema
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
```

**2. Including Password in Responses:**

❌ WRONG:
```javascript
const user = await User.findById(userId);
res.json(user); // Includes password hash!
```

✅ CORRECT:
```javascript
// Set select: false in schema
password: {
  type: String,
  required: true,
  select: false
}

// Or exclude in query
const user = await User.findById(userId).select('-password');
```

**3. Not Validating Tokens:**

❌ WRONG:
```javascript
const token = req.headers.authorization;
const userId = token.split('.')[1]; // Dangerous!
```

✅ CORRECT:
```javascript
const token = req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const userId = decoded.userId;
```

**4. Forgetting CORS:**

❌ WRONG:
```javascript
// No CORS middleware
// Frontend can't make requests to backend
```

✅ CORRECT:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**5. Not Handling Token Expiration:**

❌ WRONG:
```javascript
// Token expires but user stays logged in
localStorage.setItem('token', token);
// Never checks if token is valid
```

✅ CORRECT:
```javascript
// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## Quick Reference

### Mongoose Model:
```javascript
const schema = new mongoose.Schema({
  field: { type: String, required: true }
});
const Model = mongoose.model('Model', schema);
```

### CRUD Operations:
```javascript
await Model.create(data);
await Model.find({ field: value });
await Model.findById(id);
await Model.findByIdAndUpdate(id, data, { new: true });
await Model.findByIdAndDelete(id);
```

### Password Hashing:
```javascript
const hash = await bcrypt.hash(password, 10);
const isMatch = await bcrypt.compare(password, hash);
```

### JWT:
```javascript
const token = jwt.sign(payload, secret, { expiresIn: '7d' });
const decoded = jwt.verify(token, secret);
```

### Auth Middleware:
```javascript
const token = req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.userId);
next();
```

---

## Practice Challenge

**Build a Full-Stack Authenticated Notes Application:**

**Backend Requirements:**
1. MongoDB connection with Mongoose
2. User model with email, password (hashed), name
3. Note model with title, content, userId (reference), timestamps
4. Authentication endpoints: register, login
5. Protected note endpoints: create, read, update, delete
6. Users can only see/edit their own notes
7. Proper error handling and validation

**Frontend Requirements:**
1. Login and register pages
2. Protected dashboard showing user's notes
3. Create new note form
4. Edit and delete existing notes
5. Logout functionality
6. Auth context for global state
7. Axios interceptors for token handling
8. Loading and error states
9. Redirect to login if not authenticated

**Time: 45 minutes**

---

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [bcryptjs npm Package](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)
- [JWT.io - Decode JWTs](https://jwt.io/)
- [React Context API](https://react.dev/reference/react/useContext)

---

## Questions?

**What we learned today:**
- MongoDB and NoSQL database concepts
- Mongoose ODM for data modeling and validation
- Password hashing with bcrypt for security
- JWT authentication implementation
- Protected routes with middleware
- CORS configuration for frontend-backend communication
- React authentication with Context API
- Full-stack request/response flow

**Next class:** We'll explore **advanced MongoDB features** (relationships, aggregation), **advanced authentication patterns** (refresh tokens, OAuth), **API testing**, and **deploying full-stack applications** to production!
