import todoDao from '../database/dao/todoDao';
import { createTodoSchema, idsSchema, updateTodoSchema } from '../validators/schema';
import todoDataBuilder from '../utils/dataBuilders/todoDatabuilder';

export default class TodoService {
  public static listTodos = async () => {
    const todos = await todoDao.listTodos();
    const response = todos.map(todo => todoDataBuilder.transformTodo(todo));
    return { data: [...response] };
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

    return { data: { ...todoDataBuilder.transformTodo(todo) }, statusCode: 201 };
  };

  public static updateTodo = async (params: any, body: any) => {
    await idsSchema.validate(params, { strict: true });
    await updateTodoSchema.validate(body, { strict: true });

    const { todoID } = params;
    const { status } = body.data.attributes;
    const todo = await todoDao.getTodoByID(todoID);
    if (!todo) {
      return {
        errors: ['Todo with id does not exist'],
        statusCode: 404,
      };
    }

    const updatedTodo = await todoDao.updateTodo(todo.id, { status });
    if (!updatedTodo) {
      return {
        errors: ['Todo could not be updated'],
      };
    }

    return { data: { ...todoDataBuilder.transformTodo(updatedTodo) } };
  };
}
