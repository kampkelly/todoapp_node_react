import { getRepository } from 'typeorm';

import Todo from '../entities/Todo';

export default class TodoDAO {
  public static listTodos = async () => {
    return getRepository(Todo)
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.subtasks', 'subtask')
      .getMany();
  };

  public static getTodoByID = async (id: string) => {
    return getRepository(Todo)
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.subtasks', 'subtask')
      .where('todo.id = :id', { id })
      .getOne();
  };

  public static createTodo = async (todo: Partial<Todo>) => {
    const createdTodo = await getRepository(Todo).save(todo);
    return TodoDAO.getTodoByID(createdTodo.id);
  };

  public static updateTodo = async (id: string, todo: Partial<Todo>) => {
    await getRepository(Todo).update(id, todo);
    return TodoDAO.getTodoByID(id);
  };
}
