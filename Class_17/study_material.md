# Class 17: MongoDB, Authentication & Full-Stack Integration - Complete Study Material

## Table of Contents
1. [Introduction to Databases & MongoDB](#1-introduction-to-databases--mongodb)
2. [MongoDB Fundamentals](#2-mongodb-fundamentals)
3. [Mongoose ODM Deep Dive](#3-mongoose-odm-deep-dive)
4. [Authentication Concepts & Implementation](#4-authentication-concepts--implementation)
5. [Authorization & Access Control](#5-authorization--access-control)
6. [Frontend-Backend Integration](#6-frontend-backend-integration)
7. [Building Complete Authenticated Applications](#7-building-complete-authenticated-applications)
8. [Best Practices and Security](#8-best-practices-and-security)
9. [Practice Exercises](#practice-exercises)
10. [Additional Resources](#additional-resources)

---

## 1. Introduction to Databases & MongoDB

### Why Do We Need Databases?

In previous classes, we stored data in memory using JavaScript arrays and objects. This approach has limitations:

**Problems with In-Memory Storage:**
- Data is lost when server restarts
- Cannot handle large amounts of data
- No data persistence
- Difficult to scale across multiple servers
- No transaction support
- Limited querying capabilities

**Database Benefits:**
- **Persistent Storage**: Data survives server restarts
- **Scalability**: Handle millions of records efficiently
- **Concurrent Access**: Multiple users can access simultaneously
- **Data Integrity**: Validation and constraints
- **Query Power**: Complex data retrieval
- **Backup & Recovery**: Data protection
- **Security**: Access control and encryption

### Database Types

**1. Relational Databases (SQL)**

Examples: MySQL, PostgreSQL, SQLite

**Structure:**
```
Users Table:
┌────┬───────────┬─────────────────────┬─────┐
│ ID │ Name      │ Email               │ Age │
├────┼───────────┼─────────────────────┼─────┤
│ 1  │ John Doe  │ john@example.com    │ 30  │
│ 2  │ Jane Smith│ jane@example.com    │ 25  │
└────┴───────────┴─────────────────────┴─────┘

Posts Table:
┌────┬─────────┬────────────────────┬──────────┐
│ ID │ User_ID │ Title              │ Content  │
├────┼─────────┼────────────────────┼──────────┤
│ 1  │ 1       │ My First Post      │ ...      │
│ 2  │ 1       │ Another Post       │ ...      │
│ 3  │ 2       │ Jane's Post        │ ...      │
└────┴─────────┴────────────────────┴──────────┘
```

**Characteristics:**
- Fixed schema (predefined structure)
- Tables with rows and columns
- Relationships via foreign keys
- ACID transactions
- SQL query language

**2. NoSQL Databases**

Examples: MongoDB, CouchDB, Redis

**Types of NoSQL:**
- **Document**: MongoDB, CouchDB
- **Key-Value**: Redis, DynamoDB
- **Column-Family**: Cassandra, HBase
- **Graph**: Neo4j, OrientDB

### What is MongoDB?

MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents called BSON (Binary JSON).

**MongoDB Document Example:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  posts: [
    {
      title: "My First Post",
      content: "This is my first post!",
      createdAt: ISODate("2024-01-15T10:00:00Z")
    },
    {
      title: "Another Post",
      content: "More content here",
      createdAt: ISODate("2024-01-16T14:30:00Z")
    }
  ],
  createdAt: ISODate("2024-01-01T00:00:00Z")
}
```

### MongoDB vs SQL Databases

| Feature | MongoDB | SQL Databases |
|---------|---------|---------------|
| **Data Model** | Documents (JSON-like) | Tables (rows/columns) |
| **Schema** | Flexible (dynamic) | Fixed (predefined) |
| **Relationships** | Embedded or referenced | Foreign keys & JOINs |
| **Scaling** | Horizontal (sharding) | Vertical (bigger server) |
| **Query Language** | MongoDB Query Language | SQL |
| **Transactions** | Multi-document (4.0+) | ACID compliant |
| **Use Cases** | Flexible data, rapid development | Complex relationships, reporting |

**When to Use MongoDB:**
- Rapid development and prototyping
- Flexible or evolving data models
- JavaScript/JSON-centric applications
- Horizontal scalability requirements
- Document-based data (blogs, profiles, catalogs)
- Real-time analytics
- Content management systems

**When to Use SQL:**
- Complex queries and reporting
- Strong data integrity requirements
- Multiple table joins
- ACID transactions critical
- Well-defined, stable schema
- Financial applications
- Legacy system integration

### MongoDB Terminology

| SQL Term | MongoDB Term | Example |
|----------|--------------|---------|
| Database | Database | myapp_db |
| Table | Collection | users |
| Row | Document | { name: "John" } |
| Column | Field | name, email |
| Primary Key | _id | ObjectId("...") |
| Index | Index | Index on email |
| JOIN | $lookup / Embed | Referenced or embedded |

### MongoDB Architecture

**MongoDB Structure:**
```
MongoDB Server
├── Database 1 (e.g., myapp_db)
│   ├── Collection 1 (e.g., users)
│   │   ├── Document 1
│   │   ├── Document 2
│   │   └── Document 3
│   ├── Collection 2 (e.g., posts)
│   │   ├── Document 1
│   │   └── Document 2
│   └── Collection 3 (e.g., comments)
└── Database 2 (e.g., analytics_db)
    └── Collection 1
```

**Key Concepts:**
- **Database**: Container for collections
- **Collection**: Group of documents (like a table)
- **Document**: Single record in JSON-like format
- **Field**: Key-value pair in a document
- **_id**: Unique identifier (auto-generated)

---

## 2. MongoDB Fundamentals

### Setting Up MongoDB

**Option 1: MongoDB Atlas (Cloud - Recommended)**

MongoDB Atlas is a fully-managed cloud database service.

**Steps:**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (Free tier: M0)
4. Choose cloud provider and region
5. Create database user (username + password)
6. Whitelist IP address (0.0.0.0/0 for development)
7. Get connection string

**Connection String Format:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
```

**Option 2: Local MongoDB Installation**

```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download installer from mongodb.com
# Run installer and follow wizard

# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo apt-get install mongodb-org
sudo systemctl start mongod
```

### MongoDB Compass (GUI Tool)

MongoDB Compass is a graphical interface for MongoDB.

**Features:**
- Visual query builder
- Document viewer and editor
- Index management
- Performance monitoring
- Schema analysis

**Download:** [mongodb.com/products/compass](https://www.mongodb.com/products/compass)

### Connecting Node.js to MongoDB

**Install Mongoose:**
```bash
npm install mongoose
```

**Connection File:**

```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
```

**Environment Variables (.env):**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**Main Server File:**

```javascript
// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Mongoose connection events
const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
```

### BSON Data Types

BSON (Binary JSON) extends JSON with additional data types.

**Common BSON Types:**

```javascript
{
  // String
  name: "John Doe",

  // Number (Integer or Double)
  age: 30,
  price: 19.99,

  // Boolean
  isActive: true,

  // Date
  createdAt: new Date(),
  birthDate: ISODate("1994-01-15"),

  // Array
  tags: ["javascript", "nodejs", "mongodb"],
  scores: [85, 92, 78],

  // Object (Embedded Document)
  address: {
    street: "123 Main St",
    city: "New York",
    zip: "10001"
  },

  // ObjectId
  _id: ObjectId("507f1f77bcf86cd799439011"),
  userId: ObjectId("507f1f77bcf86cd799439012"),

  // Null
  middleName: null,

  // Binary Data
  avatar: BinData(0, "base64string..."),

  // Regular Expression
  pattern: /^[a-z]+$/i,

  // Timestamp
  lastModified: Timestamp(1625097600, 1)
}
```

### ObjectId

ObjectId is a 12-byte identifier typically used for the `_id` field.

**Structure:**
```
ObjectId = 4-byte timestamp + 5-byte random value + 3-byte counter

507f1f77bcf86cd799439011
│││││││││││││││││││││││
└─┬──┘└─┬─┘└───┬───┘└─┬─┘
  │    │      │      │
  │    │      │      └─ Counter (3 bytes)
  │    │      └──────── Random value (5 bytes)
  │    └───────────────── Machine identifier
  └────────────────────── Timestamp (4 bytes)
```

**Working with ObjectId:**

```javascript
const mongoose = require('mongoose');

// Create new ObjectId
const id = new mongoose.Types.ObjectId();
console.log(id); // 507f1f77bcf86cd799439011

// Get timestamp from ObjectId
const timestamp = id.getTimestamp();
console.log(timestamp); // Date object

// Convert to string
const idString = id.toString();

// Convert from string
const idFromString = new mongoose.Types.ObjectId(idString);

// Validate ObjectId
const isValid = mongoose.Types.ObjectId.isValid('507f1f77bcf86cd799439011');
console.log(isValid); // true
```

---

## 3. Mongoose ODM Deep Dive

### What is Mongoose?

Mongoose is an Object Document Mapper (ODM) for MongoDB and Node.js. It provides:

- Schema validation
- Type casting
- Query building
- Middleware (hooks)
- Business logic methods
- Virtual properties
- Population (joins)

**Why Use Mongoose?**
- **Structure**: Add schema to schemaless MongoDB
- **Validation**: Ensure data integrity
- **Convenience**: Cleaner, more intuitive API
- **Features**: Middleware, virtuals, plugins
- **Type Safety**: Better with TypeScript

### Defining Schemas

A schema defines the structure of documents within a collection.

**Basic Schema:**

```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  createdAt: Date
});

module.exports = mongoose.model('User', userSchema);
```

**Schema with Options:**

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true, // Remove whitespace
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Create unique index
    lowercase: true, // Convert to lowercase
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot exceed 120'],
    default: 18
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'moderator'],
      message: '{VALUE} is not a valid role'
    },
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: {
    type: [String], // Array of strings
    default: []
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed, // Any type
    default: {}
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);
```

### Schema Types and Validators

**All Schema Types:**

```javascript
const exampleSchema = new mongoose.Schema({
  // String
  name: {
    type: String,
    lowercase: true,    // Convert to lowercase
    uppercase: true,    // Convert to uppercase
    trim: true,         // Remove whitespace
    match: /regex/,     // Must match regex
    enum: ['a', 'b'],   // Must be one of these
    minlength: 5,       // Minimum length
    maxlength: 100      // Maximum length
  },

  // Number
  age: {
    type: Number,
    min: 0,            // Minimum value
    max: 120           // Maximum value
  },

  // Date
  birthDate: {
    type: Date,
    min: '1900-01-01', // Minimum date
    max: Date.now      // Maximum date
  },

  // Boolean
  isActive: Boolean,

  // ObjectId (Reference)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'        // Reference to User model
  },

  // Array
  tags: [String],
  scores: [Number],

  // Embedded Document
  address: {
    street: String,
    city: String,
    country: {
      type: String,
      default: 'USA'
    }
  },

  // Array of Embedded Documents
  phoneNumbers: [{
    type: {
      type: String,
      enum: ['home', 'work', 'mobile']
    },
    number: String
  }],

  // Mixed (any type)
  metadata: mongoose.Schema.Types.Mixed,

  // Buffer (binary data)
  data: Buffer,

  // Map
  socialMedia: {
    type: Map,
    of: String
  }
});
```

**Custom Validators:**

```javascript
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        // Password must contain uppercase, lowercase, number, special char
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      },
      message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    }
  },

  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'Passwords do not match'
    }
  },

  age: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer'
    }
  }
});
```

### Schema Options

```javascript
const schema = new mongoose.Schema({
  // fields
}, {
  // Schema options

  timestamps: true,
  // Adds createdAt and updatedAt fields automatically

  collection: 'my_collection',
  // Custom collection name (default: plural of model name)

  toJSON: { virtuals: true },
  // Include virtual properties when converting to JSON

  toObject: { virtuals: true },
  // Include virtual properties when converting to object

  strict: true,
  // Only fields in schema are saved (default: true)

  versionKey: false,
  // Remove __v version key (default: true)

  minimize: false,
  // Don't remove empty objects (default: true)

  id: false
  // Don't create virtual 'id' property (default: true)
});
```

### Middleware (Hooks)

Middleware functions execute at certain stages of document lifecycle.

**Types of Middleware:**
- `pre()` - Runs before operation
- `post()` - Runs after operation

**Document Middleware:**

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Pre-save hook
userSchema.pre('save', async function(next) {
  console.log('About to save document:', this);

  // Modify document before saving
  this.email = this.email.toLowerCase();

  next();
});

// Post-save hook
userSchema.post('save', function(doc, next) {
  console.log('Document saved:', doc);
  next();
});

// Pre-remove hook
userSchema.pre('remove', async function(next) {
  console.log('About to remove:', this._id);
  // Clean up related data
  await Post.deleteMany({ userId: this._id });
  next();
});
```

