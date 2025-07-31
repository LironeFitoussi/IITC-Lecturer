import express from 'express';
import BookController from '../controllers/book.controller';
import { authenticateToken } from '../middleware/auth';
// import { validateRegisterInput, validateLoginInput } from '../middleware/validation';
import { validateBookOwner } from '../middleware/books.mid'
const router = express.Router();

// Authentication routes
router.post('/', authenticateToken, BookController.create);
router.get('/all', BookController.getAllBooks)
// router.get('/:id', BookController.findAuthor)
// router.patch('/:id', BookController.updateAuthor)
router.delete('/:id', authenticateToken, validateBookOwner, BookController.deleteBook)

export default router; 