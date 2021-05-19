import { Request, Response } from 'express';

import controllerTemplate from '.';
import todoService from '../services/todoService';

export default class TodoController {
  public static listTodos = async (req: Request, res: Response) => {
    return controllerTemplate(todoService.listTodos(), req, res);
  };
}
