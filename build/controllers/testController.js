"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestController {
    constructor() {
        this.test = (req, res) => {
            res.send({ test: 'yeah' });
        };
    }
}
exports.default = TestController;
