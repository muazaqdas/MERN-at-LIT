# Class 13: React State & Hooks
## Presentation Notes (2.5 Hours)

---

## Section 1: Introduction to React Hooks (10 minutes)

### What are React Hooks?

**Definition:** Hooks are functions that let you "hook into" React features from functional components.

**Key Points:**
- Introduced in React 16.8 (February 2019)
- Allow state and lifecycle features in functional components
- No need for class components anymore
- Simpler, more readable code

**Most Common Hooks:**
- `useState` - Manage component state
- `useEffect` - Handle side effects
- `useContext` - Access React context
- `useRef` - Reference DOM elements
- `useMemo` - Memoize expensive calculations
- `useCallback` - Memoize callback functions

**Rules of Hooks:**
1. Only call hooks at the top level (not inside loops, conditions, or nested functions)
2. Only call hooks from React functional components or custom hooks

---

## Section 2: useState Hook Fundamentals (40 minutes)

### What is State?

**State** is data that changes over time in your component.

```javascript
// Without state - value doesn't persist
function Counter() {
    let count = 0;  // Resets to 0 on every render

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => count++}>Increment</button>
            {/* This won't work - component doesn't re-render */}
        </div>
    );
}

// With state - value persists and triggers re-render
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            {/* This works! Component re-renders with new value */}
        </div>
    );
}
```

---

### useState Syntax

```javascript
import { useState } from 'react';

function MyComponent() {
    // Syntax: const [stateValue, setterFunction] = useState(initialValue);
    const [count, setCount] = useState(0);

    // count - current state value
    // setCount - function to update the state
    // 0 - initial value

    return <div>{count}</div>;
}
```

**Key Concepts:**
- Array destructuring syntax
- State variable is read-only (never modify directly)
- Setter function triggers re-render
- Initial value is only used on first render

---

### Basic State Updates

```javascript
function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);  // Update state
    }

    function decrement() {
        setCount(count - 1);
    }

    function reset() {
        setCount(0);  // Reset to initial value
    }

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
```

---

### State with Different Data Types

**String State:**
```javascript
function NameInput() {
    const [name, setName] = useState('');

    return (
        <div>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p>Hello, {name}!</p>
        </div>
    );
}
```

**Boolean State:**
```javascript
function Toggle() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div>
            <p>The light is {isOn ? 'ON' : 'OFF'}</p>
            <button onClick={() => setIsOn(!isOn)}>
                Toggle
            </button>
        </div>
    );
}
```

**Array State:**
```javascript
function TodoList() {
    const [todos, setTodos] = useState(['Learn React', 'Build Project']);

    function addTodo() {
        setTodos([...todos, 'New Todo']);  // Spread operator
    }

    return (
        <div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
}
```

---

### State with Objects

```javascript
function UserProfile() {
    const [user, setUser] = useState({
        name: 'Alice',
        age: 25,
        email: 'alice@example.com'
    });

    function updateName(newName) {
        setUser({
            ...user,           // Copy existing properties
            name: newName      // Update only name
        });
    }

    function incrementAge() {
        setUser({
            ...user,
            age: user.age + 1
        });
    }

    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => updateName('Bob')}>Change Name</button>
            <button onClick={incrementAge}>Birthday!</button>
        </div>
    );
}
```

**Important:** Always create a new object/array - don't mutate the existing one!

---

### Functional State Updates

**Problem with Direct Updates:**
```javascript
function Counter() {
    const [count, setCount] = useState(0);

    function incrementThreeTimes() {
        setCount(count + 1);  // count = 0, sets to 1
        setCount(count + 1);  // count still 0, sets to 1
        setCount(count + 1);  // count still 0, sets to 1
        // Result: count = 1 (not 3!)
    }

    return <button onClick={incrementThreeTimes}>+3</button>;
}
```

