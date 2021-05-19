import todoDao from '../database/dao/todoDao';
import todoDataBuilder from '../utils/dataBuilders/todoDatabuilder';

export default class TodoService {
  public static listTodos = async () => {
    const todos = await todoDao.listTodos();
    const response = todos.map(todo => todoDataBuilder.transformTodo(todo));
    return { data: { ...response } };
  };
}
