# Class 9: DOM Events & Interaction - Complete Study Material

## Table of Contents
1. [Event Fundamentals](#1-event-fundamentals)
2. [Event Handling Methods](#2-event-handling-methods)
3. [Event Bubbling and Capturing](#3-event-bubbling-and-capturing)
4. [Form Events and Validation](#4-form-events-and-validation)
5. [Interactive UI Components](#5-interactive-ui-components)
6. [Practice Exercises](#practice-exercises)

---

## 1. Event Fundamentals

### What are Events?

**Definition:** Events are actions or occurrences that happen in the browser that JavaScript can detect and respond to. They form the foundation of interactive web applications.

**Event-Driven Programming:** A programming paradigm where the flow of the program is determined by events such as user actions, sensor outputs, or messages from other programs.

### Common Event Types

#### Mouse Events

```javascript
// click - fires when mouse button is clicked and released
button.addEventListener('click', function(event) {
    console.log('Button was clicked!');
    console.log('Coordinates:', event.clientX, event.clientY);
});

// mousedown - fires when mouse button is pressed
element.addEventListener('mousedown', function(event) {
    console.log('Mouse button pressed');
});

// mouseup - fires when mouse button is released
element.addEventListener('mouseup', function(event) {
    console.log('Mouse button released');
});

// mouseover - fires when mouse enters element (bubbles to children)
element.addEventListener('mouseover', function(event) {
    event.target.style.backgroundColor = 'lightblue';
});

// mouseout - fires when mouse leaves element
element.addEventListener('mouseout', function(event) {
    event.target.style.backgroundColor = '';
});

// mousemove - fires continuously as mouse moves over element
element.addEventListener('mousemove', function(event) {
    console.log('Mouse position:', event.pageX, event.pageY);
});

// dblclick - fires on double click
element.addEventListener('dblclick', function(event) {
    console.log('Double clicked!');
});
```

#### Keyboard Events

```javascript
// keydown - fires when key is pressed down
document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    console.log('Key code:', event.code);
    console.log('Ctrl key:', event.ctrlKey);
    console.log('Shift key:', event.shiftKey);
    console.log('Alt key:', event.altKey);
});

// keyup - fires when key is released
document.addEventListener('keyup', function(event) {
    console.log('Key released:', event.key);
});

// keypress - DEPRECATED, use keydown instead
// Example: Detect Enter key
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed!');
        submitForm();
    }
});

// Example: Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl + S to save
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent browser save dialog
        saveDocument();
    }
});
```

#### Form Events

```javascript
// submit - fires when form is submitted
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    console.log('Form submitted');
    // Handle form data
});

// change - fires when value changes and element loses focus
select.addEventListener('change', function(event) {
    console.log('Selection changed to:', event.target.value);
});

// input - fires immediately when value changes
input.addEventListener('input', function(event) {
    console.log('Current value:', event.target.value);
    // Real-time validation
});

// focus - fires when element receives focus
input.addEventListener('focus', function(event) {
    event.target.style.borderColor = 'blue';
});

// blur - fires when element loses focus
input.addEventListener('blur', function(event) {
    event.target.style.borderColor = '';
    // Validate field
});

// reset - fires when form is reset
form.addEventListener('reset', function(event) {
    console.log('Form reset');
});
```

#### Window Events

```javascript
// load - fires when entire page has loaded
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    initializeApp();
});

// DOMContentLoaded - fires when DOM is ready (faster than load)
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is ready');
    setupEventListeners();
});

// resize - fires when window is resized
window.addEventListener('resize', function(event) {
    console.log('Window size:', window.innerWidth, window.innerHeight);
    adjustLayout();
});

// scroll - fires when page is scrolled
window.addEventListener('scroll', function(event) {
    console.log('Scroll position:', window.scrollY);
    // Implement lazy loading, sticky headers, etc.
});

// beforeunload - fires before page is unloaded
window.addEventListener('beforeunload', function(event) {
    // Show confirmation dialog
    event.preventDefault();
    event.returnValue = '';
});
```

### The Event Object

Every event handler receives an event object with useful properties and methods:

```javascript
element.addEventListener('click', function(event) {
    // Target - element that triggered the event
    console.log('Target:', event.target);

    // Current target - element the listener is attached to
    console.log('Current target:', event.currentTarget);

    // Type of event
    console.log('Event type:', event.type);

    // Mouse position
    console.log('Client X/Y:', event.clientX, event.clientY); // relative to viewport
    console.log('Page X/Y:', event.pageX, event.pageY); // relative to document
    console.log('Screen X/Y:', event.screenX, event.screenY); // relative to screen

    // Keyboard modifiers
    console.log('Ctrl:', event.ctrlKey);
    console.log('Shift:', event.shiftKey);
    console.log('Alt:', event.altKey);

    // Timestamp
    console.log('Timestamp:', event.timeStamp);
});
```

### preventDefault()

Stops the default browser behavior for an event:

```javascript
// Prevent form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Custom form handling
});

// Prevent link navigation
link.addEventListener('click', function(event) {
    event.preventDefault();
    // Custom navigation logic
});

// Prevent context menu
element.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    // Show custom context menu
});

// Prevent text selection
element.addEventListener('mousedown', function(event) {
    event.preventDefault();
    // Custom drag behavior
});
```

### stopPropagation()

Prevents the event from bubbling up or capturing down:

```javascript
// Stop event from reaching parent elements
childElement.addEventListener('click', function(event) {
    event.stopPropagation();
    console.log('Child clicked, parent will not be notified');
});

parentElement.addEventListener('click', function(event) {
    console.log('This will not fire if child was clicked');
});

// stopImmediatePropagation - also stops other listeners on same element
button.addEventListener('click', function(event) {
    event.stopImmediatePropagation();
    console.log('First listener - others will not fire');
});

button.addEventListener('click', function(event) {
    console.log('This will not execute');
});
```

### Event Timing and Performance

```javascript
// Debouncing - delay execution until user stops typing
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage
const searchInput = document.querySelector('#search');
const debouncedSearch = debounce(function(event) {
    console.log('Searching for:', event.target.value);
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

// Usage
const throttledScroll = throttle(function() {
    console.log('Scroll position:', window.scrollY);
    updateScrollIndicator();
}, 100);

window.addEventListener('scroll', throttledScroll);
```

---

## 2. Event Handling Methods

### Inline Event Handlers (NOT RECOMMENDED)

```html
<!-- BAD: Mixing HTML and JavaScript -->
<button onclick="handleClick()">Click Me</button>
<button onclick="alert('Clicked!')">Alert</button>

<script>
function handleClick() {
    console.log('Button clicked');
}
</script>
```

**Why avoid?**
- Mixes HTML and JavaScript (violates separation of concerns)
- Only one handler per event
- Difficult to maintain
- Creates global functions
- Poor performance with many elements

### addEventListener() Method

**Syntax:**
```javascript
element.addEventListener(eventType, handlerFunction, options);
```

**Basic Usage:**

```javascript
const button = document.querySelector('#myButton');

// Simple event listener
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
});

// With arrow function
button.addEventListener('click', (event) => {
    console.log('Arrow function handler');
});

// With named function
function handleClick(event) {
    console.log('Named function handler');
}
button.addEventListener('click', handleClick);
```

### Multiple Event Listeners

```javascript
const button = document.querySelector('#myButton');

// Add multiple listeners to same element/event
button.addEventListener('click', function() {
    console.log('First handler');
});

button.addEventListener('click', function() {
    console.log('Second handler');
});

button.addEventListener('click', function() {
    console.log('Third handler');
});

// All three will execute in order
```

### Options Parameter

```javascript
// once - listener is removed after first invocation
button.addEventListener('click', function() {
    console.log('This runs only once');
}, { once: true });

// passive - indicates handler won't call preventDefault()
// Improves scroll performance
window.addEventListener('scroll', function() {
    console.log('Scrolling...');
}, { passive: true });

// capture - use capture phase instead of bubble phase
element.addEventListener('click', function() {
    console.log('Capture phase');
}, { capture: true });

// Combined options
element.addEventListener('click', function() {
    console.log('Once, passive, capture');
}, {
    once: true,
    passive: true,
    capture: true
});
```

### removeEventListener()

```javascript
// Must use same function reference to remove
function handleClick(event) {
    console.log('Clicked!');
}

// Add listener
button.addEventListener('click', handleClick);

// Remove listener
button.removeEventListener('click', handleClick);

// WRONG - This won't work (different function reference)
button.addEventListener('click', function() {
    console.log('Clicked!');
});
button.removeEventListener('click', function() {
    console.log('Clicked!');
});

// Removing with capture option
button.addEventListener('click', handleClick, { capture: true });
button.removeEventListener('click', handleClick, { capture: true });
```

### Event Handler Functions

#### Anonymous Functions

```javascript
// Cannot be removed later
button.addEventListener('click', function(event) {
    console.log('Anonymous function');
});
```

#### Named Functions

```javascript
// Can be reused and removed
function handleClick(event) {
    console.log('Named function');
}

button1.addEventListener('click', handleClick);
button2.addEventListener('click', handleClick);

// Can be removed
button1.removeEventListener('click', handleClick);
```

#### Arrow Functions and `this` Context

```javascript
const obj = {
    name: 'MyObject',

    // Regular function - 'this' refers to obj
    setupRegular: function() {
        button.addEventListener('click', function(event) {
            console.log(this.name); // undefined (this is button)
        });
    },

    // Arrow function - 'this' refers to obj
    setupArrow: function() {
        button.addEventListener('click', (event) => {
            console.log(this.name); // 'MyObject'
        });
    },

    // Binding 'this'
    setupBind: function() {
        button.addEventListener('click', function(event) {
            console.log(this.name); // 'MyObject'
        }.bind(this));
    }
};
```

### Event Delegation

**Concept:** Attach a single event listener to a parent element to handle events from multiple children.

**Benefits:**
- Better performance (fewer event listeners)
- Works with dynamically added elements
- Less memory usage
- Easier to manage

**Basic Implementation:**

```javascript
// WITHOUT delegation - inefficient
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('Button clicked');
    });
});

// WITH delegation - efficient
const container = document.querySelector('.button-container');
container.addEventListener('click', function(event) {
    // Check if clicked element is a button
    if (event.target.classList.contains('button')) {
        console.log('Button clicked');
    }
});
```

**Advanced Delegation:**

```javascript
// Handle multiple element types
document.querySelector('.todo-list').addEventListener('click', function(event) {
    // Delete button
    if (event.target.classList.contains('delete-btn')) {
        const todoItem = event.target.closest('.todo-item');
        todoItem.remove();
    }

    // Edit button
    else if (event.target.classList.contains('edit-btn')) {
        const todoItem = event.target.closest('.todo-item');
        enableEditing(todoItem);
    }

    // Checkbox
    else if (event.target.type === 'checkbox') {
        const todoItem = event.target.closest('.todo-item');
        todoItem.classList.toggle('completed');
    }
});

// Handling dynamically added elements
const list = document.querySelector('#dynamic-list');

// This works even for items added later!
list.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        console.log('List item clicked:', event.target.textContent);
    }
});

// Add new items dynamically
function addItem(text) {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
    // Event delegation automatically handles this new item!
}
```

**Using closest() for Delegation:**

```javascript
document.body.addEventListener('click', function(event) {
    // Find nearest parent with specific selector
    const card = event.target.closest('.card');

    if (card) {
        console.log('Card clicked:', card);
    }
});
```

---

## 3. Event Bubbling and Capturing

### Event Propagation Phases

Events in the DOM go through three phases:

1. **Capture Phase** (top-down): From window → document → target
2. **Target Phase**: Event reaches the target element
3. **Bubble Phase** (bottom-up): From target → document → window

```javascript
// HTML structure:
// <div id="outer">
//   <div id="middle">
//     <div id="inner">Click me</div>
//   </div>
// </div>

const outer = document.querySelector('#outer');
const middle = document.querySelector('#middle');
const inner = document.querySelector('#inner');

// Bubble phase (default)
outer.addEventListener('click', () => console.log('Outer clicked'));
middle.addEventListener('click', () => console.log('Middle clicked'));
inner.addEventListener('click', () => console.log('Inner clicked'));

// Clicking inner will log:
// "Inner clicked"
// "Middle clicked"
// "Outer clicked"

// Capture phase
outer.addEventListener('click', () => console.log('Outer capture'), true);
middle.addEventListener('click', () => console.log('Middle capture'), true);
inner.addEventListener('click', () => console.log('Inner capture'), true);

// Clicking inner will now log:
// "Outer capture"
// "Middle capture"
// "Inner capture"
// "Inner clicked"
// "Middle clicked"
// "Outer clicked"
```

### Controlling Propagation

```javascript
// Stop bubbling
inner.addEventListener('click', function(event) {
    event.stopPropagation();
    console.log('Inner clicked - bubbling stopped');
});
// Middle and outer listeners will not fire

// Stop immediate propagation
button.addEventListener('click', function(event) {
    event.stopImmediatePropagation();
    console.log('First listener');
});

button.addEventListener('click', function(event) {
    console.log('This will not run');
});

// Check if propagation was stopped
element.addEventListener('click', function(event) {
    if (event.cancelBubble) {
        console.log('Propagation was stopped');
    }
});
```

### Use Cases for Capture vs Bubble

**Capture Phase:**
- Intercept events before they reach target
- Implement global event handlers
- Add logging/debugging
- Security checks

```javascript
// Global click interceptor
document.addEventListener('click', function(event) {
    console.log('Click detected anywhere on page');
    logAnalytics(event);
}, true); // Capture phase
```

**Bubble Phase:**
- Event delegation (most common)
- Handle events after target processes them
- Default behavior for most events

### Event Delegation with Propagation

```javascript
// Efficient table row handling
const table = document.querySelector('#data-table');

table.addEventListener('click', function(event) {
    // Find which row was clicked
    const row = event.target.closest('tr');

    if (!row || !table.contains(row)) return;

    // Handle different click targets within row
    if (event.target.classList.contains('edit-btn')) {
        editRow(row);
    } else if (event.target.classList.contains('delete-btn')) {
        deleteRow(row);
    } else {
        selectRow(row);
    }
});
```

### Performance Benefits

```javascript
// BAD: 1000 event listeners
const items = document.querySelectorAll('.list-item'); // 1000 items
items.forEach(item => {
    item.addEventListener('click', handleClick);
});

// GOOD: 1 event listener
const list = document.querySelector('.list');
list.addEventListener('click', function(event) {
    if (event.target.classList.contains('list-item')) {
        handleClick(event);
    }
});
```

### Common Pitfalls

```javascript
// Pitfall 1: Assuming event.target is the element you want
document.querySelector('.card').addEventListener('click', function(event) {
    // event.target might be child element (icon, text, etc.)
    console.log(event.target); // Could be anything inside card

    // Solution: use currentTarget or closest()
    console.log(event.currentTarget); // Always the .card element
    const card = event.target.closest('.card');
});

// Pitfall 2: Stopping propagation unnecessarily
button.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents delegation from working!
    // Now parent listeners won't fire
});

// Pitfall 3: Memory leaks with removed elements
const element = document.querySelector('#temp');
element.addEventListener('click', handleClick);
element.remove(); // Element removed but listener still in memory

// Solution: Remove listener before removing element
element.removeEventListener('click', handleClick);
element.remove();
```

---

## 4. Form Events and Validation

### Form Submission Handling

```javascript
const form = document.querySelector('#myForm');

// Basic form handling
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page reload

    // Get form data
    const formData = new FormData(form);

    // Process data
    const data = Object.fromEntries(formData);
    console.log('Form data:', data);

    // Validate
    if (validateForm(data)) {
        // Submit via AJAX or process data
        submitData(data);
    }
});

// Alternative: Get data manually
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        username: form.querySelector('#username').value,
        email: form.querySelector('#email').value,
        password: form.querySelector('#password').value
    };

    console.log(data);
});
```

### Real-Time Input Validation

```javascript
const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#email-error');

// Validate as user types
emailInput.addEventListener('input', function(event) {
    const email = event.target.value;

    if (email === '') {
        showError(emailError, '');
        return;
    }

    if (!isValidEmail(email)) {
        showError(emailError, 'Please enter a valid email');
        emailInput.classList.add('invalid');
    } else {
        showError(emailError, '');
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
    }
});

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = message ? 'block' : 'none';
}
```

### Focus and Blur Events

```javascript
const input = document.querySelector('#username');

// Show help text on focus
input.addEventListener('focus', function(event) {
    const helpText = document.querySelector('#username-help');
    helpText.style.display = 'block';
    event.target.style.borderColor = '#007bff';
});

// Validate on blur
input.addEventListener('blur', function(event) {
    const helpText = document.querySelector('#username-help');
    helpText.style.display = 'none';
    event.target.style.borderColor = '';

    // Validate the field
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

### Complete Form Validation Example

```javascript
const registrationForm = document.querySelector('#registration-form');

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get all form fields
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;
    const terms = document.querySelector('#terms').checked;

    // Clear previous errors
    clearAllErrors();

    let isValid = true;

    // Validate username
    if (username === '') {
        showFieldError('username', 'Username is required');
        isValid = false;
    } else if (username.length < 3) {
        showFieldError('username', 'Username must be at least 3 characters');
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        showFieldError('username', 'Username can only contain letters, numbers, and underscores');
        isValid = false;
    }

    // Validate email
    if (email === '') {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (password === '') {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 8) {
        showFieldError('password', 'Password must be at least 8 characters');
        isValid = false;
    } else if (!/[A-Z]/.test(password)) {
        showFieldError('password', 'Password must contain at least one uppercase letter');
        isValid = false;
    } else if (!/[a-z]/.test(password)) {
        showFieldError('password', 'Password must contain at least one lowercase letter');
        isValid = false;
    } else if (!/[0-9]/.test(password)) {
        showFieldError('password', 'Password must contain at least one number');
        isValid = false;
    }

    // Validate confirm password
    if (confirmPassword === '') {
        showFieldError('confirm-password', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showFieldError('confirm-password', 'Passwords do not match');
        isValid = false;
    }

    // Validate terms checkbox
    if (!terms) {
        showFieldError('terms', 'You must accept the terms and conditions');
        isValid = false;
    }

    // If all valid, submit
    if (isValid) {
        console.log('Form is valid! Submitting...');
        // submitForm();
    } else {
        console.log('Form has errors');
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(fieldId, message) {
    const field = document.querySelector(`#${fieldId}`);
    const errorElement = document.querySelector(`#${fieldId}-error`);

    field.classList.add('invalid');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearAllErrors() {
    document.querySelectorAll('.invalid').forEach(field => {
        field.classList.remove('invalid');
    });
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}
```

### Form Field Types

```javascript
// Text inputs
const textInput = document.querySelector('#text-input');
textInput.addEventListener('input', function(event) {
    console.log('Current value:', event.target.value);
});

// Checkboxes
const checkbox = document.querySelector('#agree');
checkbox.addEventListener('change', function(event) {
    console.log('Checked:', event.target.checked);

    if (event.target.checked) {
        enableSubmitButton();
    } else {
        disableSubmitButton();
    }
});

// Radio buttons
const radioButtons = document.querySelectorAll('input[name="gender"]');
radioButtons.forEach(radio => {
    radio.addEventListener('change', function(event) {
        if (event.target.checked) {
            console.log('Selected:', event.target.value);
        }
    });
});

// Select dropdowns
const select = document.querySelector('#country');
select.addEventListener('change', function(event) {
    console.log('Selected country:', event.target.value);
    loadStates(event.target.value);
});

// File inputs
const fileInput = document.querySelector('#file-upload');
fileInput.addEventListener('change', function(event) {
    const files = event.target.files;

    for (let file of files) {
        console.log('File name:', file.name);
        console.log('File size:', file.size);
        console.log('File type:', file.type);

        // Validate file
        if (file.size > 5000000) {
            alert('File is too large (max 5MB)');
            event.target.value = ''; // Clear input
            return;
        }

        // Preview image
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.querySelector('#preview');
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
});

// Textarea with character counter
const textarea = document.querySelector('#message');
const counter = document.querySelector('#char-counter');
const maxLength = 500;

textarea.addEventListener('input', function(event) {
    const length = event.target.value.length;
    counter.textContent = `${length}/${maxLength}`;

    if (length > maxLength) {
        counter.style.color = 'red';
        textarea.classList.add('invalid');
    } else {
        counter.style.color = '';
        textarea.classList.remove('invalid');
    }
});
```

### Accessibility Considerations

```javascript
// Keyboard navigation
form.addEventListener('keydown', function(event) {
    // Submit on Ctrl+Enter in textarea
    if (event.ctrlKey && event.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
});

// Screen reader announcements
function announceError(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'alert');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 3000);
}

// Focus management
function showError(fieldId, message) {
    const field = document.querySelector(`#${fieldId}`);
    showFieldError(fieldId, message);

    // Set aria-invalid
    field.setAttribute('aria-invalid', 'true');

    // Focus the field
    field.focus();
}

// Label association
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    if (!input.id || !document.querySelector(`label[for="${input.id}"]`)) {
        console.warn('Input without associated label:', input);
    }
});
```

---

## 5. Interactive UI Components

### Dropdown Menus

```javascript
// Simple dropdown
const dropdown = document.querySelector('.dropdown');
const dropdownBtn = dropdown.querySelector('.dropdown-btn');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');

dropdownBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});

// Close on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        dropdownMenu.classList.remove('show');
    }
});

// Handle menu item selection
dropdownMenu.addEventListener('click', function(event) {
    if (event.target.classList.contains('dropdown-item')) {
        dropdownBtn.textContent = event.target.textContent;
        dropdownMenu.classList.remove('show');
        console.log('Selected:', event.target.textContent);
    }
});
```

### Modal Dialogs

```javascript
const modal = document.querySelector('#modal');
const modalOverlay = document.querySelector('#modal-overlay');
const openModalBtn = document.querySelector('#open-modal');
const closeModalBtn = document.querySelector('#close-modal');

function openModal() {
    modal.classList.add('show');
    modalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Focus first input in modal
    const firstInput = modal.querySelector('input, button, textarea');
    if (firstInput) firstInput.focus();
}

function closeModal() {
    modal.classList.remove('show');
    modalOverlay.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Close on overlay click
modalOverlay.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Trap focus inside modal
modal.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
            'button, input, textarea, select, a[href]'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});
```

### Image Carousel

```javascript
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.slides = element.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.autoPlayInterval = null;

        this.setupControls();
        this.setupIndicators();
        this.showSlide(0);
        this.startAutoPlay();
    }

    setupControls() {
        const prevBtn = this.carousel.querySelector('.prev');
        const nextBtn = this.carousel.querySelector('.next');

        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());

        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    setupIndicators() {
        const indicators = this.carousel.querySelector('.indicators');

        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('indicator');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goTo(index));
            indicators.appendChild(dot);
        });
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));

        // Update indicators
        const indicators = this.carousel.querySelectorAll('.indicator');
        indicators.forEach(ind => ind.classList.remove('active'));

        // Show current slide
        this.slides[index].classList.add('active');
        indicators[index].classList.add('active');
        this.currentIndex = index;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(nextIndex);
        this.resetAutoPlay();
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
        this.resetAutoPlay();
    }

    goTo(index) {
        this.showSlide(index);
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Initialize carousel
const carousel = new Carousel(document.querySelector('.carousel'));
```

### Tab Interface

```javascript
const tabContainer = document.querySelector('.tabs');
const tabButtons = tabContainer.querySelectorAll('.tab-button');
const tabPanels = tabContainer.querySelectorAll('.tab-panel');

// Handle tab clicks
tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        activateTab(index);
    });

    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
        let newIndex = index;

        if (e.key === 'ArrowRight') {
            newIndex = (index + 1) % tabButtons.length;
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            e.preventDefault();
        } else if (e.key === 'Home') {
            newIndex = 0;
            e.preventDefault();
        } else if (e.key === 'End') {
            newIndex = tabButtons.length - 1;
            e.preventDefault();
        }

        if (newIndex !== index) {
            activateTab(newIndex);
            tabButtons[newIndex].focus();
        }
    });
});