**Solution - Functional Updates:**
```javascript
function Counter() {
    const [count, setCount] = useState(0);

    function incrementThreeTimes() {
        setCount((prev) => prev + 1);  // prev = 0, returns 1
        setCount((prev) => prev + 1);  // prev = 1, returns 2
        setCount((prev) => prev + 1);  // prev = 2, returns 3
        // Result: count = 3 ✓
    }

    return <button onClick={incrementThreeTimes}>+3</button>;
}
```

**When to use functional updates:**
- When new state depends on previous state
- When updating state multiple times
- When state updates might batch

---

### Multiple State Variables

```javascript
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        console.log({ email, password, rememberMe });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <label>
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}
```

---

## Section 3: Event Handling in React (30 minutes)

### React Event System

**Synthetic Events:**
- React wraps browser events in SyntheticEvent
- Cross-browser compatible
- Same interface as native events

```javascript
function EventExample() {
    function handleClick(event) {
        console.log('Event type:', event.type);
        console.log('Target:', event.target);
        console.log('Current target:', event.currentTarget);
    }

    return <button onClick={handleClick}>Click me</button>;
}
```

---

### Common Event Types

**onClick:**
```javascript
function ButtonExample() {
    return (
        <div>
            <button onClick={() => alert('Clicked!')}>
                Click me
            </button>
            <div onClick={() => console.log('Div clicked')}>
                Clickable Div
            </div>
        </div>
    );
}
```

**onChange:**
```javascript
function InputExample() {
    const [text, setText] = useState('');

    return (
        <input
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
    );
}
```

**onSubmit:**
```javascript
function FormExample() {
    function handleSubmit(e) {
        e.preventDefault();  // Prevent page reload
        console.log('Form submitted!');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" />
            <button type="submit">Submit</button>
        </form>
    );
}
```

---

### Event Handler Patterns

**Inline Arrow Functions:**
```javascript
<button onClick={() => console.log('Clicked')}>Click</button>
```

**Function References:**
```javascript
function handleClick() {
    console.log('Clicked');
}

<button onClick={handleClick}>Click</button>  {/* No () */}
```

**Passing Parameters:**
```javascript
function handleDelete(id) {
    console.log('Delete item:', id);
}

// ❌ WRONG
<button onClick={handleDelete(123)}>Delete</button>  {/* Calls immediately */}

// ✅ CORRECT
<button onClick={() => handleDelete(123)}>Delete</button>
```

---

### Controlled Components (Forms)

**Input Field:**
```javascript
function ControlledInput() {
    const [value, setValue] = useState('');

    return (
        <input
            value={value}                              // Value from state
            onChange={(e) => setValue(e.target.value)}  // Update state
        />
    );
}
```

**Complete Form Example:**
```javascript
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value  // Computed property name
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Submitted:', formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
            />
            <button type="submit">Send</button>
        </form>
    );
}
```

---

## Section 4: useEffect Hook Deep Dive (50 minutes)

### What are Side Effects?

**Side effects** are operations that interact with the outside world:
- Fetching data from APIs
- Setting up timers or intervals
- Subscribing to events
- Manipulating the DOM directly
- Logging to console

```javascript
import { useEffect } from 'react';

function Example() {
    useEffect(() => {
        // Side effect code here
        document.title = 'Hello React!';
    });

    return <div>Check the page title!</div>;
}
```

---

### useEffect Syntax

```javascript
useEffect(() => {
    // Effect code (runs after render)

    return () => {
        // Cleanup code (optional)
    };
}, [dependencies]);  // Dependency array
```

**Three Parts:**
1. **Effect function** - Code to run
2. **Cleanup function** - Optional cleanup (return function)
3. **Dependency array** - When to run the effect

---

### Dependency Array Patterns

**No Dependency Array - Runs After Every Render:**
```javascript
useEffect(() => {
    console.log('Runs after EVERY render');
});
```

**Empty Array - Runs Once on Mount:**
```javascript
useEffect(() => {
    console.log('Runs ONCE when component mounts');
}, []);  // Empty array
```

