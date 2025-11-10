# Class 13: React State & Hooks - Complete Study Material

## Table of Contents
1. [Introduction to React Hooks](#1-introduction-to-react-hooks)
2. [useState Hook Fundamentals](#2-usestate-hook-fundamentals)
3. [Event Handling in React](#3-event-handling-in-react)
4. [useEffect Hook Deep Dive](#4-useeffect-hook-deep-dive)
5. [Component Lifecycle with Hooks](#5-component-lifecycle-with-hooks)
6. [Practical State Management Examples](#6-practical-state-management-examples)
7. [Best Practices and Common Pitfalls](#7-best-practices-and-common-pitfalls)
8. [Practice Exercises](#practice-exercises)

---

## 1. Introduction to React Hooks

### What are React Hooks?

**React Hooks** are special functions that allow you to use React features (like state and lifecycle) in functional components without writing class components.

**History:**
- Introduced in React 16.8 (February 2019)
- Before hooks, state and lifecycle methods only available in class components
- Hooks simplified React development significantly

**Why Hooks?**

**Before Hooks (Class Components):**
```javascript
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>+1</button>
            </div>
        );
    }
}
```

**After Hooks (Functional Components):**
```javascript
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}
```

**Advantages of Hooks:**
1. **Simpler code** - Less boilerplate
2. **Better code reuse** - Custom hooks
3. **Easier to understand** - No `this` keyword
4. **Better performance** - Less overhead
5. **Modern standard** - Recommended by React team

### Common React Hooks

**Built-in Hooks:**

1. **useState** - Add state to functional components
2. **useEffect** - Perform side effects
3. **useContext** - Access React Context
4. **useRef** - Reference DOM elements or persist values
5. **useMemo** - Memoize expensive calculations
6. **useCallback** - Memoize callback functions
7. **useReducer** - Complex state management
8. **useLayoutEffect** - Synchronous effects before paint

**This class focuses on:**
- `useState` - Managing component state
- `useEffect` - Handling side effects and lifecycle

### Rules of Hooks

**Rule 1: Only Call Hooks at the Top Level**

```javascript
// ❌ WRONG - Conditional hook
function BadComponent({ condition }) {
    if (condition) {
        const [state, setState] = useState(0);  // Error!
    }
}

// ❌ WRONG - Hook in loop
function BadComponent() {
    for (let i = 0; i < 5; i++) {
        const [state, setState] = useState(0);  // Error!
    }
}

// ✅ CORRECT - Top level
function GoodComponent({ condition }) {
    const [state, setState] = useState(0);

    if (condition) {
        setState(newValue);  // This is fine
    }
}
```

**Why?** React relies on the order of hook calls to track state.

**Rule 2: Only Call Hooks from React Functions**

```javascript
// ❌ WRONG - Regular function
function regularFunction() {
    const [state, setState] = useState(0);  // Error!
}

// ✅ CORRECT - React component
function MyComponent() {
    const [state, setState] = useState(0);  // Good
}

// ✅ CORRECT - Custom hook
function useCustomHook() {
    const [state, setState] = useState(0);  // Good
}
```

**Valid places to call hooks:**
- React functional components
- Custom hooks (functions starting with "use")

---

## 2. useState Hook Fundamentals

### Understanding State

**What is State?**
State is data that can change over time in your component. When state changes, React re-renders the component to reflect the new data.

**State vs Regular Variables:**

```javascript
// Regular variable - doesn't persist or trigger re-render
function Counter() {
    let count = 0;  // Resets to 0 on every render

    function increment() {
        count++;  // Updates variable but doesn't re-render
        console.log(count);  // Shows updated value in console
    }

    return (
        <div>
            <p>Count: {count}</p>  {/* Always shows 0 */}
            <button onClick={increment}>+1</button>
        </div>
    );
}

// State variable - persists and triggers re-render
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);  // Persists between renders

    function increment() {
        setCount(count + 1);  // Updates state and triggers re-render
    }

    return (
        <div>
            <p>Count: {count}</p>  {/* Shows updated value */}
            <button onClick={increment}>+1</button>
        </div>
    );
}
```

### useState Syntax and Usage

**Basic Syntax:**
```javascript
import { useState } from 'react';

const [stateVariable, setStateFunction] = useState(initialValue);
```

**Parts:**
1. **stateVariable** - Current state value (read-only)
2. **setStateFunction** - Function to update state
3. **initialValue** - Initial state value (used only on first render)

**Array Destructuring:**
```javascript
// useState returns an array with 2 elements
// We use array destructuring to name them

const stateArray = useState(0);
const count = stateArray[0];      // State value
const setCount = stateArray[1];   // Setter function

// Same as:
const [count, setCount] = useState(0);
```

### State with Primitive Types

#### Number State

```javascript
function Counter() {
    const [count, setCount] = useState(0);  // Initial value: 0

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count * 2)}>Double</button>
        </div>
    );
}
```

#### String State

```javascript
function NameInput() {
    const [name, setName] = useState('');  // Initial value: empty string

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <p>Hello, {name || 'stranger'}!</p>
            <button onClick={() => setName('')}>Clear</button>
        </div>
    );
}
```

#### Boolean State

```javascript
function Toggle() {
    const [isOn, setIsOn] = useState(false);  // Initial value: false

    return (
        <div>
            <p>The light is {isOn ? 'ON' : 'OFF'}</p>
            <button onClick={() => setIsOn(!isOn)}>
                Toggle
            </button>
            <button onClick={() => setIsOn(true)}>Turn On</button>
            <button onClick={() => setIsOn(false)}>Turn Off</button>
        </div>
    );
}
```

### State with Complex Types

#### Array State

```javascript
function TodoList() {
    const [todos, setTodos] = useState([
        'Learn React',
        'Build a project',
        'Deploy to production'
    ]);
    const [input, setInput] = useState('');

    // Add item
    function addTodo() {
        if (input.trim()) {
            setTodos([...todos, input]);  // Create new array with spread
            setInput('');
        }
    }

    // Remove item
    function removeTodo(index) {
        setTodos(todos.filter((_, i) => i !== index));
    }

    // Update item
    function updateTodo(index, newValue) {
        setTodos(todos.map((todo, i) => i === index ? newValue : todo));
    }

    return (
        <div>
            <h2>Todo List</h2>
            <div>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => removeTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

**Important Array Operations:**

```javascript
const [items, setItems] = useState([1, 2, 3]);

// Add to end
setItems([...items, 4]);  // [1, 2, 3, 4]

// Add to beginning
setItems([0, ...items]);  // [0, 1, 2, 3]

// Remove by index
setItems(items.filter((_, i) => i !== 1));  // [1, 3]

// Update by index
setItems(items.map((item, i) => i === 1 ? 99 : item));  // [1, 99, 3]

// Remove by value
setItems(items.filter(item => item !== 2));  // [1, 3]

// Sort
setItems([...items].sort());  // Don't mutate original

// Clear all
setItems([]);
```

#### Object State

```javascript
function UserProfile() {
    const [user, setUser] = useState({
        name: 'Alice',
        age: 25,
        email: 'alice@example.com',
        address: {
            city: 'New York',
            country: 'USA'
        }
    });

    // Update single property
    function updateName(newName) {
        setUser({
            ...user,           // Spread existing properties
            name: newName      // Override name
        });
    }

    // Update nested property
    function updateCity(newCity) {
        setUser({
            ...user,
            address: {
                ...user.address,  // Spread nested object
                city: newCity
            }
        });
    }

    // Update multiple properties
    function updateProfile(updates) {
        setUser({
            ...user,
            ...updates  // Merge updates
        });
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Location: {user.address.city}, {user.address.country}</p>

            <button onClick={() => updateName('Bob')}>
                Change Name
            </button>
            <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
                Birthday!
            </button>
            <button onClick={() => updateCity('Los Angeles')}>
                Move to LA
            </button>
        </div>
    );
}
```

**Important:** Always create a new object/array, never mutate the existing one!

```javascript
// ❌ WRONG - Mutating state
function BadComponent() {
    const [user, setUser] = useState({ name: 'Alice' });

    function updateName() {
        user.name = 'Bob';  // Mutating!
        setUser(user);      // React won't detect change
    }
}

// ✅ CORRECT - Creating new object
function GoodComponent() {
    const [user, setUser] = useState({ name: 'Alice' });

    function updateName() {
        setUser({ ...user, name: 'Bob' });  // New object
    }
}
```

### Functional State Updates

**The Problem:**

```javascript
function Counter() {
    const [count, setCount] = useState(0);

    function incrementThreeTimes() {
        setCount(count + 1);  // count = 0, sets to 1
        setCount(count + 1);  // count still 0, sets to 1
        setCount(count + 1);  // count still 0, sets to 1
        // Final result: count = 1 (not 3!)
    }

    return <button onClick={incrementThreeTimes}>+3</button>;
}
```

**Why it happens:**
- State updates are batched
- All three updates use the same `count` value (0)
- Only the last update is applied

**The Solution - Functional Updates:**

```javascript
function Counter() {
    const [count, setCount] = useState(0);

    function incrementThreeTimes() {
        setCount(prev => prev + 1);  // prev = 0, returns 1
        setCount(prev => prev + 1);  // prev = 1, returns 2
        setCount(prev => prev + 1);  // prev = 2, returns 3
        // Final result: count = 3 ✓
    }

    return <button onClick={incrementThreeTimes}>+3</button>;
}
```

**Functional Update Pattern:**
```javascript
setState(previousState => newState);
```

**When to use functional updates:**
1. When new state depends on previous state
2. When updating state multiple times
3. When state updates might be batched

**Examples:**

```javascript
// Numbers
setCount(prev => prev + 1);
setCount(prev => prev * 2);

// Booleans
setIsOpen(prev => !prev);

// Arrays
setItems(prev => [...prev, newItem]);
setItems(prev => prev.filter(item => item.id !== id));

// Objects
setUser(prev => ({ ...prev, name: 'Bob' }));
```

### Multiple State Variables

**You can call useState multiple times:**

```javascript
function LoginForm() {
    // Separate state for each field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
            />
            <label>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}
```

**Single vs Multiple useState:**

**Multiple useState (Recommended for unrelated data):**
```javascript
const [name, setName] = useState('');
const [age, setAge] = useState(0);
const [email, setEmail] = useState('');
```

**Single useState (For related data):**
```javascript
const [formData, setFormData] = useState({
    name: '',
    age: 0,
    email: ''
});

// Update
setFormData({ ...formData, name: 'Bob' });
```

**Guidelines:**
- Use separate state for independent values
- Group related values in one state object
- Don't over-nest state objects
- Consider readability and ease of updates

---

## 3. Event Handling in React

### React's Synthetic Event System

**Synthetic Events:**
React wraps browser events in a cross-browser compatible wrapper called SyntheticEvent.

```javascript
function EventExample() {
    function handleClick(event) {
        console.log('Event type:', event.type);
        console.log('Native event:', event.nativeEvent);
        console.log('Target element:', event.target);
        console.log('Current target:', event.currentTarget);
        console.log('Mouse position:', event.clientX, event.clientY);
    }

    return <button onClick={handleClick}>Click me</button>;
}
```

**Key Differences from DOM Events:**
1. Event names use camelCase (`onClick` not `onclick`)
2. Pass function reference, not string
3. Cannot return `false` to prevent default (must call `preventDefault()`)

```javascript
// HTML
<button onclick="handleClick()">Click</button>

// React
<button onClick={handleClick}>Click</button>
```

### Common Event Types

#### onClick - Click Events

```javascript
function ClickExample() {
    function handleButtonClick() {
        console.log('Button clicked!');
    }

    function handleDivClick() {
        console.log('Div clicked!');
    }

    return (
        <div>
            <button onClick={handleButtonClick}>
                Click me
            </button>
            <div
                onClick={handleDivClick}
                style={{ padding: '20px', border: '1px solid black', cursor: 'pointer' }}
            >
                Clickable Div
            </div>
        </div>
    );
}
```

#### onChange - Input Change Events

```javascript
function InputExample() {
    const [text, setText] = useState('');
    const [number, setNumber] = useState(0);
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState('option1');

    return (
        <div>
            {/* Text input */}
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {/* Number input */}
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
            />

            {/* Checkbox */}
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />

            {/* Select dropdown */}
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>
    );
}
```

#### onSubmit - Form Submission

```javascript
function FormExample() {
    const [email, setEmail] = useState('');

    function handleSubmit(e) {
        e.preventDefault();  // Prevent page reload
        console.log('Form submitted with:', email);
        // Send to API, etc.
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
```

#### Other Common Events

```javascript
function EventsExample() {
    return (
        <div>
            {/* Mouse events */}
            <div
                onMouseEnter={() => console.log('Mouse entered')}
                onMouseLeave={() => console.log('Mouse left')}
                onMouseMove={(e) => console.log('Mouse at:', e.clientX, e.clientY)}
            >
                Hover over me
            </div>

            {/* Focus events */}
            <input
                onFocus={() => console.log('Input focused')}
                onBlur={() => console.log('Input lost focus')}
            />

            {/* Keyboard events */}
            <input
                onKeyDown={(e) => console.log('Key down:', e.key)}
                onKeyUp={(e) => console.log('Key up:', e.key)}
                onKeyPress={(e) => console.log('Key press:', e.key)}
            />

            {/* Double click */}
            <button onDoubleClick={() => console.log('Double clicked')}>
                Double click me
            </button>
        </div>
    );
}
```

### Event Handler Patterns

#### Pattern 1: Inline Arrow Functions

```javascript
function App() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
```

**Pros:** Simple, concise
**Cons:** Creates new function on every render (usually not a problem)

#### Pattern 2: Function References

```javascript
function App() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Note:** Use `handleClick` not `handleClick()` - we pass the reference, not call it

#### Pattern 3: Passing Parameters

```javascript
function ItemList() {
    const items = ['Apple', 'Banana', 'Cherry'];

    function handleDelete(item) {
        console.log('Deleting:', item);
    }

    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {item}
                    {/* Use arrow function to pass parameter */}
                    <button onClick={() => handleDelete(item)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}
```

**Why arrow function needed:**
```javascript
// ❌ WRONG - Calls immediately during render
<button onClick={handleDelete(item)}>Delete</button>

// ✅ CORRECT - Calls when clicked
<button onClick={() => handleDelete(item)}>Delete</button>
```

#### Pattern 4: Accessing Event Object

```javascript
function App() {
    function handleClick(event) {
        console.log('Button text:', event.target.textContent);
        console.log('Button clicked at:', event.clientX, event.clientY);
    }

    return <button onClick={handleClick}>Click me</button>;
}
```

**With parameters:**
```javascript
function App() {
    function handleClick(id, event) {
        console.log('ID:', id);
        console.log('Event:', event);
    }

    return (
        <button onClick={(e) => handleClick(123, e)}>
            Click me
        </button>
    );
}
```

### Controlled Components (Forms)

**Controlled Component:** Form element whose value is controlled by React state.

#### Basic Controlled Input

```javascript
function ControlledInput() {
    const [value, setValue] = useState('');

    return (
        <div>
            <input
                type="text"
                value={value}                           // Value from state
                onChange={(e) => setValue(e.target.value)}  // Update state
            />
            <p>You typed: {value}</p>
        </div>
    );
}
```

#### Complete Form Example

```javascript
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        category: 'general',
        subscribe: false
    });

    // Generic change handler
    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Form data:', formData);
        // Send to API
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Text input */}
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            {/* Email input */}
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            {/* Textarea */}
            <div>
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>

            {/* Select dropdown */}
            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="general">General</option>
                    <option value="support">Support</option>
                    <option value="sales">Sales</option>
                </select>
            </div>

            {/* Checkbox */}
            <div>
                <label>
                    <input
                        name="subscribe"
                        type="checkbox"
                        checked={formData.subscribe}
                        onChange={handleChange}
                    />
                    Subscribe to newsletter
                </label>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}
```

#### Form Validation

```javascript
function ValidatedForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);

        // If no errors, submit
        if (Object.keys(newErrors).length === 0) {
            console.log('Form is valid!', { email, password });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <button type="submit">Login</button>
        </form>
    );
}
```

---

## 4. useEffect Hook Deep Dive

### Understanding Side Effects

**Side Effects** are operations that affect something outside the component:

**Examples of side effects:**
- Fetching data from APIs
- Setting up subscriptions or timers
- Manually changing the DOM
- Logging to console
- Reading/writing to localStorage
- Setting up event listeners

**Pure Component (No Side Effects):**
```javascript
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}
// Always returns same output for same input
```

**Component with Side Effects:**
```javascript
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Side effect: Fetching data
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data));
    }, [userId]);

    return user ? <div>{user.name}</div> : <p>Loading...</p>;
}
```

### useEffect Syntax

```javascript
import { useEffect } from 'react';

useEffect(() => {
    // Effect code - runs after component renders

    return () => {
        // Cleanup code (optional) - runs before next effect or unmount
    };
}, [dependencies]);  // Dependency array
```

**Three parts:**
1. **Effect function** - Code to execute
2. **Cleanup function** - Optional, returned from effect function
3. **Dependency array** - Controls when effect runs

### Dependency Array Patterns

#### Pattern 1: No Dependency Array

**Runs after every render (rarely needed):**

```javascript
useEffect(() => {
    console.log('Runs after EVERY render');
});
```

**Use case:** Rarely used, usually indicates a problem

#### Pattern 2: Empty Dependency Array

**Runs once after initial render (mount):**

```javascript
useEffect(() => {
    console.log('Runs ONCE when component mounts');

    return () => {
        console.log('Cleanup when component unmounts');
    };
}, []);  // Empty array
```

**Use cases:**
- Fetching initial data
- Setting up subscriptions
- Adding event listeners
- Initializing third-party libraries

**Example:**
```javascript
function App() {
    useEffect(() => {
        console.log('App mounted!');
        document.title = 'My App';

        // Cleanup
        return () => {
            console.log('App unmounting...');
        };
    }, []);

    return <div>Hello World</div>;
}
```

#### Pattern 3: With Dependencies

**Runs when dependencies change:**

```javascript
useEffect(() => {
    console.log('Runs when count changes');
}, [count]);  // Only re-run if count changes
```

**Example:**
```javascript
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);  // Update title when count changes

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}
```

**Multiple dependencies:**
```javascript
useEffect(() => {
    console.log('User or filter changed');
    fetchData(userId, filter);
}, [userId, filter]);  // Runs when either changes
```

### Common useEffect Patterns

#### Pattern 1: Updating Document Title

```javascript
function PageTitle({ title }) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return <h1>{title}</h1>;
}
```

#### Pattern 2: Fetching Data

```javascript
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reset state when userId changes
        setLoading(true);
        setError(null);

        fetch(`https://api.example.com/users/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [userId]);  // Re-fetch when userId changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No user found</p>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}
```

#### Pattern 3: Setting Up Timers

```javascript
function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        // Cleanup: Clear interval when component unmounts
        return () => clearInterval(interval);
    }, []);  // Empty array - set up once

    return <p>Seconds: {seconds}</p>;
}
```

#### Pattern 4: Event Listeners

```javascript
function MouseTracker() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handleMouseMove(e) {
            setPosition({ x: e.clientX, y: e.clientY });
        }

        // Add event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup: Remove event listener
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);  // Empty array - set up once

    return (
        <div>
            Mouse position: {position.x}, {position.y}
        </div>
    );
}
```

#### Pattern 5: Local Storage

```javascript
function PersistentCounter() {
    const [count, setCount] = useState(() => {
        // Initialize from localStorage
        const saved = localStorage.getItem('count');
        return saved ? parseInt(saved) : 0;
    });

    useEffect(() => {
        // Save to localStorage whenever count changes
        localStorage.setItem('count', count);
    }, [count]);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}
```

### Cleanup Functions

**Why cleanup is important:**
- Prevent memory leaks
- Cancel ongoing operations
- Remove event listeners
- Clear timers

**When cleanup runs:**
1. Before the effect runs again (if dependencies changed)
2. When component unmounts

**Example:**
```javascript
function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Effect running for count:', count);

        return () => {
            console.log('Cleaning up for count:', count);
        };
    }, [count]);

    return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// Output when clicking button:
// Effect running for count: 0
// (click button)
// Cleaning up for count: 0
// Effect running for count: 1
// (click button)
// Cleaning up for count: 1
// Effect running for count: 2
```

**Common cleanup scenarios:**

```javascript
// Timer cleanup
useEffect(() => {
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
}, []);

// Interval cleanup
useEffect(() => {
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
}, []);

// Event listener cleanup
useEffect(() => {
    const handler = () => {};
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
}, []);

// Subscription cleanup
useEffect(() => {
    const subscription = subscribeToData();
    return () => subscription.unsubscribe();
}, []);

// Abort fetch request
useEffect(() => {
    const controller = new AbortController();

    fetch('/api/data', { signal: controller.signal })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => {
            if (err.name !== 'AbortError') {
                console.error(err);
            }
        });

    return () => controller.abort();
}, []);
```

### Async Operations in useEffect

**❌ Wrong - Can't make useEffect async:**
```javascript
useEffect(async () => {  // Error!
    const data = await fetchData();
}, []);
```

**✅ Correct - Define async function inside:**
```javascript
useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/data');
        const data = await response.json();
        setData(data);
    }

    fetchData();
}, []);
```

**✅ Correct - Using IIFE:**
```javascript
useEffect(() => {
    (async () => {
        const response = await fetch('/api/data');
        const data = await response.json();
        setData(data);
    })();
}, []);
```

**Complete async example with loading and error:**
```javascript
function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;  // Prevent state update if unmounted

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/data');

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const result = await response.json();

                if (!isCancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err.message);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isCancelled = true;  // Cleanup
        };
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

