import * as yup from 'yup';
import { StatusEnum } from '../database/entities/enums';

const createObject = (type: string) => {
  return {
    data: yup.object({
      type: yup
        .string()
        .oneOf([type])
        .required(),
      attributes: yup.object({
        title: yup.string().required(),
      }),
    }),
  };
};

const updateObject = (type: string) => {
  return {
    data: yup.object({
      type: yup
        .string()
        .oneOf([type])
        .required(),
      id: yup
        .string()
        .uuid()
        .required(),
      attributes: yup.object({
        status: yup
          .string()
          .oneOf(Object.values(StatusEnum))
          .required(),
      }),
    }),
  };
};

export const createTodoSchema = yup
  .object({
    ...createObject('todo'),
  })
  .noUnknown();

export const createSubtaskSchema = yup
  .object({
    ...createObject('subtask'),
  })
  .noUnknown();

export const idsSchema = yup
  .object({
    todoID: yup.string().uuid(),
    subtaskID: yup.string().uuid(),
  })
  .noUnknown();

export const updateTodoSchema = yup
  .object({
    ...updateObject('todo'),
  })
  .noUnknown();

export const updateSubtaskSchema = yup
  .object({
    ...updateObject('subtask'),
  })
  .noUnknown();
