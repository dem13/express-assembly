"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminController {
    constructor() {
        this.index = (req, res) => {
            res.send({
                admin: 'Admin...'
            });
        };
        console.log('I am alive...');
    }
}
exports.default = AdminController;
