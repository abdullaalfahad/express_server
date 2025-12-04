import express, { Router } from 'express';
import { todoController } from './todo.controller';

const router: Router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export const todoRoutes = router;

