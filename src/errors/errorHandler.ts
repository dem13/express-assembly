import AppError from "./appError";
import {NextFunction, Request, Response} from "express";

export default (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  if (process.env.NODE_ENV === 'development') {
    return res.status(status).send({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  let message = 'Server error';

  if (status < 500) {
    message = err.message;
  }

  res.status(status).send({
    message: message,
  });
};