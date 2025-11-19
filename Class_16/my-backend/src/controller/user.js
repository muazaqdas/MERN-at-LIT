import User from "../models/user.js";

// ====================================================================
// OLD createUser function (hardcoded data, no request/response)
// This was used to test user creation during development
// Kept for reference only - NO LONGER USED
// ====================================================================
// const createUser = async () => {
//   try {
//     const user = await User.create({
//       name: 'John Doe',
//       email: 'john@example.com',
//       age: 12
//     });
//     console.log('User created:', user);
//   } catch (error) {
//         // console.error('Error 1:', error);
//         console.error('Error 2:', error.message);
//   }
// };

// Get all users from MongoDB
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching users',
      message: error.message
    });
  }
}

// Get a single user by ID from MongoDB
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error fetching user',
      message: error.message
    });
  }
}

// Create a new user in MongoDB
const createUser = async (req, res) => {
  try {
    const { name, email, age, role, isActive } = req.body;

    // Validation (Mongoose will also validate based on schema)
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }

    const newUser = await User.create({
      name,
      email,
      age,
      role,
      isActive
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: error.message
      });
    }
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error creating user',
      message: error.message
    });
  }
}

// Update a user in MongoDB
const updateUser = async (req, res) => {
  try {
    const { name, email, age, role, isActive } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age, role, isActive },
      { new: true, runValidators: true } // Return updated document and run validators
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
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
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error updating user',
      message: error.message
    });
  }
}

// Delete a user from MongoDB
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(204).json({ success: true, data: {} }); // No content
  } catch (error) {
    // Handle invalid MongoDB ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error deleting user',
      message: error.message
    });
  }
}

export {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}