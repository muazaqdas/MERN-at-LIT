// --- Topic: Variables and Data Types ---

// 1. Variable Declarations: var, let, const

// 'var' has function scope and can be re-declared and updated. (Older way)
var userLocation = "New York";
var userLocation = "San Francisco"; // Re-declared (can lead to bugs)
userLocation = "Los Angeles"; // Updated

// 'let' has block scope and can be updated, but not re-declared. (Modern way)
let userName = "Alice";
// let userName = "Bob"; // This would cause an error: 'userName' has already been declared
userName = "Bob"; // This is fine, we are just updating the value

// 'const' has block scope and must be initialized and cannot be updated or re-declared. (For constants)
const userAge = 30;
// userAge = 31; // This would cause an error: Assignment to constant variable.

// Best practice: Use 'const' by default, and 'let' if the value needs to change. Avoid 'var'.

// 2. Primitive Data Types

// a. Number: for integers and floats
let integerValue = 42;
let floatValue = 3.14;
console.log(integerValue, floatValue);

// b. String: for text and template literals
let greeting = "Hello, world!";
let productName = 'Laptop';
// Template literals use backticks (``) and allow for embedded expressions with ${}.
let message = `The product name is ${productName} and its price is $1200.`;
console.log(message);

// c. Boolean: for true/false values
let isLoggedIn = true;
let hasPermission = false;
console.log(isLoggedIn, hasPermission);

// d. Undefined and null
let emptyVariable; // Declared but not initialized, its value is 'undefined'.
let noValue = null; // 'null' represents the intentional absence of a value.
console.log(emptyVariable, noValue);

// e. Symbol and BigInt (introductions)
// Symbol is used for creating unique identifiers.
const id = Symbol('id');
const anotherId = Symbol('id');
console.log(id === anotherId); // false, they are unique.
console.log("Symbols:", id, anotherId);

// BigInt is for numbers larger than the Number type can handle.
const largeNumber = 1234567890123456789012345678901234567890n;
console.log(largeNumber);

// 3. Type Coercion and typeof operator
// Type coercion is when JavaScript automatically converts types.
let a = 5 + "5"; // '5' is coerced into a number, resulting in "55"
let b = 5 * "5"; // '5' is coerced into a number, resulting in 25
console.log(a, b);

// 'typeof' operator returns the type of a variable.
console.log(typeof integerValue); // "number"
console.log(typeof greeting); // "string"
console.log(typeof isLoggedIn); // "boolean"
console.log(typeof emptyVariable); // "undefined"
console.log(typeof noValue); // "object" (this is a classic JavaScript quirk)