import { Request, Response } from 'express';

import httpResponses from '../lib/httpResponse';

export interface ErrorData {
  errors: any[];
  message?: string;
  statusCode?: number;
}

export interface SuccessData {
  data: any;
  message?: string;
  statusCode?: number;
}

function isSuccess(data: SuccessData | ErrorData): data is SuccessData {
  return (data as SuccessData).data !== undefined;
}

const controllerTemplate = async (
  serviceMethod: Promise<SuccessData | ErrorData> | SuccessData | ErrorData,
  req: Request,
  res: Response
) => {
  try {
    const response: SuccessData | ErrorData = await serviceMethod;

    if (isSuccess(response)) {
      return httpResponses.successResponse({
        res,
        data: response.data,
        statusCode: response.statusCode,
      });
    }

    return httpResponses.errorResponse({
      req,
      res,
      errorObject: response.errors,
      statusCode: response.statusCode,
    });
  } catch (err) {
    return httpResponses.exceptionResponse({ req, res, err });
  }
};

export default controllerTemplate;