function activateTab(index) {
    // Remove active class from all
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
    });

    tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('hidden', '');
    });

    // Add active class to selected
    tabButtons[index].classList.add('active');
    tabButtons[index].setAttribute('aria-selected', 'true');
    tabButtons[index].setAttribute('tabindex', '0');

    tabPanels[index].classList.add('active');
    tabPanels[index].removeAttribute('hidden');
}
```

### Performance Optimization

```javascript
// Lazy loading images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('Resize finished');
        adjustLayout();
    }, 250);
});

// Throttled scroll handler
let lastScrollTime = 0;
window.addEventListener('scroll', function() {
    const now = Date.now();
    if (now - lastScrollTime > 100) {
        lastScrollTime = now;
        updateScrollIndicator();
    }
});
```

### User Experience Best Practices

```javascript
// Loading states
function submitForm(formData) {
    const submitBtn = document.querySelector('#submit-btn');

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    submitBtn.classList.add('loading');

    // Simulate API call
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        submitBtn.classList.remove('loading');

        showSuccessMessage('Form submitted successfully!');
    }, 2000);
}

// Success/error notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Confirm before destructive actions
function deleteItem(itemId) {
    const confirmed = confirm('Are you sure you want to delete this item?');

    if (confirmed) {
        // Proceed with deletion
        console.log('Deleting item:', itemId);
    }
}

