/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';
import faker from 'faker';
import { createConnection } from 'typeorm';

import todoDao from '../database/dao/todoDao';
import subtaskDao from '../database/dao/subtaskDao';

const sampleData = {
  todos: [
    {
      title: faker.random.word(),
      subtasks: [
        {
          title: faker.random.word(),
        },
      ],
    },
    {
      title: faker.random.word(),
      subtasks: [
        {
          title: faker.random.word(),
        },
        {
          title: faker.random.word(),
        },
      ],
    },
    {
      title: faker.random.word(),
      subtasks: [
        {
          title: faker.random.word(),
        },
      ],
    },
  ],
};

const ormConfig = require('../../ormconfig');

const seedSampleData = async () => {
  const config = ormConfig;
  await createConnection(config);

  const existingTodos = await todoDao.listTodos();
  if (existingTodos.length) {
    console.log('--------Cannot seed sample data because data already exists');
    return;
  }

  await Promise.all(
    sampleData.todos.map(async (data: any) => {
      const todo = await todoDao.createTodo({ title: data.title });
      data.subtasks.map(async (subtask: any) => {
        await subtaskDao.createSubtask({ title: subtask.title, todo });
      });
    })
  );

  console.log('--------Seeding of data has been completed');
};

export default seedSampleData();
