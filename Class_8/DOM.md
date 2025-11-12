# Class 8: DOM Manipulation - Complete Teaching Guide

## 1. Understanding the DOM (25 minutes)

### What is the DOM?
The Document Object Model (DOM) is a programming interface that represents the structure of HTML and XML documents as a tree of objects. It allows JavaScript to access and manipulate the content, structure, and styling of web pages dynamically.

### DOM Tree Structure
```
Document
└── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── h1
        ├── div
        │   ├── p
        │   └── span
        └── script
```

### Key Concepts:
- **Nodes**: Everything in the DOM is a node (elements, text, attributes, comments)
- **Element Nodes**: HTML tags (`<div>`, `<p>`, etc.)
- **Text Nodes**: The actual text content
- **Attribute Nodes**: Element attributes (id, class, src, etc.)

### Example: DOM vs HTML Source
```html
<!-- HTML Source -->
<div id="container">
    <p class="text">Hello World</p>
</div>

<!-- DOM Representation -->
Element: div (id="container")
└── Element: p (class="text")
    └── Text: "Hello World"
```

### Performance Considerations:
- DOM operations are expensive
- Batch DOM modifications when possible
- Use document fragments for multiple insertions
- Cache DOM element references

---

## 2. Selecting DOM Elements (45 minutes)

### Traditional Selection Methods

#### getElementById()
```javascript
// Select element by unique ID
const header = document.getElementById('main-header');
console.log(header); // Returns single element or null

// Example HTML: <h1 id="main-header">Welcome</h1>
```

#### getElementsByClassName()
```javascript
// Select elements by class name
const buttons = document.getElementsByClassName('btn');
console.log(buttons); // Returns HTMLCollection (live)

// Access individual elements
const firstButton = buttons[0];
const lastButton = buttons[buttons.length - 1];

// Example HTML: <button class="btn">Click me</button>
```

#### getElementsByTagName()
```javascript
// Select elements by tag name
const paragraphs = document.getElementsByTagName('p');
const allDivs = document.getElementsByTagName('div');

// Select all elements
const allElements = document.getElementsByTagName('*');
```

### Modern Query Methods

#### querySelector()
```javascript
// Select first matching element using CSS selector
const firstButton = document.querySelector('.btn');
const specificDiv = document.querySelector('div#content');
const nestedParagraph = document.querySelector('.container p.highlight');

// Advanced selectors
const checkedInput = document.querySelector('input[type="checkbox"]:checked');
const lastChild = document.querySelector('.list-item:last-child');
```

#### querySelectorAll()
```javascript
// Select all matching elements
const allButtons = document.querySelectorAll('.btn');
const allLinks = document.querySelectorAll('a[href^="https"]');

// Returns NodeList (static snapshot)
console.log(allButtons.length);

// Convert to array for array methods
const buttonsArray = Array.from(allButtons);
const buttonsSpread = [...allButtons];
```

### Practical Examples

#### Complete Selection Demo
```javascript
// HTML setup for examples
/*
<div id="app">
    <header class="main-header">
        <h1 class="title">My Website</h1>
        <nav>
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link">About</a>
            <a href="#" class="nav-link">Contact</a>
        </nav>
    </header>
    <main class="content">
        <article class="post featured">
            <h2>Featured Post</h2>
            <p class="excerpt">This is a featured post...</p>
        </article>
        <article class="post">
            <h2>Regular Post</h2>
            <p class="excerpt">This is a regular post...</p>
        </article>
    </main>
</div>
*/

// Different selection methods
const app = document.getElementById('app');
const header = document.querySelector('.main-header');
const allNavLinks = document.querySelectorAll('.nav-link');
const posts = document.getElementsByClassName('post');
const featuredPost = document.querySelector('.post.featured');
```

### Performance Comparison
```javascript
// Fastest: getElementById (optimized by browsers)
const fast = document.getElementById('myId');

// Fast: querySelector for simple selectors
const good = document.querySelector('#myId');

// Slower: Complex selectors
const slower = document.querySelector('div.container > p:nth-child(2)');

// Cache references for reuse
const cachedElement = document.getElementById('frequent-element');
// Use cachedElement multiple times instead of re-querying
```

---

## 3. Modifying Element Content and Attributes (50 minutes)

### Content Manipulation

#### textContent vs innerHTML vs innerText
```javascript
const div = document.querySelector('#content');

// textContent: Gets/sets text content, ignores HTML tags
div.textContent = 'This is <strong>plain text</strong>';
// Result: "This is <strong>plain text</strong>" (literal text)

// innerHTML: Gets/sets HTML content, parses HTML tags
div.innerHTML = 'This is <strong>bold text</strong>';
// Result: "This is **bold text**" (rendered HTML)

// innerText: Like textContent but respects styling (hidden elements)
div.style.display = 'none';
console.log(div.textContent); // Still returns content
console.log(div.innerText);   // Returns empty string
```