**With Dependencies - Runs When Dependencies Change:**
```javascript
const [count, setCount] = useState(0);

useEffect(() => {
    console.log('Runs when count changes');
    document.title = `Count: ${count}`;
}, [count]);  // Only re-run if count changes
```

---

### useEffect Examples

**1. Update Document Title:**
```javascript
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}
```

**2. Fetching Data:**
```javascript
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`https://api.example.com/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            });
    }, [userId]);  // Re-fetch when userId changes

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}
```

---

### Cleanup Functions

**Why Cleanup?**
- Prevent memory leaks
- Cancel subscriptions
- Clear timers
- Remove event listeners

**Timer Example:**
```javascript
function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // Set up timer
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        // Cleanup function
        return () => {
            clearInterval(interval);  // Clear timer when component unmounts
        };
    }, []);  // Empty array - run once

    return <p>Seconds: {seconds}</p>;
}
```

**Event Listener Example:**
```javascript
function WindowSize() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup - remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <p>Window width: {width}px</p>;
}
```

---

### Common useEffect Patterns

**Pattern 1: Run Once on Mount**
```javascript
useEffect(() => {
    console.log('Component mounted');
    // Fetch initial data, set up subscriptions, etc.
}, []);
```

**Pattern 2: Run on State Change**
```javascript
useEffect(() => {
    console.log('Search term changed:', searchTerm);
    // Perform search, update results
}, [searchTerm]);
```

**Pattern 3: Cleanup on Unmount**
```javascript
useEffect(() => {
    const subscription = subscribeToData();

    return () => {
        subscription.unsubscribe();  // Cleanup
    };
}, []);
```

**Pattern 4: Multiple Dependencies**
```javascript
useEffect(() => {
    console.log('User or filter changed');
    // Re-fetch data when either changes
}, [userId, filter]);
```

---

### Async Operations in useEffect

**❌ WRONG - Can't make useEffect async:**
```javascript
useEffect(async () => {  // ❌ Error!
    const data = await fetchData();
}, []);
```

**✅ CORRECT - Define async function inside:**
```javascript
useEffect(() => {
    async function fetchData() {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        setData(data);
    }

    fetchData();
}, []);
```

**✅ CORRECT - Using IIFE:**
```javascript
useEffect(() => {
    (async () => {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        setData(data);
    })();
}, []);
```

---

### Avoiding Infinite Loops

**❌ WRONG - Missing Dependency:**
```javascript
function BadExample() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1);  // Infinite loop!
    });  // Runs after every render, which triggers re-render

    return <p>{count}</p>;
}
```

**❌ WRONG - Object in Dependency:**
```javascript
function BadExample() {
    const [data, setData] = useState({ count: 0 });

    useEffect(() => {
        setData({ count: 0 });  // Creates new object
    }, [data]);  // data changes every time - infinite loop!
}
```

**✅ CORRECT - Proper Dependencies:**
```javascript
function GoodExample() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Only runs once on mount
        console.log('Component mounted');
    }, []);

    return <p>{count}</p>;
}
```

---

## Section 5: Component Lifecycle with Hooks (20 minutes)

### Lifecycle Phases

**Class Component Lifecycle:**
1. Mounting (component created)
2. Updating (state/props change)
3. Unmounting (component removed)

**Functional Component with Hooks:**
- All handled with `useEffect`

---

### Lifecycle Equivalents

**componentDidMount:**
```javascript
// Class component
componentDidMount() {
    console.log('Component mounted');
}

// Functional component
useEffect(() => {
    console.log('Component mounted');
}, []);  // Empty array = mount only
```

**componentDidUpdate:**
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

**componentWillUnmount:**
```javascript
// Class component
componentWillUnmount() {
    clearInterval(this.timer);
}

