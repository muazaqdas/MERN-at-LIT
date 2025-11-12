// --- Topic: Functions Deep Dive ---

// 1. Function Declaration vs. Function Expression

// Function Declaration: Can be called before it is defined (hoisting).
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Works fine.

// Function Expression: Stored in a variable. Cannot be called before it's defined.
const sayGoodbye = function(name) {
  return `Goodbye, ${name}.`;
};
console.log(sayGoodbye("Bob")); // Works fine.

// 2. Arrow Functions
// A more concise syntax for writing functions.
const multiply = (a, b) => a * b;
console.log(`3 * 5 = ${multiply(3, 5)}`);

// Arrow function with multiple lines of code and a return statement
const getFullName = (firstName, lastName) => {
  const fullName = `${firstName} ${lastName}`;
  return fullName;
};
console.log(getFullName("John", "Doe"));

// 3. Parameters and Arguments
function calculateArea(width, height) { // width and height are parameters
  return width * height;
}
let area = calculateArea(10, 5); // 10 and 5 are arguments
console.log(`Area of a rectangle: ${area}`);

// 4. Default Parameters
// Assign a default value if an argument is not provided.
function welcomeUser(user = "Guest") {
  return `Welcome, ${user}!`;
}
console.log(welcomeUser("Alice"));
console.log(welcomeUser()); // Uses the default value "Guest"

// 5. Rest Parameters (...args)
// Gathers all remaining arguments into an array.
function sumAll(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sumAll(1, 2, 3)); // Returns 6
console.log(sumAll(10, 20, 30, 40)); // Returns 100

// 6. Function Scope and Local Variables
function shoppingList() {
  const item1 = "Milk"; // 'item1' is a local variable, only accessible inside this function.
  let item2 = "Bread";
  console.log(`Inside the function: ${item1}, ${item2}`);
}
shoppingList();
// console.log(item1); // This would cause an error, item1 is not defined in the global scope.

// 7. Anonymous Functions and Callbacks
// A function without a name. Often used as arguments to other functions.
document.querySelector("#myButton").addEventListener("click", function() {
  // This is an anonymous function, called when the button is clicked.
  console.log("Button was clicked!");
});

// A "callback" is a function passed as an argument to another function.
function processInput(callback) {
  const name = "Alice";
  callback(name);
}
processInput(function(name) {
  console.log(`Processing complete for: ${name}`);
});

// 8. Immediately Invoked Function Expressions (IIFE)
// A function that runs as soon as it is defined.
(function() {
  let privateMessage = "This is a private message.";
  console.log("IIFE has run.");
  // 'privateMessage' is not accessible outside this function.
})();

// 9. Function Hoisting
// Function declarations are hoisted (moved to the top), allowing them to be called before they appear in the code.
sayHello(); // This works because 'sayHello' is a function declaration.

function sayHello() {
  console.log("Hello from a hoisted function!");
}

// Function expressions are not hoisted.
// sayBye(); // This would cause an error: sayBye is not a function.
const sayBye = function() {
  console.log("Goodbye!");
};