### Avoiding Infinite Loops

**Common mistake #1: Missing dependencies**
```javascript
// ❌ Infinite loop
function Bad() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1);  // Updates count
    });  // No dependency array - runs after every render
    // This causes infinite loop!

    return <p>{count}</p>;
}

// ✅ Fixed
function Good() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1);
    }, []);  // Empty array - runs once only
}
```

**Common mistake #2: Object/array in dependencies**
```javascript
// ❌ Infinite loop
function Bad() {
    const [data, setData] = useState({ count: 0 });

    useEffect(() => {
        setData({ count: 0 });  // Creates new object
    }, [data]);  // data is new object every time - infinite loop!
}

// ✅ Fixed - Use specific properties
function Good() {
    const [data, setData] = useState({ count: 0 });

    useEffect(() => {
        if (data.count === 0) {
            setData({ count: 1 });
        }
    }, [data.count]);  // Only depend on primitive value
}
```

**Common mistake #3: Missing dependency**
```javascript
// ❌ Stale closure
function Bad({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser(userId);  // Uses userId
    }, []);  // Missing userId in dependencies!
    // Will always use initial userId value
}

// ✅ Fixed
function Good({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);  // Include all used variables
}
```

---

## 5. Component Lifecycle with Hooks

### Understanding Component Lifecycle

