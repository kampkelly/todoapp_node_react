import { Request, Response } from 'express';
import * as yup from 'yup';

export enum applicationMessages {
  SUCCESS_RESPONSE_MESSAGE = 'The request was successful',
  ERROR_RESPONSE_MESSAGE = 'An error occurred',
  EXCEPTION_RESPONSE_MESSAGE = 'Unexpected application error',
  HEALTH_CHECK_MESSAGE = 'Health check',
}

type successResponseInputType = {
  res: Response;
  data?: any;
  statusCode?: number;
};

type errorResponseInputType = {
  req: Request;
  res: Response;
  errorObject: string[];
  statusCode?: number;
};

type exceptionResponseInputType = {
  req: Request;
  res: Response;
  err: any;
};

export default class HTTPResponse {
  public static successResponse = ({ res, data, statusCode }: successResponseInputType) => {
    res.set('Content-Type', 'application/vnd.api+json');
    return res.status(statusCode || 200).json({
      data: data || {},
    });
  };

  public static errorResponse = ({ res, statusCode, errorObject }: errorResponseInputType) => {
    res.set('Content-Type', 'application/vnd.api+json');
    const errors = errorObject.map(err => {
      return { title: err };
    });
    return res.status(statusCode || 400).json({
      errors,
    });
  };

  public static exceptionResponse = ({ req, res, err }: exceptionResponseInputType) => {
    if (err instanceof yup.ValidationError) {
      return HTTPResponse.errorResponse({
        req,
        res,
        errorObject: err.errors,
        statusCode: 400,
      });
    }

    const exceptionMessage = applicationMessages.EXCEPTION_RESPONSE_MESSAGE;

    res.set('Content-Type', 'application/vnd.api+json');
    return res.status(err.status || 500).json({
      errors: [err.message || exceptionMessage],
    });
  };
}
