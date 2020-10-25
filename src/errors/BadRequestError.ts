import {HttpError} from "routing-controllers";

export class BadRequestError extends HttpError {
  constructor(message: string, public errors: any = {}) {
    super(400, message);
  }
}
