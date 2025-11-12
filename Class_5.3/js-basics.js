/**
 * JavaScript Beginner Examples
 *
 * This file contains simple, easy-to-understand examples for core JS concepts.
 * To run this, you can use Node.js: `node <filename>.js`
 * Or, open an HTML file in your browser and link this script.
 */

// Log a separator to make the console output easier to read
const separator = (title) => {
  console.log(`\n\n--- ${title.toUpperCase()} ---`);
};

// =================================================================================
// ## class in js
// =================================================================================
separator("Class in JS");

// A class is a blueprint for creating objects.
class Animal {
  // The constructor is a special method for creating and initializing an object instance of a class.
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  // A method is a function associated with an object.
  makeSound() {
    console.log(`${this.name} says ${this.sound}! 🐾`);
  }
}

// 'dog' is an instance of the Animal class.
const dog = new Animal("Buddy", "Woof");
dog.makeSound(); // Output: Buddy says Woof! 🐾

const cat = new Animal("Whiskers", "Meow");
cat.makeSound(); // Output: Whiskers says Meow! 🐾

// =================================================================================
// ## this
// =================================================================================
separator("this keyword");

// 'this' refers to the object it belongs to. Its value depends on how a function is called.

// 1. In an object method, 'this' refers to the object.
const person = {
  name: "Alice",
  greet: function () {
    // 'this' here refers to the 'person' object.
    console.log(`Hello, my name is ${this.name}.`);
  },
};
person.greet(); // Output: Hello, my name is Alice.

// 2. In a class method, 'this' refers to the instance of the class.
// (See the Animal class above, where 'this.name' refers to the specific animal instance).

// 3. Alone, 'this' refers to the global object (window in browsers, global in Node.js).
console.log(this); // In browsers, this will be the Window object.

// =================================================================================
// ## for...in and for...of
// =================================================================================
separator("for...in vs for...of");

// --- for...in ---
// Iterates over the *keys* (property names) of an object.
const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2023,
};

console.log("Using for...in with an object:");
for (const key in car) {
  console.log(`${key}: ${car[key]}`);
}
// Output:
// brand: Toyota
// model: Camry
// year: 2023

// --- for...of ---
// Iterates over the *values* of an iterable (like an Array, String, Map, etc.).
// You CANNOT use for...of on a plain object because it is not iterable.
const fruits = ["Apple", "Banana", "Cherry"];

console.log("\nUsing for...of with an array:");
for (const fruit of fruits) {
  console.log(fruit);
}
// Output:
// Apple
// Banana
// Cherry

// =================================================================================
// ## map, filter, reduce
// =================================================================================
separator("map, filter, reduce");

const numbers = [1, 2, 3, 4, 5];

// --- .map() ---
// Creates a *new* array by applying a function to each element.
const doubledNumbers = numbers.map((num) => num * 2);
console.log("map (doubled numbers):", doubledNumbers); // Output: [2, 4, 6, 8, 10]

// --- .filter() ---
// Creates a *new* array with only the elements that pass a test (return true).
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("filter (even numbers):", evenNumbers); // Output: [2, 4]

// --- .reduce() ---
// Reduces an array to a single value by executing a function on each element.
// The 'accumulator' (acc) holds the return value of the previous calculation.
// 'currentValue' (curr) is the current element being processed.
// 0 is the initial value of the accumulator.
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("reduce (sum of numbers):", sum); // Output: 15

// =================================================================================
// ## More Array Methods
// =================================================================================
separator("More Array Methods");

const items = ["pen", "pencil", "book", "eraser"];

// --- .forEach() ---
// Executes a function once for each array element. It doesn't return anything.
console.log("\nforEach:");
items.forEach((item) => {
  console.log(`- ${item}`);
});

// --- .some() ---
// Checks if at least *one* element passes a test. Returns true or false.
const hasBook = items.some((item) => item === "book");
console.log("\nsome (has a 'book'?):", hasBook); // Output: true

// --- .every() ---
// Checks if *all* elements pass a test. Returns true or false.
const allAreShortWords = items.every((item) => item.length < 7);
console.log("every (are all words < 7 chars?):", allAreShortWords); // Output: true

// --- .sort() ---
// Sorts the elements of an array *in place* (modifies the original array).
const unsortedNumbers = [5, 2, 10, 8, 1];
// For numbers, you need to provide a compare function.
unsortedNumbers.sort((a, b) => a - b); // Ascending order
console.log("\nsort (numbers):", unsortedNumbers); // Output: [1, 2, 5, 8, 10]
items.sort();
console.log("sort (strings):", items); // Output: ['book', 'eraser', 'pen', 'pencil'] (alphabetical)

