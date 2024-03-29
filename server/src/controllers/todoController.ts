import { Request, Response } from 'express';

import controllerTemplate from '.';
import todoService from '../services/todoService';

export default class TodoController {
  public static listTodos = async (req: Request, res: Response) => {
    return controllerTemplate(todoService.listTodos(), req, res);
  };

  public static createTodo = async (req: Request, res: Response) => {
    return controllerTemplate(todoService.createTodo(req.body), req, res);
  };

  public static updateTodo = async (req: Request, res: Response) => {
    return controllerTemplate(todoService.updateTodo(req.params, req.body), req, res);
  };
}
