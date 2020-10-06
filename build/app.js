"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loader_1 = __importDefault(require("./loaders/loader"));
class App {
    init() {
        this.server = express_1.default();
        const loader = new loader_1.default({ express: this.server });
        loader.run();
    }
}
exports.default = App;
