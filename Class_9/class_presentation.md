# Class 9: DOM Events & Interaction
## Presentation Notes

---

## Section 1: Event Fundamentals (20 minutes)

### What are Events?
Events are **actions or occurrences** that happen in the browser that JavaScript can detect and respond to.

**Event-Driven Programming:** Program flow is determined by events (user actions, browser actions, etc.)

---

### Common Event Types

#### Mouse Events
```javascript
// click - most common mouse event
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
});

// mouseover - when mouse enters element
element.addEventListener('mouseover', function(event) {
    event.target.style.backgroundColor = 'lightblue';
});

// mouseout - when mouse leaves element
element.addEventListener('mouseout', function(event) {
    event.target.style.backgroundColor = '';
});
```

---

#### Keyboard Events
```javascript
// keydown - when key is pressed
input.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);

    // Detect Enter key
    if (event.key === 'Enter') {
        submitForm();
    }
});

// Check modifier keys
document.addEventListener('keydown', function(event) {
    console.log('Ctrl:', event.ctrlKey);
    console.log('Shift:', event.shiftKey);
    console.log('Alt:', event.altKey);
});
```

---

#### Form Events
```javascript
// submit - when form is submitted
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    // Handle form data
});

// input - fires immediately as user types
input.addEventListener('input', function(event) {
    console.log('Current value:', event.target.value);
});

// change - fires when value changes and loses focus
select.addEventListener('change', function(event) {
    console.log('Selected:', event.target.value);
});

// focus - element receives focus
input.addEventListener('focus', function(event) {
    event.target.style.borderColor = 'blue';
});

// blur - element loses focus
input.addEventListener('blur', function(event) {
    validateField(event.target);
});
```

---

#### Window Events
```javascript
// DOMContentLoaded - DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready');
    initializeApp();
});

// resize - window is resized
window.addEventListener('resize', function() {
    console.log('Window size:', window.innerWidth, window.innerHeight);
});

// scroll - page is scrolled
window.addEventListener('scroll', function() {
    console.log('Scroll position:', window.scrollY);
});
```

---

### The Event Object
Every event handler receives an **event object** with useful properties:

```javascript
element.addEventListener('click', function(event) {
    // Which element triggered the event
    console.log('Target:', event.target);

    // Element the listener is attached to
    console.log('Current target:', event.currentTarget);

    // Type of event
    console.log('Event type:', event.type);

    // Mouse position
    console.log('X:', event.clientX, 'Y:', event.clientY);
});
```

---

### preventDefault()
Stops the **default browser behavior** for an event:

```javascript
// Prevent form submission (page reload)
form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Custom form handling
});

// Prevent link navigation
link.addEventListener('click', function(event) {
    event.preventDefault();
    // Custom navigation
});

// Prevent context menu
element.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    // Show custom context menu
});
```

---

### stopPropagation()
Prevents the event from **bubbling up** to parent elements:

```javascript
childElement.addEventListener('click', function(event) {
    event.stopPropagation();
    console.log('Child clicked - parents will not be notified');
});

parentElement.addEventListener('click', function() {
    console.log('This will NOT fire if child was clicked');
});
```

---

## Section 2: Event Handling Methods (25 minutes)

### addEventListener() - THE RIGHT WAY

**Syntax:**
```javascript
element.addEventListener(eventType, handlerFunction, options);
```

**Basic Usage:**
```javascript
const button = document.querySelector('#myButton');

// With anonymous function
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
});

// With arrow function
button.addEventListener('click', (event) => {
    console.log('Arrow function handler');
});

// With named function (can be removed later)
function handleClick(event) {
    console.log('Named function handler');
}
button.addEventListener('click', handleClick);
```

---

### Multiple Event Listeners
You can add **multiple listeners** to the same element/event:

```javascript
button.addEventListener('click', function() {
    console.log('First handler');
});

button.addEventListener('click', function() {
    console.log('Second handler');
});

button.addEventListener('click', function() {
    console.log('Third handler');
});

// All three execute in order when button is clicked
```

---

### Event Listener Options

```javascript
// once - listener runs only once, then removed
button.addEventListener('click', function() {
    console.log('This runs only once');
}, { once: true });

// passive - improves scroll performance
window.addEventListener('scroll', function() {
    console.log('Scrolling...');
}, { passive: true });

// capture - use capture phase instead of bubble
element.addEventListener('click', function() {
    console.log('Capture phase');
}, { capture: true });
```

---

### removeEventListener()
Remove an event listener when no longer needed:

