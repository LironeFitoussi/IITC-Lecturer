import express from "express";
import dotenv from 'dotenv'
import pool from "./config/db.js";
import catRouter from '../src/routes/catRoutes.js'

const app = express()
dotenv.config()

app.use(express.json())

const PORT = process.env.PORT

app.use('/cats', catRouter)

app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`);
    try {
        const res = await pool.query(`
            SELECT NOW()    
        `)
        console.log(res.rows);
        
        console.log("Connected to DB at:", res.rows[0].now);
    } catch (error) {
        console.log(error);
        
    }

}) 