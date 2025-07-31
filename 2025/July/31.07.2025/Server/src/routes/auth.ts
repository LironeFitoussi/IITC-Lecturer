import express from 'express';
import AuthController from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth';
import { validateRegisterInput, validateLoginInput } from '../middleware/validation';

const router = express.Router();

// Authentication routes
router.post('/register', validateRegisterInput, AuthController.register);
router.post('/login', validateLoginInput, AuthController.login);
router.post('/logout', AuthController.logout);

// Protected routes
router.get('/me', authenticateToken, AuthController.getMe);

// Admin/Development routes (protected)
router.get('/users', authenticateToken, AuthController.getAllUsers);
router.delete('/users/:id', authenticateToken, AuthController.deleteUser);

export default router; 