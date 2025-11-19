import express from "express";
import bookRouter from "./routes/books.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
// Old hardcoded createUser import - NO LONGER USED
// import { createUser } from "./controller/user.js";
import userRouter from "./routes/user.js";

dotenv.config();
const app = express();
await connectDB();

// Old createUser call for testing - NO LONGER NEEDED
// This was used to create a hardcoded user on startup
// createUser();

// const url = process.env.MONGODB_URI;
// const connectDBHere = async ()=>{
//     await mongoose.connect(url);
//     console.log("Connected Successfully")
// }
  // connectDBHere().then(()=> console.log("hehehehehe")).catch((ee)=> console.log(ee));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register route handlers
app.use('/users', userRouter);
app.use('/books', bookRouter);

app.get('/', (req,res)=> {
  console.log("params:", req.params)
  return res.send("Backend is running successfully")
})

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