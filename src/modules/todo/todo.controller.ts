import { Request, Response } from 'express';
import { todoService } from './todo.service';

const createTodo = async (req: Request, res: Response) => {
  try {
    const { user_id, title } = req.body;
    const result = await todoService.createTodo(user_id, title);

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoService.getTodos();
    res.status(200).json({
      success: true,
      message: 'Todos retrieved successfully',
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await todoService.getTodoById(id!);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Todo retrieved successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, is_completed } = req.body;
    const result = await todoService.updateTodo(id!, title, is_completed);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await todoService.deleteTodo(id!);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const todoController = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
