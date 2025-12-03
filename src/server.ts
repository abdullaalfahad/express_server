import dotenv from 'dotenv';
import express from 'express';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            age INT,
            address TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
        `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            is_completed BOOLEAN DEFAULT FALSE,
            due_date TIMESTAMP,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
};

initDB();

app.get('/', (req, res) => {
  res.send('this is a GET request');
});

app.post('/', (req, res) => {
  console.log(req.body);

  res.send({
    status: 201,
    message: 'This is a POST request',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
