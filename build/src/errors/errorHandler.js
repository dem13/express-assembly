"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
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
