import Subtask from '../../database/entities/Subtask';

export default class TodoDataBuilder {
  public static transformSubtask = (data: Subtask) => {
    return {
      type: 'subtask',
      id: data.id,
      attributes: {
        title: data.title,
        status: data.status,
        createdAt: data.createdAt,
      },
    };
  };
}
