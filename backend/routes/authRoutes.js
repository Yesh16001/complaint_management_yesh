import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Define routes
// POST /api/auth/signup → Register a new user
router.post('/signup', signup);

// POST /api/auth/login → Login existing user
router.post('/login', login);

// Export router
export default router;
