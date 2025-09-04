# Class 14: React Router & Forms

**Duration:** 2.5 hours teaching + 30 minutes assessment  
**Total:** 3 hours

## Learning Objectives
By the end of this class, students will be able to:
- Set up React Router for multi-page applications
- Create navigation between different views
- Handle dynamic routes and parameters
- Build complex forms with React
- Implement form validation and submission

## Topics Covered

### 1. React Router Setup and Basics (45 minutes)
- Single Page Application (SPA) concepts
- Installing and setting up React Router
- Router components overview:
  - `BrowserRouter` as the main router
  - `Routes` and `Route` for defining paths
  - Basic routing configuration
- Navigation components:
  - `Link` component for navigation
  - `NavLink` for active link styling
  - Programmatic navigation with `useNavigate`
- Route matching and path patterns
- Default routes and 404 error pages

### 2. Advanced Routing Features (40 minutes)
- Dynamic routes with parameters:
  - Route parameters with `:id` syntax
  - Accessing parameters with `useParams` hook
  - Optional parameters and wildcards
- Nested routing:
  - Parent and child route relationships
  - `Outlet` component for nested content
  - Relative vs absolute paths
- Protected routes and authentication:
  - Conditional rendering based on auth state
  - Redirect patterns for unauthorized access
  - Route guards implementation

### 3. Navigation and URL Management (25 minutes)
- Programmatic navigation patterns:
  - `useNavigate` hook usage
  - Navigation on form submission
  - Conditional navigation logic
- URL search parameters:
  - `useSearchParams` hook
  - Query string handling
  - Filtering and search functionality
- Browser history management:
  - Back/forward button handling
  - History state management

### 4. Advanced Form Handling in React (60 minutes)
- Controlled vs uncontrolled components review
- Complex form patterns:
  - Multi-step forms
  - Dynamic form fields
  - Form arrays and nested objects
- Form validation strategies:
  - Real-time validation with state
  - Custom validation functions
  - Third-party validation libraries (intro)
- Form submission handling:
  - Preventing default submission
  - Data processing and formatting
  - API integration with forms
  - Success and error state management
- Performance optimization:
  - Avoiding unnecessary re-renders
  - Debouncing input validation
  - Form state management patterns

### 5. Practical Implementation (40 minutes)
- Building a multi-page application:
  - Home, About, Contact pages
  - User profile and dashboard pages
  - Navigation menu with active states
- Complex form examples:
  - User registration form
  - Product creation form
  - Survey/questionnaire form
- Integration patterns:
  - Combining routing with form workflows
  - Navigation after form submission
  - URL-based form state

## Assignment/Test (30 minutes)
**Practical Assessment:**
1. Create a multi-page portfolio site with React Router
2. Build a blog application with post detail pages
3. Implement a user dashboard with nested routes
4. Create a multi-step registration form with validation
5. Build a product catalog with filtering via URL parameters

**Quiz Topics:**
- React Router components and their purposes
- Dynamic routing and parameter handling
- Navigation methods and best practices
- Form handling and validation techniques
- Integration of routing and forms

## Resources
- [React Router Documentation](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Form Handling in React](https://react.dev/reference/react-dom/components/form)
- [Controlled Components](https://react.dev/reference/react-dom/components/input)

## Prerequisites for Next Class
- Solid understanding of React components and hooks
- Familiarity with useState and useEffect
- Understanding of JavaScript promises and async operations

## Next Class Preview
Class 15 will focus on building a complete React project that incorporates all learned concepts and deploying it to a live hosting platform.