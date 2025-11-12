// --- Topic: Operators and Expressions ---

// 1. Arithmetic Operators
let x = 10;
let y = 5;

// What is $ and when we use it.
// $ (dollar sign) is used to insert variables/expressions in a string.

console.log(`x + y = ${x + y}`); // Addition: 15
console.log(`x - y = ${x - y}`); // Subtraction: 5
console.log(`x * y = ${x * y}`); // Multiplication: 50
console.log(`x / y = ${x / y}`); // Division: 2
console.log(`x % y = ${x % y}`); // Remainder (Modulo): 0
console.log(`x ** y = ${x ** y}`); // Exponentiation: 100000

// 2. Assignment Operators
let score = 50;
score += 10; // Same as: score = score + 10;
console.log(`score after +=: ${score}`); // 60
score -= 5;  // Same as: score = score - 5;
console.log(`score after -=: ${score}`); // 55

// 3. Comparison Operators
let num1 = 10;
let num2 = "10";
let num3 = 20;

// '==' (loose equality) converts types before comparing.
console.log(`num1 == num2: ${num1 == num2}`); // true (10 == "10")

// '===' (strict equality) does not convert types.
console.log(`num1 === num2: ${num1 === num2}`); // false (number !== string)

// Other comparison operators
console.log(`num1 != num2: ${num1 != num2}`); // false
console.log(`num1 !== num2: ${num1 !== num2}`); // true
console.log(`num1 < num3: ${num1 < num3}`); // true
console.log(`num1 >= num2: ${num1 >= num2}`); // true

// 4. Logical Operators
let isSunny = true;
let isWarm = false;

// '&&' (AND) returns true if both are true.
console.log(`isSunny && isWarm: ${isSunny && isWarm}`); // false

// '||' (OR) returns true if at least one is true.
console.log(`isSunny || isWarm: ${isSunny || isWarm}`); // true

// '!' (NOT) negates the value.
console.log(`!isSunny: ${!isSunny}`); // false
console.log( )

// 5. Increment/Decrement
let counter = 5;
console.log(counter++); // Post-increment: returns 5, then increments to 6.
console.log(counter);   // Now it's 6.
console.log(++counter); // Pre-increment: increments to 7, then returns 7.

// 6. Ternary Operator
// A shorthand for an 'if-else' statement.
let age = 18;
let canVote = (age >= 18) ? age+2 : age + 12;
console.log(canVote);

// 7. Operator Precedence
// Multiplication and division have higher precedence than addition and subtraction.
let result = 2 + 3 * 4; // 3 * 4 is calculated first (12), then 2 + 12 = 14.
console.log(`Result of 2 + 3 * 4: ${result}`);