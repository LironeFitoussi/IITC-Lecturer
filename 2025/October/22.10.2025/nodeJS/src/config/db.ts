import pg from 'pg'

const { Pool } = pg;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123456789',
    database: 'dogapp',
    port: 5432
})

export default pool;