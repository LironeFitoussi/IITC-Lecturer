import { Router } from "express";
import { getAllCats, saveNewCat, deleteCat } from '../controllers/catController.js'

const router = Router()

router.get('/', getAllCats)
router.post('/', saveNewCat)
router.delete('/:id', deleteCat)

export default router