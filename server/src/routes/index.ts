import express from 'express';

import todoRouter from './todoRouter';

const router = express.Router();

router.use('/todos', todoRouter);

export default router;
