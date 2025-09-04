# Class 13: React State & Hooks

**Duration:** 2.5 hours teaching + 30 minutes assessment  
**Total:** 3 hours

## Learning Objectives
By the end of this class, students will be able to:
- Manage component state using the useState hook
- Handle side effects with the useEffect hook
- Create interactive React components
- Understand component lifecycle in functional components
- Implement event handling in React applications

## Topics Covered

### 1. useState Hook Fundamentals (50 minutes)
- Introduction to React Hooks
- What is state and why it's important
- `useState` hook syntax and usage:
  - Importing useState from React
  - State initialization and default values
  - State getter and setter destructuring
- State updates:
  - Updating primitive values
  - Functional state updates
  - State immutability principles
  - Updating objects and arrays in state
- Multiple state variables:
  - When to use single vs multiple useState calls
  - State organization strategies
  - Complex state management patterns

### 2. Event Handling in React (40 minutes)
- React event system (SyntheticEvents)
- Event handler naming conventions
- Common event types:
  - onClick for buttons and elements
  - onChange for form inputs
  - onSubmit for forms
  - onFocus and onBlur for input fields
- Passing parameters to event handlers:
  - Using arrow functions
  - Event object and target properties
- Form handling with controlled components:
  - Input value binding to state
  - Handling different input types
  - Form submission and validation

### 3. useEffect Hook Deep Dive (60 minutes)
- Understanding side effects in React
- `useEffect` hook syntax and usage:
  - Basic useEffect with dependency array
  - Effect cleanup and return functions
  - Dependencies and when effects run
- Common useEffect patterns:
  - Component mounting effects (empty dependency)
  - State-dependent effects
  - Cleanup operations (timers, subscriptions)
  - Conditional effects
- useEffect for data fetching:
  - API calls in useEffect
  - Loading states and error handling
  - Async operations in effects
- Performance optimization:
  - Dependency array best practices
  - Avoiding infinite loops
  - Effect cleanup for performance

### 4. Component Lifecycle with Hooks (30 minutes)
- Functional component lifecycle equivalent:
  - Mount, update, unmount phases
  - Replacing class lifecycle methods
- Common lifecycle patterns:
  - `componentDidMount` with useEffect
  - `componentDidUpdate` patterns
  - `componentWillUnmount` cleanup
- Best practices for lifecycle management
- Debugging hooks with React DevTools
- Custom hooks introduction (basic concept)

### 5. Practical State Management Examples (30 minutes)
- Building interactive components:
  - Counter with increment/decrement
  - Toggle components (show/hide content)
  - Form with validation states
  - Shopping cart functionality
  - Todo list with add/remove features
- State lifting and sharing between components
- Common state management patterns and anti-patterns

## Assignment/Test (30 minutes)
**Practical Assessment:**
1. Build an interactive counter with multiple operations
2. Create a form with real-time validation using state
3. Implement a todo list with add, delete, and toggle functionality
4. Build a simple timer application with start/stop/reset
5. Create a component that fetches and displays data from an API

**Quiz Topics:**
- useState hook syntax and state updates
- Event handling in React components
- useEffect hook and dependency arrays
- Component lifecycle with hooks
- Best practices for state management

## Resources
- [useState Hook - React Docs](https://react.dev/reference/react/useState)
- [useEffect Hook - React Docs](https://react.dev/reference/react/useEffect)
- [React Hooks Overview](https://react.dev/reference/react)
- [Handling Events - React Docs](https://react.dev/learn/responding-to-events)

## Prerequisites for Next Class
- Understanding of React components and JSX
- Familiarity with JavaScript functions and closures
- Basic understanding of asynchronous JavaScript

## Next Class Preview
Class 14 will cover React Router for creating multi-page applications and advanced form handling techniques for complex user interfaces.