#### Security with innerHTML
```javascript
// DANGEROUS - Can lead to XSS attacks
const userInput = '<img src="x" onerror="alert(\'XSS Attack\')">';
div.innerHTML = userInput; // Executes malicious code

// SAFE - Use textContent for user-generated content
div.textContent = userInput; // Displays as text, doesn't execute

// SAFE - Sanitize HTML before using innerHTML
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}
```

### Attribute Manipulation

#### getAttribute() and setAttribute()
```javascript
const link = document.querySelector('a');

// Get attributes
const href = link.getAttribute('href');
const title = link.getAttribute('title');
const customData = link.getAttribute('data-category');

// Set attributes
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');
link.setAttribute('data-clicked', 'false');

// Remove attributes
link.removeAttribute('title');

// Check if attribute exists
if (link.hasAttribute('data-category')) {
    console.log('Category attribute exists');
}
```

#### Data Attributes
```javascript
// HTML: <div id="product" data-price="29.99" data-category="electronics">
const product = document.getElementById('product');

// Access data attributes
const price = product.getAttribute('data-price');
const category = product.dataset.category; // Modern approach

// Set data attributes
product.dataset.inStock = 'true';
product.dataset.discountPercent = '15';

// Convert data attribute values
const numericPrice = parseFloat(product.dataset.price);
const isInStock = product.dataset.inStock === 'true';
```

#### Boolean Attributes
```javascript
const checkbox = document.querySelector('input[type="checkbox"]');
const button = document.querySelector('button');

// Boolean attributes (present = true, absent = false)
checkbox.setAttribute('checked', ''); // Checked
checkbox.removeAttribute('checked');  // Unchecked

button.setAttribute('disabled', '');  // Disabled
button.removeAttribute('disabled');   // Enabled

// Better approach using properties
checkbox.checked = true;  // Check the box
button.disabled = false;  // Enable the button
```

### Property vs Attribute Differences
```javascript
const input = document.querySelector('input[type="text"]');

// Set initial value in HTML
input.setAttribute('value', 'initial');

// User types "hello" in the input
console.log(input.getAttribute('value')); // "initial" (HTML attribute)
console.log(input.value);                 // "hello" (current property)

// Properties reflect current state, attributes show initial values
```

### Working with Classes

#### className Property
```javascript
const element = document.querySelector('.box');

// Get all classes as string
console.log(element.className); // "box red large"

// Set classes (overwrites existing)
element.className = 'box blue small';

// Add class (manual string manipulation)
element.className += ' highlighted';
```

#### classList Methods (Recommended)
```javascript
const element = document.querySelector('.box');

// Add classes
element.classList.add('active');
element.classList.add('highlighted', 'important'); // Multiple classes

// Remove classes
element.classList.remove('old-style');
element.classList.remove('red', 'large'); // Multiple classes

// Toggle class
element.classList.toggle('hidden'); // Add if absent, remove if present
element.classList.toggle('active', true); // Force add
element.classList.toggle('active', false); // Force remove

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}

// Replace class
element.classList.replace('old-class', 'new-class');

// Get number of classes
console.log(element.classList.length);

// Iterate through classes
element.classList.forEach(className => console.log(className));
```

### Form Element Properties
```javascript
// Text input
const textInput = document.querySelector('input[type="text"]');
textInput.value = 'New value';
console.log(textInput.value);

// Checkbox
const checkbox = document.querySelector('input[type="checkbox"]');
checkbox.checked = true;
console.log(checkbox.checked); // true or false

// Select dropdown
const select = document.querySelector('select');
select.selectedIndex = 2; // Select third option
console.log(select.value); // Selected option's value

// Radio buttons
const radioButtons = document.querySelectorAll('input[name="option"]');
radioButtons[1].checked = true; // Select second radio button

// Textarea
const textarea = document.querySelector('textarea');
textarea.value = 'Multi-line\ntext content';
```

