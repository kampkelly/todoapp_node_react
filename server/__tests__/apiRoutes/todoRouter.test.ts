/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/camelcase */

import supertest from 'supertest';
import { assert } from 'chai';
import faker from 'faker';
import { createConnection } from 'typeorm';

require('dotenv').config();

import app from '../../src/server';
import todoDao from '../../src/database/dao/todoDao';
import { StatusEnum } from '../../src/database/entities/enums';

const ormConfig = require('../../ormconfig');

const server = supertest.agent(app);

const contentType = 'application/vnd.api+json';
let todoID1: string;
let subtaskID1: string;

describe('Todo Router', () => {
  before(async function beforeHook() {
    const config = ormConfig;
    await createConnection(config);
  });

  describe('Get Todos', () => {
    it('should get todos', async () => {
      const res = await server.get('/todos');
      assert.equal(res.status, 200);
    });
  });

  describe('Create Todos', () => {
    let data: any;

    before(function beforeHook() {
      data = {
        data: {
          type: 'todo',
          attributes: {
            title: 'First Todo',
          },
        },
      };
    });

    it('should not create a todo with incorrect data', async () => {
      const res = await server
        .post('/todos')
        .send({
          data: {
            type: 'todo',
            attributes: {
              name: 'First Todo',
            },
          },
        })
        .set('Content-Type', contentType);
      assert.equal(res.status, 400);
      assert.equal(res.body.errors[0].title, 'data.attributes.title is a required field');
    });

    it('should create a todo', async () => {
      const res = await server
        .post('/todos')
        .send(data)
        .set('Content-Type', contentType);
      assert.equal(res.status, 201);
      todoID1 = res.body.data.id;
    });
  });

  describe('Update Todos', () => {
    let data: any;

    before(function beforeHook() {
      data = {
        data: {
          type: 'todo',
          id: todoID1,
          attributes: {
            status: StatusEnum.PENDING,
          },
        },
      };
    });

    it('should not update a todo with incorrect data', async () => {
      const res = await server
        .patch(`/todos/${todoID1}`)
        .send({
          data: {
            type: 'todo',
            attributes: {
              status: 'First Todo',
            },
          },
        })
        .set('Content-Type', contentType);
      assert.equal(res.status, 400);
      assert.equal(
        res.body.errors[0].title,
        'data.attributes.status must be one of the following values: pending, completed'
      );
    });

    it('should update a todo', async () => {
      const res = await server
        .patch(`/todos/${todoID1}`)
        .send(data)
        .set('Content-Type', contentType);
      assert.equal(res.status, 200);
    });
  });

  describe('Create a subtask', () => {
    let data: any;

    before(function beforeHook() {
      data = {
        data: {
          type: 'subtask',
          attributes: {
            title: 'First subtask',
          },
        },
      };
    });

    it('should not create with incorrect data', async () => {
      const res = await server
        .post(`/todos/${todoID1}/subtasks`)
        .send({
          data: {
            type: 'todo',
            attributes: {
              status: 'First Todo',
            },
          },
        })
        .set('Content-Type', contentType);
      assert.equal(res.status, 400);
      assert.equal(
        res.body.errors[0].title,
        'data.type must be one of the following values: subtask'
      );
    });

    it('should not create a subtask with invalid todoID', async () => {
      const res = await server
        .post(`/todos/${faker.datatype.uuid()}/subtasks`)
        .send(data)
        .set('Content-Type', contentType);
      assert.equal(res.status, 404);
      assert.equal(res.body.errors[0].title, 'Todo with id does not exist');
    });

    it('should create a subtask', async () => {
      const res = await server
        .post(`/todos/${todoID1}/subtasks`)
        .send(data)
        .set('Content-Type', contentType);
      assert.equal(res.status, 201);
      subtaskID1 = res.body.data.id;
    });
  });

  describe('Update a subtask', () => {
    let data: any;

    before(function beforeHook() {
      data = {
        data: {
          type: 'subtask',
          id: subtaskID1,
          attributes: {
            status: StatusEnum.COMPLETED,
          },
        },
      };
    });

    it('should not update with incorrect data', async () => {
      const res = await server
        .patch(`/todos/${todoID1}/subtasks/${subtaskID1}`)
        .send({
          data: {
            type: 'todo',
            attributes: {
              status: 'First Todo',
            },
          },
        })
        .set('Content-Type', contentType);
      assert.equal(res.status, 400);
      assert.equal(
        res.body.errors[0].title,
        'data.type must be one of the following values: subtask'
      );
    });

    it('should not update a subtask with invalid todoID', async () => {
      const res = await server
        .patch(`/todos/${faker.datatype.uuid()}/subtasks/${faker.datatype.uuid()}`)
        .send(data)
        .set('Content-Type', contentType);
      assert.equal(res.status, 404);
      assert.equal(res.body.errors[0].title, 'Todo with id does not exist');
    });

    it('should not update a subtask with invalid subtaskID', async () => {
      const res = await server
        .patch(`/todos/${todoID1}/subtasks/${faker.datatype.uuid()}`)
        .send(data)
        .set('Content-Type', contentType);
      assert.equal(res.status, 404);
      assert.equal(res.body.errors[0].title, 'Subtask with id does not exist');
    });

    it('should update a subtask', async () => {
      const res = await server
        .patch(`/todos/${todoID1}/subtasks/${subtaskID1}`)
        .send(data)
        .set('Content-Type', contentType);
      assert.equal(res.status, 200);

      const todo = await todoDao.getTodoByID(todoID1);
      assert.equal(todo?.status, StatusEnum.COMPLETED);
    });
  });
});
