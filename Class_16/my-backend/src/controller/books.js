// Old in-memory import (no longer needed)
// import { books } from "../data/data.js";

// Import the Mongoose Book model
import Book from "../models/book.js";

// Get all books from MongoDB
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching books',
      message: error.message
    });
  }
}

// Get a single book by ID from MongoDB
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.json({ success: true, data: book });
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error fetching book',
      message: error.message
    });
  }
}

// Create a new book in MongoDB
const createBook = async (req, res) => {
  try {
    const { title, author, year, isAvailable } = req.body;

    // Validation (Mongoose will also validate, but we can add extra checks)
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        error: 'Title and author are required'
      });
    }

    const newBook = await Book.create({
      title,
      author,
      year: year || new Date().getFullYear(),
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error creating book',
      message: error.message
    });
  }
}

// Update a book in MongoDB
const updateBook = async (req, res) => {
  try {
    const { title, author, year, isAvailable } = req.body;

    // Validation
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        error: 'Title and author are required'
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, year, isAvailable },
      { new: true, runValidators: true } // Return updated document and run validators
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.json({ success: true, data: updatedBook });
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error updating book',
      message: error.message
    });
  }
}

// Delete a book from MongoDB
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.status(204).json({ success: true, data: {} }); // No content
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error deleting book',
      message: error.message
    });
  }
}

export {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}


