import express from "express";
// import { books } from "../data/data.js";
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from "../controller/books.js";
const bookRouter = express.Router();

// http://localhost:300/books

// GET all books
bookRouter.get('/', getAllBooks);
// GET single book
bookRouter.get('/:id', getBook);
// POST create book
bookRouter.post('/', createBook);
// PUT update book
bookRouter.put('/:id', updateBook);
// DELETE book
bookRouter.delete('/:id', deleteBook);

export default bookRouter;
