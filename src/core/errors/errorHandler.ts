import AppError from "./AppError";
import {NextFunction, Request, Response} from "express";
import App from "../../App";

/**
 * Global error handler
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
export default (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const status = err.httpCode || 500;

  if (process.env.NODE_ENV === 'development') {
    return res.status(status).send({
      status: err.httpCode,
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