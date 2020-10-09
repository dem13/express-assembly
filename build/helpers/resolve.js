"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
exports.default = (controller) => {
    return tsyringe_1.container.resolve(controller);
};
