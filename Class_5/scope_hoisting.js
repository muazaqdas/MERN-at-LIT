// --- Topic: Scope and Hoisting ---

// 1. Global Scope vs. Local Scope
// 'globalVariable' is declared in the global scope and can be accessed anywhere.
const globalVariable = "I am a global variable.";

function localScopeExample() {
  // 'localVariable' is declared inside the function (local scope).
  const localVariable = "I am a local variable.";
  console.log(globalVariable); // Accessible here.
  console.log(localVariable); // Accessible here.
}
localScopeExample();

console.log(globalVariable); // Accessible here.
// console.log(localVariable); // This would cause an error, as it's not in the global scope.

// 2. Block Scope with let and const
// A "block" is any code enclosed in curly braces {}.
if (true) {
  let blockScopedLet = "I am block-scoped with let.";
  const blockScopedConst = "I am block-scoped with const.";
  console.log(blockScopedLet);
  console.log(blockScopedConst);
}
// console.log(blockScopedLet); // Error: Not accessible outside the 'if' block.
// console.log(blockScopedConst); // Error: Not accessible outside the 'if' block.

// 3. Function Scope with var
// 'var' is not block-scoped; it is function-scoped.
function varScopeExample() {
  var varVariable = "I am function-scoped with var.";
  if (true) {
    var anotherVar = "I am also function-scoped.";
  }
  console.log(varVariable); // Accessible.
  console.log(anotherVar); // Accessible, because 'var' ignores the 'if' block scope.
}
varScopeExample();
// console.log(varVariable); // Error: Not accessible outside the function.

// 4. Variable Hoisting
// Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope.
// 'var' declarations are hoisted, but not their assignments.
console.log(hoistedVar); // Outputs 'undefined', not an error.
var hoistedVar = "Hello!";

// 'let' and 'const' are also hoisted, but they are not initialized.
// This creates a "Temporal Dead Zone" (TDZ).
// console.log(hoistedLet); // Error: Cannot access 'hoistedLet' before initialization.
let hoistedLet = "World!";

// 5. Function Hoisting vs. Variable Hoisting
// Function declarations are fully hoisted (both declaration and definition).
// This is why you can call them before they are defined.
greet();
function greet() {
  console.log("Hello from a hoisted function declaration!");
}

// Function expressions are not fully hoisted. Only the variable declaration is.
// sayHi(); // Error: 'sayHi' is not a function yet.
const sayHi = function() {
  console.log("Hi from a non-hoisted function expression!");
};