**Component Lifecycle Phases:**
1. **Mounting** - Component is created and inserted into DOM
2. **Updating** - Component re-renders due to state/props changes
3. **Unmounting** - Component is removed from DOM

### Class vs Functional Component Lifecycle

#### Class Component Lifecycle Methods

```javascript
class LifecycleDemo extends React.Component {
    // Mounting
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        console.log('1. Constructor');
    }

    componentDidMount() {
        console.log('3. Component Did Mount');
        // Fetch data, set up subscriptions
    }

    // Updating
    componentDidUpdate(prevProps, prevState) {
        console.log('4. Component Did Update');
        if (prevProps.userId !== this.props.userId) {
            // Fetch new data
        }
    }

    // Unmounting
    componentWillUnmount() {
        console.log('5. Component Will Unmount');
        // Cleanup: remove listeners, cancel requests
    }

    render() {
        console.log('2. Render');
        return <div>{this.state.count}</div>;
    }
}
```

#### Functional Component with Hooks

```javascript
function LifecycleDemo({ userId }) {
    const [count, setCount] = useState(0);

    // componentDidMount
    useEffect(() => {
        console.log('Component mounted');
        // Initial setup
    }, []);

    // componentDidUpdate (when userId changes)
    useEffect(() => {
        console.log('userId changed to:', userId);
        // Fetch new data
    }, [userId]);

    // componentWillUnmount
    useEffect(() => {
        return () => {
            console.log('Component will unmount');
            // Cleanup
        };
    }, []);

    // Render
    console.log('Rendering');
    return <div>{count}</div>;
}
```

