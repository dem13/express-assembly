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
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.httpCode || 500;

  let response: any = {message: 'Server error'};

  if (status < 500) {
    response.message = err.message;

    response.errors = err.errors || undefined;
  }

  if (process.env.NODE_ENV === 'development') {
    response = {
      ...response,
      code: err.httpCode,
      error: err,
      message: err.message,
      stack: err.stack
    }
  }

  res.status(status).send(response);
};
