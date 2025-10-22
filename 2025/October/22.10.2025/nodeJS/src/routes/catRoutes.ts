import { Router } from "express";
import Cat from "../models/Cat.js";

const router = Router()
router.get('/', async (req, res) => {
    const allCats = await Cat.findAll()
    res.json({
        data: allCats
    }) 
})