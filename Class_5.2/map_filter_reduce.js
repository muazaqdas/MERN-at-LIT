const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Mouse", category: "Electronics", price: 25 },
  { id: 3, name: "Book", category: "Stationery", price: 15 },
  { id: 4, name: "Keyboard", category: "Electronics", price: 75 }
];

// Get only the products that are in the 'Electronics' category
const electronics = products.filter(product => product.category === "Electronics");

console.log(electronics);
/*
Output:
[
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1200 },
  { id: 2, name: 'Mouse', category: 'Electronics', price: 25 },
  { id: 4, name: 'Keyboard', category: 'Electronics', price: 75 }
]
*/

// Get an array of just the product names
const productNames = products.map(product => product.name);

console.log(productNames); // Output: [ 'Laptop', 'Mouse', 'Book', 'Keyboard' ]


// Calculate the total price of all products
// The '0' is the initial value for our accumulator 'total'
const totalPrice = products.reduce((total, product) => {
  return total + product.price;
}, 0);

console.log(totalPrice); // Output: 1315 (1200 + 25 + 15 + 75)