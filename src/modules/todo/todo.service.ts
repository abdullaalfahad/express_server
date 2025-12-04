import { pool } from '../../config/db';

const createTodo = async (user_id: number, title: string) => {
  const result = await pool.query(
    `INSERT INTO todos (user_id, title) VALUES($1, $2) RETURNING *`,
    [user_id, title]
  );
  return result;
};

const getTodos = async () => {
  const result = await pool.query('SELECT * FROM todos');
  return result;
};

const getTodoById = async (id: string) => {
  const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  return result;
};

const updateTodo = async (id: string, title: string, is_completed: boolean) => {
  const result = await pool.query(
    `UPDATE todos SET title = $1, is_completed = $2 WHERE id = $3 RETURNING *`,
    [title, is_completed, id]
  );
  return result;
};

const deleteTodo = async (id: string) => {
  const result = await pool.query(`DELETE FROM todos WHERE id = $1 RETURNING *`, [id]);
  return result;
};

export const todoService = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};

