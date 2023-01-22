import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

interface IClassType<T> {
  new (...arguments_: never[]): T;
}

export function validateBody<T>(targetClass: IClassType<T>) {
  return async (request: Request, _response: Response, next: NextFunction): Promise<void> => {
    request.body = Object.setPrototypeOf(request.body, targetClass.prototype);

    const errors = await validate(request.body, {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
    if (errors.length > 0) {
      next(errors);
    }

    request.body = plainToInstance(targetClass, request.body);

    next();
  };
}