### Lifecycle Equivalents with useEffect

#### componentDidMount

**Runs once after initial render:**

```javascript
// Class component
componentDidMount() {
    console.log('Mounted');
    this.fetchData();
}

// Functional component
useEffect(() => {
    console.log('Mounted');
    fetchData();
}, []);  // Empty dependency array
```

#### componentDidUpdate

**Runs after every update:**

```javascript
// Class component
componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
        this.fetchUser(this.props.userId);
    }
}

// Functional component
useEffect(() => {
    fetchUser(userId);
}, [userId]);  // Runs when userId changes
```

#### componentWillUnmount

**Runs before component is removed:**

```javascript
// Class component
componentWillUnmount() {
    clearInterval(this.timer);
}

// Functional component
useEffect(() => {
    const timer = setInterval(() => {}, 1000);

    return () => {
        clearInterval(timer);  // Cleanup
    };
}, []);
```

### Complete Lifecycle Example

```javascript
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mount - runs once when component appears
    useEffect(() => {
        console.log('UserProfile mounted');

        // Cleanup - runs when component disappears
        return () => {
            console.log('UserProfile will unmount');
        };
    }, []);

    // Update - runs when userId changes
    useEffect(() => {
        console.log('Fetching user:', userId);
        setLoading(true);

        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            });

        // Cleanup - runs before next fetch
        return () => {
            console.log('Cleaning up previous fetch');
        };
    }, [userId]);

    // Render
    console.log('Rendering UserProfile');

    if (loading) return <p>Loading...</p>;
    return <div>{user?.name}</div>;
}

// Execution order when userId changes from 1 to 2:
// 1. "Rendering UserProfile" (with userId=1)
// 2. "UserProfile mounted"
// 3. "Fetching user: 1"
// (userId changes to 2)
// 4. "Rendering UserProfile" (with userId=2)
// 5. "Cleaning up previous fetch"
// 6. "Fetching user: 2"
// (Component removed)
// 7. "Cleaning up previous fetch"
// 8. "UserProfile will unmount"
```

