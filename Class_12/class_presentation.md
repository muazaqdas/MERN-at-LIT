# Class 12: React Introduction
## Presentation Notes (1.5 Hours)

---

## Section 1: React Fundamentals (15 minutes)

### What is React?

React is a **JavaScript library** for building user interfaces.

**Key Features:**
- Component-based architecture
- Virtual DOM for performance
- Declarative programming
- Created and maintained by Meta (Facebook)

---

### Traditional JavaScript vs React

**Traditional (Imperative):**
```javascript
// Tell the browser HOW to do it
const button = document.createElement('button');
button.textContent = 'Click me';
button.addEventListener('click', () => {
    alert('Clicked!');
});
document.body.appendChild(button);
```

**React (Declarative):**
```javascript
// Tell React WHAT you want
function Button() {
    return (
        <button onClick={() => alert('Clicked!')}>
            Click me
        </button>
    );
}
```

React is **declarative** - you describe what you want, not how to build it.

---

### Why Use React?

**1. Component Reusability**
```javascript
// Create once
function UserCard({ name, email }) {
    return (
        <div className="user-card">
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    );
}

// Use everywhere
<UserCard name="Alice" email="alice@example.com" />
<UserCard name="Bob" email="bob@example.com" />
<UserCard name="Charlie" email="charlie@example.com" />
```

**2. Efficient Updates (Virtual DOM)**
- React creates a virtual copy of the DOM in memory
- When data changes, React compares old and new virtual DOM
- Only updates what actually changed (not entire page!)

**3. Strong Ecosystem**
- React Router, Redux, Next.js
- Huge community and job market demand
- Used by Facebook, Instagram, Netflix, Airbnb

---

### Component-Based Architecture

Break your UI into **reusable pieces**:

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
    return <header><h1>My Website</h1></header>;
}

function MainContent() {
    return <main><p>Welcome to my site!</p></main>;
}

function Footer() {
    return <footer><p>Copyright 2025</p></footer>;
}
```

**Benefits:**
- Reusable components
- Easier to maintain
- Better organization
- Team collaboration

---

### When to Use React

**Use React for:**
- Single-page applications (SPAs)
- Complex, interactive UIs
- Applications that will scale
- Projects requiring component reuse

**Consider alternatives for:**
- Simple static websites
- No JavaScript interactivity needed
- Very small projects

---

## Section 2: React Setup and Project Structure (12 minutes)

### Creating a React App

```bash
# Check Node.js is installed
node --version

# Create new React app with Vite
npm create vite@latest my-app -- --template react

# Navigate to project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev

# Opens at http://localhost:5173
```

---

### Project Structure

```
my-app/
├── node_modules/      # Dependencies (don't touch)
├── public/            # Static assets (images, etc.)
├── src/               # Your code goes here!
│   ├── App.jsx       # Main component
│   ├── App.css       # App styles
│   ├── main.jsx      # Entry point
│   └── index.css     # Global styles
├── index.html         # Main HTML file (root level)
├── vite.config.js     # Vite configuration
├── package.json       # Dependencies and scripts
└── README.md         # Documentation
```

---

### Key Files Explained

**`index.html`** - Single HTML file (at root):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**`src/main.jsx`** - Entry point:
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**`src/App.jsx`** - Main component:
```javascript
function App() {
    return (
        <div>
            <h1>Hello React!</h1>
        </div>
    );
}

export default App;
```

---

### Important Commands

```bash
npm run dev    # Start development server
npm run build  # Create production build
npm run preview # Preview production build locally
```

**Hot Module Replacement (HMR):**
- Save your code
- Browser automatically updates instantly
- No manual refresh needed!
- State is preserved during updates

---

### Importing and Exporting

**Default Export/Import:**
```javascript
// Header.js
function Header() {
    return <header>My Header</header>;
}
export default Header;

// App.js
import Header from './Header';
```

**Named Export/Import:**
```javascript
// utils.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// App.js
import { add, subtract } from './utils';
```

**Importing CSS:**
```javascript
import './App.css';  // CSS styles
import logo from './logo.png';  // Images
```

---

## Section 3: JSX Deep Dive (25 minutes)

### What is JSX?

**JSX (JavaScript XML)** - HTML-like syntax in JavaScript

```javascript
const element = <h1>Hello, world!</h1>;
```

It's **NOT** HTML - it's JavaScript that looks like HTML!

---

### JSX Rules

**Rule 1: Self-Closing Tags**
```javascript
// ❌ WRONG
<img src="logo.png">
<input type="text">

