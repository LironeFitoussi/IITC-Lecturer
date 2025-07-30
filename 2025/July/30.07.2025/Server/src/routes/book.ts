import express from 'express';
import BookController from '../controllers/book.controller';
import { authenticateToken } from '../middleware/auth';
// import { validateRegisterInput, validateLoginInput } from '../middleware/validation';

const router = express.Router();

// Authentication routes
router.post('/', authenticateToken, BookController.create);
// router.get('/', BookController.findAll)
// router.get('/:id', BookController.findAuthor)
// router.patch('/:id', BookController.updateAuthor)
// router.delete('/:id', BookController.deleteAuthor)

export default router; 