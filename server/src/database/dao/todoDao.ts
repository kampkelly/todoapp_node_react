import { getRepository } from 'typeorm';

import Todo from '../entities/Todo';

export default class TodoDAO {
  public static listTodos = async () => {
    return getRepository(Todo)
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.subtasks', 'subtask')
      .getMany();
  };
}