### Multiple Effects for Separation of Concerns

**Good practice: Separate different concerns into different effects**

```javascript
function UserDashboard({ userId }) {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [time, setTime] = useState(new Date());

    // Effect 1: Fetch user data
    useEffect(() => {
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(setUser);
    }, [userId]);

    // Effect 2: Fetch notifications
    useEffect(() => {
        fetch('/api/notifications')
            .then(res => res.json())
            .then(setNotifications);
    }, []);

    // Effect 3: Update clock
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Effect 4: Update document title
    useEffect(() => {
        if (user) {
            document.title = `Dashboard - ${user.name}`;
        }
    }, [user]);

    return <div>{/* ... */}</div>;
}
```

---

## 6. Practical State Management Examples

### Example 1: Counter with Multiple Operations

```javascript
function AdvancedCounter() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);
    const [history, setHistory] = useState([0]);

    function increment() {
        const newCount = count + step;
        setCount(newCount);
        setHistory([...history, newCount]);
    }

    function decrement() {
        const newCount = count - step;
        setCount(newCount);
        setHistory([...history, newCount]);
    }

    function reset() {
        setCount(0);
        setHistory([0]);
    }

    function undo() {
        if (history.length > 1) {
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);
            setCount(newHistory[newHistory.length - 1]);
        }
    }

    return (
        <div>
            <h1>Counter: {count}</h1>

            <div>
                <label>
                    Step:
                    <input
                        type="number"
                        value={step}
                        onChange={(e) => setStep(Number(e.target.value))}
                    />
                </label>
            </div>

            <button onClick={increment}>+{step}</button>
            <button onClick={decrement}>-{step}</button>
            <button onClick={reset}>Reset</button>
            <button onClick={undo} disabled={history.length <= 1}>
                Undo
            </button>

            <div>
                <h3>History:</h3>
                <p>{history.join(' → ')}</p>
            </div>
        </div>
    );
}
```

