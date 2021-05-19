import todoDao from '../database/dao/todoDao';
import { createTodoSchema } from '../validators/schema';
import todoDataBuilder from '../utils/dataBuilders/todoDatabuilder';

export default class TodoService {
  public static listTodos = async () => {
    const todos = await todoDao.listTodos();
    const response = todos.map(todo => todoDataBuilder.transformTodo(todo));
    return { data: { ...response } };
  };

  public static createTodo = async (body: any) => {
    await createTodoSchema.validate(body, { strict: true });

    const { title } = body.data.attributes;
    const todo = await todoDao.createTodo({ title });
    if (!todo) {
      return {
        errors: ['Todo could not be created'],
      };
    }

    return { data: { todo: todoDataBuilder.transformTodo(todo) } };
  };
}
