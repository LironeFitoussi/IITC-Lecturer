import { Router } from "express";
import { getAllCats, saveNewCat } from '../controllers/catController.js'

const router = Router()

router.get('/', getAllCats)
router.post('/', saveNewCat)
export default router