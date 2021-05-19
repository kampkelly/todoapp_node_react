import express from 'express';
import todoController from '../controllers/todoController';

const router = express.Router();

router.get('/', todoController.listTodos);
router.post('/', todoController.createTodo);

export default router;
