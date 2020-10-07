"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressLoader_1 = __importDefault(require("./expressLoader"));
const configLoader_1 = __importDefault(require("./configLoader"));
class Loader {
    constructor(options) {
        this.options = options;
    }
    run() {
        const loaders = [
            configLoader_1.default,
            expressLoader_1.default,
        ];
        loaders.forEach(loader => {
            loader(this.options);
        });
    }
}
exports.default = Loader;
