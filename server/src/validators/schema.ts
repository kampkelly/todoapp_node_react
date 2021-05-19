import * as yup from 'yup';

export const createTodoSchema = yup
  .object({
    data: yup.object({
      type: yup
        .string()
        .oneOf(['todo'])
        .required(),
      attributes: yup.object({
        title: yup.string().required(),
      }),
    }),
  })
  .noUnknown();
