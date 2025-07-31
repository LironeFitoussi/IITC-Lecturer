import express from 'express';
import AuthorController from '../controllers/author.controller';
// import { authenticateToken } from '../middleware/auth';
// import { validateRegisterInput, validateLoginInput } from '../middleware/validation';

const router = express.Router();

// Authentication routes
router.post('/', AuthorController.create);
router.get('/', AuthorController.findAll)
router.get('/:id', AuthorController.findAuthor)
router.patch('/:id', AuthorController.updateAuthor)
router.delete('/:id', AuthorController.deleteAuthor)

export default router; 