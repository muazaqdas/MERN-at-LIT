# Class 8: DOM Manipulation

**Duration:** 2.5 hours teaching + 30 minutes assessment  
**Total:** 3 hours

## Learning Objectives
By the end of this class, students will be able to:
- Select DOM elements using various methods
- Modify element content, attributes, and styles
- Create and remove elements dynamically
- Traverse the DOM tree effectively
- Build interactive web page features

## Topics Covered

### 1. Understanding the DOM (25 minutes)
- What is the DOM (Document Object Model)
- DOM tree structure and node types
- Document object as entry point
- Browser rendering process
- DOM vs HTML source code
- Developer tools for DOM inspection
- Performance considerations in DOM manipulation

### 2. Selecting DOM Elements (45 minutes)
- Traditional selection methods:
  - `getElementById()` for unique elements
  - `getElementsByClassName()` for class-based selection
  - `getElementsByTagName()` for element type selection
- Modern query methods:
  - `querySelector()` for single element selection
  - `querySelectorAll()` for multiple element selection
  - CSS selector syntax in queries
- NodeList vs HTMLCollection differences
- Converting NodeLists to arrays
- Performance comparison of selection methods
- Best practices for element selection

### 3. Modifying Element Content and Attributes (50 minutes)
- Content manipulation:
  - `textContent` vs `innerHTML`
  - Security considerations with innerHTML
  - `innerText` and whitespace handling
- Attribute manipulation:
  - `getAttribute()` and `setAttribute()`
  - `removeAttribute()` for cleanup
  - Data attributes (`data-*`)
  - Boolean attributes (checked, disabled, etc.)
- Property vs attribute differences
- Form element properties:
  - `value`, `checked`, `selected`
  - Form validation properties
- Working with classes:
  - `className` property
  - `classList` methods: add, remove, toggle, contains

### 4. Creating and Removing Elements (40 minutes)
- Creating new elements:
  - `createElement()` method
  - Setting properties and content
  - `createTextNode()` for text content
- Adding elements to the DOM:
  - `appendChild()` method
  - `insertBefore()` for positioning
  - `prepend()`, `append()`, `before()`, `after()` methods
- Removing elements:
  - `removeChild()` method
  - `remove()` method (modern approach)
  - Cleaning up event listeners
- Cloning elements: `cloneNode()`
- Document fragments for performance

### 5. DOM Traversal (20 minutes)
- Parent-child relationships:
  - `parentNode` and `parentElement`
  - `childNodes` vs `children`
  - `firstChild`, `lastChild`, `firstElementChild`, `lastElementChild`
- Sibling relationships:
  - `nextSibling`, `previousSibling`
  - `nextElementSibling`, `previousElementSibling`
- Traversal best practices and performance
- Finding elements relative to current element

## Assignment/Test (30 minutes)
**Practical Assessment:**
1. Build a dynamic todo list with add/remove functionality
2. Create an image gallery with dynamic content loading
3. Implement a form validator that shows/hides error messages
4. Build a simple accordion component using DOM manipulation
5. Create a table that allows row addition and deletion

**Quiz Topics:**
- DOM selection methods and their use cases
- Content vs attribute manipulation
- Element creation and insertion techniques
- DOM traversal methods and relationships

## Resources
- [DOM Introduction - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [Element Selection - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [DOM Manipulation - MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
- [DOM Performance Tips](https://developers.google.com/web/fundamentals/performance/rendering/)

## Prerequisites for Next Class
- Solid JavaScript fundamentals
- Understanding of HTML structure
- Basic CSS knowledge for styling

## Next Class Preview
Class 9 will focus on DOM events and user interaction, covering event handling, event delegation, and creating responsive user interfaces.