// Auto-save functionality
let saveTimeout;
const editor = document.querySelector('#editor');

editor.addEventListener('input', function() {
    clearTimeout(saveTimeout);

    // Show saving indicator
    showStatus('Unsaved changes...');

    saveTimeout = setTimeout(() => {
        saveDocument();
        showStatus('All changes saved');
    }, 2000);
});
```

---

## Practice Exercises

### Exercise 1: Dynamic Form Validation
Create a registration form with real-time validation for:
- Username (3-20 characters, alphanumeric)
- Email (valid email format)
- Password (min 8 chars, uppercase, lowercase, number)
- Confirm password (must match)

### Exercise 2: Image Gallery
Build an interactive image gallery with:
- Click to view full size
- Keyboard navigation (arrow keys)
- Close on Escape
- Thumbnail grid

### Exercise 3: Modal Dialog System
Create a reusable modal system that:
- Opens on button click
- Closes on overlay click or Escape
- Traps focus inside modal
- Prevents body scrolling when open

### Exercise 4: Searchable Table
Build a table with:
- Search filter (real-time)
- Column sorting (click headers)
- Row selection (checkboxes)
- Delete selected rows

### Exercise 5: Interactive Navigation
Create a responsive navigation menu with:
- Dropdown submenus
- Mobile hamburger menu
- Keyboard accessibility
- Close on outside click

---

## Additional Resources

- [MDN: Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [JavaScript.info: Event Bubbling](https://javascript.info/bubbling-and-capturing)
- [Web.dev: Form Validation](https://web.dev/learn/forms/validation/)
- [A11y: ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
