# Class 12: React Introduction - Complete Study Material

## Table of Contents
1. [React Fundamentals](#1-react-fundamentals)
2. [React Setup and Project Structure](#2-react-setup-and-project-structure)
3. [JSX Deep Dive](#3-jsx-deep-dive)
4. [Components and Props](#4-components-and-props)
5. [Practical Component Examples](#5-practical-component-examples)
6. [Practice Exercises](#practice-exercises)

---

## 1. React Fundamentals

### What is React?

**Definition:** React is a JavaScript library for building user interfaces, developed and maintained by Meta (Facebook). It allows developers to create reusable UI components that efficiently update when data changes.

**Key Features:**
- Component-based architecture
- Virtual DOM for performance
- Declarative programming style
- Unidirectional data flow
- Large ecosystem and community

```javascript
// Traditional JavaScript (Imperative)
const button = document.createElement('button');
button.textContent = 'Click me';
button.addEventListener('click', () => {
    alert('Clicked!');
});
document.body.appendChild(button);

// React (Declarative)
function Button() {
    return (
        <button onClick={() => alert('Clicked!')}>
            Click me
        </button>
    );
}
```

### Why Use React?

**1. Component Reusability**
```javascript
// Create once, use everywhere
function UserCard({ name, email, avatar }) {
    return (
        <div className="user-card">
            <img src={avatar} alt={name} />
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    );
}

// Use multiple times with different data
<UserCard name="Alice" email="alice@example.com" avatar="alice.jpg" />
<UserCard name="Bob" email="bob@example.com" avatar="bob.jpg" />
<UserCard name="Charlie" email="charlie@example.com" avatar="charlie.jpg" />
```

**2. Efficient Updates with Virtual DOM**
- React creates a virtual representation of the UI in memory
- When data changes, React compares the new virtual DOM with the old one
- Only the differences are updated in the real DOM
- Results in better performance

**3. Strong Ecosystem**
- React Router for navigation
- Redux/Context API for state management
- Next.js for server-side rendering
- React Native for mobile apps
- Vast collection of third-party libraries

**4. Industry Adoption**
- Used by Facebook, Instagram, Netflix, Airbnb, and thousands of companies
- High demand in job market
- Large community and resources

### Component-Based Architecture

**Traditional Approach:**
```html
<!-- Monolithic HTML -->
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <h1>Welcome</h1>
            <p>Content here...</p>
        </section>
    </main>
    <footer>
        <p>Copyright 2025</p>
    </footer>
</body>
</html>
```

**React Component Approach:**
```javascript
// Break down into reusable components
function App() {
    return (
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header>
            <Navigation />
        </header>
    );
}

function Navigation() {
    return (
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

function MainContent() {
    return (
        <main>
            <section>
                <h1>Welcome</h1>
                <p>Content here...</p>
            </section>
        </main>
    );
}

function Footer() {
    return (
        <footer>
            <p>Copyright 2025</p>
        </footer>
    );
}
```

**Benefits:**
- Each component is self-contained and reusable
- Easier to test and maintain
- Better code organization
- Team members can work on different components simultaneously

### Virtual DOM Concept

**How the Virtual DOM Works:**

1. **Initial Render:**
   ```javascript
   // React creates virtual DOM
   Virtual DOM: { type: 'div', children: [{ type: 'h1', text: 'Hello' }] }

   // Converts to real DOM
   Real DOM: <div><h1>Hello</h1></div>
   ```

2. **State Changes:**
   ```javascript
   // Data changes from 'Hello' to 'Hi'
   New Virtual DOM: { type: 'div', children: [{ type: 'h1', text: 'Hi' }] }

   // React compares old and new virtual DOM (diffing)
   Difference: text changed from 'Hello' to 'Hi'

   // Only updates the changed part in real DOM
   Real DOM update: Changes only the text node (not entire DOM)
   ```

**Performance Comparison:**

```javascript
// Without Virtual DOM (Vanilla JS)
// Every change requires manual DOM manipulation
function updateUserList(users) {
    const list = document.getElementById('user-list');
    list.innerHTML = ''; // Clears everything

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name;
        list.appendChild(li); // Reflow and repaint
    });
}
// Problem: Expensive operation, entire list recreated

// With Virtual DOM (React)
function UserList({ users }) {
    return (
        <ul id="user-list">
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
// React only updates changed list items, not the entire list
```

### React Ecosystem Overview

**Core Libraries:**
- **React:** Core library for building UI
- **ReactDOM:** Renders React components to the DOM
- **React Developer Tools:** Browser extension for debugging

**Popular Extensions:**
- **React Router:** Client-side routing
- **Redux/Zustand:** State management
- **Axios/Fetch:** HTTP requests
- **React Query:** Server state management
- **Formik/React Hook Form:** Form handling
- **Styled Components/Tailwind:** Styling solutions
- **Jest/React Testing Library:** Testing

### Comparison with Vanilla JavaScript

**Example: Todo List**

**Vanilla JavaScript:**
```javascript
// HTML
<div id="app">
    <input id="todo-input" type="text" />
    <button id="add-btn">Add</button>
    <ul id="todo-list"></ul>
</div>

// JavaScript
let todos = [];

function addTodo() {
    const input = document.getElementById('todo-input');
    const value = input.value.trim();

    if (value) {
        todos.push({ id: Date.now(), text: value });
        input.value = '';
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

document.getElementById('add-btn').addEventListener('click', addTodo);
```

**React:**
```javascript
import { useState } from 'react';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    function addTodo() {
        if (inputValue.trim()) {
            setTodos([...todos, { id: Date.now(), text: inputValue }]);
            setInputValue('');
        }
    }

    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

**Benefits of React Approach:**
- Less code, more readable
- Automatic UI updates when state changes
- No manual DOM manipulation
- Better separation of concerns

### When to Choose React

**Use React When:**
- Building single-page applications (SPAs)
- Creating complex, interactive UIs
- Need component reusability
- Building applications that will scale
- Working in a team environment
- Need SEO (with Next.js)

**Consider Alternatives When:**
- Building simple static websites
- No JavaScript interactivity needed
- Very small projects
- Learning web development (start with vanilla JS first)

### React Development Tools

**1. React Developer Tools (Browser Extension)**
```
Chrome/Firefox Extension Features:
- View component hierarchy
- Inspect props and state
- Track component updates
- Profile performance
- Highlight component renders
```

**2. Vite**
- Modern, fast build tool for React projects
- Lightning-fast Hot Module Replacement (HMR)
- Optimized production builds with Rollup
- Native ES modules in development
- Significantly faster than traditional bundlers

**3. Code Editors**
- VS Code with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Prettier for formatting
  - ESLint for linting
  - Auto import

---

## 2. React Setup and Project Structure

### Setting Up React with Vite

**Why Vite?**
- Lightning-fast development server startup
- Instant Hot Module Replacement (HMR)
- Optimized production builds
- Modern tooling with great developer experience
- Official recommendation for new React projects

**Installation and Setup:**

```bash
# Check Node.js installation
node --version  # Should be 14.18.0 or higher
npm --version

# Create new React app with Vite
npm create vite@latest my-app -- --template react

# Navigate to project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev

# App opens at http://localhost:5173
```

### Project Folder Structure

```
my-app/
├── node_modules/          # Dependencies (don't touch)
├── public/                # Static assets (images, fonts, etc.)
│   └── vite.svg          # Vite logo
├── src/                   # Source code (where you work)
│   ├── assets/           # Images, fonts used in components
│   ├── App.css           # App component styles
│   ├── App.jsx           # Main App component
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── .gitignore            # Git ignore file
├── index.html            # Main HTML file (root level!)
├── vite.config.js        # Vite configuration
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Locked dependency versions
└── README.md             # Project documentation
```

### Understanding Key Directories

#### Root `index.html`

**`index.html` (at project root, not in public/):**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Purpose:**
- Located at project root (not in public/ folder)
- React injects the entire app into `<div id="root"></div>`
- Script tag points to the entry file `/src/main.jsx`
- Uses ES modules (`type="module"`)

#### `public/` Directory

**Purpose:**
- Contains static assets (images, fonts, icons)
- Files are served as-is, not processed by Vite
- Reference with absolute paths like `/image.png`

#### `src/` Directory

This is where all your React code lives.

**`src/main.jsx` (Entry Point):**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Get the root element from HTML and render the App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Key Points:**
- Named `main.jsx` (not `index.js`)
- Uses `.jsx` extension for files with JSX
- Imports use explicit `.jsx` extensions

**`src/App.jsx` (Main Component):**
```javascript
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Hello React with Vite!</h1>
      <p>Welcome to React development</p>
    </div>
  )
}

export default App
```

### package.json Explained

```json
{
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",                    // Development server
    "build": "vite build",            // Production build
    "preview": "vite preview"         // Preview production build
  },
  "dependencies": {
    "react": "^18.2.0",               // React core
    "react-dom": "^18.2.0"            // React DOM rendering
  },
  "devDependencies": {
    "@types/react": "^18.2.0",        // React TypeScript types
    "@types/react-dom": "^18.2.0",    // React DOM TypeScript types
    "@vitejs/plugin-react": "^4.2.0", // Vite React plugin
    "vite": "^5.0.0"                  // Vite build tool
  }
}
```

**Available Commands:**
```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Create production build (optimized)
npm run preview  # Preview the production build locally
```

### Development Server and Hot Module Replacement

**Hot Module Replacement (HMR):**
- Instant updates when you save code changes
- No need to manually refresh browser
- Component state is preserved during updates
- Lightning-fast updates (milliseconds!)
- Only changed modules are updated

```javascript
// Make a change in App.jsx
function App() {
  return (
    <div>
      <h1>Hello React with Vite!</h1>
      {/* Add this line and save */}
      <p>HMR is blazing fast!</p>
    </div>
  )
}
// Browser updates instantly without full refresh!
// Your component state is preserved!
```

### Build Process and Production

**Development Build:**
```bash
npm run dev
# Features:
# - Native ES modules (no bundling)
# - Instant server start
# - Lightning-fast HMR
# - Source maps for debugging
# - Optimized for development experience
```

**Production Build:**
```bash
npm run build
# Creates optimized build in 'dist/' folder:
# - Uses Rollup for bundling
# - Minified code
# - Tree-shaking (removes unused code)
# - Code splitting
# - Optimized assets
# - Ready for deployment

# Output:
dist/
├── assets/
│   ├── index-abc123.css
│   └── index-xyz789.js
└── index.html
```

**Preview Production Build:**
```bash
# Preview the production build locally
npm run preview
# Opens at http://localhost:4173
```

**Deploying Production Build:**
```bash
# Deploy the 'dist/' folder to:
# - Netlify (drag & drop or CLI)
# - Vercel (automatic with Git)
# - GitHub Pages
# - AWS S3
# - Any static hosting service

# The dist/ folder contains all you need to deploy
```

### Importing and Exporting Modules

**Named Export/Import:**
```javascript
// components/Button.js
export function Button() {
  return <button>Click me</button>;
}

export function IconButton() {
  return <button>🚀</button>;
}

// App.js
import { Button, IconButton } from './components/Button';

function App() {
  return (
    <div>
      <Button />
      <IconButton />
    </div>
  );
}
```

**Default Export/Import:**
```javascript
// components/Header.js
function Header() {
  return <header>My App</header>;
}

export default Header;

// App.js
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

**Importing CSS:**
```javascript
// Import global CSS
import './index.css';

// Import component-specific CSS
import './App.css';

// Import CSS modules
import styles from './Button.module.css';
```

**Importing Images:**
```javascript
// Import as module
import logo from './logo.svg';

function App() {
  return <img src={logo} alt="Logo" />;
}

// Or from public folder (not recommended)
<img src="/logo.png" alt="Logo" />
```

### Organizing Your Project

**Recommended Structure:**
```
src/
├── components/           # Reusable components
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   └── Button.test.jsx
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   └── Card/
│       ├── Card.jsx
│       └── Card.css
├── pages/               # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── utils/               # Helper functions
│   ├── api.js
│   └── helpers.js
├── assets/              # Images, fonts, etc.
│   ├── images/
│   └── fonts/
├── App.jsx
└── main.jsx
```

---

## 3. JSX Deep Dive

### What is JSX?

**JSX (JavaScript XML)** is a syntax extension for JavaScript that looks similar to HTML but allows you to write UI components with the full power of JavaScript.

```javascript
// JSX
const element = <h1>Hello, world!</h1>;

// Compiles to JavaScript:
const element = React.createElement('h1', null, 'Hello, world!');
```

### JSX Syntax and Rules

#### Rule 1: HTML-like Syntax in JavaScript

```javascript
// Valid JSX
function Welcome() {
    return (
        <div>
            <h1>Welcome to React</h1>
            <p>This looks like HTML!</p>
        </div>
    );
}

// You can assign JSX to variables
const heading = <h1>Hello</h1>;
const paragraph = <p>React is awesome</p>;
```

#### Rule 2: Self-Closing Tags Requirement

```javascript
// ❌ WRONG - Must self-close
<img src="logo.png">
<input type="text">
<br>

// ✅ CORRECT
<img src="logo.png" />
<input type="text" />
<br />
```

#### Rule 3: Single Parent Element Rule

```javascript
// ❌ WRONG - Multiple root elements
function App() {
    return (
        <h1>Title</h1>
        <p>Paragraph</p>
    );
}

// ✅ CORRECT - Wrapped in single parent
function App() {
    return (
        <div>
            <h1>Title</h1>
            <p>Paragraph</p>
        </div>
    );
}

// ✅ CORRECT - Using React Fragment (no extra DOM element)
function App() {
    return (
        <>
            <h1>Title</h1>
            <p>Paragraph</p>
        </>
    );
}

// Or explicit Fragment syntax
function App() {
    return (
        <React.Fragment>
            <h1>Title</h1>
            <p>Paragraph</p>
        </React.Fragment>
    );
}
```

### JavaScript Expressions in JSX

#### Curly Brace Syntax `{}`

```javascript
function App() {
    const name = 'Alice';
    const age = 25;
    const isLoggedIn = true;

    return (
        <div>
            {/* Variables */}
            <h1>Hello, {name}!</h1>
            <p>Age: {age}</p>

            {/* Expressions */}
            <p>Next year: {age + 1}</p>
            <p>Double age: {age * 2}</p>

            {/* Function calls */}
            <p>Uppercase: {name.toUpperCase()}</p>

            {/* Boolean (won't display directly) */}
            <p>Logged in: {isLoggedIn ? 'Yes' : 'No'}</p>
        </div>
    );
}
```

#### Variables and Calculations

```javascript
function ProductCard() {
    const product = {
        name: 'Laptop',
        price: 999,
        discount: 0.1
    };

    const finalPrice = product.price * (1 - product.discount);

    return (
        <div className="product-card">
            <h2>{product.name}</h2>
            <p>Original Price: ${product.price}</p>
            <p>Discount: {product.discount * 100}%</p>
            <p>Final Price: ${finalPrice.toFixed(2)}</p>
        </div>
    );
}
```

#### Conditional Rendering

**Method 1: Ternary Operator**
```javascript
function Greeting({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? (
                <h1>Welcome back!</h1>
            ) : (
                <h1>Please sign in</h1>
            )}
        </div>
    );
}
```

**Method 2: Logical AND (&&)**
```javascript
function Notifications({ count }) {
    return (
        <div>
            <h2>Notifications</h2>
            {count > 0 && (
                <p>You have {count} new notifications</p>
            )}
            {count === 0 && (
                <p>No new notifications</p>
            )}
        </div>
    );
}
```

**Method 3: Variables**
```javascript
function UserStatus({ user }) {
    let message;

    if (user.isPremium) {
        message = <p className="premium">Premium Member</p>;
    } else if (user.isActive) {
        message = <p className="active">Active Member</p>;
    } else {
        message = <p className="inactive">Inactive</p>;
    }

    return (
        <div>
            <h2>{user.name}</h2>
            {message}
        </div>
    );
}
```

**Method 4: Immediately Invoked Function**
```javascript
function ComplexConditional({ status }) {
    return (
        <div>
            {(() => {
                if (status === 'loading') {
                    return <p>Loading...</p>;
                } else if (status === 'error') {
                    return <p>Error occurred!</p>;
                } else if (status === 'success') {
                    return <p>Data loaded successfully!</p>;
                }
                return <p>Unknown status</p>;
            })()}
        </div>
    );
}
```

#### Array Rendering with .map()

```javascript
function UserList() {
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ];

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// With more complex structure
function ProductList() {
    const products = [
        { id: 1, name: 'Laptop', price: 999 },
        { id: 2, name: 'Phone', price: 599 },
        { id: 3, name: 'Tablet', price: 399 }
    ];

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}
```

**The `key` Prop:**
```javascript
// ❌ WRONG - No key
{users.map(user => (
    <li>{user.name}</li>
))}

// ❌ WRONG - Using index as key (anti-pattern for dynamic lists)
{users.map((user, index) => (
    <li key={index}>{user.name}</li>
))}

// ✅ CORRECT - Using unique ID
{users.map(user => (
    <li key={user.id}>{user.name}</li>
))}
```

### JSX Attributes and Naming Conventions

#### className instead of class

```javascript
// ❌ WRONG
<div class="container">Content</div>

// ✅ CORRECT
<div className="container">Content</div>

// Dynamic classes
function Button({ isPrimary }) {
    return (
        <button className={isPrimary ? 'btn-primary' : 'btn-secondary'}>
            Click me
        </button>
    );
}

// Multiple classes
<div className="card card-large card-featured">Content</div>

// Template literals for dynamic classes
function Alert({ type, isVisible }) {
    return (
        <div className={`alert alert-${type} ${isVisible ? 'show' : 'hide'}`}>
            Alert message
        </div>
    );
}
```

#### htmlFor instead of for

```javascript
// ❌ WRONG
<label for="email">Email:</label>

// ✅ CORRECT
<label htmlFor="email">Email:</label>
<input id="email" type="email" />
```

#### camelCase Event Handlers

```javascript
// HTML uses lowercase
<button onclick="handleClick()">Click</button>

// JSX uses camelCase
<button onClick={handleClick}>Click</button>

// Common event handlers
<input onChange={handleChange} />
<form onSubmit={handleSubmit} />
<div onMouseEnter={handleMouseEnter} />
<div onMouseLeave={handleMouseLeave} />
<input onFocus={handleFocus} />
<input onBlur={handleBlur} />
```

#### Other Naming Differences

```javascript
// HTML attribute → JSX attribute
tabindex → tabIndex
maxlength → maxLength
readonly → readOnly
contenteditable → contentEditable

// Example
<input
    type="text"
    maxLength={50}
    readOnly={false}
    tabIndex={1}
/>
```

### Styling in JSX

#### Method 1: Inline Styles with Objects

```javascript
function StyledComponent() {
    // Style object
    const divStyle = {
        backgroundColor: 'lightblue',
        padding: '20px',
        borderRadius: '8px',
        fontSize: '16px',
        color: 'darkblue'
    };

    return (
        <div style={divStyle}>
            Styled content
        </div>
    );
}

// Inline style object
function InlineStyled() {
    return (
        <div style={{
            backgroundColor: 'lightgreen',
            padding: '10px',
            margin: '5px'
        }}>
            Inline styled
        </div>
    );
}

// Dynamic styles
function DynamicStyle({ isActive }) {
    const buttonStyle = {
        backgroundColor: isActive ? 'green' : 'gray',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: isActive ? 'pointer' : 'not-allowed'
    };

    return <button style={buttonStyle}>Button</button>;
}
```

**Important Notes about Inline Styles:**
- Use camelCase for property names (backgroundColor, not background-color)
- Values are strings (except numbers which become px)
- No vendor prefixes needed (React adds them)

#### Method 2: CSS Classes and Modules

**Regular CSS:**
```javascript
// App.css
.container {
    max-width: 1200px;
    margin: 0 auto;
}

.card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

// App.js
import './App.css';

function App() {
    return (
        <div className="container">
            <div className="card">
                Card content
            </div>
        </div>
    );
}
```

**CSS Modules (Scoped Styles):**
```javascript
// Button.module.css
.button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
}

.primary {
    background-color: blue;
    color: white;
}

.secondary {
    background-color: gray;
    color: white;
}

// Button.js
import styles from './Button.module.css';

function Button({ variant }) {
    return (
        <button className={`${styles.button} ${styles[variant]}`}>
            Click me
        </button>
    );
}
```

#### Method 3: Dynamic Styling

```javascript
function ProgressBar({ percentage }) {
    return (
        <div style={{
            width: '100%',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px'
        }}>
            <div style={{
                width: `${percentage}%`,
                height: '20px',
                backgroundColor: percentage > 75 ? 'green' : 'orange',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
            }}>
                {percentage}%
            </div>
        </div>
    );
}

// Conditional styling
function StatusBadge({ status }) {
    const getStatusColor = () => {
        switch(status) {
            case 'success': return '#4caf50';
            case 'warning': return '#ff9800';
            case 'error': return '#f44336';
            default: return '#9e9e9e';
        }
    };

    return (
        <span style={{
            backgroundColor: getStatusColor(),
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px'
        }}>
            {status}
        </span>
    );
}
```

### Comments in JSX

```javascript
function App() {
    return (
        <div>
            {/* This is a JSX comment */}

            {/*
                Multi-line comment
                in JSX
            */}

            <h1>Hello</h1>

            {/* You can comment out JSX elements
            <p>This won't render</p>
            */}
        </div>
    );
}

// Regular JavaScript comments outside JSX
// This is a regular comment
```

---

## 4. Components and Props

### Functional Components Creation

**Basic Functional Component:**
```javascript
// Method 1: Function declaration
function Greeting() {
    return <h1>Hello, World!</h1>;
}

// Method 2: Arrow function
const Greeting = () => {
    return <h1>Hello, World!</h1>;
};

// Method 3: Arrow function with implicit return (no curly braces)
const Greeting = () => <h1>Hello, World!</h1>;

// Method 4: Arrow function with implicit return (parentheses for JSX)
const Greeting = () => (
    <h1>Hello, World!</h1>
);
```

### Component Naming Conventions

**Rules:**
- **MUST** start with uppercase letter (PascalCase)
- Use descriptive names
- One component per file (recommended)

```javascript
// ✅ CORRECT
function UserProfile() { }
function ProductCard() { }
function NavigationBar() { }

// ❌ WRONG - lowercase
function userProfile() { }  // React won't recognize as component
function product_card() { } // Use PascalCase, not snake_case
```

### Return Statements and JSX

```javascript
// Single line return
function SimpleComponent() {
    return <h1>Hello</h1>;
}

// Multi-line return with parentheses
function Component() {
    return (
        <div>
            <h1>Title</h1>
            <p>Content</p>
        </div>
    );
}

// Return with logic
function ConditionalComponent({ isLoggedIn }) {
    if (!isLoggedIn) {
        return <p>Please log in</p>;
    }

    return (
        <div>
            <h1>Welcome back!</h1>
            <p>You are logged in</p>
        </div>
    );
}

// Early return pattern
function UserDashboard({ user }) {
    if (!user) {
        return <p>Loading...</p>;
    }

    if (user.error) {
        return <p>Error: {user.error}</p>;
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
}
```

### Props Concept and Usage

**Props (Properties)** are arguments passed to components, similar to function parameters.

**Passing Props:**
```javascript
function App() {
    return (
        <div>
            <Greeting name="Alice" />
            <Greeting name="Bob" />
            <Greeting name="Charlie" />
        </div>
    );
}

function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}
```

**Multiple Props:**
```javascript
function App() {
    return (
        <UserCard
            name="Alice Johnson"
            email="alice@example.com"
            age={28}
            isActive={true}
            role="Developer"
        />
    );
}

function UserCard(props) {
    return (
        <div className="user-card">
            <h2>{props.name}</h2>
            <p>Email: {props.email}</p>
            <p>Age: {props.age}</p>
            <p>Role: {props.role}</p>
            <p>Status: {props.isActive ? 'Active' : 'Inactive'}</p>
        </div>
    );
}
```

### Accessing Props in Functional Components

**Method 1: Props Object**
```javascript
function Product(props) {
    return (
        <div>
            <h3>{props.name}</h3>
            <p>${props.price}</p>
        </div>
    );
}
```

**Method 2: Destructuring (Recommended)**
```javascript
function Product({ name, price, category, inStock }) {
    return (
        <div>
            <h3>{name}</h3>
            <p>Category: {category}</p>
            <p>${price}</p>
            <p>{inStock ? 'In Stock' : 'Out of Stock'}</p>
        </div>
    );
}

// Usage
<Product
    name="Laptop"
    price={999}
    category="Electronics"
    inStock={true}
/>
```

**Method 3: Destructuring with Default Values**
```javascript
function Button({ text = 'Click me', variant = 'primary', disabled = false }) {
    return (
        <button className={`btn btn-${variant}`} disabled={disabled}>
            {text}
        </button>
    );
}

// Usage
<Button />  {/* Uses all defaults */}
<Button text="Submit" variant="success" />
<Button text="Cancel" variant="danger" disabled={true} />
```

### Props with Different Data Types

```javascript
function ComponentShowcase() {
    const user = {
        name: 'Alice',
        age: 28
    };

    const hobbies = ['Reading', 'Coding', 'Gaming'];

    const handleClick = () => {
        console.log('Button clicked!');
    };

    return (
        <ComplexComponent
            // String
            title="My Component"

            // Number
            count={42}

            // Boolean
            isActive={true}

            // Array
            items={hobbies}

            // Object
            user={user}

            // Function
            onClick={handleClick}

            // JSX
            icon={<span>🚀</span>}
        />
    );
}

function ComplexComponent({ title, count, isActive, items, user, onClick, icon }) {
    return (
        <div>
            <h2>{title} {icon}</h2>
            <p>Count: {count}</p>
            <p>Active: {isActive ? 'Yes' : 'No'}</p>
            <p>User: {user.name}, {user.age}</p>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={onClick}>Click me</button>
        </div>
    );
}
```

### Component Composition

**Nesting Components:**
```javascript
function App() {
    return (
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header>
            <Logo />
            <Navigation />
        </header>
    );
}

function Logo() {
    return <h1>My Website</h1>;
}

function Navigation() {
    return (
        <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    );
}

function MainContent() {
    return (
        <main>
            <Article title="First Article" content="Content here..." />
            <Article title="Second Article" content="More content..." />
        </main>
    );
}

function Article({ title, content }) {
    return (
        <article>
            <h2>{title}</h2>
            <p>{content}</p>
        </article>
    );
}

function Footer() {
    return <footer>Copyright 2025</footer>;
}
```

### Children Prop

The `children` prop is a special prop that represents the content between opening and closing tags.

```javascript
// Container component
function Card({ children }) {
    return (
        <div className="card">
            {children}
        </div>
    );
}

// Usage
function App() {
    return (
        <div>
            <Card>
                <h2>Card Title</h2>
                <p>Card content goes here</p>
            </Card>

            <Card>
                <img src="photo.jpg" alt="Photo" />
                <p>Photo caption</p>
            </Card>
        </div>
    );
}

// More complex example
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
}

// Usage
function App() {
    return (
        <Modal isOpen={true} onClose={() => console.log('Close')}>
            <h2>Modal Title</h2>
            <p>This is the modal content</p>
            <button>Confirm</button>
        </Modal>
    );
}
```

### Reusable Component Design

```javascript
// Highly reusable Button component
function Button({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
    type = 'button'
}) {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;
    const className = `${baseClass} ${variantClass} ${sizeClass}`;

    return (
        <button
            type={type}
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

// Usage - Multiple variations
function App() {
    return (
        <div>
            <Button variant="primary" size="small">
                Small Primary
            </Button>

            <Button variant="secondary" size="medium">
                Medium Secondary
            </Button>

            <Button variant="danger" size="large" onClick={() => alert('Clicked!')}>
                Large Danger
            </Button>

            <Button disabled={true}>
                Disabled Button
            </Button>
        </div>
    );
}

// Reusable Input component
function Input({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    required = false
}) {
    return (
        <div className="input-group">
            {label && (
                <label>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? 'input-error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
}

// Usage
function Form() {
    return (
        <form>
            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                required={true}
            />
            <Input
                label="Password"
                type="password"
                error="Password is too short"
            />
        </form>
    );
}
```

### Best Practices for Component Organization

**1. Single Responsibility:**
```javascript
// ❌ BAD - Component does too much
function UserDashboard() {
    return (
        <div>
            <header>
                <nav>...</nav>
            </header>
            <aside>
                <ul>...</ul>
            </aside>
            <main>
                <section>...</section>
            </main>
            <footer>...</footer>
        </div>
    );
}

// ✅ GOOD - Broken into smaller components
function UserDashboard() {
    return (
        <div>
            <Header />
            <Sidebar />
            <MainContent />
            <Footer />
        </div>
    );
}
```

**2. Props Interface:**
```javascript
// Clear, well-defined props
function ProductCard({
    id,
    name,
    price,
    image,
    description,
    onAddToCart,
    inStock = true
}) {
    return (
        <div className="product-card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>${price}</p>
            {inStock ? (
                <button onClick={() => onAddToCart(id)}>
                    Add to Cart
                </button>
            ) : (
                <p>Out of Stock</p>
            )}
        </div>
    );
}
```

**3. File Organization:**
```
components/
├── Button/
│   ├── Button.js
│   ├── Button.css
│   └── index.js  (exports Button)
├── Card/
│   ├── Card.js
│   ├── Card.css
│   └── index.js
└── Header/
    ├── Header.js
    ├── Header.css
    └── index.js
```

---

## 5. Practical Component Examples

### Header and Navigation Components

```javascript
// Header.js
function Header() {
    return (
        <header className="header">
            <div className="container">
                <Logo />
                <Navigation />
                <UserMenu />
            </div>
        </header>
    );
}

// Logo.js
function Logo() {
    return (
        <div className="logo">
            <img src="/logo.png" alt="Company Logo" />
            <span>MyApp</span>
        </div>
    );
}

// Navigation.js
function Navigation() {
    const navItems = [
        { id: 1, text: 'Home', href: '/' },
        { id: 2, text: 'Products', href: '/products' },
        { id: 3, text: 'About', href: '/about' },
        { id: 4, text: 'Contact', href: '/contact' }
    ];

    return (
        <nav className="navigation">
            <ul>
                {navItems.map(item => (
                    <li key={item.id}>
                        <a href={item.href}>{item.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// UserMenu.js
function UserMenu({ isLoggedIn, userName }) {
    return (
        <div className="user-menu">
            {isLoggedIn ? (
                <>
                    <span>Welcome, {userName}</span>
                    <button>Logout</button>
                </>
            ) : (
                <>
                    <button>Login</button>
                    <button>Sign Up</button>
                </>
            )}
        </div>
    );
}
```

### Card Components

```javascript
// Basic Card
function Card({ children, title, footer }) {
    return (
        <div className="card">
            {title && <div className="card-header">{title}</div>}
            <div className="card-body">{children}</div>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
}

// Product Card
function ProductCard({ product }) {
    const { id, name, price, image, rating, inStock } = product;

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={image} alt={name} />
                {!inStock && <div className="out-of-stock-badge">Out of Stock</div>}
            </div>
            <div className="product-info">
                <h3>{name}</h3>
                <div className="rating">
                    <StarRating rating={rating} />
                </div>
                <p className="price">${price.toFixed(2)}</p>
                <button
                    disabled={!inStock}
                    className={inStock ? 'btn-primary' : 'btn-disabled'}
                >
                    {inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
}

// Star Rating Component
function StarRating({ rating, maxStars = 5 }) {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        stars.push(
            <span key={i} className={i <= rating ? 'star-filled' : 'star-empty'}>
                ★
            </span>
        );
    }

    return <div className="star-rating">{stars}</div>;
}

// Usage
function ProductList() {
    const products = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 79.99,
            image: 'headphones.jpg',
            rating: 4,
            inStock: true
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 199.99,
            image: 'watch.jpg',
            rating: 5,
            inStock: false
        }
    ];

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
```

### List Components with Dynamic Content

```javascript
// Generic List Component
function List({ items, renderItem, emptyMessage = 'No items found' }) {
    if (items.length === 0) {
        return <p className="empty-message">{emptyMessage}</p>;
    }

    return (
        <ul className="list">
            {items.map((item, index) => (
                <li key={item.id || index}>{renderItem(item)}</li>
            ))}
        </ul>
    );
}

// Todo List
function TodoList({ todos, onToggle, onDelete }) {
    return (
        <List
            items={todos}
            renderItem={(todo) => (
                <TodoItem
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            )}
            emptyMessage="No todos yet. Add one!"
        />
    );
}

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
}

// User List
function UserList({ users }) {
    return (
        <div className="user-list">
            <h2>Team Members ({users.length})</h2>
            <List
                items={users}
                renderItem={(user) => (
                    <UserListItem user={user} />
                )}
            />
        </div>
    );
}

function UserListItem({ user }) {
    return (
        <div className="user-list-item">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.role}</p>
                <p>{user.email}</p>
            </div>
            <StatusBadge status={user.status} />
        </div>
    );
}

function StatusBadge({ status }) {
    const statusConfig = {
        online: { color: 'green', text: 'Online' },
        offline: { color: 'gray', text: 'Offline' },
        away: { color: 'orange', text: 'Away' }
    };

    const config = statusConfig[status] || statusConfig.offline;

    return (
        <span className={`status-badge status-${config.color}`}>
            {config.text}
        </span>
    );
}
```

### Button Components with Variants

```javascript
// Flexible Button Component
function Button({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    loading = false,
    icon,
    onClick,
    type = 'button'
}) {
    const baseClass = 'btn';
    const classes = [
        baseClass,
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && 'btn-full-width',
        loading && 'btn-loading',
        disabled && 'btn-disabled'
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading && <Spinner />}
            {icon && <span className="btn-icon">{icon}</span>}
            <span>{children}</span>
        </button>
    );
}

function Spinner() {
    return <span className="spinner">⏳</span>;
}

// Icon Button
function IconButton({ icon, label, onClick }) {
    return (
        <button className="icon-button" onClick={onClick} aria-label={label}>
            {icon}
        </button>
    );
}

// Button Group
function ButtonGroup({ children, align = 'left' }) {
    return (
        <div className={`button-group button-group-${align}`}>
            {children}
        </div>
    );
}

// Usage Examples
function ButtonExamples() {
    return (
        <div>
            <h3>Button Variants</h3>
            <ButtonGroup>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
            </ButtonGroup>

            <h3>Button Sizes</h3>
            <ButtonGroup>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
            </ButtonGroup>

            <h3>Button States</h3>
            <ButtonGroup>
                <Button loading={true}>Loading</Button>
                <Button disabled={true}>Disabled</Button>
                <Button icon="🚀">With Icon</Button>
            </ButtonGroup>

            <h3>Icon Buttons</h3>
            <ButtonGroup>
                <IconButton icon="❤️" label="Like" />
                <IconButton icon="💬" label="Comment" />
                <IconButton icon="🔗" label="Share" />
            </ButtonGroup>
        </div>
    );
}
```

### Complete Example: Blog Post Component

```javascript
function BlogPost({ post }) {
    const { title, author, date, content, tags, likes, comments } = post;

    return (
        <article className="blog-post">
            <BlogPostHeader title={title} author={author} date={date} />
            <BlogPostContent content={content} />
            <BlogPostTags tags={tags} />
            <BlogPostFooter likes={likes} comments={comments} />
        </article>
    );
}

function BlogPostHeader({ title, author, date }) {
    return (
        <header className="blog-post-header">
            <h2>{title}</h2>
            <div className="post-meta">
                <AuthorInfo author={author} />
                <time dateTime={date}>
                    {new Date(date).toLocaleDateString()}
                </time>
            </div>
        </header>
    );
}

function AuthorInfo({ author }) {
    return (
        <div className="author-info">
            <img src={author.avatar} alt={author.name} className="author-avatar" />
            <span className="author-name">{author.name}</span>
        </div>
    );
}

function BlogPostContent({ content }) {
    return (
        <div className="blog-post-content">
            <p>{content}</p>
        </div>
    );
}

function BlogPostTags({ tags }) {
    return (
        <div className="blog-post-tags">
            {tags.map(tag => (
                <span key={tag} className="tag">
                    #{tag}
                </span>
            ))}
        </div>
    );
}

function BlogPostFooter({ likes, comments }) {
    return (
        <footer className="blog-post-footer">
            <button className="like-button">
                ❤️ {likes} Likes
            </button>
            <button className="comment-button">
                💬 {comments} Comments
            </button>
            <button className="share-button">
                🔗 Share
            </button>
        </footer>
    );
}

// Usage
function BlogFeed() {
    const posts = [
        {
            id: 1,
            title: 'Getting Started with React',
            author: {
                name: 'Alice Johnson',
                avatar: 'alice.jpg'
            },
            date: '2025-01-15',
            content: 'React is a powerful library for building user interfaces...',
            tags: ['react', 'javascript', 'webdev'],
            likes: 42,
            comments: 8
        }
    ];

    return (
        <div className="blog-feed">
            {posts.map(post => (
                <BlogPost key={post.id} post={post} />
            ))}
        </div>
    );
}
```

### Debugging React Components

**Using React Developer Tools:**
```
1. Install React Developer Tools browser extension
2. Open browser DevTools
3. Click "Components" tab
4. Inspect component hierarchy
5. View props and state in real-time
6. Track component updates
```

**Console Logging:**
```javascript
function ProductCard({ product }) {
    // Debug props
    console.log('ProductCard props:', product);

    // Debug renders
    console.log('ProductCard rendered');

    return (
        <div className="product-card">
            <h3>{product.name}</h3>
        </div>
    );
}
```

**Error Boundaries (Advanced):**
```javascript
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

// Usage
<ErrorBoundary>
    <MyComponent />
</ErrorBoundary>
```

---

## Practice Exercises

### Exercise 1: Personal Portfolio Page
Create a personal portfolio page with:
- Header component with navigation
- Hero section with your name and title
- Skills section with skill cards
- Projects section with project cards
- Footer with social links

### Exercise 2: Product Card Component
Build a reusable ProductCard that accepts:
- Product name, price, image
- Rating (display as stars)
- In stock status
- Add to cart button

### Exercise 3: Todo List Application
Create a todo list with:
- TodoList component that displays todos
- TodoItem component for each todo
- AddTodo component with input
- Mark complete/delete functionality (use console.log for now)

### Exercise 4: User Profile Component
Build a user profile display with:
- Profile picture
- User information (name, bio, location)
- Stats section (followers, following, posts)
- Action buttons (follow, message)

### Exercise 5: Blog Post List
Create a blog application with:
- BlogPost component for each post
- Post header (title, author, date)
- Post content
- Tags display
- Interaction buttons (like, comment, share)

---

## Additional Resources

- [React Official Documentation](https://react.dev/)
- [React Tutorial for Beginners](https://react.dev/learn)
- [Vite Documentation](https://vitejs.dev/)
- [Vite + React Guide](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [React Components and Props](https://react.dev/learn/passing-props-to-a-component)
- [JSX In Depth](https://react.dev/learn/writing-markup-with-jsx)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