// Functional component
useEffect(() => {
    const timer = setInterval(() => {}, 1000);

    return () => {
        clearInterval(timer);  // Cleanup on unmount
    };
}, []);
```

---

### Complete Lifecycle Example

```javascript
function LifecycleDemo({ userId }) {
    const [user, setUser] = useState(null);

    // Mount
    useEffect(() => {
        console.log('Component mounted');
    }, []);

    // Update (when userId changes)
    useEffect(() => {
        console.log('Fetching user:', userId);

        fetch(`https://api.example.com/users/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data));
    }, [userId]);

    // Unmount
    useEffect(() => {
        return () => {
            console.log('Component will unmount');
        };
    }, []);

    return user ? <div>{user.name}</div> : <p>Loading...</p>;
}
```

---

## Section 6: Practical Examples (30 minutes)

### Example 1: Todo List

```javascript
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    function addTodo() {
        if (input.trim()) {
            setTodos([
                ...todos,
                { id: Date.now(), text: input, completed: false }
            ]);
            setInput('');
        }
    }

    function toggleTodo(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }

    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Add todo..."
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        {todo.text}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

---

### Example 2: Stopwatch Timer

```javascript
function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

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
    }

    function formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor((milliseconds % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }

    return (
        <div>
            <h1>Stopwatch</h1>
            <h2>{formatTime(time)}</h2>
            <button onClick={start} disabled={isRunning}>Start</button>
            <button onClick={stop} disabled={!isRunning}>Stop</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
```

---

### Example 3: Data Fetching with Loading

```javascript
function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Users</h1>
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
```

---

## Best Practices & Common Mistakes

### ✅ Do's:

1. **Use functional updates when state depends on previous state**
   ```javascript
   setCount(prev => prev + 1);
   ```

2. **Keep effects focused and single-purpose**
   ```javascript
   // Good - separate effects
   useEffect(() => { /* fetch data */ }, [userId]);
   useEffect(() => { /* update title */ }, [count]);
   ```

3. **Always include all dependencies**
   ```javascript
   useEffect(() => {
       doSomething(userId, filter);
   }, [userId, filter]);  // Include all used variables
   ```

4. **Clean up side effects**
   ```javascript
   useEffect(() => {
       const timer = setInterval(() => {}, 1000);
       return () => clearInterval(timer);
   }, []);
   ```

---

### ❌ Don'ts:

1. **Don't mutate state directly**
   ```javascript
   // ❌ WRONG
   user.name = 'Bob';
   setUser(user);

   // ✅ CORRECT
   setUser({ ...user, name: 'Bob' });
   ```

2. **Don't call hooks conditionally**
   ```javascript
   // ❌ WRONG
   if (condition) {
       const [state, setState] = useState(0);
   }

   // ✅ CORRECT
   const [state, setState] = useState(0);
   if (condition) {
       setState(newValue);
   }
   ```

3. **Don't forget cleanup**
   ```javascript
   // ❌ WRONG - memory leak
   useEffect(() => {
       setInterval(() => {}, 1000);
   }, []);

   // ✅ CORRECT
   useEffect(() => {
       const timer = setInterval(() => {}, 1000);
       return () => clearInterval(timer);
   }, []);
   ```

---

## Key Takeaways

### useState:
- Manages component state
- Returns [value, setter]
- Triggers re-render on update
- Use functional updates for dependent state

### useEffect:
- Handles side effects
- Runs after render
- Dependency array controls when it runs
- Return cleanup function

### Event Handling:
- Use camelCase (onClick, onChange)
- Pass function reference or arrow function
- Access event with parameter
- Prevent default with `e.preventDefault()`

### Best Practices:
- Don't mutate state directly
- Include all dependencies
- Clean up side effects
- Keep components focused

---

## Resources

- [useState Hook](https://react.dev/reference/react/useState)
- [useEffect Hook](https://react.dev/reference/react/useEffect)
- [React Hooks Reference](https://react.dev/reference/react)
- [Handling Events](https://react.dev/learn/responding-to-events)

---

## Questions?

Next class: **React Router & Advanced Form Handling**
