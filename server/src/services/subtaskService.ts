import todoDao from '../database/dao/todoDao';
import subtaskDao from '../database/dao/subtaskDao';
import { createSubtaskSchema } from '../validators/schema';
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
}
