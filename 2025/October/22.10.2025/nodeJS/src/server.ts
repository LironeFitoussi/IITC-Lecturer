import express from "express";
import dotenv from 'dotenv'
import pool from "./config/db.js";
const app = express()
dotenv.config()



const PORT = process.env.PORT

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