**Query Middleware:**

```javascript
// Pre-find hook
userSchema.pre('find', function(next) {
  console.log('Finding documents...');
  this.where({ isDeleted: false }); // Soft delete filter
  next();
});

// Post-find hook
userSchema.post('find', function(docs, next) {
  console.log(`Found ${docs.length} documents`);
  next();
});

// Pre-findOne hook
userSchema.pre('findOne', function(next) {
  this.populate('posts');
  next();
});
```

**Aggregation Middleware:**

```javascript
userSchema.pre('aggregate', function(next) {
  console.log('Running aggregation...');
  // Add match stage at beginning
  this.pipeline().unshift({ $match: { isDeleted: false } });
  next();
});
```

### Instance Methods

Add custom methods to document instances.

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});

// Instance method
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.greet = function() {
  return `Hello, my name is ${this.getFullName()}`;
};

const User = mongoose.model('User', userSchema);

// Usage
const user = new User({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com'
});

console.log(user.getFullName()); // "John Doe"
console.log(user.greet()); // "Hello, my name is John Doe"
```

### Static Methods

Add custom methods to the model.

```javascript
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

userSchema.statics.countByRole = async function(role) {
  return this.countDocuments({ role });
};

// Usage
const user = await User.findByEmail('john@example.com');
const activeUsers = await User.findActive();
const adminCount = await User.countByRole('admin');
```

### Virtual Properties

Virtual properties are not stored in MongoDB but can be computed from other fields.

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});

// Virtual property
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual setter
userSchema.virtual('fullName').set(function(name) {
  const parts = name.split(' ');
  this.firstName = parts[0];
  this.lastName = parts[1];
});

// Include virtuals in JSON output
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

// Usage
const user = new User({
  firstName: 'John',
  lastName: 'Doe'
});

console.log(user.fullName); // "John Doe"

user.fullName = 'Jane Smith';
console.log(user.firstName); // "Jane"
console.log(user.lastName); // "Smith"
```

