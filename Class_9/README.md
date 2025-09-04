# Class 9: DOM Events & Interaction

**Duration:** 2.5 hours teaching + 30 minutes assessment  
**Total:** 3 hours

## Learning Objectives
By the end of this class, students will be able to:
- Handle various types of DOM events effectively
- Implement event delegation for dynamic content
- Understand event bubbling and capturing
- Create interactive form validation
- Build responsive user interfaces with JavaScript

## Topics Covered

### 1. Event Fundamentals (35 minutes)
- What are events and event-driven programming
- Common event types:
  - Mouse events: click, mousedown, mouseup, mouseover, mouseout
  - Keyboard events: keydown, keyup, keypress
  - Form events: submit, change, input, focus, blur
  - Window events: load, resize, scroll
- Event object properties and methods
- `preventDefault()` to stop default behavior
- `stopPropagation()` to control event flow
- Event timing and performance considerations

### 2. Event Handling Methods (40 minutes)
- Inline event handlers (not recommended)
- `addEventListener()` method:
  - Syntax and parameters
  - Multiple event listeners
  - Options parameter (once, passive, capture)
- `removeEventListener()` for cleanup
- Event handler functions:
  - Anonymous functions
  - Named functions
  - Arrow functions and `this` context
- Event delegation:
  - Concept and benefits
  - Implementing delegation with parent elements
  - Dynamic content handling

### 3. Event Bubbling and Capturing (30 minutes)
- Event propagation phases:
  - Capture phase (top-down)
  - Target phase
  - Bubble phase (bottom-up)
- Controlling propagation direction
- Use cases for capture vs bubble
- Event delegation implementation
- Performance benefits of delegation
- Common pitfalls and solutions

### 4. Form Events and Validation (45 minutes)
- Form submission handling:
  - Preventing default submission
  - Data validation before submission
  - Custom submission logic
- Input validation:
  - Real-time validation with input events
  - Focus and blur events for user experience
  - Custom validation messages
- Form field types and their events:
  - Text inputs and validation patterns
  - Checkboxes and radio buttons
  - Select dropdowns and change events
  - File inputs and file handling
- Accessibility considerations in form handling

### 5. Interactive UI Components (20 minutes)
- Building common interactive elements:
  - Dropdown menus
  - Modal dialogs
  - Image carousels
  - Tab interfaces
- Keyboard navigation support
- Touch/mobile event considerations
- Performance optimization for interactive elements
- User experience best practices

## Assignment/Test (30 minutes)
**Practical Assessment:**
1. Create a dynamic form with real-time validation
2. Build an interactive image gallery with keyboard navigation
3. Implement a modal dialog system with proper event handling
4. Create a searchable and sortable table using events
5. Build a responsive navigation menu with dropdown functionality

**Quiz Topics:**
- Event types and their appropriate use cases
- Event delegation benefits and implementation
- Event propagation and control methods
- Form validation techniques
- Best practices for interactive UI elements

## Resources
- [DOM Events - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event)
- [Event Handling - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/Events)
- [Form Validation - MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [Event Delegation](https://javascript.info/event-delegation)

## Prerequisites for Next Class
- DOM manipulation skills
- Understanding of HTML forms and elements
- Basic JavaScript functions and control flow

## Next Class Preview
Class 10 will cover asynchronous JavaScript including callbacks, promises, and async/await for handling time-dependent operations and API calls.