### Example 2: Shopping Cart

```javascript
function ShoppingCart() {
    const [items, setItems] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    function addItem() {
        if (productName && productPrice) {
            const newItem = {
                id: Date.now(),
                name: productName,
                price: parseFloat(productPrice),
                quantity: 1
            };

            setItems([...items, newItem]);
            setProductName('');
            setProductPrice('');
        }
    }

    function removeItem(id) {
        setItems(items.filter(item => item.id !== id));
    }

    function updateQuantity(id, newQuantity) {
        if (newQuantity <= 0) {
            removeItem(id);
        } else {
            setItems(items.map(item =>
                item.id === id
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    }

    const total = items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    return (
        <div>
            <h1>Shopping Cart</h1>

            <div>
                <input
                    placeholder="Product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
                <button onClick={addItem}>Add Item</button>
            </div>

            <div>
                {items.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    <div>
                        {items.map(item => (
                            <div key={item.id} style={{ marginBottom: '10px' }}>
                                <span>{item.name}</span>
                                <span> - ${item.price.toFixed(2)}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    -
                                </button>
                                <span> {item.quantity} </span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    +
                                </button>
                                <span> = ${(item.price * item.quantity).toFixed(2)}</span>
                                <button onClick={() => removeItem(item.id)}>Remove</button>
                            </div>
                        ))}
                        <h3>Total: ${total.toFixed(2)}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
```

