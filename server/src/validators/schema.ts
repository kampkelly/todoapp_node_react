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
    data: yup.object({
      type: yup
        .string()
        .oneOf(['todo'])
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
  })
  .noUnknown();
