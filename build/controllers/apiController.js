"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiController {
    constructor() {
        this.index = (req, res) => {
            res.send({
                version: '1.0'
            });
        };
    }
}
exports.default = ApiController;
