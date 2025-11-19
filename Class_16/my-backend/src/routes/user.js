import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controller/user.js";

const userRouter = express.Router();

// ====================================================================
// OLD route - basic test route that just returned the user ID
// Kept for reference only - REPLACED WITH FULL CRUD ROUTES BELOW
// ====================================================================
// userRouter.get('/:id', (req, res)=>{
//     res.json(
//         {
//             success: true,
//             data:{
//                 userId: req.params.id
//             }
//         })
// })

// User CRUD Routes

// GET all users
// GET http://localhost:3000/users
userRouter.get('/', getAllUsers);

// GET a single user by ID
// GET http://localhost:3000/users/:id
userRouter.get('/:id', getUser);

// POST create a new user
// POST http://localhost:3000/users
// Body: { "name": "John Doe", "email": "john@example.com", "age": 25 }
userRouter.post('/', createUser);

// PUT update a user by ID
// PUT http://localhost:3000/users/:id
// Body: { "name": "Jane Doe", "email": "jane@example.com", "age": 30 }
userRouter.put('/:id', updateUser);

// DELETE a user by ID
// DELETE http://localhost:3000/users/:id
userRouter.delete('/:id', deleteUser);

export default userRouter;