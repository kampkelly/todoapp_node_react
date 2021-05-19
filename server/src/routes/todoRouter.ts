import express from 'express';
import todoController from '../controllers/todoController';
import subtaskController from '../controllers/subtaskController';

const router = express.Router();

router.get('/', todoController.listTodos);
router.post('/', todoController.createTodo);
router.patch('/:todoID', todoController.updateTodo);

router.post('/:todoID/subtasks', subtaskController.createSubtask);

export default router;
