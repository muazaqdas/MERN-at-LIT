import mongoose from 'mongoose';

// Define the Book schema based on the previous Books class structure
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  year: {
    type: Number,
    min: [1000, 'Year must be valid'],
    max: [new Date().getFullYear() + 10, 'Year cannot be too far in the future']
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);

export default Book;
