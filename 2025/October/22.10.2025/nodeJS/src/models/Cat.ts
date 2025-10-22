import pool from "../config/db.js";

export interface CatProps {
    id?: number;
    name: string;
    age: number;
    breed: string;
}

export default class Cat {
    id?: number;
    name: string;
    age: number;
    breed: string;

    constructor({ name, age, breed }: CatProps) {
        this.name = name;
        this.age = age;
        this.breed = breed;
    }

    // Get all cats
    static async findAll() {
        const { rows } = await pool.query("SELECT * FROM cats");
        return rows;
    }

    //   // Get one cat by ID
    //   static async findById(id) {
    //     const { rows } = await pool.query("SELECT * FROM cats WHERE id = $1", [id]);
    //     return rows[0] ? new Cat(rows[0]) : null;
    //   }

    //   // Save a new cat
    //   async save() {
    //     const { rows } = await pool.query(
    //       "INSERT INTO cats (name, age, breed) VALUES ($1, $2, $3) RETURNING *",
    //       [this.name, this.age, this.breed]
    //     );
    //     Object.assign(this, rows[0]);
    //     return this;
    //   }

    //   // Delete cat by ID
    //   static async deleteById(id) {
    //     await pool.query("DELETE FROM cats WHERE id = $1", [id]);
    //   }
}
