"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const ControllerResolver_1 = __importDefault(require("../core/controllers/ControllerResolver"));
exports.default = (key) => {
    return tsyringe_1.container.resolve(ControllerResolver_1.default).action(key);
};
