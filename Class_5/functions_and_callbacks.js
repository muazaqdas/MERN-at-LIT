// A warm welcome to your deep dive into JavaScript functions!
console.log("🚀 Starting our JavaScript Functions Deep Dive! 🚀");

// ====================================================================
// ## 1. Function Declaration vs. Function Expression
// ====================================================================

// **Function Declaration**
// - Can be called before it is defined (this is called "hoisting").
console.log(greetDeclaration("Alice")); // Works!

function greetDeclaration(name) {
  return `Hello, ${name}! This is a function declaration.`;
}

// **Function Expression**
// - A function assigned to a variable. It's an anonymous function.
// - Cannot be called before it is defined.
// console.log(greetExpression("Bob")); // This would cause an error!

const greetExpression = function(name) {
  return `Hi, ${name}! This is a function expression.`;
};
console.log(greetExpression("Bob"));


// ====================================================================
// ## 2. Arrow Functions
// ====================================================================
// A more concise way to write function expressions.

// Traditional Function Expression
const addLegacy = function(a, b) {
  return a + b;
};

// Arrow Function Syntax
const addArrow = (a, b) => a + b; // Implicit return for single expressions

console.log(`Legacy sum: ${addLegacy(5, 3)}`);
console.log(`Arrow function sum: ${addArrow(5, 3)}`);

// Arrow function with multiple lines needs curly braces and a `return` statement.
const subtractArrow = (a, b) => {
    const result = a - b;
    return `The difference is ${result}.`;
};
console.log(subtractArrow(10, 4));


// ====================================================================
// ## 3. Parameters, Arguments, Default & Rest Parameters
// ====================================================================

// `name` and `greeting` are **parameters** (placeholders).
// `greeting = "Hello"` sets a **default parameter**.
function createGreeting(name, greeting = "Hello") {
  // "Charlie" and "Good morning" are **arguments** (actual values).
  return `${greeting}, ${name}!`;
}
console.log(createGreeting("Charlie", "Good morning")); // Uses provided argument
console.log(createGreeting("Dave")); // Uses default "Hello"

// **Rest Parameters (`...`)**
// - Collects all remaining arguments into an array.
// - Must be the last parameter.
function sumAll(...numbers) {
  // `numbers` is now an array, e.g., [1, 2, 3, 4]
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}
console.log(`Sum of all numbers: ${sumAll(1, 2, 3, 4, 5)}`);


// ====================================================================
// ## 4. Function Scope and Return Values
// ====================================================================

function calculateArea(width, height) {
  // `area` is a **local variable**. It only exists inside this function.
  const area = width * height;
  return area; // The **return value** sent back from the function.
}

const calculatedArea = calculateArea(10, 5);
console.log(`The calculated area is: ${calculatedArea}`);
// console.log(area); // This would cause an error because `area` is not in the global scope.


// ====================================================================
// ## 5. Anonymous Functions, Callbacks, and IIFE
// ====================================================================

// **Anonymous Function & Callback**
// A "higher-order function" is one that takes another function as an argument.
// The function passed as an argument is called a "callback".

function processName(name, callback) {
  // This function doesn't know *how* it will greet.
  // It just calls the callback function it receives.
  const processedName = name.toUpperCase();
  callback(processedName);
}

// We pass an anonymous function directly as the callback.
processName("Eve", function(processedName) {
  console.log(`Callback says: Welcome, ${processedName}!`);
});

// **Immediately Invoked Function Expression (IIFE)**
// A function that is defined and runs immediately.
// Useful for creating a private scope to avoid polluting the global scope.
(function() {
  const privateMessage = "This variable is safe inside the IIFE.";
  console.log(privateMessage);
})();
// console.log(privateMessage); // This would cause an error.


// ====================================================================
// ## 6. High-Order Array Methods (using Callbacks)
// ====================================================================
console.log("\n--- Array Methods ---");
const numbers = [1, 2, 3, 4, 5, 6];
const people = [
    { name: 'Frank', age: 25 },
    { name: 'Grace', age: 30 },
    { name: 'Heidi', age: 20 }
];

// **.map()** - Creates a new array by transforming every element.
const doubled = numbers.map(num => num * 2);
console.log("map (doubled):", doubled); // [2, 4, 6, 8, 10, 12]

// **.filter()** - Creates a new array with only the elements that pass a test.
const evens = numbers.filter(num => num % 2 === 0);
console.log("filter (evens):", evens); // [2, 4, 6]

// **.reduce()** - Reduces the array to a single value (e.g., a sum).
// `acc` is the accumulator, `curr` is the current value. `0` is the starting value for `acc`.
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("reduce (sum):", sum); // 21

// **.find()** - Returns the first element that passes a test.
const personOver28 = people.find(person => person.age > 28);
console.log("find (person > 28):", personOver28); // { name: 'Grace', age: 30 }

// **.some()** - Checks if at least one element passes a test. Returns true/false.
const hasSomeoneUnder21 = people.some(person => person.age < 21);
console.log("some (anyone < 21?):", hasSomeoneUnder21); // true

// **.sort()** - Sorts the array. Note: It sorts by string value by default!
const mixedNumbers = [10, 5, 100, 2];
mixedNumbers.sort((a, b) => a - b); // Use a compare function for numbers.
console.log("sort (numbers):", mixedNumbers); // [2, 5, 10, 100]

// Sorting an array of objects
people.sort((a, b) => a.age - b.age); // Sort by age, ascending.
console.log("sort (people by age):", people);