// ✅ CORRECT
<img src="logo.png" />
<input type="text" />
```

**Rule 2: Single Parent Element**
```javascript
// ❌ WRONG
function App() {
    return (
        <h1>Title</h1>
        <p>Paragraph</p>
    );
}

// ✅ CORRECT - Wrap in div
function App() {
    return (
        <div>
            <h1>Title</h1>
            <p>Paragraph</p>
        </div>
    );
}

// ✅ CORRECT - Use Fragment (no extra DOM)
function App() {
    return (
        <>
            <h1>Title</h1>
            <p>Paragraph</p>
        </>
    );
}
```

---

### JavaScript in JSX: Curly Braces `{}`

Use `{}` to embed JavaScript expressions:

```javascript
function Greeting() {
    const name = 'Alice';
    const age = 25;

    return (
        <div>
            {/* Variables */}
            <h1>Hello, {name}!</h1>

            {/* Expressions */}
            <p>Age: {age}</p>
            <p>Next year: {age + 1}</p>

            {/* Function calls */}
            <p>Uppercase: {name.toUpperCase()}</p>

            {/* Math */}
            <p>10 + 5 = {10 + 5}</p>
        </div>
    );
}
```

---

### Conditional Rendering

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
        </div>
    );
}
```

---

### Rendering Lists with .map()

```javascript
function UserList() {
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ];

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.name} - {user.email}
                </li>
            ))}
        </ul>
    );
}
```

**The `key` prop:**
- Required when rendering lists
- Must be unique
- Helps React track items efficiently

```javascript
// ❌ WRONG - No key
{users.map(user => <li>{user.name}</li>)}

// ✅ CORRECT - Unique key
{users.map(user => <li key={user.id}>{user.name}</li>)}
```

---

### JSX Naming Differences

```javascript
// HTML → JSX
class       →  className
for         →  htmlFor
onclick     →  onClick
onchange    →  onChange
tabindex    →  tabIndex

// Example
<label htmlFor="email">Email:</label>
<input id="email" type="email" className="input-field" />
<button onClick={handleClick}>Click me</button>
```

**Why?**
- `class` is reserved in JavaScript
- Event handlers use camelCase
- Attributes match JavaScript naming

---

### Styling in JSX

**Method 1: CSS Classes**
```javascript
// App.css
.card {
    background: white;
    padding: 20px;
    border-radius: 8px;
}

// App.js
import './App.css';

function Card() {
    return <div className="card">Content</div>;
}
```

**Method 2: Inline Styles (Object)**
```javascript
function StyledDiv() {
    const divStyle = {
        backgroundColor: 'lightblue',
        padding: '20px',
        borderRadius: '8px',
        fontSize: '16px'
    };

    return <div style={divStyle}>Styled content</div>;
}

// Or inline
<div style={{
    backgroundColor: 'lightblue',
    padding: '20px'
}}>
    Content
</div>
```

**Note:** Use camelCase for CSS properties in objects!

---

### Dynamic Styling

```javascript
function Button({ isPrimary }) {
    return (
        <button className={isPrimary ? 'btn-primary' : 'btn-secondary'}>
            Click me
        </button>
    );
}

function ProgressBar({ percentage }) {
    return (
        <div style={{
            width: `${percentage}%`,
            height: '20px',
            backgroundColor: percentage > 75 ? 'green' : 'orange'
        }}>
            {percentage}%
        </div>
    );
}
```

---

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
        </div>
    );
}
```

---

## Section 4: Components and Props (28 minutes)

### Creating Functional Components

```javascript
// Method 1: Function declaration
function Greeting() {
    return <h1>Hello, World!</h1>;
}

// Method 2: Arrow function
const Greeting = () => {
    return <h1>Hello, World!</h1>;
};

// Method 3: Arrow function (implicit return)
const Greeting = () => <h1>Hello, World!</h1>;
```

**Component Rules:**
- **MUST** start with uppercase (PascalCase)
- Returns JSX
- Can be reused

```javascript
// ✅ CORRECT
function UserProfile() { }
function ProductCard() { }

// ❌ WRONG - lowercase
function userProfile() { }  // React won't recognize
```

---

### What are Props?

**Props (properties)** are arguments passed to components.

Think of them like function parameters!

```javascript
// Passing props
<Greeting name="Alice" />
<Greeting name="Bob" />
<Greeting name="Charlie" />

