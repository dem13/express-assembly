class AppError extends Error {
    public status?: number;
    public isOperational?: boolean;

    constructor(message: string, statusCode?: number) {
        super(message);

        this.status = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;