### Example 3: Todo List with Filtering

```javascript
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

    function addTodo() {
        if (input.trim()) {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    text: input,
                    completed: false,
                    createdAt: new Date()
                }
            ]);
            setInput('');
        }
    }

    function toggleTodo(id) {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    }

    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function clearCompleted() {
        setTodos(todos.filter(todo => !todo.completed));
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const activeCount = todos.filter(t => !t.completed).length;
    const completedCount = todos.filter(t => t.completed).length;

    return (
        <div>
            <h1>Todo List</h1>

            <div>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="What needs to be done?"
                />
                <button onClick={addTodo}>Add</button>
            </div>

            <div>
                <button
                    onClick={() => setFilter('all')}
                    style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
                >
                    All ({todos.length})
                </button>
                <button
                    onClick={() => setFilter('active')}
                    style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
                >
                    Active ({activeCount})
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
                >
                    Completed ({completedCount})
                </button>
            </div>

            <ul>
                {filteredTodos.map(todo => (
                    <li
                        key={todo.id}
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            opacity: todo.completed ? 0.5 : 1
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span>{todo.text}</span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {completedCount > 0 && (
                <button onClick={clearCompleted}>
                    Clear Completed ({completedCount})
                </button>
            )}
        </div>
    );
}
```

### Example 4: Stopwatch with Lap Times

```javascript
function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setTime(0);
        setIsRunning(false);
        setLaps([]);
    }

    function lap() {
        setLaps([...laps, time]);
    }

    function formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }

    return (
        <div>
            <h1>Stopwatch</h1>
            <h2>{formatTime(time)}</h2>

            <div>
                {!isRunning ? (
                    <button onClick={start}>Start</button>
                ) : (
                    <button onClick={stop}>Stop</button>
                )}
                <button onClick={reset}>Reset</button>
                <button onClick={lap} disabled={!isRunning}>
                    Lap
                </button>
            </div>

            {laps.length > 0 && (
                <div>
                    <h3>Lap Times:</h3>
                    <ol>
                        {laps.map((lapTime, index) => (
                            <li key={index}>
                                {formatTime(lapTime)}
                                {index > 0 && (
                                    <span> (+{formatTime(lapTime - laps[index - 1])})</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}
```

### Example 5: Data Fetching with Search

```javascript
function UserSearch() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Don't fetch if search term is empty
        if (!searchTerm) {
            setUsers([]);
            return;
        }

        // Debounce: wait 500ms after user stops typing
        const timeoutId = setTimeout(() => {
            fetchUsers(searchTerm);
        }, 500);

        // Cleanup: cancel previous timeout
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    async function fetchUsers(query) {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.github.com/search/users?q=${query}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data.items || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>GitHub User Search</h1>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search GitHub users..."
            />

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div>
                {users.map(user => (
                    <div key={user.id} style={{ marginBottom: '10px' }}>
                        <img
                            src={user.avatar_url}
                            alt={user.login}
                            width="50"
                            height="50"
                        />
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            {user.login}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

---

## 7. Best Practices and Common Pitfalls

### Best Practices

#### 1. Use Functional Updates for State

```javascript
// ❌ Avoid
setCount(count + 1);

// ✅ Better (when new state depends on previous)
setCount(prev => prev + 1);
```

#### 2. Don't Mutate State Directly

```javascript
// ❌ Wrong - Mutating state
const user = { name: 'Alice' };
user.name = 'Bob';
setUser(user);