### Practical Example: Dynamic Form Validator
```javascript
function createFormValidator() {
    const form = document.querySelector('#registration-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const submitButton = document.querySelector('#submit');
    
    function validateField(input, validator) {
        const isValid = validator(input.value);
        
        if (isValid) {
            input.classList.remove('error');
            input.classList.add('valid');
            input.removeAttribute('aria-invalid');
        } else {
            input.classList.remove('valid');
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
        }
        
        return isValid;
    }
    
    function validateName(name) {
        return name.length >= 2;
    }
    
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function updateSubmitButton() {
        const nameValid = validateField(nameInput, validateName);
        const emailValid = validateField(emailInput, validateEmail);
        
        if (nameValid && emailValid) {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            submitButton.classList.add('ready');
        } else {
            submitButton.disabled = true;
            submitButton.textContent = 'Please complete form';
            submitButton.classList.remove('ready');
        }
    }
    
    nameInput.addEventListener('input', updateSubmitButton);
    emailInput.addEventListener('input', updateSubmitButton);
    
    // Initial validation
    updateSubmitButton();
}
```

---

## 4. Creating and Removing Elements (40 minutes)

### Creating New Elements

#### createElement() Method
```javascript
// Create new elements
const div = document.createElement('div');
const paragraph = document.createElement('p');
const image = document.createElement('img');
const button = document.createElement('button');

// Set properties and attributes
div.id = 'new-container';
div.className = 'container highlight';
div.textContent = 'This is a new div';

paragraph.textContent = 'This is a new paragraph';
paragraph.setAttribute('data-created', Date.now());

image.src = 'https://example.com/image.jpg';
image.alt = 'Example image';
image.width = 300;

button.textContent = 'Click me';
button.type = 'button';
button.disabled = false;
```

#### createTextNode() for Text Content
```javascript
// Create text nodes
const textNode = document.createTextNode('This is pure text');
const div = document.createElement('div');
div.appendChild(textNode);

// Useful when building complex content
const container = document.createElement('div');
container.appendChild(document.createTextNode('Hello '));
const strong = document.createElement('strong');
strong.appendChild(document.createTextNode('World'));
container.appendChild(strong);
container.appendChild(document.createTextNode('!'));
// Result: "Hello <strong>World</strong>!"
```

### Adding Elements to the DOM

#### appendChild() Method
```javascript
const container = document.getElementById('container');
const newParagraph = document.createElement('p');
newParagraph.textContent = 'This paragraph was added dynamically';

// Append to end of container
container.appendChild(newParagraph);

// appendChild moves elements if they already exist in DOM
const existingElement = document.querySelector('.move-me');
container.appendChild(existingElement); // Moves from original location
```

#### insertBefore() for Positioning
```javascript
const container = document.getElementById('container');
const referenceElement = document.querySelector('.reference');
const newElement = document.createElement('div');
newElement.textContent = 'Inserted before reference';

// Insert before reference element
container.insertBefore(newElement, referenceElement);

// Insert at beginning (before first child)
container.insertBefore(newElement, container.firstChild);

// Insert at end (equivalent to appendChild)
container.insertBefore(newElement, null);
```

#### Modern Insertion Methods
```javascript
const container = document.getElementById('container');
const newElement = document.createElement('p');
newElement.textContent = 'Modern insertion';

// Insert at beginning
container.prepend(newElement);

// Insert at end
container.append(newElement);

// Insert multiple elements
const div1 = document.createElement('div');
const div2 = document.createElement('div');
container.append(div1, div2, 'Text node');

// Insert relative to element
const referenceElement = document.querySelector('.reference');
referenceElement.before(newElement); // Before the reference
referenceElement.after(newElement);  // After the reference
```

### Removing Elements

#### removeChild() Method (Traditional)
```javascript
const container = document.getElementById('container');
const elementToRemove = document.querySelector('.remove-me');

// Parent must call removeChild
container.removeChild(elementToRemove);

// If you don't have parent reference
if (elementToRemove.parentNode) {
    elementToRemove.parentNode.removeChild(elementToRemove);
}
```

#### remove() Method (Modern)
```javascript
const elementToRemove = document.querySelector('.remove-me');

// Simpler removal (no parent needed)
elementToRemove.remove();

// Remove multiple elements
const elementsToRemove = document.querySelectorAll('.temp');
elementsToRemove.forEach(element => element.remove());
```

#### Cleaning Up Event Listeners
```javascript
function createAndCleanupElement() {
    const button = document.createElement('button');
    button.textContent = 'Click me';
    
    function handleClick() {
        console.log('Button clicked');
    }
    
    // Add event listener
    button.addEventListener('click', handleClick);
    
    // Add to DOM
    document.body.appendChild(button);
    
    // Later, when removing element
    function cleanup() {
        // Remove event listener before removing element
        button.removeEventListener('click', handleClick);
        button.remove();
    }
    
    // Return cleanup function
    return cleanup;
}

const cleanup = createAndCleanupElement();
// Later...
cleanup(); // Properly removes element and listeners
```

### Cloning Elements

