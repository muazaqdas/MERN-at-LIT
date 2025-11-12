const student = {
  name: "Rohan",
  age: 21,
  course: "MERN Stack",
  "has-laptop": true
};

// Accessing the 'name' property using the dot operator
const studentName = student.name;
console.log(studentName); // Output: "Rohan"

// Accessing the 'age' property
const studentAge = student.age;
console.log(studentAge); // Output: 21


// Accessing a property using a variable
const propertyToAccess = "course";
const studentCourse = student[propertyToAccess];
console.log(studentCourse); // Output: "MERN Stack"

// Accessing a property with a hyphen in its name
const hasLaptop = student["has-laptop"];
console.log(hasLaptop); // Output: true

const keys = Object.keys(student);
console.log(keys); // Output: [ 'name', 'age', 'course', 'has-laptop' ]


const values = Object.values(student);
console.log(values); // Output: [ 'Rohan', 21, 'MERN Stack', true ]


const studentKeys = Object.keys(student); // Get all keys: ['name', 'age', ...]

// Loop through the array of keys
for (let i = 0; i < studentKeys.length; i++) {
  const key = studentKeys[i];   // Get the current key, e.g., "name"
  const value = student[key]; // Use the key to get the value, e.g., student["name"]
  console.log(`${key}: ${value}`);
}
/*
Output:
name: Rohan
age: 21
course: MERN Stack
has-laptop: true
*/