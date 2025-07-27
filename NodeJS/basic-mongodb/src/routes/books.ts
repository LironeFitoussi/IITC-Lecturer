import express from 'express';
import BookController from '../controllers/BookController';

const router = express.Router();

// Book routes
router.post('/', BookController.createBook);
router.get('/', BookController.getAllBooks);
router.get('/search', BookController.searchBooks);
router.get('/:id', BookController.getBookById);
router.get('/author/:authorId', BookController.getBooksByAuthor);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export default router; 