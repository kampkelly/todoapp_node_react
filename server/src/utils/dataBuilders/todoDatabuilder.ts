import Todo from '../../database/entities/Todo';
import Subtask from '../../database/entities/Subtask';

export default class TodoDataBuilder {
  public static transformTodo = (data: Todo) => {
    return {
      type: 'todo',
      id: data.id,
      attributes: {
        title: data.title,
        status: data.status,
        createdAt: data.createdAt,
        subtasks: data.subtasks
          ? data.subtasks?.map((subtask: Subtask) => {
              return {
                id: subtask.id,
                title: subtask.title,
                status: subtask.status,
                createdAt: subtask.createdAt,
              };
            })
          : [],
      },
    };
  };
}
