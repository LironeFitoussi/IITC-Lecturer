import Book from "../models/Book";
import { Response, NextFunction } from 'express';
import { AuthRequest } from "./auth";
export const validateBookOwner = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id)

        if (!book) {
            res.status(404).json({
                success: false,
                message: `Book With id: ${id} Not Found`
            })
            return
        }

        console.log(`userId: ${req.user?.userId}`);
        console.log(`book: ${book?.addedBy}`);
        
        if (req.user?.userId == book?.addedBy) {
            next()
        } else {
            res.status(403).json({
                success: false,
                message: "You are not authorized to delete a boojk you havent craeted"
            })
            return
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during book ownership validation",
            error
        });
    }
}