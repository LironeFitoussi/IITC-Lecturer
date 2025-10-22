import pool from "../config/db.js";

export interface CatProps {
  name: string;
  age: number;
  breed: string;
}

export default class Cat {
  name: string;
  age: number;
  breed: string;

  constructor({ name, age, breed }: CatProps) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  static async findAll() {
    const { rows } = await pool.query("SELECT * FROM cats");
    return rows; 
  }

  async save() {
    const { rows } = await pool.query(
      "INSERT INTO cats (name, age, breed) VALUES ($1, $2, $3) RETURNING *",
      [this.name, this.age, this.breed]
    );
    const row = rows[0];
    return row;
  }

  static async deleteOne(id: string) {
    await pool.query(`
      DELETE FROM cats
      WHERE id=($1)
    `, [id])
  }
}