### Query Helpers

Add custom query helper methods.

```javascript
userSchema.query.byAge = function(age) {
  return this.where({ age });
};

userSchema.query.active = function() {
  return this.where({ isActive: true });
};

// Usage
const youngActiveUsers = await User
  .find()
  .byAge(25)
  .active()
  .exec();
```

### Indexes

Indexes improve query performance.

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,    // Creates unique index
    index: true      // Creates regular index
  },
  age: Number,
  createdAt: Date
});

// Compound index
userSchema.index({ age: 1, createdAt: -1 });
// 1 = ascending, -1 = descending

// Text index for search
userSchema.index({ name: 'text', bio: 'text' });

// Sparse index (only for documents with field)
userSchema.index({ middleName: 1 }, { sparse: true });

// Create indexes
const User = mongoose.model('User', userSchema);
User.createIndexes(); // Create all defined indexes
```

### Population (Relationships)

Population replaces referenced ObjectIds with actual documents.

**Schema Setup:**

```javascript
// models/User.js
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);

// models/Post.js
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to User model
  }
});

module.exports = mongoose.model('Post', postSchema);
```

**Basic Population:**

```javascript
// Create user and post
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com'
});

const post = await Post.create({
  title: 'My First Post',
  content: 'Hello World!',
  author: user._id
});