```javascript
// Must use same function reference
function handleClick(event) {
    console.log('Clicked!');
}

// Add listener
button.addEventListener('click', handleClick);

// Remove listener
button.removeEventListener('click', handleClick);

// ❌ WRONG - This won't work
button.addEventListener('click', function() { console.log('Hi'); });
button.removeEventListener('click', function() { console.log('Hi'); });
// Different function references!
```

---

### Event Delegation
Attach **one listener to a parent** to handle events from multiple children:

**Benefits:**
- Better performance (fewer listeners)
- Works with dynamically added elements
- Less memory usage
- Easier to manage

---

#### Without Delegation - Inefficient
```javascript
// BAD: Add listener to each button
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('Button clicked');
    });
});
// Problem: Doesn't work for buttons added later
```

---

#### With Delegation - Efficient
```javascript
// GOOD: One listener on parent
const container = document.querySelector('.button-container');

container.addEventListener('click', function(event) {
    // Check if clicked element is a button
    if (event.target.classList.contains('button')) {
        console.log('Button clicked:', event.target.textContent);
    }
});

// Works for buttons added later!
```

---

#### Advanced Delegation Example
```javascript
// Handle multiple element types
document.querySelector('.todo-list').addEventListener('click', function(event) {

    // Delete button clicked
    if (event.target.classList.contains('delete-btn')) {
        const todo = event.target.closest('.todo-item');
        todo.remove();
    }

    // Edit button clicked
    else if (event.target.classList.contains('edit-btn')) {
        const todo = event.target.closest('.todo-item');
        enableEditing(todo);
    }

    // Checkbox clicked
    else if (event.target.type === 'checkbox') {
        const todo = event.target.closest('.todo-item');
        todo.classList.toggle('completed');
    }
});
```

---

## Section 3: Event Bubbling and Capturing (15 minutes)

### Event Propagation Phases

Events travel through the DOM in **3 phases**:

1. **Capture Phase** (top-down): window → document → target
2. **Target Phase**: Event reaches the target element
3. **Bubble Phase** (bottom-up): target → document → window

---

### Event Bubbling Example

```html
<div id="outer">
  <div id="middle">
    <div id="inner">Click me</div>
  </div>
</div>
```

```javascript
const outer = document.querySelector('#outer');
const middle = document.querySelector('#middle');
const inner = document.querySelector('#inner');

outer.addEventListener('click', () => console.log('Outer'));
middle.addEventListener('click', () => console.log('Middle'));
inner.addEventListener('click', () => console.log('Inner'));

// Clicking inner logs:
// "Inner"
// "Middle"
// "Outer"
```

The event **bubbles up** from inner to outer!

---

### Stopping Propagation

```javascript
inner.addEventListener('click', function(event) {
    event.stopPropagation();
    console.log('Inner clicked - bubbling stopped');
});

middle.addEventListener('click', function() {
    console.log('This will NOT run');
});

outer.addEventListener('click', function() {
    console.log('This will NOT run either');
});
```

---

### When to Use Event Delegation

**Use delegation for:**
- Lists with many items
- Dynamically added content
- Tables with many rows
- Any repeated elements

**Example: Efficient table handling**
```javascript
// One listener for entire table
const table = document.querySelector('#data-table');

table.addEventListener('click', function(event) {
    const row = event.target.closest('tr');

    if (!row || !table.contains(row)) return;

    // Handle different clicks
    if (event.target.classList.contains('edit-btn')) {
        editRow(row);
    } else if (event.target.classList.contains('delete-btn')) {
        deleteRow(row);
    } else {
        selectRow(row);
    }
});
```

---

## Section 4: Form Events and Validation (20 minutes)

### Basic Form Handling

```javascript
const form = document.querySelector('#myForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // ⚠️ Always prevent default!

    // Get form data - Method 1
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Get form data - Method 2
    const username = form.querySelector('#username').value;
    const email = form.querySelector('#email').value;

    // Validate
    if (validateForm(data)) {
        submitData(data);
    }
});
```

---

### Real-Time Input Validation

```javascript
const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#email-error');

emailInput.addEventListener('input', function(event) {
    const email = event.target.value;

    if (email === '') {
        emailError.textContent = '';
        return;
    }

    if (!isValidEmail(email)) {
        emailError.textContent = 'Please enter a valid email';
        emailInput.classList.add('invalid');
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

---

### Focus and Blur Events

```javascript
const input = document.querySelector('#username');

// Show help on focus
input.addEventListener('focus', function(event) {
    document.querySelector('#help-text').style.display = 'block';
    event.target.style.borderColor = '#007bff';
});