// --- .reverse() ---
// Reverses the order of elements *in place*.
items.reverse();
console.log("\nreverse:", items); // Output: ['pencil', 'pen', 'eraser', 'book']

// --- .slice() ---
// Returns a *new* array containing a shallow copy of a portion of an array.
// It does NOT modify the original array.
const animals = ["ant", "bison", "camel", "duck", "elephant"];
const middleAnimals = animals.slice(1, 4); // Grabs from index 1 up to (but not including) index 4
console.log("\nslice:", middleAnimals); // Output: ['bison', 'camel', 'duck']
console.log("Original animals array is unchanged:", animals);

// --- .splice() ---
// Changes the contents of an array by removing or replacing existing elements
// and/or adding new elements *in place*.
const months = ["Jan", "March", "April", "June"];
// Add 'Feb' at index 1
months.splice(1, 0, "Feb");
console.log("\nsplice (add):", months); // Output: ["Jan", "Feb", "March", "April", "June"]
// Remove 'April' (at index 3)
months.splice(3, 1);
console.log("splice (remove):", months); // Output: ["Jan", "Feb", "March", "June"]

// --- .concat() ---
// Merges two or more arrays and returns a *new* array.
const array1 = ["a", "b"];
const array2 = ["c", "d"];
const newArray = array1.concat(array2);
console.log("\nconcat:", newArray); // Output: ['a', 'b', 'c', 'd']

// --- .join() ---
// Joins all elements of an array into a string.
const elements = ["Fire", "Air", "Water"];
const joinedString = elements.join(" - ");
console.log("\njoin:", joinedString); // Output: "Fire - Air - Water"

// =================================================================================
// ## Destructuring & Spread Operator
// =================================================================================
separator("Destructuring & Spread Operator");

// --- Destructuring ---
// A way to unpack values from arrays or properties from objects into distinct variables.

// Array Destructuring
const coordinates = [10, 20, 30];
const [x, y, z] = coordinates;
console.log("Array Destructuring:", `x=${x}, y=${y}, z=${z}`); // Output: x=10, y=20, z=30

// Object Destructuring
const user = {
  id: 42,
  username: "johndoe",
  email: "john@example.com",
};
const { username, email } = user;
console.log("Object Destructuring:", `Username is ${username}, Email is ${email}`); // Output: Username is johndoe, Email is john@example.com

// --- Spread Operator (...) ---
// Allows an iterable (like an array) to be expanded in places where zero or more arguments or elements are expected.

// 1. Copying an array
const originalVeggies = ["carrot", "broccoli"];
const copiedVeggies = [...originalVeggies];
console.log("\nSpread (copy array):", copiedVeggies); // Output: ['carrot', 'broccoli']

// 2. Merging arrays
const moreVeggies = ["spinach", "potato"];
const allVeggies = [...originalVeggies, ...moreVeggies];
console.log("Spread (merge arrays):", allVeggies); // Output: ['carrot', 'broccoli', 'spinach', 'potato']

// 3. Spreading object properties
const userDetails = {
  firstName: "John",
  lastName: "Doe",
};
const fullUser = {
  ...userDetails,
  age: 30,
};
console.log("Spread (merge objects):", fullUser); // Output: { firstName: 'John', lastName: 'Doe', age: 30 }

// =================================================================================
// ## switch, break, continue
// =================================================================================
separator("switch, break, continue");

// --- switch & break ---
// The switch statement evaluates an expression, matching its value to a case clause.
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("It's the start of the week. 😩");
    break; // 'break' exits the switch block. Without it, execution would "fall through" to the next case.
  case "Friday":
    console.log("Weekend is almost here! 🎉");
    break;
  case "Saturday":
  case "Sunday":
    console.log("It's the weekend! 🥳");
    break;
  default:
    console.log("It's a regular day.");
}

// --- break in a loop ---
// 'break' is also used to exit a loop prematurely.
console.log("\nUsing 'break' in a loop:");
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    console.log("Breaking the loop at 5!");
    break; // The loop stops here.
  }
  console.log(i);
}
// Output: 1, 2, 3, 4, Breaking the loop at 5!

// --- continue in a loop ---
// 'continue' skips the current iteration and proceeds to the next one.
console.log("\nUsing 'continue' in a loop:");
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    console.log("Skipping number 3...");
    continue; // Skips the console.log(i) for this iteration.
  }
  console.log(i);
}
// Output: 1, 2, Skipping number 3..., 4, 5