// Without population
const post1 = await Post.findById(post._id);
console.log(post1.author);
// ObjectId("507f1f77bcf86cd799439011")

// With population
const post2 = await Post.findById(post._id).populate('author');
console.log(post2.author);
// { _id: ObjectId("..."), name: "John Doe", email: "john@example.com" }
```

**Population Options:**

```javascript
// Select specific fields
await Post.findById(id).populate('author', 'name email -_id');

// Multiple populations
await Post.find()
  .populate('author')
  .populate('category');

// Nested population
await Post.findById(id)
  .populate({
    path: 'author',
    populate: {
      path: 'company'
    }
  });

// Conditional population
await Post.find()
  .populate({
    path: 'author',
    match: { age: { $gte: 18 } },
    select: 'name email',
    options: { limit: 5, sort: { name: 1 } }
  });
```

---

## 4. Authentication Concepts & Implementation

### What is Authentication?

**Authentication** is the process of verifying the identity of a user or system.

**Key Questions Authentication Answers:**
- Who are you?
- Are you really who you claim to be?
- Can you prove your identity?

**Common Authentication Methods:**
1. **Password-based**: Username + password
2. **Token-based**: JWT, OAuth tokens
3. **Biometric**: Fingerprint, facial recognition
4. **Multi-factor (MFA)**: Password + SMS code
5. **Certificate-based**: SSL/TLS certificates
6. **Social login**: OAuth (Google, Facebook)

### Authentication vs Authorization

| Authentication | Authorization |
|----------------|---------------|
| **Who are you?** | **What can you do?** |
| Verifies identity | Verifies permissions |
| Login process | Access control |
| Happens first | Happens after authentication |
| Example: Login with password | Example: Admin-only access |

**Example Flow:**
```
1. Authentication: User logs in with email/password
   → System verifies credentials
   → User identity confirmed

2. Authorization: User tries to delete a post
   → System checks if user is post owner or admin
   → Action allowed or denied
```

### Password Security

**❌ NEVER Store Plain Text Passwords:**

```javascript
// NEVER DO THIS!
const user = {
  email: 'user@example.com',
  password: 'myPassword123' // Visible to anyone with DB access
};
```

**Problems with Plain Text:**
- Database breach exposes all passwords
- Admin/developers can see passwords
- Users reuse passwords across sites
- Legal compliance violations (GDPR, etc.)

### Password Hashing

**Hashing** is a one-way function that converts text into a fixed-length string.

**Properties of Good Hashing:**
- **One-way**: Cannot reverse hash to get original
- **Deterministic**: Same input always produces same hash
- **Fast to compute**: Quick hash generation
- **Avalanche effect**: Small input change = completely different hash

**Hash Example:**
```javascript
Input:  "password123"
Hash:   "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"

Input:  "password124" (one character different)
Hash:   "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
```

### bcrypt for Password Hashing

bcrypt is designed specifically for password hashing with built-in salt and adjustable cost.

**Install:**
```bash
npm install bcryptjs
```

**Basic Usage:**

```javascript
const bcrypt = require('bcryptjs');

// Hash a password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Example
const password = 'mySecretPassword';
const hashed = await hashPassword(password);
console.log(hashed);
// $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

// Compare password with hash
async function verifyPassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