// Receiving props
function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}
```

---

### Accessing Props

**Method 1: Props Object**
```javascript
function UserCard(props) {
    return (
        <div>
            <h3>{props.name}</h3>
            <p>{props.email}</p>
            <p>Age: {props.age}</p>
        </div>
    );
}

// Usage
<UserCard name="Alice" email="alice@example.com" age={28} />
```

**Method 2: Destructuring (Recommended)**
```javascript
function UserCard({ name, email, age }) {
    return (
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>Age: {age}</p>
        </div>
    );
}
```

---

### Props with Different Types

```javascript
function ComplexComponent() {
    const user = { name: 'Alice', age: 28 };
    const hobbies = ['Reading', 'Coding', 'Gaming'];

    return (
        <Display
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
            onClick={() => console.log('Clicked!')}
        />
    );
}

function Display({ title, count, isActive, items, user, onClick }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>Count: {count}</p>
            <p>Active: {isActive ? 'Yes' : 'No'}</p>
            <p>User: {user.name}</p>
            <ul>
                {items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
            <button onClick={onClick}>Click</button>
        </div>
    );
}
```

---

### Default Props

```javascript
function Button({ text = 'Click me', variant = 'primary' }) {
    return (
        <button className={`btn btn-${variant}`}>
            {text}
        </button>
    );
}

// Usage
<Button />  {/* Uses defaults: "Click me", "primary" */}
<Button text="Submit" variant="success" />
<Button text="Cancel" />  {/* Uses default variant */}
```

---

### Component Composition

Build complex UIs from simple components:

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
    return <h1>MyWebsite</h1>;
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
            <Article title="First Post" />
            <Article title="Second Post" />
        </main>
    );
}

function Article({ title }) {
    return (
        <article>
            <h2>{title}</h2>
            <p>Article content...</p>
        </article>
    );
}

function Footer() {
    return <footer>Copyright 2025</footer>;
}
```

---

### The Children Prop

Special prop for content between component tags:

```javascript
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
                <p>Card content</p>
            </Card>

            <Card>
                <img src="photo.jpg" alt="Photo" />
                <p>Photo caption</p>
            </Card>
        </div>
    );
}
```

---

### Reusable Component Example

```javascript
// Flexible Button component
function Button({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick
}) {
    const className = `btn btn-${variant} btn-${size}`;

    return (
        <button
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

// Usage - Many variations!
function App() {
    return (
        <div>
            <Button variant="primary" size="small">
                Small Primary
            </Button>

            <Button variant="secondary" size="large">
                Large Secondary
            </Button>

            <Button variant="danger" disabled={true}>
                Disabled
            </Button>

            <Button onClick={() => alert('Clicked!')}>
                With Handler
            </Button>
        </div>
    );
}
```

---

## Section 5: Practical Examples (10 minutes)

### Product Card Component

