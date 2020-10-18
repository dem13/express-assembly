class AppError extends Error {
  public httpCode?: number;
  public isOperational?: boolean;

  constructor(message: string, httpCode?: number) {
    super(message);

    this.httpCode = httpCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;