const isValid = await verifyPassword('mySecretPassword', hashed);
console.log(isValid); // true

const isInvalid = await verifyPassword('wrongPassword', hashed);
console.log(isInvalid); // false
```

**Salt Rounds:**
- Higher number = more secure but slower
- 10 rounds is standard balance
- 12+ rounds for high-security applications

**Salt Rounds vs Time:**
```
10 rounds: ~65ms
12 rounds: ~260ms
14 rounds: ~1040ms
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
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to check if user is admin
userSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

module.exports = mongoose.model('User', userSchema);
```

### JWT (JSON Web Tokens)

JWT is an open standard for securely transmitting information between parties as a JSON object.

**JWT Structure:**
```
header.payload.signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiI2MGI4ZDI5NWY5ZDJmMjM4YzQxMTQ3MmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyMjgxMzg1MywiZXhwIjoxNjIzNDE4NjUzfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**JWT Parts:**

1. **Header** (Algorithm and token type)
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

2. **Payload** (Claims/Data)
```json
{
  "userId": "60b8d295f9d2f238c411472a",
  "role": "user",
  "iat": 1622813853,
  "exp": 1623418653
}
```

3. **Signature** (Verification)
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

**JWT Benefits:**
- **Stateless**: No server-side session storage
- **Scalable**: Works across multiple servers
- **Mobile-friendly**: Easy to use in mobile apps
- **Self-contained**: All info in the token
- **Secure**: Cryptographically signed

**JWT Drawbacks:**
- **Size**: Larger than session IDs
- **No revocation**: Can't invalidate before expiration
- **Exposure**: Vulnerable if stolen
- **No secrets**: Don't store sensitive data in payload

### Implementing JWT

**Install:**
```bash
npm install jsonwebtoken
```

**Create and Verify Tokens:**

```javascript
const jwt = require('jsonwebtoken');

// Create token
function generateToken(userId, role) {
  const payload = {
    userId: userId,
    role: role
  };

  const options = {
    expiresIn: '7d' // Token expires in 7 days
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

// Verify token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, data: decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { valid: false, error: 'Token expired' };
    }
    if (error.name === 'JsonWebTokenError') {
      return { valid: false, error: 'Invalid token' };
    }
    return { valid: false, error: error.message };
  }
}

// Decode token without verification (for debugging)
function decodeToken(token) {
  return jwt.decode(token);
}
```

**.env:**
```bash
JWT_SECRET=your-super-secret-key-min-32-characters-long
JWT_EXPIRE=7d
```

**⚠️ Important: JWT Secret Security**
- Use a long, random string (32+ characters)
- Never commit secrets to version control
- Use different secrets for dev/staging/production
- Consider using environment-specific secrets

### Registration Endpoint

```javascript
// controllers/auth.controller.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and password'
      });
    }

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

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE || '7d'
      }
    );

    // Send response (don't include password)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error during registration'
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

    // Find user by email (include password field)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE || '7d'
      }
    );

    res.json({
      success: true,
      message: 'Login successful',
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
      error: 'Server error during login'
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    // req.user is set by protect middleware
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
```

**Auth Routes:**

```javascript
// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', protect, authController.getMe);

module.exports = router;
```

---

## 5. Authorization & Access Control

### Authentication Middleware

Middleware to verify JWT tokens and protect routes.

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User no longer exists'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'User account is deactivated'
      });
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};
```

**Using Protect Middleware:**

```javascript
// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');

// Public route
router.post('/register', userController.register);

// Protected routes - require authentication
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.delete('/account', protect, userController.deleteAccount);

module.exports = router;
```

### Role-Based Authorization

Authorization middleware to restrict access based on user roles.

```javascript
// middleware/auth.js

// Authorize by roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    // Check if user's role is in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Role '${req.user.role}' is not authorized to access this route`
      });
    }

    next();
  };
};

// Check resource ownership
exports.checkOwnership = (Model, resourceIdParam = 'id') => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params[resourceIdParam]);

      if (!resource) {
        return res.status(404).json({
          success: false,
          error: 'Resource not found'
        });
      }

      // Check if user is owner or admin
      if (
        resource.user.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin'
      ) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to access this resource'
        });
      }

      // Attach resource to request
      req.resource = resource;
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server error'
      });
    }
  };
};
```

**Using Authorization:**

```javascript
const { protect, authorize, checkOwnership } = require('../middleware/auth');
const Post = require('../models/Post');

// Only admins can delete any user
router.delete(
  '/users/:id',
  protect,
  authorize('admin'),
  userController.deleteUser
);

// Admins and moderators can update posts
router.put(
  '/posts/:id',
  protect,
  authorize('admin', 'moderator'),
  postController.updatePost
);

// Only post owner or admin can delete
router.delete(
  '/posts/:id',
  protect,
  checkOwnership(Post),
  postController.deletePost
);

// Everyone can view (no auth required)
router.get('/posts', postController.getPosts);