```javascript
function ProductCard({ product }) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
            <button disabled={!product.inStock}>
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    );
}

// Usage
function ProductList() {
    const products = [
        {
            id: 1,
            name: 'Laptop',
            price: 999,
            image: 'laptop.jpg',
            inStock: true
        },
        {
            id: 2,
            name: 'Phone',
            price: 599,
            image: 'phone.jpg',
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

---

### Navigation Component

```javascript
function Navigation() {
    const links = [
        { id: 1, text: 'Home', href: '/' },
        { id: 2, text: 'Products', href: '/products' },
        { id: 3, text: 'About', href: '/about' },
        { id: 4, text: 'Contact', href: '/contact' }
    ];

    return (
        <nav className="navigation">
            <ul>
                {links.map(link => (
                    <li key={link.id}>
                        <a href={link.href}>{link.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
```

---

### User Profile Component

```javascript
function UserProfile({ user }) {
    return (
        <div className="user-profile">
            <img src={user.avatar} alt={user.name} className="avatar" />

            <div className="user-info">
                <h2>{user.name}</h2>
                <p className="bio">{user.bio}</p>
                <p className="location">📍 {user.location}</p>
            </div>

            <div className="user-stats">
                <Stat label="Followers" value={user.followers} />
                <Stat label="Following" value={user.following} />
                <Stat label="Posts" value={user.posts} />
            </div>

            <div className="actions">
                <button className="btn-primary">Follow</button>
                <button className="btn-secondary">Message</button>
            </div>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="stat">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

// Usage
<UserProfile
    user={{
        name: 'Alice Johnson',
        avatar: 'alice.jpg',
        bio: 'Web Developer | React Enthusiast',
        location: 'San Francisco, CA',
        followers: 1234,
        following: 567,
        posts: 89
    }}
/>
```

---

### Todo List Component

```javascript
function TodoList() {
    const todos = [
        { id: 1, text: 'Learn React', completed: true },
        { id: 2, text: 'Build a project', completed: false },
        { id: 3, text: 'Deploy to production', completed: false }
    ];

    return (
        <div className="todo-list">
            <h2>My Todos ({todos.length})</h2>
            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    );
}

function TodoItem({ todo }) {
    return (
        <li className={todo.completed ? 'completed' : ''}>
            <input type="checkbox" checked={todo.completed} />
            <span>{todo.text}</span>
            <button className="delete-btn">Delete</button>
        </li>
    );
}
```

---

## Key Takeaways

### ✅ React Fundamentals:
- React is a **library** for building UIs
- Uses **component-based** architecture
- **Virtual DOM** makes it fast
- **Declarative** - describe what you want, not how

### ✅ JSX Rules:
- Self-closing tags: `<img />`
- Single parent element (or use `<>` Fragment)
- `className` instead of `class`
- `{}` for JavaScript expressions
- camelCase for event handlers

### ✅ Components:
- **MUST** start with uppercase
- Return JSX
- Can be reused everywhere

### ✅ Props:
- Pass data to components
- Like function parameters
- Use destructuring for cleaner code
- Can pass any data type

---

## Common Mistakes

**1. Lowercase component names:**
```javascript
// ❌ WRONG
function myComponent() { }

// ✅ CORRECT
function MyComponent() { }
```

**2. Multiple root elements:**
```javascript
// ❌ WRONG
return (
    <h1>Title</h1>
    <p>Text</p>
);

// ✅ CORRECT
return (
    <>
        <h1>Title</h1>
        <p>Text</p>
    </>
);
```

**3. Forgetting key in lists:**
```javascript
// ❌ WRONG
{items.map(item => <li>{item}</li>)}

// ✅ CORRECT
{items.map(item => <li key={item.id}>{item}</li>)}
```

**4. Using class instead of className:**
```javascript
// ❌ WRONG
<div class="container">

// ✅ CORRECT
<div className="container">
```

---

## Quick Reference

### Component Template:
```javascript
function MyComponent({ prop1, prop2 }) {
    return (
        <div className="my-component">
            <h2>{prop1}</h2>
            <p>{prop2}</p>
        </div>
    );
}

export default MyComponent;
```

### Using Components:
```javascript
import MyComponent from './MyComponent';

function App() {
    return (
        <MyComponent prop1="Hello" prop2="World" />
    );
}
```

### Rendering Lists:
```javascript
{items.map(item => (
    <div key={item.id}>
        {item.name}
    </div>
))}
```

### Conditional Rendering:
```javascript
{isLoggedIn ? <Welcome /> : <Login />}
{count > 0 && <p>You have {count} items</p>}
```

---

## Practice Challenge

**Build a User Dashboard:**

Create a dashboard with:
1. Header component with logo and navigation
2. UserCard component showing user info
3. StatsCard component showing statistics
4. ActivityList component with recent activities
5. Footer component

**Requirements:**
- Use props to pass data
- Use .map() for lists
- Use conditional rendering
- Make components reusable

**Time: 30-40 minutes**

---

## React Developer Tools

**Install React Developer Tools:**
1. Install browser extension (Chrome/Firefox)
2. Open DevTools
3. Click "Components" tab
4. Inspect component tree
5. View props in real-time
6. Debug component hierarchy

**Very useful for:**
- Seeing component structure
- Checking props values
- Debugging issues
- Understanding data flow

---

## Next Steps

**What we learned today:**
- React fundamentals and benefits
- Setting up React projects
- JSX syntax and rules
- Creating components
- Using props to pass data

**Next class:**
- **State management** with `useState` hook
- **Side effects** with `useEffect` hook
- Making components **interactive**
- Handling **user input**
- **Dynamic updates**

---

## Resources

- [React Docs](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Dev Tools](https://react.dev/learn/react-developer-tools)
- [Thinking in React](https://react.dev/learn/thinking-in-react)

---

## Questions?

Next class: **React State and Effects (useState, useEffect)**