// ✅ Correct - Creating new object
setUser({ ...user, name: 'Bob' });

// ❌ Wrong - Mutating array
const items = [1, 2, 3];
items.push(4);
setItems(items);

// ✅ Correct - Creating new array
setItems([...items, 4]);
```

#### 3. Keep Effects Focused

```javascript
// ❌ Avoid - Too many responsibilities
useEffect(() => {
    fetchUser();
    fetchPosts();
    updateTitle();
    setupTimer();
}, []);

// ✅ Better - Separate effects
useEffect(() => {
    fetchUser();
}, [userId]);

useEffect(() => {
    fetchPosts();
}, [userId]);

useEffect(() => {
    updateTitle();
}, [title]);

useEffect(() => {
    const timer = setupTimer();
    return () => clearTimer(timer);
}, []);
```

#### 4. Include All Dependencies

```javascript
// ❌ Wrong - Missing dependencies
useEffect(() => {
    doSomething(userId, filter);
}, []);  // Missing userId and filter

// ✅ Correct - All dependencies included
useEffect(() => {
    doSomething(userId, filter);
}, [userId, filter]);
```

#### 5. Always Clean Up Side Effects

```javascript
// ❌ Wrong - No cleanup
useEffect(() => {
    setInterval(() => {
        console.log('tick');
    }, 1000);
}, []);

// ✅ Correct - With cleanup
useEffect(() => {
    const timer = setInterval(() => {
        console.log('tick');
    }, 1000);

    return () => clearInterval(timer);
}, []);
```

### Common Pitfalls

#### Pitfall 1: Infinite Loops

```javascript
// ❌ Infinite loop - Missing dependency array
useEffect(() => {
    setCount(count + 1);
});

// ❌ Infinite loop - Object dependency
useEffect(() => {
    setData({ value: 0 });
}, [data]);

// ✅ Fixed
useEffect(() => {
    setCount(count + 1);
}, []);  // Runs once
```

#### Pitfall 2: Stale Closures

```javascript
// ❌ Stale closure
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(count + 1);  // Always uses initial count value
        }, 1000);

        return () => clearInterval(timer);
    }, []);  // Missing count dependency

    return <p>{count}</p>;
}

// ✅ Fixed with functional update
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prev => prev + 1);  // Uses latest value
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return <p>{count}</p>;
}
```

#### Pitfall 3: Calling Hooks Conditionally

```javascript
// ❌ Wrong - Conditional hook
if (condition) {
    const [state, setState] = useState(0);
}

// ✅ Correct
const [state, setState] = useState(0);
if (condition) {
    setState(newValue);
}
```

#### Pitfall 4: Not Handling Async Errors

```javascript
// ❌ No error handling
useEffect(() => {
    fetch('/api/data')
        .then(res => res.json())
        .then(data => setData(data));
}, []);

// ✅ With error handling
useEffect(() => {
    fetch('/api/data')
        .then(res => {
            if (!res.ok) throw new Error('Failed');
            return res.json();
        })
        .then(data => setData(data))
        .catch(err => setError(err.message));
}, []);
```

#### Pitfall 5: Forgetting Event.preventDefault()

```javascript
// ❌ Form reloads page
<form onSubmit={handleSubmit}>
    <button type="submit">Submit</button>
</form>

function handleSubmit() {
    console.log('Submitting...');
    // Page reloads!
}

// ✅ Prevent default
function handleSubmit(e) {
    e.preventDefault();  // Prevent page reload
    console.log('Submitting...');
}
```

---

## Practice Exercises

### Exercise 1: Multi-Step Form

Create a multi-step registration form with validation:
- Step 1: Username and email
- Step 2: Password and confirm password
- Step 3: Profile information
- Validate each step before proceeding
- Show progress indicator

### Exercise 2: Quiz Application

Build a quiz app with:
- Multiple choice questions
- Track score
- Timer for each question
- Show results at the end
- Ability to restart

### Exercise 3: Weather Dashboard

Create a weather app that:
- Fetches weather data from an API
- Shows current weather
- 5-day forecast
- Search for different cities
- Save favorite cities

### Exercise 4: Expense Tracker

Build an expense tracker with:
- Add/delete expenses
- Categorize expenses
- Calculate totals by category
- Filter by date range
- Persist data in localStorage

### Exercise 5: Real-time Search

Implement a search feature with:
- Debounced API calls
- Loading state
- Error handling
- Display results
- Highlight search terms

---

## Additional Resources

- [useState Hook - React Docs](https://react.dev/reference/react/useState)
- [useEffect Hook - React Docs](https://react.dev/reference/react/useEffect)
- [React Hooks Reference](https://react.dev/reference/react)
- [Handling Events - React Docs](https://react.dev/learn/responding-to-events)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [React Hooks FAQ](https://react.dev/reference/react/hooks)