#### cloneNode() Method
```javascript
const original = document.querySelector('.template');

// Shallow clone (element only, no children)
const shallowClone = original.cloneNode(false);

// Deep clone (element and all children)
const deepClone = original.cloneNode(true);

// Clean up cloned element
deepClone.id = 'clone-' + Date.now(); // Give unique ID
deepClone.classList.add('cloned');

// Add to DOM
document.body.appendChild(deepClone);
```

### Document Fragments for Performance

#### Using DocumentFragment
```javascript
// Create fragment (exists in memory, not DOM)
const fragment = document.createDocumentFragment();

// Add multiple elements to fragment
for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = `Item ${i + 1}`;
    div.className = 'list-item';
    fragment.appendChild(div);
}

// Single DOM operation (much faster than 1000 individual appends)
document.getElementById('container').appendChild(fragment);
```

### Practical Example: Dynamic List Builder
```javascript
class ListBuilder {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = [];
    }
    
    addItem(text, type = 'normal') {
        const listItem = document.createElement('li');
        listItem.className = `list-item ${type}`;
        listItem.dataset.id = Date.now();
        
        // Create content
        const content = document.createElement('span');
        content.textContent = text;
        content.className = 'item-text';
        
        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.className = 'remove-btn';
        removeBtn.type = 'button';
        
        // Add click handler for removal
        removeBtn.addEventListener('click', () => {
            this.removeItem(listItem);
        });
        
        // Assemble item
        listItem.appendChild(content);
        listItem.appendChild(removeBtn);
        
        // Add to container
        this.container.appendChild(listItem);
        this.items.push(listItem);
        
        return listItem;
    }
    
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            item.remove();
        }
    }
    
    addMultipleItems(items) {
        const fragment = document.createDocumentFragment();
        
        items.forEach(itemText => {
            const item = this.createItemElement(itemText);
            fragment.appendChild(item);
            this.items.push(item);
        });
        
        this.container.appendChild(fragment);
    }
    
    createItemElement(text) {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.textContent = text;
        return listItem;
    }
    
    clear() {
        this.items.forEach(item => item.remove());
        this.items = [];
    }
    
    getItemCount() {
        return this.items.length;
    }
}

// Usage
const myList = new ListBuilder('my-list');
myList.addItem('First item');
myList.addItem('Important item', 'important');
myList.addMultipleItems(['Item 2', 'Item 3', 'Item 4']);
```

### Complete DOM Manipulation Example
```javascript
// Complete example combining all concepts
function createInteractiveCard(data) {
    // Create card structure
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.cardId = data.id;
    
    const header = document.createElement('div');
    header.className = 'card-header';
    
    const title = document.createElement('h3');
    title.textContent = data.title;
    title.className = 'card-title';
    
    const badge = document.createElement('span');
    badge.textContent = data.status;
    badge.className = `badge status-${data.status.toLowerCase()}`;
    
    const body = document.createElement('div');
    body.className = 'card-body';
    
    const description = document.createElement('p');
    description.textContent = data.description;
    
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'btn btn-primary';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-danger';
    
    // Assemble card
    header.appendChild(title);
    header.appendChild(badge);
    body.appendChild(description);
    footer.appendChild(editBtn);
    footer.appendChild(deleteBtn);
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    
    // Add interactivity
    editBtn.addEventListener('click', () => {
        const newTitle = prompt('Enter new title:', title.textContent);
        if (newTitle) {
            title.textContent = newTitle;
            card.classList.add('modified');
        }
    });
    
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this card?')) {
            card.classList.add('deleting');
            setTimeout(() => card.remove(), 300); // Animate then remove
        }
    });
    
    return card;
}

// Usage
const cardData = {
    id: '1',
    title: 'Sample Card',
    status: 'Active',
    description: 'This is a sample card created dynamically.'
};

const card = createInteractiveCard(cardData);
document.getElementById('cards-container').appendChild(card);
```

---

## Key Takeaways and Best Practices

1. **Performance**: Cache DOM references, use document fragments for bulk operations
2. **Security**: Use `textContent` for user input, sanitize HTML when necessary
3. **Modern Methods**: Prefer `querySelector()`, `classList`, and modern insertion methods
4. **Memory Management**: Clean up event listeners when removing elements
5. **Accessibility**: Set appropriate ARIA attributes and semantic HTML
6. **Error Handling**: Always check if elements exist before manipulating them

## Common Pitfalls to Avoid

1. **Querying elements repeatedly** - Cache references
2. **Using innerHTML with user input** - Security risk
3. **Forgetting to clean up event listeners** - Memory leaks
4. **Not checking if elements exist** - Runtime errors
5. **Inefficient bulk operations** - Use document fragments