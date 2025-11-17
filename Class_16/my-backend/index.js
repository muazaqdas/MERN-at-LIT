import express from "express";
const app = express();

app.use(express.json());

// In-memory data store
let books = [
  { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json({ success: true, data: books });
});

// GET single book
app.get('/api/books/:id', (req, res) => {
  console.log("books params:", req.params.bookId, req.params.id);
  const book = books.find(b => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  res.json({ success: true, data: book });
});

// POST create book
app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;

  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      error: 'Title and author are required'
    });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year: year || new Date().getFullYear()
  };

  books.push(newBook);
  res.status(201).json({ success: true, data: newBook });
});

// PUT update book
app.put('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      error: 'Title and author are required'
    });
  }

  books[bookIndex] = {
    id: parseInt(req.params.id),
    title,
    author,
    year
  };

  res.json({ success: true, data: books[bookIndex] });
});

// DELETE book
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  books.splice(bookIndex, 1);
  res.status(204).send(); // No content
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


// // const express = require('express');
// import express from 'express';
// // require('dotenv').config();
// import dotenv from 'dotenv';

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT;

// // console.log(__filename)
// console.log("hello hehehe ",process.env.NAME);
// console.log(process.env.NODE_ENV);

// // First Middleware - Logging
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next(); // Pass control to next middleware
// });

// // Second Middleware - parse JSON
// app.use(express.json()); 

// // Third Middleware - encoding
// app.use(express.urlencoded({ extended: true }));

// // Custom middleware for authentication check
// const checkAuth = (req, res, next) => {

//   if (req.headers.authorization) {
//     console.log("User is authenticated");
//     req.user = {
//       userId: 123,
//       name:'Muaz'
//     }
//     next();
// } else {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };

// app.post('/', (req, res)=> res.json("This is the begining") );

// app.get('/user', checkAuth, (req, res)=> {
//   const responseObject = {
//     data: req.user,
//     id: req.user.userId,
//     message:"This is a protected path"
//   }
//   return res.status(200).json(responseObject);
// });

// app.listen(PORT, () => {
//     console.log(`Server is established at port -> ${PORT}`);
// });