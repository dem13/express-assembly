"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressLoader_1 = __importDefault(require("./expressLoader"));
class Loader {
    constructor(options) {
        this.options = options;
    }
    run() {
        expressLoader_1.default(this.options);
    }
}
exports.default = Loader;
