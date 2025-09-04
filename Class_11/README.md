# Class 11: API Integration & Fetch

**Duration:** 2.5 hours teaching + 30 minutes assessment  
**Total:** 3 hours

## Learning Objectives
By the end of this class, students will be able to:
- Understand REST APIs and HTTP methods
- Use the Fetch API for HTTP requests
- Work with JSON data effectively
- Handle API responses and errors properly
- Build a complete mini project with API integration

## Topics Covered

### 1. APIs and HTTP Fundamentals (30 minutes)
- What are APIs and why they're important
- REST API principles and conventions
- HTTP methods review:
  - GET for retrieving data
  - POST for creating data
  - PUT/PATCH for updating data
  - DELETE for removing data
- HTTP status codes and their meanings
- Request and response structure
- Headers and their purposes
- API authentication basics (tokens, keys)

### 2. Fetch API Deep Dive (50 minutes)
- `fetch()` function syntax and usage
- Fetch vs XMLHttpRequest
- Making GET requests:
  - Basic fetch syntax
  - Handling responses with `.then()`
  - Converting responses to JSON
- Request configuration object:
  - Method specification
  - Headers configuration
  - Body data for POST/PUT requests
- Response object properties:
  - `ok`, `status`, `statusText`
  - `headers`, `url`
  - Response methods: `json()`, `text()`, `blob()`

### 3. Working with JSON Data (35 minutes)
- JSON format review and syntax
- `JSON.parse()` and `JSON.stringify()` methods
- Handling nested JSON objects
- Array of objects patterns
- Data transformation techniques
- Common JSON parsing errors and debugging
- Sending JSON data in requests:
  - Setting proper content-type headers
  - Formatting request body

### 4. Error Handling in API Calls (35 minutes)
- Network error vs HTTP error distinction
- Using try/catch with async/await
- Handling different types of errors:
  - Network failures
  - 404 Not Found responses
  - 500 Server errors
  - Invalid JSON responses
- User-friendly error messages
- Retry mechanisms and fallback strategies
- Loading states and user feedback

### 5. Mini Project: Weather App (40 minutes)
- Project planning and API selection
- Setting up the HTML structure
- Fetching weather data from public API
- Displaying data dynamically
- Error handling and user feedback
- Styling and user experience improvements
- Code organization and best practices

## Assignment/Test (30 minutes)
**Practical Assessment:**
1. Build a news reader app using a public news API
2. Create a user registration form that posts to a mock API
3. Implement a search feature with API integration
4. Build an image gallery using a photo API
5. Create error handling for various API failure scenarios

**Quiz Topics:**
- HTTP methods and their appropriate use cases
- Fetch API syntax and configuration options
- JSON data handling and manipulation
- Error handling strategies in API calls
- Best practices for API integration

## Popular Free APIs for Practice
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake REST API
- [OpenWeatherMap](https://openweathermap.org/api) - Weather data
- [NewsAPI](https://newsapi.org/) - News headlines
- [Unsplash API](https://unsplash.com/developers) - High-quality photos
- [REST Countries](https://restcountries.com/) - Country information

## Resources
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Using Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Working with JSON - MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
- [HTTP Status Codes](https://httpstatuses.com/)

## Prerequisites for Next Class
- Understanding of asynchronous JavaScript
- Familiarity with Promises and async/await
- Basic knowledge of HTML and DOM manipulation

## Next Class Preview
Class 12 will introduce React fundamentals including JSX syntax, component creation, and the concept of props for building reusable UI components.