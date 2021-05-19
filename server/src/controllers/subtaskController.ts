import { Request, Response } from 'express';

import controllerTemplate from '.';
import subtaskService from '../services/subtaskService';

export default class TodoController {
  public static createSubtask = async (req: Request, res: Response) => {
    return controllerTemplate(subtaskService.createSubtask(req.params, req.body), req, res);
  };
}
