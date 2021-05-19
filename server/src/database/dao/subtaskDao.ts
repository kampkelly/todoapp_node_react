import { getRepository } from 'typeorm';

import Subtask from '../entities/Subtask';

export default class SubtaskDAO {
  public static createSubtask = async (subtask: Partial<Subtask>) => {
    const createdSubtask = await getRepository(Subtask).save(subtask);
    return SubtaskDAO.getSubtaskByID(subtask.todo?.id!, createdSubtask.id);
  };

  public static getSubtaskByID = async (todoID: string, subtaskID: string) => {
    return getRepository(Subtask).findOne({
      where: {
        id: subtaskID,
        todo: {
          id: todoID,
        },
      },
      join: {
        alias: 'subtask',
        leftJoinAndSelect: {
          todo: 'subtask.todo',
        },
      },
    });
  };

  public static updateSubtask = async (subtaskID: string, subtask: Partial<Subtask>) => {
    await getRepository(Subtask).update(subtaskID, subtask);
    return SubtaskDAO.getSubtaskByID(subtask.todo?.id!, subtaskID);
  };
}
