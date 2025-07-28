import express from 'express';
import AuthorController from '../controllers/AuthorController';

const router = express.Router();

// Author routes
router.post('/', AuthorController.createAuthor);
router.get('/', AuthorController.getAllAuthors);
router.get('/:id', AuthorController.getAuthorById);
router.put('/:id', AuthorController.updateAuthor);
router.delete('/:id', AuthorController.deleteAuthor);

export default router; 