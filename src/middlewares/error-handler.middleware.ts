import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HttpBaseException } from '../exeptions';

export function errorHandlerMiddleware(
  error: HttpBaseException | ValidationError,
  _request: Request,
  response: Response,
  _next: NextFunction
): void {
  let status;
  let message;
  let name;

  if (error instanceof ValidationError || error[0] instanceof ValidationError) {
    status = StatusCodes.BAD_REQUEST;
    message = error.toString();
    name = ValidationError.name;
  } else {
    status = error.status || 500;
    message = error.message || 'Something went wrong';
    name = error.name;
  }
  response.status(status).send({
    name,
    message,
  });
}