// Authenticated users can create
router.post('/posts', protect, postController.createPost);
```

### Advanced Authorization Patterns

**Permission-Based Authorization:**

```javascript
// models/User.js
const userSchema = new mongoose.Schema({
  // ... other fields

  permissions: [{
    type: String,
    enum: [
      'posts:create',
      'posts:read',
      'posts:update',
      'posts:delete',
      'users:read',
      'users:update',
      'users:delete',
      'comments:moderate'
    ]
  }]
});

// middleware/auth.js
exports.requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        error: `Permission '${permission}' required`
      });
    }

    next();
  };
};

// Usage
router.delete(
  '/posts/:id',
  protect,
  requirePermission('posts:delete'),
  postController.deletePost
);
```

**Ownership with Flexible Checks:**

```javascript
// controllers/post.controller.js
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    // Check authorization
    const isOwner = post.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    const canModerate = req.user.role === 'moderator';

    if (!isOwner && !isAdmin && !canModerate) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this post'
      });
    }

    // Admins can change anything, owners can only change content
    const allowedUpdates = isAdmin
      ? req.body
      : { title: req.body.title, content: req.body.content };

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

---

## 6. Frontend-Backend Integration

### CORS Configuration

CORS (Cross-Origin Resource Sharing) allows your backend to accept requests from your frontend running on a different origin.

**Install CORS:**
```bash
npm install cors
```

**Basic CORS Setup:**

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all origins (development only)
app.use(cors());

// Continue with rest of setup...
```

**Production CORS Configuration:**

```javascript
// config/cors.js
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://myapp.com',
      'https://www.myapp.com'
    ];

    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authorization headers
  optionsSuccessStatus: 200
};

module.exports = corsOptions;

// server.js
const corsOptions = require('./config/cors');
app.use(cors(corsOptions));
```

**Environment-Based CORS:**

```javascript
// server.js
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
```

**.env:**
```bash
NODE_ENV=production
FRONTEND_URL=https://myapp.com
```

### Frontend API Client Setup

**Create Axios Instance:**

```javascript
// src/utils/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds
});

// Request interceptor - add auth token to requests
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

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      const status = error.response.status;

      if (status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }

      if (status === 403) {
        // Forbidden - insufficient permissions
        console.error('Access denied');
      }

      if (status === 500) {
        // Server error
        console.error('Server error');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network error');
    }

    return Promise.reject(error);
  }
);

export default api;
```

**React Environment Variables (.env):**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### Authentication Service

```javascript
// src/services/authService.js
import api from '../utils/api';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get user' };
    }
  },

  // Update profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Update failed' };
    }
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
```

### React Authentication Context

```javascript
// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

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
  const [error, setError] = useState(null);

  // Load user on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const data = await authService.getCurrentUser();
        setUser(data.user);
      } catch (err) {
        console.error('Auth check failed:', err);
        authService.logout();
      }
    }

    setLoading(false);
  };

  const register = async (userData) => {
    try {
      setError(null);
      const data = await authService.register(userData);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.error || 'Registration failed');
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const data = await authService.login(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.error || 'Login failed');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = async (userData) => {
    try {
      setError(null);
      const data = await authService.updateProfile(userData);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.error || 'Update failed');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Using in App:**

```javascript
// src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
```

### Login Component

```javascript
// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

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
      setError(err.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="form-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
```

### Register Component

```javascript
// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
      navigate('/dashboard');
    } catch (err) {
      if (Array.isArray(err.error)) {
        setError(err.error.join(', '));
      } else {
        setError(err.error || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
```

### Protected Routes

```javascript
// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role if specified
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
```

**Using Protected Routes:**

```javascript
// src/routes/index.js
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import AdminPanel from '../components/AdminPanel';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
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

      {/* Admin-only route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to dashboard or login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
```

### Making Authenticated API Requests

```javascript
// src/services/todoService.js
import api from '../utils/api';

const todoService = {
  // Get all todos (authenticated)
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Get single todo
  getTodo: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create todo
  createTodo: async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },

  // Update todo
  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  // Toggle completion
  toggleTodo: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  }
};

export default todoService;
```

**Using in Component:**

```javascript
// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import todoService from '../services/todoService';

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodos();
      setTodos(data.data);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (todoData) => {
    try {
      const data = await todoService.createTodo(todoData);
      setTodos([...todos, data.data]);
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const handleToggle = async (id) => {
    try {
      const data = await todoService.toggleTodo(id);
      setTodos(todos.map(todo =>
        todo._id === id ? data.data : todo
      ));
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}!</h1>

      {error && <div className="error">{error}</div>}

      <div className="todos">
        {todos.map(todo => (
          <div key={todo._id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo._id)}
            />
            <span>{todo.title}</span>
            <button onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
```

---

## 7. Building Complete Authenticated Applications

### Complete Notes Application

This section demonstrates a full-stack authenticated notes application.

**Backend: Note Model**

```javascript
// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['personal', 'work', 'study', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPinned: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#ffffff'
  }
}, {
  timestamps: true
});

// Index for faster queries
noteSchema.index({ user: 1, createdAt: -1 });
noteSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model('Note', noteSchema);
```

**Backend: Note Controller**

```javascript
// controllers/note.controller.js
const Note = require('../models/Note');

// Get all notes for logged-in user
exports.getNotes = async (req, res) => {
  try {
    const { category, search, sort = '-createdAt' } = req.query;

    // Build query
    const query = { user: req.user._id };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const notes = await Note.find(query)
      .sort(sort)
      .lean();

    res.json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create note
exports.createNote = async (req, res) => {
  try {
    const noteData = {
      ...req.body,
      user: req.user._id
    };

    const note = await Note.create(noteData);

    res.status(201).json({
      success: true,
      data: note
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
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

// Toggle pin
exports.togglePin = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

**Backend: Note Routes**

```javascript
// routes/note.routes.js
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.route('/')
  .get(noteController.getNotes)
  .post(noteController.createNote);

router.route('/:id')
  .get(noteController.getNote)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote);

router.patch('/:id/pin', noteController.togglePin);

module.exports = router;
```

**Frontend: Note Service**

```javascript
// src/services/noteService.js
import api from '../utils/api';

const noteService = {
  getNotes: async (params = {}) => {
    const response = await api.get('/notes', { params });
    return response.data;
  },

  getNote: async (id) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  createNote: async (noteData) => {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  updateNote: async (id, noteData) => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  },

  deleteNote: async (id) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },

  togglePin: async (id) => {
    const response = await api.patch(`/notes/${id}/pin`);
    return response.data;
  }
};

