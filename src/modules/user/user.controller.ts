import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const result = await userService.createUser(name, email);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers();
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.getUserById(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const result = await userService.updateUser(id, name, email);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
