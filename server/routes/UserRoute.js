import express from 'express';

import {
  register,
  login,
  getUserById,
  updateUser,
} from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users/:id', getUserById);
router.patch('/users/:id', updateUser);

export default router;