export default noteService;
```

**Frontend: Notes Component**

```javascript
// src/components/Notes.js
import React, { useState, useEffect } from 'react';
import noteService from '../services/noteService';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import './Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNotes();
  }, [filter, searchTerm]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const params = {};

      if (filter !== 'all') {
        params.category = filter;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      const data = await noteService.getNotes(params);
      setNotes(data.data);
    } catch (err) {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (noteData) => {
    try {
      const data = await noteService.createNote(noteData);
      setNotes([data.data, ...notes]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create note');
    }
  };

  const handleUpdate = async (id, noteData) => {
    try {
      const data = await noteService.updateNote(id, noteData);
      setNotes(notes.map(note => note._id === id ? data.data : note));
      setEditingNote(null);
    } catch (err) {
      setError('Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;

    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  const handleTogglePin = async (id) => {
    try {
      const data = await noteService.togglePin(id);
      setNotes(notes.map(note => note._id === id ? data.data : note));
    } catch (err) {
      setError('Failed to pin note');
    }
  };

  if (loading) return <div>Loading notes...</div>;

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>My Notes</h1>
        <button onClick={() => setShowForm(true)}>New Note</button>
      </div>

      <div className="notes-filters">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="other">Other</option>
        </select>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="notes-grid">
        {notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={() => setEditingNote(note)}
            onDelete={handleDelete}
            onTogglePin={handleTogglePin}
          />
        ))}

        {notes.length === 0 && (
          <div className="no-notes">
            <p>No notes found. Create your first note!</p>
          </div>
        )}
      </div>

      {(showForm || editingNote) && (
        <NoteForm
          note={editingNote}
          onSubmit={editingNote ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingNote(null);
          }}
        />
      )}
    </div>
  );
}

export default Notes;
```

---

## 8. Best Practices and Security

### Security Best Practices

**1. Password Security:**

✅ **DO:**
```javascript
// Hash passwords with bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Exclude password from queries
password: {
  type: String,
  select: false
}
```

❌ **DON'T:**
```javascript
// Store plain text passwords
const user = await User.create({
  email: 'user@example.com',
  password: 'plaintext123' // NEVER!
});

// Return passwords in responses
res.json(user); // Password included!
```

**2. JWT Security:**

✅ **DO:**
```javascript
// Use strong, random secret
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

// Set expiration
jwt.sign(payload, secret, { expiresIn: '7d' });

// Verify tokens properly
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

❌ **DON'T:**
```javascript
// Weak secret
JWT_SECRET=secret

// No expiration
jwt.sign(payload, secret); // Token never expires

// Trust without verification
const userId = token.split('.')[1]; // Dangerous!
```

**3. Input Validation:**

✅ **DO:**
```javascript
// Validate and sanitize input
const { title, content } = req.body;

if (!title || title.trim().length === 0) {
  return res.status(400).json({ error: 'Title required' });
}

// Use Mongoose validation
title: {
  type: String,
  required: true,
  maxlength: 100
}
```

❌ **DON'T:**
```javascript
// Trust user input blindly
const note = await Note.create(req.body);
```

**4. Error Handling:**

