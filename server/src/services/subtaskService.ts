import todoDao from '../database/dao/todoDao';
import { StatusEnum } from '../database/entities/enums';
import subtaskDao from '../database/dao/subtaskDao';
import { createSubtaskSchema, idsSchema, updateSubtaskSchema } from '../validators/schema';
import subtaskDataBuilder from '../utils/dataBuilders/subtaskDatabuilder';

export default class TodoService {
  public static createSubtask = async (params: any, body: any) => {
    await createSubtaskSchema.validate(body, { strict: true });

    const { todoID } = params;
    const { title } = body.data.attributes;

    const todo = await todoDao.getTodoByID(todoID);
    if (!todo) {
      return {
        errors: ['Todo with id does not exist'],
        statusCode: 404,
      };
    }

    const subtask = await subtaskDao.createSubtask({ title, todo });
    if (!subtask) {
      return {
        errors: ['Subtask could not be created'],
      };
    }

    return { data: { ...subtaskDataBuilder.transformSubtask(subtask) }, statusCode: 201 };
  };

  public static updateSubtask = async (params: any, body: any) => {
    await idsSchema.validate(params, { strict: true });
    await updateSubtaskSchema.validate(body, { strict: true });

    const { todoID, subtaskID } = params;
    const { status } = body.data.attributes;

    let todo = await todoDao.getTodoByID(todoID);
    if (!todo) {
      return {
        errors: ['Todo with id does not exist'],
        statusCode: 404,
      };
    }

    const subtask = await subtaskDao.getSubtaskByID(todoID, subtaskID);
    if (!subtask) {
      return {
        errors: ['Subtask with id does not exist'],
        statusCode: 404,
      };
    }

    const updatedSubtask = await subtaskDao.updateSubtask(subtask.id, {
      status,
      todo: subtask.todo,
    });

    if (!updatedSubtask) {
      return {
        errors: ['Todo could not be updated'],
      };
    }

    const completedSubtasks = todo.subtasks?.filter(
      subtask => subtask.status === StatusEnum.COMPLETED && subtask.id !== subtaskID
    );

    let statusValue;
    if (status === StatusEnum.PENDING && todo.status !== StatusEnum.PENDING) {
      statusValue = StatusEnum.PENDING;
    }

    if (
      updatedSubtask.status === StatusEnum.COMPLETED &&
      completedSubtasks?.length === todo.subtasks?.length! - 1
    ) {
      statusValue = StatusEnum.COMPLETED;
    }
    todo = await todoDao.getTodoByID(todoID);

    let updatedTodo;

    if (statusValue) {
      updatedTodo = await todoDao.updateTodo(todo?.id!, { status: statusValue });
      if (!updatedTodo) {
        return {
          errors: ['Todo could not be updated'],
        };
      }
    }

    return { data: { ...subtaskDataBuilder.transformSubtask(updatedSubtask) } };
  };
}