// Validate on blur (when user leaves field)
input.addEventListener('blur', function(event) {
    document.querySelector('#help-text').style.display = 'none';
    event.target.style.borderColor = '';

    const value = event.target.value.trim();

    if (value === '') {
        showError('Username is required');
    } else if (value.length < 3) {
        showError('Username must be at least 3 characters');
    } else {
        clearError();
    }
});
```

---

### Complete Validation Example

```javascript
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    clearAllErrors();
    let isValid = true;

    // Validate username
    if (username === '') {
        showFieldError('username', 'Username is required');
        isValid = false;
    } else if (username.length < 3) {
        showFieldError('username', 'Username must be at least 3 characters');
        isValid = false;
    }

    // Validate email
    if (email === '') {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Invalid email address');
        isValid = false;
    }

    // Validate password
    if (password === '') {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 8) {
        showFieldError('password', 'Password must be at least 8 characters');
        isValid = false;
    }

    // Confirm password
    if (password !== confirmPassword) {
        showFieldError('confirm-password', 'Passwords do not match');
        isValid = false;
    }

    if (isValid) {
        console.log('Form is valid! Submitting...');
        // submitForm();
    }
});
```

---

### Different Form Field Types

```javascript
// Checkboxes
checkbox.addEventListener('change', function(event) {
    console.log('Checked:', event.target.checked);

    if (event.target.checked) {
        enableSubmitButton();
    }
});

// Radio buttons
radioButtons.forEach(radio => {
    radio.addEventListener('change', function(event) {
        if (event.target.checked) {
            console.log('Selected:', event.target.value);
        }
    });
});

// Select dropdowns
select.addEventListener('change', function(event) {
    console.log('Selected:', event.target.value);
});

// File inputs
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file.size > 5000000) {
        alert('File too large (max 5MB)');
        event.target.value = '';
    }
});
```

---

## Section 5: Interactive UI Components (10 minutes)

### Dropdown Menu

```javascript
const dropdown = document.querySelector('.dropdown');
const dropdownBtn = dropdown.querySelector('.dropdown-btn');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');

// Toggle on click
dropdownBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle('show');
});

// Close when clicking outside
document.addEventListener('click', function() {
    dropdownMenu.classList.remove('show');
});

// Close on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        dropdownMenu.classList.remove('show');
    }
});
```

---

### Modal Dialog

```javascript
const modal = document.querySelector('#modal');
const overlay = document.querySelector('#overlay');
const openBtn = document.querySelector('#open-modal');
const closeBtn = document.querySelector('#close-modal');

function openModal() {
    modal.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    modal.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Close on Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});
```

---

### Tab Interface

```javascript
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Remove active from all
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active to clicked
        button.classList.add('active');
        tabPanels[index].classList.add('active');
    });
});
```

---

### Performance Tips

```javascript
// Debouncing - wait until user stops typing
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage: Search as user types
const searchInput = document.querySelector('#search');
const debouncedSearch = debounce(function(event) {
    performSearch(event.target.value);
}, 300);

searchInput.addEventListener('input', debouncedSearch);

// Throttling - limit execution frequency
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage: Scroll handler
const throttledScroll = throttle(function() {
    updateScrollIndicator();
}, 100);

window.addEventListener('scroll', throttledScroll);
```

---

## Key Takeaways

### ✅ Always Remember:
1. Use `addEventListener()` - never inline handlers
2. Always `preventDefault()` on form submit
3. Use event delegation for lists and dynamic content
4. Events bubble up by default
5. Clean up listeners with `removeEventListener()`

### 🎯 Common Patterns:
- Form validation: `input` event for real-time, `blur` for final check
- Modals: Close on Escape and overlay click
- Dropdowns: Close on outside click
- Performance: Debounce input, throttle scroll/resize

### 🚫 Common Mistakes:
- Forgetting `preventDefault()` on forms
- Using anonymous functions (can't remove them)
- Not using event delegation for lists
- Stopping propagation unnecessarily
- Attaching too many listeners

---

## Practice Challenge

**Build a Todo App with:**
1. Add todo on form submit (prevent default)
2. Mark complete on checkbox change
3. Delete todo on button click (use delegation!)
4. Real-time search filter (use input event)
5. Keyboard shortcuts (Ctrl+Enter to add)

**Time: 20-30 minutes**

---

## Questions?

Next class: **Asynchronous JavaScript**
- Callbacks
- Promises
- Async/Await
- API calls
