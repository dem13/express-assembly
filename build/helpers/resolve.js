"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
exports.default = (token) => {
    return tsyringe_1.container.resolve(token);
};
