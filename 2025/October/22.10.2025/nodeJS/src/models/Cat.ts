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
    return rows; // or rows.map(r => new Cat(r)) if you want instances
  }

  async save() {
    const { rows } = await pool.query(
      "INSERT INTO cats (name, age, breed) VALUES ($1, $2, $3) RETURNING *",
      [this.name, this.age, this.breed]
    );
    const row = rows[0];
    return row;       // return the single created record
  }
}