✅ **DO:**
```javascript
// Generic error messages
if (!user || !await user.comparePassword(password)) {
  return res.status(401).json({
    error: 'Invalid credentials'
  });
}
```

❌ **DON'T:**
```javascript
// Specific error messages leak information
if (!user) {
  return res.status(401).json({ error: 'User not found' });
}

if (!await user.comparePassword(password)) {
  return res.status(401).json({ error: 'Wrong password' });
}
```

**5. Environment Variables:**

✅ **DO:**
```javascript
// Use .env file
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
NODE_ENV=production

// Add .env to .gitignore
.env
.env.local
```

❌ **DON'T:**
```javascript
// Hardcode secrets
const secret = 'my-secret-key';
const dbUrl = 'mongodb://localhost/mydb';

// Commit .env to git
```

**6. HTTPS Only:**

✅ **DO:**
```javascript
// In production, enforce HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
  });
}
```

**7. Rate Limiting:**

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

app.use('/api/auth/login', authLimiter);
```

**8. Helmet (Security Headers):**

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

**9. MongoDB Injection Prevention:**

```bash
npm install express-mongo-sanitize
```

```javascript
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());
```

**10. XSS Protection:**

```bash
npm install xss-clean
```

```javascript
const xss = require('xss-clean');
app.use(xss());
```

### Performance Best Practices

**1. Database Indexing:**

```javascript
// Index frequently queried fields
userSchema.index({ email: 1 });
noteSchema.index({ user: 1, createdAt: -1 });

// Compound indexes for common queries
noteSchema.index({ user: 1, category: 1 });
```

**2. Query Optimization:**

✅ **DO:**
```javascript
// Select only needed fields
const users = await User.find().select('name email');

// Use lean() for read-only queries
const notes = await Note.find({ user: userId }).lean();

// Limit results
const recent = await Post.find().limit(10).sort('-createdAt');
```

❌ **DON'T:**
```javascript
// Fetch all fields when not needed
const users = await User.find();

// Fetch all documents
const allPosts = await Post.find(); // Could be millions!
```

**3. Pagination:**

```javascript
exports.getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .skip(skip)
    .limit(limit)
    .sort('-createdAt');

  const total = await Post.countDocuments();

  res.json({
    success: true,
    data: posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
};
```

**4. Caching:**

```bash
npm install redis
```

```javascript
const redis = require('redis');
const client = redis.createClient();

exports.getUser = async (req, res) => {
  const cacheKey = `user:${req.params.id}`;

  // Check cache
  const cached = await client.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  // Fetch from database
  const user = await User.findById(req.params.id);

  // Store in cache (expire in 1 hour)
  await client.setex(cacheKey, 3600, JSON.stringify(user));

  res.json(user);
};
```

---

## Practice Exercises

### Exercise 1: Basic MongoDB CRUD
Create a simple book collection with Mongoose:
- Define Book schema (title, author, year, ISBN)
- Implement all CRUD operations
- Add validation for required fields
- Test with MongoDB Compass

**Time: 20 minutes**

### Exercise 2: User Authentication
Build complete authentication system:
- User model with password hashing
- Register and login endpoints
- JWT token generation
- Protected route middleware
- Test with Postman

**Time: 40 minutes**

### Exercise 3: Full-Stack Todo App
Create authenticated todo application:
- Backend: Todo model, CRUD endpoints, user ownership
- Frontend: Login/register, todo list, CRUD operations
- Only show user's own todos
- Protected routes on both sides

**Time: 60 minutes**

### Exercise 4: Blog with Comments
Build blog platform:
- Post and Comment models (relationships)
- Public endpoints: view posts/comments
- Protected endpoints: create/update/delete (own posts only)
- Admin role: delete any post
- Frontend with authentication

**Time: 90 minutes**

### Exercise 5: Complete Social App
Build mini social media:
- User profiles with avatars
- Posts with likes and comments
- Follow/unfollow users
- Feed showing posts from followed users
- Real-time updates (optional)
- Full authentication and authorization

**Time: 120 minutes**

---

## Additional Resources

### Official Documentation
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [JSON Web Tokens](https://jwt.io/)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)

### Tutorials and Guides
- [MongoDB University - Free Courses](https://university.mongodb.com/)
- [Authentication Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

### Tools
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI for MongoDB
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- [Postman](https://www.postman.com/) - API testing
- [JWT.io](https://jwt.io/) - JWT debugger

### Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Helmet.js](https://helmetjs.github.io/) - Security headers

### Books
- "MongoDB: The Definitive Guide" by Shannon Bradshaw
- "Node.js Design Patterns" by Mario Casciaro
- "Web Security Testing Cookbook" by Paco Hope

### Community
- [MongoDB Community Forums](https://www.mongodb.com/community/forums/)
- [Stack Overflow - MongoDB](https://stackoverflow.com/questions/tagged/mongodb)
- [Stack Overflow - Mongoose](https://stackoverflow.com/questions/tagged/mongoose)
